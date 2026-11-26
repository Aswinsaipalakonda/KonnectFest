const fs = require('fs');
const path = require('path');

function stripImports(code) {
    return code
        .replace(/import\s+{[^}]+}\s+from\s+['"]@servicenow\/glide['"]/g, '')
        .replace(/import\s+{[^}]+}\s+from\s+['"]\.\/[^'"]+['"]/g, '');
}

const ws = stripImports(fs.readFileSync('src/server/walletService.ts', 'utf8'));
const ps = stripImports(fs.readFileSync('src/server/paymentService.ts', 'utf8'));
const qs = stripImports(fs.readFileSync('src/server/qrService.ts', 'utf8'));
const ss = stripImports(fs.readFileSync('src/server/settlementService.ts', 'utf8'));
const re = stripImports(fs.readFileSync('src/server/restEndpoints.ts', 'utf8'));

const combined = `import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide'

// ==========================================
// 1. WALLET SERVICE
// ==========================================
${ws}

// ==========================================
// 2. PAYMENT SERVICE
// ==========================================
${ps}

// ==========================================
// 3. QR SERVICE (120s TTL)
// ==========================================
${qs}

// ==========================================
// 4. SETTLEMENT SERVICE
// ==========================================
${ss}

// ==========================================
// 5. REST ENDPOINTS HANDLERS
// ==========================================
${re}
`;

fs.writeFileSync('src/server/restEndpoints.ts', combined, 'utf8');
console.log('Successfully bundled server services into src/server/restEndpoints.ts. Total size:', combined.length);
