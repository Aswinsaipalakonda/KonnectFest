// Seed Demo Data Script for KonnectFest
(function() {
    gs.info('[KonnectFest Seed] Starting demo data creation...');

    // 1. Create or retrieve active Event
    var eventGr = new GlideRecord('x_2327324_konnect_event');
    eventGr.addQuery('name', 'KonnectFest 2026 - Annual Fest');
    eventGr.query();
    var eventSysId = '';

    if (eventGr.next()) {
        eventSysId = eventGr.getUniqueValue();
        gs.info('[KonnectFest Seed] Existing event found: ' + eventSysId);
    } else {
        eventGr.initialize();
        eventGr.setValue('name', 'KonnectFest 2026 - Annual Fest');
        eventGr.setValue('state', 'active');
        eventGr.setValue('start_date', '2026-11-26 09:00:00');
        eventGr.setValue('end_date', '2026-11-28 22:00:00');
        eventGr.setValue('upi_id', 'konnectfest@axisbank');
        eventGr.setValue('upi_payee_name', 'KonnectFest Organizing Committee');
        eventGr.setValue('redemption_window_open', false);
        eventGr.setValue('description', 'Official campus festival with digital wallet commerce and authorized food & tech stalls.');
        eventSysId = eventGr.insert();
        gs.info('[KonnectFest Seed] Created Event: ' + eventSysId);
    }

    // 2. Create Vendor
    var venGr = new GlideRecord('x_2327324_konnect_vendor');
    venGr.addQuery('name', 'Royal Spice Foods');
    venGr.addQuery('event', eventSysId);
    venGr.query();
    var vendorSysId = '';

    if (venGr.next()) {
        vendorSysId = venGr.getUniqueValue();
    } else {
        venGr.initialize();
        venGr.setValue('name', 'Royal Spice Foods');
        venGr.setValue('stall_number', 'Stall #01');
        venGr.setValue('category', 'food_beverage');
        venGr.setValue('event', eventSysId);
        venGr.setValue('status', 'active');
        venGr.setValue('upi_id', 'royalspice@upi');
        venGr.setValue('bank_account', '9876543210123');
        venGr.setValue('bank_ifsc', 'HDFC0001234');
        vendorSysId = venGr.insert();
        gs.info('[KonnectFest Seed] Created Vendor: ' + vendorSysId);
    }

    // 3. Create Vendor Stall
    var stallGr = new GlideRecord('x_2327324_konnect_vendor_stall');
    stallGr.addQuery('stall_code', 'STL-01');
    stallGr.query();
    if (!stallGr.next()) {
        stallGr.initialize();
        stallGr.setValue('stall_code', 'STL-01');
        stallGr.setValue('stall_name', 'Food Court North - Stall 01');
        stallGr.setValue('vendor', vendorSysId);
        stallGr.setValue('event', eventSysId);
        stallGr.setValue('location_notes', 'Near Main Auditorium Entrance');
        stallGr.insert();
    }

    // 4. Create Participant
    var partGr = new GlideRecord('x_2327324_konnect_participant');
    partGr.addQuery('email', 'aswin@example.com');
    partGr.addQuery('event', eventSysId);
    partGr.query();
    var participantSysId = '';

    if (partGr.next()) {
        participantSysId = partGr.getUniqueValue();
    } else {
        partGr.initialize();
        partGr.setValue('name', 'Aswin Sai');
        partGr.setValue('email', 'aswin@example.com');
        partGr.setValue('phone', '+91 9876543210');
        partGr.setValue('college_organization', 'National Institute of Technology');
        partGr.setValue('participant_id_code', 'NIT-2026-CS101');
        partGr.setValue('event', eventSysId);
        partGr.setValue('status', 'verified');
        partGr.setValue('verification_date', new GlideDateTime().getValue());
        participantSysId = partGr.insert();
        gs.info('[KonnectFest Seed] Created Participant: ' + participantSysId);
    }

    // 5. Create Payment
    var payGr = new GlideRecord('x_2327324_konnect_payment');
    payGr.addQuery('utr_reference', 'UTR202611260012');
    payGr.query();
    var paymentSysId = '';

    if (payGr.next()) {
        paymentSysId = payGr.getUniqueValue();
    } else {
        payGr.initialize();
        payGr.setValue('type', 'initial_registration');
        payGr.setValue('participant', participantSysId);
        payGr.setValue('event', eventSysId);
        payGr.setValue('requested_amount', 500);
        payGr.setValue('verified_amount', 500);
        payGr.setValue('utr_reference', 'UTR202611260012');
        payGr.setValue('status', 'verified');
        payGr.setValue('wallet_credit_status', 'credited');
        payGr.setValue('verified_at', new GlideDateTime().getValue());
        paymentSysId = payGr.insert();
        gs.info('[KonnectFest Seed] Created Payment: ' + paymentSysId);
    }

    // 6. Create Wallet
    var walGr = new GlideRecord('x_2327324_konnect_wallet');
    walGr.addQuery('participant', participantSysId);
    walGr.addQuery('event', eventSysId);
    walGr.query();
    var walletSysId = '';

    if (walGr.next()) {
        walletSysId = walGr.getUniqueValue();
    } else {
        walGr.initialize();
        walGr.setValue('participant', participantSysId);
        walGr.setValue('event', eventSysId);
        walGr.setValue('initial_amount', 500);
        walGr.setValue('available_balance', 500);
        walGr.setValue('reserved_balance', 0);
        walGr.setValue('total_spent', 0);
        walGr.setValue('total_refunded', 0);
        walGr.setValue('status', 'active');
        walGr.setValue('last_transaction_date', new GlideDateTime().getValue());
        walletSysId = walGr.insert();
        gs.info('[KonnectFest Seed] Created Wallet: ' + walletSysId);

        // Create Ledger Entry
        var ledGr = new GlideRecord('x_2327324_konnect_wallet_ledger');
        ledGr.initialize();
        ledGr.setValue('wallet', walletSysId);
        ledGr.setValue('participant', participantSysId);
        ledGr.setValue('event', eventSysId);
        ledGr.setValue('entry_type', 'initial_credit');
        ledGr.setValue('amount', 500);
        ledGr.setValue('available_balance_before', 0);
        ledGr.setValue('available_balance_after', 500);
        ledGr.setValue('reserved_balance_before', 0);
        ledGr.setValue('reserved_balance_after', 0);
        ledGr.setValue('source_payment', paymentSysId);
        ledGr.setValue('idempotency_key', 'INIT_SEED_500_' + participantSysId);
        ledGr.setValue('status', 'posted');
        ledGr.setValue('notes', 'Initial verified registration credit for Aswin Sai (UTR202611260012)');
        ledGr.insert();
    }

    // 7. Create Pending Purchase Transaction for Testing QR Checkout
    var expGdt = new GlideDateTime();
    expGdt.addSeconds(3600); // 1 hour for demo testing

    var txGr = new GlideRecord('x_2327324_konnect_purchase_tx');
    txGr.addQuery('qr_token', 'KF_QR_DEMO_SAMPLE_120');
    txGr.query();
    if (!txGr.next()) {
        txGr.initialize();
        txGr.setValue('transaction_id', 'TXN-DEMO-001');
        txGr.setValue('event', eventSysId);
        txGr.setValue('vendor', vendorSysId);
        txGr.setValue('item_description', 'Paneer Roll + Mango Shake Combo');
        txGr.setValue('amount', 120);
        txGr.setValue('qr_token', 'KF_QR_DEMO_SAMPLE_120');
        txGr.setValue('qr_expires_at', expGdt.getValue());
        txGr.setValue('status', 'pending');
        txGr.insert();
        gs.info('[KonnectFest Seed] Created Pending Purchase Tx with Token: KF_QR_DEMO_SAMPLE_120');
    }

    gs.info('[KonnectFest Seed] Demo data creation finished successfully!');
})();
