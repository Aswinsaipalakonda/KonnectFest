var orphans = [
    '57551e4547b4465687dda2a857d6a377',
    '09f96f6fdf8b40c6ade63ef8aeee37f3',
    '58f8e6f19bfc4b02912847336fc09bb9',
    'df385ef2112e413fae051ffc1a0bf2e9'
];

for (var i = 0; i < orphans.length; i++) {
    var gr = new GlideRecord('sys_ui_page');
    if (gr.get(orphans[i])) {
        var ok = gr.deleteRecord();
        gs.info('deleteRecord result for ' + gr.name + ': ' + ok + ' lastError: ' + gr.getLastErrorMessage());
    }
}
