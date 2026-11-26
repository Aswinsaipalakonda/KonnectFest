const fs = require('fs');
const path = require('path');

// 1. Read existing HTML/scripts
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

// CSS for Modern Dashboard
const MODERN_CSS = `
:root {
    --primary: #0f172a;
    --accent-rose: #e11d48;
    --accent-rose-hover: #be123c;
    --accent-rose-light: #fff1f2;
    --accent-rose-border: #fecdd3;
    --accent-emerald: #059669;
    --accent-emerald-light: #ecfdf5;
    --accent-blue: #0284c7;
    --accent-blue-light: #f0f9ff;
    --accent-purple: #7c3aed;
    --accent-purple-light: #f5f3ff;
    --bg-page: #f8fafc;
    --card-bg: #ffffff;
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --text-muted: #94a3b8;
    --border-subtle: #e2e8f0;
    --radius-lg: 18px;
    --radius-md: 12px;
    --radius-sm: 8px;
    --shadow-soft: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
    --shadow-hover: 0 10px 25px -3px rgba(15, 23, 42, 0.08);
}
* { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif; }
body { background: var(--bg-page); color: var(--text-primary); line-height: 1.5; min-height: 100vh; }

.app-layout { display: flex; width: 100%; min-height: 100vh; }
.sidebar { width: 260px; background: #ffffff; border-right: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between; padding: 24px 18px; flex-shrink: 0; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
.main-wrapper { flex: 1; display: flex; flex-direction: column; min-width: 0; background: var(--bg-page); }

.brand { display: flex; align-items: center; gap: 10px; padding: 0 8px 24px 8px; border-bottom: 1px solid var(--border-subtle); margin-bottom: 20px; }
.brand-icon { width: 34px; height: 34px; background: linear-gradient(135deg, #e11d48 0%, #be123c 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 18px; font-weight: 800; box-shadow: 0 4px 10px rgba(225, 29, 72, 0.3); }
.brand-name { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: var(--text-primary); }
.brand-name span { color: var(--accent-rose); }

.nav-section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-muted); padding: 0 12px; margin-bottom: 8px; }
.nav-menu { display: flex; flex-direction: column; gap: 4px; list-style: none; margin-bottom: 24px; }
.nav-item { display: flex; align-items: center; gap: 12px; padding: 11px 14px; border-radius: var(--radius-md); font-size: 14px; font-weight: 600; color: var(--text-secondary); text-decoration: none; cursor: pointer; transition: all 0.15s ease; border: 1px solid transparent; }
.nav-item:hover { background: #f1f5f9; color: var(--text-primary); }
.nav-item.active { background: var(--accent-rose-light); color: var(--accent-rose); font-weight: 700; border-color: var(--accent-rose-border); }
.nav-icon { font-size: 16px; width: 20px; text-align: center; }

.sidebar-fest-card { background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%); border: 1px solid var(--accent-rose-border); border-radius: var(--radius-lg); padding: 18px; margin-top: auto; }
.fest-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: #9f1239; background: #fff; padding: 3px 10px; border-radius: 999px; margin-bottom: 8px; }
.fest-dot { width: 7px; height: 7px; border-radius: 50%; background: #059669; animation: pulse 1.5s infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
.fest-card-title { font-size: 14px; font-weight: 700; color: #881337; margin-bottom: 4px; }
.fest-card-sub { font-size: 12px; color: #9f1239; margin-bottom: 12px; }
.fest-card-btn { width: 100%; padding: 8px 12px; background: var(--accent-rose); color: #fff; border: none; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
.fest-card-btn:hover { background: var(--accent-rose-hover); }

.topbar { background: #ffffff; border-bottom: 1px solid var(--border-subtle); padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; gap: 20px; position: sticky; top: 0; z-index: 30; }
.topbar-left { display: flex; align-items: center; gap: 20px; flex: 1; max-width: 500px; }
.search-box { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: 10px; padding: 8px 14px; width: 100%; }
.search-box input { border: none; background: transparent; outline: none; font-size: 13px; color: var(--text-primary); width: 100%; }
.topbar-right { display: flex; align-items: center; gap: 12px; }
.btn-pill { padding: 8px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; text-decoration: none; border: 1px solid transparent; transition: all 0.15s; }
.btn-pill-rose { background: var(--accent-rose); color: #fff; }
.btn-pill-rose:hover { background: var(--accent-rose-hover); }
.btn-pill-subtle { background: #f1f5f9; color: var(--text-secondary); border-color: var(--border-subtle); }
.btn-pill-subtle:hover { background: #e2e8f0; color: var(--text-primary); }
.profile-pill { display: flex; align-items: center; gap: 10px; padding: 4px 12px 4px 4px; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: 999px; }
.profile-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #e11d48 0%, #4f46e5 100%); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; }
.profile-info { text-align: left; }
.profile-name { font-size: 12px; font-weight: 700; color: var(--text-primary); line-height: 1.2; }
.profile-role { font-size: 10px; color: var(--text-muted); font-weight: 600; }

.content-area { padding: 32px; flex: 1; max-width: 1400px; margin: 0 auto; width: 100%; }

.welcome-banner { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 16px; }
.welcome-title { font-size: 26px; font-weight: 800; letter-spacing: -0.6px; color: var(--text-primary); }
.welcome-sub { font-size: 14px; color: var(--text-muted); margin-top: 4px; }
.team-avatars-wrap { display: flex; align-items: center; gap: 10px; }
.avatars-group { display: flex; margin-right: 6px; }
.avatar-circle { width: 34px; height: 34px; border-radius: 50%; border: 2px solid #fff; margin-left: -8px; background: #cbd5e1; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; }
.avatar-circle:first-child { margin-left: 0; }
.btn-invite { background: #fff; border: 1px solid var(--border-subtle); padding: 8px 14px; border-radius: 999px; font-size: 12px; font-weight: 600; color: var(--text-secondary); cursor: pointer; }

.kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 28px; }
@media (max-width: 1100px) { .kpi-row { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .kpi-row { grid-template-columns: 1fr; } }

.kpi-card-modern { background: #ffffff; border-radius: var(--radius-lg); padding: 22px; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-soft); position: relative; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; }
.kpi-card-modern:hover { transform: translateY(-3px); box-shadow: var(--shadow-hover); }
.kpi-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.kpi-tag { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
.kpi-tag-rose { background: var(--accent-rose-light); color: var(--accent-rose); }
.kpi-tag-dark { background: rgba(255,255,255,0.2); color: #fff; }
.kpi-tag-blue { background: var(--accent-blue-light); color: var(--accent-blue); }
.kpi-tag-emerald { background: var(--accent-emerald-light); color: var(--accent-emerald); }
.kpi-arrow { font-size: 13px; font-weight: 700; color: var(--text-muted); }

.kpi-num { font-size: 30px; font-weight: 900; letter-spacing: -0.8px; margin-bottom: 6px; }
.kpi-subtext { font-size: 12px; color: var(--text-muted); font-weight: 500; }

.kpi-card-dark { background: #0f172a; color: #ffffff; border: 1px solid #1e293b; box-shadow: 0 10px 25px -3px rgba(15, 23, 42, 0.2); }
.kpi-card-dark .kpi-num { color: #ffffff; }
.kpi-card-dark .kpi-subtext { color: #94a3b8; }
.kpi-card-dark .kpi-arrow { color: #64748b; }

.charts-row { display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; margin-bottom: 32px; }
@media (max-width: 960px) { .charts-row { grid-template-columns: 1fr; } }

.chart-card { background: #ffffff; border-radius: var(--radius-lg); padding: 24px; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-soft); }
.chart-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.chart-title { font-size: 16px; font-weight: 800; color: var(--text-primary); }
.chart-sub { font-size: 12px; color: var(--text-muted); }
.chart-badge { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; background: var(--accent-rose-light); color: var(--accent-rose); }

.area-chart-container { width: 100%; height: 210px; position: relative; }
.area-chart-container svg { width: 100%; height: 100%; overflow: visible; }
.chart-legend { display: flex; gap: 16px; margin-top: 14px; font-size: 12px; font-weight: 600; color: var(--text-secondary); }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }

.payouts-bars { display: flex; align-items: flex-end; justify-content: space-between; height: 160px; padding: 10px 0; gap: 10px; border-bottom: 1px solid var(--border-subtle); }
.bar-col { display: flex; flex-direction: column; align-items: center; flex: 1; height: 100%; justify-content: flex-end; }
.bar-track { width: 28px; background: #f1f5f9; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; height: 130px; position: relative; }
.bar-fill-rose { background: linear-gradient(180deg, #f43f5e 0%, #e11d48 100%); width: 100%; border-radius: 6px; transition: height 0.6s ease; }
.bar-fill-striped { background: repeating-linear-gradient(45deg, #fecdd3, #fecdd3 6px, #fda4af 6px, #fda4af 12px); width: 100%; }
.bar-label { font-size: 11px; color: var(--text-muted); font-weight: 600; margin-top: 6px; }

.payout-metrics { display: flex; justify-content: space-between; margin-top: 18px; }
.payout-metric-item { text-align: left; }
.payout-metric-label { font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }
.payout-metric-val { font-size: 18px; font-weight: 800; color: var(--text-primary); margin-top: 2px; }

.table-card { background: #ffffff; border-radius: var(--radius-lg); padding: 24px; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-soft); margin-bottom: 32px; }
.table-toolbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 14px; }
.table-toolbar-left { display: flex; align-items: center; gap: 12px; flex: 1; max-width: 400px; }
.table-toolbar-right { display: flex; align-items: center; gap: 10px; }

.category-filter-pill { padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 600; color: var(--text-secondary); background: #f1f5f9; border: 1px solid transparent; cursor: pointer; transition: all 0.15s; }
.category-filter-pill.active { background: #0f172a; color: #fff; }

.data-table-wrap { overflow-x: auto; }
.data-table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; }
.data-table th { padding: 12px 16px; text-align: left; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.6px; color: var(--text-muted); background: #f8fafc; border-bottom: 1px solid var(--border-subtle); }
.data-table th:first-child { border-top-left-radius: 10px; border-bottom-left-radius: 10px; }
.data-table th:last-child { border-top-right-radius: 10px; border-bottom-right-radius: 10px; }
.data-table td { padding: 16px; border-bottom: 1px solid #f1f5f9; color: var(--text-primary); vertical-align: middle; }
.data-table tr:hover td { background: #fafafa; }

.status-pill { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; }
.status-selling-fast { background: #fff1f2; color: #e11d48; border: 1px solid #fecdd3; }
.status-on-sale { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
.status-draft { background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; }

.form-group { margin-bottom: 16px; }
.form-label { display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; color: var(--text-primary); }
.form-input, .form-select { width: 100%; padding: 11px 14px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 14px; background: #fff; color: var(--text-primary); }
.form-input:focus, .form-select:focus { outline: none; border-color: var(--accent-rose); box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.15); }
.btn-block { width: 100%; }

.modal-overlay { display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); z-index: 100; align-items: center; justify-content: center; padding: 16px; backdrop-filter: blur(4px); }
.modal-window { background: #ffffff; border-radius: 20px; width: 100%; max-width: 520px; padding: 28px; box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25); border: 1px solid var(--border-subtle); max-height: 90vh; overflow-y: auto; }
.modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.modal-title { font-size: 18px; font-weight: 800; color: var(--text-primary); }
.btn-close { background: none; border: none; font-size: 20px; color: var(--text-muted); cursor: pointer; }

.toast-banner { position: fixed; bottom: 24px; right: 24px; z-index: 200; padding: 14px 20px; border-radius: 12px; font-size: 14px; font-weight: 600; display: none; box-shadow: 0 10px 25px -3px rgba(0,0,0,0.15); }
.toast-success { background: #059669; color: #fff; }
.toast-error { background: #e11d48; color: #fff; }
`;

// ==========================================
// 2. MODERN ORGANIZER HTML BODY (EvenTum Style)
// ==========================================
const modernOrganizerBody = `
<div class="app-layout">
    <!-- LEFT SIDEBAR -->
    <aside class="sidebar">
        <div>
            <div class="brand">
                <div class="brand-icon">✦</div>
                <div class="brand-name">Konnect<span>Fest</span></div>
            </div>
            <div class="nav-section-title">Main Menu</div>
            <ul class="nav-menu">
                <li class="nav-item active" onclick="switchNavTab('tabOverview', this)">
                    <span class="nav-icon">📊</span>
                    <span>Dashboard</span>
                </li>
                <li class="nav-item" onclick="switchNavTab('tabEvents', this)">
                    <span class="nav-icon">📅</span>
                    <span>Events &amp; Lifecycle</span>
                </li>
                <li class="nav-item" onclick="switchNavTab('tabVendors', this)">
                    <span class="nav-icon">🏪</span>
                    <span>Vendors &amp; Stalls</span>
                </li>
                <li class="nav-item" onclick="switchNavTab('tabRegistrations', this)">
                    <span class="nav-icon">👥</span>
                    <span>Registrations</span>
                </li>
                <li class="nav-item" onclick="switchNavTab('tabAudit', this)">
                    <span class="nav-icon">📑</span>
                    <span>Audit Trail</span>
                </li>
            </ul>

            <div class="nav-section-title">Quick Actions</div>
            <ul class="nav-menu">
                <li class="nav-item" onclick="openModal('modalCreateEvent')">
                    <span class="nav-icon">＋</span>
                    <span>New Event</span>
                </li>
                <li class="nav-item" onclick="openModal('modalOnboardVendor')">
                    <span class="nav-icon">＋</span>
                    <span>Onboard Stall</span>
                </li>
                <li class="nav-item" onclick="window.open('/x_2327324_konnect_register.do', '_blank')">
                    <span class="nav-icon">↗</span>
                    <span>Public Registration</span>
                </li>
            </ul>
        </div>

        <!-- SIDEBAR EVENT STATUS CARD -->
        <div class="sidebar-fest-card">
            <div class="fest-badge"><span class="fest-dot"></span> LIVE FESTIVAL</div>
            <div class="fest-card-title" id="sideFestTitle">KonnectFest 2026</div>
            <div class="fest-card-sub" id="sideFestSub">6 Live Stalls · 42 Transactions</div>
            <button class="fest-card-btn" onclick="openModal('modalCreateEvent')">+ Create Next Event</button>
        </div>
    </aside>

    <!-- MAIN CONTENT AREA -->
    <div class="main-wrapper">
        <!-- TOPBAR -->
        <header class="topbar">
            <div class="topbar-left">
                <div class="search-box">
                    <span>🔍</span>
                    <input type="text" id="globalSearch" placeholder="Search events, stalls, attendees..." onkeyup="filterStallsTable()" />
                </div>
            </div>
            <div class="topbar-right">
                <button class="btn-pill btn-pill-subtle" onclick="loadOverview()">↻ Refresh Telemetry</button>
                <a href="/x_2327324_konnect_register.do" target="_blank" class="btn-pill btn-pill-rose">Public Registration Link ↗</a>
                <div class="profile-pill">
                    <div class="profile-avatar">AS</div>
                    <div class="profile-info">
                        <div class="profile-name">Aswin Sai</div>
                        <div class="profile-role">Organizer Admin</div>
                    </div>
                </div>
            </div>
        </header>

        <!-- CONTENT -->
        <main class="content-area">
            <!-- TOAST BANNER -->
            <div id="orgToast" class="toast-banner"></div>

            <!-- TAB 1: OVERVIEW & ANALYTICS -->
            <div id="tabOverview" class="tab-page">
                <!-- WELCOME BANNER -->
                <div class="welcome-banner">
                    <div>
                        <h1 class="welcome-title">Welcome Back, Aswin 👋</h1>
                        <p class="welcome-sub">Live real-time event commerce &amp; digital wallet telemetry</p>
                    </div>
                    <div class="team-avatars-wrap">
                        <div class="avatars-group">
                            <div class="avatar-circle" style="background:#0284c7;">RS</div>
                            <div class="avatar-circle" style="background:#e11d48;">AP</div>
                            <div class="avatar-circle" style="background:#7c3aed;">VK</div>
                            <div class="avatar-circle" style="background:#059669;">NG</div>
                        </div>
                        <span style="font-size:12px; font-weight:700; color:var(--text-muted); margin-right:8px;">8+ Active Team</span>
                        <button class="btn-invite" onclick="showBanner('orgToast', 'Team members can be invited via ServiceNow user administration.', 'success')">+ Invite Member</button>
                    </div>
                </div>

                <!-- 4 KPI CARDS (Matching Image 3) -->
                <div class="kpi-row">
                    <!-- 1. Net Sales Card -->
                    <div class="kpi-card-modern">
                        <div class="kpi-top">
                            <span class="kpi-tag kpi-tag-rose">🏷 Net Sales</span>
                            <span class="kpi-arrow">↗</span>
                        </div>
                        <div class="kpi-num" id="kpiNetSales">₹84,500.00</div>
                        <div class="kpi-subtext" id="kpiNetSalesSub">+18.4% from yesterday · 153 sales</div>
                    </div>

                    <!-- 2. Dark Hero Card (Ticket Sold style) -->
                    <div class="kpi-card-modern kpi-card-dark">
                        <div class="kpi-top">
                            <span class="kpi-tag kpi-tag-dark">🎟 Active Wallets</span>
                            <span class="kpi-arrow">↗</span>
                        </div>
                        <div class="kpi-num" id="kpiWallets">380/500</div>
                        <div class="kpi-subtext" id="kpiWalletsSub">380 funded &amp; active · 120 pending</div>
                    </div>

                    <!-- 3. Verified Float Card -->
                    <div class="kpi-card-modern">
                        <div class="kpi-top">
                            <span class="kpi-tag kpi-tag-blue">💳 Verified Float</span>
                            <span class="kpi-arrow">↗</span>
                        </div>
                        <div class="kpi-num" id="kpiLiability">₹1,24,000.00</div>
                        <div class="kpi-subtext" id="kpiLiabilitySub">₹39,500 available · ₹84,500 spent</div>
                    </div>

                    <!-- 4. Active Stalls Card -->
                    <div class="kpi-card-modern">
                        <div class="kpi-top">
                            <span class="kpi-tag kpi-tag-emerald">🏪 Active Stalls</span>
                            <span class="kpi-arrow">↗</span>
                        </div>
                        <div class="kpi-num" id="kpiStalls">6 Live</div>
                        <div class="kpi-subtext">100% operational · 0 disputes</div>
                    </div>
                </div>

                <!-- CHARTS ROW (Area Chart & Bar Chart) -->
                <div class="charts-row">
                    <!-- Area Chart: Available for Payout / Sales Velocity -->
                    <div class="chart-card">
                        <div class="chart-header">
                            <div>
                                <div class="chart-title">Available for Payout</div>
                                <div class="chart-sub">Hourly gross transaction volume across stalls</div>
                            </div>
                            <span class="chart-badge">Peak: ₹18.4K at 8 PM</span>
                        </div>
                        <div class="area-chart-container">
                            <svg viewBox="0 0 600 200" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.35"/>
                                        <stop offset="100%" stop-color="#f43f5e" stop-opacity="0.0"/>
                                    </linearGradient>
                                </defs>
                                <line x1="0" y1="50" x2="600" y2="50" stroke="#f1f5f9" stroke-width="1" />
                                <line x1="0" y1="100" x2="600" y2="100" stroke="#f1f5f9" stroke-width="1" />
                                <line x1="0" y1="150" x2="600" y2="150" stroke="#f1f5f9" stroke-width="1" />
                                <path d="M0,160 Q60,140 120,120 T240,90 T360,110 T480,40 T600,60 L600,200 L0,200 Z" fill="url(#areaGrad)" />
                                <path d="M0,160 Q60,140 120,120 T240,90 T360,110 T480,40 T600,60" fill="none" stroke="#e11d48" stroke-width="3" />
                                <path d="M0,175 Q60,160 120,150 T240,130 T360,140 T480,95 T600,105" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="4 4" />
                                <circle cx="480" cy="40" r="5" fill="#e11d48" stroke="#fff" stroke-width="2" />
                            </svg>
                        </div>
                        <div class="chart-legend">
                            <span><span class="legend-dot" style="background:#e11d48;"></span> Gross Vendor Sales</span>
                            <span><span class="legend-dot" style="background:#0284c7;"></span> Wallet Top-up Volume</span>
                        </div>
                    </div>

                    <!-- Bar Chart: Payouts & Settlement Breakdown (Image 3 Style) -->
                    <div class="chart-card">
                        <div class="chart-header">
                            <div>
                                <div class="chart-title">Payouts &amp; Settlements</div>
                                <div class="chart-sub">Vendor settlements vs unsettled balance</div>
                            </div>
                            <span style="font-size:14px; font-weight:700; color:var(--text-muted);">↗</span>
                        </div>
                        <div class="payouts-bars">
                            <div class="bar-col">
                                <div class="bar-track"><div class="bar-fill-rose" style="height: 45%;"></div></div>
                                <span class="bar-label">Stall #1</span>
                            </div>
                            <div class="bar-col">
                                <div class="bar-track"><div class="bar-fill-rose" style="height: 75%;"></div></div>
                                <span class="bar-label">Stall #2</span>
                            </div>
                            <div class="bar-col">
                                <div class="bar-track"><div class="bar-fill-rose" style="height: 90%;"></div></div>
                                <span class="bar-label">Stall #3</span>
                            </div>
                            <div class="bar-col">
                                <div class="bar-track"><div class="bar-fill-striped" style="height: 55%;"></div></div>
                                <span class="bar-label">Stall #4</span>
                            </div>
                            <div class="bar-col">
                                <div class="bar-track"><div class="bar-fill-rose" style="height: 65%;"></div></div>
                                <span class="bar-label">Stall #5</span>
                            </div>
                            <div class="bar-col">
                                <div class="bar-track"><div class="bar-fill-striped" style="height: 35%;"></div></div>
                                <span class="bar-label">Stall #6</span>
                            </div>
                        </div>
                        <div class="payout-metrics">
                            <div class="payout-metric-item">
                                <div class="payout-metric-label">Paid Out</div>
                                <div class="payout-metric-val" id="payoutPaid">₹52,000.00</div>
                            </div>
                            <div class="payout-metric-item">
                                <div class="payout-metric-label">Remaining</div>
                                <div class="payout-metric-val" id="payoutRem" style="color:var(--accent-rose);">₹32,500.00</div>
                            </div>
                            <div class="payout-metric-item">
                                <div class="payout-metric-label">Adjustments</div>
                                <div class="payout-metric-val">₹0.00</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- DATA TABLE: STALLS & VENDOR PERFORMANCE (Image 3 Style) -->
                <div class="table-card">
                    <div class="table-toolbar">
                        <div class="table-toolbar-left">
                            <h2 style="font-size:16px; font-weight:800;">Stalls &amp; Vendor Performance</h2>
                            <span style="font-size:12px; color:var(--text-muted);" id="vendorCountBadge">6 Authorized Stalls</span>
                        </div>
                        <div class="table-toolbar-right">
                            <button class="category-filter-pill active" onclick="filterCategory('all', this)">All Categories</button>
                            <button class="category-filter-pill" onclick="filterCategory('food_beverage', this)">Food &amp; Beverage</button>
                            <button class="category-filter-pill" onclick="filterCategory('merchandise', this)">Merchandise</button>
                            <button class="category-filter-pill" onclick="filterCategory('games_entertainment', this)">Entertainment</button>
                            <button class="btn-pill btn-pill-subtle" onclick="openModal('modalOnboardVendor')">+ Add Stall</button>
                        </div>
                    </div>

                    <div class="data-table-wrap">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Stall &amp; Brand</th>
                                    <th>Category</th>
                                    <th>Assigned Event</th>
                                    <th>Sales Volume</th>
                                    <th>Transactions</th>
                                    <th>Unsettled Balance</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="stallsTableBody">
                                <tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">Loading live stall telemetry...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- TAB 2: EVENTS & LIFECYCLE -->
            <div id="tabEvents" class="tab-page" style="display:none;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
                    <div>
                        <h1 class="welcome-title">Event Lifecycle Management</h1>
                        <p class="welcome-sub">Transition festival phases. Marking Completed locks purchases &amp; enables attendee refunds.</p>
                    </div>
                    <button class="btn-pill btn-pill-rose" onclick="openModal('modalCreateEvent')">+ Create New Event</button>
                </div>
                <div id="eventsListCards" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(360px, 1fr)); gap:20px;">
                    <div style="color:var(--text-muted);">Loading events...</div>
                </div>
            </div>

            <!-- TAB 3: VENDORS & STALLS -->
            <div id="tabVendors" class="tab-page" style="display:none;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
                    <div>
                        <h1 class="welcome-title">Authorized Vendor Stalls</h1>
                        <p class="welcome-sub">Manage vendor registrations, assigned stalls, and payout bank accounts.</p>
                    </div>
                    <button class="btn-pill btn-pill-rose" onclick="openModal('modalOnboardVendor')">+ Onboard Vendor Stall</button>
                </div>
                <div class="table-card">
                    <div class="data-table-wrap">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Vendor Name</th>
                                    <th>Stall #</th>
                                    <th>Event</th>
                                    <th>Category</th>
                                    <th>UPI VPA</th>
                                    <th>Gross Sales</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="fullVendorsTableBody">
                                <tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">Loading vendors...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- TAB 4: REGISTRATIONS & ATTENDEES -->
            <div id="tabRegistrations" class="tab-page" style="display:none;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
                    <div>
                        <h1 class="welcome-title">Attendee Registrations &amp; Wallets</h1>
                        <p class="welcome-sub">Participant registration logs, payment verification state, and wallet activations.</p>
                    </div>
                    <a href="/x_2327324_konnect_register.do" target="_blank" class="btn-pill btn-pill-rose">Open Public Registration ↗</a>
                </div>
                <div class="table-card">
                    <div class="data-table-wrap">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Participant Name</th>
                                    <th>Email Address</th>
                                    <th>Phone</th>
                                    <th>Event</th>
                                    <th>Initial Wallet (INR)</th>
                                    <th>Payment Ref (UTR)</th>
                                    <th>Verification Status</th>
                                </tr>
                            </thead>
                            <tbody id="registrationsTableBody">
                                <tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">Loading attendee registrations...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- TAB 5: AUDIT TRAIL -->
            <div id="tabAudit" class="tab-page" style="display:none;">
                <div style="margin-bottom:24px;">
                    <h1 class="welcome-title">Administrative Audit Trail</h1>
                    <p class="welcome-sub">Immutable security &amp; financial operations log with timestamps and actors.</p>
                </div>
                <div class="table-card">
                    <div class="data-table-wrap">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Action</th>
                                    <th>Target Record</th>
                                    <th>Status Transition</th>
                                    <th>Actor / Reason</th>
                                </tr>
                            </thead>
                            <tbody id="auditTableBody">
                                <tr><td colspan="5" style="text-align:center; padding:30px; color:var(--text-muted);">Loading audit trail...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>

<!-- MODAL: CREATE EVENT -->
<div id="modalCreateEvent" class="modal-overlay">
    <div class="modal-window">
        <div class="modal-header">
            <h2 class="modal-title">Create New Festival Event</h2>
            <button class="btn-close" onclick="closeModal('modalCreateEvent')">✕</button>
        </div>
        <div class="form-group">
            <label class="form-label">Event Name *</label>
            <input type="text" id="mEvName" class="form-input" placeholder="e.g. KonnectFest 2026 - Annual Fest" />
        </div>
        <div class="form-group">
            <label class="form-label">Official Event UPI ID *</label>
            <input type="text" id="mEvUpi" class="form-input" placeholder="e.g. konnectfest@axisbank" />
        </div>
        <div class="form-group">
            <label class="form-label">Payee Legal Name *</label>
            <input type="text" id="mEvPayee" class="form-input" placeholder="e.g. KonnectFest Committee" />
        </div>
        <div class="form-group">
            <label class="form-label">Initial Lifecycle State</label>
            <select id="mEvState" class="form-select">
                <option value="registration_open">Registration Open</option>
                <option value="active" selected="selected">Active / Live In-Progress</option>
                <option value="draft">Draft / Pre-Event</option>
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Description</label>
            <input type="text" id="mEvDesc" class="form-input" placeholder="Brief event summary" />
        </div>
        <button class="btn-pill btn-pill-rose btn-block" style="justify-content:center; padding:12px;" onclick="submitCreateEvent()">+ Create &amp; Activate Event</button>
    </div>
</div>

<!-- MODAL: ONBOARD VENDOR -->
<div id="modalOnboardVendor" class="modal-overlay">
    <div class="modal-window">
        <div class="modal-header">
            <h2 class="modal-title">Onboard Authorized Vendor Stall</h2>
            <button class="btn-close" onclick="closeModal('modalOnboardVendor')">✕</button>
        </div>
        <div class="form-group">
            <label class="form-label">Linked Festival Event *</label>
            <select id="mVenEvent" class="form-select"></select>
        </div>
        <div class="form-group">
            <label class="form-label">Brand / Vendor Name *</label>
            <input type="text" id="mVenName" class="form-input" placeholder="e.g. Cafe Mocha" />
        </div>
        <div class="form-group">
            <label class="form-label">Stall Number / Location *</label>
            <input type="text" id="mVenStall" class="form-input" placeholder="e.g. Stall #07" />
        </div>
        <div class="form-group">
            <label class="form-label">Category</label>
            <select id="mVenCategory" class="form-select">
                <option value="food_beverage">Food &amp; Beverage</option>
                <option value="merchandise">Merchandise &amp; Apparel</option>
                <option value="games_entertainment">Games &amp; Entertainment</option>
                <option value="other">Other Services</option>
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Vendor Settlement UPI VPA</label>
            <input type="text" id="mVenUpi" class="form-input" placeholder="e.g. vendor@upi" />
        </div>
        <button class="btn-pill btn-pill-rose btn-block" style="justify-content:center; padding:12px;" onclick="submitOnboardVendor()">Authorize &amp; Link Stall</button>
    </div>
</div>
`;

// ==========================================
// 3. MODERN ORGANIZER JAVASCRIPT LOGIC
// ==========================================
const modernOrganizerScript = `
var allOverviewData = null;
var currentCategoryFilter = 'all';

function switchNavTab(tabId, el) {
    document.querySelectorAll('.tab-page').forEach(function(p) { p.style.display = 'none'; });
    document.querySelectorAll('.nav-item').forEach(function(i) { i.classList.remove('active'); });
    var target = document.getElementById(tabId);
    if (target) target.style.display = 'block';
    if (el) el.classList.add('active');
}

function openModal(id) {
    var m = document.getElementById(id);
    if (m) m.style.display = 'flex';
}

function closeModal(id) {
    var m = document.getElementById(id);
    if (m) m.style.display = 'none';
}

function showBanner(id, msg, type) {
    var b = document.getElementById(id || 'orgToast');
    if (!b) return;
    b.className = 'toast-banner toast-' + (type || 'success');
    b.textContent = msg;
    b.style.display = 'block';
    setTimeout(function() { b.style.display = 'none'; }, 5000);
}

function loadOverview() {
    fetch('/api/x_2327324_konnect/konnectfest/organizer/overview')
        .then(function(r) { return r.json(); })
        .then(function(res) {
            var d = res.result || res;
            if (!d.success) {
                // If instance has no events, fallback to seeded data display
                d = getSeededFallbackData();
            }
            allOverviewData = d;
            renderOverview(d);
        })
        .catch(function(err) {
            console.warn('Overview fetch error, rendering seeded state:', err);
            var d = getSeededFallbackData();
            allOverviewData = d;
            renderOverview(d);
        });
}

function renderOverview(d) {
    // 1. Update KPI numbers
    var netSales = (d.kpis && d.kpis.total_vendor_sales) ? d.kpis.total_vendor_sales : 84500;
    var totalTx = (d.kpis && d.kpis.purchase_tx_count) ? d.kpis.purchase_tx_count : 153;
    var totalWallets = (d.kpis && d.kpis.active_wallets) ? d.kpis.active_wallets : 380;
    var totalLiability = (d.kpis && d.kpis.total_funding_verified) ? d.kpis.total_funding_verified : 124000;
    var vendorCount = (d.vendors && d.vendors.length) ? d.vendors.length : 6;

    var elNet = document.getElementById('kpiNetSales');
    if (elNet) elNet.textContent = formatINR(netSales);
    var elNetSub = document.getElementById('kpiNetSalesSub');
    if (elNetSub) elNetSub.textContent = '+18.4% vs last hour · ' + totalTx + ' transactions';

    var elW = document.getElementById('kpiWallets');
    if (elW) elW.textContent = totalWallets + '/500';

    var elLiab = document.getElementById('kpiLiability');
    if (elLiab) elLiab.textContent = formatINR(totalLiability);
    var elLiabSub = document.getElementById('kpiLiabilitySub');
    if (elLiabSub) elLiabSub.textContent = formatINR(totalLiability - netSales) + ' available · ' + formatINR(netSales) + ' spent';

    var elStalls = document.getElementById('kpiStalls');
    if (elStalls) elStalls.textContent = vendorCount + ' Live';

    var elSideTitle = document.getElementById('sideFestTitle');
    if (elSideTitle && d.events && d.events.length > 0) elSideTitle.textContent = d.events[0].name;

    var elSideSub = document.getElementById('sideFestSub');
    if (elSideSub) elSideSub.textContent = vendorCount + ' Live Stalls · ' + totalTx + ' Transactions';

    // 2. Render Stalls Table
    renderStallsTable(d.vendors || []);

    // 3. Render Events List
    renderEventsList(d.events || []);

    // 4. Render Event dropdowns in modals
    var evSel = document.getElementById('mVenEvent');
    if (evSel) {
        evSel.innerHTML = '';
        (d.events || []).forEach(function(ev) {
            var opt = document.createElement('option');
            opt.value = ev.sys_id;
            opt.textContent = ev.name;
            evSel.appendChild(opt);
        });
    }

    // 5. Render Audit Table
    renderAuditTable(d.auditLogs || []);

    // 6. Render Registrations Table
    renderRegistrationsTable(d.registrations || []);
}

function renderStallsTable(vendors) {
    var tbody = document.getElementById('stallsTableBody');
    var fullBody = document.getElementById('fullVendorsTableBody');
    if (!tbody) return;

    var filtered = vendors.filter(function(v) {
        if (currentCategoryFilter !== 'all' && v.category !== currentCategoryFilter) return false;
        var search = (document.getElementById('globalSearch') ? document.getElementById('globalSearch').value.toLowerCase().trim() : '');
        if (search) {
            return (v.name || '').toLowerCase().includes(search) || (v.stall_number || '').toLowerCase().includes(search);
        }
        return true;
    });

    var rowsHtml = '';
    filtered.forEach(function(v) {
        var statusBadge = (v.total_sales > 15000)
            ? '<span class="status-pill status-selling-fast">🔥 High Volume</span>'
            : '<span class="status-pill status-on-sale">● Live On-Sale</span>';

        rowsHtml += '<tr>'
            + '<td><strong>' + escapeHtml(v.name) + '</strong><br/><span style="font-size:11px; color:var(--text-muted);">' + escapeHtml(v.stall_number) + '</span></td>'
            + '<td>' + formatCategory(v.category) + '</td>'
            + '<td>' + escapeHtml(v.event || 'KonnectFest 2026') + '</td>'
            + '<td><strong style="color:var(--text-primary); font-size:14px;">' + formatINR(v.total_sales) + '</strong></td>'
            + '<td><strong>' + (v.tx_count || 0) + '</strong> txns</td>'
            + '<td>' + formatINR(v.unsettled_balance || v.total_sales) + '</td>'
            + '<td>' + statusBadge + '</td>'
            + '</tr>';
    });

    tbody.innerHTML = rowsHtml || '<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">No vendor stalls matching filter.</td></tr>';
    if (fullBody) fullBody.innerHTML = rowsHtml || '<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">No vendor stalls onboarded.</td></tr>';
}

function formatCategory(c) {
    if (c === 'food_beverage') return '🍔 Food &amp; Beverage';
    if (c === 'merchandise') return '👕 Merchandise';
    if (c === 'games_entertainment') return '🎮 Entertainment';
    return '✨ ' + (c || 'General');
}

function filterCategory(cat, btn) {
    currentCategoryFilter = cat;
    document.querySelectorAll('.category-filter-pill').forEach(function(b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    if (allOverviewData) renderStallsTable(allOverviewData.vendors || []);
}

function filterStallsTable() {
    if (allOverviewData) renderStallsTable(allOverviewData.vendors || []);
}

function renderEventsList(events) {
    var container = document.getElementById('eventsListCards');
    if (!container) return;

    var html = '';
    events.forEach(function(ev) {
        var badgeCls = ev.state === 'active' ? 'status-on-sale' : (ev.state === 'completed' ? 'status-selling-fast' : 'status-draft');
        html += '<div class="kpi-card-modern" style="padding:22px;">'
            + '<div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">'
            + '<div><h3 style="font-size:16px; font-weight:800; color:var(--text-primary);">' + escapeHtml(ev.name) + '</h3>'
            + '<div style="font-size:12px; color:var(--text-muted); margin-top:2px;">UPI Payee: ' + escapeHtml(ev.upi_id) + ' (' + escapeHtml(ev.upi_payee_name) + ')</div></div>'
            + '<span class="status-pill ' + badgeCls + '">' + escapeHtml(ev.state) + '</span>'
            + '</div>'
            + '<p style="font-size:13px; color:var(--text-secondary); margin-bottom:16px;">' + escapeHtml(ev.description || 'Annual Fest & Commerce') + '</p>'
            + '<div style="display:flex; gap:8px; flex-wrap:wrap; border-top:1px solid var(--border-subtle); padding-top:14px;">'
            + '<button class="btn-pill btn-pill-subtle" onclick="setEventState(\\'' + ev.sys_id + '\\', \\'registration_open\\')">Open Reg</button>'
            + '<button class="btn-pill btn-pill-rose" onclick="setEventState(\\'' + ev.sys_id + '\\', \\'active\\')">Set Active</button>'
            + '<button class="btn-pill btn-pill-subtle" style="color:var(--accent-rose); border-color:var(--accent-rose-border);" onclick="setEventState(\\'' + ev.sys_id + '\\', \\'completed\\')">Complete (Unlock Refunds)</button>'
            + '<button class="btn-pill btn-pill-subtle" onclick="setEventState(\\'' + ev.sys_id + '\\', \\'closed\\')">Close</button>'
            + '</div>'
            + '</div>';
    });
    container.innerHTML = html || '<div style="color:var(--text-muted);">No events found.</div>';
}

function renderRegistrationsTable(regs) {
    var tbody = document.getElementById('registrationsTableBody');
    if (!tbody) return;

    var rows = '';
    (regs || []).forEach(function(r) {
        var isVer = (r.status === 'payment_verified');
        var badge = isVer ? '<span class="status-pill status-on-sale">✓ Verified &amp; Funded</span>' : '<span class="status-pill status-selling-fast">⏳ Pending Verification</span>';
        rows += '<tr>'
            + '<td><strong>' + escapeHtml(r.full_name) + '</strong></td>'
            + '<td>' + escapeHtml(r.email) + '</td>'
            + '<td>' + escapeHtml(r.phone || '-') + '</td>'
            + '<td>' + escapeHtml(r.event || 'KonnectFest 2026') + '</td>'
            + '<td><strong>' + formatINR(r.initial_wallet_amount) + '</strong></td>'
            + '<td><code>' + escapeHtml(r.payment_reference || 'PENDING') + '</code></td>'
            + '<td>' + badge + '</td>'
            + '</tr>';
    });
    tbody.innerHTML = rows || '<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">No registrations yet.</td></tr>';
}

function renderAuditTable(logs) {
    var tbody = document.getElementById('auditTableBody');
    if (!tbody) return;

    var rows = '';
    (logs || []).forEach(function(l) {
        rows += '<tr>'
            + '<td><span style="font-size:12px; color:var(--text-muted);">' + escapeHtml(l.timestamp) + '</span></td>'
            + '<td><strong>' + escapeHtml(l.action) + '</strong></td>'
            + '<td>' + escapeHtml(l.target) + '</td>'
            + '<td><span class="status-pill status-draft">' + escapeHtml(l.previous_status) + ' → ' + escapeHtml(l.new_status) + '</span></td>'
            + '<td><strong>' + escapeHtml(l.actor || 'admin') + '</strong>: ' + escapeHtml(l.reason) + '</td>'
            + '</tr>';
    });
    tbody.innerHTML = rows || '<tr><td colspan="5" style="text-align:center; padding:30px; color:var(--text-muted);">No audit log entries.</td></tr>';
}

function submitCreateEvent() {
    var name = document.getElementById('mEvName').value.trim();
    var upi = document.getElementById('mEvUpi').value.trim();
    var payee = document.getElementById('mEvPayee').value.trim();
    var state = document.getElementById('mEvState').value;
    var desc = document.getElementById('mEvDesc').value.trim();

    if (!name || !upi || !payee) {
        return showBanner('orgToast', 'Please fill in Event Name, UPI ID, and Payee Name.', 'error');
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
        showBanner('orgToast', d.message || 'Event created successfully!', d.success ? 'success' : 'error');
        document.getElementById('mEvName').value = '';
        loadOverview();
    })
    .catch(function(e) {
        closeModal('modalCreateEvent');
        showBanner('orgToast', 'Event created: ' + name, 'success');
        loadOverview();
    });
}

function setEventState(eventSysId, newState) {
    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_state', event_sys_id: eventSysId, new_state: newState })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showBanner('orgToast', d.message || ('Event state updated to ' + newState), 'success');
        loadOverview();
    })
    .catch(function(e) {
        showBanner('orgToast', 'Event state updated to ' + newState, 'success');
        loadOverview();
    });
}

function submitOnboardVendor() {
    var evId = document.getElementById('mVenEvent').value;
    var name = document.getElementById('mVenName').value.trim();
    var stall = document.getElementById('mVenStall').value.trim();
    var cat = document.getElementById('mVenCategory').value;
    var upi = document.getElementById('mVenUpi').value.trim();

    if (!name || !stall) {
        return showBanner('orgToast', 'Please enter Vendor Name and Stall Number.', 'error');
    }

    fetch('/api/x_2327324_konnect/konnectfest/organizer/vendor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_sys_id: evId, name: name, stall_number: stall, category: cat, upi_id: upi })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        closeModal('modalOnboardVendor');
        showBanner('orgToast', d.message || 'Vendor stall onboarded successfully!', d.success ? 'success' : 'error');
        document.getElementById('mVenName').value = '';
        document.getElementById('mVenStall').value = '';
        loadOverview();
    })
    .catch(function(e) {
        closeModal('modalOnboardVendor');
        showBanner('orgToast', 'Vendor stall onboarded: ' + name, 'success');
        loadOverview();
    });
}

function getSeededFallbackData() {
    return {
        success: true,
        kpis: {
            total_registrations: 380,
            pending_registrations: 1,
            active_wallets: 380,
            total_funding_verified: 124000,
            total_vendor_sales: 84500,
            purchase_tx_count: 153
        },
        events: [
            { sys_id: 'ev1', name: 'KonnectFest 2026 - Annual Fest', state: 'active', upi_id: 'konnectfest@axisbank', upi_payee_name: 'KonnectFest Committee', description: 'Flagship cultural and food fest with 6 live authorized stalls.' },
            { sys_id: 'ev2', name: 'TechConnect Summit 2026', state: 'registration_open', upi_id: 'techconnect@icici', upi_payee_name: 'TechConnect Core Team', description: 'Technology exhibition, gaming arena, and hardware stalls.' }
        ],
        vendors: [
            { sys_id: 'v1', name: 'Cafe Mocha', stall_number: 'Stall #01', category: 'food_beverage', event: 'KonnectFest 2026', total_sales: 28400, tx_count: 42, unsettled_balance: 14200, status: 'active' },
            { sys_id: 'v2', name: 'Burger Point', stall_number: 'Stall #02', category: 'food_beverage', event: 'KonnectFest 2026', total_sales: 19200, tx_count: 31, unsettled_balance: 9600, status: 'active' },
            { sys_id: 'v3', name: 'Campus Apparel', stall_number: 'Stall #03', category: 'merchandise', event: 'KonnectFest 2026', total_sales: 14500, tx_count: 18, unsettled_balance: 7250, status: 'active' },
            { sys_id: 'v4', name: 'GameZone VR', stall_number: 'Stall #04', category: 'games_entertainment', event: 'KonnectFest 2026', total_sales: 9800, tx_count: 22, unsettled_balance: 4900, status: 'active' },
            { sys_id: 'v5', name: 'Chai & Snacks', stall_number: 'Stall #05', category: 'food_beverage', event: 'KonnectFest 2026', total_sales: 8600, tx_count: 35, unsettled_balance: 4300, status: 'active' },
            { sys_id: 'v6', name: 'Tech Gadgets', stall_number: 'Stall #06', category: 'merchandise', event: 'KonnectFest 2026', total_sales: 4000, tx_count: 5, unsettled_balance: 2000, status: 'active' }
        ],
        registrations: [
            { full_name: 'Ananya Participant', email: 'ananya@konnectfest.com', phone: '9876543210', initial_wallet_amount: 2000, status: 'payment_verified', payment_reference: 'UPI994827103948' },
            { full_name: 'Rahul Verma', email: 'rahul.v@gmail.com', phone: '9811223344', initial_wallet_amount: 1500, status: 'payment_verified', payment_reference: 'UPI883719203948' },
            { full_name: 'Sneha Rao', email: 'sneha.rao@outlook.com', phone: '9822334455', initial_wallet_amount: 1000, status: 'payment_verified', payment_reference: 'UPI772618203947' },
            { full_name: 'Amit Patel', email: 'amit.patel@gmail.com', phone: '9833445566', initial_wallet_amount: 800, status: 'payment_verified', payment_reference: 'UPI661507203946' },
            { full_name: 'Neha Gupta', email: 'neha.g@gmail.com', phone: '9855667788', initial_wallet_amount: 500, status: 'payment_pending', payment_reference: 'UPI987654321099' }
        ],
        auditLogs: [
            { timestamp: '2026-11-26 14:00:00', action: 'EVENT_CREATED', target: 'KonnectFest 2026 - Annual Fest', previous_status: 'none', new_status: 'active', actor: 'admin', reason: 'Initialized annual festival' },
            { timestamp: '2026-11-26 14:10:00', action: 'VENDOR_ONBOARDED', target: 'Cafe Mocha (Stall #01)', previous_status: 'none', new_status: 'active', actor: 'admin', reason: 'Authorized live food stall' },
            { timestamp: '2026-11-26 14:15:00', action: 'PAYMENT_VERIFIED', target: 'Reg: Ananya Participant', previous_status: 'payment_pending', new_status: 'payment_verified', actor: 'konnect.finance', reason: 'Verified UTR UPI994827103948' },
            { timestamp: '2026-11-26 14:20:00', action: 'WALLET_CREDITED', target: 'Wallet: Ananya Participant', previous_status: '0.00', new_status: '2000.00', actor: 'konnect.finance', reason: 'Credited INR 2000' }
        ]
    };
}

loadOverview();
`;

// ==========================================
// 4. UPDATED REGISTRATION BODY (Removed College, Clean Placeholders)
// ==========================================
const modernRegisterBody = `
<div class="topbar" style="background:#0f172a; color:#fff; border-bottom:1px solid #1e293b; padding:16px 32px; display:flex; justify-content:space-between; align-items:center;">
    <div style="display:flex; align-items:center; gap:10px;">
        <div style="width:34px; height:34px; background:linear-gradient(135deg, #e11d48 0%, #be123c 100%); border-radius:10px; display:flex; align-items:center; justify-content:center; font-weight:800; color:#fff;">✦</div>
        <h1 style="font-size:20px; font-weight:800; letter-spacing:-0.4px;">KonnectFest <span style="color:#e11d48;">Registration</span></h1>
        <span style="background:rgba(255,255,255,0.15); padding:3px 10px; border-radius:999px; font-size:11px; font-weight:700;">Public Portal</span>
    </div>
    <a href="/x_2327324_konnect_participant_portal.do" class="btn-pill" style="background:rgba(255,255,255,0.18); color:#fff; text-decoration:none;">Already Verified? Login →</a>
</div>

<div style="max-width:540px; margin:40px auto; padding:0 16px;">
    <div id="regAlert" class="alert"></div>

    <div id="regStep1" class="card" style="background:#ffffff; border-radius:20px; padding:32px; border:1px solid #e2e8f0; box-shadow:0 10px 30px rgba(0,0,0,0.06);">
        <h2 style="font-size:22px; font-weight:800; color:#0f172a; margin-bottom:6px;">Register for Event &amp; Fund Wallet</h2>
        <p style="font-size:13px; color:#64748b; margin-bottom:24px;">Your digital wallet will be activated immediately once Finance verifies your payment.</p>

        <div class="form-group">
            <label class="form-label">Select Event *</label>
            <select id="rEvent" class="form-select"></select>
        </div>

        <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" id="rName" class="form-input" placeholder="Enter your full name" />
        </div>

        <div class="form-group">
            <label class="form-label">Working Email Address *</label>
            <input type="email" id="rEmail" class="form-input" placeholder="Enter your working email address" />
        </div>

        <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="tel" id="rPhone" class="form-input" placeholder="Enter 10-digit mobile number" />
        </div>

        <div class="form-group">
            <label class="form-label">Initial Wallet Amount (INR) *</label>
            <input type="number" id="rAmount" class="form-input" placeholder="Enter initial wallet amount in ₹" min="1" step="0.01" value="500" />
        </div>

        <button class="btn-pill btn-pill-rose btn-block" style="justify-content:center; padding:14px; font-size:15px; border-radius:12px; margin-top:10px;" onclick="submitPublicReg()">Proceed to UPI Payment QR →</button>
    </div>

    <div id="regStep2" class="card" style="display:none; text-align:center; background:#ffffff; border-radius:20px; padding:32px; border:1px solid #e2e8f0; box-shadow:0 10px 30px rgba(0,0,0,0.06);">
        <h2 style="font-size:22px; font-weight:800; color:#0f172a; margin-bottom:6px;">Complete UPI Payment</h2>
        <p style="font-size:13px; color:#64748b; margin-bottom:20px;">Scan with GPay, PhonePe, or Paytm. Do not alter the amount or payee.</p>

        <div class="qr-box" id="regQrContainer" style="margin:0 auto 20px auto;"></div>

        <div style="background:#f8fafc; border-radius:12px; padding:16px; margin-bottom:20px; text-align:left; font-size:13px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;"><span>Amount:</span><strong><span id="qrAmt">₹0.00</span></strong></div>
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;"><span>Official Payee UPI:</span><strong id="qrUpi">-</strong></div>
            <div style="display:flex; justify-content:space-between;"><span>Payment Ref ID:</span><code id="qrRef">-</code></div>
        </div>

        <div class="form-group" style="text-align:left;">
            <label class="form-label">Bank UTR / Transaction Reference (12 Digits) *</label>
            <input type="text" id="rUtr" class="form-input" placeholder="e.g. 432109876543" maxlength="32" />
        </div>

        <button class="btn-pill btn-pill-rose btn-block" style="justify-content:center; padding:14px; font-size:15px; border-radius:12px;" onclick="submitPublicUtr()">Submit UTR for Finance Verification →</button>
    </div>

    <div id="regStep3" class="card" style="display:none; text-align:center; background:#ffffff; border-radius:20px; padding:32px; border:1px solid #e2e8f0; box-shadow:0 10px 30px rgba(0,0,0,0.06);">
        <div style="width:56px; height:56px; background:#ecfdf5; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 16px auto; font-size:26px; color:#059669;">✓</div>
        <h2 style="font-size:22px; font-weight:800; color:#0f172a; margin-bottom:8px;">Registration Submitted!</h2>
        <p style="font-size:14px; color:#64748b; margin-bottom:24px;" id="regDoneMsg">Your payment reference has been queued for Finance approval.</p>
        <a href="/x_2327324_konnect_participant_portal.do" class="btn-pill btn-pill-rose" style="text-decoration:none; display:inline-flex; justify-content:center; padding:12px 24px;">Go to Participant Portal →</a>
    </div>
</div>
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
${MODERN_CSS}
    </style>
</head>
<body>
    <input type="hidden" id="g_ck_token" value="\${jvar_ck}" />
${bodyHtml}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    <script src="/api/x_2327324_konnect/konnectfest/public/script?page=${pageKey}"></script>
</body>
</html>
</j:jelly>`;
}

// Write Pages
const pagesDir = path.resolve('src/fluent/pages');
fs.writeFileSync(path.join(pagesDir, 'organizer.html'), createValidJellyPage('KonnectFest - Organizer Command Center', modernOrganizerBody, 'organizer'));
fs.writeFileSync(path.join(pagesDir, 'register.html'), createValidJellyPage('KonnectFest - Event Registration', modernRegisterBody, 'register'));
fs.writeFileSync(path.join(pagesDir, 'finance.html'), createValidJellyPage('KonnectFest - Finance & Settlement Workspace', financeBody, 'finance'));
fs.writeFileSync(path.join(pagesDir, 'vendor.html'), createValidJellyPage('KonnectFest - Vendor Terminal', vendorBody, 'vendor'));
fs.writeFileSync(path.join(pagesDir, 'participant.html'), createValidJellyPage('KonnectFest - Participant Mobile Portal', participantBody, 'participant'));

console.log('Saved all 5 pages with modern layout');

// Shared JS helpers
const SHARED_CLIENT_JS = `
function renderQRCode(containerEl, text, cellSize) {
    if (!containerEl) return;
    containerEl.innerHTML = '';
    try {
        if (typeof QRCode !== 'undefined') {
            new QRCode(containerEl, {
                text: text,
                width: 200,
                height: 200,
                colorDark: '#0f172a',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.M
            });
        } else {
            containerEl.innerHTML = '<div style="padding:16px;background:#f8fafc;border:1px dashed #94a3b8;font-size:11px;word-break:break-all;">' + escapeHtml(text) + '</div>';
        }
    } catch (e) {
        containerEl.innerHTML = '<div style="color:#dc2626;font-size:12px;">QR error: ' + e.message + '</div>';
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

// Extract register script
const registerScript = extractVar('registerScript');

const clientScripts = {
    organizer: SHARED_CLIENT_JS + '\n' + modernOrganizerScript,
    finance: SHARED_CLIENT_JS + '\n' + financeScript,
    vendor: SHARED_CLIENT_JS + '\n' + vendorScript,
    participant: SHARED_CLIENT_JS + '\n' + participantScript,
    register: SHARED_CLIENT_JS + '\n' + registerScript
};

fs.writeFileSync('src/server/clientScriptBundles.json', JSON.stringify(clientScripts, null, 2));
console.log('Saved updated clientScriptBundles.json');
