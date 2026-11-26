const https = require('https');

const auth = Buffer.from('admin:Sf6P+Yy6Kv@r').toString('base64');

function testEndpoint(name, path, isAuth) {
    return new Promise((resolve) => {
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        };
        if (isAuth) {
            headers['Authorization'] = 'Basic ' + auth;
        }

        const options = {
            hostname: 'dev495021.service-now.com',
            path: path,
            method: 'GET',
            headers: headers
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                resolve({
                    name: name,
                    path: path,
                    statusCode: res.statusCode,
                    location: res.headers['location'],
                    contentType: res.headers['content-type'],
                    length: body.length,
                    snippet: body.substring(0, 150).replace(/\n/g, ' ')
                });
            });
        });

        req.on('error', (e) => {
            resolve({
                name: name,
                path: path,
                statusCode: 0,
                error: e.message
            });
        });

        req.end();
    });
}

async function runAll() {
    console.log('Testing all KonnectFest endpoints...\n');

    const tests = [
        // 1. Scripted REST API Public Events
        testEndpoint('API: Public Events', '/api/x_2327324_konnect/konnectfest/public/events', false),
        
        // 2. Scripted REST API Public Client Script
        testEndpoint('API: Public Script (Organizer)', '/api/x_2327324_konnect/konnectfest/public/script?page=organizer', false),
        testEndpoint('API: Public Script (Finance)', '/api/x_2327324_konnect/konnectfest/public/script?page=finance', false),
        testEndpoint('API: Public Script (Register)', '/api/x_2327324_konnect/konnectfest/public/script?page=register', false),

        // 3. UI Pages
        testEndpoint('Page: Public Register', '/x_2327324_konnect_register.do', false),
        testEndpoint('Page: Organizer Dashboard', '/x_2327324_konnect_organizer_dashboard.do', true),
        testEndpoint('Page: Finance Workspace', '/x_2327324_konnect_financer_workspace.do', true),
        testEndpoint('Page: Vendor Workspace', '/x_2327324_konnect_vendor_workspace.do', true),
        testEndpoint('Page: Participant Portal', '/x_2327324_konnect_participant_portal.do', true)
    ];

    const results = await Promise.all(tests);
    for (const r of results) {
        console.log(`[${r.name}]`);
        console.log(`  Path: ${r.path}`);
        console.log(`  Status: ${r.statusCode} | Length: ${r.length} bytes`);
        if (r.location) console.log(`  Redirect: ${r.location}`);
        if (r.contentType) console.log(`  Content-Type: ${r.contentType}`);
        console.log(`  Snippet: ${r.snippet}`);
        console.log('');
    }
}

runAll();
