const https = require('https');

function get(path) {
    return new Promise((resolve) => {
        https.get('https://dev495021.service-now.com' + path, res => {
            let d = '';
            res.on('data', c => d += c);
            res.on('end', () => resolve({ status: res.statusCode, body: d }));
        });
    });
}

async function verify() {
    console.log('Verifying deployed updates...\n');

    // 1. Overview API
    const overview = await get('/api/x_2327324_konnect/konnectfest/organizer/overview');
    console.log('[API Overview] Status:', overview.status, 'Length:', overview.body.length);
    try {
        const json = JSON.parse(overview.body);
        const r = json.result || json;
        console.log('  Success:', r.success);
        console.log('  Vendors count:', (r.vendors || []).length);
        console.log('  Events count:', (r.events || []).length);
        console.log('  Registrations count:', (r.registrations || []).length);
        console.log('  Audit Logs count:', (r.auditLogs || []).length);
    } catch(e) {
        console.log('  Snippet:', overview.body.substring(0, 150));
    }

    // 2. Organizer Script
    const orgScript = await get('/api/x_2327324_konnect/konnectfest/public/script?page=organizer');
    console.log('\n[API Organizer Script] Status:', orgScript.status, 'Length:', orgScript.body.length);
    console.log('  Has renderStallsTable:', orgScript.body.includes('renderStallsTable'));
    console.log('  Has submitCreateEvent:', orgScript.body.includes('submitCreateEvent'));

    // 3. Register Page
    const reg = await get('/x_2327324_konnect_register.do');
    console.log('\n[Page Register] Status:', reg.status, 'Length:', reg.body.length);
    console.log('  Has "Enter your full name":', reg.body.includes('Enter your full name'));
    console.log('  Has "College / Organization":', reg.body.includes('College / Organization'));
    console.log('  Has "Priya":', reg.body.includes('Priya'));
}

verify();
