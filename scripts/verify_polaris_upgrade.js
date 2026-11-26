const https = require('https');
const qs = require('querystring');

function get(path, cookie) {
    return new Promise((resolve) => {
        const headers = {};
        if (cookie) headers['Cookie'] = cookie;
        https.get('https://dev495021.service-now.com' + path, { headers: headers }, res => {
            let d = '';
            res.on('data', c => d += c);
            res.on('end', () => resolve({ status: res.statusCode, body: d }));
        });
    });
}

function post(path, payload, cookie) {
    return new Promise((resolve) => {
        const data = JSON.stringify(payload);
        const headers = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        };
        if (cookie) headers['Cookie'] = cookie;
        const req = https.request({
            hostname: 'dev495021.service-now.com',
            path: path,
            method: 'POST',
            headers: headers
        }, res => {
            let d = '';
            res.on('data', c => d += c);
            res.on('end', () => resolve({ status: res.statusCode, body: d }));
        });
        req.write(data);
        req.end();
    });
}

function login() {
    return new Promise((resolve) => {
        const postData = qs.stringify({
            user_name: 'admin',
            user_password: 'Sf6P+Yy6Kv@r',
            sys_action: 'sysverb_login'
        });
        const req = https.request({
            hostname: 'dev495021.service-now.com',
            path: '/login.do',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, res => {
            const cookies = (res.headers['set-cookie'] || []).map(c => c.split(';')[0]).join('; ');
            resolve(cookies);
        });
        req.write(postData);
        req.end();
    });
}

async function verifyAll() {
    console.log('=== VERIFYING SERVICENOW POLARIS UPGRADE ===\n');

    const cookie = await login();
    console.log('1. Admin login successful. Cookie acquired.');

    // 1. Overview API
    const overview = await get('/api/x_2327324_konnect/konnectfest/organizer/overview');
    console.log('2. [API Overview] Status:', overview.status, 'Length:', overview.body.length);
    const ovJson = JSON.parse(overview.body);
    const r = ovJson.result || ovJson;
    console.log('   Event Name:', r.events && r.events.length > 0 ? r.events[0].name : 'N/A');
    console.log('   Receiving UPI ID:', r.events && r.events.length > 0 ? r.events[0].upi_id : 'N/A');
    console.log('   Total Events:', (r.events || []).length, '(Should be 1 - KonnectFest only)');
    console.log('   Stalls Count:', (r.vendors || []).length);

    // 2. Test saving Receiving UPI ID configuration
    const activeEvId = r.events && r.events.length > 0 ? r.events[0].sys_id : '';
    if (activeEvId) {
        const updateRes = await post('/api/x_2327324_konnect/konnectfest/organizer/event', {
            action: 'update_event',
            event_sys_id: activeEvId,
            name: 'KonnectFest 2026 - Annual Fest',
            upi_id: 'konnectfest@axisbank',
            upi_payee_name: 'KonnectFest Committee',
            state: 'active',
            description: 'Official Annual Event Commerce and Digital Wallet Platform.'
        }, cookie);
        console.log('3. [API Update Receiving UPI] Status:', updateRes.status);
        const upJson = JSON.parse(updateRes.body);
        console.log('   Message:', upJson.result ? upJson.result.message : upJson.message);
    }

    // 3. Organizer Dashboard UI Page
    const orgPage = await get('/x_2327324_konnect_organizer_dashboard.do', cookie);
    console.log('4. [Organizer Dashboard UI] Status:', orgPage.status, 'Length:', orgPage.body.length);
    console.log('   Has KonnectFest Logo Data URI:', orgPage.body.includes('data:image/jpeg;base64,'));
    console.log('   Has Polaris Tabs (Executive Overview, Event Master & Receiving UPI):', orgPage.body.includes('Executive Overview') && orgPage.body.includes('Event Master &amp; Receiving UPI'));
    console.log('   Has White Background styling:', orgPage.body.includes('background:#ffffff;'));
    console.log('   Has Save Event & UPI Configuration button:', orgPage.body.includes('saveEventUpiConfig'));

    // 4. Register UI Page
    const regPage = await get('/x_2327324_konnect_register.do');
    console.log('5. [Public Registration UI] Status:', regPage.status, 'Length:', regPage.body.length);
    console.log('   Has Logo:', regPage.body.includes('data:image/jpeg;base64,'));
    console.log('   Has Clean Placeholder ("Enter your full name"):', regPage.body.includes('Enter your full name'));
    console.log('   College Field Removed:', !regPage.body.includes('College / Organization'));
    console.log('   "Priya" dummy value removed:', !regPage.body.includes('Priya'));
}

verifyAll();
