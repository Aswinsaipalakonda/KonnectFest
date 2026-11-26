const fs = require('fs');

// 1. Read client scripts JSON
const clientScripts = JSON.parse(fs.readFileSync('src/server/clientScriptBundles.json', 'utf8'));

// 2. Read restEndpoints.ts
let restEndpoints = fs.readFileSync('src/server/restEndpoints.ts', 'utf8');

// Ensure handleGetPublicScript is not already there
if (!restEndpoints.includes('handleGetPublicScript')) {
    const scriptMapDef = `
// ==========================================
// 6. CLIENT SCRIPT BUNDLES FOR UI PAGES
// ==========================================
const CLIENT_SCRIPTS: Record<string, string> = ${JSON.stringify(clientScripts)};

export function handleGetPublicScript(request: any, response: any) {
    try {
        const page = (request.queryParams && request.queryParams.page) ? String(request.queryParams.page) : 'register';
        const script = CLIENT_SCRIPTS[page] || 'console.error("Script not found for page: ' + page + '");';
        response.setContentType('application/javascript; charset=UTF-8');
        response.setStatus(200);
        const writer = response.getStreamWriter();
        if (writer && typeof writer.writeString === 'function') {
            writer.writeString(script);
        } else {
            response.setBody(script);
        }
    } catch (e: any) {
        response.setStatus(500);
        response.setBody('console.error("Error serving script: ' + (e.message || e) + '");');
    }
}
`;
    restEndpoints += '\n' + scriptMapDef;
    fs.writeFileSync('src/server/restEndpoints.ts', restEndpoints, 'utf8');
    console.log('Added handleGetPublicScript to restEndpoints.ts');
}

// 3. Update rest_apis.now.ts
let restApis = fs.readFileSync('src/fluent/rest_apis.now.ts', 'utf8');
if (!restApis.includes('handleGetPublicScript')) {
    // Add import
    restApis = restApis.replace(
        'handleGetPublicEvents,',
        'handleGetPublicEvents,\n    handleGetPublicScript,'
    );

    // Add route
    const newRoute = `        {
            $id: Now.ID['route_public_script'],
            name: 'GetPublicScript',
            method: 'GET',
            path: '/public/script',
            active: true,
            authentication: false,
            authorization: false,
            script: handleGetPublicScript,
            shortDescription: 'Serve UI client scripts without Jelly escaping issues',
        },
`;
    restApis = restApis.replace(
        '// PUBLIC ROUTES (No login required for registration)',
        '// PUBLIC ROUTES (No login required for registration)\n' + newRoute
    );
    fs.writeFileSync('src/fluent/rest_apis.now.ts', restApis, 'utf8');
    console.log('Added route_public_script to rest_apis.now.ts');
}
