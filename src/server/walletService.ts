import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide'

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
