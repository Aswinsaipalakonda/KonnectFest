const fs = require('fs');
const restPath = 'src/server/restEndpoints.ts';
let code = fs.readFileSync(restPath, 'utf8');

const marker = 'const CLIENT_SCRIPTS: Record<string, string> = ';
const idx = code.indexOf(marker);
const nextFunc = code.indexOf('export function handleGetPublicScript', idx);
let rawJson = code.substring(idx + marker.length, nextFunc).trim();
if (rawJson.endsWith(';')) rawJson = rawJson.slice(0, -1).trim();

const scripts = JSON.parse(rawJson);

// In register script, replace fetch call options to use credentials: 'omit'
scripts['register'] = scripts['register'].replace(
    /method:\s*['"]POST['"],/g,
    "method: 'POST',\n        credentials: 'omit',"
);

// Also simplify headers to pure application/json when omitting credentials
scripts['register'] = scripts['register'].replace(
    /headers:\s*\(function\(\)[\s\S]*?\}\)\(\),/g,
    "headers: { 'Content-Type': 'application/json' },"
);

const newJson = JSON.stringify(scripts) + ';\n\n';
code = code.substring(0, idx + marker.length) + newJson + code.substring(nextFunc);
fs.writeFileSync(restPath, code, 'utf8');
console.log('Successfully updated CLIENT_SCRIPTS[register] with credentials: omit!');
