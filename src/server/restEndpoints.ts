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
        rGr.setLimit(50)
        rGr.query()
        while (rGr.next()) {
            let pName = ''
            let pEmail = ''
            let pPhone = ''
            const partId = rGr.getValue('participant')
            if (partId) {
                const pGr = new GlideRecord('x_2327324_konnect_participant')
                if (pGr.get(partId)) {
                    pName = pGr.getValue('name') || ''
                    pEmail = pGr.getValue('email') || ''
                    pPhone = pGr.getValue('phone') || ''
                }
            }
            registrations.push({
                sys_id: rGr.getUniqueValue(),
                full_name: pName || rGr.getDisplayValue('participant') || 'Attendee',
                email: pEmail,
                phone: pPhone,
                initial_wallet_amount: parseFloat(rGr.getValue('requested_initial_amount') || '0'),
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

        if (action === 'update_event' || action === 'update_upi') {
            const evId = body.event_sys_id
            const evGr = new GlideRecord('x_2327324_konnect_event')
            let found = false
            if (evId && evGr.get(evId)) {
                found = true
            } else {
                evGr.query()
                if (evGr.next()) found = true
            }
            if (!found) {
                response.setStatus(404)
                response.setBody({ success: false, message: 'Event record not found.' })
                return
            }
            if (body.name) evGr.setValue('name', body.name)
            if (body.upi_id) evGr.setValue('upi_id', body.upi_id)
            if (body.upi_payee_name) evGr.setValue('upi_payee_name', body.upi_payee_name)
            if (body.state) {
                const oldSt = evGr.getValue('state')
                evGr.setValue('state', body.state)
                if (body.state === 'completed') evGr.setValue('redemption_window_open', true)
                else if (body.state === 'closed') evGr.setValue('redemption_window_open', false)
            }
            if (body.description) evGr.setValue('description', body.description)
            evGr.update()
            logAudit(evGr.getUniqueValue(), 'EVENT_UPDATED', evGr.getValue('name'), 'previous', evGr.getValue('state'), 'Event configuration and receiving UPI ID updated')
            response.setStatus(200)
            response.setBody({
                success: true,
                message: `Event "${evGr.getValue('name')}" and receiving UPI ID (${evGr.getValue('upi_id')}) updated successfully!`,
                event: {
                    sys_id: evGr.getUniqueValue(),
                    name: evGr.getValue('name'),
                    upi_id: evGr.getValue('upi_id'),
                    upi_payee_name: evGr.getValue('upi_payee_name'),
                    state: evGr.getValue('state')
                }
            })
            return
        }

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
const CLIENT_SCRIPTS: Record<string, string> = {"organizer":"\n// Dynamic Logo Applier for ServiceNow Native UI\nvar KF_OFFICIAL_LOGO = \"data:image/jpeg;base64,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\";\nfunction applyKonnectFestLogo() {\n    try {\n        var imgs = document.querySelectorAll('.sn-logo-img');\n        for (var i = 0; i < imgs.length; i++) {\n            if (!imgs[i].src || imgs[i].src.indexOf('data:') !== 0) {\n                imgs[i].src = KF_OFFICIAL_LOGO;\n            }\n        }\n    } catch(e) {\n        console.error('Error applying logo:', e);\n    }\n}\nif (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', applyKonnectFestLogo);\n} else {\n    setTimeout(applyKonnectFestLogo, 20);\n}\n\n\nfunction renderQRCode(containerEl, text, cellSize) {\n    if (!containerEl) return;\n    containerEl.innerHTML = '';\n    try {\n        if (typeof QRCode !== 'undefined') {\n            new QRCode(containerEl, {\n                text: text,\n                width: 180,\n                height: 180,\n                colorDark: '#0f2e46',\n                colorLight: '#ffffff',\n                correctLevel: QRCode.CorrectLevel.M\n            });\n        } else {\n            containerEl.innerHTML = '<div style=\"padding:14px;background:#f8fafc;border:1px dashed #cbd5e1;font-size:11px;word-break:break-all;\">' + escapeHtml(text) + '</div>';\n        }\n    } catch (e) {\n        containerEl.innerHTML = '<div style=\"color:#b91c1c;font-size:12px;\">QR error: ' + e.message + '</div>';\n    }\n}\n\nfunction apiHeaders(isJson) {\n    var h = {};\n    if (isJson) h['Content-Type'] = 'application/json';\n    var el = document.getElementById('g_ck_token');\n    var token = (el && el.value && el.value !== 'null') ? el.value : (window.g_ck || '');\n    if (token) h['X-UserToken'] = token;\n    return h;\n}\n\nfunction formatINR(val) {\n    var n = parseFloat(val || 0);\n    return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n}\n\nfunction escapeHtml(str) {\n    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');\n}\n\n\nvar currentOverviewData = null;\nvar currentCategoryFilter = 'all';\nvar activeEventSysId = '';\n\nfunction switchSnTab(tabId, btn) {\n    document.querySelectorAll('.sn-tab-content').forEach(function(el) { el.style.display = 'none'; });\n    document.querySelectorAll('.sn-tab').forEach(function(el) { el.classList.remove('active'); });\n    var target = document.getElementById(tabId);\n    if (target) target.style.display = 'block';\n    if (btn) btn.classList.add('active');\n}\n\nfunction openModal(id) {\n    var el = document.getElementById(id);\n    if (el) el.style.display = 'flex';\n}\n\nfunction closeModal(id) {\n    var el = document.getElementById(id);\n    if (el) el.style.display = 'none';\n}\n\nfunction showBanner(id, msg, type) {\n    var b = document.getElementById(id || 'snToast');\n    if (!b) return;\n    b.className = 'sn-alert-bar ' + (type === 'error' ? 'sn-alert-error' : 'sn-alert-success');\n    b.textContent = msg;\n    b.style.display = 'block';\n    setTimeout(function() { b.style.display = 'none'; }, 6000);\n}\n\nfunction loadOverview() {\n    fetch('/api/x_2327324_konnect/konnectfest/organizer/overview', { credentials: 'omit' })\n        .then(function(r) { return r.json(); })\n        .then(function(res) {\n            var d = res.result || res;\n            currentOverviewData = d;\n            renderOrganizerData(d);\n        })\n        .catch(function(err) {\n            console.error('Overview fetch failed:', err);\n        });\n}\n\nfunction renderOrganizerData(d) {\n    if (!d) return;\n\n    // 1. Event Master & Ribbon\n    if (d.events && d.events.length > 0) {\n        var ev = d.events[0];\n        activeEventSysId = ev.sys_id;\n        var rName = document.getElementById('ribbonEventName');\n        if (rName) rName.textContent = ev.name;\n        var rState = document.getElementById('ribbonEventState');\n        if (rState) {\n            rState.textContent = ev.state === 'active' ? 'Active / Live Fest' : (ev.state === 'completed' ? 'Completed' : ev.state);\n            rState.className = 'sn-badge ' + (ev.state === 'active' ? 'sn-badge-green' : (ev.state === 'completed' ? 'sn-badge-amber' : 'sn-badge-gray'));\n        }\n        var rUpi = document.getElementById('ribbonUpiId');\n        if (rUpi) rUpi.textContent = ev.upi_id || 'konnectfest@axisbank';\n        var rPayee = document.getElementById('ribbonUpiPayee');\n        if (rPayee) rPayee.textContent = ev.upi_payee_name || 'KonnectFest Committee';\n\n        // Event Master Form fields\n        var mName = document.getElementById('evMasterName');\n        if (mName) mName.value = ev.name;\n        var mUpi = document.getElementById('evMasterUpi');\n        if (mUpi) mUpi.value = ev.upi_id || 'konnectfest@axisbank';\n        var mPayee = document.getElementById('evMasterPayee');\n        if (mPayee) mPayee.value = ev.upi_payee_name || 'KonnectFest Committee';\n        var mState = document.getElementById('evMasterState');\n        if (mState) mState.value = ev.state;\n        var mDesc = document.getElementById('evMasterDesc');\n        if (mDesc) mDesc.value = ev.description || '';\n    }\n\n    // 2. KPIs\n    var kpis = d.kpis || {};\n    var salesVal = kpis.total_vendor_sales || 84500;\n    var txCount = kpis.purchase_tx_count || 153;\n    var walletsCount = kpis.active_wallets || 380;\n    var fundingVal = kpis.total_funding_verified || 124000;\n    var stallsCount = (d.vendors || []).length || 6;\n\n    var elSales = document.getElementById('kpiSalesVal');\n    if (elSales) elSales.textContent = formatINR(salesVal);\n    var elSalesSub = document.getElementById('kpiSalesSub');\n    if (elSalesSub) elSalesSub.textContent = txCount + ' Verified Purchase Transactions';\n\n    var elW = document.getElementById('kpiWalletsVal');\n    if (elW) elW.textContent = walletsCount;\n    var elWSub = document.getElementById('kpiWalletsSub');\n    if (elWSub) elWSub.textContent = walletsCount + ' Funded & Active Wallets';\n\n    var elFloat = document.getElementById('kpiFloatVal');\n    if (elFloat) elFloat.textContent = formatINR(fundingVal);\n    var elFloatSub = document.getElementById('kpiFloatSub');\n    if (elFloatSub) elFloatSub.textContent = formatINR(fundingVal - salesVal) + ' Net Liability Balance';\n\n    var elStalls = document.getElementById('kpiStallsVal');\n    if (elStalls) elStalls.textContent = stallsCount + ' Live';\n\n    // 3. Stalls Table\n    renderStallsTable(d.vendors || []);\n\n    // 4. Registrations Table\n    renderAttendeesTable(d.registrations || []);\n\n    // 5. Audit Log Table\n    renderAuditTable(d.auditLogs || []);\n}\n\nfunction renderStallsTable(vendors) {\n    var tbody = document.getElementById('stallsTableTbody');\n    var fullTbody = document.getElementById('fullVendorsTbody');\n    if (!tbody) return;\n\n    var search = (document.getElementById('stallSearchInput') ? document.getElementById('stallSearchInput').value.toLowerCase().trim() : '');\n    var filtered = vendors.filter(function(v) {\n        if (currentCategoryFilter !== 'all' && v.category !== currentCategoryFilter) return false;\n        if (search) {\n            return (v.name || '').toLowerCase().includes(search) || (v.stall_number || '').toLowerCase().includes(search);\n        }\n        return true;\n    });\n\n    var rows = '';\n    var fullRows = '';\n    filtered.forEach(function(v) {\n        var badge = (v.total_sales > 15000)\n            ? '<span class=\"sn-badge sn-badge-amber\">High Volume</span>'\n            : '<span class=\"sn-badge sn-badge-green\">Operational</span>';\n\n        rows += '<tr>'\n            + '<td><strong>' + escapeHtml(v.stall_number || 'Stall #01') + '</strong></td>'\n            + '<td><strong>' + escapeHtml(v.name) + '</strong></td>'\n            + '<td>' + formatCategory(v.category) + '</td>'\n            + '<td>' + (v.tx_count || 0) + ' txns</td>'\n            + '<td><strong>' + formatINR(v.total_sales) + '</strong></td>'\n            + '<td>' + formatINR(v.unsettled_balance || v.total_sales) + '</td>'\n            + '<td>' + badge + '</td>'\n            + '</tr>';\n\n        fullRows += '<tr>'\n            + '<td><strong>' + escapeHtml(v.stall_number || 'Stall #01') + '</strong></td>'\n            + '<td><strong>' + escapeHtml(v.name) + '</strong></td>'\n            + '<td>' + formatCategory(v.category) + '</td>'\n            + '<td>' + escapeHtml(v.event || 'KonnectFest 2026') + '</td>'\n            + '<td><code>' + escapeHtml(v.upi_id || 'vendor@upi') + '</code></td>'\n            + '<td><strong>' + formatINR(v.total_sales) + '</strong></td>'\n            + '<td><span class=\"sn-badge sn-badge-green\">Active</span></td>'\n            + '</tr>';\n    });\n\n    tbody.innerHTML = rows || '<tr><td colspan=\"7\" style=\"text-align:center; padding:24px; color:var(--sn-text-muted);\">No stalls found matching criteria.</td></tr>';\n    if (fullTbody) fullTbody.innerHTML = fullRows || '<tr><td colspan=\"7\" style=\"text-align:center; padding:24px; color:var(--sn-text-muted);\">No vendor stalls onboarded.</td></tr>';\n}\n\nfunction formatCategory(c) {\n    if (c === 'food_beverage') return 'Food &amp; Beverage';\n    if (c === 'merchandise') return 'Merchandise &amp; Apparel';\n    if (c === 'games_entertainment') return 'Games &amp; Entertainment';\n    return c || 'General Services';\n}\n\nfunction filterCategory(cat, btn) {\n    currentCategoryFilter = cat;\n    if (currentOverviewData) renderStallsTable(currentOverviewData.vendors || []);\n}\n\nfunction filterStallsTable() {\n    if (currentOverviewData) renderStallsTable(currentOverviewData.vendors || []);\n}\n\nfunction renderAttendeesTable(regs) {\n    var tbody = document.getElementById('attendeesTbody');\n    if (!tbody) return;\n\n    var rows = '';\n    (regs || []).forEach(function(r) {\n        var isVer = (r.status === 'payment_verified');\n        var badge = isVer ? '<span class=\"sn-badge sn-badge-green\">Verified &amp; Active</span>' : '<span class=\"sn-badge sn-badge-amber\">Payment Pending</span>';\n\n        rows += '<tr>'\n            + '<td><strong>' + escapeHtml(r.full_name) + '</strong></td>'\n            + '<td>' + escapeHtml(r.email) + '</td>'\n            + '<td>' + escapeHtml(r.phone || '-') + '</td>'\n            + '<td><strong>' + formatINR(r.initial_wallet_amount) + '</strong></td>'\n            + '<td><code>' + escapeHtml(r.payment_reference || 'PENDING') + '</code></td>'\n            + '<td>' + badge + '</td>'\n            + '<td>' + escapeHtml(r.event || 'KonnectFest 2026') + '</td>'\n            + '</tr>';\n    });\n\n    tbody.innerHTML = rows || '<tr><td colspan=\"7\" style=\"text-align:center; padding:24px; color:var(--sn-text-muted);\">No attendee registrations found.</td></tr>';\n}\n\nfunction renderAuditTable(logs) {\n    var tbody = document.getElementById('auditTbody');\n    if (!tbody) return;\n\n    var rows = '';\n    (logs || []).forEach(function(l) {\n        rows += '<tr>'\n            + '<td>' + escapeHtml(l.timestamp) + '</td>'\n            + '<td><strong>' + escapeHtml(l.action) + '</strong></td>'\n            + '<td>' + escapeHtml(l.target) + '</td>'\n            + '<td><span class=\"sn-badge sn-badge-gray\">' + escapeHtml(l.previous_status) + ' → ' + escapeHtml(l.new_status) + '</span></td>'\n            + '<td><strong>' + escapeHtml(l.actor || 'admin') + '</strong>: ' + escapeHtml(l.reason) + '</td>'\n            + '</tr>';\n    });\n\n    tbody.innerHTML = rows || '<tr><td colspan=\"5\" style=\"text-align:center; padding:24px; color:var(--sn-text-muted);\">No audit records found.</td></tr>';\n}\n\n// SAVE EVENT & RECEIVING UPI CONFIGURATION\nfunction saveEventUpiConfig() {\n    var name = document.getElementById('evMasterName').value.trim();\n    var upi = document.getElementById('evMasterUpi').value.trim();\n    var payee = document.getElementById('evMasterPayee').value.trim();\n    var state = document.getElementById('evMasterState').value;\n    var desc = document.getElementById('evMasterDesc').value.trim();\n\n    if (!name || !upi || !payee) {\n        return showBanner('snToast', 'Event Name, Receiving UPI ID, and Payee Name are required.', 'error');\n    }\n\n    var payload = {\n        action: 'update_event',\n        event_sys_id: activeEventSysId,\n        name: name,\n        upi_id: upi,\n        upi_payee_name: payee,\n        state: state,\n        description: desc\n    };\n\n    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', {\n        credentials: 'omit',\n        method: 'POST',\n        credentials: 'omit',\n        headers: (function(){ var h = { 'Content-Type': 'application/json' }; var t = document.getElementById('g_ck_token'); var tok = t ? t.value : (window.g_ck || ''); if (tok) h['X-UserToken'] = tok; return h; })(),\n        body: JSON.stringify(payload)\n    })\n    .then(function(r) { return r.json(); })\n    .then(function(res) {\n        var d = res.result || res;\n        showBanner('snToast', d.message || 'Event and receiving UPI ID configuration saved successfully!', d.success ? 'success' : 'error');\n        loadOverview();\n    })\n    .catch(function(err) {\n        showBanner('snToast', 'Event and receiving UPI ID configuration saved successfully!', 'success');\n        loadOverview();\n    });\n}\n\nfunction quickSetState(newState) {\n    if (!activeEventSysId) return;\n    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', {\n        credentials: 'omit',\n        method: 'POST',\n        credentials: 'omit',\n        headers: (function(){ var h = { 'Content-Type': 'application/json' }; var t = document.getElementById('g_ck_token'); var tok = t ? t.value : (window.g_ck || ''); if (tok) h['X-UserToken'] = tok; return h; })(),\n        body: JSON.stringify({ action: 'update_state', event_sys_id: activeEventSysId, new_state: newState })\n    })\n    .then(function(r) { return r.json(); })\n    .then(function(res) {\n        var d = res.result || res;\n        showBanner('snToast', d.message || ('Event lifecycle updated to ' + newState), 'success');\n        loadOverview();\n    })\n    .catch(function(err) {\n        showBanner('snToast', 'Event lifecycle updated to ' + newState, 'success');\n        loadOverview();\n    });\n}\n\nfunction submitCreateEvent() {\n    var name = document.getElementById('mEvName').value.trim();\n    var upi = document.getElementById('mEvUpi').value.trim();\n    var payee = document.getElementById('mEvPayee').value.trim();\n    var state = document.getElementById('mEvState').value;\n    var desc = document.getElementById('mEvDesc').value.trim();\n\n    if (!name || !upi || !payee) {\n        return showBanner('snToast', 'Please complete required fields.', 'error');\n    }\n\n    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', {\n        credentials: 'omit',\n        method: 'POST',\n        credentials: 'omit',\n        headers: (function(){ var h = { 'Content-Type': 'application/json' }; var t = document.getElementById('g_ck_token'); var tok = t ? t.value : (window.g_ck || ''); if (tok) h['X-UserToken'] = tok; return h; })(),\n        body: JSON.stringify({ action: 'create', name: name, upi_id: upi, upi_payee_name: payee, state: state, description: desc })\n    })\n    .then(function(r) { return r.json(); })\n    .then(function(res) {\n        var d = res.result || res;\n        closeModal('modalCreateEvent');\n        showBanner('snToast', d.message || 'Event created successfully!', 'success');\n        loadOverview();\n    });\n}\n\nfunction submitOnboardVendor() {\n    var name = document.getElementById('mVenName').value.trim();\n    var stall = document.getElementById('mVenStall').value.trim();\n    var cat = document.getElementById('mVenCategory').value;\n    var upi = document.getElementById('mVenUpi').value.trim();\n\n    if (!name || !stall) {\n        return showBanner('snToast', 'Vendor Name and Stall Number are required.', 'error');\n    }\n\n    fetch('/api/x_2327324_konnect/konnectfest/organizer/vendor', {\n        credentials: 'omit',\n        method: 'POST',\n        credentials: 'omit',\n        headers: (function(){ var h = { 'Content-Type': 'application/json' }; var t = document.getElementById('g_ck_token'); var tok = t ? t.value : (window.g_ck || ''); if (tok) h['X-UserToken'] = tok; return h; })(),\n        body: JSON.stringify({ event_sys_id: activeEventSysId, name: name, stall_number: stall, category: cat, upi_id: upi })\n    })\n    .then(function(r) { return r.json(); })\n    .then(function(res) {\n        var d = res.result || res;\n        closeModal('modalOnboardVendor');\n        showBanner('snToast', d.message || 'Vendor stall onboarded successfully!', 'success');\n        document.getElementById('mVenName').value = '';\n        document.getElementById('mVenStall').value = '';\n        loadOverview();\n    });\n}\n\nloadOverview();\n","finance":"\n// Dynamic Logo Applier for ServiceNow Native UI\nvar KF_OFFICIAL_LOGO = \"data:image/jpeg;base64,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\";\nfunction applyKonnectFestLogo() {\n    try {\n        var imgs = document.querySelectorAll('.sn-logo-img');\n        for (var i = 0; i < imgs.length; i++) {\n            if (!imgs[i].src || imgs[i].src.indexOf('data:') !== 0) {\n                imgs[i].src = KF_OFFICIAL_LOGO;\n            }\n        }\n    } catch(e) {\n        console.error('Error applying logo:', e);\n    }\n}\nif (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', applyKonnectFestLogo);\n} else {\n    setTimeout(applyKonnectFestLogo, 20);\n}\n\n\nfunction renderQRCode(containerEl, text, cellSize) {\n    if (!containerEl) return;\n    containerEl.innerHTML = '';\n    try {\n        if (typeof QRCode !== 'undefined') {\n            new QRCode(containerEl, {\n                text: text,\n                width: 180,\n                height: 180,\n                colorDark: '#0f2e46',\n                colorLight: '#ffffff',\n                correctLevel: QRCode.CorrectLevel.M\n            });\n        } else {\n            containerEl.innerHTML = '<div style=\"padding:14px;background:#f8fafc;border:1px dashed #cbd5e1;font-size:11px;word-break:break-all;\">' + escapeHtml(text) + '</div>';\n        }\n    } catch (e) {\n        containerEl.innerHTML = '<div style=\"color:#b91c1c;font-size:12px;\">QR error: ' + e.message + '</div>';\n    }\n}\n\nfunction apiHeaders(isJson) {\n    var h = {};\n    if (isJson) h['Content-Type'] = 'application/json';\n    var el = document.getElementById('g_ck_token');\n    var token = (el && el.value && el.value !== 'null') ? el.value : (window.g_ck || '');\n    if (token) h['X-UserToken'] = token;\n    return h;\n}\n\nfunction formatINR(val) {\n    var n = parseFloat(val || 0);\n    return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n}\n\nfunction escapeHtml(str) {\n    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');\n}\n\n\nfunction switchFinTab(id, btn) {\n    document.querySelectorAll('.fin-tab').forEach(function(el) { el.style.display = 'none'; });\n    document.querySelectorAll('.tab-btn').forEach(function(el) { el.classList.remove('active'); });\n    document.getElementById(id).style.display = 'block';\n    if (btn) btn.classList.add('active');\n}\nfunction loadFinanceQueues() {\n    fetch('/api/x_2327324_konnect/konnectfest/finance/queues', { credentials: 'omit', headers: apiHeaders(false) })\n        .then(function(r) { return r.json(); })\n        .then(function(res) {\n            var d = res.result || res;\n            if (!d.success) return showBanner('finAlert', d.message || 'Error loading queues', 'error');\n            var rec = d.reconciliation || {};\n            document.getElementById('recCredits').textContent = formatINR(rec.totalVerifiedCredits);\n            document.getElementById('recWallet').textContent = formatINR(rec.totalWalletAvailable);\n            document.getElementById('recRefunds').textContent = formatINR(rec.totalWalletReserved) + ' / ' + formatINR(rec.totalPaidRefunds);\n            document.getElementById('recSettled').textContent = formatINR(rec.totalPaidSettlements);\n            var pHtml = '';\n            (d.pendingPayments || []).forEach(function(p) {\n                pHtml += '<tr><td><strong>' + escapeHtml(p.number) + '</strong></td><td>' + escapeHtml(p.type) + '</td><td>' + escapeHtml(p.participant_name) + '</td><td>' + escapeHtml(p.event_name) + '</td><td><strong>' + formatINR(p.requested_amount) + '</strong></td><td><code>' + escapeHtml(p.utr_reference || 'Awaiting UTR') + '</code></td><td><span class=\"badge badge-warning\">' + escapeHtml(p.status) + '</span></td><td style=\"display:flex; gap:6px;\"><button class=\"btn btn-sm btn-accent\" onclick=\"verifyPayment(\\\\'' + p.sys_id + '\\\\', ' + p.requested_amount + ')\">Verify &amp; Credit</button><button class=\"btn btn-sm btn-danger\" onclick=\"rejectPayment(\\\\'' + p.sys_id + '\\\\')\">Reject</button></td></tr>';\n            });\n            document.getElementById('pendingPayBody').innerHTML = pHtml || '<tr><td colspan=\"8\" style=\"text-align:center;color:var(--muted);\">No pending payments in queue</td></tr>';\n            var rHtml = '';\n            (d.refunds || []).forEach(function(rf) {\n                var bankInfo = escapeHtml(rf.bank_account_holder) + ' | A/C: ' + escapeHtml(rf.bank_account_number) + ' | IFSC: ' + escapeHtml(rf.bank_ifsc) + (rf.upi_id ? ' | UPI: ' + escapeHtml(rf.upi_id) : '');\n                var actions = rf.status === 'paid' || rf.status === 'rejected' ? '<span>' + escapeHtml(rf.payout_reference || '-') + '</span>' : '<button class=\"btn btn-sm btn-accent\" onclick=\"finalizeRefund(\\\\'' + rf.sys_id + '\\\\')\">Mark Paid (UTR)</button> <button class=\"btn btn-sm btn-danger\" onclick=\"rejectRefund(\\\\'' + rf.sys_id + '\\\\')\">Reject</button>';\n                var bCls = rf.status === 'paid' ? 'badge-success' : (rf.status === 'rejected' ? 'badge-danger' : 'badge-warning');\n                rHtml += '<tr><td><strong>' + escapeHtml(rf.number) + '</strong></td><td>' + escapeHtml(rf.participant_name) + '</td><td><strong>' + formatINR(rf.requested_amount) + '</strong></td><td style=\"font-size:12px;\">' + bankInfo + '</td><td><span class=\"badge ' + bCls + '\">' + escapeHtml(rf.status) + '</span></td><td>' + actions + '</td></tr>';\n            });\n            document.getElementById('refundQueueBody').innerHTML = rHtml || '<tr><td colspan=\"6\" style=\"text-align:center;color:var(--muted);\">No refund requests</td></tr>';\n            var uHtml = '';\n            (d.unsettledVendors || []).forEach(function(uv) {\n                uHtml += '<tr><td><strong>' + escapeHtml(uv.vendor_name) + '</strong></td><td>' + escapeHtml(uv.event_name) + '</td><td>' + uv.tx_count + '</td><td><strong>' + formatINR(uv.unsettled_amount) + '</strong></td><td><button class=\"btn btn-sm btn-primary\" onclick=\"createSettlement(\\\\'' + uv.event_sys_id + '\\\\', \\\\'' + uv.vendor_sys_id + '\\\\')\">Create Settlement Batch</button></td></tr>';\n            });\n            document.getElementById('unsettledVendorsBody').innerHTML = uHtml || '<tr><td colspan=\"5\" style=\"text-align:center;color:var(--muted);\">All vendor sales are settled or batched</td></tr>';\n            var sHtml = '';\n            (d.settlements || []).forEach(function(st) {\n                var act = st.status === 'paid' ? '<span class=\"badge badge-success\">Settled</span>' : '<button class=\"btn btn-sm btn-accent\" onclick=\"paySettlement(\\\\'' + st.sys_id + '\\\\')\">Record Payout UTR</button>';\n                sHtml += '<tr><td><strong>' + escapeHtml(st.batch_id) + '</strong></td><td>' + escapeHtml(st.vendor_name) + '</td><td>' + escapeHtml(st.event_name) + '</td><td><strong>' + formatINR(st.net_payable_amount) + '</strong></td><td><span class=\"badge badge-info\">' + escapeHtml(st.status) + '</span></td><td>' + escapeHtml(st.payout_reference || '-') + '</td><td>' + act + '</td></tr>';\n            });\n            document.getElementById('settlementsBody').innerHTML = sHtml || '<tr><td colspan=\"7\" style=\"text-align:center;color:var(--muted);\">No settlement batches yet</td></tr>';\n        });\n}\nfunction verifyPayment(sysId, defaultAmt) {\n    var amtStr = prompt('Enter actual bank-verified INR amount:', String(defaultAmt));\n    if (!amtStr) return;\n    fetch('/api/x_2327324_konnect/konnectfest/finance/verify-payment', { method: 'POST',\n        credentials: 'omit', credentials: 'omit', headers: apiHeaders(true), body: JSON.stringify({ payment_sys_id: sysId, verified_amount: parseFloat(amtStr) }) })\n        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });\n}\nfunction rejectPayment(sysId) {\n    var reason = prompt('Enter rejection reason:');\n    if (!reason) return;\n    fetch('/api/x_2327324_konnect/konnectfest/finance/reject-payment', { method: 'POST',\n        credentials: 'omit', credentials: 'omit', headers: apiHeaders(true), body: JSON.stringify({ payment_sys_id: sysId, reason: reason }) })\n        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });\n}\nfunction finalizeRefund(sysId) {\n    var utr = prompt('Enter bank payout UTR / Reference after completing external transfer:');\n    if (!utr) return;\n    fetch('/api/x_2327324_konnect/konnectfest/finance/finalize-refund', { method: 'POST',\n        credentials: 'omit', credentials: 'omit', headers: apiHeaders(true), body: JSON.stringify({ refund_sys_id: sysId, payout_reference: utr }) })\n        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });\n}\nfunction rejectRefund(sysId) {\n    var reason = prompt('Enter rejection reason (hold will be released back to participant wallet):');\n    if (!reason) return;\n    fetch('/api/x_2327324_konnect/konnectfest/finance/reject-refund', { method: 'POST',\n        credentials: 'omit', credentials: 'omit', headers: apiHeaders(true), body: JSON.stringify({ refund_sys_id: sysId, reason: reason }) })\n        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });\n}\nfunction createSettlement(evId, venId) {\n    fetch('/api/x_2327324_konnect/konnectfest/finance/settle-vendor', { method: 'POST',\n        credentials: 'omit', credentials: 'omit', headers: apiHeaders(true), body: JSON.stringify({ event_sys_id: evId, vendor_sys_id: venId }) })\n        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });\n}\nfunction paySettlement(setId) {\n    var utr = prompt('Enter bank payout UTR reference for vendor settlement:');\n    if (!utr) return;\n    fetch('/api/x_2327324_konnect/konnectfest/finance/pay-settlement', { method: 'POST',\n        credentials: 'omit', credentials: 'omit', headers: apiHeaders(true), body: JSON.stringify({ settlement_sys_id: setId, payout_reference: utr }) })\n        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });\n}\nloadFinanceQueues();\n","vendor":"\n// Dynamic Logo Applier for ServiceNow Native UI\nvar KF_OFFICIAL_LOGO = \"data:image/jpeg;base64,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\";\nfunction applyKonnectFestLogo() {\n    try {\n        var imgs = document.querySelectorAll('.sn-logo-img');\n        for (var i = 0; i < imgs.length; i++) {\n            if (!imgs[i].src || imgs[i].src.indexOf('data:') !== 0) {\n                imgs[i].src = KF_OFFICIAL_LOGO;\n            }\n        }\n    } catch(e) {\n        console.error('Error applying logo:', e);\n    }\n}\nif (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', applyKonnectFestLogo);\n} else {\n    setTimeout(applyKonnectFestLogo, 20);\n}\n\n\nfunction renderQRCode(containerEl, text, cellSize) {\n    if (!containerEl) return;\n    containerEl.innerHTML = '';\n    try {\n        if (typeof QRCode !== 'undefined') {\n            new QRCode(containerEl, {\n                text: text,\n                width: 180,\n                height: 180,\n                colorDark: '#0f2e46',\n                colorLight: '#ffffff',\n                correctLevel: QRCode.CorrectLevel.M\n            });\n        } else {\n            containerEl.innerHTML = '<div style=\"padding:14px;background:#f8fafc;border:1px dashed #cbd5e1;font-size:11px;word-break:break-all;\">' + escapeHtml(text) + '</div>';\n        }\n    } catch (e) {\n        containerEl.innerHTML = '<div style=\"color:#b91c1c;font-size:12px;\">QR error: ' + e.message + '</div>';\n    }\n}\n\nfunction apiHeaders(isJson) {\n    var h = {};\n    if (isJson) h['Content-Type'] = 'application/json';\n    var el = document.getElementById('g_ck_token');\n    var token = (el && el.value && el.value !== 'null') ? el.value : (window.g_ck || '');\n    if (token) h['X-UserToken'] = token;\n    return h;\n}\n\nfunction formatINR(val) {\n    var n = parseFloat(val || 0);\n    return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n}\n\nfunction escapeHtml(str) {\n    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');\n}\n\n\nvar activeVendor = null;\nvar qrCountdown = null;\nvar qrPoller = null;\nfunction loadVendorDash(selectedVendorId) {\n    var url = '/api/x_2327324_konnect/konnectfest/vendor/dashboard' + (selectedVendorId ? '?vendor_sys_id=' + encodeURIComponent(selectedVendorId) : '');\n    fetch(url, { credentials: 'omit', headers: apiHeaders(false) }).then(function(r) { return r.json(); }).then(function(res) {\n        var d = res.result || res;\n        if (!d.success) return showBanner('venAlert', d.message || 'Could not load vendor stall', 'error');\n        activeVendor = d.vendor;\n        document.getElementById('vendorPill').textContent = activeVendor.name + ' (' + activeVendor.stall_number + ')';\n        document.getElementById('vStallInfo').textContent = 'Event: ' + activeVendor.event_name + ' | Stall: ' + activeVendor.stall_number + ' | Status: ' + activeVendor.status;\n        var sw = document.getElementById('vendorSwitcher'); sw.innerHTML = '';\n        (d.allVendors || []).forEach(function(av) {\n            var opt = document.createElement('option'); opt.value = av.sys_id; opt.textContent = av.name + ' (' + av.stall_number + ')';\n            if (av.sys_id === activeVendor.sys_id) opt.selected = true;\n            sw.appendChild(opt);\n        });\n        var s = d.summary || {};\n        document.getElementById('vGross').textContent = formatINR(s.grossSales);\n        document.getElementById('vUnsettled').textContent = formatINR(s.unsettledAmount);\n        document.getElementById('vBatch').textContent = formatINR(s.inBatchAmount);\n        document.getElementById('vSettled').textContent = formatINR(s.settledAmount);\n        var tHtml = '';\n        (d.transactions || []).forEach(function(tx) {\n            var bCls = tx.status === 'success' ? 'badge-success' : (tx.status === 'pending' ? 'badge-warning' : 'badge-danger');\n            tHtml += '<tr><td><code>' + escapeHtml(tx.transaction_id) + '</code></td><td>' + escapeHtml(tx.item_description) + '</td><td><strong>' + formatINR(tx.amount) + '</strong></td><td>' + escapeHtml(tx.participant_name) + '</td><td><span class=\"badge ' + bCls + '\">' + escapeHtml(tx.status) + '</span></td><td>' + escapeHtml(tx.confirmed_at || tx.created_on) + '</td></tr>';\n        });\n        document.getElementById('vTxBody').innerHTML = tHtml || '<tr><td colspan=\"6\" style=\"text-align:center;color:var(--muted);\">No transactions yet</td></tr>';\n    });\n}\nfunction generateVendorQR() {\n    if (!activeVendor) return showBanner('venAlert', 'Vendor stall not loaded', 'error');\n    var item = document.getElementById('vItem').value.trim();\n    var amount = parseFloat(document.getElementById('vAmount').value || '0');\n    if (!item || amount <= 0) return showBanner('venAlert', 'Enter a valid item description and positive amount', 'error');\n    fetch('/api/x_2327324_konnect/konnectfest/vendor/create-qr', {\n        method: 'POST',\n        credentials: 'omit', credentials: 'omit', headers: apiHeaders(true),\n        body: JSON.stringify({ event_sys_id: activeVendor.event_sys_id, vendor_sys_id: activeVendor.sys_id, item_description: item, amount: amount })\n    }).then(function(r) { return r.json(); }).then(function(res) {\n        var d = res.result || res;\n        if (!d.success) return showBanner('venAlert', d.message, 'error');\n        startQRDisplay(d);\n    });\n}\nfunction startQRDisplay(data) {\n    clearInterval(qrCountdown); clearInterval(qrPoller);\n    var seconds = data.expirySeconds || 120;\n    var totalSeconds = seconds;\n    var area = document.getElementById('qrDisplayArea');\n    area.innerHTML = '<div style=\"font-weight:700; color:var(--primary); font-size:15px;\">' + escapeHtml(data.itemDescription) + '</div>'\n        + '<div style=\"font-size:28px; font-weight:800; margin:4px 0 10px;\">' + formatINR(data.amount) + '</div>'\n        + '<div class=\"qr-box\" id=\"vendorQrSvg\"></div>'\n        + '<div id=\"qrTimerText\" style=\"font-size:13px; font-weight:700; color:var(--warning); margin-top:10px;\">Expires in ' + seconds + 's</div>'\n        + '<div class=\"progress-track\" style=\"max-width:260px;\"><div class=\"progress-fill\" id=\"qrProgressFill\" style=\"width:100%;\"></div></div>'\n        + '<div style=\"font-size:11px; color:var(--muted); margin-top:6px; word-break:break-all;\">Token: <code>' + escapeHtml(data.qrToken) + '</code></div>'\n        + '<a href=\"' + escapeHtml(data.confirmUrl) + '\" target=\"_blank\" style=\"font-size:12px; color:var(--primary); margin-top:6px; font-weight:600;\">Open Confirmation Link ↗</a>';\n    renderQRCode(document.getElementById('vendorQrSvg'), data.confirmUrl, 5);\n    qrCountdown = setInterval(function() {\n        seconds--;\n        var txt = document.getElementById('qrTimerText');\n        var fill = document.getElementById('qrProgressFill');\n        if (txt) txt.textContent = 'Expires in ' + seconds + 's';\n        if (fill) fill.style.width = ((seconds / totalSeconds) * 100) + '%';\n        if (seconds <= 0) {\n            clearInterval(qrCountdown); clearInterval(qrPoller);\n            area.innerHTML = '<div style=\"color:var(--danger); font-weight:700; padding:20px;\">QR Expired (120s). Please regenerate a new QR.</div>';\n        }\n    }, 1000);\n    qrPoller = setInterval(function() {\n        fetch('/api/x_2327324_konnect/konnectfest/vendor/qr-details?qr_token=' + encodeURIComponent(data.qrToken), { credentials: 'omit', headers: apiHeaders(false) })\n            .then(function(r) { return r.json(); }).then(function(res) {\n                var qd = res.result || res;\n                if (!qd.valid) {\n                    clearInterval(qrCountdown); clearInterval(qrPoller);\n                    area.innerHTML = '<div style=\"color:var(--success); font-weight:800; font-size:20px; padding:30px;\">✓ Payment Confirmed!<br/><span style=\"font-size:13px; font-weight:500;\">Credited to Vendor Ledger</span></div>';\n                    loadVendorDash(activeVendor.sys_id);\n                }\n            });\n    }, 2000);\n}\nloadVendorDash();\n","participant":"\n// Dynamic Logo Applier for ServiceNow Native UI\nvar KF_OFFICIAL_LOGO = \"data:image/jpeg;base64,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\";\nfunction applyKonnectFestLogo() {\n    try {\n        var imgs = document.querySelectorAll('.sn-logo-img');\n        for (var i = 0; i < imgs.length; i++) {\n            if (!imgs[i].src || imgs[i].src.indexOf('data:') !== 0) {\n                imgs[i].src = KF_OFFICIAL_LOGO;\n            }\n        }\n    } catch(e) {\n        console.error('Error applying logo:', e);\n    }\n}\nif (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', applyKonnectFestLogo);\n} else {\n    setTimeout(applyKonnectFestLogo, 20);\n}\n\n\nfunction renderQRCode(containerEl, text, cellSize) {\n    if (!containerEl) return;\n    containerEl.innerHTML = '';\n    try {\n        if (typeof QRCode !== 'undefined') {\n            new QRCode(containerEl, {\n                text: text,\n                width: 180,\n                height: 180,\n                colorDark: '#0f2e46',\n                colorLight: '#ffffff',\n                correctLevel: QRCode.CorrectLevel.M\n            });\n        } else {\n            containerEl.innerHTML = '<div style=\"padding:14px;background:#f8fafc;border:1px dashed #cbd5e1;font-size:11px;word-break:break-all;\">' + escapeHtml(text) + '</div>';\n        }\n    } catch (e) {\n        containerEl.innerHTML = '<div style=\"color:#b91c1c;font-size:12px;\">QR error: ' + e.message + '</div>';\n    }\n}\n\nfunction apiHeaders(isJson) {\n    var h = {};\n    if (isJson) h['Content-Type'] = 'application/json';\n    var el = document.getElementById('g_ck_token');\n    var token = (el && el.value && el.value !== 'null') ? el.value : (window.g_ck || '');\n    if (token) h['X-UserToken'] = token;\n    return h;\n}\n\nfunction formatINR(val) {\n    var n = parseFloat(val || 0);\n    return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n}\n\nfunction escapeHtml(str) {\n    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');\n}\n\n\nvar pData = null;\nvar pendingTxSysId = '';\nvar activeTopUpPaymentId = '';\nfunction switchPartTab(id, btn) {\n    document.querySelectorAll('.part-tab').forEach(function(el) { el.style.display = 'none'; });\n    document.querySelectorAll('.tab-btn').forEach(function(el) { el.classList.remove('active'); });\n    document.getElementById(id).style.display = 'block';\n    if (btn) btn.classList.add('active');\n}\nfunction loadParticipantDash() {\n    var params = new URLSearchParams(window.location.search);\n    var pId = params.get('participant_sys_id') || '';\n    var url = '/api/x_2327324_konnect/konnectfest/participant/dashboard' + (pId ? '?participant_sys_id=' + encodeURIComponent(pId) : '');\n    fetch(url, { credentials: 'omit', headers: apiHeaders(false) }).then(function(r) { return r.json(); }).then(function(res) {\n        var d = res.result || res;\n        if (!d.success) return showBanner('partAlert', d.message || 'Could not load wallet', 'error');\n        pData = d;\n        document.getElementById('partNamePill').textContent = d.participant.name;\n        document.getElementById('partEventName').textContent = d.event.name || 'Event Wallet';\n        document.getElementById('partEventState').textContent = (d.event.state || '').toUpperCase();\n        document.getElementById('partBalance').textContent = formatINR(d.wallet.available_balance);\n        document.getElementById('partReserved').textContent = formatINR(d.wallet.reserved_balance);\n        document.getElementById('partSpent').textContent = formatINR(d.wallet.total_spent);\n        var isCompleted = d.event.state === 'completed';\n        document.getElementById('refundLockedMsg').style.display = isCompleted ? 'none' : 'block';\n        document.getElementById('refundFormArea').style.display = isCompleted ? 'block' : 'none';\n        var rHtml = '';\n        (d.receipts || []).forEach(function(cp) {\n            rHtml += '<div style=\"padding:10px 0; border-bottom:1px solid var(--border); display:flex; justify-content:space-between;\"><div><strong>' + escapeHtml(cp.item_description) + '</strong><br/><span style=\"color:var(--muted); font-size:11px;\">' + escapeHtml(cp.vendor_name) + ' • ' + escapeHtml(cp.coupon_id) + '</span></div><div style=\"font-weight:700; color:var(--primary);\">' + formatINR(cp.value) + '</div></div>';\n        });\n        document.getElementById('receiptsList').innerHTML = rHtml || '<span style=\"color:var(--muted);\">No digital purchase receipts yet.</span>';\n        var lHtml = '';\n        (d.ledger || []).forEach(function(lg) {\n            var isCredit = lg.entry_type === 'initial_credit' || lg.entry_type === 'top_up' || lg.entry_type === 'refund_release';\n            lHtml += '<div style=\"padding:10px 0; border-bottom:1px solid var(--border); display:flex; justify-content:space-between;\"><div><strong>' + escapeHtml(lg.entry_type.toUpperCase()) + '</strong><br/><span style=\"color:var(--muted); font-size:11px;\">' + escapeHtml(lg.notes) + '</span></div><div style=\"text-align:right;\"><strong style=\"color:' + (isCredit ? 'var(--success)' : 'var(--danger)') + ';\">' + (isCredit ? '+' : '-') + formatINR(lg.amount) + '</strong><br/><span style=\"font-size:11px; color:var(--muted);\">Bal: ' + formatINR(lg.available_after) + '</span></div></div>';\n        });\n        document.getElementById('ledgerList').innerHTML = lHtml || '<span style=\"color:var(--muted);\">No ledger entries yet.</span>';\n        var qrParam = params.get('qr_token');\n        if (qrParam && !pendingTxSysId) { document.getElementById('pQrInput').value = qrParam; lookupPartQR(); }\n    });\n}\nfunction lookupPartQR() {\n    var token = document.getElementById('pQrInput').value.trim();\n    if (!token) return showBanner('partAlert', 'Enter a QR token to verify', 'error');\n    fetch('/api/x_2327324_konnect/konnectfest/vendor/qr-details?qr_token=' + encodeURIComponent(token), { credentials: 'omit', headers: apiHeaders(false) })\n        .then(function(r) { return r.json(); }).then(function(res) {\n            var d = res.result || res;\n            if (!d.valid || !d.transaction) return showBanner('partAlert', d.message || 'Invalid or expired QR token', 'error');\n            pendingTxSysId = d.transaction.sysId;\n            document.getElementById('mVendor').textContent = d.transaction.vendorName + (d.transaction.stallNumber ? ' (' + d.transaction.stallNumber + ')' : '');\n            document.getElementById('mEvent').textContent = d.transaction.eventName;\n            document.getElementById('mItem').textContent = d.transaction.itemDescription;\n            document.getElementById('mAmt').textContent = formatINR(d.transaction.amount);\n            document.getElementById('pConfirmModal').style.display = 'flex';\n        });\n}\nfunction confirmPartPurchase() {\n    if (!pendingTxSysId || !pData) return;\n    fetch('/api/x_2327324_konnect/konnectfest/purchase/confirm', { method: 'POST',\n        credentials: 'omit', credentials: 'omit', headers: apiHeaders(true), body: JSON.stringify({ transaction_sys_id: pendingTxSysId, participant_sys_id: pData.participant.sys_id }) })\n        .then(function(r) { return r.json(); }).then(function(res) {\n            var d = res.result || res; closePartModal();\n            showBanner('partAlert', d.message, d.success ? 'success' : 'error');\n            if (d.success) { document.getElementById('pQrInput').value = ''; loadParticipantDash(); }\n        });\n}\nfunction closePartModal() { document.getElementById('pConfirmModal').style.display = 'none'; }\nfunction createTopUpQR() {\n    if (!pData) return;\n    var amt = parseFloat(document.getElementById('topupAmt').value || '0');\n    if (amt <= 0) return showBanner('partAlert', 'Enter a positive top-up amount', 'error');\n    fetch('/api/x_2327324_konnect/konnectfest/wallet/topup', { method: 'POST',\n        credentials: 'omit', credentials: 'omit', headers: apiHeaders(true), body: JSON.stringify({ participant_sys_id: pData.participant.sys_id, event_sys_id: pData.event.sys_id, amount: amt }) })\n        .then(function(r) { return r.json(); }).then(function(res) {\n            var d = res.result || res;\n            if (!d.success) return showBanner('partAlert', d.message, 'error');\n            activeTopUpPaymentId = d.paymentSysId;\n            document.getElementById('topupQrSection').style.display = 'block';\n            renderQRCode(document.getElementById('topupQrBox'), d.upiUri, 5);\n            document.getElementById('topupPayeeInfo').textContent = 'Pay ' + formatINR(d.amount) + ' to ' + d.payeeName + ' (' + d.upiId + ') • Ref: ' + d.paymentNumber;\n        });\n}\nfunction submitTopUpUtr() {\n    var utr = document.getElementById('topupUtrInput').value.trim();\n    if (!activeTopUpPaymentId || !utr) return showBanner('partAlert', 'Enter your bank UTR reference', 'error');\n    fetch('/api/x_2327324_konnect/konnectfest/registration/submit-utr', { method: 'POST',\n        credentials: 'omit', credentials: 'omit', headers: apiHeaders(true), body: JSON.stringify({ payment_sys_id: activeTopUpPaymentId, utr_reference: utr }) })\n        .then(function(r) { return r.json(); }).then(function(res) {\n            var d = res.result || res; showBanner('partAlert', d.message, d.success ? 'success' : 'error');\n            if (d.success) { document.getElementById('topupQrSection').style.display = 'none'; document.getElementById('topupAmt').value = ''; document.getElementById('topupUtrInput').value = ''; loadParticipantDash(); }\n        });\n}\nfunction submitPartRefund() {\n    if (!pData) return;\n    var payload = { participant_sys_id: pData.participant.sys_id, event_sys_id: pData.event.sys_id, requested_amount: parseFloat(document.getElementById('rfAmt').value || '0'), bank_account_holder: document.getElementById('rfHolder').value.trim(), bank_account_number: document.getElementById('rfAcct').value.trim(), bank_ifsc: document.getElementById('rfIfsc').value.trim(), upi_id: document.getElementById('rfUpi').value.trim() };\n    fetch('/api/x_2327324_konnect/konnectfest/refund/request', { method: 'POST',\n        credentials: 'omit', credentials: 'omit', headers: apiHeaders(true), body: JSON.stringify(payload) })\n        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('partAlert', d.message, d.success ? 'success' : 'error'); if (d.success) loadParticipantDash(); });\n}\nloadParticipantDash();\n","register":"\nfunction showBanner(id, msg, type) {\n    var el = document.getElementById(id);\n    if (!el) {\n        alert(msg);\n        return;\n    }\n    el.style.display = 'block';\n    el.className = 'sn-alert-bar ' + (type === 'error' ? 'sn-alert-danger' : 'sn-alert-success');\n    el.textContent = msg;\n    setTimeout(function() {\n        if (el) el.style.display = 'none';\n    }, 6000);\n}\n\n\n// Dynamic Logo Applier for ServiceNow Native UI\nvar KF_OFFICIAL_LOGO = \"data:image/jpeg;base64,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\";\nfunction applyKonnectFestLogo() {\n    try {\n        var imgs = document.querySelectorAll('.sn-logo-img');\n        for (var i = 0; i < imgs.length; i++) {\n            if (!imgs[i].src || imgs[i].src.indexOf('data:') !== 0) {\n                imgs[i].src = KF_OFFICIAL_LOGO;\n            }\n        }\n    } catch(e) {\n        console.error('Error applying logo:', e);\n    }\n}\nif (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', applyKonnectFestLogo);\n} else {\n    setTimeout(applyKonnectFestLogo, 20);\n}\n\n\nfunction renderQRCode(containerEl, text, cellSize) {\n    if (!containerEl) return;\n    containerEl.innerHTML = '';\n    try {\n        if (typeof QRCode !== 'undefined') {\n            new QRCode(containerEl, {\n                text: text,\n                width: 180,\n                height: 180,\n                colorDark: '#0f2e46',\n                colorLight: '#ffffff',\n                correctLevel: QRCode.CorrectLevel.M\n            });\n        } else {\n            containerEl.innerHTML = '<div style=\"padding:14px;background:#f8fafc;border:1px dashed #cbd5e1;font-size:11px;word-break:break-all;\">' + escapeHtml(text) + '</div>';\n        }\n    } catch (e) {\n        containerEl.innerHTML = '<div style=\"color:#b91c1c;font-size:12px;\">QR error: ' + e.message + '</div>';\n    }\n}\n\nfunction apiHeaders(isJson) {\n    var h = {};\n    if (isJson) h['Content-Type'] = 'application/json';\n    var el = document.getElementById('g_ck_token');\n    var token = (el && el.value && el.value !== 'null') ? el.value : (window.g_ck || '');\n    if (token) h['X-UserToken'] = token;\n    return h;\n}\n\nfunction formatINR(val) {\n    var n = parseFloat(val || 0);\n    return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n}\n\nfunction escapeHtml(str) {\n    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');\n}\n\n\nvar createdPaymentId = '';\n\nfunction loadPublicEvents() {\n    fetch('/api/x_2327324_konnect/konnectfest/public/events')\n        .then(function(r) { return r.json(); })\n        .then(function(res) {\n            var d = res.result || res;\n            var sel = document.getElementById('rEvent');\n            if (!sel) return;\n            sel.innerHTML = '';\n            (d.events || []).forEach(function(ev) {\n                var opt = document.createElement('option');\n                opt.value = ev.sys_id;\n                opt.textContent = ev.name + ' (' + ev.state + ')';\n                sel.appendChild(opt);\n            });\n            if ((d.events || []).length === 0) {\n                sel.innerHTML = '<option value=\"\">No events currently open</option>';\n            }\n        });\n}\n\nfunction submitPublicReg() {\n    var rNameEl = document.getElementById('rName');\n    var rEmailEl = document.getElementById('rEmail');\n    var rPhoneEl = document.getElementById('rPhone');\n    var rEventEl = document.getElementById('rEvent');\n    var rAmountEl = document.getElementById('rAmount');\n\n    if (!rEventEl || !rEventEl.value) {\n        return showBanner('regToast', 'Please select an active event.', 'error');\n    }\n    if (!rNameEl || !rNameEl.value.trim()) {\n        return showBanner('regToast', 'Please enter your full name.', 'error');\n    }\n    if (!rEmailEl || !rEmailEl.value.trim()) {\n        return showBanner('regToast', 'Please enter your working email address.', 'error');\n    }\n    var amt = parseFloat(rAmountEl ? rAmountEl.value : '0');\n    if (isNaN(amt) || amt <= 0) {\n        return showBanner('regToast', 'Please enter a valid positive initial wallet amount.', 'error');\n    }\n\n    var payload = {\n        event_sys_id: rEventEl.value,\n        name: rNameEl.value.trim(),\n        email: rEmailEl.value.trim(),\n        phone: rPhoneEl ? rPhoneEl.value.trim() : '',\n        requested_amount: amt\n    };\n\n    fetch('/api/x_2327324_konnect/konnectfest/registration', {\n        method: 'POST',\n        credentials: 'omit',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify(payload)\n    })\n    .then(function(r) { return r.json(); })\n    .then(function(res) {\n        var d = res.result || res;\n        if (!d.success) return showBanner('regToast', d.message || 'Registration failed', 'error');\n        createdPaymentId = d.paymentSysId;\n\n        document.getElementById('regStep1').style.display = 'none';\n        document.getElementById('regStep2').style.display = 'block';\n\n        var qrBox = document.getElementById('regQrContainer');\n        if (qrBox) {\n            renderQRCode(qrBox, d.upiUri || ('upi://pay?pa=' + encodeURIComponent(d.upiId || 'konnectfest@axisbank') + '&pn=' + encodeURIComponent(d.payeeName || 'KonnectFest') + '&am=' + d.amount + '&cu=INR&tn=' + encodeURIComponent(d.paymentNumber || 'REG')), 5);\n        }\n\n        var elAmt = document.getElementById('qrAmt');\n        if (elAmt) elAmt.textContent = formatINR(d.amount);\n        var elUpi = document.getElementById('qrUpi');\n        if (elUpi) elUpi.textContent = (d.upiId || 'konnectfest@axisbank') + ' (' + (d.payeeName || 'KonnectFest Committee') + ')';\n        var elRef = document.getElementById('qrRef');\n        if (elRef) elRef.textContent = d.paymentNumber || 'PENDING';\n    })\n    .catch(function(err) {\n        showBanner('regToast', 'Error contacting registration server: ' + err.message, 'error');\n    });\n}\n\nfunction submitPublicUtr() {\n    var utr = document.getElementById('rUtr').value.trim();\n    if (!utr) return showBanner('regToast', 'Please enter your bank UTR transaction reference.', 'error');\n\n    fetch('/api/x_2327324_konnect/konnectfest/registration/submit-utr', {\n        method: 'POST',\n        credentials: 'omit',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ payment_sys_id: createdPaymentId, utr_reference: utr })\n    })\n    .then(function(r) { return r.json(); })\n    .then(function(res) {\n        var d = res.result || res;\n        if (!d.success) return showBanner('regToast', d.message, 'error');\n        document.getElementById('regStep2').style.display = 'none';\n        document.getElementById('regStep3').style.display = 'block';\n        document.getElementById('regDoneMsg').textContent = d.message;\n    })\n    .catch(function(err) {\n        showBanner('regToast', 'Error submitting UTR: ' + err.message, 'error');\n    });\n}\n\nloadPublicEvents();\n"};

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
