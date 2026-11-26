const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== FIXING XML VALIDITY AND INJECTING DYNAMIC LOGO ===');

// 1. Read the logo as Base64
const logoPath = path.resolve('KonnectFest Wallet Network Logo.jpg');
const logoBase64 = fs.readFileSync(logoPath).toString('base64');
const logoDataUri = 'data:image/jpeg;base64,' + logoBase64;
console.log('1. Read official logo:', logoBase64.length, 'chars base64');

// 2. Client-side logo injection script snippet
const logoInitCode = `
// Dynamic Logo Applier for ServiceNow Native UI
var KF_OFFICIAL_LOGO = "${logoDataUri}";
function applyKonnectFestLogo() {
    try {
        var imgs = document.querySelectorAll('.sn-logo-img');
        for (var i = 0; i < imgs.length; i++) {
            if (!imgs[i].src || imgs[i].src.indexOf('data:') !== 0) {
                imgs[i].src = KF_OFFICIAL_LOGO;
            }
        }
    } catch(e) {
        console.error('Error applying logo:', e);
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyKonnectFestLogo);
} else {
    setTimeout(applyKonnectFestLogo, 20);
}
`;

// 3. Process each HTML file in src/fluent/pages
const pagesDir = path.resolve('src/fluent/pages');
const htmlFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove huge inline data URI from img tags if present to keep Jelly XML small
    content = content.replace(/src="data:image\/[^"]+"/g, 'src=""');

    // Replace bare unescaped ampersands in comments, text, attributes
    content = content.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');

    // Specifically clean up common patterns
    content = content.replace(/&amp;&amp;/g, '&amp;');
    content = content.replace(/\/\* SERVICENOW FORM &amp; CARD SECTIONS \*\//g, '/* SERVICENOW FORM and CARD SECTIONS */');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`2. Sanitized XML for ${file} (${content.length} bytes)`);
});

// 4. Validate all HTML files using Python's xml.etree.ElementTree
console.log('3. Validating XML well-formedness:');
const pyValidation = `
import xml.etree.ElementTree as ET
import glob, sys

all_valid = True
for f in glob.glob('src/fluent/pages/*.html'):
    try:
        with open(f, 'r', encoding='utf-8') as fp:
            c = fp.read()
        ET.fromstring(c)
        print('  [PASS]', f)
    except Exception as e:
        print('  [FAIL]', f, e)
        all_valid = False

if not all_valid:
    sys.exit(1)
`;
fs.writeFileSync('scripts/temp_validate.py', pyValidation, 'utf8');
try {
    execSync('python scripts/temp_validate.py', { stdio: 'inherit' });
    console.log('ALL HTML FILES ARE 100% VALID XML!');
} catch (e) {
    console.error('XML VALIDATION FAILED! Aborting deployment.');
    process.exit(1);
}

// 5. Update restEndpoints.ts to include the dynamic logo applier in CLIENT_SCRIPTS
const restPath = path.resolve('src/server/restEndpoints.ts');
let restCode = fs.readFileSync(restPath, 'utf8');

const marker = 'const CLIENT_SCRIPTS: Record<string, string> = ';
const idx = restCode.indexOf(marker);
if (idx !== -1) {
    const nextFunc = restCode.indexOf('export function handleGetPublicScript', idx);
    let rawJson = restCode.substring(idx + marker.length, nextFunc).trim();
    if (rawJson.endsWith(';')) rawJson = rawJson.slice(0, -1).trim();

    try {
        const clientScripts = JSON.parse(rawJson);
        ['organizer', 'register', 'finance', 'vendor', 'participant'].forEach(k => {
            if (clientScripts[k] && !clientScripts[k].includes('applyKonnectFestLogo')) {
                clientScripts[k] = logoInitCode + '\n' + clientScripts[k];
                console.log(`4. Injected logo loader into CLIENT_SCRIPTS['${k}']`);
            }
        });
        const updatedJson = JSON.stringify(clientScripts) + ';\n\n';
        restCode = restCode.substring(0, idx + marker.length) + updatedJson + restCode.substring(nextFunc);
        fs.writeFileSync(restPath, restCode, 'utf8');
        console.log('5. Successfully updated src/server/restEndpoints.ts with CLIENT_SCRIPTS logo injection!');
    } catch (e) {
        console.warn('Could not parse CLIENT_SCRIPTS as JSON directly:', e.message);
    }
}

console.log('=== READY FOR BUILD & INSTALL ===');
