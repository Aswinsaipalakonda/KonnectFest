const fs = require('fs')
const path = require('path')

const qrCodeJsPath = path.resolve(process.cwd(), 'node_modules/qrcode-generator/dist/qrcode.js')
const qrCodeLibSource = fs.readFileSync(qrCodeJsPath, 'utf8')

const SHARED_CSS = `
:root {
    --primary: #0f4c81;
    --primary-dark: #09355c;
    --primary-light: #e0f2fe;
    --accent: #00897b;
    --accent-hover: #00695c;
    --bg: #f1f5f9;
    --card: #ffffff;
    --text: #0f172a;
    --muted: #64748b;
    --border: #e2e8f0;
    --success: #059669;
    --success-bg: #d1fae5;
    --warning: #d97706;
    --warning-bg: #fef3c7;
    --danger: #dc2626;
    --danger-bg: #fee2e2;
    --radius: 12px;
    --shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
}
* { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif; }
body { background: var(--bg); color: var(--text); line-height: 1.5; padding-bottom: 64px; }
.topbar { background: linear-gradient(135deg, #0f172a 0%, #0f4c81 100%); color: #fff; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.12); position: sticky; top: 0; z-index: 40; }
.topbar-brand { display: flex; align-items: center; gap: 10px; }
.topbar-brand h1 { font-size: 20px; font-weight: 800; letter-spacing: -0.4px; }
.role-pill { background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.25); padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; }
.container { max-width: 1180px; margin: 24px auto; padding: 0 16px; }
.container-sm { max-width: 640px; margin: 20px auto; padding: 0 16px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
@media (max-width: 900px) { .grid-4 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 720px) { .grid-2, .grid-4 { grid-template-columns: 1fr; } }
.card { background: var(--card); border-radius: var(--radius); padding: 22px; border: 1px solid var(--border); box-shadow: var(--shadow); margin-bottom: 20px; }
.card-title { font-size: 17px; font-weight: 700; margin-bottom: 6px; color: var(--text); }
.card-sub { font-size: 13px; color: var(--muted); margin-bottom: 16px; }
.kpi-card { background: var(--card); border-radius: var(--radius); padding: 18px 20px; border: 1px solid var(--border); box-shadow: var(--shadow); transition: transform 0.15s; }
.kpi-card:hover { transform: translateY(-2px); }
.kpi-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; color: var(--muted); }
.kpi-value { font-size: 26px; font-weight: 800; color: var(--primary); margin-top: 6px; }
.tabs { display: flex; gap: 8px; margin-bottom: 20px; overflow-x: auto; padding-bottom: 4px; }
.tab-btn { padding: 10px 16px; border-radius: 8px; border: 1px solid var(--border); background: #fff; color: var(--muted); font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.2s; }
.tab-btn.active { background: var(--primary); color: #fff; border-color: var(--primary); box-shadow: 0 2px 8px rgba(15,76,129,0.25); }
.form-group { margin-bottom: 14px; }
.form-label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--text); }
.form-input, .form-select { width: 100%; padding: 10px 13px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; background: #fff; color: var(--text); }
.form-input:focus, .form-select:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(15,76,129,0.14); }
.btn { padding: 11px 18px; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.15s; text-decoration: none; }
.btn-block { width: 100%; }
.btn-primary { background: var(--primary); color: #fff; }
.btn-primary:hover { background: var(--primary-dark); }
.btn-accent { background: var(--accent); color: #fff; }
.btn-accent:hover { background: var(--accent-hover); }
.btn-warning { background: var(--warning); color: #fff; }
.btn-danger { background: var(--danger); color: #fff; }
.btn-outline { background: #fff; color: var(--primary); border: 1px solid var(--primary); }
.btn-sm { padding: 6px 12px; font-size: 12px; border-radius: 6px; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 13px; }
th, td { padding: 11px 14px; text-align: left; border-bottom: 1px solid var(--border); }
th { background: #f8fafc; font-weight: 700; color: #475569; font-size: 12px; text-transform: uppercase; letter-spacing: 0.4px; }
tr:hover td { background: #f8fafc; }
.badge { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
.badge-success { background: var(--success-bg); color: var(--success); }
.badge-warning { background: var(--warning-bg); color: var(--warning); }
.badge-danger { background: var(--danger-bg); color: var(--danger); }
.badge-info { background: var(--primary-light); color: var(--primary); }
.alert { padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; display: none; font-weight: 500; }
.alert-success { background: var(--success-bg); color: #065f46; border: 1px solid #6ee7b7; }
.alert-error { background: var(--danger-bg); color: #991b1b; border: 1px solid #fca5a5; }
.alert-info { background: var(--primary-light); color: #075985; border: 1px solid #7dd3fc; }
.qr-box { background: #fff; border: 2px solid var(--border); border-radius: 12px; padding: 18px; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.qr-box svg { width: 200px; height: 200px; display: block; }
.modal-backdrop { display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); z-index: 100; align-items: center; justify-content: center; padding: 16px; backdrop-filter: blur(3px); }
.modal-card { background: #fff; border-radius: 14px; width: 100%; max-width: 460px; padding: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
.progress-track { width: 100%; height: 8px; background: #e2e8f0; border-radius: 999px; overflow: hidden; margin: 10px 0; }
.progress-fill { height: 100%; background: var(--accent); transition: width 1s linear; }
`

const SHARED_CLIENT_JS = `
${qrCodeLibSource}

function renderQRCode(containerEl, text, cellSize) {
    if (!containerEl) return;
    try {
        var qr = qrcode(0, 'M');
        qr.addData(text);
        qr.make();
        containerEl.innerHTML = qr.createSvgTag({ cellSize: cellSize || 5, margin: 2, scalable: true });
    } catch (e) {
        containerEl.innerHTML = '<div style="color:#dc2626;font-size:12px;">QR render error: ' + e.message + '</div>';
    }
}

function apiHeaders(isJson) {
    var h = {};
    if (isJson) h['Content-Type'] = 'application/json';
    if (window.g_ck) h['X-UserToken'] = window.g_ck;
    return h;
}

function showBanner(elId, msg, type) {
    var el = document.getElementById(elId);
    if (!el) return;
    el.className = 'alert alert-' + (type || 'info');
    el.textContent = msg;
    el.style.display = 'block';
    setTimeout(function() { el.style.display = 'none'; }, 7000);
}

function formatINR(val) {
    var n = parseFloat(val || 0);
    return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
`

function buildJellyHtml(title, bodyHtml, pageScript, injectToken) {
    const tokenEval = injectToken ? `<g:evaluate var="jvar_ck">gs.getSessionToken();</g:evaluate>` : ''
    const tokenScript = injectToken ? `window.g_ck = '\${jvar_ck}';` : ''
    return `<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
${tokenEval}
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
${SHARED_CSS}
    </style>
</head>
<body>
${bodyHtml}
<script>
//<![CDATA[
${tokenScript}
${SHARED_CLIENT_JS}
${pageScript}
//]]>
</script>
</body>
</html>
</j:jelly>`
}

const outDir = path.resolve(process.cwd(), 'src/client')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

// Export helper for reuse or run directly
module.exports = { buildJellyHtml }
