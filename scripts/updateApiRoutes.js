const fs = require('fs');

console.log('=== PREPARING COMPLETE MULTI-ROLE KONNECTFEST WORKFLOW SUITE ===');

// =========================================================================
// 1. UPDATE rest_apis.now.ts (ADD /participant/auth ROUTE)
// =========================================================================
let apiRoutes = fs.readFileSync('src/fluent/rest_apis.now.ts', 'utf8');

if (!apiRoutes.includes('handleParticipantAuth')) {
    apiRoutes = apiRoutes.replace(
        "import {\n    handleGetPublicEvents,",
        "import {\n    handleGetPublicEvents,\n    handleParticipantAuth,"
    );

    const authRoute = `        {
            $id: Now.ID['route_participant_auth'],
            name: 'participant_auth',
            path: '/participant/auth',
            method: 'POST',
            handler: handleParticipantAuth,
            consumes: ['application/json'],
            produces: ['application/json'],
            requiresAuthentication: false,
        },`;

    const lastRouteMarker = "path: '/refund/request',";
    const lastRouteIdx = apiRoutes.indexOf(lastRouteMarker);
    if (lastRouteIdx !== -1) {
        const routeEndIdx = apiRoutes.indexOf('},', lastRouteIdx);
        apiRoutes = apiRoutes.slice(0, routeEndIdx + 2) + '\n' + authRoute + apiRoutes.slice(routeEndIdx + 2);
        console.log('  -> Added /participant/auth route to rest_apis.now.ts');
    }

    fs.writeFileSync('src/fluent/rest_apis.now.ts', apiRoutes, 'utf8');
}

console.log('API routes configured.');
