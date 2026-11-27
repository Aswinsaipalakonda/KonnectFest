import json, os

# 1. Load scripts
with open('scripts/ultimate_client_scripts.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# We can run node to get allScripts as JSON
os.system("node -e \"const { organizerScript, financeScript } = require('./scripts/ultimate_client_scripts'); const fs = require('fs'); const p4 = fs.readFileSync('scripts/deployClientScriptsPart4.js', 'utf8'); function extractVar(content, varName) { const startMarker = 'const ' + varName + ' = `'; const startIdx = content.indexOf(startMarker); const codeStart = startIdx + startMarker.length; const endIdx = content.indexOf('`;\\n', codeStart); return content.substring(codeStart, endIdx); } const reg = extractVar(p4, 'registerClientScript'); const part = extractVar(p4, 'participantClientScript'); const ven = extractVar(p4, 'vendorClientScript'); fs.writeFileSync('scripts/temp_all_scripts.json', JSON.stringify({ organizer: organizerScript, finance: financeScript, register: reg, participant: part, vendor: ven }), 'utf8');\"")

with open('scripts/temp_all_scripts.json', 'r', encoding='utf-8') as f:
    all_scripts = json.load(f)

print('Loaded all scripts:')
for k, v in all_scripts.items():
    print(f'  {k}: {len(v)} chars')

# 2. Update restEndpoints.ts
with open('src/server/restEndpoints.ts', 'r', encoding='utf-8') as f:
    content = f.read()

marker = 'const CLIENT_SCRIPTS: Record<string, string> = '
p1 = content.find(marker)
if p1 == -1:
    raise Exception('Marker not found')

p2 = content.find(';\n', p1)
if p2 == -1:
    raise Exception('Closing semicolon not found')

new_declaration = marker + json.dumps(all_scripts) + ';'
updated_content = content[:p1] + new_declaration + content[p2+1:]

with open('src/server/restEndpoints.ts', 'w', encoding='utf-8') as f:
    f.write(updated_content)

print(f'Successfully replaced CLIENT_SCRIPTS from {p1} to {p2+1} in restEndpoints.ts!')
