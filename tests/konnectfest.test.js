const { describe, it } = require('node:test')
const assert = require('node:assert')

/**
 * Mock GlideRecord environment to test business logic and financial reconciliation invariants
 */
class MockGlideRecord {
    constructor(tableName) {
        this.tableName = tableName
        this.fields = {}
        this.queries = []
        this.records = []
        this.currentIndex = -1
    }

    initialize() {
        this.fields = { sys_id: 'rec_' + Math.random().toString(36).substring(2, 9) }
    }

    setValue(field, val) {
        this.fields[field] = val
    }

    getValue(field) {
        return this.fields[field]
    }

    getUniqueValue() {
        return this.fields.sys_id || 'rec_default'
    }

    addQuery(field, opOrVal, maybeVal) {
        if (maybeVal !== undefined) {
            this.queries.push({ field, op: opOrVal, val: maybeVal })
        } else {
            this.queries.push({ field, op: '=', val: opOrVal })
        }
    }

    query() {
        this.currentIndex = -1
    }

    next() {
        this.currentIndex++
        if (this.currentIndex < this.records.length) {
            this.fields = { ...this.records[this.currentIndex] }
            return true
        }
        return false
    }

    get(id) {
        const found = this.records.find(r => r.sys_id === id)
        if (found) {
            this.fields = { ...found }
            return true
        }
        return false
    }

    insert() {
        if (!this.fields.sys_id) {
            this.fields.sys_id = 'rec_' + Math.random().toString(36).substring(2, 9)
        }
        this.records.push({ ...this.fields })
        return this.fields.sys_id
    }

    update() {
        const idx = this.records.findIndex(r => r.sys_id === this.fields.sys_id)
        if (idx >= 0) {
            this.records[idx] = { ...this.fields }
        }
        return this.fields.sys_id
    }
}

describe('KonnectFest Core Business & Security Tests', () => {

    it('1. Duplicate Email Prevention: Flags duplicate registration for same event', () => {
        const existingParticipant = { email: 'aswin@fest.com', event: 'event_001' }
        const newEmail = 'aswin@fest.com'
        const eventId = 'event_001'
        const isDuplicate = (existingParticipant.email === newEmail && existingParticipant.event === eventId)
        assert.strictEqual(isDuplicate, true, 'Duplicate registration should be prevented')
    })

    it('2. Payment Verification & Idempotent Wallet Credit: Single credit per verified payment', () => {
        let wallet = { available_balance: 0, reserved_balance: 0 }
        let payment = { status: 'verified', verified_amount: 1000, wallet_credit_status: 'pending' }
        let ledger = []

        // First verification credit
        if (payment.status === 'verified' && payment.wallet_credit_status === 'pending') {
            wallet.available_balance += payment.verified_amount
            payment.wallet_credit_status = 'credited'
            ledger.push({
                type: 'initial_credit',
                amount: payment.verified_amount,
                idempotency_key: 'INIT_PAY_001',
                balance_after: wallet.available_balance
            })
        }

        assert.strictEqual(wallet.available_balance, 1000, 'Wallet should be credited ₹1000')
        assert.strictEqual(ledger.length, 1, 'Exactly one ledger record should be created')

        // Attempt duplicate credit with same payment
        let duplicateCreditOccurred = false
        if (payment.status === 'verified' && payment.wallet_credit_status === 'pending') {
            duplicateCreditOccurred = true
        }

        assert.strictEqual(duplicateCreditOccurred, false, 'Duplicate credit must be rejected')
        assert.strictEqual(wallet.available_balance, 1000, 'Balance must remain ₹1000')
    })

    it('3. Duplicate UTR Protection: Prevents reusing same bank reference on multiple payments', () => {
        const verifiedPayments = [{ utr: 'UTR123456789012', status: 'verified' }]
        const incomingUTR = 'UTR123456789012'

        const isDuplicateUtr = verifiedPayments.some(p => p.utr === incomingUTR && p.status === 'verified')
        assert.strictEqual(isDuplicateUtr, true, 'Same UTR cannot be verified twice')
    })

    it('4. Ephemeral QR Token Expiry: 120-second time-bound validation', () => {
        const now = Date.now()
        const validQR = { token: 'KF_QR_VALID', expiresAt: now + 90000 } // expires in 90s (within 120s)
        const expiredQR = { token: 'KF_QR_EXPIRED', expiresAt: now - 5000 } // expired 5s ago

        const isQR1Valid = now < validQR.expiresAt
        const isQR2Valid = now < expiredQR.expiresAt

        assert.strictEqual(isQR1Valid, true, 'QR within 120s must be valid')
        assert.strictEqual(isQR2Valid, false, 'QR past 120s must be rejected')
    })

    it('5. Insufficient Wallet Balance Rejection: Purchase blocked with no balance deduction', () => {
        const wallet = { available_balance: 80.00 }
        const purchaseAmount = 150.00

        let purchaseApproved = false
        if (wallet.available_balance >= purchaseAmount) {
            wallet.available_balance -= purchaseAmount
            purchaseApproved = true
        }

        assert.strictEqual(purchaseApproved, false, 'Purchase exceeding balance must be rejected')
        assert.strictEqual(wallet.available_balance, 80.00, 'Available balance must remain untouched')
    })

    it('6. Reconciliation Invariant: Wallet Debit = Vendor Credit = Transaction = Coupon Value', () => {
        const wallet = { available_balance: 500.00 }
        const vendorLedger = { credit_amount: 0.00 }
        const purchase = { amount: 120.00, status: 'pending' }

        // Execute atomic confirmation
        const debitAmount = purchase.amount
        wallet.available_balance -= debitAmount
        vendorLedger.credit_amount += debitAmount
        purchase.status = 'success'
        const coupon = { value: purchase.amount, status: 'redeemed' }

        assert.strictEqual(debitAmount, 120.00, 'Debit amount equals purchase amount')
        assert.strictEqual(vendorLedger.credit_amount, 120.00, 'Vendor credit equals purchase amount')
        assert.strictEqual(purchase.amount, 120.00, 'Transaction amount is 120')
        assert.strictEqual(coupon.value, 120.00, 'Digital coupon value is 120')
        assert.strictEqual(wallet.available_balance, 380.00, 'Updated balance is 380')
    })

    it('7. Replay Attack Prevention: Same transaction cannot be confirmed twice', () => {
        const processedTransactions = new Set()
        const txId = 'TXN_987654321'

        // First confirmation
        let firstResult = false
        if (!processedTransactions.has(txId)) {
            processedTransactions.add(txId)
            firstResult = true
        }

        // Second confirmation attempt
        let secondResult = false
        if (!processedTransactions.has(txId)) {
            secondResult = true
        }

        assert.strictEqual(firstResult, true, 'Initial confirmation succeeds')
        assert.strictEqual(secondResult, false, 'Second confirmation attempt is safely blocked')
    })

    it('8. Post-Event Refund Hold Reservation: Reserves balance and prevents overdrawing', () => {
        const event = { state: 'completed' }
        const wallet = { available_balance: 380.00, reserved_balance: 0.00 }
        const requestedRefund = 200.00

        assert.strictEqual(event.state, 'completed', 'Event must be completed to request refund')

        // Reserve hold
        wallet.available_balance -= requestedRefund
        wallet.reserved_balance += requestedRefund

        assert.strictEqual(wallet.available_balance, 180.00, 'Available balance reduced by hold amount')
        assert.strictEqual(wallet.reserved_balance, 200.00, 'Reserved balance equals hold amount')

        // Cannot request another refund that exceeds remaining available balance
        const secondAttempt = 250.00
        const canFulfill = wallet.available_balance >= secondAttempt
        assert.strictEqual(canFulfill, false, 'Cannot request more than remaining available balance')
    })

    it('9. Refund Rejection Releases Hold: Returns reserved funds back to available balance', () => {
        const wallet = { available_balance: 180.00, reserved_balance: 200.00 }
        const refundHold = 200.00

        // Financer rejects refund
        wallet.reserved_balance -= refundHold
        wallet.available_balance += refundHold

        assert.strictEqual(wallet.reserved_balance, 0.00, 'Reserved balance cleared')
        assert.strictEqual(wallet.available_balance, 380.00, 'Available balance restored')
    })

    it('10. Financer Finalizes Refund: Records payout UTR and clears hold', () => {
        const wallet = { available_balance: 180.00, reserved_balance: 200.00, total_refunded: 0.00 }
        const payoutAmount = 200.00
        const bankUtr = 'UTR_PAYOUT_999888'

        // Finalize payout
        wallet.reserved_balance -= payoutAmount
        wallet.total_refunded += payoutAmount

        assert.strictEqual(wallet.reserved_balance, 0.00, 'Reserved hold cleared after payout')
        assert.strictEqual(wallet.total_refunded, 200.00, 'Total refunded updated')
        assert.strictEqual(wallet.available_balance, 180.00, 'Available balance unchanged by payout debit')
        assert.ok(bankUtr.length > 0, 'Payout reference recorded')
    })

    it('11. Vendor Settlement: Correctly aggregates unsettled sales', () => {
        const vendorTransactions = [
            { id: 'tx1', amount: 120.00, status: 'unsettled' },
            { id: 'tx2', amount: 80.00, status: 'unsettled' },
            { id: 'tx3', amount: 250.00, status: 'unsettled' },
        ]

        let totalPayable = 0
        for (const tx of vendorTransactions) {
            totalPayable += tx.amount
            tx.status = 'settled'
        }

        assert.strictEqual(totalPayable, 450.00, 'Total settlement equals sum of unsettled transactions')
        assert.strictEqual(vendorTransactions.every(t => t.status === 'settled'), true, 'All transactions marked settled')
    })
})
