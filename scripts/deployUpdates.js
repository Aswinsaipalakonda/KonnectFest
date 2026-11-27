const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { logoInitCode } = require('./systemBuilderShared');

console.log('=== PREPARING CLEAN DEPLOYMENT OF PARTICIPANT, REGISTER, FINANCE & BULK ALLOCATE ===');

// 1. Read the scripts from buildCompleteSystem.js
const bcsPath = path.resolve('scripts/buildCompleteSystem.js');
const bcsContent = fs.readFileSync(bcsPath, 'utf8');

// Extract participantClientScript
const pStart = bcsContent.indexOf('const participantScript = `');
const pEnd = bcsContent.indexOf('const registerBody = `', pStart);
const participantScript = bcsContent.substring(pStart + 'const participantScript = `'.length, pEnd).trim().replace(/`;\s*$/, '');

// Extract registerClientScript
const rStart = bcsContent.indexOf('const registerScript = `');
const rEnd = bcsContent.indexOf('const financeBody = `', rStart);
const registerScript = bcsContent.substring(rStart + 'const registerScript = `'.length, rEnd).trim().replace(/`;\s*$/, '');

// Extract financeClientScript
const fStart = bcsContent.indexOf('const financeScript = `');
const fEnd = bcsContent.indexOf('// ==============================================================\n// 7. WRITE THE HTML TEMPLATES', fStart);
const financeScript = bcsContent.substring(fStart + 'const financeScript = `'.length, fEnd).trim().replace(/`;\s*$/, '');

console.log('Extracted scripts sizes:', {
    participant: participantScript.length,
    register: registerScript.length,
    finance: financeScript.length
});

// 2. Load restEndpoints.ts
const restPath = path.resolve('src/server/restEndpoints.ts');
let restCode = fs.readFileSync(restPath, 'utf8');

// Update CLIENT_SCRIPTS
const marker = 'const CLIENT_SCRIPTS: Record<string, string> = ';
const idx = restCode.indexOf(marker);
const nextFunc = restCode.indexOf('export function handleGetPublicScript', idx);

if (idx === -1 || nextFunc === -1) {
    throw new Error('Could not find CLIENT_SCRIPTS boundary in restEndpoints.ts');
}

let rawJson = restCode.substring(idx + marker.length, nextFunc).trim();
if (rawJson.endsWith(';')) rawJson = rawJson.slice(0, -1).trim();

let clientScripts;
try {
    clientScripts = JSON.parse(rawJson);
} catch(e) {
    throw new Error('Failed to parse existing CLIENT_SCRIPTS JSON: ' + e.message);
}

// Update the scripts
clientScripts['participant'] = participantScript;
clientScripts['register'] = registerScript;
clientScripts['finance'] = financeScript;

// Add bulkAllocateWallets to organizer if needed
if (clientScripts['organizer'] && !clientScripts['organizer'].includes('bulkAllocateWallets')) {
    const bulkScript = `
function bulkAllocateWallets() {
    if (!confirm('Are you sure you want to initialize and credit wallets for all verified participant registrations?')) return;
    safeFetch('/api/x_2327324_konnect/konnectfest/organizer/bulk-allocate', {
        method: 'POST',
        body: JSON.stringify({ event_sys_id: activeEventSysId })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showBanner('snToast', d.message || 'Bulk wallet allocation complete!', d.success ? 'success' : 'error');
        loadOverview();
    })
    .catch(function(err) {
        showBanner('snToast', 'Error in bulk allocation: ' + err.message, 'error');
    });
}
`;
    clientScripts['organizer'] = clientScripts['organizer'] + '\n' + bulkScript;
    console.log('Added bulkAllocateWallets to organizer client script');
}

const updatedJson = JSON.stringify(clientScripts) + ';\n\n';
restCode = restCode.substring(0, idx + marker.length) + updatedJson + restCode.substring(nextFunc);

// 3. Add handleBulkAllocateWallets if not already present
if (!restCode.includes('export function handleBulkAllocateWallets')) {
    const bulkHandler = `
export function handleBulkAllocateWallets(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const eventSysId = body.event_sys_id

        const regGr = new GlideRecord('x_2327324_konnect_registration')
        if (eventSysId) regGr.addQuery('event', eventSysId)
        regGr.query()

        let count = 0
        let totalAllocated = 0

        while (regGr.next()) {
            const partId = regGr.getValue('participant')
            const evId = regGr.getValue('event') || eventSysId
            const amt = parseFloat(regGr.getValue('requested_initial_amount') || '500')

            if (!partId) continue

            // 1. Activate participant
            const pGr = new GlideRecord('x_2327324_konnect_participant')
            if (pGr.get(partId)) {
                pGr.setValue('status', 'active')
                pGr.update()
            }

            // 2. Find or create wallet
            const wGr = new GlideRecord('x_2327324_konnect_wallet')
            wGr.addQuery('participant', partId)
            wGr.addQuery('event', evId)
            wGr.query()

            let walletSysId = ''
            let bal = 0
            if (wGr.next()) {
                walletSysId = wGr.getUniqueValue()
                bal = parseFloat(wGr.getValue('available_balance') || '0')
                wGr.setValue('available_balance', bal + amt)
                wGr.setValue('status', 'active')
                wGr.update()
            } else {
                wGr.initialize()
                wGr.setValue('participant', partId)
                wGr.setValue('event', evId)
                wGr.setValue('initial_amount', amt)
                wGr.setValue('available_balance', amt)
                wGr.setValue('reserved_balance', 0)
                wGr.setValue('total_spent', 0)
                wGr.setValue('status', 'active')
                walletSysId = wGr.insert()
            }

            // 3. Create wallet ledger entry
            const ledGr = new GlideRecord('x_2327324_konnect_wallet_ledger')
            ledGr.initialize()
            ledGr.setValue('wallet', walletSysId)
            ledGr.setValue('participant', partId)
            ledGr.setValue('event', evId)
            ledGr.setValue('entry_type', 'initial_credit')
            ledGr.setValue('amount', amt)
            ledGr.setValue('available_balance_before', bal)
            ledGr.setValue('available_balance_after', bal + amt)
            ledGr.setValue('description', 'Bulk Wallet Allocation by Event Organizer')
            ledGr.insert()

            // 4. Update registration status
            regGr.setValue('status', 'verified')
            regGr.update()

            count++
            totalAllocated += amt
        }

        response.setStatus(200)
        response.setBody({
            success: true,
            message: \`Successfully allocated and activated wallets for \${count} participants (Total: ₹\${totalAllocated.toLocaleString('en-IN')})!\`,
            count,
            totalAllocated
        })
    } catch(e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: e.message || 'Internal error' })
    }
}
`;
    restCode += '\n' + bulkHandler;
    console.log('Appended handleBulkAllocateWallets to restEndpoints.ts');
}

fs.writeFileSync(restPath, restCode, 'utf8');
console.log('Updated restEndpoints.ts successfully.');

// 4. Update rest_apis.now.ts
const apiPath = path.resolve('src/fluent/rest_apis.now.ts');
let apiCode = fs.readFileSync(apiPath, 'utf8');

if (!apiCode.includes('handleBulkAllocateWallets')) {
    apiCode = apiCode.replace(
        'handleOrganizerVendorAction,',
        'handleOrganizerVendorAction,\n    handleBulkAllocateWallets,'
    );

    const vendorRouteTarget = `        {
            $id: Now.ID['route_organizer_vendor'],
            name: 'OrganizerVendorAction',
            method: 'POST',
            path: '/organizer/vendor',
            active: true,
            authentication: false,
            authorization: false,
            internalRole: false,
            enforceAcl: [],
            script: handleOrganizerVendorAction,
            shortDescription: 'Onboard and authorize a new vendor stall',
        },`;

    const bulkRoute = `        {
            $id: Now.ID['route_organizer_bulk_allocate'],
            name: 'OrganizerBulkAllocateWallets',
            method: 'POST',
            path: '/organizer/bulk-allocate',
            active: true,
            authentication: false,
            authorization: false,
            internalRole: false,
            enforceAcl: [],
            script: handleBulkAllocateWallets,
            shortDescription: 'Organizer bulk wallet allocation and participant coupon provisioning',
        },`;

    apiCode = apiCode.replace(vendorRouteTarget, vendorRouteTarget + '\n' + bulkRoute);
    fs.writeFileSync(apiPath, apiCode, 'utf8');
    console.log('Added route_organizer_bulk_allocate to rest_apis.now.ts');
}

// 5. Check XML validation
execSync('python scripts/temp_validate.py', { stdio: 'inherit' });

console.log('ALL FILES PREPARED AND READY FOR BUILD & INSTALL!');
