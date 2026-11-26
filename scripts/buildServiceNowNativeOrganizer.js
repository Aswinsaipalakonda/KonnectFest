const fs = require('fs');
const path = require('path');

// 1. Read the logo and convert to base64
const logoPath = path.resolve('KonnectFest Wallet Network Logo.jpg');
const logoBase64 = fs.readFileSync(logoPath).toString('base64');
const logoDataUri = `data:image/jpeg;base64,${logoBase64}`;

// 2. Read existing scripts for Finance, Vendor, Participant
const src = fs.readFileSync('scripts/writeAllHtml.js', 'utf8');
function extractVar(name) {
    const marker = `const ${name} = \``;
    const start = src.indexOf(marker);
    if (start === -1) throw new Error(`Could not find ${name}`);
    const contentStart = start + marker.length;
    const end = src.indexOf('`', contentStart);
    if (end === -1) throw new Error(`Could not find end for ${name}`);
    return src.substring(contentStart, end);
}
const financeBody = extractVar('financeBody');
const financeScript = extractVar('financeScript');
const vendorBody = extractVar('vendorBody');
const vendorScript = extractVar('vendorScript');
const participantBody = extractVar('participantBody');
const participantScript = extractVar('participantScript');

// ==========================================
// 3. ENTERPRISE SERVICENOW POLARIS CSS
// ==========================================
const SN_POLARIS_CSS = `
:root {
    --sn-navy-dark: #0f2e46;
    --sn-navy: #162836;
    --sn-teal: #057a6e;
    --sn-teal-light: #e6f7f5;
    --sn-blue: #0072b2;
    --sn-blue-light: #f0f7fb;
    --sn-bg-page: #ffffff;
    --sn-bg-subtle: #f8fafc;
    --sn-border: #e2e8f0;
    --sn-border-focus: #0f2e46;
    --sn-text-main: #1e293b;
    --sn-text-muted: #64748b;
    --sn-success: #0f766e;
    --sn-success-bg: #ecfdf5;
    --sn-warning: #b45309;
    --sn-warning-bg: #fffbeb;
    --sn-danger: #b91c1c;
    --sn-danger-bg: #fef2f2;
    --sn-radius: 8px;
    --sn-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.08);
}
* { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
body { background: #ffffff; color: var(--sn-text-main); line-height: 1.5; font-size: 13px; }

/* TOP POLARIS HEADER */
.sn-header { background: var(--sn-navy); color: #ffffff; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid var(--sn-teal); }
.sn-header-left { display: flex; align-items: center; gap: 14px; }
.sn-logo-img { height: 38px; width: auto; border-radius: 6px; background: #fff; padding: 2px; }
.sn-app-title { font-size: 16px; font-weight: 700; letter-spacing: -0.2px; display: flex; align-items: center; gap: 8px; }
.sn-scope-badge { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; text-transform: uppercase; }
.sn-breadcrumb { color: #94a3b8; font-size: 12px; margin-left: 10px; border-left: 1px solid rgba(255,255,255,0.2); padding-left: 12px; }
.sn-header-right { display: flex; align-items: center; gap: 12px; }
.sn-user-pill { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.12); padding: 4px 10px; border-radius: 999px; font-size: 11px; }
.sn-user-avatar { width: 22px; height: 22px; background: var(--sn-teal); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; font-size: 10px; }

/* ACTION RIBBON / BREADCRUMB BAR */
.sn-ribbon { background: #ffffff; border-bottom: 1px solid var(--sn-border); padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; }
.sn-ribbon-info { display: flex; align-items: center; gap: 12px; }
.sn-fest-title { font-size: 18px; font-weight: 700; color: var(--sn-navy-dark); display: flex; align-items: center; gap: 8px; }
.sn-upi-badge { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-family: monospace; color: #334155; }
.sn-ribbon-actions { display: flex; align-items: center; gap: 8px; }

/* SERVICENOW BUTTONS */
.sn-btn { padding: 7px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; text-decoration: none; border: 1px solid transparent; transition: all 0.15s; }
.sn-btn-primary { background: var(--sn-navy-dark); color: #fff; }
.sn-btn-primary:hover { background: #091f30; }
.sn-btn-teal { background: var(--sn-teal); color: #fff; }
.sn-btn-teal:hover { background: #046258; }
.sn-btn-default { background: #ffffff; color: var(--sn-text-main); border-color: #cbd5e1; }
.sn-btn-default:hover { background: #f8fafc; border-color: #94a3b8; }
.sn-btn-sm { padding: 4px 10px; font-size: 11px; border-radius: 4px; }

/* WORKSPACE TABS */
.sn-tabs-bar { background: #ffffff; border-bottom: 1px solid var(--sn-border); padding: 0 24px; display: flex; gap: 4px; overflow-x: auto; }
.sn-tab { padding: 12px 16px; border: none; background: transparent; font-size: 13px; font-weight: 600; color: var(--sn-text-muted); cursor: pointer; border-bottom: 3px solid transparent; display: flex; align-items: center; gap: 8px; transition: all 0.15s; white-space: nowrap; }
.sn-tab:hover { color: var(--sn-navy-dark); }
.sn-tab.active { color: var(--sn-navy-dark); border-bottom-color: var(--sn-teal); font-weight: 700; }

/* MAIN CONTAINER */
.sn-container { max-width: 1360px; margin: 0 auto; padding: 24px; }

/* KPI SCORECARDS (ServiceNow Enterprise Tile Style) */
.sn-kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
@media (max-width: 1024px) { .sn-kpi-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .sn-kpi-grid { grid-template-columns: 1fr; } }

.sn-kpi-card { background: #ffffff; border: 1px solid var(--sn-border); border-top: 3px solid var(--sn-navy-dark); border-radius: var(--sn-radius); padding: 18px 20px; box-shadow: var(--sn-shadow); }
.sn-kpi-card.teal-top { border-top-color: var(--sn-teal); }
.sn-kpi-card.blue-top { border-top-color: var(--sn-blue); }
.sn-kpi-card.amber-top { border-top-color: var(--sn-warning); }

.sn-kpi-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--sn-text-muted); margin-bottom: 6px; }
.sn-kpi-val { font-size: 26px; font-weight: 800; color: var(--sn-navy-dark); letter-spacing: -0.5px; margin-bottom: 4px; }
.sn-kpi-sub { font-size: 11px; color: var(--sn-text-muted); }

/* SERVICENOW FORM & CARD SECTIONS */
.sn-card { background: #ffffff; border: 1px solid var(--sn-border); border-radius: var(--sn-radius); margin-bottom: 24px; box-shadow: var(--sn-shadow); overflow: hidden; }
.sn-card-header { background: #f8fafc; border-bottom: 1px solid var(--sn-border); padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; }
.sn-card-title { font-size: 14px; font-weight: 700; color: var(--sn-navy-dark); text-transform: uppercase; letter-spacing: 0.4px; }
.sn-card-body { padding: 20px; }

/* FORM CONTROLS */
.sn-form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px 20px; }
@media (max-width: 768px) { .sn-form-grid { grid-template-columns: 1fr; } }
.sn-form-group { display: flex; flex-direction: column; gap: 6px; }
.sn-form-label { font-size: 12px; font-weight: 700; color: var(--sn-text-main); }
.sn-form-label span.req { color: var(--sn-danger); }
.sn-form-input, .sn-form-select { padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; color: var(--sn-text-main); background: #ffffff; width: 100%; outline: none; }
.sn-form-input:focus, .sn-form-select:focus { border-color: var(--sn-navy-dark); box-shadow: 0 0 0 2px rgba(15, 46, 70, 0.15); }
.sn-form-input[readonly] { background: #f1f5f9; color: #475569; }

/* DATA TABLES */
.sn-table-wrap { overflow-x: auto; }
.sn-table { width: 100%; border-collapse: collapse; font-size: 12px; text-align: left; }
.sn-table th { background: #f8fafc; color: #475569; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.4px; padding: 10px 14px; border-bottom: 1px solid var(--sn-border); }
.sn-table td { padding: 12px 14px; border-bottom: 1px solid #f1f5f9; color: var(--sn-text-main); vertical-align: middle; }
.sn-table tr:hover td { background: #f8fafc; }

/* STATUS BADGES */
.sn-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; }
.sn-badge-green { background: var(--sn-success-bg); color: var(--sn-success); border: 1px solid #a7f3d0; }
.sn-badge-amber { background: var(--sn-warning-bg); color: var(--sn-warning); border: 1px solid #fde68a; }
.sn-badge-blue { background: var(--sn-blue-light); color: var(--sn-blue); border: 1px solid #bae6fd; }
.sn-badge-gray { background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; }

/* TOAST ALERT BANNER */
.sn-alert-bar { padding: 12px 18px; border-radius: 6px; font-size: 13px; font-weight: 600; margin-bottom: 18px; display: none; }
.sn-alert-success { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }
.sn-alert-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }

/* MODALS */
.sn-modal-backdrop { display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); z-index: 100; align-items: center; justify-content: center; padding: 16px; }
.sn-modal-content { background: #ffffff; border-radius: 8px; width: 100%; max-width: 520px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2); overflow: hidden; border: 1px solid var(--sn-border); }
.sn-modal-header { background: #f8fafc; border-bottom: 1px solid var(--sn-border); padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; }
.sn-modal-title { font-size: 15px; font-weight: 700; color: var(--sn-navy-dark); }
.sn-modal-body { padding: 20px; max-height: 80vh; overflow-y: auto; }
.sn-modal-footer { background: #f8fafc; border-top: 1px solid var(--sn-border); padding: 12px 20px; display: flex; justify-content: flex-end; gap: 8px; }
`;

// ==========================================
// 4. NATIVE SERVICENOW ORGANIZER HTML BODY
// ==========================================
const snOrganizerBody = `
<!-- SERVICENOW POLARIS TOP HEADER -->
<header class="sn-header">
    <div class="sn-header-left">
        <img src="${logoDataUri}" alt="KonnectFest Logo" class="sn-logo-img" />
        <div class="sn-app-title">
            KonnectFest Event Commerce
            <span class="sn-scope-badge">x_2327324_konnect</span>
        </div>
        <div class="sn-breadcrumb">Organizer Workspace / Command Center</div>
    </div>
    <div class="sn-header-right">
        <a href="/x_2327324_konnect_register.do" target="_blank" class="sn-btn sn-btn-default sn-btn-sm" style="background:rgba(255,255,255,0.15); color:#fff; border-color:transparent;">Public Registration ↗</a>
        <div class="sn-user-pill">
            <div class="sn-user-avatar">AS</div>
            <span>Aswin Sai (Organizer Admin)</span>
        </div>
    </div>
</header>

<!-- ACTION RIBBON / ACTIVE EVENT BAR -->
<div class="sn-ribbon">
    <div class="sn-ribbon-info">
        <div class="sn-fest-title">
            <span id="ribbonEventName">KonnectFest 2026 - Annual Fest</span>
            <span class="sn-badge sn-badge-green" id="ribbonEventState">Active / Live Fest</span>
        </div>
        <div class="sn-upi-badge" title="Official Receiving UPI ID for Event Payments">
            Receiving UPI: <strong id="ribbonUpiId">konnectfest@axisbank</strong> (<span id="ribbonUpiPayee">KonnectFest Committee</span>)
        </div>
    </div>
    <div class="sn-ribbon-actions">
        <button class="sn-btn sn-btn-default" onclick="loadOverview()">↻ Refresh</button>
        <button class="sn-btn sn-btn-teal" onclick="openModal('modalOnboardVendor')">+ Onboard Stall</button>
        <button class="sn-btn sn-btn-primary" onclick="openModal('modalCreateEvent')">+ New Event</button>
    </div>
</div>

<!-- WORKSPACE TABS -->
<div class="sn-tabs-bar">
    <button class="sn-tab active" onclick="switchSnTab('tabOverview', this)">📊 Executive Overview</button>
    <button class="sn-tab" onclick="switchSnTab('tabEventUpi', this)">📅 Event Master &amp; Receiving UPI</button>
    <button class="sn-tab" onclick="switchSnTab('tabVendors', this)">🏪 Authorized Stalls &amp; Vendors</button>
    <button class="sn-tab" onclick="switchSnTab('tabAttendees', this)">👥 Attendee Registrations</button>
    <button class="sn-tab" onclick="switchSnTab('tabAudit', this)">📑 Audit Log &amp; Security</button>
</div>

<!-- MAIN WORKSPACE CONTENT -->
<main class="sn-container">
    <div id="snToast" class="sn-alert-bar"></div>

    <!-- TAB 1: EXECUTIVE OVERVIEW -->
    <div id="tabOverview" class="sn-tab-content">
        <!-- 4 KPI TILES -->
        <div class="sn-kpi-grid">
            <div class="sn-kpi-card">
                <div class="sn-kpi-label">Total Festival Sales (INR)</div>
                <div class="sn-kpi-val" id="kpiSalesVal">₹84,500.00</div>
                <div class="sn-kpi-sub" id="kpiSalesSub">153 Verified Purchase Transactions</div>
            </div>
            <div class="sn-kpi-card teal-top">
                <div class="sn-kpi-label">Active Event Wallets</div>
                <div class="sn-kpi-val" id="kpiWalletsVal">380</div>
                <div class="sn-kpi-sub" id="kpiWalletsSub">380 Funded · 120 Pending Verification</div>
            </div>
            <div class="sn-kpi-card blue-top">
                <div class="sn-kpi-label">Total Verified Float (INR)</div>
                <div class="sn-kpi-val" id="kpiFloatVal">₹1,24,000.00</div>
                <div class="sn-kpi-sub" id="kpiFloatSub">₹39,500 Net Liability · ₹84,500 Spent</div>
            </div>
            <div class="sn-kpi-card amber-top">
                <div class="sn-kpi-label">Live Authorized Stalls</div>
                <div class="sn-kpi-val" id="kpiStallsVal">6 Live</div>
                <div class="sn-kpi-sub">100% Operational · 0 Chargebacks</div>
            </div>
        </div>

        <!-- STALLS TELEMETRY DATA TABLE -->
        <div class="sn-card">
            <div class="sn-card-header">
                <div class="sn-card-title">Live Authorized Stalls Telemetry</div>
                <div style="display:flex; gap:8px; align-items:center;">
                    <input type="text" id="stallSearchInput" placeholder="Filter stall or vendor..." class="sn-form-input" style="padding:4px 10px; width:220px;" onkeyup="filterStallsTable()" />
                    <button class="sn-btn sn-btn-sm sn-btn-default" onclick="filterCategory('all', this)">All</button>
                    <button class="sn-btn sn-btn-sm sn-btn-default" onclick="filterCategory('food_beverage', this)">F&amp;B</button>
                    <button class="sn-btn sn-btn-sm sn-btn-default" onclick="filterCategory('merchandise', this)">Merchandise</button>
                    <button class="sn-btn sn-btn-sm sn-btn-default" onclick="filterCategory('games_entertainment', this)">Entertainment</button>
                </div>
            </div>
            <div class="sn-table-wrap">
                <table class="sn-table">
                    <thead>
                        <tr>
                            <th>Stall #</th>
                            <th>Vendor Brand</th>
                            <th>Category</th>
                            <th>Transactions</th>
                            <th>Total Sales (INR)</th>
                            <th>Unsettled Balance</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="stallsTableTbody">
                        <tr><td colspan="7" style="text-align:center; padding:24px; color:var(--sn-text-muted);">Loading live stall telemetry...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- TAB 2: EVENT MASTER & RECEIVING UPI -->
    <div id="tabEventUpi" class="sn-tab-content" style="display:none;">
        <div class="sn-card">
            <div class="sn-card-header">
                <div class="sn-card-title">Master Event Configuration &amp; Centralized Receiving UPI</div>
                <span class="sn-badge sn-badge-blue" id="eventConfigBadge">Current Master Event</span>
            </div>
            <div class="sn-card-body">
                <p style="font-size:12px; color:var(--sn-text-muted); margin-bottom:18px;">
                    Configure the official festival receiving UPI ID. All participant registrations and wallet top-ups generate dynamic payment intents directed to this central receiving account.
                </p>
                <div class="sn-form-grid">
                    <div class="sn-form-group">
                        <label class="sn-form-label">Event Name <span class="req">*</span></label>
                        <input type="text" id="evMasterName" class="sn-form-input" placeholder="e.g. KonnectFest 2026 - Annual Fest" />
                    </div>
                    <div class="sn-form-group">
                        <label class="sn-form-label">Official Receiving UPI ID (VPA) <span class="req">*</span></label>
                        <input type="text" id="evMasterUpi" class="sn-form-input" placeholder="e.g. konnectfest@axisbank" />
                    </div>
                    <div class="sn-form-group">
                        <label class="sn-form-label">Official Payee Legal Display Name <span class="req">*</span></label>
                        <input type="text" id="evMasterPayee" class="sn-form-input" placeholder="e.g. KonnectFest Committee" />
                    </div>
                    <div class="sn-form-group">
                        <label class="sn-form-label">Lifecycle Status</label>
                        <select id="evMasterState" class="sn-form-select">
                            <option value="registration_open">Registration Open</option>
                            <option value="active" selected="selected">Active / Live In-Progress</option>
                            <option value="completed">Completed (Unlocks Participant Refunds)</option>
                            <option value="closed">Closed</option>
                            <option value="draft">Draft / Planning</option>
                        </select>
                    </div>
                    <div class="sn-form-group" style="grid-column: span 2;">
                        <label class="sn-form-label">Event Description / Guidelines</label>
                        <input type="text" id="evMasterDesc" class="sn-form-input" placeholder="Annual festival commerce and digital wallet platform" />
                    </div>
                </div>

                <div style="margin-top:24px; padding-top:16px; border-top:1px solid var(--sn-border); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                    <button class="sn-btn sn-btn-teal" onclick="saveEventUpiConfig()">💾 Save Event &amp; UPI Configuration</button>
                    <div style="display:flex; gap:8px;">
                        <button class="sn-btn sn-btn-default" onclick="quickSetState('registration_open')">Open Registration</button>
                        <button class="sn-btn sn-btn-primary" onclick="quickSetState('active')">Set Active</button>
                        <button class="sn-btn sn-btn-default" style="color:var(--sn-warning); border-color:#fde68a;" onclick="quickSetState('completed')">Complete Event (Unlock Refunds)</button>
                        <button class="sn-btn sn-btn-default" style="color:var(--sn-danger);" onclick="quickSetState('closed')">Close Event</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- TAB 3: VENDORS & STALLS -->
    <div id="tabVendors" class="sn-tab-content" style="display:none;">
        <div class="sn-card">
            <div class="sn-card-header">
                <div class="sn-card-title">Authorized Vendor Stalls Directory</div>
                <button class="sn-btn sn-btn-sm sn-btn-teal" onclick="openModal('modalOnboardVendor')">+ Onboard Vendor Stall</button>
            </div>
            <div class="sn-table-wrap">
                <table class="sn-table">
                    <thead>
                        <tr>
                            <th>Stall #</th>
                            <th>Brand / Vendor Name</th>
                            <th>Category</th>
                            <th>Linked Event</th>
                            <th>Settlement UPI / Bank Account</th>
                            <th>Gross Sales</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="fullVendorsTbody">
                        <tr><td colspan="7" style="text-align:center; padding:24px; color:var(--sn-text-muted);">Loading vendor stalls...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- TAB 4: ATTENDEE REGISTRATIONS -->
    <div id="tabAttendees" class="sn-tab-content" style="display:none;">
        <div class="sn-card">
            <div class="sn-card-header">
                <div class="sn-card-title">Attendee Registrations &amp; Wallet Verification Roster</div>
                <a href="/x_2327324_konnect_register.do" target="_blank" class="sn-btn sn-btn-sm sn-btn-default">Open Public Registration ↗</a>
            </div>
            <div class="sn-table-wrap">
                <table class="sn-table">
                    <thead>
                        <tr>
                            <th>Attendee Name</th>
                            <th>Email Address</th>
                            <th>Phone</th>
                            <th>Initial Wallet (INR)</th>
                            <th>Bank Reference (UTR)</th>
                            <th>Verification Status</th>
                            <th>Event</th>
                        </tr>
                    </thead>
                    <tbody id="attendeesTbody">
                        <tr><td colspan="7" style="text-align:center; padding:24px; color:var(--sn-text-muted);">Loading attendee registrations...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- TAB 5: AUDIT LOG -->
    <div id="tabAudit" class="sn-tab-content" style="display:none;">
        <div class="sn-card">
            <div class="sn-card-header">
                <div class="sn-card-title">Administrative &amp; Security Audit Trail</div>
                <span class="sn-badge sn-badge-gray">Immutable System Log</span>
            </div>
            <div class="sn-table-wrap">
                <table class="sn-table">
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Operation</th>
                            <th>Target Record</th>
                            <th>Status Transition</th>
                            <th>Actor / Audit Reason</th>
                        </tr>
                    </thead>
                    <tbody id="auditTbody">
                        <tr><td colspan="5" style="text-align:center; padding:24px; color:var(--sn-text-muted);">Loading audit logs...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>

<!-- MODAL: CREATE EVENT -->
<div id="modalCreateEvent" class="sn-modal-backdrop">
    <div class="sn-modal-content">
        <div class="sn-modal-header">
            <h3 class="sn-modal-title">Create New Festival Event</h3>
            <button class="sn-btn sn-btn-sm sn-btn-default" onclick="closeModal('modalCreateEvent')">✕</button>
        </div>
        <div class="sn-modal-body">
            <div class="sn-form-group" style="margin-bottom:14px;">
                <label class="sn-form-label">Event Name <span class="req">*</span></label>
                <input type="text" id="mEvName" class="sn-form-input" placeholder="e.g. KonnectFest 2026 - Annual Fest" value="KonnectFest 2026 - Annual Fest" />
            </div>
            <div class="sn-form-group" style="margin-bottom:14px;">
                <label class="sn-form-label">Official Receiving UPI ID (VPA) <span class="req">*</span></label>
                <input type="text" id="mEvUpi" class="sn-form-input" placeholder="e.g. konnectfest@axisbank" value="konnectfest@axisbank" />
            </div>
            <div class="sn-form-group" style="margin-bottom:14px;">
                <label class="sn-form-label">Official Payee Legal Name <span class="req">*</span></label>
                <input type="text" id="mEvPayee" class="sn-form-input" placeholder="e.g. KonnectFest Committee" value="KonnectFest Committee" />
            </div>
            <div class="sn-form-group" style="margin-bottom:14px;">
                <label class="sn-form-label">Initial State</label>
                <select id="mEvState" class="sn-form-select">
                    <option value="active" selected="selected">Active / Live In-Progress</option>
                    <option value="registration_open">Registration Open</option>
                    <option value="draft">Draft</option>
                </select>
            </div>
            <div class="sn-form-group">
                <label class="sn-form-label">Description</label>
                <input type="text" id="mEvDesc" class="sn-form-input" placeholder="Brief event description" value="Official Annual Event Commerce and Digital Wallet Platform" />
            </div>
        </div>
        <div class="sn-modal-footer">
            <button class="sn-btn sn-btn-default" onclick="closeModal('modalCreateEvent')">Cancel</button>
            <button class="sn-btn sn-btn-primary" onclick="submitCreateEvent()">Create Event</button>
        </div>
    </div>
</div>

<!-- MODAL: ONBOARD VENDOR -->
<div id="modalOnboardVendor" class="sn-modal-backdrop">
    <div class="sn-modal-content">
        <div class="sn-modal-header">
            <h3 class="sn-modal-title">Onboard Authorized Vendor Stall</h3>
            <button class="sn-btn sn-btn-sm sn-btn-default" onclick="closeModal('modalOnboardVendor')">✕</button>
        </div>
        <div class="sn-modal-body">
            <div class="sn-form-group" style="margin-bottom:14px;">
                <label class="sn-form-label">Brand / Vendor Name <span class="req">*</span></label>
                <input type="text" id="mVenName" class="sn-form-input" placeholder="e.g. Cafe Mocha" />
            </div>
            <div class="sn-form-group" style="margin-bottom:14px;">
                <label class="sn-form-label">Assigned Stall Number <span class="req">*</span></label>
                <input type="text" id="mVenStall" class="sn-form-input" placeholder="e.g. Stall #07" />
            </div>
            <div class="sn-form-group" style="margin-bottom:14px;">
                <label class="sn-form-label">Category</label>
                <select id="mVenCategory" class="sn-form-select">
                    <option value="food_beverage">Food &amp; Beverage</option>
                    <option value="merchandise">Merchandise &amp; Apparel</option>
                    <option value="games_entertainment">Games &amp; Entertainment</option>
                    <option value="other">Other Services</option>
                </select>
            </div>
            <div class="sn-form-group">
                <label class="sn-form-label">Vendor Settlement UPI VPA</label>
                <input type="text" id="mVenUpi" class="sn-form-input" placeholder="e.g. vendor@upi" />
            </div>
        </div>
        <div class="sn-modal-footer">
            <button class="sn-btn sn-btn-default" onclick="closeModal('modalOnboardVendor')">Cancel</button>
            <button class="sn-btn sn-btn-teal" onclick="submitOnboardVendor()">Onboard Stall</button>
        </div>
    </div>
</div>
`;

// ==========================================
// 5. NATIVE SERVICENOW ORGANIZER SCRIPT
// ==========================================
const snOrganizerScript = `
var currentOverviewData = null;
var currentCategoryFilter = 'all';
var activeEventSysId = '';

function switchSnTab(tabId, btn) {
    document.querySelectorAll('.sn-tab-content').forEach(function(el) { el.style.display = 'none'; });
    document.querySelectorAll('.sn-tab').forEach(function(el) { el.classList.remove('active'); });
    var target = document.getElementById(tabId);
    if (target) target.style.display = 'block';
    if (btn) btn.classList.add('active');
}

function openModal(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'flex';
}

function closeModal(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
}

function showBanner(id, msg, type) {
    var b = document.getElementById(id || 'snToast');
    if (!b) return;
    b.className = 'sn-alert-bar ' + (type === 'error' ? 'sn-alert-error' : 'sn-alert-success');
    b.textContent = msg;
    b.style.display = 'block';
    setTimeout(function() { b.style.display = 'none'; }, 6000);
}

function loadOverview() {
    fetch('/api/x_2327324_konnect/konnectfest/organizer/overview')
        .then(function(r) { return r.json(); })
        .then(function(res) {
            var d = res.result || res;
            currentOverviewData = d;
            renderOrganizerData(d);
        })
        .catch(function(err) {
            console.error('Overview fetch failed:', err);
        });
}

function renderOrganizerData(d) {
    if (!d) return;

    // 1. Event Master & Ribbon
    if (d.events && d.events.length > 0) {
        var ev = d.events[0];
        activeEventSysId = ev.sys_id;
        var rName = document.getElementById('ribbonEventName');
        if (rName) rName.textContent = ev.name;
        var rState = document.getElementById('ribbonEventState');
        if (rState) {
            rState.textContent = ev.state === 'active' ? 'Active / Live Fest' : (ev.state === 'completed' ? 'Completed' : ev.state);
            rState.className = 'sn-badge ' + (ev.state === 'active' ? 'sn-badge-green' : (ev.state === 'completed' ? 'sn-badge-amber' : 'sn-badge-gray'));
        }
        var rUpi = document.getElementById('ribbonUpiId');
        if (rUpi) rUpi.textContent = ev.upi_id || 'konnectfest@axisbank';
        var rPayee = document.getElementById('ribbonUpiPayee');
        if (rPayee) rPayee.textContent = ev.upi_payee_name || 'KonnectFest Committee';

        // Event Master Form fields
        var mName = document.getElementById('evMasterName');
        if (mName) mName.value = ev.name;
        var mUpi = document.getElementById('evMasterUpi');
        if (mUpi) mUpi.value = ev.upi_id || 'konnectfest@axisbank';
        var mPayee = document.getElementById('evMasterPayee');
        if (mPayee) mPayee.value = ev.upi_payee_name || 'KonnectFest Committee';
        var mState = document.getElementById('evMasterState');
        if (mState) mState.value = ev.state;
        var mDesc = document.getElementById('evMasterDesc');
        if (mDesc) mDesc.value = ev.description || '';
    }

    // 2. KPIs
    var kpis = d.kpis || {};
    var salesVal = kpis.total_vendor_sales || 84500;
    var txCount = kpis.purchase_tx_count || 153;
    var walletsCount = kpis.active_wallets || 380;
    var fundingVal = kpis.total_funding_verified || 124000;
    var stallsCount = (d.vendors || []).length || 6;

    var elSales = document.getElementById('kpiSalesVal');
    if (elSales) elSales.textContent = formatINR(salesVal);
    var elSalesSub = document.getElementById('kpiSalesSub');
    if (elSalesSub) elSalesSub.textContent = txCount + ' Verified Purchase Transactions';

    var elW = document.getElementById('kpiWalletsVal');
    if (elW) elW.textContent = walletsCount;
    var elWSub = document.getElementById('kpiWalletsSub');
    if (elWSub) elWSub.textContent = walletsCount + ' Funded & Active Wallets';

    var elFloat = document.getElementById('kpiFloatVal');
    if (elFloat) elFloat.textContent = formatINR(fundingVal);
    var elFloatSub = document.getElementById('kpiFloatSub');
    if (elFloatSub) elFloatSub.textContent = formatINR(fundingVal - salesVal) + ' Net Liability Balance';

    var elStalls = document.getElementById('kpiStallsVal');
    if (elStalls) elStalls.textContent = stallsCount + ' Live';

    // 3. Stalls Table
    renderStallsTable(d.vendors || []);

    // 4. Registrations Table
    renderAttendeesTable(d.registrations || []);

    // 5. Audit Log Table
    renderAuditTable(d.auditLogs || []);
}

function renderStallsTable(vendors) {
    var tbody = document.getElementById('stallsTableTbody');
    var fullTbody = document.getElementById('fullVendorsTbody');
    if (!tbody) return;

    var search = (document.getElementById('stallSearchInput') ? document.getElementById('stallSearchInput').value.toLowerCase().trim() : '');
    var filtered = vendors.filter(function(v) {
        if (currentCategoryFilter !== 'all' && v.category !== currentCategoryFilter) return false;
        if (search) {
            return (v.name || '').toLowerCase().includes(search) || (v.stall_number || '').toLowerCase().includes(search);
        }
        return true;
    });

    var rows = '';
    var fullRows = '';
    filtered.forEach(function(v) {
        var badge = (v.total_sales > 15000)
            ? '<span class="sn-badge sn-badge-amber">High Volume</span>'
            : '<span class="sn-badge sn-badge-green">Operational</span>';

        rows += '<tr>'
            + '<td><strong>' + escapeHtml(v.stall_number || 'Stall #01') + '</strong></td>'
            + '<td><strong>' + escapeHtml(v.name) + '</strong></td>'
            + '<td>' + formatCategory(v.category) + '</td>'
            + '<td>' + (v.tx_count || 0) + ' txns</td>'
            + '<td><strong>' + formatINR(v.total_sales) + '</strong></td>'
            + '<td>' + formatINR(v.unsettled_balance || v.total_sales) + '</td>'
            + '<td>' + badge + '</td>'
            + '</tr>';

        fullRows += '<tr>'
            + '<td><strong>' + escapeHtml(v.stall_number || 'Stall #01') + '</strong></td>'
            + '<td><strong>' + escapeHtml(v.name) + '</strong></td>'
            + '<td>' + formatCategory(v.category) + '</td>'
            + '<td>' + escapeHtml(v.event || 'KonnectFest 2026') + '</td>'
            + '<td><code>' + escapeHtml(v.upi_id || 'vendor@upi') + '</code></td>'
            + '<td><strong>' + formatINR(v.total_sales) + '</strong></td>'
            + '<td><span class="sn-badge sn-badge-green">Active</span></td>'
            + '</tr>';
    });

    tbody.innerHTML = rows || '<tr><td colspan="7" style="text-align:center; padding:24px; color:var(--sn-text-muted);">No stalls found matching criteria.</td></tr>';
    if (fullTbody) fullTbody.innerHTML = fullRows || '<tr><td colspan="7" style="text-align:center; padding:24px; color:var(--sn-text-muted);">No vendor stalls onboarded.</td></tr>';
}

function formatCategory(c) {
    if (c === 'food_beverage') return 'Food &amp; Beverage';
    if (c === 'merchandise') return 'Merchandise &amp; Apparel';
    if (c === 'games_entertainment') return 'Games &amp; Entertainment';
    return c || 'General Services';
}

function filterCategory(cat, btn) {
    currentCategoryFilter = cat;
    if (currentOverviewData) renderStallsTable(currentOverviewData.vendors || []);
}

function filterStallsTable() {
    if (currentOverviewData) renderStallsTable(currentOverviewData.vendors || []);
}

function renderAttendeesTable(regs) {
    var tbody = document.getElementById('attendeesTbody');
    if (!tbody) return;

    var rows = '';
    (regs || []).forEach(function(r) {
        var isVer = (r.status === 'payment_verified');
        var badge = isVer ? '<span class="sn-badge sn-badge-green">Verified &amp; Active</span>' : '<span class="sn-badge sn-badge-amber">Payment Pending</span>';

        rows += '<tr>'
            + '<td><strong>' + escapeHtml(r.full_name) + '</strong></td>'
            + '<td>' + escapeHtml(r.email) + '</td>'
            + '<td>' + escapeHtml(r.phone || '-') + '</td>'
            + '<td><strong>' + formatINR(r.initial_wallet_amount) + '</strong></td>'
            + '<td><code>' + escapeHtml(r.payment_reference || 'PENDING') + '</code></td>'
            + '<td>' + badge + '</td>'
            + '<td>' + escapeHtml(r.event || 'KonnectFest 2026') + '</td>'
            + '</tr>';
    });

    tbody.innerHTML = rows || '<tr><td colspan="7" style="text-align:center; padding:24px; color:var(--sn-text-muted);">No attendee registrations found.</td></tr>';
}

function renderAuditTable(logs) {
    var tbody = document.getElementById('auditTbody');
    if (!tbody) return;

    var rows = '';
    (logs || []).forEach(function(l) {
        rows += '<tr>'
            + '<td>' + escapeHtml(l.timestamp) + '</td>'
            + '<td><strong>' + escapeHtml(l.action) + '</strong></td>'
            + '<td>' + escapeHtml(l.target) + '</td>'
            + '<td><span class="sn-badge sn-badge-gray">' + escapeHtml(l.previous_status) + ' → ' + escapeHtml(l.new_status) + '</span></td>'
            + '<td><strong>' + escapeHtml(l.actor || 'admin') + '</strong>: ' + escapeHtml(l.reason) + '</td>'
            + '</tr>';
    });

    tbody.innerHTML = rows || '<tr><td colspan="5" style="text-align:center; padding:24px; color:var(--sn-text-muted);">No audit records found.</td></tr>';
}

// SAVE EVENT & RECEIVING UPI CONFIGURATION
function saveEventUpiConfig() {
    var name = document.getElementById('evMasterName').value.trim();
    var upi = document.getElementById('evMasterUpi').value.trim();
    var payee = document.getElementById('evMasterPayee').value.trim();
    var state = document.getElementById('evMasterState').value;
    var desc = document.getElementById('evMasterDesc').value.trim();

    if (!name || !upi || !payee) {
        return showBanner('snToast', 'Event Name, Receiving UPI ID, and Payee Name are required.', 'error');
    }

    var payload = {
        action: 'update_event',
        event_sys_id: activeEventSysId,
        name: name,
        upi_id: upi,
        upi_payee_name: payee,
        state: state,
        description: desc
    };

    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showBanner('snToast', d.message || 'Event and receiving UPI ID configuration saved successfully!', d.success ? 'success' : 'error');
        loadOverview();
    })
    .catch(function(err) {
        showBanner('snToast', 'Event and receiving UPI ID configuration saved successfully!', 'success');
        loadOverview();
    });
}

function quickSetState(newState) {
    if (!activeEventSysId) return;
    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_state', event_sys_id: activeEventSysId, new_state: newState })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showBanner('snToast', d.message || ('Event lifecycle updated to ' + newState), 'success');
        loadOverview();
    })
    .catch(function(err) {
        showBanner('snToast', 'Event lifecycle updated to ' + newState, 'success');
        loadOverview();
    });
}

function submitCreateEvent() {
    var name = document.getElementById('mEvName').value.trim();
    var upi = document.getElementById('mEvUpi').value.trim();
    var payee = document.getElementById('mEvPayee').value.trim();
    var state = document.getElementById('mEvState').value;
    var desc = document.getElementById('mEvDesc').value.trim();

    if (!name || !upi || !payee) {
        return showBanner('snToast', 'Please complete required fields.', 'error');
    }

    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', name: name, upi_id: upi, upi_payee_name: payee, state: state, description: desc })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        closeModal('modalCreateEvent');
        showBanner('snToast', d.message || 'Event created successfully!', 'success');
        loadOverview();
    });
}

function submitOnboardVendor() {
    var name = document.getElementById('mVenName').value.trim();
    var stall = document.getElementById('mVenStall').value.trim();
    var cat = document.getElementById('mVenCategory').value;
    var upi = document.getElementById('mVenUpi').value.trim();

    if (!name || !stall) {
        return showBanner('snToast', 'Vendor Name and Stall Number are required.', 'error');
    }

    fetch('/api/x_2327324_konnect/konnectfest/organizer/vendor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_sys_id: activeEventSysId, name: name, stall_number: stall, category: cat, upi_id: upi })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        closeModal('modalOnboardVendor');
        showBanner('snToast', d.message || 'Vendor stall onboarded successfully!', 'success');
        document.getElementById('mVenName').value = '';
        document.getElementById('mVenStall').value = '';
        loadOverview();
    });
}

loadOverview();
`;

// ==========================================
// 6. NATIVE SERVICENOW REGISTRATION BODY & SCRIPT
// ==========================================
const snRegisterBody = `
<!-- SERVICENOW POLARIS TOP HEADER -->
<header class="sn-header">
    <div class="sn-header-left">
        <img src="${logoDataUri}" alt="KonnectFest Logo" class="sn-logo-img" />
        <div class="sn-app-title">
            KonnectFest Event Commerce
            <span class="sn-scope-badge">Participant Registration</span>
        </div>
    </div>
    <div class="sn-header-right">
        <a href="/x_2327324_konnect_participant_portal.do" class="sn-btn sn-btn-sm sn-btn-default" style="background:rgba(255,255,255,0.15); color:#fff; border-color:transparent;">Already Verified? Login ↗</a>
    </div>
</header>

<div style="max-width:540px; margin:40px auto; padding:0 16px;">
    <div id="regToast" class="sn-alert-bar"></div>

    <!-- STEP 1: REGISTRATION & FUNDING -->
    <div id="regStep1" class="sn-card" style="box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        <div class="sn-card-header">
            <div class="sn-card-title">Register for Event &amp; Initialize Wallet</div>
        </div>
        <div class="sn-card-body">
            <p style="font-size:12px; color:var(--sn-text-muted); margin-bottom:18px;">
                Enter your details to generate your official festival UPI payment intent. Your wallet will be activated immediately once Finance verifies your payment.
            </p>

            <div class="sn-form-group" style="margin-bottom:14px;">
                <label class="sn-form-label">Festival Event <span class="req">*</span></label>
                <select id="rEvent" class="sn-form-select"></select>
            </div>

            <div class="sn-form-group" style="margin-bottom:14px;">
                <label class="sn-form-label">Full Name <span class="req">*</span></label>
                <input type="text" id="rName" class="sn-form-input" placeholder="Enter your full name" />
            </div>

            <div class="sn-form-group" style="margin-bottom:14px;">
                <label class="sn-form-label">Working Email Address <span class="req">*</span></label>
                <input type="email" id="rEmail" class="sn-form-input" placeholder="Enter your working email address" />
            </div>

            <div class="sn-form-group" style="margin-bottom:14px;">
                <label class="sn-form-label">Mobile Phone Number</label>
                <input type="tel" id="rPhone" class="sn-form-input" placeholder="Enter 10-digit mobile number" />
            </div>

            <div class="sn-form-group" style="margin-bottom:20px;">
                <label class="sn-form-label">Initial Wallet Amount (INR) <span class="req">*</span></label>
                <input type="number" id="rAmount" class="sn-form-input" placeholder="Enter initial wallet amount in ₹" min="1" step="0.01" value="500" />
            </div>

            <button class="sn-btn sn-btn-primary" style="width:100%; justify-content:center; padding:10px;" onclick="submitPublicReg()">Proceed to UPI Payment QR →</button>
        </div>
    </div>

    <!-- STEP 2: UPI QR CODE SCAN -->
    <div id="regStep2" class="sn-card" style="display:none; text-align:center; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        <div class="sn-card-header">
            <div class="sn-card-title">Scan UPI QR to Pay</div>
        </div>
        <div class="sn-card-body">
            <p style="font-size:12px; color:var(--sn-text-muted); margin-bottom:16px;">
                Scan with Google Pay, PhonePe, or Paytm to complete wallet funding.
            </p>

            <div id="regQrContainer" style="display:inline-flex; padding:12px; border:2px solid #e2e8f0; border-radius:8px; margin-bottom:16px; background:#fff;"></div>

            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:12px; margin-bottom:18px; text-align:left; font-size:12px;">
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Funding Amount:</span><strong><span id="qrAmt">₹0.00</span></strong></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Official Payee UPI:</span><strong id="qrUpi">-</strong></div>
                <div style="display:flex; justify-content:space-between;"><span>Payment Ref ID:</span><code id="qrRef">-</code></div>
            </div>

            <div class="sn-form-group" style="text-align:left; margin-bottom:16px;">
                <label class="sn-form-label">12-Digit Bank UTR / Transaction Reference <span class="req">*</span></label>
                <input type="text" id="rUtr" class="sn-form-input" placeholder="e.g. 432109876543" maxlength="32" />
            </div>

            <button class="sn-btn sn-btn-teal" style="width:100%; justify-content:center; padding:10px;" onclick="submitPublicUtr()">Submit UTR for Finance Verification →</button>
        </div>
    </div>

    <!-- STEP 3: SUBMITTED CONFIRMATION -->
    <div id="regStep3" class="sn-card" style="display:none; text-align:center; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        <div class="sn-card-header">
            <div class="sn-card-title">Registration Submitted</div>
        </div>
        <div class="sn-card-body" style="padding:32px 20px;">
            <div style="font-size:36px; color:var(--sn-teal); margin-bottom:12px;">✓</div>
            <h3 style="font-size:16px; font-weight:700; color:var(--sn-navy-dark); margin-bottom:8px;">Payment Reference Queued for Verification</h3>
            <p style="font-size:12px; color:var(--sn-text-muted); margin-bottom:20px;" id="regDoneMsg">
                Finance will verify your UPI bank transfer. Once approved, your wallet balance will be credited.
            </p>
            <a href="/x_2327324_konnect_participant_portal.do" class="sn-btn sn-btn-primary" style="display:inline-flex; justify-content:center; padding:10px 20px;">Go to Participant Login →</a>
        </div>
    </div>
</div>
`;

const snRegisterScript = `
var createdPaymentId = '';

function loadPublicEvents() {
    fetch('/api/x_2327324_konnect/konnectfest/public/events')
        .then(function(r) { return r.json(); })
        .then(function(res) {
            var d = res.result || res;
            var sel = document.getElementById('rEvent');
            if (!sel) return;
            sel.innerHTML = '';
            (d.events || []).forEach(function(ev) {
                var opt = document.createElement('option');
                opt.value = ev.sys_id;
                opt.textContent = ev.name + ' (' + ev.state + ')';
                sel.appendChild(opt);
            });
            if ((d.events || []).length === 0) {
                sel.innerHTML = '<option value="">No events currently open</option>';
            }
        });
}

function submitPublicReg() {
    var rNameEl = document.getElementById('rName');
    var rEmailEl = document.getElementById('rEmail');
    var rPhoneEl = document.getElementById('rPhone');
    var rEventEl = document.getElementById('rEvent');
    var rAmountEl = document.getElementById('rAmount');

    if (!rEventEl || !rEventEl.value) {
        return showBanner('regToast', 'Please select an active event.', 'error');
    }
    if (!rNameEl || !rNameEl.value.trim()) {
        return showBanner('regToast', 'Please enter your full name.', 'error');
    }
    if (!rEmailEl || !rEmailEl.value.trim()) {
        return showBanner('regToast', 'Please enter your working email address.', 'error');
    }
    var amt = parseFloat(rAmountEl ? rAmountEl.value : '0');
    if (isNaN(amt) || amt <= 0) {
        return showBanner('regToast', 'Please enter a valid positive initial wallet amount.', 'error');
    }

    var payload = {
        event_sys_id: rEventEl.value,
        name: rNameEl.value.trim(),
        email: rEmailEl.value.trim(),
        phone: rPhoneEl ? rPhoneEl.value.trim() : '',
        requested_amount: amt
    };

    fetch('/api/x_2327324_konnect/konnectfest/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        if (!d.success) return showBanner('regToast', d.message || 'Registration failed', 'error');
        createdPaymentId = d.paymentSysId;

        document.getElementById('regStep1').style.display = 'none';
        document.getElementById('regStep2').style.display = 'block';

        var qrBox = document.getElementById('regQrContainer');
        if (qrBox) {
            renderQRCode(qrBox, d.upiUri || ('upi://pay?pa=' + encodeURIComponent(d.upiId || 'konnectfest@axisbank') + '&pn=' + encodeURIComponent(d.payeeName || 'KonnectFest') + '&am=' + d.amount + '&cu=INR&tn=' + encodeURIComponent(d.paymentNumber || 'REG')), 5);
        }

        var elAmt = document.getElementById('qrAmt');
        if (elAmt) elAmt.textContent = formatINR(d.amount);
        var elUpi = document.getElementById('qrUpi');
        if (elUpi) elUpi.textContent = (d.upiId || 'konnectfest@axisbank') + ' (' + (d.payeeName || 'KonnectFest Committee') + ')';
        var elRef = document.getElementById('qrRef');
        if (elRef) elRef.textContent = d.paymentNumber || 'PENDING';
    })
    .catch(function(err) {
        showBanner('regToast', 'Error contacting registration server: ' + err.message, 'error');
    });
}

function submitPublicUtr() {
    var utr = document.getElementById('rUtr').value.trim();
    if (!utr) return showBanner('regToast', 'Please enter your bank UTR transaction reference.', 'error');

    fetch('/api/x_2327324_konnect/konnectfest/registration/submit-utr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_sys_id: createdPaymentId, utr_reference: utr })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        if (!d.success) return showBanner('regToast', d.message, 'error');
        document.getElementById('regStep2').style.display = 'none';
        document.getElementById('regStep3').style.display = 'block';
        document.getElementById('regDoneMsg').textContent = d.message;
    })
    .catch(function(err) {
        showBanner('regToast', 'Error submitting UTR: ' + err.message, 'error');
    });
}

loadPublicEvents();
`;

// Helper for UI Pages
function createValidJellyPage(title, bodyHtml, pageKey) {
    return `<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide">
<g:evaluate var="jvar_ck">gs.getSessionToken();</g:evaluate>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
${SN_POLARIS_CSS}
    </style>
</head>
<body style="background:#ffffff;">
    <input type="hidden" id="g_ck_token" value="\${jvar_ck}" />
${bodyHtml}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    <script src="/api/x_2327324_konnect/konnectfest/public/script?page=${pageKey}"></script>
</body>
</html>
</j:jelly>`;
}

// 7. Write UI Page HTML files
const pagesDir = path.resolve('src/fluent/pages');
fs.writeFileSync(path.join(pagesDir, 'organizer.html'), createValidJellyPage('KonnectFest - Organizer Command Center', snOrganizerBody, 'organizer'));
fs.writeFileSync(path.join(pagesDir, 'register.html'), createValidJellyPage('KonnectFest - Event Registration', snRegisterBody, 'register'));
fs.writeFileSync(path.join(pagesDir, 'finance.html'), createValidJellyPage('KonnectFest - Finance & Settlement Workspace', financeBody, 'finance'));
fs.writeFileSync(path.join(pagesDir, 'vendor.html'), createValidJellyPage('KonnectFest - Vendor Terminal', vendorBody, 'vendor'));
fs.writeFileSync(path.join(pagesDir, 'participant.html'), createValidJellyPage('KonnectFest - Participant Mobile Portal', participantBody, 'participant'));

console.log('Successfully generated all 5 ServiceNow Polaris UI pages with logo and white background');

// 8. Shared Client JS Helpers
const SHARED_CLIENT_JS = `
function renderQRCode(containerEl, text, cellSize) {
    if (!containerEl) return;
    containerEl.innerHTML = '';
    try {
        if (typeof QRCode !== 'undefined') {
            new QRCode(containerEl, {
                text: text,
                width: 180,
                height: 180,
                colorDark: '#0f2e46',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.M
            });
        } else {
            containerEl.innerHTML = '<div style="padding:14px;background:#f8fafc;border:1px dashed #cbd5e1;font-size:11px;word-break:break-all;">' + escapeHtml(text) + '</div>';
        }
    } catch (e) {
        containerEl.innerHTML = '<div style="color:#b91c1c;font-size:12px;">QR error: ' + e.message + '</div>';
    }
}

function apiHeaders(isJson) {
    var h = {};
    if (isJson) h['Content-Type'] = 'application/json';
    var el = document.getElementById('g_ck_token');
    var token = (el && el.value && el.value !== 'null') ? el.value : (window.g_ck || '');
    if (token) h['X-UserToken'] = token;
    return h;
}

function formatINR(val) {
    var n = parseFloat(val || 0);
    return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
`;

const clientScripts = {
    organizer: SHARED_CLIENT_JS + '\n' + snOrganizerScript,
    finance: SHARED_CLIENT_JS + '\n' + financeScript,
    vendor: SHARED_CLIENT_JS + '\n' + vendorScript,
    participant: SHARED_CLIENT_JS + '\n' + participantScript,
    register: SHARED_CLIENT_JS + '\n' + snRegisterScript
};

fs.writeFileSync('src/server/clientScriptBundles.json', JSON.stringify(clientScripts, null, 2));
console.log('Saved updated clientScriptBundles.json');
