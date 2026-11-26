var nowDt = new GlideDateTime().getValue();

// 1. EVENTS
var ev1 = new GlideRecord('x_2327324_konnect_event');
ev1.addQuery('name', 'KonnectFest 2026 - Annual Fest');
ev1.query();
var ev1Id = '';
if (!ev1.next()) {
    ev1.initialize();
    ev1.name = 'KonnectFest 2026 - Annual Fest';
    ev1.state = 'active';
    ev1.upi_id = 'konnectfest@axisbank';
    ev1.upi_payee_name = 'KonnectFest Committee';
    ev1.description = 'The flagship annual cultural and food festival with 6 authorized live stalls.';
    ev1.start_time = nowDt;
    ev1Id = ev1.insert();
    gs.info('Created Event 1: ' + ev1Id);
} else {
    ev1.state = 'active';
    ev1.update();
    ev1Id = ev1.sys_id.toString();
}

var ev2 = new GlideRecord('x_2327324_konnect_event');
ev2.addQuery('name', 'TechConnect Summit 2026');
ev2.query();
var ev2Id = '';
if (!ev2.next()) {
    ev2.initialize();
    ev2.name = 'TechConnect Summit 2026';
    ev2.state = 'registration_open';
    ev2.upi_id = 'techconnect@icici';
    ev2.upi_payee_name = 'TechConnect Core Team';
    ev2.description = 'Technology exhibition, gaming arena, and developer hardware stalls.';
    ev2.start_time = nowDt;
    ev2Id = ev2.insert();
    gs.info('Created Event 2: ' + ev2Id);
} else {
    ev2Id = ev2.sys_id.toString();
}

// 2. VENDORS & STALLS
var vendorsData = [
    { name: 'Cafe Mocha', stall: 'Stall #01', cat: 'food_beverage', sales: 28400, txCount: 42, upi: 'cafemocha@upi', user: 'konnect.vendor' },
    { name: 'Burger Point', stall: 'Stall #02', cat: 'food_beverage', sales: 19200, txCount: 31, upi: 'burgerpoint@upi' },
    { name: 'Campus Apparel', stall: 'Stall #03', cat: 'merchandise', sales: 14500, txCount: 18, upi: 'campusapparel@upi' },
    { name: 'GameZone VR', stall: 'Stall #04', cat: 'games_entertainment', sales: 9800, txCount: 22, upi: 'gamezone@upi' },
    { name: 'Chai & Snacks', stall: 'Stall #05', cat: 'food_beverage', sales: 8600, txCount: 35, upi: 'chai@upi' },
    { name: 'Tech Gadgets', stall: 'Stall #06', cat: 'merchandise', sales: 4000, txCount: 5, upi: 'techgadgets@upi' }
];

var vendorSysIds = {};
for (var i = 0; i < vendorsData.length; i++) {
    var vd = vendorsData[i];
    var vGr = new GlideRecord('x_2327324_konnect_vendor');
    vGr.addQuery('name', vd.name);
    vGr.query();
    var vId = '';
    if (!vGr.next()) {
        vGr.initialize();
        vGr.name = vd.name;
        vGr.event = ev1Id;
        vGr.status = 'active';
        vGr.upi_id = vd.upi;
        vGr.payout_bank_details = 'HDFC0001234 / Acct #5010043920' + (i + 1);
        if (vd.user) {
            var uGr = new GlideRecord('sys_user');
            if (uGr.get('user_name', vd.user)) vGr.user = uGr.sys_id;
        }
        vId = vGr.insert();
    } else {
        vId = vGr.sys_id.toString();
    }
    vendorSysIds[vd.name] = vId;

    // Stall
    var stGr = new GlideRecord('x_2327324_konnect_vendor_stall');
    stGr.addQuery('vendor', vId);
    stGr.query();
    if (!stGr.next()) {
        stGr.initialize();
        stGr.vendor = vId;
        stGr.event = ev1Id;
        stGr.stall_number = vd.stall;
        stGr.stall_category = vd.cat;
        stGr.status = 'active';
        stGr.total_sales = vd.sales;
        stGr.transaction_count = vd.txCount;
        stGr.unsettled_balance = vd.sales;
        stGr.insert();
    }
}
gs.info('Seeded Vendors & Stalls');

// 3. PARTICIPANTS & WALLETS
var pUser = new GlideRecord('sys_user');
var pUserSysId = '';
if (pUser.get('user_name', 'konnect.participant')) {
    pUserSysId = pUser.sys_id.toString();
}

var participantsData = [
    { name: 'Ananya Participant', email: 'ananya@konnectfest.com', phone: '9876543210', user: pUserSysId, initBal: 2000, curBal: 1450 },
    { name: 'Rahul Verma', email: 'rahul.v@gmail.com', phone: '9811223344', initBal: 1500, curBal: 850 },
    { name: 'Sneha Rao', email: 'sneha.rao@outlook.com', phone: '9822334455', initBal: 1000, curBal: 700 },
    { name: 'Amit Patel', email: 'amit.patel@gmail.com', phone: '9833445566', initBal: 800, curBal: 650 },
    { name: 'Karan Singh', email: 'karan.singh@gmail.com', phone: '9844556677', initBal: 1200, curBal: 400 }
];

for (var j = 0; j < participantsData.length; j++) {
    var pd = participantsData[j];
    var partGr = new GlideRecord('x_2327324_konnect_participant');
    partGr.addQuery('email', pd.email);
    partGr.query();
    var partId = '';
    if (!partGr.next()) {
        partGr.initialize();
        partGr.name = pd.name;
        partGr.email = pd.email;
        partGr.phone = pd.phone;
        partGr.status = 'active';
        if (pd.user) partGr.user = pd.user;
        partId = partGr.insert();
    } else {
        partId = partGr.sys_id.toString();
    }

    // Registration
    var regGr = new GlideRecord('x_2327324_konnect_registration');
    regGr.addQuery('email', pd.email);
    regGr.addQuery('event', ev1Id);
    regGr.query();
    if (!regGr.next()) {
        regGr.initialize();
        regGr.event = ev1Id;
        regGr.participant = partId;
        regGr.full_name = pd.name;
        regGr.email = pd.email;
        regGr.phone = pd.phone;
        regGr.initial_wallet_amount = pd.initBal;
        regGr.status = 'payment_verified';
        regGr.payment_reference = 'UPI' + Math.floor(100000000000 + Math.random() * 900000000000);
        regGr.verified_at = nowDt;
        regGr.insert();
    }

    // Wallet
    var wGr = new GlideRecord('x_2327324_konnect_wallet');
    wGr.addQuery('participant', partId);
    wGr.addQuery('event', ev1Id);
    wGr.query();
    if (!wGr.next()) {
        wGr.initialize();
        wGr.participant = partId;
        wGr.event = ev1Id;
        wGr.initial_amount = pd.initBal;
        wGr.available_balance = pd.curBal;
        wGr.reserved_balance = 0;
        wGr.wallet_status = 'active';
        wGr.last_transaction_date = nowDt;
        wGr.insert();
    }
}

// Add a pending registration for demo
var pendReg = new GlideRecord('x_2327324_konnect_registration');
pendReg.addQuery('email', 'neha.g@gmail.com');
pendReg.query();
if (!pendReg.next()) {
    pendReg.initialize();
    pendReg.event = ev1Id;
    pendReg.full_name = 'Neha Gupta';
    pendReg.email = 'neha.g@gmail.com';
    pendReg.phone = '9855667788';
    pendReg.initial_wallet_amount = 500;
    pendReg.status = 'payment_pending';
    pendReg.payment_reference = 'UPI987654321099';
    pendReg.insert();
}

// 4. AUDIT LOGS
var actions = [
    { act: 'EVENT_CREATED', tgt: 'KonnectFest 2026 - Annual Fest', prev: 'none', next: 'active', rsn: 'Organizing committee initialized event' },
    { act: 'VENDOR_ONBOARDED', tgt: 'Cafe Mocha (Stall #01)', prev: 'none', next: 'active', rsn: 'Authorized F&B vendor onboarded' },
    { act: 'VENDOR_ONBOARDED', tgt: 'Burger Point (Stall #02)', prev: 'none', next: 'active', rsn: 'Authorized F&B vendor onboarded' },
    { act: 'PAYMENT_VERIFIED', tgt: 'Reg: Ananya Participant', prev: 'payment_pending', next: 'payment_verified', rsn: 'Financer verified UTR UPI994827103948' },
    { act: 'WALLET_CREDITED', tgt: 'Wallet: Ananya Participant', prev: '0', next: '2000', rsn: 'Initial wallet credit of INR 2000' },
    { act: 'PURCHASE_CONFIRMED', tgt: 'Cafe Mocha - INR 350.00', prev: 'pending', next: 'completed', rsn: 'Attendee confirmed purchase at Stall #01' }
];

for (var k = 0; k < actions.length; k++) {
    var a = actions[k];
    var aud = new GlideRecord('x_2327324_konnect_audit_log');
    aud.addQuery('action', a.act);
    aud.addQuery('target_record', a.tgt);
    aud.query();
    if (!aud.next()) {
        aud.initialize();
        aud.event = ev1Id;
        aud.action = a.act;
        aud.target_record = a.tgt;
        aud.actor = 'admin';
        aud.previous_status = a.prev;
        aud.new_status = a.next;
        aud.reason = a.rsn;
        aud.timestamp = nowDt;
        aud.insert();
    }
}

gs.info('Demo data population finished successfully');
