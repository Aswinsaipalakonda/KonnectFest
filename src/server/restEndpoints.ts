import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide'
import { KonnectFestWalletService } from './walletService'
import { KonnectFestPaymentService } from './paymentService'
import { KonnectFestQRService } from './qrService'
import { KonnectFestSettlementService } from './settlementService'

/**
 * 1. Participant Registration Endpoint Handler
 */
export function handleParticipantRegistration(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const name = body.name
        const email = body.email
        const phone = body.phone || ''
        const college = body.college_organization || ''
        const participantIdCode = body.participant_id_code || ''
        const eventSysId = body.event_sys_id
        const requestedAmount = parseFloat(body.requested_amount || '0')
        const paymentReference = body.payment_reference || ''

        if (!name || !email || !eventSysId) {
            response.setStatus(400)
            response.setBody({
                success: false,
                message: 'Name, working email, and event ID are mandatory.',
            })
            return
        }

        // Duplicate email check for same event
        const dupCheck = new GlideRecord('x_495021_konnect_participant')
        dupCheck.addQuery('email', email)
        dupCheck.addQuery('event', eventSysId)
        dupCheck.query()
        if (dupCheck.next()) {
            response.setStatus(409)
            response.setBody({
                success: false,
                message: 'A participant registration already exists with this email for the selected event.',
                participantSysId: dupCheck.getUniqueValue(),
            })
            return
        }

        // Create Participant record
        const partGr = new GlideRecord('x_495021_konnect_participant')
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
        const regGr = new GlideRecord('x_495021_konnect_registration')
        regGr.initialize()
        regGr.setValue('participant', partSysId)
        regGr.setValue('event', eventSysId)
        regGr.setValue('requested_initial_amount', requestedAmount)
        regGr.setValue('status', 'pending_verification')
        regGr.setValue('payment_reference', paymentReference)
        const regSysId = regGr.insert()

        // If payment reference provided, create initial payment record
        let paymentSysId = ''
        if (requestedAmount > 0) {
            const payGr = new GlideRecord('x_495021_konnect_payment')
            payGr.initialize()
            payGr.setValue('type', 'initial_registration')
            payGr.setValue('participant', partSysId)
            payGr.setValue('event', eventSysId)
            payGr.setValue('requested_amount', requestedAmount)
            payGr.setValue('utr_reference', paymentReference)
            payGr.setValue('status', paymentReference ? 'under_review' : 'submitted')
            payGr.setValue('wallet_credit_status', 'pending')
            paymentSysId = payGr.insert()
        }

        response.setStatus(201)
        response.setBody({
            success: true,
            message: 'Registration submitted successfully. Pending Finance verification.',
            participantSysId: partSysId,
            registrationSysId: regSysId,
            paymentSysId,
        })
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Internal server error' })
    }
}

/**
 * 2. Top-Up Request Endpoint Handler
 */
export function handleTopUpRequest(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const participantSysId = body.participant_sys_id
        const eventSysId = body.event_sys_id
        const amount = parseFloat(body.amount || '0')
        const utrReference = body.utr_reference || ''

        if (!participantSysId || !eventSysId || amount <= 0) {
            response.setStatus(400)
            response.setBody({ success: false, message: 'Valid participant, event, and positive amount are required.' })
            return
        }

        const payGr = new GlideRecord('x_495021_konnect_payment')
        payGr.initialize()
        payGr.setValue('type', 'event_topup')
        payGr.setValue('participant', participantSysId)
        payGr.setValue('event', eventSysId)
        payGr.setValue('requested_amount', amount)
        payGr.setValue('utr_reference', utrReference)
        payGr.setValue('status', utrReference ? 'under_review' : 'submitted')
        payGr.setValue('wallet_credit_status', 'pending')
        const paySysId = payGr.insert()

        response.setStatus(201)
        response.setBody({
            success: true,
            message: 'Top-up request registered. Please transfer via UPI and submit UTR for Finance approval.',
            paymentSysId: paySysId,
            amount,
        })
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error creating top-up request' })
    }
}

/**
 * 3. Vendor Create Purchase QR Endpoint Handler
 */
export function handleVendorCreateQR(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const eventSysId = body.event_sys_id
        const vendorSysId = body.vendor_sys_id
        const itemDescription = body.item_description || 'Festival Purchase'
        const amount = parseFloat(body.amount || '0')

        const result = KonnectFestQRService.generatePurchaseQR(
            eventSysId,
            vendorSysId,
            itemDescription,
            amount,
            60
        )

        response.setStatus(result.success ? 200 : 400)
        response.setBody(result)
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Error generating QR token' })
    }
}

/**
 * 4. Scan QR Details Endpoint Handler
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
 * 5. Participant Confirm Purchase Endpoint Handler
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
 * 6. Financer Verify Payment Endpoint Handler
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
 * 7. Participant Request Post-Event Refund Endpoint Handler
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
 * 8. Financer Finalize Refund Payout Endpoint Handler
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
 * 9. Financer Settle Vendor Endpoint Handler
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
