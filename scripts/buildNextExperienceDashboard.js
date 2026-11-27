const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== 1. UPDATING BACKEND restEndpoints.ts ===');

let restCode = fs.readFileSync('src/server/restEndpoints.ts', 'utf8');

// A. Update handleParticipantRegistration to allow graceful resumption for pending registrations
const oldPartReg = `        // Duplicate email check for same event
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
        }`;

const newPartReg = `        // Duplicate email check for same event
        const dupCheck = new GlideRecord('x_2327324_konnect_participant')
        dupCheck.addQuery('email', email)
        dupCheck.addQuery('event', eventSysId)
        dupCheck.query()
        if (dupCheck.next()) {
            const currentStatus = dupCheck.getValue('status') || 'pending_verification'
            if (currentStatus === 'active' || currentStatus === 'verified') {
                response.setStatus(409)
                response.setBody({
                    success: false,
                    is_active: true,
                    message: 'A verified registration already exists for this email! Please log in to your participant wallet portal.',
                    participantSysId: dupCheck.getUniqueValue(),
                })
                return
            }

            // If pending verification, seamlessly update and allow resuming payment & UTR submission
            const partSysId = dupCheck.getUniqueValue()
            dupCheck.setValue('name', name)
            if (phone) dupCheck.setValue('phone', phone)
            if (college) dupCheck.setValue('college_organization', college)
            if (participantIdCode) dupCheck.setValue('participant_id_code', participantIdCode)
            dupCheck.update()

            // Update registration
            const regGr = new GlideRecord('x_2327324_konnect_registration')
            regGr.addQuery('participant', partSysId)
            regGr.addQuery('event', eventSysId)
            regGr.query()
            let regSysId = ''
            let regNumber = ''
            if (regGr.next()) {
                regSysId = regGr.getUniqueValue()
                regGr.setValue('requested_initial_amount', requestedAmount)
                regGr.setValue('status', 'pending_verification')
                if (paymentReference) regGr.setValue('payment_reference', paymentReference)
                regGr.update()
                regNumber = regGr.getValue('number') || regSysId
            } else {
                regGr.initialize()
                regGr.setValue('participant', partSysId)
                regGr.setValue('event', eventSysId)
                regGr.setValue('requested_initial_amount', requestedAmount)
                regGr.setValue('status', 'pending_verification')
                regGr.setValue('payment_reference', paymentReference)
                regSysId = regGr.insert()
                regGr.get(regSysId)
                regNumber = regGr.getValue('number') || regSysId
            }

            // Update or create initial payment record
            const payGr = new GlideRecord('x_2327324_konnect_payment')
            payGr.addQuery('participant', partSysId)
            payGr.addQuery('event', eventSysId)
            payGr.addQuery('type', 'initial_registration')
            payGr.query()
            let paymentSysId = ''
            let paymentNumber = ''
            if (payGr.next()) {
                paymentSysId = payGr.getUniqueValue()
                payGr.setValue('requested_amount', requestedAmount)
                if (paymentReference) {
                    payGr.setValue('utr_reference', paymentReference)
                    payGr.setValue('status', 'under_review')
                } else {
                    payGr.setValue('status', 'submitted')
                }
                payGr.update()
                paymentNumber = payGr.getValue('number') || paymentSysId
            } else {
                payGr.initialize()
                payGr.setValue('type', 'initial_registration')
                payGr.setValue('participant', partSysId)
                payGr.setValue('event', eventSysId)
                payGr.setValue('requested_amount', requestedAmount)
                payGr.setValue('utr_reference', paymentReference)
                payGr.setValue('status', paymentReference ? 'under_review' : 'submitted')
                payGr.setValue('wallet_credit_status', 'pending')
                paymentSysId = payGr.insert()
                payGr.get(paymentSysId)
                paymentNumber = payGr.getValue('number') || paymentSysId
            }

            const upiId = evGr.getValue('upi_id') || '9849600480@ybl'
            const payeeName = evGr.getValue('upi_payee_name') || 'KonnectFest Event'
            const upiUri = buildUpiUri(upiId, payeeName, requestedAmount, paymentNumber)

            response.setStatus(200)
            response.setBody({
                success: true,
                resumed: true,
                message: 'Pending registration found! Proceed to complete UPI payment and submit your 12-digit UTR reference.',
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
            return
        }`;

if (restCode.includes(oldPartReg)) {
    restCode = restCode.replace(oldPartReg, newPartReg);
    console.log('  -> Updated handleParticipantRegistration for seamless registration resumption!');
} else {
    console.log('  -> Note: handleParticipantRegistration pattern match skipped or already modified.');
}

// B. Update handleOrganizerEventAction to add purge_all_test_data and safe event creation
const oldEventActionStart = `        if (action === 'update_event' || action === 'update_upi') {`;

const newEventActionStart = `        if (action === 'purge_all_test_data') {
            const tablesToPurge = [
                'x_2327324_konnect_vendor_stall',
                'x_2327324_konnect_vendor',
                'x_2327324_konnect_wallet_ledger',
                'x_2327324_konnect_wallet',
                'x_2327324_konnect_purchase_tx',
                'x_2327324_konnect_settlement',
                'x_2327324_konnect_vendor_ledger',
                'x_2327324_konnect_refund_request',
                'x_2327324_konnect_coupon',
                'x_2327324_konnect_payment',
                'x_2327324_konnect_registration',
                'x_2327324_konnect_participant',
                'x_2327324_konnect_audit_log'
            ]
            let deletedCount = 0
            for (const tbl of tablesToPurge) {
                const pGr = new GlideRecord(tbl)
                pGr.query()
                while (pGr.next()) {
                    pGr.deleteRecord()
                    deletedCount++
                }
            }
            // Ensure primary event exists
            const evCheck = new GlideRecord('x_2327324_konnect_event')
            evCheck.query()
            if (!evCheck.hasNext()) {
                evCheck.initialize()
                evCheck.setValue('name', 'KonnectFest 2026')
                evCheck.setValue('state', 'registration_open')
                evCheck.setValue('upi_id', '9849600480@ybl')
                evCheck.setValue('upi_payee_name', 'KonnectFest Committee')
                evCheck.setValue('description', 'Annual festival commerce and digital wallet platform')
                evCheck.insert()
            }
            logAudit('', 'PURGE_TEST_DATA', 'ALL_TABLES', 'populated', 'empty', \`Purged \${deletedCount} demo records\`)
            response.setStatus(200)
            response.setBody({
                success: true,
                message: \`Successfully removed \${deletedCount} demo records across stalls, participants, wallets, and transactions! Application is now in a clean state.\`,
                deletedCount
            })
            return
        }

        if (action === 'update_event' || action === 'update_upi') {`;

if (restCode.includes(oldEventActionStart)) {
    restCode = restCode.replace(oldEventActionStart, newEventActionStart);
    console.log('  -> Added purge_all_test_data action to handleOrganizerEventAction!');
}

// C. Update handleOrganizerOverview to return recentTransactions
const overviewReturnPattern = `            auditLogs,
                registrations,
        })`;

const overviewReturnReplacement = `            auditLogs,
            registrations,
            recentTransactions,
        })`;

const recentTxQueryBlock = `        const recentTransactions: any[] = []
        const txListGr = new GlideRecord('x_2327324_konnect_purchase_tx')
        txListGr.orderByDesc('sys_created_on')
        txListGr.setLimit(50)
        txListGr.query()
        while (txListGr.next()) {
            recentTransactions.push({
                sys_id: txListGr.getUniqueValue(),
                transaction_id: txListGr.getValue('transaction_id') || ('KF-TXN-' + txListGr.getUniqueValue().slice(0, 6)),
                time: txListGr.getValue('sys_created_on') || '',
                participant: txListGr.getDisplayValue('participant') || 'Participant',
                vendor: txListGr.getDisplayValue('vendor') || 'Vendor Stall',
                amount: parseFloat(txListGr.getValue('amount') || '0'),
                status: txListGr.getValue('status') || 'success',
            })
        }
`;

if (restCode.includes(overviewReturnPattern) && !restCode.includes('const recentTransactions: any[] = []')) {
    restCode = restCode.replace('const auditLogs: any[] = []', recentTxQueryBlock + '\n        const auditLogs: any[] = []');
    restCode = restCode.replace(overviewReturnPattern, overviewReturnReplacement);
    console.log('  -> Updated handleOrganizerOverview with recentTransactions!');
}

fs.writeFileSync('src/server/restEndpoints.ts', restCode, 'utf8');
console.log('Backend restEndpoints.ts saved.');
