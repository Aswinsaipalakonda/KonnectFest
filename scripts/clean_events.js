// Keep only KonnectFest, delete any other event
var ev = new GlideRecord('x_2327324_konnect_event');
ev.addQuery('name', '!=', 'KonnectFest 2026 - Annual Fest');
ev.query();
while(ev.next()) {
    gs.info('Deleting extra event: ' + ev.name);
    ev.deleteRecord();
}

// Ensure KonnectFest 2026 has the official receiving UPI ID configured
var mainEv = new GlideRecord('x_2327324_konnect_event');
mainEv.addQuery('name', 'KonnectFest 2026 - Annual Fest');
mainEv.query();
if (mainEv.next()) {
    mainEv.upi_id = 'konnectfest@axisbank';
    mainEv.upi_payee_name = 'KonnectFest Committee';
    mainEv.state = 'active';
    mainEv.update();
    gs.info('Updated KonnectFest 2026 with UPI: ' + mainEv.upi_id);
} else {
    mainEv.initialize();
    mainEv.name = 'KonnectFest 2026 - Annual Fest';
    mainEv.upi_id = 'konnectfest@axisbank';
    mainEv.upi_payee_name = 'KonnectFest Committee';
    mainEv.state = 'active';
    mainEv.description = 'Official Annual Event Commerce and Digital Wallet Platform.';
    mainEv.insert();
    gs.info('Created KonnectFest 2026');
}
