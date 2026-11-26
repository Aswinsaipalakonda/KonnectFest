import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide'
import { KonnectFestWalletService } from './walletService'

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
        const paymentGr = new GlideRecord('x_495021_konnect_payment')
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
        const checkUtr = new GlideRecord('x_495021_konnect_payment')
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
        const paymentGr = new GlideRecord('x_495021_konnect_payment')
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
        const partGr = new GlideRecord('x_495021_konnect_participant')
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

        // Assign x_495021_konnect.participant role
        const roleGr = new GlideRecord('sys_user_role')
        roleGr.addQuery('name', 'x_495021_konnect.participant')
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
