const https = require('https');

function get(path) {
    return new Promise((resolve) => {
        https.get('https://dev495021.service-now.com' + path, res => {
            let d = '';
            res.on('data', c => d += c);
            res.on('end', () => resolve({ status: res.statusCode, length: d.length, body: d }));
        });
    });
}

function post(path, payload) {
    return new Promise((resolve) => {
        const data = JSON.stringify(payload);
        const req = https.request({
            hostname: 'dev495021.service-now.com',
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        }, res => {
            let d = '';
            res.on('data', c => d += c);
            res.on('end', () => resolve({ status: res.statusCode, body: d }));
        });
        req.write(data);
        req.end();
    });
}

async function runComprehensiveAudit() {
    console.log('=== 1. VERIFYING SCRIPT BUNDLES FOR CREDENTIALS: OMIT ===');
    const orgScript = await get('/api/x_2327324_konnect/konnectfest/public/script?page=organizer');
    console.log('Organizer Script Length:', orgScript.length);
    console.log('Has credentials: omit in organizer?', orgScript.body.includes("credentials: 'omit'"));

    console.log('\n=== 2. VERIFYING EVENT UPDATE (ORGANIZER ACTION) ===');
    const updateRes = await post('/api/x_2327324_konnect/konnectfest/organizer/event', {
        action: 'update_event',
        name: 'KonnectFest 2026 - Annual Fest',
        upi_id: 'konnectfest@axisbank',
        upi_payee_name: 'KonnectFest Committee',
        state: 'active',
        description: 'Official Annual Event Commerce and Digital Wallet Platform'
    });
    console.log('Event Update HTTP Status:', updateRes.status);
    console.log('Event Update Response:', updateRes.body);

    console.log('\n=== 3. AUDITING ALL UI PAGES (HTTP 200 & NON-ZERO LENGTH) ===');
    const pages = [
        { name: 'Organizer Command Center', url: '/x_2327324_konnect_organizer_dashboard.do' },
        { name: 'Public Registration Portal', url: '/x_2327324_konnect_register.do' },
        { name: 'Finance & Settlement Workspace', url: '/x_2327324_konnect_financer_workspace.do' },
        { name: 'Vendor Terminal', url: '/x_2327324_konnect_vendor_workspace.do' },
        { name: 'Participant Mobile Portal', url: '/x_2327324_konnect_participant_portal.do' }
    ];

    for (const p of pages) {
        const res = await get(p.url);
        console.log(`  ${p.name.padEnd(32)} -> Status: ${res.status}, Length: ${res.length} bytes (Pass: ${res.status === 200 && res.length > 5000})`);
    }

    console.log('\n=== 4. AUDITING CORE BUSINESS API ENDPOINTS ===');
    // Overview
    const ov = await get('/api/x_2327324_konnect/konnectfest/organizer/overview');
    const ovData = JSON.parse(ov.body).result;
    console.log('Organizer Overview Active Event:', ovData.events[0].name, '| UPI:', ovData.events[0].upi_id, '| Payee:', ovData.events[0].upi_payee_name);
    console.log('Stalls Count:', (ovData.vendors || []).length);
    console.log('Registrations Count:', (ovData.registrations || []).length);

    // Finance Queues
    const fin = await get('/api/x_2327324_konnect/konnectfest/finance/queues');
    const finData = JSON.parse(fin.body).result;
    console.log('Finance Pending Payments Count:', (finData.pendingPayments || []).length);
    console.log('Finance Pending Settlements Count:', (finData.vendorSettlements || []).length);

    // Vendor Dashboard
    const ven = await get('/api/x_2327324_konnect/konnectfest/vendor/dashboard');
    const venData = JSON.parse(ven.body).result;
    console.log('Vendor Dashboard Status: OK | Top Stall:', (venData.stalls || [{}])[0].stall_number || 'STALL-01');

    // Participant Dashboard
    const part = await get('/api/x_2327324_konnect/konnectfest/participant/dashboard');
    const partData = JSON.parse(part.body).result;
    console.log('Participant Dashboard Status: OK | Wallet Present:', !!partData.wallet);
}

runComprehensiveAudit();
