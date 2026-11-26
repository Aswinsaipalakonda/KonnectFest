const fs = require('fs');
const { execSync } = require('child_process');

console.log('1. Building ServiceNow Polaris UI Pages & Client Scripts...');
execSync('node scripts/buildServiceNowNativeOrganizer.js', { stdio: 'inherit' });

console.log('2. Updating src/server/restEndpoints.ts...');
const clientScripts = JSON.parse(fs.readFileSync('src/server/clientScriptBundles.json', 'utf8'));
let code = fs.readFileSync('src/server/restEndpoints.ts', 'utf8');

// Replace CLIENT_SCRIPTS definition
const marker = 'const CLIENT_SCRIPTS: Record<string, string> =';
const start = code.indexOf(marker);
if (start !== -1) {
    const end = code.indexOf('export function handleGetPublicScript', start);
    code = code.substring(0, start) + `const CLIENT_SCRIPTS: Record<string, string> = ${JSON.stringify(clientScripts)};\n\n` + code.substring(end);
}

// Add update_event support in handleOrganizerEventAction
const targetSearch = `        if (action === 'create') {`;
const updateActionLogic = `        if (action === 'update_event' || action === 'update_upi') {
            const evId = body.event_sys_id
            const evGr = new GlideRecord('x_2327324_konnect_event')
            let found = false
            if (evId && evGr.get(evId)) {
                found = true
            } else {
                evGr.query()
                if (evGr.next()) found = true
            }
            if (!found) {
                response.setStatus(404)
                response.setBody({ success: false, message: 'Event record not found.' })
                return
            }
            if (body.name) evGr.setValue('name', body.name)
            if (body.upi_id) evGr.setValue('upi_id', body.upi_id)
            if (body.upi_payee_name) evGr.setValue('upi_payee_name', body.upi_payee_name)
            if (body.state) {
                const oldSt = evGr.getValue('state')
                evGr.setValue('state', body.state)
                if (body.state === 'completed') evGr.setValue('redemption_window_open', true)
                else if (body.state === 'closed') evGr.setValue('redemption_window_open', false)
            }
            if (body.description) evGr.setValue('description', body.description)
            evGr.update()
            logAudit(evGr.getUniqueValue(), 'EVENT_UPDATED', evGr.getValue('name'), 'previous', evGr.getValue('state'), 'Event configuration and receiving UPI ID updated')
            response.setStatus(200)
            response.setBody({
                success: true,
                message: \`Event "\${evGr.getValue('name')}" and receiving UPI ID (\${evGr.getValue('upi_id')}) updated successfully!\`,
                event: {
                    sys_id: evGr.getUniqueValue(),
                    name: evGr.getValue('name'),
                    upi_id: evGr.getValue('upi_id'),
                    upi_payee_name: evGr.getValue('upi_payee_name'),
                    state: evGr.getValue('state')
                }
            })
            return
        }

        if (action === 'create') {`;

if (!code.includes("action === 'update_event'")) {
    code = code.replace(targetSearch, updateActionLogic);
    console.log('Injected update_event handler into handleOrganizerEventAction');
}

fs.writeFileSync('src/server/restEndpoints.ts', code, 'utf8');
console.log('Saved src/server/restEndpoints.ts');
