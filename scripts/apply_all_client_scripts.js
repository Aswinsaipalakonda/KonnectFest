const fs = require('fs');
const { organizerScript, financeScript } = require('./ultimate_client_scripts');

console.log('=== PREPARING FINAL CLIENT SCRIPTS INJECTION ===');

// 1. Extract register, participant, and vendor scripts from deployClientScriptsPart4.js
const p4 = fs.readFileSync('scripts/deployClientScriptsPart4.js', 'utf8');

function extractVar(content, varName) {
    const startMarker = `const ${varName} = \``;
    const startIdx = content.indexOf(startMarker);
    if (startIdx === -1) throw new Error('Could not find ' + varName);
    const codeStart = startIdx + startMarker.length;
    const endIdx = content.indexOf('`;\n', codeStart);
    if (endIdx === -1) throw new Error('Could not find closing for ' + varName);
    return content.substring(codeStart, endIdx);
}

const registerScript = extractVar(p4, 'registerClientScript');
const participantScript = extractVar(p4, 'participantClientScript');
const vendorScript = extractVar(p4, 'vendorClientScript');

console.log('Extracted scripts lengths:');
console.log('  register:', registerScript.length);
console.log('  participant:', participantScript.length);
console.log('  vendor:', vendorScript.length);
console.log('  organizer:', organizerScript.length);
console.log('  finance:', financeScript.length);

const allScripts = {
    organizer: organizerScript,
    finance: financeScript,
    register: registerScript,
    participant: participantScript,
    vendor: vendorScript,
};

// 2. Read restEndpoints.ts
const restPath = 'src/server/restEndpoints.ts';
const restContent = fs.readFileSync(restPath, 'utf8');

const marker = 'const CLIENT_SCRIPTS: Record<string, string> = ';
const p1 = restContent.indexOf(marker);
if (p1 === -1) {
    console.error('Could not find CLIENT_SCRIPTS marker in restEndpoints.ts');
    process.exit(1);
}

// Find the semicolon closing the CLIENT_SCRIPTS statement
// The statement ends before "/**" or "export function handleParticipantLogin"
const nextSection = restContent.indexOf('/**\n * 6. PARTICIPANT:', p1);
let pEnd = -1;
if (nextSection !== -1) {
    pEnd = restContent.lastIndexOf(';', nextSection) + 1;
} else {
    pEnd = restContent.indexOf(';\n', p1) + 1;
}

console.log('Replacing CLIENT_SCRIPTS from', p1, 'to', pEnd);

const newDeclaration = marker + JSON.stringify(allScripts) + ';';
const updatedContent = restContent.substring(0, p1) + newDeclaration + restContent.substring(pEnd);

fs.writeFileSync(restPath, updatedContent, 'utf8');
console.log('Successfully injected all 5 client scripts into restEndpoints.ts!');
