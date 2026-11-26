const fs = require('fs');
const path = require('path');

const logoB64 = fs.readFileSync('KonnectFest Wallet Network Logo.jpg').toString('base64');

// 1. Update restEndpoints.ts
let restCode = fs.readFileSync('src/server/restEndpoints.ts', 'utf8');
if (!restCode.includes('handleGetPublicLogo')) {
    const logoHandler = `
// ==========================================
// 7. PUBLIC LOGO ENDPOINT
// ==========================================
const LOGO_BASE64 = "${logoB64}";

export function handleGetPublicLogo(_request: any, response: any) {
    try {
        response.setContentType('image/jpeg');
        response.setStatus(200);
        const writer = response.getStreamWriter();
        if (writer && typeof writer.writeString === 'function') {
            writer.writeString(gs.base64Decode(LOGO_BASE64));
        } else {
            response.setBody(LOGO_BASE64);
        }
    } catch (e: any) {
        response.setStatus(500);
    }
}
`;
    restCode += '\n' + logoHandler;
    fs.writeFileSync('src/server/restEndpoints.ts', restCode, 'utf8');
    console.log('Added handleGetPublicLogo to restEndpoints.ts');
}

// 2. Update rest_apis.now.ts
let apiCode = fs.readFileSync('src/fluent/rest_apis.now.ts', 'utf8');
if (!apiCode.includes('handleGetPublicLogo')) {
    apiCode = apiCode.replace(
        'handleGetPublicScript,',
        'handleGetPublicScript,\n    handleGetPublicLogo,'
    );

    const logoRoute = `        {
            $id: Now.ID['route_public_logo'],
            name: 'GetPublicLogo',
            method: 'GET',
            path: '/public/logo',
            active: true,
            authentication: false,
            authorization: false,
            script: handleGetPublicLogo,
            shortDescription: 'Serve official KonnectFest logo image',
        },
`;
    apiCode = apiCode.replace(
        '// PUBLIC ROUTES (No login required for registration)\n',
        '// PUBLIC ROUTES (No login required for registration)\n' + logoRoute
    );
    fs.writeFileSync('src/fluent/rest_apis.now.ts', apiCode, 'utf8');
    console.log('Added route_public_logo to rest_apis.now.ts');
}
