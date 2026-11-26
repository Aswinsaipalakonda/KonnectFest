import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide'
import { KonnectFestWalletService } from './walletService'
import { KonnectFestPaymentService } from './paymentService'
import { KonnectFestQRService } from './qrService'
import { KonnectFestSettlementService } from './settlementService'

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
