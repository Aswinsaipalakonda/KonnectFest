import { gs, type GlideRecord } from '@servicenow/glide'
import { KonnectFestWalletService } from './walletService'
import { KonnectFestPaymentService } from './paymentService'

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
        const paymentType = current.getValue('type')

        gs.info(`[KonnectFest] Payment ${current.getValue('number')} verified. Initiating automated credit processing...`)

        if (paymentType === 'initial_registration') {
            KonnectFestPaymentService.provisionParticipantAccount(current.getValue('participant'))
            KonnectFestWalletService.initializeWalletFromPayment(paymentSysId)
        } else {
            KonnectFestWalletService.creditTopUpPayment(paymentSysId)
        }
    }
}
