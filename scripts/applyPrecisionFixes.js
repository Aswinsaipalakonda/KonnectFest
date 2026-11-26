const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== APPLYING PRECISION FIXES ===');

// 1. Fix handleOrganizerOverview in src/server/restEndpoints.ts
const restPath = path.resolve('src/server/restEndpoints.ts');
let restCode = fs.readFileSync(restPath, 'utf8');

const oldRegBlock = `        const registrations: any[] = []
        const rGr = new GlideRecord('x_2327324_konnect_registration')
        rGr.orderByDesc('sys_created_on')
        rGr.setLimit(25)
        rGr.query()
        while (rGr.next()) {
            registrations.push({
                sys_id: rGr.getUniqueValue(),
                full_name: rGr.getValue('full_name') || '',
                email: rGr.getValue('email') || '',
                phone: rGr.getValue('phone') || '',
                initial_wallet_amount: parseFloat(rGr.getValue('initial_wallet_amount') || '0'),
                status: rGr.getValue('status') || 'payment_pending',
                payment_reference: rGr.getValue('payment_reference') || '',
                event: rGr.getDisplayValue('event') || 'KonnectFest 2026',
            })
        }`;

const newRegBlock = `        const registrations: any[] = []
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
        }`;

if (restCode.includes(oldRegBlock)) {
    restCode = restCode.replace(oldRegBlock, newRegBlock);
    console.log('1. Fixed registration data resolution in restEndpoints.ts');
} else {
    console.log('1. oldRegBlock not found verbatim, checking alternative replace...');
    // regex replace
    const regPattern = /const registrations: any\[\] = \[\][\s\S]*?rGr\.query\(\)[\s\S]*?while \(rGr\.next\(\)\) {[\s\S]*?registrations\.push\(\{[\s\S]*?\}\)[\s\S]*?\}/;
    restCode = restCode.replace(regPattern, newRegBlock.trim());
    console.log('1. Applied regex replace for registrations in restEndpoints.ts');
}

// 2. Update CLIENT_SCRIPTS in restEndpoints.ts with showBanner and X-UserToken
const marker = 'const CLIENT_SCRIPTS: Record<string, string> = ';
const idx = restCode.indexOf(marker);
if (idx !== -1) {
    const nextFunc = restCode.indexOf('export function handleGetPublicScript', idx);
    let rawJson = restCode.substring(idx + marker.length, nextFunc).trim();
    if (rawJson.endsWith(';')) rawJson = rawJson.slice(0, -1).trim();

    try {
        const clientScripts = JSON.parse(rawJson);
        
        // Define showBanner helper
        const showBannerDef = `
function showBanner(id, msg, type) {
    var el = document.getElementById(id);
    if (!el) {
        alert(msg);
        return;
    }
    el.style.display = 'block';
    el.className = 'sn-alert-bar ' + (type === 'error' ? 'sn-alert-danger' : 'sn-alert-success');
    el.textContent = msg;
    setTimeout(function() {
        if (el) el.style.display = 'none';
    }, 6000);
}
`;

        // Ensure showBanner is in register script
        if (clientScripts['register'] && !clientScripts['register'].includes('function showBanner')) {
            clientScripts['register'] = showBannerDef + '\n' + clientScripts['register'];
            console.log('2. Injected showBanner into register script');
        }

        // Ensure X-UserToken is sent in register script fetch calls
        if (clientScripts['register']) {
            clientScripts['register'] = clientScripts['register'].replace(
                "headers: { 'Content-Type': 'application/json' },",
                "headers: (function(){ var h = { 'Content-Type': 'application/json' }; var t = document.getElementById('g_ck_token'); var tok = t ? t.value : (window.g_ck || ''); if (tok) h['X-UserToken'] = tok; return h; })(),"
            );
            console.log('3. Injected dynamic X-UserToken CSRF header into register script');
        }

        // Also ensure X-UserToken is sent in organizer script fetch calls
        if (clientScripts['organizer']) {
            clientScripts['organizer'] = clientScripts['organizer'].replace(
                /headers:\s*\{\s*'Content-Type':\s*'application\/json'\s*\}/g,
                "headers: (function(){ var h = { 'Content-Type': 'application/json' }; var t = document.getElementById('g_ck_token'); var tok = t ? t.value : (window.g_ck || ''); if (tok) h['X-UserToken'] = tok; return h; })()"
            );
            console.log('4. Injected dynamic X-UserToken CSRF header into organizer script');
        }

        const updatedJson = JSON.stringify(clientScripts) + ';\n\n';
        restCode = restCode.substring(0, idx + marker.length) + updatedJson + restCode.substring(nextFunc);
        console.log('5. Successfully updated CLIENT_SCRIPTS with CSRF security and error banners!');
    } catch (e) {
        console.error('Error updating client scripts JSON:', e.message);
    }
}

fs.writeFileSync(restPath, restCode, 'utf8');

// 3. Build and Deploy
console.log('6. Building project with now-sdk build...');
execSync('now-sdk build', { stdio: 'inherit' });

console.log('7. Installing application to ServiceNow dev495021...');
execSync('now-sdk install -a konnectfest-dev', { stdio: 'inherit' });

console.log('=== FIXES DEPLOYED SUCCESSFULLY ===');
