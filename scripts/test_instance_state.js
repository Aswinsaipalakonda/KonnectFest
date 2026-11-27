const https = require('https');
const auth = 'Basic ' + Buffer.from('admin:G81v!bI!wLHq').toString('base64');

function req(method, path) {
    return new Promise((resolve) => {
        const u = new URL('https://dev495021.service-now.com' + path);
        const options = {
            method: method,
            headers: {
                'Authorization': auth,
                'Accept': 'application/json'
            }
        };
        const r = https.request(u, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
                catch(e) { resolve({ status: res.statusCode, raw: data }); }
            });
        });
        r.on('error', err => resolve({ err: err.message }));
        r.end();
    });
}

async function check() {
    const res = await req('GET', '/api/now/table/x_2327324_konnect_event');
    console.log('Events API Status:', res.status);
    console.log('Events result count:', res.body?.result?.length);
    if (res.body?.result) {
        res.body.result.forEach(e => console.log('Event:', e.name, e.sys_id, 'fee:', e.registration_fee, 'upi:', e.upi_id));
    }
}
check();
