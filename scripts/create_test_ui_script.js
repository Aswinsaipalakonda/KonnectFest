var uiScript = new GlideRecord('sys_ui_script');
uiScript.addQuery('name', 'x_2327324_konnect.test_script');
uiScript.query();
if (!uiScript.next()) {
    uiScript.initialize();
    uiScript.name = 'x_2327324_konnect.test_script';
    uiScript.script = 'window.testScriptLoaded = true; console.log("Test UI script loaded successfully!");';
    uiScript.global = false;
    uiScript.active = true;
    uiScript.use_scoped_format = false;
    uiScript.insert();
    gs.info('Created test UI script');
} else {
    gs.info('Test UI script already exists');
}
