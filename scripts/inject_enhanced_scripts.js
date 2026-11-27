const fs = require('fs');
const { organizerScript, financeScript } = require('./ultimate_client_scripts');

console.log('Injecting enhanced scripts into restEndpoints.ts...');

const restPath = 'src/server/restEndpoints.ts';
let content = fs.readFileSync(restPath, 'utf8');

const markerStart = 'const CLIENT_SCRIPTS: Record<string, string> = ';
const idxStart = content.indexOf(markerStart);
if (idxStart === -1) {
    console.error('Could not find CLIENT_SCRIPTS marker');
    process.exit(1);
}

const posBrace = idxStart + markerStart.length;

// Balance matching curly braces
let depth = 0;
let inString = false;
let escape = false;
let endIdx = -1;

for (let i = posBrace; i < content.length; i++) {
    const ch = content[i];
    if (escape) {
        escape = false;
        continue;
    }
    if (ch === '\\\\') {
        escape = true;
        continue;
    }
    if (ch === '"') {
        inString = !inString;
        continue;
    }
    if (!inString) {
        if (ch === '{') depth++;
        else if (ch === '}') {
            depth--;
            if (depth === 0) {
                endIdx = i + 1;
                break;
            }
        }
    }
}

if (endIdx === -1) {
    console.error('Could not find matching closing brace for CLIENT_SCRIPTS JSON');
    process.exit(1);
}

const jsonString = content.substring(posBrace, endIdx);
console.log('Found CLIENT_SCRIPTS JSON of length:', jsonString.length);

let scriptsObj;
try {
    scriptsObj = JSON.parse(jsonString);
} catch (e) {
    console.error('JSON parse error:', e.message);
    process.exit(1);
}

console.log('Existing keys:', Object.keys(scriptsObj));

// Update organizer and finance scripts
scriptsObj.organizer = organizerScript;
scriptsObj.finance = financeScript;

const newJsonString = JSON.stringify(scriptsObj);
const newContent = content.substring(0, posBrace) + newJsonString + content.substring(endIdx);

fs.writeFileSync(restPath, newContent, 'utf8');
console.log('SUCCESS! Updated restEndpoints.ts with enhanced organizer and finance scripts.');
