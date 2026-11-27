const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== PATCHING ALL CLIENT FETCH CALLS WITH CREDENTIALS: OMIT ===');

const restPath = path.resolve('src/server/restEndpoints.ts');
let code = fs.readFileSync(restPath, 'utf8');

const marker = 'const CLIENT_SCRIPTS: Record<string, string> = ';
const idx = code.indexOf(marker);
const nextFunc = code.indexOf('export function handleGetPublicScript', idx);
let rawJson = code.substring(idx + marker.length, nextFunc).trim();
if (rawJson.endsWith(';')) rawJson = rawJson.slice(0, -1).trim();

const scripts = JSON.parse(rawJson);

for (const role of ['organizer', 'finance', 'vendor', 'participant', 'register']) {
    let script = scripts[role] || '';
    
    // In every fetch options object, ensure credentials: 'omit' is present
    // First, for POST calls
    script = script.replace(/method:\s*['"]POST['"],(?!\s*credentials)/g, "method: 'POST',\n        credentials: 'omit',");
    
    // For GET calls with options or headers
    script = script.replace(/headers:\s*apiHeaders\((true|false)\)/g, "credentials: 'omit', headers: apiHeaders($1)");

    // In organizer script, fix all 5 fetch calls specifically
    if (role === 'organizer') {
        // GET overview
        script = script.replace(
            "fetch('/api/x_2327324_konnect/konnectfest/organizer/overview')",
            "fetch('/api/x_2327324_konnect/konnectfest/organizer/overview', { credentials: 'omit' })"
        );
        // POST event / vendor
        script = script.replace(
            /fetch\('\/api\/x_2327324_konnect\/konnectfest\/organizer\/(event|vendor)',\s*\{/g,
            "fetch('/api/x_2327324_konnect/konnectfest/organizer/$1', {\n        credentials: 'omit',"
        );
    }

    scripts[role] = script;
    console.log(`Patched fetch calls for: ${role}`);
}

const updatedJson = JSON.stringify(scripts) + ';\n\n';
code = code.substring(0, idx + marker.length) + updatedJson + code.substring(nextFunc);
fs.writeFileSync(restPath, code, 'utf8');
console.log('Successfully updated CLIENT_SCRIPTS in src/server/restEndpoints.ts!');

// Build and install
console.log('Building with now-sdk build...');
execSync('now-sdk build', { stdio: 'inherit' });

console.log('Installing to ServiceNow with now-sdk install...');
execSync('now-sdk install -a konnectfest-dev', { stdio: 'inherit' });

console.log('=== ALL WORKSPACES UPDATED & DEPLOYED ===');
