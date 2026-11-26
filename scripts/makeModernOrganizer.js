const fs = require('fs');
const path = require('path');

// ==========================================
// 1. HIGH-FIDELITY EVENTUM-STYLE CSS
// ==========================================
const MODERN_DASHBOARD_CSS = `
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
body { background: var(--bg-page); color: var(--text-primary); line-height: 1.5; min-height: 100vh; display: flex; }

/* LAYOUT: SIDEBAR + MAIN CONTENT */
.app-layout { display: flex; width: 100%; min-height: 100vh; }
.sidebar { width: 260px; background: #ffffff; border-right: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between; padding: 24px 18px; flex-shrink: 0; }
.main-wrapper { flex: 1; display: flex; flex-direction: column; min-width: 0; background: var(--bg-page); }

/* SIDEBAR BRAND & NAV */
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

/* TOPBAR HEADER */
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

/* DASHBOARD MAIN CONTENT */
.content-area { padding: 32px; flex: 1; max-width: 1400px; margin: 0 auto; width: 100%; }

/* WELCOME BANNER */
.welcome-banner { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 16px; }
.welcome-title { font-size: 26px; font-weight: 800; letter-spacing: -0.6px; color: var(--text-primary); }
.welcome-sub { font-size: 14px; color: var(--text-muted); margin-top: 4px; }
.team-avatars-wrap { display: flex; align-items: center; gap: 10px; }
.avatars-group { display: flex; margin-right: 6px; }
.avatar-circle { width: 34px; height: 34px; border-radius: 50%; border: 2px solid #fff; margin-left: -8px; background-size: cover; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; }
.avatar-circle:first-child { margin-left: 0; }
.btn-invite { background: #fff; border: 1px solid var(--border-subtle); padding: 8px 14px; border-radius: 999px; font-size: 12px; font-weight: 600; color: var(--text-secondary); cursor: pointer; }
.btn-invite:hover { background: #f8fafc; }

/* 4 KPI CARDS GRID */
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

/* HERO DARK KPI CARD (Image 3 Ticket Sold style) */
.kpi-card-dark { background: #0f172a; color: #ffffff; border: 1px solid #1e293b; box-shadow: 0 10px 25px -3px rgba(15, 23, 42, 0.2); }
.kpi-card-dark .kpi-num { color: #ffffff; }
.kpi-card-dark .kpi-subtext { color: #94a3b8; }
.kpi-card-dark .kpi-arrow { color: #64748b; }

/* CHARTS SECTION (Image 3 Layout) */
.charts-row { display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; margin-bottom: 32px; }
@media (max-width: 960px) { .charts-row { grid-template-columns: 1fr; } }

.chart-card { background: #ffffff; border-radius: var(--radius-lg); padding: 24px; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-soft); }
.chart-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.chart-title { font-size: 16px; font-weight: 800; color: var(--text-primary); }
.chart-sub { font-size: 12px; color: var(--text-muted); }
.chart-badge { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; background: var(--accent-rose-light); color: var(--accent-rose); }

/* SVG AREA CHART */
.area-chart-container { width: 100%; height: 210px; position: relative; }
.area-chart-container svg { width: 100%; height: 100%; overflow: visible; }
.chart-legend { display: flex; gap: 16px; margin-top: 14px; font-size: 12px; font-weight: 600; color: var(--text-secondary); }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }

/* BAR CHART (Payouts style from Image 3) */
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

/* DATA TABLES SECTION (Image 3 Ticket Breakdown Style) */
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

/* BADGES */
.status-pill { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; }
.status-selling-fast { background: #fff1f2; color: #e11d48; border: 1px solid #fecdd3; }
.status-on-sale { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
.status-draft { background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; }

/* MODALS */
.modal-overlay { display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); z-index: 100; align-items: center; justify-content: center; padding: 16px; backdrop-filter: blur(4px); }
.modal-window { background: #ffffff; border-radius: 20px; width: 100%; max-width: 500px; padding: 28px; box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25); border: 1px solid var(--border-subtle); }
.modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.modal-title { font-size: 18px; font-weight: 800; color: var(--text-primary); }
.btn-close { background: none; border: none; font-size: 20px; color: var(--text-muted); cursor: pointer; }

/* TOAST BANNER */
.toast-banner { position: fixed; bottom: 24px; right: 24px; z-index: 200; padding: 14px 20px; border-radius: 12px; font-size: 14px; font-weight: 600; display: none; box-shadow: 0 10px 25px -3px rgba(0,0,0,0.15); animation: slideUp 0.2s ease; }
@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.toast-success { background: #059669; color: #fff; }
.toast-error { background: #e11d48; color: #fff; }
`;

console.log('CSS Ready');
