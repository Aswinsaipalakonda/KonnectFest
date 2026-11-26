// Check duplicate sys_ui_page records and clean up orphans
var orphans = [
    '57551e4547b4465687dda2a857d6a377', // organizer_dashboard (old direct=false)
    '09f96f6fdf8b40c6ade63ef8aeee37f3', // financer_workspace (old direct=false)
    '58f8e6f19bfc4b02912847336fc09bb9', // vendor_workspace (old direct=false)
    'df385ef2112e413fae051ffc1a0bf2e9'  // participant_portal (old direct=false)
];

for (var i = 0; i < orphans.length; i++) {
    var gr = new GlideRecord('sys_ui_page');
    if (gr.get(orphans[i])) {
        gs.info('Deleting orphan UI page: ' + gr.name + ' (' + gr.sys_id + ') direct=' + gr.direct);
        gr.deleteRecord();
    }
}

// Now list the remaining pages
var p = new GlideRecord('sys_ui_page');
p.addQuery('sys_scope.scope', 'x_2327324_konnect');
p.query();
while(p.next()){
    gs.info('REMAINING: ' + p.name + ' id=' + p.sys_id + ' direct=' + p.direct + ' len=' + (''+p.html).length);
}
