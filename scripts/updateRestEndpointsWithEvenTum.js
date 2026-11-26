const fs = require('fs');

// 1. Read client scripts JSON
const clientScripts = JSON.parse(fs.readFileSync('src/server/clientScriptBundles.json', 'utf8'));

// 2. Read restEndpoints.ts
let code = fs.readFileSync('src/server/restEndpoints.ts', 'utf8');

// Replace CLIENT_SCRIPTS definition
const marker = 'const CLIENT_SCRIPTS: Record<string, string> =';
const start = code.indexOf(marker);
if (start !== -1) {
    const end = code.indexOf('export function handleGetPublicScript', start);
    code = code.substring(0, start) + `const CLIENT_SCRIPTS: Record<string, string> = ${JSON.stringify(clientScripts)};\n\n` + code.substring(end);
} else {
    code += `\nconst CLIENT_SCRIPTS: Record<string, string> = ${JSON.stringify(clientScripts)};\n`;
}

// Ensure handleOrganizerOverview reads vendor_stall and registrations
const oldVenBlock = `        const vendors: any[] = []
        const venGr = new GlideRecord('x_2327324_konnect_vendor')`;

const newVenBlock = `        const vendors: any[] = []
        const venGr = new GlideRecord('x_2327324_konnect_vendor')
        venGr.orderBy('name')
        venGr.query()
        while (venGr.next()) {
            const vId = venGr.getUniqueValue()
            let vSales = 0
            let vTxCount = 0
            let vStallNum = venGr.getValue('stall_number') || ''
            let vCat = venGr.getValue('category') || ''
            let vUnsettled = 0

            // Check vendor_stall record
            const stGr = new GlideRecord('x_2327324_konnect_vendor_stall')
            stGr.addQuery('vendor', vId)
            stGr.query()
            if (stGr.next()) {
                vSales = parseFloat(stGr.getValue('total_sales') || '0')
                vTxCount = parseInt(stGr.getValue('transaction_count') || '0', 10)
                vStallNum = stGr.getValue('stall_number') || vStallNum
                vCat = stGr.getValue('stall_category') || vCat
                vUnsettled = parseFloat(stGr.getValue('unsettled_balance') || '0')
            }

            // Fallback to vendor_ledger if stalls not populated
            if (vSales === 0) {
                const vlGr = new GlideRecord('x_2327324_konnect_vendor_ledger')
                vlGr.addQuery('vendor', vId)
                vlGr.query()
                while (vlGr.next()) {
                    vTxCount++
                    vSales += parseFloat(vlGr.getValue('credit_amount') || '0')
                }
            }

            vendors.push({
                sys_id: vId,
                number: venGr.getValue('number') || '',
                name: venGr.getValue('name') || '',
                stall_number: vStallNum || 'Stall #01',
                category: vCat || 'food_beverage',
                status: venGr.getValue('status') || 'active',
                event: venGr.getDisplayValue('event') || 'KonnectFest 2026',
                event_sys_id: venGr.getValue('event') || '',
                total_sales: vSales,
                tx_count: vTxCount,
                unsettled_balance: vUnsettled || vSales,
            })
        }

        // Query Registrations for attendees tab
        const registrations: any[] = []
        const rGr = new GlideRecord('x_2327324_konnect_registration')
        rGr.orderByDesc('sys_created_on')
        rGr.setLimit(25)
        rGr.query()
        while (rGr.next()) {
            registrations.push({
                sys_id: rGr.getUniqueValue(),
                full_name: rGr.getValue('full_name') || '',
                email: rGr.getValue('email') || '',
                phone: rGr.getValue('phone') || '',
                initial_wallet_amount: parseFloat(rGr.getValue('initial_wallet_amount') || '0'),
                status: rGr.getValue('status') || 'payment_pending',
                payment_reference: rGr.getValue('payment_reference') || '',
                event: rGr.getDisplayValue('event') || 'KonnectFest 2026',
            })
        }`;

if (code.includes(oldVenBlock)) {
    code = code.replace(oldVenBlock, newVenBlock);
    // Also include registrations in response body
    code = code.replace(
        'auditLogs,',
        'auditLogs,\n                registrations,'
    );
    console.log('Updated handleOrganizerOverview logic with stall telemetry & registrations');
}

fs.writeFileSync('src/server/restEndpoints.ts', code, 'utf8');
console.log('Updated src/server/restEndpoints.ts successfully');
