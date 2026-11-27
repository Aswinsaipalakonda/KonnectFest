const https = require('https');

function get(path) {
    return new Promise(resolve => {
        https.get('https://dev495021.service-now.com' + path, res => {
            let d = '';
            res.on('data', chunk => d += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data: d }));
        }).on('error', e => resolve({ err: e.message }));
    });
}

function post(path, body) {
    return new Promise(resolve => {
        const req = https.request('https://dev495021.service-now.com' + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }, res => {
            let d = '';
            res.on('data', chunk => d += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data: d }));
        });
        req.on('error', e => resolve({ err: e.message }));
        req.write(JSON.stringify(body));
        req.end();
    });
}

async function run() {
    console.log('=== VERIFYING ALL 5 SCRIPTS & CORE ENDPOINTS ===');
    for (const page of ['organizer', 'register', 'participant', 'vendor', 'finance']) {
        const res = await get(`/api/x_2327324_konnect/konnectfest/public/script?page=${page}`);
        console.log(`Script for [${page}]: Status=${res.status}, Length=${res.data.length} bytes`);
    }

    console.log('\n=== TESTING DATA ENDPOINTS ===');
    const ev = await get('/api/x_2327324_konnect/konnectfest/public/events');
    console.log(`Events: Status=${ev.status}, Length=${ev.data.length}`);

    const org = await get('/api/x_2327324_konnect/konnectfest/organizer/overview');
    console.log(`Organizer Overview: Status=${org.status}, Length=${org.data.length}`);

    const fin = await get('/api/x_2327324_konnect/konnectfest/finance/queues');
    console.log(`Finance Queues: Status=${fin.status}, Length=${fin.data.length}`);

    const ven = await get('/api/x_2327324_konnect/konnectfest/vendor/dashboard');
    console.log(`Vendor Dashboard: Status=${ven.status}, Length=${ven.data.length}`);

    const auth = await post('/api/x_2327324_konnect/konnectfest/participant/auth', {
        action: 'login',
        email: 'nonexistent@test.com',
        password: '123'
    });
    console.log(`Participant Auth (Login Test): Status=${auth.status}, Response=${auth.data}`);
}

run();
