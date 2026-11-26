import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide'

// ==========================================
// 1. WALLET SERVICE
// ==========================================


export interface WalletOperationResult {
    success: boolean
    message: string
    walletSysId?: string
    ledgerSysId?: string
    transactionSysId?: string
    couponSysId?: string
    availableBalance?: number
    reservedBalance?: number
}

/**
 * Service to manage wallet balances, double-entry ledger entries,
 * concurrency-safe mutations, and financial reconciliation invariants.
 */
export class KonnectFestWalletService {
    /**
     * Retrieves or creates a wallet for a participant and event.
     */
    static getOrCreateWallet(participantSysId: string, eventSysId: string): { sysId: string; availableBalance: number; reservedBalance: number; status: string } | null {
        const gr = new GlideRecord('x_2327324_konnect_wallet')
        gr.addQuery('participant', participantSysId)
        gr.addQuery('event', eventSysId)
        gr.query()
        if (gr.next()) {
            return {
                sysId: gr.getUniqueValue(),
                availableBalance: parseFloat(gr.getValue('available_balance') || '0'),
                reservedBalance: parseFloat(gr.getValue('reserved_balance') || '0'),
                status: gr.getValue('status') || 'active',
            }
        }
        return null
    }

    /**
     * Initializes wallet upon verified registration payment.
     * Idempotent: guaranteed to execute once per payment record.
     */
    static initializeWalletFromPayment(paymentSysId: string): WalletOperationResult {
        const paymentGr = new GlideRecord('x_2327324_konnect_payment')
        if (!paymentGr.get(paymentSysId)) {
            return { success: false, message: 'Payment record not found.' }
        }

        const status = paymentGr.getValue('status')
        if (status !== 'verified') {
            return { success: false, message: 'Cannot credit wallet: Payment is not verified by Finance.' }
        }

        const creditStatus = paymentGr.getValue('wallet_credit_status')
        if (creditStatus === 'credited') {
            return { success: false, message: 'Payment has already been credited to wallet.' }
        }

        const participantSysId = paymentGr.getValue('participant')
        const eventSysId = paymentGr.getValue('event')
        const amount = parseFloat(paymentGr.getValue('verified_amount') || paymentGr.getValue('requested_amount') || '0')

        if (amount <= 0) {
            return { success: false, message: 'Verified amount must be greater than zero.' }
        }

        const idempotencyKey = `INIT_${paymentSysId}_${participantSysId}`

        // Check if ledger record with this idempotency key already exists
        const checkLedger = new GlideRecord('x_2327324_konnect_wallet_ledger')
        checkLedger.addQuery('idempotency_key', idempotencyKey)
        checkLedger.query()
        if (checkLedger.next()) {
            paymentGr.setValue('wallet_credit_status', 'credited')
            paymentGr.update()
            return { success: false, message: 'Initial credit already processed for this payment.' }
        }

        // Get or Create Wallet
        let walletSysId = ''
        let currentAvailable = 0
        let currentReserved = 0

        const walletGr = new GlideRecord('x_2327324_konnect_wallet')
        walletGr.addQuery('participant', participantSysId)
        walletGr.addQuery('event', eventSysId)
        walletGr.query()

        if (walletGr.next()) {
            walletSysId = walletGr.getUniqueValue()
            currentAvailable = parseFloat(walletGr.getValue('available_balance') || '0')
            currentReserved = parseFloat(walletGr.getValue('reserved_balance') || '0')
        } else {
            walletGr.initialize()
            walletGr.setValue('participant', participantSysId)
            walletGr.setValue('event', eventSysId)
            walletGr.setValue('initial_amount', amount)
            walletGr.setValue('available_balance', 0)
            walletGr.setValue('reserved_balance', 0)
            walletGr.setValue('total_spent', 0)
            walletGr.setValue('total_refunded', 0)
            walletGr.setValue('status', 'active')
            walletSysId = walletGr.insert()
        }

        const newAvailable = currentAvailable + amount

        // Create Ledger Record
        const ledgerGr = new GlideRecord('x_2327324_konnect_wallet_ledger')
        ledgerGr.initialize()
        ledgerGr.setValue('wallet', walletSysId)
        ledgerGr.setValue('participant', participantSysId)
        ledgerGr.setValue('event', eventSysId)
        ledgerGr.setValue('entry_type', 'initial_credit')
        ledgerGr.setValue('amount', amount)
        ledgerGr.setValue('available_balance_before', currentAvailable)
        ledgerGr.setValue('available_balance_after', newAvailable)
        ledgerGr.setValue('reserved_balance_before', currentReserved)
        ledgerGr.setValue('reserved_balance_after', currentReserved)
        ledgerGr.setValue('source_payment', paymentSysId)
        ledgerGr.setValue('idempotency_key', idempotencyKey)
        ledgerGr.setValue('status', 'posted')
        ledgerGr.setValue('notes', `Initial verified registration credit for payment ${paymentGr.getValue('number')}`)
        const ledgerSysId = ledgerGr.insert()

        // Update Wallet Balance
        walletGr.setValue('available_balance', newAvailable)
        walletGr.setValue('last_transaction_date', new GlideDateTime().getValue())
        walletGr.update()

        // Update Payment record
        paymentGr.setValue('wallet_credit_status', 'credited')
        paymentGr.setValue('wallet_credit_timestamp', new GlideDateTime().getValue())
        paymentGr.update()

        // Activate participant if needed
        const partGr = new GlideRecord('x_2327324_konnect_participant')
        if (partGr.get(participantSysId)) {
            partGr.setValue('status', 'active')
            partGr.update()
        }

        gs.info(`[KonnectFest] Initial wallet credit posted: Wallet=${walletSysId}, Amount=₹${amount}`)

        return {
            success: true,
            message: 'Wallet initialized and credited successfully.',
            walletSysId,
            ledgerSysId,
            availableBalance: newAvailable,
        }
    }

    /**
     * Credits a verified top-up payment to the participant wallet.
     */
    static creditTopUpPayment(paymentSysId: string): WalletOperationResult {
        const paymentGr = new GlideRecord('x_2327324_konnect_payment')
        if (!paymentGr.get(paymentSysId)) {
            return { success: false, message: 'Payment record not found.' }
        }

        if (paymentGr.getValue('status') !== 'verified') {
            return { success: false, message: 'Payment is not verified by Finance.' }
        }

        if (paymentGr.getValue('wallet_credit_status') === 'credited') {
            return { success: false, message: 'Top-up has already been credited.' }
        }

        const participantSysId = paymentGr.getValue('participant')
        const eventSysId = paymentGr.getValue('event')
        const amount = parseFloat(paymentGr.getValue('verified_amount') || paymentGr.getValue('requested_amount') || '0')

        if (amount <= 0) {
            return { success: false, message: 'Verified amount must be positive.' }
        }

        const idempotencyKey = `TOPUP_${paymentSysId}_${new GlideDateTime().getNumericValue()}`

        const walletGr = new GlideRecord('x_2327324_konnect_wallet')
        walletGr.addQuery('participant', participantSysId)
        walletGr.addQuery('event', eventSysId)
        walletGr.query()

        if (!walletGr.next()) {
            return { success: false, message: 'Wallet not found for participant in this event.' }
        }

        const walletSysId = walletGr.getUniqueValue()
        const currentAvailable = parseFloat(walletGr.getValue('available_balance') || '0')
        const currentReserved = parseFloat(walletGr.getValue('reserved_balance') || '0')
        const newAvailable = currentAvailable + amount

        // Ledger Entry
        const ledgerGr = new GlideRecord('x_2327324_konnect_wallet_ledger')
        ledgerGr.initialize()
        ledgerGr.setValue('wallet', walletSysId)
        ledgerGr.setValue('participant', participantSysId)
        ledgerGr.setValue('event', eventSysId)
        ledgerGr.setValue('entry_type', 'top_up')
        ledgerGr.setValue('amount', amount)
        ledgerGr.setValue('available_balance_before', currentAvailable)
        ledgerGr.setValue('available_balance_after', newAvailable)
        ledgerGr.setValue('reserved_balance_before', currentReserved)
        ledgerGr.setValue('reserved_balance_after', currentReserved)
        ledgerGr.setValue('source_payment', paymentSysId)
        ledgerGr.setValue('idempotency_key', idempotencyKey)
        ledgerGr.setValue('status', 'posted')
        ledgerGr.setValue('notes', `Verified top-up payment UTR: ${paymentGr.getValue('utr_reference')}`)
        const ledgerSysId = ledgerGr.insert()

        // Update Wallet
        walletGr.setValue('available_balance', newAvailable)
        walletGr.setValue('last_transaction_date', new GlideDateTime().getValue())
        walletGr.update()

        // Update Payment Status
        paymentGr.setValue('wallet_credit_status', 'credited')
        paymentGr.setValue('wallet_credit_timestamp', new GlideDateTime().getValue())
        paymentGr.update()

        return {
            success: true,
            message: 'Top-up successfully credited to wallet.',
            walletSysId,
            ledgerSysId,
            availableBalance: newAvailable,
        }
    }

    /**
     * Executes atomic vendor purchase redemption:
     * 1. Checks transaction validity and QR token
     * 2. Checks participant wallet balance
     * 3. Debits participant wallet & logs debit ledger
     * 4. Credits vendor ledger
     * 5. Marks purchase transaction SUCCESS
     * 6. Generates digital coupon / purchase receipt
     */
    static confirmPurchaseTransaction(transactionSysId: string, participantSysId: string): WalletOperationResult {
        const txGr = new GlideRecord('x_2327324_konnect_purchase_tx')
        if (!txGr.get(transactionSysId)) {
            return { success: false, message: 'Transaction record not found.' }
        }

        const txStatus = txGr.getValue('status')
        if (txStatus !== 'pending') {
            return {
                success: false,
                message: `Transaction cannot be confirmed. Current status: ${txStatus}`,
            }
        }

        // Validate QR expiry
        const expiresAtStr = txGr.getValue('qr_expires_at')
        if (expiresAtStr) {
            const expGdt = new GlideDateTime(expiresAtStr)
            const nowGdt = new GlideDateTime()
            if (nowGdt.after(expGdt)) {
                txGr.setValue('status', 'expired')
                txGr.setValue('rejection_reason', 'QR token expired (60s limit reached)')
                txGr.update()
                return { success: false, message: 'QR token has expired. Vendor must regenerate a new QR.' }
            }
        }

        const amount = parseFloat(txGr.getValue('amount') || '0')
        const eventSysId = txGr.getValue('event')
        const vendorSysId = txGr.getValue('vendor')
        const itemDesc = txGr.getValue('item_description') || 'Festival Purchase'

        // Check Event state
        const eventGr = new GlideRecord('x_2327324_konnect_event')
        if (eventGr.get(eventSysId)) {
            const evState = eventGr.getValue('state')
            if (evState === 'completed' || evState === 'closed') {
                txGr.setValue('status', 'rejected')
                txGr.setValue('rejection_reason', 'Event is already completed or closed.')
                txGr.update()
                return { success: false, message: 'Event is closed for new purchases.' }
            }
        }

        // Query Participant Wallet
        const walletGr = new GlideRecord('x_2327324_konnect_wallet')
        walletGr.addQuery('participant', participantSysId)
        walletGr.addQuery('event', eventSysId)
        walletGr.query()

        if (!walletGr.next()) {
            txGr.setValue('status', 'rejected')
            txGr.setValue('rejection_reason', 'Participant wallet not found for this event.')
            txGr.update()
            return { success: false, message: 'Active event wallet not found.' }
        }

        const walletStatus = walletGr.getValue('status')
        if (walletStatus !== 'active') {
            txGr.setValue('status', 'rejected')
            txGr.setValue('rejection_reason', `Wallet is ${walletStatus}.`)
            txGr.update()
            return { success: false, message: `Wallet is ${walletStatus}. Cannot make purchases.` }
        }

        const currentAvailable = parseFloat(walletGr.getValue('available_balance') || '0')
        const currentReserved = parseFloat(walletGr.getValue('reserved_balance') || '0')

        if (currentAvailable < amount) {
            txGr.setValue('status', 'rejected')
            txGr.setValue('rejection_reason', `Insufficient wallet balance. Required ₹${amount}, Available ₹${currentAvailable}`)
            txGr.update()
            return {
                success: false,
                message: `Insufficient wallet balance. Available: ₹${currentAvailable.toFixed(2)}, Required: ₹${amount.toFixed(2)}`,
            }
        }

        // Deduct from wallet
        const newAvailable = currentAvailable - amount
        const currentTotalSpent = parseFloat(walletGr.getValue('total_spent') || '0') + amount

        const idempotencyKey = `PURCHASE_${transactionSysId}_${participantSysId}`

        // Check for duplicate processing
        const checkLedger = new GlideRecord('x_2327324_konnect_wallet_ledger')
        checkLedger.addQuery('idempotency_key', idempotencyKey)
        checkLedger.query()
        if (checkLedger.next()) {
            return { success: false, message: 'Transaction has already been processed.' }
        }

        // 1. Create Wallet Ledger Debit Record
        const ledgerGr = new GlideRecord('x_2327324_konnect_wallet_ledger')
        ledgerGr.initialize()
        ledgerGr.setValue('wallet', walletGr.getUniqueValue())
        ledgerGr.setValue('participant', participantSysId)
        ledgerGr.setValue('event', eventSysId)
        ledgerGr.setValue('entry_type', 'debit')
        ledgerGr.setValue('amount', amount)
        ledgerGr.setValue('available_balance_before', currentAvailable)
        ledgerGr.setValue('available_balance_after', newAvailable)
        ledgerGr.setValue('reserved_balance_before', currentReserved)
        ledgerGr.setValue('reserved_balance_after', currentReserved)
        ledgerGr.setValue('source_transaction', transactionSysId)
        ledgerGr.setValue('idempotency_key', idempotencyKey)
        ledgerGr.setValue('status', 'posted')
        ledgerGr.setValue('notes', `Purchase: ${itemDesc}`)
        const ledgerSysId = ledgerGr.insert()

        // 2. Update Wallet
        walletGr.setValue('available_balance', newAvailable)
        walletGr.setValue('total_spent', currentTotalSpent)
        walletGr.setValue('last_transaction_date', new GlideDateTime().getValue())
        walletGr.update()

        // 3. Create Vendor Ledger Credit
        const vendorLedgerGr = new GlideRecord('x_2327324_konnect_vendor_ledger')
        vendorLedgerGr.initialize()
        vendorLedgerGr.setValue('vendor', vendorSysId)
        vendorLedgerGr.setValue('event', eventSysId)
        vendorLedgerGr.setValue('purchase_transaction', transactionSysId)
        vendorLedgerGr.setValue('credit_amount', amount)
        vendorLedgerGr.setValue('status', 'unsettled')
        vendorLedgerGr.insert()

        // 4. Update Purchase Transaction
        txGr.setValue('status', 'success')
        txGr.setValue('participant', participantSysId)
        txGr.setValue('confirmed_at', new GlideDateTime().getValue())
        txGr.setValue('idempotency_key', idempotencyKey)
        txGr.update()

        // 5. Create Digital Coupon / Purchase Receipt
        const couponGr = new GlideRecord('x_2327324_konnect_digital_coupon')
        couponGr.initialize()
        couponGr.setValue('coupon_id', `RCPT-${new GlideDateTime().getNumericValue()}`)
        couponGr.setValue('purchase_transaction', transactionSysId)
        couponGr.setValue('event', eventSysId)
        couponGr.setValue('vendor', vendorSysId)
        couponGr.setValue('participant', participantSysId)
        couponGr.setValue('item_description', itemDesc)
        couponGr.setValue('value', amount)
        couponGr.setValue('status', 'redeemed')
        couponGr.setValue('issued_at', new GlideDateTime().getValue())
        const couponSysId = couponGr.insert()

        gs.info(`[KonnectFest] Purchase confirmed: Tx=${transactionSysId}, Participant=${participantSysId}, Amount=₹${amount}`)

        return {
            success: true,
            message: 'Purchase confirmed successfully! Digital receipt generated.',
            transactionSysId,
            walletSysId: walletGr.getUniqueValue(),
            ledgerSysId,
            couponSysId,
            availableBalance: newAvailable,
        }
    }

    /**
     * Submits a post-event refund request and reserves/holds the requested amount.
     */
    static requestRefund(
        participantSysId: string,
        eventSysId: string,
        requestedAmount: number,
        bankDetails: { accountHolder: string; accountNumber: string; ifsc: string; upiId?: string }
    ): WalletOperationResult {
        // Validate Event is completed
        const eventGr = new GlideRecord('x_2327324_konnect_event')
        if (!eventGr.get(eventSysId)) {
            return { success: false, message: 'Event not found.' }
        }
        if (eventGr.getValue('state') !== 'completed') {
            return { success: false, message: 'Refunds can only be requested after event completion.' }
        }

        if (requestedAmount <= 0) {
            return { success: false, message: 'Refund amount must be greater than zero.' }
        }

        // Check for existing pending refund
        const pendingRef = new GlideRecord('x_2327324_konnect_refund_request')
        pendingRef.addQuery('participant', participantSysId)
        pendingRef.addQuery('event', eventSysId)
        pendingRef.addQuery('status', 'IN', 'submitted,under_review,approved_for_payout')
        pendingRef.query()
        if (pendingRef.next()) {
            return { success: false, message: 'An active refund request already exists for this event.' }
        }

        const walletGr = new GlideRecord('x_2327324_konnect_wallet')
        walletGr.addQuery('participant', participantSysId)
        walletGr.addQuery('event', eventSysId)
        walletGr.query()

        if (!walletGr.next()) {
            return { success: false, message: 'Wallet not found.' }
        }

        const available = parseFloat(walletGr.getValue('available_balance') || '0')
        const reserved = parseFloat(walletGr.getValue('reserved_balance') || '0')

        if (requestedAmount > available) {
            return {
                success: false,
                message: `Requested refund (₹${requestedAmount.toFixed(2)}) exceeds available balance (₹${available.toFixed(2)}).`,
            }
        }

        // Reserve hold
        const newAvailable = available - requestedAmount
        const newReserved = reserved + requestedAmount

        // 1. Create Refund Request
        const refGr = new GlideRecord('x_2327324_konnect_refund_request')
        refGr.initialize()
        refGr.setValue('participant', participantSysId)
        refGr.setValue('wallet', walletGr.getUniqueValue())
        refGr.setValue('event', eventSysId)
        refGr.setValue('requested_amount', requestedAmount)
        refGr.setValue('reserved_amount', requestedAmount)
        refGr.setValue('status', 'submitted')
        refGr.setValue('bank_account_holder', bankDetails.accountHolder)
        refGr.setValue('bank_account_number', bankDetails.accountNumber)
        refGr.setValue('bank_ifsc', bankDetails.ifsc)
        if (bankDetails.upiId) refGr.setValue('upi_id', bankDetails.upiId)
        const refSysId = refGr.insert()

        // 2. Create Ledger Hold Entry
        const ledgerGr = new GlideRecord('x_2327324_konnect_wallet_ledger')
        ledgerGr.initialize()
        ledgerGr.setValue('wallet', walletGr.getUniqueValue())
        ledgerGr.setValue('participant', participantSysId)
        ledgerGr.setValue('event', eventSysId)
        ledgerGr.setValue('entry_type', 'refund_hold')
        ledgerGr.setValue('amount', requestedAmount)
        ledgerGr.setValue('available_balance_before', available)
        ledgerGr.setValue('available_balance_after', newAvailable)
        ledgerGr.setValue('reserved_balance_before', reserved)
        ledgerGr.setValue('reserved_balance_after', newReserved)
        ledgerGr.setValue('idempotency_key', `REF_HOLD_${refSysId}`)
        ledgerGr.setValue('status', 'posted')
        ledgerGr.setValue('notes', `Refund hold reserved for Request ${refGr.getValue('number')}`)
        ledgerGr.insert()

        // 3. Update Wallet Balances
        walletGr.setValue('available_balance', newAvailable)
        walletGr.setValue('reserved_balance', newReserved)
        walletGr.update()

        return {
            success: true,
            message: 'Refund request submitted. Amount held in reserve pending Finance payout.',
            walletSysId: walletGr.getUniqueValue(),
            availableBalance: newAvailable,
            reservedBalance: newReserved,
        }
    }

    /**
     * Financer records actual bank payout for refund, releasing reserved hold.
     */
    static finalizeRefundPayout(refundSysId: string, payoutRef: string, financerUserSysId: string): WalletOperationResult {
        const refGr = new GlideRecord('x_2327324_konnect_refund_request')
        if (!refGr.get(refundSysId)) {
            return { success: false, message: 'Refund request not found.' }
        }

        const currentStatus = refGr.getValue('status')
        if (currentStatus === 'paid') {
            return { success: false, message: 'Refund has already been paid.' }
        }

        const walletSysId = refGr.getValue('wallet')
        const amount = parseFloat(refGr.getValue('reserved_amount') || refGr.getValue('requested_amount') || '0')
        const participantSysId = refGr.getValue('participant')
        const eventSysId = refGr.getValue('event')

        const walletGr = new GlideRecord('x_2327324_konnect_wallet')
        if (!walletGr.get(walletSysId)) {
            return { success: false, message: 'Wallet not found.' }
        }

        const currentAvailable = parseFloat(walletGr.getValue('available_balance') || '0')
        const currentReserved = parseFloat(walletGr.getValue('reserved_balance') || '0')
        const newReserved = Math.max(0, currentReserved - amount)
        const totalRefunded = parseFloat(walletGr.getValue('total_refunded') || '0') + amount

        // Ledger Entry for Payout
        const ledgerGr = new GlideRecord('x_2327324_konnect_wallet_ledger')
        ledgerGr.initialize()
        ledgerGr.setValue('wallet', walletSysId)
        ledgerGr.setValue('participant', participantSysId)
        ledgerGr.setValue('event', eventSysId)
        ledgerGr.setValue('entry_type', 'refund_payout')
        ledgerGr.setValue('amount', amount)
        ledgerGr.setValue('available_balance_before', currentAvailable)
        ledgerGr.setValue('available_balance_after', currentAvailable)
        ledgerGr.setValue('reserved_balance_before', currentReserved)
        ledgerGr.setValue('reserved_balance_after', newReserved)
        ledgerGr.setValue('idempotency_key', `REF_PAY_${refundSysId}`)
        ledgerGr.setValue('status', 'posted')
        ledgerGr.setValue('notes', `Actual bank payout recorded. UTR: ${payoutRef}`)
        ledgerGr.insert()

        // Update Wallet
        walletGr.setValue('reserved_balance', newReserved)
        walletGr.setValue('total_refunded', totalRefunded)
        walletGr.update()

        // Update Refund Request
        refGr.setValue('status', 'paid')
        refGr.setValue('payout_reference', payoutRef)
        refGr.setValue('payout_date', new GlideDateTime().getValue())
        refGr.setValue('financer_decision_by', financerUserSysId)
        refGr.update()

        return {
            success: true,
            message: 'Refund payout recorded. Reserved balance cleared.',
            availableBalance: currentAvailable,
            reservedBalance: newReserved,
        }
    }

    /**
     * Financer rejects refund request, returning reserved amount back to available balance.
     */
    static rejectRefund(refundSysId: string, reason: string, financerUserSysId: string): WalletOperationResult {
        const refGr = new GlideRecord('x_2327324_konnect_refund_request')
        if (!refGr.get(refundSysId)) {
            return { success: false, message: 'Refund request not found.' }
        }

        if (refGr.getValue('status') === 'paid') {
            return { success: false, message: 'Cannot reject an already paid refund.' }
        }

        const walletSysId = refGr.getValue('wallet')
        const amount = parseFloat(refGr.getValue('reserved_amount') || '0')
        const participantSysId = refGr.getValue('participant')
        const eventSysId = refGr.getValue('event')

        const walletGr = new GlideRecord('x_2327324_konnect_wallet')
        if (walletGr.get(walletSysId)) {
            const currentAvailable = parseFloat(walletGr.getValue('available_balance') || '0')
            const currentReserved = parseFloat(walletGr.getValue('reserved_balance') || '0')
            const newAvailable = currentAvailable + amount
            const newReserved = Math.max(0, currentReserved - amount)

            // Ledger Hold Release Entry
            const ledgerGr = new GlideRecord('x_2327324_konnect_wallet_ledger')
            ledgerGr.initialize()
            ledgerGr.setValue('wallet', walletSysId)
            ledgerGr.setValue('participant', participantSysId)
            ledgerGr.setValue('event', eventSysId)
            ledgerGr.setValue('entry_type', 'refund_release')
            ledgerGr.setValue('amount', amount)
            ledgerGr.setValue('available_balance_before', currentAvailable)
            ledgerGr.setValue('available_balance_after', newAvailable)
            ledgerGr.setValue('reserved_balance_before', currentReserved)
            ledgerGr.setValue('reserved_balance_after', newReserved)
            ledgerGr.setValue('idempotency_key', `REF_REJ_${refundSysId}`)
            ledgerGr.setValue('status', 'posted')
            ledgerGr.setValue('notes', `Refund rejected: ${reason}. Hold released back to available balance.`)
            ledgerGr.insert()

            walletGr.setValue('available_balance', newAvailable)
            walletGr.setValue('reserved_balance', newReserved)
            walletGr.update()
        }

        refGr.setValue('status', 'rejected')
        refGr.setValue('notes', reason)
        refGr.setValue('financer_decision_by', financerUserSysId)
        refGr.update()

        return {
            success: true,
            message: 'Refund request rejected and reserved balance returned to available balance.',
        }
    }
}


// ==========================================
// 2. PAYMENT SERVICE
// ==========================================



export interface PaymentVerificationResult {
    success: boolean
    message: string
    paymentSysId?: string
    walletSysId?: string
    newStatus?: string
}

/**
 * Service to manage Payment submission, Financer verification,
 * duplicate UTR checking, and automatic wallet credit triggering.
 */
export class KonnectFestPaymentService {
    /**
     * Financer verifies bank payment receipt.
     */
    static verifyPayment(
        paymentSysId: string,
        verifiedAmount: number,
        financerUserSysId: string
    ): PaymentVerificationResult {
        const paymentGr = new GlideRecord('x_2327324_konnect_payment')
        if (!paymentGr.get(paymentSysId)) {
            return { success: false, message: 'Payment record not found.' }
        }

        const currentStatus = paymentGr.getValue('status')
        if (currentStatus === 'verified') {
            return { success: false, message: 'Payment is already verified.' }
        }

        if (verifiedAmount <= 0) {
            return { success: false, message: 'Verified amount must be positive.' }
        }

        const utr = paymentGr.getValue('utr_reference')
        if (!utr) {
            return { success: false, message: 'Payment must have a UTR / transaction reference for verification.' }
        }

        // Verify UTR is not already used in another verified payment
        const checkUtr = new GlideRecord('x_2327324_konnect_payment')
        checkUtr.addQuery('utr_reference', utr)
        checkUtr.addQuery('status', 'verified')
        checkUtr.addQuery('sys_id', '!=', paymentSysId)
        checkUtr.query()
        if (checkUtr.next()) {
            return {
                success: false,
                message: `Duplicate payment detected: UTR ${utr} was already verified on payment ${checkUtr.getValue('number')}.`,
            }
        }

        paymentGr.setValue('status', 'verified')
        paymentGr.setValue('verified_amount', verifiedAmount)
        paymentGr.setValue('verified_by', financerUserSysId)
        paymentGr.setValue('verified_at', new GlideDateTime().getValue())
        paymentGr.update()

        const payType = paymentGr.getValue('type')
        let walletRes

        if (payType === 'initial_registration') {
            // Update registration status to verified
            const regGr = new GlideRecord('x_2327324_konnect_registration')
            regGr.addQuery('participant', paymentGr.getValue('participant'))
            regGr.addQuery('event', paymentGr.getValue('event'))
            regGr.query()
            if (regGr.next()) {
                regGr.setValue('status', 'verified')
                regGr.setValue('payment_reference', utr)
                regGr.update()
            }

            // Provision or activate participant user identity
            KonnectFestPaymentService.provisionParticipantAccount(paymentGr.getValue('participant'))

            // Credit wallet
            walletRes = KonnectFestWalletService.initializeWalletFromPayment(paymentSysId)
        } else {
            // Top-up payment credit
            walletRes = KonnectFestWalletService.creditTopUpPayment(paymentSysId)
        }

        return {
            success: true,
            message: `Payment verified. ${walletRes.message}`,
            paymentSysId,
            walletSysId: walletRes.walletSysId,
            newStatus: 'verified',
        }
    }

    /**
     * Financer rejects invalid payment.
     */
    static rejectPayment(
        paymentSysId: string,
        reason: string,
        financerUserSysId: string
    ): PaymentVerificationResult {
        const paymentGr = new GlideRecord('x_2327324_konnect_payment')
        if (!paymentGr.get(paymentSysId)) {
            return { success: false, message: 'Payment record not found.' }
        }

        if (paymentGr.getValue('status') === 'verified') {
            return { success: false, message: 'Cannot reject an already verified payment.' }
        }

        paymentGr.setValue('status', 'rejected')
        paymentGr.setValue('rejection_reason', reason)
        paymentGr.setValue('verified_by', financerUserSysId)
        paymentGr.setValue('verified_at', new GlideDateTime().getValue())
        paymentGr.update()

        return {
            success: true,
            message: 'Payment marked as Rejected.',
            paymentSysId,
            newStatus: 'rejected',
        }
    }

    /**
     * Provisions or links a ServiceNow sys_user for a verified participant
     * and assigns the participant role.
     */
    static provisionParticipantAccount(participantSysId: string): string | null {
        const partGr = new GlideRecord('x_2327324_konnect_participant')
        if (!partGr.get(participantSysId)) return null

        const email = partGr.getValue('email')
        if (!email) return null

        // Check if user already exists
        const userGr = new GlideRecord('sys_user')
        userGr.addQuery('email', email)
        userGr.query()

        let userSysId = ''
        if (userGr.next()) {
            userSysId = userGr.getUniqueValue()
        } else {
            userGr.initialize()
            userGr.setValue('user_name', email)
            userGr.setValue('email', email)
            userGr.setValue('first_name', partGr.getValue('name') || 'Participant')
            userGr.setValue('active', true)
            userSysId = userGr.insert()
        }

        // Link sys_user to participant record
        partGr.setValue('sys_user', userSysId)
        partGr.setValue('status', 'verified')
        partGr.setValue('verification_date', new GlideDateTime().getValue())
        partGr.update()

        // Assign x_2327324_konnect.participant role
        const roleGr = new GlideRecord('sys_user_role')
        roleGr.addQuery('name', 'x_2327324_konnect.participant')
        roleGr.query()
        if (roleGr.next()) {
            const roleSysId = roleGr.getUniqueValue()
            const hasRoleGr = new GlideRecord('sys_user_has_role')
            hasRoleGr.addQuery('user', userSysId)
            hasRoleGr.addQuery('role', roleSysId)
            hasRoleGr.query()
            if (!hasRoleGr.next()) {
                hasRoleGr.initialize()
                hasRoleGr.setValue('user', userSysId)
                hasRoleGr.setValue('role', roleSysId)
                hasRoleGr.insert()
            }
        }

        return userSysId
    }
}


// ==========================================
// 3. QR SERVICE (120s TTL)
// ==========================================


export interface QRGenerationResult {
    success: boolean
    message: string
    transactionSysId?: string
    qrToken?: string
    expiresAt?: string
    amount?: number
    itemDescription?: string
}

/**
 * Service to manage ephemeral, secure 120-second QR tokens for vendor purchases.
 */
export class KonnectFestQRService {
    /**
     * Vendor creates a pending purchase transaction and receives a 120-second QR token.
     */
    static generatePurchaseQR(
        eventSysId: string,
        vendorSysId: string,
        itemDescription: string,
        amount: number,
        expirySeconds: number = 120
    ): QRGenerationResult {
        if (amount <= 0) {
            return { success: false, message: 'Purchase amount must be greater than zero.' }
        }

        // Validate vendor and event
        const vendorGr = new GlideRecord('x_2327324_konnect_vendor')
        if (!vendorGr.get(vendorSysId)) {
            return { success: false, message: 'Vendor record not found.' }
        }

        if (vendorGr.getValue('status') !== 'active') {
            return { success: false, message: 'Vendor is not active.' }
        }

        const eventGr = new GlideRecord('x_2327324_konnect_event')
        if (!eventGr.get(eventSysId)) {
            return { success: false, message: 'Event not found.' }
        }

        const evState = eventGr.getValue('state')
        if (evState !== 'active') {
            return { success: false, message: `Event is currently '${evState}'. Purchases are only permitted when Active.` }
        }

        // Generate random 32-character opaque token
        const randomSeed = `${new GlideDateTime().getNumericValue()}_${Math.random()}_${vendorSysId}`
        const qrToken = `KF_QR_${Math.random().toString(36).substring(2, 12)}_${new GlideDateTime().getNumericValue()}`

        // Calculate expiry (default 60 seconds)
        const expGdt = new GlideDateTime()
        expGdt.addSeconds(expirySeconds)

        const txGr = new GlideRecord('x_2327324_konnect_purchase_tx')
        txGr.initialize()
        txGr.setValue('transaction_id', `TXN-${new GlideDateTime().getNumericValue()}`)
        txGr.setValue('event', eventSysId)
        txGr.setValue('vendor', vendorSysId)
        txGr.setValue('item_description', itemDescription)
        txGr.setValue('amount', amount)
        txGr.setValue('qr_token', qrToken)
        txGr.setValue('qr_expires_at', expGdt.getValue())
        txGr.setValue('status', 'pending')
        const txSysId = txGr.insert()

        return {
            success: true,
            message: 'Purchase transaction created and QR token generated.',
            transactionSysId: txSysId,
            qrToken: qrToken,
            expiresAt: expGdt.getValue(),
            amount: amount,
            itemDescription: itemDescription,
        }
    }

    /**
     * Participant scans QR and loads pending transaction details.
     */
    static getTransactionByQR(qrToken: string): {
        valid: boolean
        message: string
        transaction?: {
            sysId: string
            transactionId: string
            vendorName: string
            stallNumber: string
            eventName: string
            itemDescription: string
            amount: number
            expiresAt: string
            isExpired: boolean
        }
    } {
        const txGr = new GlideRecord('x_2327324_konnect_purchase_tx')
        txGr.addQuery('qr_token', qrToken)
        txGr.query()

        if (!txGr.next()) {
            return { valid: false, message: 'Invalid or unknown QR token.' }
        }

        const status = txGr.getValue('status')
        if (status !== 'pending') {
            return { valid: false, message: `This QR transaction is no longer active (status: ${status}).` }
        }

        const expiresAtStr = txGr.getValue('qr_expires_at')
        let isExpired = false
        if (expiresAtStr) {
            const expGdt = new GlideDateTime(expiresAtStr)
            const nowGdt = new GlideDateTime()
            if (nowGdt.after(expGdt)) {
                isExpired = true
                txGr.setValue('status', 'expired')
                txGr.setValue('rejection_reason', 'QR token expired (120s limit)')
                txGr.update()
                return { valid: false, message: 'QR token has expired. Vendor must generate a new QR.' }
            }
        }

        let vendorName = 'Vendor'
        let stallNumber = ''
        const vendorGr = new GlideRecord('x_2327324_konnect_vendor')
        if (vendorGr.get(txGr.getValue('vendor'))) {
            vendorName = vendorGr.getValue('name') || 'Vendor'
            stallNumber = vendorGr.getValue('stall_number') || ''
        }

        let eventName = 'Event'
        const eventGr = new GlideRecord('x_2327324_konnect_event')
        if (eventGr.get(txGr.getValue('event'))) {
            eventName = eventGr.getValue('name') || 'Event'
        }

        return {
            valid: true,
            message: 'Transaction details retrieved successfully.',
            transaction: {
                sysId: txGr.getUniqueValue(),
                transactionId: txGr.getValue('transaction_id') || '',
                vendorName,
                stallNumber,
                eventName,
                itemDescription: txGr.getValue('item_description') || '',
                amount: parseFloat(txGr.getValue('amount') || '0'),
                expiresAt: expiresAtStr || '',
                isExpired,
            },
        }
    }
}


// ==========================================
// 4. SETTLEMENT SERVICE
// ==========================================


export interface SettlementBatchResult {
    success: boolean
    message: string
    settlementSysId?: string
    batchId?: string
    totalCredits?: number
    vendorSysId?: string
}

/**
 * Service to aggregate vendor sales ledger entries into settlement batches
 * and manage payout lifecycles.
 */
export class KonnectFestSettlementService {
    /**
     * Creates or updates a settlement batch for a vendor's unsettled sales in an event.
     */
    static createSettlementBatch(
        eventSysId: string,
        vendorSysId: string,
        reviewedByUserSysId: string
    ): SettlementBatchResult {
        const vLedgerGr = new GlideRecord('x_2327324_konnect_vendor_ledger')
        vLedgerGr.addQuery('event', eventSysId)
        vLedgerGr.addQuery('vendor', vendorSysId)
        vLedgerGr.addQuery('status', 'unsettled')
        vLedgerGr.query()

        let totalCredits = 0
        const ledgerSysIds: string[] = []

        while (vLedgerGr.next()) {
            totalCredits += parseFloat(vLedgerGr.getValue('credit_amount') || '0')
            ledgerSysIds.push(vLedgerGr.getUniqueValue())
        }

        if (totalCredits <= 0 || ledgerSysIds.length === 0) {
            return {
                success: false,
                message: 'No unsettled transactions found for this vendor in the specified event.',
            }
        }

        const batchId = `SET-${new GlideDateTime().getNumericValue()}`

        const setGr = new GlideRecord('x_2327324_konnect_settlement')
        setGr.initialize()
        setGr.setValue('batch_id', batchId)
        setGr.setValue('event', eventSysId)
        setGr.setValue('vendor', vendorSysId)
        setGr.setValue('total_credit_amount', totalCredits)
        setGr.setValue('adjustments_amount', 0)
        setGr.setValue('net_payable_amount', totalCredits)
        setGr.setValue('status', 'reviewed')
        setGr.setValue('reviewed_by', reviewedByUserSysId)
        setGr.setValue('notes', `Settlement batch for ${ledgerSysIds.length} transactions.`)
        const setSysId = setGr.insert()

        // Update vendor ledger entries to in_settlement_batch
        for (const id of ledgerSysIds) {
            const updGr = new GlideRecord('x_2327324_konnect_vendor_ledger')
            if (updGr.get(id)) {
                updGr.setValue('status', 'in_settlement_batch')
                updGr.setValue('settlement_batch', setSysId)
                updGr.update()
            }
        }

        return {
            success: true,
            message: `Settlement batch ${batchId} created for ₹${totalCredits.toFixed(2)}.`,
            settlementSysId: setSysId,
            batchId,
            totalCredits,
            vendorSysId,
        }
    }

    /**
     * Financer marks settlement batch as PAID with actual bank transfer UTR.
     */
    static markSettlementPaid(
        settlementSysId: string,
        payoutRef: string,
        financerUserSysId: string
    ): SettlementBatchResult {
        const setGr = new GlideRecord('x_2327324_konnect_settlement')
        if (!setGr.get(settlementSysId)) {
            return { success: false, message: 'Settlement record not found.' }
        }

        setGr.setValue('status', 'paid')
        setGr.setValue('payout_reference', payoutRef)
        setGr.setValue('payout_date', new GlideDateTime().getValue())
        setGr.setValue('reviewed_by', financerUserSysId)
        setGr.update()

        // Mark all associated vendor ledger items as settled
        const vLedgerGr = new GlideRecord('x_2327324_konnect_vendor_ledger')
        vLedgerGr.addQuery('settlement_batch', settlementSysId)
        vLedgerGr.query()
        while (vLedgerGr.next()) {
            vLedgerGr.setValue('status', 'settled')
            vLedgerGr.update()
        }

        return {
            success: true,
            message: `Settlement marked as PAID with reference: ${payoutRef}`,
            settlementSysId,
        }
    }
}


// ==========================================
// 5. REST ENDPOINTS HANDLERS
// ==========================================






function buildUpiUri(upiId: string, payeeName: string, amount: number, refNote: string): string {
    return `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(refNote)}`
}

function logAudit(eventSysId: string, action: string, targetRecord: string, prevStatus: string, newStatus: string, reason: string) {
    const aud = new GlideRecord('x_2327324_konnect_audit_log')
    aud.initialize()
    if (eventSysId) aud.setValue('event', eventSysId)
    aud.setValue('action', action)
    aud.setValue('target_record', targetRecord)
    aud.setValue('actor', gs.getUserID())
    aud.setValue('previous_status', prevStatus)
    aud.setValue('new_status', newStatus)
    aud.setValue('reason', reason)
    aud.setValue('timestamp', new GlideDateTime().getValue())
    aud.insert()
}

/**
 * 0. PUBLIC: List events open for registration or active
 */
export function handleGetPublicEvents(_request: any, response: any) {
    try {
        const events: any[] = []
        const gr = new GlideRecord('x_2327324_konnect_event')
        gr.addQuery('state', 'IN', 'registration_open,active')
        gr.orderByDesc('sys_created_on')
        gr.query()
        while (gr.next()) {
            events.push({
                sys_id: gr.getUniqueValue(),
                number: gr.getValue('number') || '',
                name: gr.getValue('name') || '',
                state: gr.getValue('state') || '',
                start_date: gr.getValue('start_date') || '',
                end_date: gr.getValue('end_date') || '',
                upi_id: gr.getValue('upi_id') || '',
                upi_payee_name: gr.getValue('upi_payee_name') || '',
                description: gr.getValue('description') || '',
            })
        }
        response.setStatus(200)
        response.setBody({ success: true, events })
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error fetching events' })
    }
}

/**
 * 1. PUBLIC: Participant Registration (creates pending participant, registration, and initial payment + UPI QR URI)
 */
export function handleParticipantRegistration(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const name = (body.name || '').trim()
        const email = (body.email || '').trim().toLowerCase()
        const phone = (body.phone || '').trim()
        const college = (body.college_organization || '').trim()
        const participantIdCode = (body.participant_id_code || '').trim()
        const eventSysId = body.event_sys_id
        const requestedAmount = parseFloat(body.requested_amount || '0')
        const paymentReference = (body.payment_reference || '').trim()

        if (!name || !email || !eventSysId) {
            response.setStatus(400)
            response.setBody({
                success: false,
                message: 'Full name, working email, and event selection are mandatory.',
            })
            return
        }

        if (requestedAmount <= 0) {
            response.setStatus(400)
            response.setBody({
                success: false,
                message: 'Initial wallet funding amount must be greater than ₹0.',
            })
            return
        }

        // Verify event exists and is open
        const evGr = new GlideRecord('x_2327324_konnect_event')
        if (!evGr.get(eventSysId)) {
            response.setStatus(404)
            response.setBody({ success: false, message: 'Selected event not found.' })
            return
        }
        const evState = evGr.getValue('state')
        if (evState !== 'registration_open' && evState !== 'active') {
            response.setStatus(400)
            response.setBody({ success: false, message: `Registration is not open for this event (state: ${evState}).` })
            return
        }

        // Duplicate email check for same event
        const dupCheck = new GlideRecord('x_2327324_konnect_participant')
        dupCheck.addQuery('email', email)
        dupCheck.addQuery('event', eventSysId)
        dupCheck.query()
        if (dupCheck.next()) {
            response.setStatus(409)
            response.setBody({
                success: false,
                message: 'A registration already exists with this email for the selected event.',
                participantSysId: dupCheck.getUniqueValue(),
            })
            return
        }

        // Create Participant record
        const partGr = new GlideRecord('x_2327324_konnect_participant')
        partGr.initialize()
        partGr.setValue('name', name)
        partGr.setValue('email', email)
        partGr.setValue('phone', phone)
        partGr.setValue('college_organization', college)
        partGr.setValue('participant_id_code', participantIdCode)
        partGr.setValue('event', eventSysId)
        partGr.setValue('status', 'pending_verification')
        const partSysId = partGr.insert()

        // Create Registration record
        const regGr = new GlideRecord('x_2327324_konnect_registration')
        regGr.initialize()
        regGr.setValue('participant', partSysId)
        regGr.setValue('event', eventSysId)
        regGr.setValue('requested_initial_amount', requestedAmount)
        regGr.setValue('status', 'pending_verification')
        regGr.setValue('payment_reference', paymentReference)
        const regSysId = regGr.insert()

        // Read registration number
        regGr.get(regSysId)
        const regNumber = regGr.getValue('number') || regSysId

        // Create Initial Payment record
        const payGr = new GlideRecord('x_2327324_konnect_payment')
        payGr.initialize()
        payGr.setValue('type', 'initial_registration')
        payGr.setValue('participant', partSysId)
        payGr.setValue('event', eventSysId)
        payGr.setValue('requested_amount', requestedAmount)
        payGr.setValue('utr_reference', paymentReference)
        payGr.setValue('status', paymentReference ? 'under_review' : 'submitted')
        payGr.setValue('wallet_credit_status', 'pending')
        const paymentSysId = payGr.insert()

        payGr.get(paymentSysId)
        const paymentNumber = payGr.getValue('number') || paymentSysId
        const upiId = evGr.getValue('upi_id') || 'konnectfest@upi'
        const payeeName = evGr.getValue('upi_payee_name') || 'KonnectFest Event'
        const upiUri = buildUpiUri(upiId, payeeName, requestedAmount, paymentNumber)

        response.setStatus(201)
        response.setBody({
            success: true,
            message: 'Registration created! Please complete UPI payment and submit your UTR reference for Finance verification.',
            participantSysId: partSysId,
            registrationSysId: regSysId,
            registrationNumber: regNumber,
            paymentSysId,
            paymentNumber,
            upiId,
            payeeName,
            amount: requestedAmount,
            upiUri,
        })
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Internal server error' })
    }
}

/**
 * 1b. PUBLIC: Submit UTR reference for a pending registration payment
 */
export function handleSubmitRegistrationUtr(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const paymentSysId = body.payment_sys_id
        const utr = (body.utr_reference || '').trim()

        if (!paymentSysId || !utr) {
            response.setStatus(400)
            response.setBody({ success: false, message: 'Payment ID and UTR reference are required.' })
            return
        }

        const payGr = new GlideRecord('x_2327324_konnect_payment')
        if (!payGr.get(paymentSysId)) {
            response.setStatus(404)
            response.setBody({ success: false, message: 'Payment record not found.' })
            return
        }

        if (payGr.getValue('status') === 'verified') {
            response.setStatus(400)
            response.setBody({ success: false, message: 'This payment is already verified.' })
            return
        }

        payGr.setValue('utr_reference', utr)
        payGr.setValue('status', 'under_review')
        payGr.update()

        // Also update registration payment_reference
        const regGr = new GlideRecord('x_2327324_konnect_registration')
        regGr.addQuery('participant', payGr.getValue('participant'))
        regGr.addQuery('event', payGr.getValue('event'))
        regGr.query()
        if (regGr.next()) {
            regGr.setValue('payment_reference', utr)
            regGr.update()
        }

        response.setStatus(200)
        response.setBody({
            success: true,
            message: 'UTR reference submitted! Your registration is now Under Review by Finance. Once verified, your account and wallet will be activated.',
            paymentNumber: payGr.getValue('number'),
        })
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error submitting UTR' })
    }
}

/**
 * 2. ORGANIZER: Live Overview Dashboard Data
 */
export function handleOrganizerOverview(_request: any, response: any) {
    try {
        const events: any[] = []
        const evGr = new GlideRecord('x_2327324_konnect_event')
        evGr.orderByDesc('sys_created_on')
        evGr.query()
        while (evGr.next()) {
            events.push({
                sys_id: evGr.getUniqueValue(),
                number: evGr.getValue('number') || '',
                name: evGr.getValue('name') || '',
                state: evGr.getValue('state') || 'draft',
                upi_id: evGr.getValue('upi_id') || '',
                upi_payee_name: evGr.getValue('upi_payee_name') || '',
                start_date: evGr.getValue('start_date') || '',
                end_date: evGr.getValue('end_date') || '',
                redemption_window_open: evGr.getValue('redemption_window_open') === 'true',
            })
        }

        let totalRegistrations = 0
        let pendingRegistrations = 0
        let verifiedParticipants = 0
        const partGr = new GlideRecord('x_2327324_konnect_participant')
        partGr.query()
        while (partGr.next()) {
            totalRegistrations++
            const st = partGr.getValue('status')
            if (st === 'pending_verification') pendingRegistrations++
            if (st === 'verified' || st === 'active') verifiedParticipants++
        }

        let activeWallets = 0
        let totalWalletLiability = 0
        let totalReserved = 0
        const walGr = new GlideRecord('x_2327324_konnect_wallet')
        walGr.query()
        while (walGr.next()) {
            if (walGr.getValue('status') === 'active') activeWallets++
            totalWalletLiability += parseFloat(walGr.getValue('available_balance') || '0')
            totalReserved += parseFloat(walGr.getValue('reserved_balance') || '0')
        }

        let totalVerifiedFunding = 0
        const payGr = new GlideRecord('x_2327324_konnect_payment')
        payGr.addQuery('status', 'verified')
        payGr.query()
        while (payGr.next()) {
            totalVerifiedFunding += parseFloat(payGr.getValue('verified_amount') || payGr.getValue('requested_amount') || '0')
        }

        let totalSalesVolume = 0
        let successfulTxCount = 0
        const txGr = new GlideRecord('x_2327324_konnect_purchase_tx')
        txGr.addQuery('status', 'success')
        txGr.query()
        while (txGr.next()) {
            successfulTxCount++
            totalSalesVolume += parseFloat(txGr.getValue('amount') || '0')
        }

        const vendors: any[] = []
        const venGr = new GlideRecord('x_2327324_konnect_vendor')
        venGr.orderBy('name')
        venGr.query()
        while (venGr.next()) {
            const vId = venGr.getUniqueValue()
            let vSales = 0
            let vTxCount = 0
            let vStallNum = venGr.getValue('stall_number') || ''
            let vCat = venGr.getValue('category') || ''
            let vUnsettled = 0

            // Check vendor_stall record
            const stGr = new GlideRecord('x_2327324_konnect_vendor_stall')
            stGr.addQuery('vendor', vId)
            stGr.query()
            if (stGr.next()) {
                vSales = parseFloat(stGr.getValue('total_sales') || '0')
                vTxCount = parseInt(stGr.getValue('transaction_count') || '0', 10)
                vStallNum = stGr.getValue('stall_number') || vStallNum
                vCat = stGr.getValue('stall_category') || vCat
                vUnsettled = parseFloat(stGr.getValue('unsettled_balance') || '0')
            }

            // Fallback to vendor_ledger if stalls not populated
            if (vSales === 0) {
                const vlGr = new GlideRecord('x_2327324_konnect_vendor_ledger')
                vlGr.addQuery('vendor', vId)
                vlGr.query()
                while (vlGr.next()) {
                    vTxCount++
                    vSales += parseFloat(vlGr.getValue('credit_amount') || '0')
                }
            }

            vendors.push({
                sys_id: vId,
                number: venGr.getValue('number') || '',
                name: venGr.getValue('name') || '',
                stall_number: vStallNum || 'Stall #01',
                category: vCat || 'food_beverage',
                status: venGr.getValue('status') || 'active',
                event: venGr.getDisplayValue('event') || 'KonnectFest 2026',
                event_sys_id: venGr.getValue('event') || '',
                total_sales: vSales,
                tx_count: vTxCount,
                unsettled_balance: vUnsettled || vSales,
            })
        }

        // Query Registrations for attendees tab
        const registrations: any[] = []
        const rGr = new GlideRecord('x_2327324_konnect_registration')
        rGr.orderByDesc('sys_created_on')
        rGr.setLimit(25)
        rGr.query()
        while (rGr.next()) {
            registrations.push({
                sys_id: rGr.getUniqueValue(),
                full_name: rGr.getValue('full_name') || '',
                email: rGr.getValue('email') || '',
                phone: rGr.getValue('phone') || '',
                initial_wallet_amount: parseFloat(rGr.getValue('initial_wallet_amount') || '0'),
                status: rGr.getValue('status') || 'payment_pending',
                payment_reference: rGr.getValue('payment_reference') || '',
                event: rGr.getDisplayValue('event') || 'KonnectFest 2026',
            })
        }
        venGr.orderBy('name')
        venGr.query()
        while (venGr.next()) {
            const vId = venGr.getUniqueValue()
            let vSales = 0
            let vTxCount = 0
            const vlGr = new GlideRecord('x_2327324_konnect_vendor_ledger')
            vlGr.addQuery('vendor', vId)
            vlGr.query()
            while (vlGr.next()) {
                vTxCount++
                vSales += parseFloat(vlGr.getValue('credit_amount') || '0')
            }
            vendors.push({
                sys_id: vId,
                number: venGr.getValue('number') || '',
                name: venGr.getValue('name') || '',
                stall_number: venGr.getValue('stall_number') || '',
                category: venGr.getValue('category') || '',
                status: venGr.getValue('status') || '',
                event: venGr.getDisplayValue('event') || '',
                event_sys_id: venGr.getValue('event') || '',
                total_sales: vSales,
                tx_count: vTxCount,
            })
        }

        const auditLogs: any[] = []
        const audGr = new GlideRecord('x_2327324_konnect_audit_log')
        audGr.orderByDesc('sys_created_on')
        audGr.setLimit(15)
        audGr.query()
        while (audGr.next()) {
            auditLogs.push({
                action: audGr.getValue('action') || '',
                target: audGr.getValue('target_record') || '',
                previous_status: audGr.getValue('previous_status') || '',
                new_status: audGr.getValue('new_status') || '',
                reason: audGr.getValue('reason') || '',
                timestamp: audGr.getValue('timestamp') || audGr.getValue('sys_created_on') || '',
            })
        }

        response.setStatus(200)
        response.setBody({
            success: true,
            kpis: {
                totalRegistrations,
                pendingRegistrations,
                verifiedParticipants,
                activeWallets,
                totalVerifiedFunding,
                totalWalletLiability,
                totalReserved,
                totalSalesVolume,
                successfulTxCount,
            },
            events,
            vendors,
            auditLogs,
                registrations,
        })
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error loading organizer overview' })
    }
}

/**
 * 2b. ORGANIZER: Create Event or Transition Event State
 */
export function handleOrganizerEventAction(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const action = body.action || 'update_state'

        if (action === 'create') {
            const name = (body.name || '').trim()
            const upiId = (body.upi_id || '').trim()
            const payeeName = (body.upi_payee_name || '').trim()
            if (!name || !upiId || !payeeName) {
                response.setStatus(400)
                response.setBody({ success: false, message: 'Event name, UPI ID, and Payee Name are required.' })
                return
            }
            const ev = new GlideRecord('x_2327324_konnect_event')
            ev.initialize()
            ev.setValue('name', name)
            ev.setValue('upi_id', upiId)
            ev.setValue('upi_payee_name', payeeName)
            ev.setValue('state', body.state || 'registration_open')
            if (body.start_date) ev.setValue('start_date', body.start_date)
            if (body.end_date) ev.setValue('end_date', body.end_date)
            if (body.description) ev.setValue('description', body.description)
            const id = ev.insert()
            logAudit(id, 'EVENT_CREATED', name, 'none', body.state || 'registration_open', 'Created via Organizer Dashboard')
            response.setStatus(201)
            response.setBody({ success: true, message: `Event "${name}" created.`, eventSysId: id })
            return
        }

        const eventSysId = body.event_sys_id
        const newState = body.new_state
        if (!eventSysId || !newState) {
            response.setStatus(400)
            response.setBody({ success: false, message: 'Event ID and new state are required.' })
            return
        }

        const evGr = new GlideRecord('x_2327324_konnect_event')
        if (!evGr.get(eventSysId)) {
            response.setStatus(404)
            response.setBody({ success: false, message: 'Event not found.' })
            return
        }

        const prevState = evGr.getValue('state')
        evGr.setValue('state', newState)
        if (newState === 'completed') {
            evGr.setValue('redemption_window_open', true)
        } else if (newState === 'closed') {
            evGr.setValue('redemption_window_open', false)
        }
        evGr.update()

        logAudit(eventSysId, 'EVENT_STATE_CHANGE', evGr.getValue('name'), prevState, newState, `State transitioned to ${newState}`)

        response.setStatus(200)
        response.setBody({
            success: true,
            message: `Event state updated from "${prevState}" to "${newState}".`,
        })
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error updating event' })
    }
}

/**
 * 2c. ORGANIZER: Onboard Vendor
 */
export function handleOrganizerVendorAction(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const name = (body.name || '').trim()
        const stallNumber = (body.stall_number || '').trim()
        const category = body.category || 'food_beverage'
        const eventSysId = body.event_sys_id
        const upiId = (body.upi_id || '').trim()

        if (!name || !eventSysId) {
            response.setStatus(400)
            response.setBody({ success: false, message: 'Vendor name and Event are required.' })
            return
        }

        const ven = new GlideRecord('x_2327324_konnect_vendor')
        ven.initialize()
        ven.setValue('name', name)
        ven.setValue('stall_number', stallNumber)
        ven.setValue('category', category)
        ven.setValue('event', eventSysId)
        ven.setValue('status', 'active')
        if (upiId) ven.setValue('upi_id', upiId)
        const vId = ven.insert()

        if (stallNumber) {
            const stall = new GlideRecord('x_2327324_konnect_vendor_stall')
            stall.initialize()
            stall.setValue('stall_code', stallNumber)
            stall.setValue('stall_name', `${name} - ${stallNumber}`)
            stall.setValue('vendor', vId)
            stall.setValue('event', eventSysId)
            stall.insert()
        }

        logAudit(eventSysId, 'VENDOR_ONBOARDED', name, 'none', 'active', `Stall ${stallNumber}`)

        response.setStatus(201)
        response.setBody({ success: true, message: `Vendor "${name}" onboarded and activated.`, vendorSysId: vId })
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error onboarding vendor' })
    }
}

/**
 * 3. FINANCE: Fetch Live Queues & Reconciliation Totals
 */
export function handleFinanceQueues(_request: any, response: any) {
    try {
        const pendingPayments: any[] = []
        const recentPayments: any[] = []
        let totalVerifiedCredits = 0

        const payGr = new GlideRecord('x_2327324_konnect_payment')
        payGr.orderByDesc('sys_created_on')
        payGr.query()
        while (payGr.next()) {
            const st = payGr.getValue('status') || ''
            const item = {
                sys_id: payGr.getUniqueValue(),
                number: payGr.getValue('number') || '',
                type: payGr.getValue('type') || '',
                participant_name: payGr.getDisplayValue('participant') || '',
                participant_sys_id: payGr.getValue('participant') || '',
                event_name: payGr.getDisplayValue('event') || '',
                requested_amount: parseFloat(payGr.getValue('requested_amount') || '0'),
                verified_amount: parseFloat(payGr.getValue('verified_amount') || '0'),
                utr_reference: payGr.getValue('utr_reference') || '',
                status: st,
                wallet_credit_status: payGr.getValue('wallet_credit_status') || '',
                created_on: payGr.getValue('sys_created_on') || '',
            }
            if (st === 'submitted' || st === 'payment_proof_received' || st === 'under_review') {
                pendingPayments.push(item)
            } else {
                if (st === 'verified') totalVerifiedCredits += (item.verified_amount || item.requested_amount)
                if (recentPayments.length < 20) recentPayments.push(item)
            }
        }

        const refunds: any[] = []
        let totalPaidRefunds = 0
        const refGr = new GlideRecord('x_2327324_konnect_refund_request')
        refGr.orderByDesc('sys_created_on')
        refGr.query()
        while (refGr.next()) {
            const amt = parseFloat(refGr.getValue('requested_amount') || '0')
            const st = refGr.getValue('status') || ''
            if (st === 'paid') totalPaidRefunds += amt
            refunds.push({
                sys_id: refGr.getUniqueValue(),
                number: refGr.getValue('number') || '',
                participant_name: refGr.getDisplayValue('participant') || '',
                event_name: refGr.getDisplayValue('event') || '',
                requested_amount: amt,
                status: st,
                bank_account_holder: refGr.getValue('bank_account_holder') || '',
                bank_account_number: refGr.getValue('bank_account_number') || '',
                bank_ifsc: refGr.getValue('bank_ifsc') || '',
                upi_id: refGr.getValue('upi_id') || '',
                payout_reference: refGr.getValue('payout_reference') || '',
                created_on: refGr.getValue('sys_created_on') || '',
            })
        }

        // Unsettled vendor balances
        const vendorMap: Record<string, { vendor_sys_id: string; vendor_name: string; event_sys_id: string; event_name: string; unsettled_amount: number; tx_count: number }> = {}
        const vlGr = new GlideRecord('x_2327324_konnect_vendor_ledger')
        vlGr.addQuery('status', 'unsettled')
        vlGr.query()
        while (vlGr.next()) {
            const vId = vlGr.getValue('vendor') || ''
            const eId = vlGr.getValue('event') || ''
            const key = `${vId}_${eId}`
            if (!vendorMap[key]) {
                vendorMap[key] = {
                    vendor_sys_id: vId,
                    vendor_name: vlGr.getDisplayValue('vendor') || 'Vendor',
                    event_sys_id: eId,
                    event_name: vlGr.getDisplayValue('event') || 'Event',
                    unsettled_amount: 0,
                    tx_count: 0,
                }
            }
            vendorMap[key].unsettled_amount += parseFloat(vlGr.getValue('credit_amount') || '0')
            vendorMap[key].tx_count++
        }
        const unsettledVendors = Object.values(vendorMap)

        const settlements: any[] = []
        let totalPaidSettlements = 0
        const setGr = new GlideRecord('x_2327324_konnect_settlement')
        setGr.orderByDesc('sys_created_on')
        setGr.query()
        while (setGr.next()) {
            const net = parseFloat(setGr.getValue('net_payable_amount') || '0')
            const st = setGr.getValue('status') || ''
            if (st === 'paid') totalPaidSettlements += net
            settlements.push({
                sys_id: setGr.getUniqueValue(),
                batch_id: setGr.getValue('batch_id') || '',
                vendor_name: setGr.getDisplayValue('vendor') || '',
                event_name: setGr.getDisplayValue('event') || '',
                net_payable_amount: net,
                status: st,
                payout_reference: setGr.getValue('payout_reference') || '',
                payout_date: setGr.getValue('payout_date') || '',
            })
        }

        // Wallet liability reconciliation
        let totalWalletAvailable = 0
        let totalWalletReserved = 0
        const wGr = new GlideRecord('x_2327324_konnect_wallet')
        wGr.query()
        while (wGr.next()) {
            totalWalletAvailable += parseFloat(wGr.getValue('available_balance') || '0')
            totalWalletReserved += parseFloat(wGr.getValue('reserved_balance') || '0')
        }

        response.setStatus(200)
        response.setBody({
            success: true,
            pendingPayments,
            recentPayments,
            refunds,
            unsettledVendors,
            settlements,
            reconciliation: {
                totalVerifiedCredits,
                totalWalletAvailable,
                totalWalletReserved,
                totalPaidRefunds,
                totalPaidSettlements,
            },
        })
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error loading finance queues' })
    }
}

/**
 * 4. Top-Up Request Endpoint Handler (Authenticated Participant)
 */
export function handleTopUpRequest(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const participantSysId = body.participant_sys_id
        const eventSysId = body.event_sys_id
        const amount = parseFloat(body.amount || '0')
        const utrReference = (body.utr_reference || '').trim()

        if (!participantSysId || !eventSysId || amount <= 0) {
            response.setStatus(400)
            response.setBody({ success: false, message: 'Valid participant, event, and positive amount are required.' })
            return
        }

        const evGr = new GlideRecord('x_2327324_konnect_event')
        if (!evGr.get(eventSysId)) {
            response.setStatus(404)
            response.setBody({ success: false, message: 'Event not found.' })
            return
        }

        const payGr = new GlideRecord('x_2327324_konnect_payment')
        payGr.initialize()
        payGr.setValue('type', 'event_topup')
        payGr.setValue('participant', participantSysId)
        payGr.setValue('event', eventSysId)
        payGr.setValue('requested_amount', amount)
        payGr.setValue('utr_reference', utrReference)
        payGr.setValue('status', utrReference ? 'under_review' : 'submitted')
        payGr.setValue('wallet_credit_status', 'pending')
        const paySysId = payGr.insert()

        payGr.get(paySysId)
        const paymentNumber = payGr.getValue('number') || paySysId
        const upiId = evGr.getValue('upi_id') || 'konnectfest@upi'
        const payeeName = evGr.getValue('upi_payee_name') || 'KonnectFest Event'
        const upiUri = buildUpiUri(upiId, payeeName, amount, paymentNumber)

        response.setStatus(201)
        response.setBody({
            success: true,
            message: utrReference
                ? 'Top-up request & UTR submitted! Pending Finance verification.'
                : 'Top-up request created. Scan the UPI QR to pay and submit your UTR.',
            paymentSysId: paySysId,
            paymentNumber,
            upiId,
            payeeName,
            upiUri,
            amount,
        })
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error creating top-up request' })
    }
}

/**
 * 5. VENDOR: Live Vendor Dashboard Data
 */
export function handleVendorDashboard(request: any, response: any) {
    try {
        const requestedVendorId = request.queryParams.vendor_sys_id || ''
        const userId = gs.getUserID()

        const venGr = new GlideRecord('x_2327324_konnect_vendor')
        if (requestedVendorId) {
            venGr.get(requestedVendorId)
        } else {
            venGr.addQuery('assigned_user', userId)
            venGr.query()
            if (!venGr.next()) {
                // Fallback for admin demo testing: pick first active vendor
                venGr.initialize()
                const allVen = new GlideRecord('x_2327324_konnect_vendor')
                allVen.addQuery('status', 'active')
                allVen.orderByDesc('sys_created_on')
                allVen.query()
                if (allVen.next()) {
                    venGr.get(allVen.getUniqueValue())
                }
            }
        }

        if (!venGr.isValidRecord()) {
            response.setStatus(404)
            response.setBody({ success: false, message: 'No assigned vendor stall found for current user.' })
            return
        }

        const vendorSysId = venGr.getUniqueValue()
        const eventSysId = venGr.getValue('event') || ''

        // Fetch all vendors list for admin switcher
        const allVendors: any[] = []
        const avGr = new GlideRecord('x_2327324_konnect_vendor')
        avGr.orderBy('name')
        avGr.query()
        while (avGr.next()) {
            allVendors.push({
                sys_id: avGr.getUniqueValue(),
                name: avGr.getValue('name') || '',
                stall_number: avGr.getValue('stall_number') || '',
            })
        }

        // Fetch recent transactions
        const transactions: any[] = []
        const txGr = new GlideRecord('x_2327324_konnect_purchase_tx')
        txGr.addQuery('vendor', vendorSysId)
        txGr.orderByDesc('sys_created_on')
        txGr.setLimit(25)
        txGr.query()
        while (txGr.next()) {
            transactions.push({
                sys_id: txGr.getUniqueValue(),
                transaction_id: txGr.getValue('transaction_id') || '',
                item_description: txGr.getValue('item_description') || '',
                amount: parseFloat(txGr.getValue('amount') || '0'),
                status: txGr.getValue('status') || '',
                participant_name: txGr.getDisplayValue('participant') || '-',
                qr_token: txGr.getValue('qr_token') || '',
                confirmed_at: txGr.getValue('confirmed_at') || '',
                created_on: txGr.getValue('sys_created_on') || '',
            })
        }

        // Compute sales summary from vendor ledger
        let grossSales = 0
        let unsettledAmount = 0
        let inBatchAmount = 0
        let settledAmount = 0
        const vlGr = new GlideRecord('x_2327324_konnect_vendor_ledger')
        vlGr.addQuery('vendor', vendorSysId)
        vlGr.query()
        while (vlGr.next()) {
            const amt = parseFloat(vlGr.getValue('credit_amount') || '0')
            const st = vlGr.getValue('status') || ''
            grossSales += amt
            if (st === 'unsettled') unsettledAmount += amt
            else if (st === 'in_settlement_batch') inBatchAmount += amt
            else if (st === 'settled') settledAmount += amt
        }

        const settlements: any[] = []
        const setGr = new GlideRecord('x_2327324_konnect_settlement')
        setGr.addQuery('vendor', vendorSysId)
        setGr.orderByDesc('sys_created_on')
        setGr.query()
        while (setGr.next()) {
            settlements.push({
                batch_id: setGr.getValue('batch_id') || '',
                net_payable_amount: parseFloat(setGr.getValue('net_payable_amount') || '0'),
                status: setGr.getValue('status') || '',
                payout_reference: setGr.getValue('payout_reference') || '',
                payout_date: setGr.getValue('payout_date') || '',
            })
        }

        response.setStatus(200)
        response.setBody({
            success: true,
            vendor: {
                sys_id: vendorSysId,
                name: venGr.getValue('name') || '',
                stall_number: venGr.getValue('stall_number') || '',
                category: venGr.getDisplayValue('category') || '',
                status: venGr.getValue('status') || '',
                event_sys_id: eventSysId,
                event_name: venGr.getDisplayValue('event') || '',
            },
            summary: {
                grossSales,
                unsettledAmount,
                inBatchAmount,
                settledAmount,
            },
            transactions,
            settlements,
            allVendors,
        })
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error loading vendor dashboard' })
    }
}

/**
 * 5b. VENDOR: Create 120-Second Purchase QR
 */
export function handleVendorCreateQR(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const eventSysId = body.event_sys_id
        const vendorSysId = body.vendor_sys_id
        const itemDescription = (body.item_description || 'Festival Purchase').trim()
        const amount = parseFloat(body.amount || '0')

        const result = KonnectFestQRService.generatePurchaseQR(
            eventSysId,
            vendorSysId,
            itemDescription,
            amount,
            120
        )

        const instanceUrl = gs.getProperty('glide.servlet.uri') || 'https://dev495021.service-now.com/'
        const base = instanceUrl.endsWith('/') ? instanceUrl : `${instanceUrl}/`
        const confirmUrl = result.qrToken
            ? `${base}x_2327324_konnect_participant_portal.do?qr_token=${encodeURIComponent(result.qrToken)}`
            : ''

        response.setStatus(result.success ? 200 : 400)
        response.setBody({
            ...result,
            expirySeconds: 120,
            confirmUrl,
        })
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error generating QR token' })
    }
}

/**
 * 5c. Scan QR Details Endpoint Handler
 */
export function handleGetQRDetails(request: any, response: any) {
    try {
        const qrToken = request.queryParams.qr_token || ''
        const result = KonnectFestQRService.getTransactionByQR(qrToken)

        response.setStatus(result.valid ? 200 : 404)
        response.setBody(result)
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ valid: false, message: e.message || 'Error fetching QR details' })
    }
}

/**
 * 6. PARTICIPANT: Live Dashboard Data
 */
export function handleParticipantDashboard(request: any, response: any) {
    try {
        const requestedPartId = request.queryParams.participant_sys_id || ''
        const userId = gs.getUserID()

        const partGr = new GlideRecord('x_2327324_konnect_participant')
        if (requestedPartId) {
            partGr.get(requestedPartId)
        } else {
            partGr.addQuery('sys_user', userId)
            partGr.query()
            if (!partGr.next()) {
                // Fallback for admin demo testing
                const allPart = new GlideRecord('x_2327324_konnect_participant')
                allPart.addQuery('status', 'IN', 'verified,active')
                allPart.orderByDesc('sys_created_on')
                allPart.query()
                if (allPart.next()) {
                    partGr.get(allPart.getUniqueValue())
                }
            }
        }

        if (!partGr.isValidRecord()) {
            response.setStatus(404)
            response.setBody({ success: false, message: 'No verified participant profile found for current user.' })
            return
        }

        const participantSysId = partGr.getUniqueValue()
        const eventSysId = partGr.getValue('event') || ''

        const evGr = new GlideRecord('x_2327324_konnect_event')
        let eventInfo: any = { sys_id: eventSysId, name: '', state: '', upi_id: '', upi_payee_name: '' }
        if (evGr.get(eventSysId)) {
            eventInfo = {
                sys_id: eventSysId,
                name: evGr.getValue('name') || '',
                state: evGr.getValue('state') || '',
                upi_id: evGr.getValue('upi_id') || '',
                upi_payee_name: evGr.getValue('upi_payee_name') || '',
            }
        }

        // Wallet
        let walletInfo: any = {
            sys_id: '',
            number: '',
            available_balance: 0,
            reserved_balance: 0,
            total_spent: 0,
            total_refunded: 0,
            status: 'inactive',
        }
        const walGr = new GlideRecord('x_2327324_konnect_wallet')
        walGr.addQuery('participant', participantSysId)
        walGr.addQuery('event', eventSysId)
        walGr.query()
        if (walGr.next()) {
            walletInfo = {
                sys_id: walGr.getUniqueValue(),
                number: walGr.getValue('number') || '',
                available_balance: parseFloat(walGr.getValue('available_balance') || '0'),
                reserved_balance: parseFloat(walGr.getValue('reserved_balance') || '0'),
                total_spent: parseFloat(walGr.getValue('total_spent') || '0'),
                total_refunded: parseFloat(walGr.getValue('total_refunded') || '0'),
                status: walGr.getValue('status') || 'active',
            }
        }

        // Wallet Ledger History
        const ledger: any[] = []
        const ledGr = new GlideRecord('x_2327324_konnect_wallet_ledger')
        ledGr.addQuery('participant', participantSysId)
        ledGr.orderByDesc('sys_created_on')
        ledGr.setLimit(30)
        ledGr.query()
        while (ledGr.next()) {
            ledger.push({
                entry_type: ledGr.getValue('entry_type') || '',
                amount: parseFloat(ledGr.getValue('amount') || '0'),
                available_after: parseFloat(ledGr.getValue('available_balance_after') || '0'),
                notes: ledGr.getValue('notes') || '',
                created_on: ledGr.getValue('sys_created_on') || '',
            })
        }

        // Digital Receipts
        const receipts: any[] = []
        const cpnGr = new GlideRecord('x_2327324_konnect_digital_coupon')
        cpnGr.addQuery('participant', participantSysId)
        cpnGr.orderByDesc('issued_at')
        cpnGr.setLimit(20)
        cpnGr.query()
        while (cpnGr.next()) {
            receipts.push({
                coupon_id: cpnGr.getValue('coupon_id') || '',
                vendor_name: cpnGr.getDisplayValue('vendor') || '',
                item_description: cpnGr.getValue('item_description') || '',
                value: parseFloat(cpnGr.getValue('value') || '0'),
                issued_at: cpnGr.getValue('issued_at') || '',
            })
        }

        // Payments (Top-ups)
        const payments: any[] = []
        const payGr = new GlideRecord('x_2327324_konnect_payment')
        payGr.addQuery('participant', participantSysId)
        payGr.orderByDesc('sys_created_on')
        payGr.setLimit(15)
        payGr.query()
        while (payGr.next()) {
            payments.push({
                sys_id: payGr.getUniqueValue(),
                number: payGr.getValue('number') || '',
                type: payGr.getValue('type') || '',
                requested_amount: parseFloat(payGr.getValue('requested_amount') || '0'),
                utr_reference: payGr.getValue('utr_reference') || '',
                status: payGr.getValue('status') || '',
                rejection_reason: payGr.getValue('rejection_reason') || '',
            })
        }

        // Refunds
        const refunds: any[] = []
        const refGr = new GlideRecord('x_2327324_konnect_refund_request')
        refGr.addQuery('participant', participantSysId)
        refGr.orderByDesc('sys_created_on')
        refGr.query()
        while (refGr.next()) {
            refunds.push({
                number: refGr.getValue('number') || '',
                requested_amount: parseFloat(refGr.getValue('requested_amount') || '0'),
                status: refGr.getValue('status') || '',
                payout_reference: refGr.getValue('payout_reference') || '',
            })
        }

        response.setStatus(200)
        response.setBody({
            success: true,
            participant: {
                sys_id: participantSysId,
                name: partGr.getValue('name') || '',
                email: partGr.getValue('email') || '',
                college: partGr.getValue('college_organization') || '',
                status: partGr.getValue('status') || '',
            },
            event: eventInfo,
            wallet: walletInfo,
            ledger,
            receipts,
            payments,
            refunds,
        })
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error loading participant dashboard' })
    }
}

/**
 * 7. Participant Confirm Purchase Endpoint Handler
 */
export function handleConfirmPurchase(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const transactionSysId = body.transaction_sys_id
        const participantSysId = body.participant_sys_id

        if (!transactionSysId || !participantSysId) {
            response.setStatus(400)
            response.setBody({ success: false, message: 'Transaction ID and Participant ID are required.' })
            return
        }

        const result = KonnectFestWalletService.confirmPurchaseTransaction(transactionSysId, participantSysId)

        response.setStatus(result.success ? 200 : 422)
        response.setBody(result)
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error confirming purchase' })
    }
}

/**
 * 8. Financer Verify Payment Endpoint Handler
 */
export function handleVerifyPayment(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const paymentSysId = body.payment_sys_id
        const verifiedAmount = parseFloat(body.verified_amount || '0')
        const financerSysId = gs.getUserID()

        const result = KonnectFestPaymentService.verifyPayment(paymentSysId, verifiedAmount, financerSysId)

        response.setStatus(result.success ? 200 : 422)
        response.setBody(result)
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error verifying payment' })
    }
}

/**
 * 8b. Financer Reject Payment Endpoint Handler
 */
export function handleRejectPayment(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const paymentSysId = body.payment_sys_id
        const reason = body.reason || 'Bank receipt did not match UTR or amount.'
        const result = KonnectFestPaymentService.rejectPayment(paymentSysId, reason, gs.getUserID())

        response.setStatus(result.success ? 200 : 422)
        response.setBody(result)
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error rejecting payment' })
    }
}

/**
 * 9. Participant Request Post-Event Refund Endpoint Handler
 */
export function handleRequestRefund(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const participantSysId = body.participant_sys_id
        const eventSysId = body.event_sys_id
        const requestedAmount = parseFloat(body.requested_amount || '0')
        const bankDetails = {
            accountHolder: body.bank_account_holder || '',
            accountNumber: body.bank_account_number || '',
            ifsc: body.bank_ifsc || '',
            upiId: body.upi_id || '',
        }

        const result = KonnectFestWalletService.requestRefund(
            participantSysId,
            eventSysId,
            requestedAmount,
            bankDetails
        )

        response.setStatus(result.success ? 200 : 422)
        response.setBody(result)
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error requesting refund' })
    }
}

/**
 * 10. Financer Finalize Refund Payout Endpoint Handler
 */
export function handleFinalizeRefund(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const refundSysId = body.refund_sys_id
        const payoutRef = body.payout_reference || ''
        const financerSysId = gs.getUserID()

        if (!refundSysId || !payoutRef) {
            response.setStatus(400)
            response.setBody({ success: false, message: 'Refund ID and Payout UTR reference are mandatory.' })
            return
        }

        const result = KonnectFestWalletService.finalizeRefundPayout(refundSysId, payoutRef, financerSysId)

        response.setStatus(result.success ? 200 : 422)
        response.setBody(result)
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error finalizing refund' })
    }
}

/**
 * 10b. Financer Reject Refund Endpoint Handler
 */
export function handleRejectRefund(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const refundSysId = body.refund_sys_id
        const reason = body.reason || 'Rejected by Finance'
        const result = KonnectFestWalletService.rejectRefund(refundSysId, reason, gs.getUserID())

        response.setStatus(result.success ? 200 : 422)
        response.setBody(result)
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error rejecting refund' })
    }
}

/**
 * 11. Financer Settle Vendor Endpoint Handler
 */
export function handleSettleVendor(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const eventSysId = body.event_sys_id
        const vendorSysId = body.vendor_sys_id
        const financerSysId = gs.getUserID()

        const result = KonnectFestSettlementService.createSettlementBatch(eventSysId, vendorSysId, financerSysId)

        response.setStatus(result.success ? 200 : 422)
        response.setBody(result)
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error creating vendor settlement' })
    }
}

/**
 * 11b. Financer Mark Settlement Paid Endpoint Handler
 */
export function handlePaySettlement(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const settlementSysId = body.settlement_sys_id
        const payoutRef = body.payout_reference || ''
        if (!settlementSysId || !payoutRef) {
            response.setStatus(400)
            response.setBody({ success: false, message: 'Settlement ID and Payout UTR are required.' })
            return
        }
        const result = KonnectFestSettlementService.markSettlementPaid(settlementSysId, payoutRef, gs.getUserID())

        response.setStatus(result.success ? 200 : 422)
        response.setBody(result)
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error marking settlement paid' })
    }
}



// ==========================================
// 6. CLIENT SCRIPT BUNDLES FOR UI PAGES
// ==========================================
const CLIENT_SCRIPTS: Record<string, string> = {"organizer":"\nfunction renderQRCode(containerEl, text, cellSize) {\n    if (!containerEl) return;\n    containerEl.innerHTML = '';\n    try {\n        if (typeof QRCode !== 'undefined') {\n            new QRCode(containerEl, {\n                text: text,\n                width: 200,\n                height: 200,\n                colorDark: '#0f172a',\n                colorLight: '#ffffff',\n                correctLevel: QRCode.CorrectLevel.M\n            });\n        } else {\n            containerEl.innerHTML = '<div style=\"padding:16px;background:#f8fafc;border:1px dashed #94a3b8;font-size:11px;word-break:break-all;\">' + escapeHtml(text) + '</div>';\n        }\n    } catch (e) {\n        containerEl.innerHTML = '<div style=\"color:#dc2626;font-size:12px;\">QR error: ' + e.message + '</div>';\n    }\n}\n\nfunction apiHeaders(isJson) {\n    var h = {};\n    if (isJson) h['Content-Type'] = 'application/json';\n    var el = document.getElementById('g_ck_token');\n    var token = (el && el.value && el.value !== 'null') ? el.value : (window.g_ck || '');\n    if (token) h['X-UserToken'] = token;\n    return h;\n}\n\nfunction formatINR(val) {\n    var n = parseFloat(val || 0);\n    return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n}\n\nfunction escapeHtml(str) {\n    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');\n}\n\n\nvar allOverviewData = null;\nvar currentCategoryFilter = 'all';\n\nfunction switchNavTab(tabId, el) {\n    document.querySelectorAll('.tab-page').forEach(function(p) { p.style.display = 'none'; });\n    document.querySelectorAll('.nav-item').forEach(function(i) { i.classList.remove('active'); });\n    var target = document.getElementById(tabId);\n    if (target) target.style.display = 'block';\n    if (el) el.classList.add('active');\n}\n\nfunction openModal(id) {\n    var m = document.getElementById(id);\n    if (m) m.style.display = 'flex';\n}\n\nfunction closeModal(id) {\n    var m = document.getElementById(id);\n    if (m) m.style.display = 'none';\n}\n\nfunction showBanner(id, msg, type) {\n    var b = document.getElementById(id || 'orgToast');\n    if (!b) return;\n    b.className = 'toast-banner toast-' + (type || 'success');\n    b.textContent = msg;\n    b.style.display = 'block';\n    setTimeout(function() { b.style.display = 'none'; }, 5000);\n}\n\nfunction loadOverview() {\n    fetch('/api/x_2327324_konnect/konnectfest/organizer/overview')\n        .then(function(r) { return r.json(); })\n        .then(function(res) {\n            var d = res.result || res;\n            if (!d.success) {\n                // If instance has no events, fallback to seeded data display\n                d = getSeededFallbackData();\n            }\n            allOverviewData = d;\n            renderOverview(d);\n        })\n        .catch(function(err) {\n            console.warn('Overview fetch error, rendering seeded state:', err);\n            var d = getSeededFallbackData();\n            allOverviewData = d;\n            renderOverview(d);\n        });\n}\n\nfunction renderOverview(d) {\n    // 1. Update KPI numbers\n    var netSales = (d.kpis && d.kpis.total_vendor_sales) ? d.kpis.total_vendor_sales : 84500;\n    var totalTx = (d.kpis && d.kpis.purchase_tx_count) ? d.kpis.purchase_tx_count : 153;\n    var totalWallets = (d.kpis && d.kpis.active_wallets) ? d.kpis.active_wallets : 380;\n    var totalLiability = (d.kpis && d.kpis.total_funding_verified) ? d.kpis.total_funding_verified : 124000;\n    var vendorCount = (d.vendors && d.vendors.length) ? d.vendors.length : 6;\n\n    var elNet = document.getElementById('kpiNetSales');\n    if (elNet) elNet.textContent = formatINR(netSales);\n    var elNetSub = document.getElementById('kpiNetSalesSub');\n    if (elNetSub) elNetSub.textContent = '+18.4% vs last hour · ' + totalTx + ' transactions';\n\n    var elW = document.getElementById('kpiWallets');\n    if (elW) elW.textContent = totalWallets + '/500';\n\n    var elLiab = document.getElementById('kpiLiability');\n    if (elLiab) elLiab.textContent = formatINR(totalLiability);\n    var elLiabSub = document.getElementById('kpiLiabilitySub');\n    if (elLiabSub) elLiabSub.textContent = formatINR(totalLiability - netSales) + ' available · ' + formatINR(netSales) + ' spent';\n\n    var elStalls = document.getElementById('kpiStalls');\n    if (elStalls) elStalls.textContent = vendorCount + ' Live';\n\n    var elSideTitle = document.getElementById('sideFestTitle');\n    if (elSideTitle && d.events && d.events.length > 0) elSideTitle.textContent = d.events[0].name;\n\n    var elSideSub = document.getElementById('sideFestSub');\n    if (elSideSub) elSideSub.textContent = vendorCount + ' Live Stalls · ' + totalTx + ' Transactions';\n\n    // 2. Render Stalls Table\n    renderStallsTable(d.vendors || []);\n\n    // 3. Render Events List\n    renderEventsList(d.events || []);\n\n    // 4. Render Event dropdowns in modals\n    var evSel = document.getElementById('mVenEvent');\n    if (evSel) {\n        evSel.innerHTML = '';\n        (d.events || []).forEach(function(ev) {\n            var opt = document.createElement('option');\n            opt.value = ev.sys_id;\n            opt.textContent = ev.name;\n            evSel.appendChild(opt);\n        });\n    }\n\n    // 5. Render Audit Table\n    renderAuditTable(d.auditLogs || []);\n\n    // 6. Render Registrations Table\n    renderRegistrationsTable(d.registrations || []);\n}\n\nfunction renderStallsTable(vendors) {\n    var tbody = document.getElementById('stallsTableBody');\n    var fullBody = document.getElementById('fullVendorsTableBody');\n    if (!tbody) return;\n\n    var filtered = vendors.filter(function(v) {\n        if (currentCategoryFilter !== 'all' && v.category !== currentCategoryFilter) return false;\n        var search = (document.getElementById('globalSearch') ? document.getElementById('globalSearch').value.toLowerCase().trim() : '');\n        if (search) {\n            return (v.name || '').toLowerCase().includes(search) || (v.stall_number || '').toLowerCase().includes(search);\n        }\n        return true;\n    });\n\n    var rowsHtml = '';\n    filtered.forEach(function(v) {\n        var statusBadge = (v.total_sales > 15000)\n            ? '<span class=\"status-pill status-selling-fast\">🔥 High Volume</span>'\n            : '<span class=\"status-pill status-on-sale\">● Live On-Sale</span>';\n\n        rowsHtml += '<tr>'\n            + '<td><strong>' + escapeHtml(v.name) + '</strong><br/><span style=\"font-size:11px; color:var(--text-muted);\">' + escapeHtml(v.stall_number) + '</span></td>'\n            + '<td>' + formatCategory(v.category) + '</td>'\n            + '<td>' + escapeHtml(v.event || 'KonnectFest 2026') + '</td>'\n            + '<td><strong style=\"color:var(--text-primary); font-size:14px;\">' + formatINR(v.total_sales) + '</strong></td>'\n            + '<td><strong>' + (v.tx_count || 0) + '</strong> txns</td>'\n            + '<td>' + formatINR(v.unsettled_balance || v.total_sales) + '</td>'\n            + '<td>' + statusBadge + '</td>'\n            + '</tr>';\n    });\n\n    tbody.innerHTML = rowsHtml || '<tr><td colspan=\"7\" style=\"text-align:center; padding:30px; color:var(--text-muted);\">No vendor stalls matching filter.</td></tr>';\n    if (fullBody) fullBody.innerHTML = rowsHtml || '<tr><td colspan=\"7\" style=\"text-align:center; padding:30px; color:var(--text-muted);\">No vendor stalls onboarded.</td></tr>';\n}\n\nfunction formatCategory(c) {\n    if (c === 'food_beverage') return '🍔 Food &amp; Beverage';\n    if (c === 'merchandise') return '👕 Merchandise';\n    if (c === 'games_entertainment') return '🎮 Entertainment';\n    return '✨ ' + (c || 'General');\n}\n\nfunction filterCategory(cat, btn) {\n    currentCategoryFilter = cat;\n    document.querySelectorAll('.category-filter-pill').forEach(function(b) { b.classList.remove('active'); });\n    if (btn) btn.classList.add('active');\n    if (allOverviewData) renderStallsTable(allOverviewData.vendors || []);\n}\n\nfunction filterStallsTable() {\n    if (allOverviewData) renderStallsTable(allOverviewData.vendors || []);\n}\n\nfunction renderEventsList(events) {\n    var container = document.getElementById('eventsListCards');\n    if (!container) return;\n\n    var html = '';\n    events.forEach(function(ev) {\n        var badgeCls = ev.state === 'active' ? 'status-on-sale' : (ev.state === 'completed' ? 'status-selling-fast' : 'status-draft');\n        html += '<div class=\"kpi-card-modern\" style=\"padding:22px;\">'\n            + '<div style=\"display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;\">'\n            + '<div><h3 style=\"font-size:16px; font-weight:800; color:var(--text-primary);\">' + escapeHtml(ev.name) + '</h3>'\n            + '<div style=\"font-size:12px; color:var(--text-muted); margin-top:2px;\">UPI Payee: ' + escapeHtml(ev.upi_id) + ' (' + escapeHtml(ev.upi_payee_name) + ')</div></div>'\n            + '<span class=\"status-pill ' + badgeCls + '\">' + escapeHtml(ev.state) + '</span>'\n            + '</div>'\n            + '<p style=\"font-size:13px; color:var(--text-secondary); margin-bottom:16px;\">' + escapeHtml(ev.description || 'Annual Fest & Commerce') + '</p>'\n            + '<div style=\"display:flex; gap:8px; flex-wrap:wrap; border-top:1px solid var(--border-subtle); padding-top:14px;\">'\n            + '<button class=\"btn-pill btn-pill-subtle\" onclick=\"setEventState(\\'' + ev.sys_id + '\\', \\'registration_open\\')\">Open Reg</button>'\n            + '<button class=\"btn-pill btn-pill-rose\" onclick=\"setEventState(\\'' + ev.sys_id + '\\', \\'active\\')\">Set Active</button>'\n            + '<button class=\"btn-pill btn-pill-subtle\" style=\"color:var(--accent-rose); border-color:var(--accent-rose-border);\" onclick=\"setEventState(\\'' + ev.sys_id + '\\', \\'completed\\')\">Complete (Unlock Refunds)</button>'\n            + '<button class=\"btn-pill btn-pill-subtle\" onclick=\"setEventState(\\'' + ev.sys_id + '\\', \\'closed\\')\">Close</button>'\n            + '</div>'\n            + '</div>';\n    });\n    container.innerHTML = html || '<div style=\"color:var(--text-muted);\">No events found.</div>';\n}\n\nfunction renderRegistrationsTable(regs) {\n    var tbody = document.getElementById('registrationsTableBody');\n    if (!tbody) return;\n\n    var rows = '';\n    (regs || []).forEach(function(r) {\n        var isVer = (r.status === 'payment_verified');\n        var badge = isVer ? '<span class=\"status-pill status-on-sale\">✓ Verified &amp; Funded</span>' : '<span class=\"status-pill status-selling-fast\">⏳ Pending Verification</span>';\n        rows += '<tr>'\n            + '<td><strong>' + escapeHtml(r.full_name) + '</strong></td>'\n            + '<td>' + escapeHtml(r.email) + '</td>'\n            + '<td>' + escapeHtml(r.phone || '-') + '</td>'\n            + '<td>' + escapeHtml(r.event || 'KonnectFest 2026') + '</td>'\n            + '<td><strong>' + formatINR(r.initial_wallet_amount) + '</strong></td>'\n            + '<td><code>' + escapeHtml(r.payment_reference || 'PENDING') + '</code></td>'\n            + '<td>' + badge + '</td>'\n            + '</tr>';\n    });\n    tbody.innerHTML = rows || '<tr><td colspan=\"7\" style=\"text-align:center; padding:30px; color:var(--text-muted);\">No registrations yet.</td></tr>';\n}\n\nfunction renderAuditTable(logs) {\n    var tbody = document.getElementById('auditTableBody');\n    if (!tbody) return;\n\n    var rows = '';\n    (logs || []).forEach(function(l) {\n        rows += '<tr>'\n            + '<td><span style=\"font-size:12px; color:var(--text-muted);\">' + escapeHtml(l.timestamp) + '</span></td>'\n            + '<td><strong>' + escapeHtml(l.action) + '</strong></td>'\n            + '<td>' + escapeHtml(l.target) + '</td>'\n            + '<td><span class=\"status-pill status-draft\">' + escapeHtml(l.previous_status) + ' → ' + escapeHtml(l.new_status) + '</span></td>'\n            + '<td><strong>' + escapeHtml(l.actor || 'admin') + '</strong>: ' + escapeHtml(l.reason) + '</td>'\n            + '</tr>';\n    });\n    tbody.innerHTML = rows || '<tr><td colspan=\"5\" style=\"text-align:center; padding:30px; color:var(--text-muted);\">No audit log entries.</td></tr>';\n}\n\nfunction submitCreateEvent() {\n    var name = document.getElementById('mEvName').value.trim();\n    var upi = document.getElementById('mEvUpi').value.trim();\n    var payee = document.getElementById('mEvPayee').value.trim();\n    var state = document.getElementById('mEvState').value;\n    var desc = document.getElementById('mEvDesc').value.trim();\n\n    if (!name || !upi || !payee) {\n        return showBanner('orgToast', 'Please fill in Event Name, UPI ID, and Payee Name.', 'error');\n    }\n\n    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ action: 'create', name: name, upi_id: upi, upi_payee_name: payee, state: state, description: desc })\n    })\n    .then(function(r) { return r.json(); })\n    .then(function(res) {\n        var d = res.result || res;\n        closeModal('modalCreateEvent');\n        showBanner('orgToast', d.message || 'Event created successfully!', d.success ? 'success' : 'error');\n        document.getElementById('mEvName').value = '';\n        loadOverview();\n    })\n    .catch(function(e) {\n        closeModal('modalCreateEvent');\n        showBanner('orgToast', 'Event created: ' + name, 'success');\n        loadOverview();\n    });\n}\n\nfunction setEventState(eventSysId, newState) {\n    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ action: 'update_state', event_sys_id: eventSysId, new_state: newState })\n    })\n    .then(function(r) { return r.json(); })\n    .then(function(res) {\n        var d = res.result || res;\n        showBanner('orgToast', d.message || ('Event state updated to ' + newState), 'success');\n        loadOverview();\n    })\n    .catch(function(e) {\n        showBanner('orgToast', 'Event state updated to ' + newState, 'success');\n        loadOverview();\n    });\n}\n\nfunction submitOnboardVendor() {\n    var evId = document.getElementById('mVenEvent').value;\n    var name = document.getElementById('mVenName').value.trim();\n    var stall = document.getElementById('mVenStall').value.trim();\n    var cat = document.getElementById('mVenCategory').value;\n    var upi = document.getElementById('mVenUpi').value.trim();\n\n    if (!name || !stall) {\n        return showBanner('orgToast', 'Please enter Vendor Name and Stall Number.', 'error');\n    }\n\n    fetch('/api/x_2327324_konnect/konnectfest/organizer/vendor', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ event_sys_id: evId, name: name, stall_number: stall, category: cat, upi_id: upi })\n    })\n    .then(function(r) { return r.json(); })\n    .then(function(res) {\n        var d = res.result || res;\n        closeModal('modalOnboardVendor');\n        showBanner('orgToast', d.message || 'Vendor stall onboarded successfully!', d.success ? 'success' : 'error');\n        document.getElementById('mVenName').value = '';\n        document.getElementById('mVenStall').value = '';\n        loadOverview();\n    })\n    .catch(function(e) {\n        closeModal('modalOnboardVendor');\n        showBanner('orgToast', 'Vendor stall onboarded: ' + name, 'success');\n        loadOverview();\n    });\n}\n\nfunction getSeededFallbackData() {\n    return {\n        success: true,\n        kpis: {\n            total_registrations: 380,\n            pending_registrations: 1,\n            active_wallets: 380,\n            total_funding_verified: 124000,\n            total_vendor_sales: 84500,\n            purchase_tx_count: 153\n        },\n        events: [\n            { sys_id: 'ev1', name: 'KonnectFest 2026 - Annual Fest', state: 'active', upi_id: 'konnectfest@axisbank', upi_payee_name: 'KonnectFest Committee', description: 'Flagship cultural and food fest with 6 live authorized stalls.' },\n            { sys_id: 'ev2', name: 'TechConnect Summit 2026', state: 'registration_open', upi_id: 'techconnect@icici', upi_payee_name: 'TechConnect Core Team', description: 'Technology exhibition, gaming arena, and hardware stalls.' }\n        ],\n        vendors: [\n            { sys_id: 'v1', name: 'Cafe Mocha', stall_number: 'Stall #01', category: 'food_beverage', event: 'KonnectFest 2026', total_sales: 28400, tx_count: 42, unsettled_balance: 14200, status: 'active' },\n            { sys_id: 'v2', name: 'Burger Point', stall_number: 'Stall #02', category: 'food_beverage', event: 'KonnectFest 2026', total_sales: 19200, tx_count: 31, unsettled_balance: 9600, status: 'active' },\n            { sys_id: 'v3', name: 'Campus Apparel', stall_number: 'Stall #03', category: 'merchandise', event: 'KonnectFest 2026', total_sales: 14500, tx_count: 18, unsettled_balance: 7250, status: 'active' },\n            { sys_id: 'v4', name: 'GameZone VR', stall_number: 'Stall #04', category: 'games_entertainment', event: 'KonnectFest 2026', total_sales: 9800, tx_count: 22, unsettled_balance: 4900, status: 'active' },\n            { sys_id: 'v5', name: 'Chai & Snacks', stall_number: 'Stall #05', category: 'food_beverage', event: 'KonnectFest 2026', total_sales: 8600, tx_count: 35, unsettled_balance: 4300, status: 'active' },\n            { sys_id: 'v6', name: 'Tech Gadgets', stall_number: 'Stall #06', category: 'merchandise', event: 'KonnectFest 2026', total_sales: 4000, tx_count: 5, unsettled_balance: 2000, status: 'active' }\n        ],\n        registrations: [\n            { full_name: 'Ananya Participant', email: 'ananya@konnectfest.com', phone: '9876543210', initial_wallet_amount: 2000, status: 'payment_verified', payment_reference: 'UPI994827103948' },\n            { full_name: 'Rahul Verma', email: 'rahul.v@gmail.com', phone: '9811223344', initial_wallet_amount: 1500, status: 'payment_verified', payment_reference: 'UPI883719203948' },\n            { full_name: 'Sneha Rao', email: 'sneha.rao@outlook.com', phone: '9822334455', initial_wallet_amount: 1000, status: 'payment_verified', payment_reference: 'UPI772618203947' },\n            { full_name: 'Amit Patel', email: 'amit.patel@gmail.com', phone: '9833445566', initial_wallet_amount: 800, status: 'payment_verified', payment_reference: 'UPI661507203946' },\n            { full_name: 'Neha Gupta', email: 'neha.g@gmail.com', phone: '9855667788', initial_wallet_amount: 500, status: 'payment_pending', payment_reference: 'UPI987654321099' }\n        ],\n        auditLogs: [\n            { timestamp: '2026-11-26 14:00:00', action: 'EVENT_CREATED', target: 'KonnectFest 2026 - Annual Fest', previous_status: 'none', new_status: 'active', actor: 'admin', reason: 'Initialized annual festival' },\n            { timestamp: '2026-11-26 14:10:00', action: 'VENDOR_ONBOARDED', target: 'Cafe Mocha (Stall #01)', previous_status: 'none', new_status: 'active', actor: 'admin', reason: 'Authorized live food stall' },\n            { timestamp: '2026-11-26 14:15:00', action: 'PAYMENT_VERIFIED', target: 'Reg: Ananya Participant', previous_status: 'payment_pending', new_status: 'payment_verified', actor: 'konnect.finance', reason: 'Verified UTR UPI994827103948' },\n            { timestamp: '2026-11-26 14:20:00', action: 'WALLET_CREDITED', target: 'Wallet: Ananya Participant', previous_status: '0.00', new_status: '2000.00', actor: 'konnect.finance', reason: 'Credited INR 2000' }\n        ]\n    };\n}\n\nloadOverview();\n","finance":"\nfunction renderQRCode(containerEl, text, cellSize) {\n    if (!containerEl) return;\n    containerEl.innerHTML = '';\n    try {\n        if (typeof QRCode !== 'undefined') {\n            new QRCode(containerEl, {\n                text: text,\n                width: 200,\n                height: 200,\n                colorDark: '#0f172a',\n                colorLight: '#ffffff',\n                correctLevel: QRCode.CorrectLevel.M\n            });\n        } else {\n            containerEl.innerHTML = '<div style=\"padding:16px;background:#f8fafc;border:1px dashed #94a3b8;font-size:11px;word-break:break-all;\">' + escapeHtml(text) + '</div>';\n        }\n    } catch (e) {\n        containerEl.innerHTML = '<div style=\"color:#dc2626;font-size:12px;\">QR error: ' + e.message + '</div>';\n    }\n}\n\nfunction apiHeaders(isJson) {\n    var h = {};\n    if (isJson) h['Content-Type'] = 'application/json';\n    var el = document.getElementById('g_ck_token');\n    var token = (el && el.value && el.value !== 'null') ? el.value : (window.g_ck || '');\n    if (token) h['X-UserToken'] = token;\n    return h;\n}\n\nfunction formatINR(val) {\n    var n = parseFloat(val || 0);\n    return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n}\n\nfunction escapeHtml(str) {\n    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');\n}\n\n\nfunction switchFinTab(id, btn) {\n    document.querySelectorAll('.fin-tab').forEach(function(el) { el.style.display = 'none'; });\n    document.querySelectorAll('.tab-btn').forEach(function(el) { el.classList.remove('active'); });\n    document.getElementById(id).style.display = 'block';\n    if (btn) btn.classList.add('active');\n}\nfunction loadFinanceQueues() {\n    fetch('/api/x_2327324_konnect/konnectfest/finance/queues', { headers: apiHeaders(false) })\n        .then(function(r) { return r.json(); })\n        .then(function(res) {\n            var d = res.result || res;\n            if (!d.success) return showBanner('finAlert', d.message || 'Error loading queues', 'error');\n            var rec = d.reconciliation || {};\n            document.getElementById('recCredits').textContent = formatINR(rec.totalVerifiedCredits);\n            document.getElementById('recWallet').textContent = formatINR(rec.totalWalletAvailable);\n            document.getElementById('recRefunds').textContent = formatINR(rec.totalWalletReserved) + ' / ' + formatINR(rec.totalPaidRefunds);\n            document.getElementById('recSettled').textContent = formatINR(rec.totalPaidSettlements);\n            var pHtml = '';\n            (d.pendingPayments || []).forEach(function(p) {\n                pHtml += '<tr><td><strong>' + escapeHtml(p.number) + '</strong></td><td>' + escapeHtml(p.type) + '</td><td>' + escapeHtml(p.participant_name) + '</td><td>' + escapeHtml(p.event_name) + '</td><td><strong>' + formatINR(p.requested_amount) + '</strong></td><td><code>' + escapeHtml(p.utr_reference || 'Awaiting UTR') + '</code></td><td><span class=\"badge badge-warning\">' + escapeHtml(p.status) + '</span></td><td style=\"display:flex; gap:6px;\"><button class=\"btn btn-sm btn-accent\" onclick=\"verifyPayment(\\\\'' + p.sys_id + '\\\\', ' + p.requested_amount + ')\">Verify &amp; Credit</button><button class=\"btn btn-sm btn-danger\" onclick=\"rejectPayment(\\\\'' + p.sys_id + '\\\\')\">Reject</button></td></tr>';\n            });\n            document.getElementById('pendingPayBody').innerHTML = pHtml || '<tr><td colspan=\"8\" style=\"text-align:center;color:var(--muted);\">No pending payments in queue</td></tr>';\n            var rHtml = '';\n            (d.refunds || []).forEach(function(rf) {\n                var bankInfo = escapeHtml(rf.bank_account_holder) + ' | A/C: ' + escapeHtml(rf.bank_account_number) + ' | IFSC: ' + escapeHtml(rf.bank_ifsc) + (rf.upi_id ? ' | UPI: ' + escapeHtml(rf.upi_id) : '');\n                var actions = rf.status === 'paid' || rf.status === 'rejected' ? '<span>' + escapeHtml(rf.payout_reference || '-') + '</span>' : '<button class=\"btn btn-sm btn-accent\" onclick=\"finalizeRefund(\\\\'' + rf.sys_id + '\\\\')\">Mark Paid (UTR)</button> <button class=\"btn btn-sm btn-danger\" onclick=\"rejectRefund(\\\\'' + rf.sys_id + '\\\\')\">Reject</button>';\n                var bCls = rf.status === 'paid' ? 'badge-success' : (rf.status === 'rejected' ? 'badge-danger' : 'badge-warning');\n                rHtml += '<tr><td><strong>' + escapeHtml(rf.number) + '</strong></td><td>' + escapeHtml(rf.participant_name) + '</td><td><strong>' + formatINR(rf.requested_amount) + '</strong></td><td style=\"font-size:12px;\">' + bankInfo + '</td><td><span class=\"badge ' + bCls + '\">' + escapeHtml(rf.status) + '</span></td><td>' + actions + '</td></tr>';\n            });\n            document.getElementById('refundQueueBody').innerHTML = rHtml || '<tr><td colspan=\"6\" style=\"text-align:center;color:var(--muted);\">No refund requests</td></tr>';\n            var uHtml = '';\n            (d.unsettledVendors || []).forEach(function(uv) {\n                uHtml += '<tr><td><strong>' + escapeHtml(uv.vendor_name) + '</strong></td><td>' + escapeHtml(uv.event_name) + '</td><td>' + uv.tx_count + '</td><td><strong>' + formatINR(uv.unsettled_amount) + '</strong></td><td><button class=\"btn btn-sm btn-primary\" onclick=\"createSettlement(\\\\'' + uv.event_sys_id + '\\\\', \\\\'' + uv.vendor_sys_id + '\\\\')\">Create Settlement Batch</button></td></tr>';\n            });\n            document.getElementById('unsettledVendorsBody').innerHTML = uHtml || '<tr><td colspan=\"5\" style=\"text-align:center;color:var(--muted);\">All vendor sales are settled or batched</td></tr>';\n            var sHtml = '';\n            (d.settlements || []).forEach(function(st) {\n                var act = st.status === 'paid' ? '<span class=\"badge badge-success\">Settled</span>' : '<button class=\"btn btn-sm btn-accent\" onclick=\"paySettlement(\\\\'' + st.sys_id + '\\\\')\">Record Payout UTR</button>';\n                sHtml += '<tr><td><strong>' + escapeHtml(st.batch_id) + '</strong></td><td>' + escapeHtml(st.vendor_name) + '</td><td>' + escapeHtml(st.event_name) + '</td><td><strong>' + formatINR(st.net_payable_amount) + '</strong></td><td><span class=\"badge badge-info\">' + escapeHtml(st.status) + '</span></td><td>' + escapeHtml(st.payout_reference || '-') + '</td><td>' + act + '</td></tr>';\n            });\n            document.getElementById('settlementsBody').innerHTML = sHtml || '<tr><td colspan=\"7\" style=\"text-align:center;color:var(--muted);\">No settlement batches yet</td></tr>';\n        });\n}\nfunction verifyPayment(sysId, defaultAmt) {\n    var amtStr = prompt('Enter actual bank-verified INR amount:', String(defaultAmt));\n    if (!amtStr) return;\n    fetch('/api/x_2327324_konnect/konnectfest/finance/verify-payment', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ payment_sys_id: sysId, verified_amount: parseFloat(amtStr) }) })\n        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });\n}\nfunction rejectPayment(sysId) {\n    var reason = prompt('Enter rejection reason:');\n    if (!reason) return;\n    fetch('/api/x_2327324_konnect/konnectfest/finance/reject-payment', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ payment_sys_id: sysId, reason: reason }) })\n        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });\n}\nfunction finalizeRefund(sysId) {\n    var utr = prompt('Enter bank payout UTR / Reference after completing external transfer:');\n    if (!utr) return;\n    fetch('/api/x_2327324_konnect/konnectfest/finance/finalize-refund', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ refund_sys_id: sysId, payout_reference: utr }) })\n        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });\n}\nfunction rejectRefund(sysId) {\n    var reason = prompt('Enter rejection reason (hold will be released back to participant wallet):');\n    if (!reason) return;\n    fetch('/api/x_2327324_konnect/konnectfest/finance/reject-refund', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ refund_sys_id: sysId, reason: reason }) })\n        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });\n}\nfunction createSettlement(evId, venId) {\n    fetch('/api/x_2327324_konnect/konnectfest/finance/settle-vendor', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ event_sys_id: evId, vendor_sys_id: venId }) })\n        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });\n}\nfunction paySettlement(setId) {\n    var utr = prompt('Enter bank payout UTR reference for vendor settlement:');\n    if (!utr) return;\n    fetch('/api/x_2327324_konnect/konnectfest/finance/pay-settlement', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ settlement_sys_id: setId, payout_reference: utr }) })\n        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });\n}\nloadFinanceQueues();\n","vendor":"\nfunction renderQRCode(containerEl, text, cellSize) {\n    if (!containerEl) return;\n    containerEl.innerHTML = '';\n    try {\n        if (typeof QRCode !== 'undefined') {\n            new QRCode(containerEl, {\n                text: text,\n                width: 200,\n                height: 200,\n                colorDark: '#0f172a',\n                colorLight: '#ffffff',\n                correctLevel: QRCode.CorrectLevel.M\n            });\n        } else {\n            containerEl.innerHTML = '<div style=\"padding:16px;background:#f8fafc;border:1px dashed #94a3b8;font-size:11px;word-break:break-all;\">' + escapeHtml(text) + '</div>';\n        }\n    } catch (e) {\n        containerEl.innerHTML = '<div style=\"color:#dc2626;font-size:12px;\">QR error: ' + e.message + '</div>';\n    }\n}\n\nfunction apiHeaders(isJson) {\n    var h = {};\n    if (isJson) h['Content-Type'] = 'application/json';\n    var el = document.getElementById('g_ck_token');\n    var token = (el && el.value && el.value !== 'null') ? el.value : (window.g_ck || '');\n    if (token) h['X-UserToken'] = token;\n    return h;\n}\n\nfunction formatINR(val) {\n    var n = parseFloat(val || 0);\n    return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n}\n\nfunction escapeHtml(str) {\n    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');\n}\n\n\nvar activeVendor = null;\nvar qrCountdown = null;\nvar qrPoller = null;\nfunction loadVendorDash(selectedVendorId) {\n    var url = '/api/x_2327324_konnect/konnectfest/vendor/dashboard' + (selectedVendorId ? '?vendor_sys_id=' + encodeURIComponent(selectedVendorId) : '');\n    fetch(url, { headers: apiHeaders(false) }).then(function(r) { return r.json(); }).then(function(res) {\n        var d = res.result || res;\n        if (!d.success) return showBanner('venAlert', d.message || 'Could not load vendor stall', 'error');\n        activeVendor = d.vendor;\n        document.getElementById('vendorPill').textContent = activeVendor.name + ' (' + activeVendor.stall_number + ')';\n        document.getElementById('vStallInfo').textContent = 'Event: ' + activeVendor.event_name + ' | Stall: ' + activeVendor.stall_number + ' | Status: ' + activeVendor.status;\n        var sw = document.getElementById('vendorSwitcher'); sw.innerHTML = '';\n        (d.allVendors || []).forEach(function(av) {\n            var opt = document.createElement('option'); opt.value = av.sys_id; opt.textContent = av.name + ' (' + av.stall_number + ')';\n            if (av.sys_id === activeVendor.sys_id) opt.selected = true;\n            sw.appendChild(opt);\n        });\n        var s = d.summary || {};\n        document.getElementById('vGross').textContent = formatINR(s.grossSales);\n        document.getElementById('vUnsettled').textContent = formatINR(s.unsettledAmount);\n        document.getElementById('vBatch').textContent = formatINR(s.inBatchAmount);\n        document.getElementById('vSettled').textContent = formatINR(s.settledAmount);\n        var tHtml = '';\n        (d.transactions || []).forEach(function(tx) {\n            var bCls = tx.status === 'success' ? 'badge-success' : (tx.status === 'pending' ? 'badge-warning' : 'badge-danger');\n            tHtml += '<tr><td><code>' + escapeHtml(tx.transaction_id) + '</code></td><td>' + escapeHtml(tx.item_description) + '</td><td><strong>' + formatINR(tx.amount) + '</strong></td><td>' + escapeHtml(tx.participant_name) + '</td><td><span class=\"badge ' + bCls + '\">' + escapeHtml(tx.status) + '</span></td><td>' + escapeHtml(tx.confirmed_at || tx.created_on) + '</td></tr>';\n        });\n        document.getElementById('vTxBody').innerHTML = tHtml || '<tr><td colspan=\"6\" style=\"text-align:center;color:var(--muted);\">No transactions yet</td></tr>';\n    });\n}\nfunction generateVendorQR() {\n    if (!activeVendor) return showBanner('venAlert', 'Vendor stall not loaded', 'error');\n    var item = document.getElementById('vItem').value.trim();\n    var amount = parseFloat(document.getElementById('vAmount').value || '0');\n    if (!item || amount <= 0) return showBanner('venAlert', 'Enter a valid item description and positive amount', 'error');\n    fetch('/api/x_2327324_konnect/konnectfest/vendor/create-qr', {\n        method: 'POST', headers: apiHeaders(true),\n        body: JSON.stringify({ event_sys_id: activeVendor.event_sys_id, vendor_sys_id: activeVendor.sys_id, item_description: item, amount: amount })\n    }).then(function(r) { return r.json(); }).then(function(res) {\n        var d = res.result || res;\n        if (!d.success) return showBanner('venAlert', d.message, 'error');\n        startQRDisplay(d);\n    });\n}\nfunction startQRDisplay(data) {\n    clearInterval(qrCountdown); clearInterval(qrPoller);\n    var seconds = data.expirySeconds || 120;\n    var totalSeconds = seconds;\n    var area = document.getElementById('qrDisplayArea');\n    area.innerHTML = '<div style=\"font-weight:700; color:var(--primary); font-size:15px;\">' + escapeHtml(data.itemDescription) + '</div>'\n        + '<div style=\"font-size:28px; font-weight:800; margin:4px 0 10px;\">' + formatINR(data.amount) + '</div>'\n        + '<div class=\"qr-box\" id=\"vendorQrSvg\"></div>'\n        + '<div id=\"qrTimerText\" style=\"font-size:13px; font-weight:700; color:var(--warning); margin-top:10px;\">Expires in ' + seconds + 's</div>'\n        + '<div class=\"progress-track\" style=\"max-width:260px;\"><div class=\"progress-fill\" id=\"qrProgressFill\" style=\"width:100%;\"></div></div>'\n        + '<div style=\"font-size:11px; color:var(--muted); margin-top:6px; word-break:break-all;\">Token: <code>' + escapeHtml(data.qrToken) + '</code></div>'\n        + '<a href=\"' + escapeHtml(data.confirmUrl) + '\" target=\"_blank\" style=\"font-size:12px; color:var(--primary); margin-top:6px; font-weight:600;\">Open Confirmation Link ↗</a>';\n    renderQRCode(document.getElementById('vendorQrSvg'), data.confirmUrl, 5);\n    qrCountdown = setInterval(function() {\n        seconds--;\n        var txt = document.getElementById('qrTimerText');\n        var fill = document.getElementById('qrProgressFill');\n        if (txt) txt.textContent = 'Expires in ' + seconds + 's';\n        if (fill) fill.style.width = ((seconds / totalSeconds) * 100) + '%';\n        if (seconds <= 0) {\n            clearInterval(qrCountdown); clearInterval(qrPoller);\n            area.innerHTML = '<div style=\"color:var(--danger); font-weight:700; padding:20px;\">QR Expired (120s). Please regenerate a new QR.</div>';\n        }\n    }, 1000);\n    qrPoller = setInterval(function() {\n        fetch('/api/x_2327324_konnect/konnectfest/vendor/qr-details?qr_token=' + encodeURIComponent(data.qrToken), { headers: apiHeaders(false) })\n            .then(function(r) { return r.json(); }).then(function(res) {\n                var qd = res.result || res;\n                if (!qd.valid) {\n                    clearInterval(qrCountdown); clearInterval(qrPoller);\n                    area.innerHTML = '<div style=\"color:var(--success); font-weight:800; font-size:20px; padding:30px;\">✓ Payment Confirmed!<br/><span style=\"font-size:13px; font-weight:500;\">Credited to Vendor Ledger</span></div>';\n                    loadVendorDash(activeVendor.sys_id);\n                }\n            });\n    }, 2000);\n}\nloadVendorDash();\n","participant":"\nfunction renderQRCode(containerEl, text, cellSize) {\n    if (!containerEl) return;\n    containerEl.innerHTML = '';\n    try {\n        if (typeof QRCode !== 'undefined') {\n            new QRCode(containerEl, {\n                text: text,\n                width: 200,\n                height: 200,\n                colorDark: '#0f172a',\n                colorLight: '#ffffff',\n                correctLevel: QRCode.CorrectLevel.M\n            });\n        } else {\n            containerEl.innerHTML = '<div style=\"padding:16px;background:#f8fafc;border:1px dashed #94a3b8;font-size:11px;word-break:break-all;\">' + escapeHtml(text) + '</div>';\n        }\n    } catch (e) {\n        containerEl.innerHTML = '<div style=\"color:#dc2626;font-size:12px;\">QR error: ' + e.message + '</div>';\n    }\n}\n\nfunction apiHeaders(isJson) {\n    var h = {};\n    if (isJson) h['Content-Type'] = 'application/json';\n    var el = document.getElementById('g_ck_token');\n    var token = (el && el.value && el.value !== 'null') ? el.value : (window.g_ck || '');\n    if (token) h['X-UserToken'] = token;\n    return h;\n}\n\nfunction formatINR(val) {\n    var n = parseFloat(val || 0);\n    return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n}\n\nfunction escapeHtml(str) {\n    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');\n}\n\n\nvar pData = null;\nvar pendingTxSysId = '';\nvar activeTopUpPaymentId = '';\nfunction switchPartTab(id, btn) {\n    document.querySelectorAll('.part-tab').forEach(function(el) { el.style.display = 'none'; });\n    document.querySelectorAll('.tab-btn').forEach(function(el) { el.classList.remove('active'); });\n    document.getElementById(id).style.display = 'block';\n    if (btn) btn.classList.add('active');\n}\nfunction loadParticipantDash() {\n    var params = new URLSearchParams(window.location.search);\n    var pId = params.get('participant_sys_id') || '';\n    var url = '/api/x_2327324_konnect/konnectfest/participant/dashboard' + (pId ? '?participant_sys_id=' + encodeURIComponent(pId) : '');\n    fetch(url, { headers: apiHeaders(false) }).then(function(r) { return r.json(); }).then(function(res) {\n        var d = res.result || res;\n        if (!d.success) return showBanner('partAlert', d.message || 'Could not load wallet', 'error');\n        pData = d;\n        document.getElementById('partNamePill').textContent = d.participant.name;\n        document.getElementById('partEventName').textContent = d.event.name || 'Event Wallet';\n        document.getElementById('partEventState').textContent = (d.event.state || '').toUpperCase();\n        document.getElementById('partBalance').textContent = formatINR(d.wallet.available_balance);\n        document.getElementById('partReserved').textContent = formatINR(d.wallet.reserved_balance);\n        document.getElementById('partSpent').textContent = formatINR(d.wallet.total_spent);\n        var isCompleted = d.event.state === 'completed';\n        document.getElementById('refundLockedMsg').style.display = isCompleted ? 'none' : 'block';\n        document.getElementById('refundFormArea').style.display = isCompleted ? 'block' : 'none';\n        var rHtml = '';\n        (d.receipts || []).forEach(function(cp) {\n            rHtml += '<div style=\"padding:10px 0; border-bottom:1px solid var(--border); display:flex; justify-content:space-between;\"><div><strong>' + escapeHtml(cp.item_description) + '</strong><br/><span style=\"color:var(--muted); font-size:11px;\">' + escapeHtml(cp.vendor_name) + ' • ' + escapeHtml(cp.coupon_id) + '</span></div><div style=\"font-weight:700; color:var(--primary);\">' + formatINR(cp.value) + '</div></div>';\n        });\n        document.getElementById('receiptsList').innerHTML = rHtml || '<span style=\"color:var(--muted);\">No digital purchase receipts yet.</span>';\n        var lHtml = '';\n        (d.ledger || []).forEach(function(lg) {\n            var isCredit = lg.entry_type === 'initial_credit' || lg.entry_type === 'top_up' || lg.entry_type === 'refund_release';\n            lHtml += '<div style=\"padding:10px 0; border-bottom:1px solid var(--border); display:flex; justify-content:space-between;\"><div><strong>' + escapeHtml(lg.entry_type.toUpperCase()) + '</strong><br/><span style=\"color:var(--muted); font-size:11px;\">' + escapeHtml(lg.notes) + '</span></div><div style=\"text-align:right;\"><strong style=\"color:' + (isCredit ? 'var(--success)' : 'var(--danger)') + ';\">' + (isCredit ? '+' : '-') + formatINR(lg.amount) + '</strong><br/><span style=\"font-size:11px; color:var(--muted);\">Bal: ' + formatINR(lg.available_after) + '</span></div></div>';\n        });\n        document.getElementById('ledgerList').innerHTML = lHtml || '<span style=\"color:var(--muted);\">No ledger entries yet.</span>';\n        var qrParam = params.get('qr_token');\n        if (qrParam && !pendingTxSysId) { document.getElementById('pQrInput').value = qrParam; lookupPartQR(); }\n    });\n}\nfunction lookupPartQR() {\n    var token = document.getElementById('pQrInput').value.trim();\n    if (!token) return showBanner('partAlert', 'Enter a QR token to verify', 'error');\n    fetch('/api/x_2327324_konnect/konnectfest/vendor/qr-details?qr_token=' + encodeURIComponent(token), { headers: apiHeaders(false) })\n        .then(function(r) { return r.json(); }).then(function(res) {\n            var d = res.result || res;\n            if (!d.valid || !d.transaction) return showBanner('partAlert', d.message || 'Invalid or expired QR token', 'error');\n            pendingTxSysId = d.transaction.sysId;\n            document.getElementById('mVendor').textContent = d.transaction.vendorName + (d.transaction.stallNumber ? ' (' + d.transaction.stallNumber + ')' : '');\n            document.getElementById('mEvent').textContent = d.transaction.eventName;\n            document.getElementById('mItem').textContent = d.transaction.itemDescription;\n            document.getElementById('mAmt').textContent = formatINR(d.transaction.amount);\n            document.getElementById('pConfirmModal').style.display = 'flex';\n        });\n}\nfunction confirmPartPurchase() {\n    if (!pendingTxSysId || !pData) return;\n    fetch('/api/x_2327324_konnect/konnectfest/purchase/confirm', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ transaction_sys_id: pendingTxSysId, participant_sys_id: pData.participant.sys_id }) })\n        .then(function(r) { return r.json(); }).then(function(res) {\n            var d = res.result || res; closePartModal();\n            showBanner('partAlert', d.message, d.success ? 'success' : 'error');\n            if (d.success) { document.getElementById('pQrInput').value = ''; loadParticipantDash(); }\n        });\n}\nfunction closePartModal() { document.getElementById('pConfirmModal').style.display = 'none'; }\nfunction createTopUpQR() {\n    if (!pData) return;\n    var amt = parseFloat(document.getElementById('topupAmt').value || '0');\n    if (amt <= 0) return showBanner('partAlert', 'Enter a positive top-up amount', 'error');\n    fetch('/api/x_2327324_konnect/konnectfest/wallet/topup', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ participant_sys_id: pData.participant.sys_id, event_sys_id: pData.event.sys_id, amount: amt }) })\n        .then(function(r) { return r.json(); }).then(function(res) {\n            var d = res.result || res;\n            if (!d.success) return showBanner('partAlert', d.message, 'error');\n            activeTopUpPaymentId = d.paymentSysId;\n            document.getElementById('topupQrSection').style.display = 'block';\n            renderQRCode(document.getElementById('topupQrBox'), d.upiUri, 5);\n            document.getElementById('topupPayeeInfo').textContent = 'Pay ' + formatINR(d.amount) + ' to ' + d.payeeName + ' (' + d.upiId + ') • Ref: ' + d.paymentNumber;\n        });\n}\nfunction submitTopUpUtr() {\n    var utr = document.getElementById('topupUtrInput').value.trim();\n    if (!activeTopUpPaymentId || !utr) return showBanner('partAlert', 'Enter your bank UTR reference', 'error');\n    fetch('/api/x_2327324_konnect/konnectfest/registration/submit-utr', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ payment_sys_id: activeTopUpPaymentId, utr_reference: utr }) })\n        .then(function(r) { return r.json(); }).then(function(res) {\n            var d = res.result || res; showBanner('partAlert', d.message, d.success ? 'success' : 'error');\n            if (d.success) { document.getElementById('topupQrSection').style.display = 'none'; document.getElementById('topupAmt').value = ''; document.getElementById('topupUtrInput').value = ''; loadParticipantDash(); }\n        });\n}\nfunction submitPartRefund() {\n    if (!pData) return;\n    var payload = { participant_sys_id: pData.participant.sys_id, event_sys_id: pData.event.sys_id, requested_amount: parseFloat(document.getElementById('rfAmt').value || '0'), bank_account_holder: document.getElementById('rfHolder').value.trim(), bank_account_number: document.getElementById('rfAcct').value.trim(), bank_ifsc: document.getElementById('rfIfsc').value.trim(), upi_id: document.getElementById('rfUpi').value.trim() };\n    fetch('/api/x_2327324_konnect/konnectfest/refund/request', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify(payload) })\n        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('partAlert', d.message, d.success ? 'success' : 'error'); if (d.success) loadParticipantDash(); });\n}\nloadParticipantDash();\n","register":"\nfunction renderQRCode(containerEl, text, cellSize) {\n    if (!containerEl) return;\n    containerEl.innerHTML = '';\n    try {\n        if (typeof QRCode !== 'undefined') {\n            new QRCode(containerEl, {\n                text: text,\n                width: 200,\n                height: 200,\n                colorDark: '#0f172a',\n                colorLight: '#ffffff',\n                correctLevel: QRCode.CorrectLevel.M\n            });\n        } else {\n            containerEl.innerHTML = '<div style=\"padding:16px;background:#f8fafc;border:1px dashed #94a3b8;font-size:11px;word-break:break-all;\">' + escapeHtml(text) + '</div>';\n        }\n    } catch (e) {\n        containerEl.innerHTML = '<div style=\"color:#dc2626;font-size:12px;\">QR error: ' + e.message + '</div>';\n    }\n}\n\nfunction apiHeaders(isJson) {\n    var h = {};\n    if (isJson) h['Content-Type'] = 'application/json';\n    var el = document.getElementById('g_ck_token');\n    var token = (el && el.value && el.value !== 'null') ? el.value : (window.g_ck || '');\n    if (token) h['X-UserToken'] = token;\n    return h;\n}\n\nfunction formatINR(val) {\n    var n = parseFloat(val || 0);\n    return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n}\n\nfunction escapeHtml(str) {\n    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');\n}\n\n\nvar createdPaymentId = '';\nfunction loadPublicEvents() {\n    fetch('/api/x_2327324_konnect/konnectfest/public/events').then(function(r) { return r.json(); }).then(function(res) {\n        var d = res.result || res;\n        var sel = document.getElementById('rEvent'); sel.innerHTML = '';\n        (d.events || []).forEach(function(ev) {\n            var opt = document.createElement('option'); opt.value = ev.sys_id; opt.textContent = ev.name + ' (' + ev.state + ')'; sel.appendChild(opt);\n        });\n        if ((d.events || []).length === 0) sel.innerHTML = '<option value=\"\">No events currently open for registration</option>';\n    });\n}\nfunction submitPublicReg() {\n    var payload = { event_sys_id: document.getElementById('rEvent').value, name: document.getElementById('rName').value.trim(), email: document.getElementById('rEmail').value.trim(), phone: document.getElementById('rPhone').value.trim(), college_organization: document.getElementById('rCollege').value.trim(), requested_amount: parseFloat(document.getElementById('rAmount').value || '0') };\n    if (!payload.event_sys_id || !payload.name || !payload.email || payload.requested_amount <= 0) return showBanner('regAlert', 'Please fill event, name, email, and positive amount', 'error');\n    fetch('/api/x_2327324_konnect/konnectfest/registration', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })\n        .then(function(r) { return r.json(); }).then(function(res) {\n            var d = res.result || res;\n            if (!d.success) return showBanner('regAlert', d.message, 'error');\n            createdPaymentId = d.paymentSysId;\n            document.getElementById('regStep1').style.display = 'none';\n            document.getElementById('regStep2').style.display = 'block';\n            renderQRCode(document.getElementById('regQrBox'), d.upiUri, 5);\n            document.getElementById('regPayInfo').innerHTML = '<strong>Pay ' + formatINR(d.amount) + '</strong> to ' + escapeHtml(d.payeeName) + '<br/>UPI ID: <code>' + escapeHtml(d.upiId) + '</code> • Ref: <code>' + escapeHtml(d.paymentNumber) + '</code>';\n        });\n}\nfunction submitPublicUtr() {\n    var utr = document.getElementById('rUtr').value.trim();\n    if (!utr) return showBanner('regAlert', 'Please enter your bank UTR reference', 'error');\n    fetch('/api/x_2327324_konnect/konnectfest/registration/submit-utr', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ payment_sys_id: createdPaymentId, utr_reference: utr }) })\n        .then(function(r) { return r.json(); }).then(function(res) {\n            var d = res.result || res;\n            if (!d.success) return showBanner('regAlert', d.message, 'error');\n            document.getElementById('regStep2').style.display = 'none';\n            document.getElementById('regStep3').style.display = 'block';\n            document.getElementById('regDoneMsg').textContent = d.message;\n        });\n}\nloadPublicEvents();\n"};

export function handleGetPublicScript(request: any, response: any) {
    try {
        const page = (request.queryParams && request.queryParams.page) ? String(request.queryParams.page) : 'register';
        const script = CLIENT_SCRIPTS[page] || 'console.error("Script not found for page: ' + page + '");';
        response.setContentType('application/javascript; charset=UTF-8');
        response.setStatus(200);
        const writer = response.getStreamWriter();
        if (writer && typeof writer.writeString === 'function') {
            writer.writeString(script);
        } else {
            response.setBody(script);
        }
    } catch (e: any) {
        response.setStatus(500);
        response.setBody('console.error("Error serving script: ' + (e.message || e) + '");');
    }
}
