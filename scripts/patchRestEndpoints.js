const fs = require('fs');

let s = fs.readFileSync('src/server/restEndpoints.ts', 'utf8');

// 1. UPDATE handleParticipantRegistration
const target = 'if (dupCheck.next()) {';
const idx = s.indexOf(target);
console.log('Target found at index:', idx);

const nextSection = s.indexOf('const partGr = new GlideRecord', idx);

const newBlock = `if (dupCheck.next()) {
            const currentStatus = dupCheck.getValue('status') || 'pending_verification';
            if (currentStatus === 'active' || currentStatus === 'verified') {
                response.setStatus(409);
                response.setBody({
                    success: false,
                    is_active: true,
                    message: 'Your registration is already verified and active! Please log in to your participant wallet portal.',
                    participantSysId: dupCheck.getUniqueValue(),
                });
                return;
            }

            // If pending verification, seamlessly update and allow resuming payment & UTR submission
            const partSysId = dupCheck.getUniqueValue();
            dupCheck.setValue('name', name);
            if (phone) dupCheck.setValue('phone', phone);
            if (college) dupCheck.setValue('college_organization', college);
            if (participantIdCode) dupCheck.setValue('participant_id_code', participantIdCode);
            dupCheck.update();

            // Update registration
            const regGr = new GlideRecord('x_2327324_konnect_registration');
            regGr.addQuery('participant', partSysId);
            regGr.addQuery('event', eventSysId);
            regGr.query();
            let regSysId = '';
            let regNumber = '';
            if (regGr.next()) {
                regSysId = regGr.getUniqueValue();
                regGr.setValue('requested_initial_amount', requestedAmount);
                regGr.setValue('status', 'pending_verification');
                if (paymentReference) regGr.setValue('payment_reference', paymentReference);
                regGr.update();
                regNumber = regGr.getValue('number') || regSysId;
            } else {
                regGr.initialize();
                regGr.setValue('participant', partSysId);
                regGr.setValue('event', eventSysId);
                regGr.setValue('requested_initial_amount', requestedAmount);
                regGr.setValue('status', 'pending_verification');
                regGr.setValue('payment_reference', paymentReference);
                regSysId = regGr.insert();
                regGr.get(regSysId);
                regNumber = regGr.getValue('number') || regSysId;
            }

            // Update or create initial payment record
            const payGr = new GlideRecord('x_2327324_konnect_payment');
            payGr.addQuery('participant', partSysId);
            payGr.addQuery('event', eventSysId);
            payGr.addQuery('type', 'initial_registration');
            payGr.query();
            let paymentSysId = '';
            let paymentNumber = '';
            if (payGr.next()) {
                paymentSysId = payGr.getUniqueValue();
                payGr.setValue('requested_amount', requestedAmount);
                if (paymentReference) {
                    payGr.setValue('utr_reference', paymentReference);
                    payGr.setValue('status', 'under_review');
                } else {
                    payGr.setValue('status', 'submitted');
                }
                payGr.update();
                paymentNumber = payGr.getValue('number') || paymentSysId;
            } else {
                payGr.initialize();
                payGr.setValue('type', 'initial_registration');
                payGr.setValue('participant', partSysId);
                payGr.setValue('event', eventSysId);
                payGr.setValue('requested_amount', requestedAmount);
                payGr.setValue('utr_reference', paymentReference);
                payGr.setValue('status', paymentReference ? 'under_review' : 'submitted');
                payGr.setValue('wallet_credit_status', 'pending');
                paymentSysId = payGr.insert();
                payGr.get(paymentSysId);
                paymentNumber = payGr.getValue('number') || paymentSysId;
            }

            const upiId = evGr.getValue('upi_id') || '9849600480@ybl';
            const payeeName = evGr.getValue('upi_payee_name') || 'KonnectFest Event';
            const upiUri = buildUpiUri(upiId, payeeName, requestedAmount, paymentNumber);

            response.setStatus(200);
            response.setBody({
                success: true,
                resumed: true,
                message: 'Pending registration found! Proceed to complete UPI payment and submit your 12-digit UTR reference.',
                participantSysId: partSysId,
                registrationSysId: regSysId,
                registrationNumber: regNumber,
                paymentSysId: paymentSysId,
                paymentNumber: paymentNumber,
                upiId: upiId,
                payeeName: payeeName,
                amount: requestedAmount,
                upiUri: upiUri,
            });
            return;
        }

        `;

s = s.slice(0, idx) + newBlock + s.slice(nextSection);

// 2. INJECT CLEAN ORGANIZER CLIENT SCRIPT
const orgCleanScript = fs.readFileSync('scripts/organizer_clean.js', 'utf8');
const marker = 'const CLIENT_SCRIPTS: Record<string, string> = ';
const cIdx = s.indexOf(marker);
if (cIdx !== -1) {
    const semi = s.indexOf(';\n', cIdx);
    const jsonStr = s.slice(cIdx + marker.length, semi);
    const clientScripts = JSON.parse(jsonStr);
    clientScripts['organizer'] = orgCleanScript;
    s = s.slice(0, cIdx + marker.length) + JSON.stringify(clientScripts) + s.slice(semi);
    console.log('Injected clean organizer script into CLIENT_SCRIPTS!');
}

fs.writeFileSync('src/server/restEndpoints.ts', s, 'utf8');
console.log('Successfully saved restEndpoints.ts!');
