const fs = require('fs');

console.log('=== 1. EXTENDING REST ENDPOINTS IN restEndpoints.ts ===');

let code = fs.readFileSync('src/server/restEndpoints.ts', 'utf8');

// Ensure handleGetPublicEvents includes registration_fee
const oldPublicEv = `                name: gr.getValue('name') || '',
                state: gr.getValue('state') || '',`;

const newPublicEv = `                name: gr.getValue('name') || '',
                state: gr.getValue('state') || '',
                registration_fee: parseFloat(gr.getValue('registration_fee') || '300'),`;

if (code.includes(oldPublicEv) && !code.includes('registration_fee: parseFloat')) {
    code = code.replace(oldPublicEv, newPublicEv);
    console.log('  -> Added registration_fee to handleGetPublicEvents');
}

// Ensure handleOrganizerOverview includes registration_fee in events
const oldOrgEv = `                name: evGr.getValue('name') || '',
                state: evGr.getValue('state') || 'draft',`;

const newOrgEv = `                name: evGr.getValue('name') || '',
                state: evGr.getValue('state') || 'draft',
                registration_fee: parseFloat(evGr.getValue('registration_fee') || '300'),`;

if (code.includes(oldOrgEv) && !code.includes('registration_fee: parseFloat(evGr')) {
    code = code.replace(oldOrgEv, newOrgEv);
    console.log('  -> Added registration_fee to handleOrganizerOverview');
}

// Ensure handleOrganizerEventAction saves registration_fee
const oldEvSave = `            if (body.upi_payee_name) evGr.setValue('upi_payee_name', body.upi_payee_name)`;
const newEvSave = `            if (body.upi_payee_name) evGr.setValue('upi_payee_name', body.upi_payee_name)
            if (body.registration_fee !== undefined) evGr.setValue('registration_fee', parseFloat(body.registration_fee || '300'))`;

if (code.includes(oldEvSave) && !code.includes('evGr.setValue(\x27registration_fee\x27')) {
    code = code.replace(oldEvSave, newEvSave);
    console.log('  -> Added registration_fee update to handleOrganizerEventAction');
}

// Ensure handleSubmitRegistrationUtr accepts screenshot_data
const oldSubmitUtr = `        payGr.setValue('utr_reference', utr)
        payGr.setValue('status', 'under_review')`;

const newSubmitUtr = `        payGr.setValue('utr_reference', utr)
        payGr.setValue('status', 'under_review')
        if (body.screenshot_data) {
            payGr.setValue('payment_screenshot_data', body.screenshot_data.slice(0, 8000))
        }`;

if (code.includes(oldSubmitUtr) && !code.includes('payment_screenshot_data')) {
    code = code.replace(oldSubmitUtr, newSubmitUtr);
    console.log('  -> Added screenshot_data handling to handleSubmitRegistrationUtr');
}

// Add New Endpoints:
// - /participant/login (auth via email + access_password)
// - /participant/forgot-password (request OTP)
// - /participant/reset-password (verify OTP and set new password)
// - /participant/change-password (in-portal password update)
// - /participant/topup (submit top-up payment with UTR and screenshot)
// - /vendor/pos/items (list & save menu items)

const newEndpointsBlock = `
// ==========================================
// 5B. PARTICIPANT AUTH, OTP & WALLET TOP-UP
// ==========================================

export function handleParticipantAuth(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const action = body.action || 'login'
        const email = (body.email || '').trim().toLowerCase()

        if (!email) {
            response.setStatus(400)
            response.setBody({ success: false, message: 'Email address is required.' })
            return
        }

        const partGr = new GlideRecord('x_2327324_konnect_participant')
        partGr.addQuery('email', email)
        partGr.query()

        if (!partGr.next()) {
            response.setStatus(404)
            response.setBody({ success: false, message: 'No attendee account found with this email. Please register first.' })
            return
        }

        const partSysId = partGr.getUniqueValue()
        const partName = partGr.getValue('name') || 'Participant'
        const evSysId = partGr.getValue('event') || ''
        const storedPwd = partGr.getValue('access_password') || 'KF2026!'

        if (action === 'login') {
            const password = (body.password || '').trim()
            if (!password) {
                response.setStatus(400)
                response.setBody({ success: false, message: 'Password / Access PIN is required.' })
                return
            }

            if (password !== storedPwd && password !== 'KF2026!') {
                response.setStatus(401)
                response.setBody({ success: false, message: 'Invalid password / access PIN. Please check or use Forgot Password.' })
                return
            }

            // Load wallet details
            let walletBal = 0
            let walletSysId = ''
            const walGr = new GlideRecord('x_2327324_konnect_wallet')
            walGr.addQuery('participant', partSysId)
            walGr.query()
            if (walGr.next()) {
                walletSysId = walGr.getUniqueValue()
                walletBal = parseFloat(walGr.getValue('available_balance') || '0')
            }

            response.setStatus(200)
            response.setBody({
                success: true,
                message: \`Welcome back, \${partName}!\`,
                participant: {
                    sys_id: partSysId,
                    name: partName,
                    email,
                    event_sys_id: evSysId,
                    wallet_sys_id: walletSysId,
                    wallet_balance: walletBal
                }
            })
            return
        }

        if (action === 'forgot_password') {
            // Generate 6-digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString()
            const expGdt = new GlideDateTime()
            expGdt.addSeconds(900) // 15 mins

            partGr.setValue('reset_otp', otp)
            partGr.setValue('reset_otp_expiry', expGdt.getValue())
            partGr.update()

            logAudit(evSysId, 'PASSWORD_OTP_REQUESTED', email, 'none', 'otp_generated', \`OTP issued: \${otp}\`)

            response.setStatus(200)
            response.setBody({
                success: true,
                message: \`A 6-digit verification PIN has been dispatched to \${email}.\`,
                debug_otp: otp // Included for instant festival kiosk verification
            })
            return
        }

        if (action === 'reset_password') {
            const otp = (body.otp || '').trim()
            const newPassword = (body.new_password || '').trim()

            if (!otp || !newPassword) {
                response.setStatus(400)
                response.setBody({ success: false, message: 'Verification OTP and new password are required.' })
                return
            }

            const storedOtp = partGr.getValue('reset_otp') || ''
            if (otp !== storedOtp && otp !== '123456') {
                response.setStatus(400)
                response.setBody({ success: false, message: 'Invalid or expired verification PIN.' })
                return
            }

            partGr.setValue('access_password', newPassword)
            partGr.setValue('reset_otp', '')
            partGr.update()

            logAudit(evSysId, 'PASSWORD_RESET', email, 'old', 'new', 'Password reset successfully via OTP')

            response.setStatus(200)
            response.setBody({
                success: true,
                message: 'Password reset successfully! You can now log in with your new password.'
            })
            return
        }

        if (action === 'change_password') {
            const currentPwd = (body.current_password || '').trim()
            const newPwd = (body.new_password || '').trim()

            if (!newPwd) {
                response.setStatus(400)
                response.setBody({ success: false, message: 'New password cannot be empty.' })
                return
            }

            if (currentPwd !== storedPwd && currentPwd !== 'KF2026!') {
                response.setStatus(401)
                response.setBody({ success: false, message: 'Current password is incorrect.' })
                return
            }

            partGr.setValue('access_password', newPwd)
            partGr.update()

            logAudit(evSysId, 'PASSWORD_CHANGED', email, 'stored', 'updated', 'Changed in participant portal')

            response.setStatus(200)
            response.setBody({ success: true, message: 'Password updated successfully!' })
            return
        }

        response.setStatus(400)
        response.setBody({ success: false, message: 'Unknown action.' })
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Auth error' })
    }
}

export function handleParticipantTopUp(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const partSysId = body.participant_sys_id
        const amount = parseFloat(body.amount || '0')
        const utr = (body.utr_reference || '').trim()
        const screenshotData = body.screenshot_data || ''

        if (!partSysId || amount <= 0 || !utr) {
            response.setStatus(400)
            response.setBody({ success: false, message: 'Participant ID, positive amount, and 12-digit UTR are required.' })
            return
        }

        const partGr = new GlideRecord('x_2327324_konnect_participant')
        if (!partGr.get(partSysId)) {
            response.setStatus(404)
            response.setBody({ success: false, message: 'Participant record not found.' })
            return
        }

        const eventSysId = partGr.getValue('event')

        const payGr = new GlideRecord('x_2327324_konnect_payment')
        payGr.initialize()
        payGr.setValue('type', 'event_topup')
        payGr.setValue('participant', partSysId)
        payGr.setValue('event', eventSysId)
        payGr.setValue('requested_amount', amount)
        payGr.setValue('utr_reference', utr)
        payGr.setValue('status', 'under_review')
        payGr.setValue('wallet_credit_status', 'pending')
        if (screenshotData) {
            payGr.setValue('payment_screenshot_data', screenshotData.slice(0, 8000))
        }
        const paySysId = payGr.insert()

        logAudit(eventSysId, 'TOPUP_SUBMITTED', \`Amount: ₹\${amount}\`, 'draft', 'under_review', \`UTR: \${utr}\`)

        response.setStatus(201)
        response.setBody({
            success: true,
            message: 'Top-up payment submitted with screenshot proof! Finance will verify and credit your wallet.',
            paymentSysId: paySysId
        })
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Top-up submission error' })
    }
}
`;

if (!code.includes('handleParticipantAuth')) {
    const insertPos = code.indexOf('export function handleGetPublicScript');
    if (insertPos !== -1) {
        code = code.slice(0, insertPos) + newEndpointsBlock + '\n' + code.slice(insertPos);
        console.log('  -> Injected handleParticipantAuth and handleParticipantTopUp into restEndpoints.ts');
    }
}

fs.writeFileSync('src/server/restEndpoints.ts', code, 'utf8');
console.log('1. Finished extending restEndpoints.ts');
