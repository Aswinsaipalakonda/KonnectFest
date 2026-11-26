import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide'

/**
 * Enforces financial immutability: Ledger entries can NEVER be modified or deleted.
 */
export function preventLedgerModification(current: GlideRecord) {
    gs.addErrorMessage('Financial Ledger entries are strictly immutable. Updates and deletions are prohibited.')
    current.setAbortAction(true)
}

/**
 * Validates wallet balance bounds: available and reserved balances must never be negative.
 */
export function guardWalletBalance(current: GlideRecord) {
    const available = parseFloat(current.getValue('available_balance') || '0')
    const reserved = parseFloat(current.getValue('reserved_balance') || '0')

    if (available < 0) {
        gs.addErrorMessage(`Invalid wallet state: Available balance cannot be negative (attempted: ₹${available}). Transaction aborted.`)
        current.setAbortAction(true)
        return
    }

    if (reserved < 0) {
        gs.addErrorMessage(`Invalid wallet state: Reserved balance cannot be negative (attempted: ₹${reserved}). Transaction aborted.`)
        current.setAbortAction(true)
        return
    }
}

/**
 * Triggers automatic wallet credit and participant provisioning when a payment is verified.
 */
export function onPaymentStatusVerified(current: GlideRecord, previous: GlideRecord) {
    const currentStatus = current.getValue('status')
    const previousStatus = previous ? previous.getValue('status') : ''
    const creditStatus = current.getValue('wallet_credit_status')

    if (currentStatus === 'verified' && previousStatus !== 'verified' && creditStatus === 'pending') {
        const paymentSysId = current.getUniqueValue()
        const participantSysId = current.getValue('participant')
        const eventSysId = current.getValue('event')
        const amount = parseFloat(current.getValue('verified_amount') || current.getValue('requested_amount') || '0')

        if (amount <= 0) return

        gs.info(`[KonnectFest] Payment ${current.getValue('number')} verified. Executing auto-credit...`)

        // 1. Activate participant if initial registration
        const partGr = new GlideRecord('x_2327324_konnect_participant')
        if (partGr.get(participantSysId)) {
            partGr.setValue('status', 'active')
            partGr.setValue('verification_date', new GlideDateTime().getValue())
            partGr.update()
        }

        // 2. Find or create wallet
        const walletGr = new GlideRecord('x_2327324_konnect_wallet')
        walletGr.addQuery('participant', participantSysId)
        walletGr.addQuery('event', eventSysId)
        walletGr.query()

        let walletSysId = ''
        let currentAvailable = 0
        let currentReserved = 0

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
        const payType = current.getValue('type')
        const entryType = (payType === 'initial_registration') ? 'initial_credit' : 'top_up'
        const idempotencyKey = `AUTO_${paymentSysId}_${participantSysId}`

        // 3. Create Ledger entry
        const ledgerGr = new GlideRecord('x_2327324_konnect_wallet_ledger')
        ledgerGr.initialize()
        ledgerGr.setValue('wallet', walletSysId)
        ledgerGr.setValue('participant', participantSysId)
        ledgerGr.setValue('event', eventSysId)
        ledgerGr.setValue('entry_type', entryType)
        ledgerGr.setValue('amount', amount)
        ledgerGr.setValue('available_balance_before', currentAvailable)
        ledgerGr.setValue('available_balance_after', newAvailable)
        ledgerGr.setValue('reserved_balance_before', currentReserved)
        ledgerGr.setValue('reserved_balance_after', currentReserved)
        ledgerGr.setValue('source_payment', paymentSysId)
        ledgerGr.setValue('idempotency_key', idempotencyKey)
        ledgerGr.setValue('status', 'posted')
        ledgerGr.setValue('notes', `Automatic verified credit from payment ${current.getValue('number')}`)
        ledgerGr.insert()

        // 4. Update Wallet Balance
        walletGr.setValue('available_balance', newAvailable)
        walletGr.setValue('last_transaction_date', new GlideDateTime().getValue())
        walletGr.update()

        // 5. Update payment credit status
        current.setValue('wallet_credit_status', 'credited')
        current.setValue('wallet_credit_timestamp', new GlideDateTime().getValue())
        current.update()

        gs.info(`[KonnectFest] Auto-credited ₹${amount} to Wallet ${walletSysId}. New available: ₹${newAvailable}`)
    }
}
