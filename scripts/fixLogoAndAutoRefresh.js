const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { logoInitCode, logoDataUri } = require('./systemBuilderShared');

console.log('=== FIXING LOGO, TELEMETRY 5S AUTO-REFRESH & CLIENT SCRIPTS ===');

// 1. Update all HTML files to embed logoDataUri directly in <img class="sn-logo-img" ... />
const pagesDir = path.resolve('src/fluent/pages');
const htmlFiles = ['organizer.html', 'participant.html', 'register.html', 'finance.html', 'vendor.html'];

htmlFiles.forEach(file => {
    const fPath = path.join(pagesDir, file);
    if (!fs.existsSync(fPath)) return;
    let html = fs.readFileSync(fPath, 'utf8');
    
    // Replace empty src or placeholder with actual base64 data URI
    html = html.replace(/<img\s+src="[^"]*"\s+alt="KonnectFest Logo"\s+class="sn-logo-img"\s*\/>/g,
        `<img src="${logoDataUri}" alt="KonnectFest Logo" class="sn-logo-img" />`);
    
    fs.writeFileSync(fPath, html, 'utf8');
    console.log(`Updated inline logo in ${file}`);
});

// 2. Validate XML
execSync('python scripts/temp_validate.py', { stdio: 'inherit' });

// 3. Read buildCompleteSystem.js to extract scripts
const bcsPath = path.resolve('scripts/buildCompleteSystem.js');
const bcsContent = fs.readFileSync(bcsPath, 'utf8');

const pStart = bcsContent.indexOf('const participantScript = `');
const pEnd = bcsContent.indexOf('const registerBody = `', pStart);
let participantScript = bcsContent.substring(pStart + 'const participantScript = `'.length, pEnd).trim().replace(/`;\s*$/, '');

const rStart = bcsContent.indexOf('const registerScript = `');
const rEnd = bcsContent.indexOf('const financeBody = `', rStart);
let registerScript = bcsContent.substring(rStart + 'const registerScript = `'.length, rEnd).trim().replace(/`;\s*$/, '');

const fStart = bcsContent.indexOf('const financeScript = `');
const fEnd = bcsContent.indexOf('// ==============================================================\n// 7. WRITE THE HTML TEMPLATES', fStart);
let financeScript = bcsContent.substring(fStart + 'const financeScript = `'.length, fEnd).trim().replace(/`;\s*$/, '');

// Replace literal ${logoInitCode} with actual evaluated code
participantScript = participantScript.replace('${logoInitCode}', logoInitCode);
registerScript = registerScript.replace('${logoInitCode}', logoInitCode);
financeScript = financeScript.replace('${logoInitCode}', logoInitCode);

// Add 5-second automatic refresh intervals
if (!participantScript.includes('setInterval(loadParticipantDash, 5000)')) {
    participantScript += '\n// Auto-refresh participant wallet telemetry every 5s\nsetInterval(loadParticipantDash, 5000);\n';
}

if (!financeScript.includes('setInterval(loadFinanceQueues, 5000)')) {
    financeScript += '\n// Auto-refresh finance verification telemetry every 5s\nsetInterval(loadFinanceQueues, 5000);\n';
}

// 4. Update restEndpoints.ts
const restPath = path.resolve('src/server/restEndpoints.ts');
let restCode = fs.readFileSync(restPath, 'utf8');

const marker = 'const CLIENT_SCRIPTS: Record<string, string> = ';
const idx = restCode.indexOf(marker);
const nextFunc = restCode.indexOf('export function handleGetPublicScript', idx);

if (idx === -1 || nextFunc === -1) {
    throw new Error('Could not find CLIENT_SCRIPTS in restEndpoints.ts');
}

let rawJson = restCode.substring(idx + marker.length, nextFunc).trim();
if (rawJson.endsWith(';')) rawJson = rawJson.slice(0, -1).trim();

const clientScripts = JSON.parse(rawJson);
clientScripts['participant'] = participantScript;
clientScripts['register'] = registerScript;
clientScripts['finance'] = financeScript;

// In organizer, ensure 5-second auto-refresh and bulk allocate are present
let orgScript = clientScripts['organizer'] || '';
if (!orgScript.includes('setInterval(loadOverview, 5000)')) {
    orgScript += '\n// Auto-refresh organizer telemetry every 5s\nsetInterval(loadOverview, 5000);\n';
}
if (!orgScript.includes('bulkAllocateWallets')) {
    orgScript += `
function bulkAllocateWallets() {
    if (!confirm('Are you sure you want to initialize and credit wallets for all verified participant registrations?')) return;
    safeFetch('/api/x_2327324_konnect/konnectfest/organizer/bulk-allocate', {
        method: 'POST',
        body: JSON.stringify({ event_sys_id: activeEventSysId })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showBanner('snToast', d.message || 'Bulk wallet allocation complete!', d.success ? 'success' : 'error');
        loadOverview();
    })
    .catch(function(err) {
        showBanner('snToast', 'Error in bulk allocation: ' + err.message, 'error');
    });
}
`;
}
clientScripts['organizer'] = orgScript;

const updatedJson = JSON.stringify(clientScripts) + ';\n\n';
restCode = restCode.substring(0, idx + marker.length) + updatedJson + restCode.substring(nextFunc);

fs.writeFileSync(restPath, restCode, 'utf8');
console.log('Successfully updated restEndpoints.ts with fixed scripts & 5s auto-refresh timers!');
