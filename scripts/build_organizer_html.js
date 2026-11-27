const fs = require('fs');
const { logoBase64 } = require('./load_logo');

console.log('Generating authentic ServiceNow Polaris Organizer Workspace (organizer.html)...');

const organizerHtml = `<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide">
<g:evaluate var="jvar_ck">gs.getSessionToken();</g:evaluate>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KonnectFest - Organizer Command Center</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet" />
    <style>
        :root {
            --sn-primary: #0f2e46;
            --sn-primary-light: #184163;
            --sn-green: #22c55e;
            --sn-green-dark: #16a34a;
            --sn-cyan: #0284c7;
            --sn-bg-page: #f8fafc;
            --sn-card-bg: #ffffff;
            --sn-border: #e2e8f0;
            --sn-border-focus: #3b82f6;
            --sn-text-main: #0f172a;
            --sn-text-muted: #64748b;
            --sn-radius: 8px;
            --sn-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
            --sn-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: var(--sn-bg-page);
            color: var(--sn-text-main);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
        }

        /* 1. BRAND HEADER */
        .brand-header {
            background-color: #0b1a28;
            color: #ffffff;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            border-bottom: 2px solid #22c55e;
            position: sticky;
            top: 0;
            z-index: 50;
        }
        .brand-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .brand-logo-img {
            width: 34px;
            height: 34px;
            border-radius: 6px;
            object-fit: cover;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: #ffffff;
        }
        .brand-titles h1 {
            font-size: 15px;
            font-weight: 700;
            letter-spacing: -0.2px;
            color: #ffffff;
            line-height: 1.2;
        }
        .brand-titles .badge-sub {
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #22c55e;
        }

        .brand-right {
            display: flex;
            align-items: center;
            gap: 16px;
        }
        .sync-indicator {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 11px;
            color: #94a3b8;
            background: rgba(255, 255, 255, 0.06);
            padding: 4px 10px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .sync-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background-color: #22c55e;
            box-shadow: 0 0 6px #22c55e;
            animation: pulseSync 2s infinite;
        }
        @keyframes pulseSync {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.85); }
            100% { opacity: 1; transform: scale(1); }
        }

        .quick-nav-link {
            color: #cbd5e1;
            font-size: 12px;
            font-weight: 500;
            text-decoration: none;
            padding: 5px 10px;
            border-radius: 5px;
            transition: all 0.15s ease;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .quick-nav-link:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.12);
        }
        .user-pill {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            font-weight: 600;
            color: #f1f5f9;
            background: rgba(255, 255, 255, 0.08);
            padding: 4px 12px;
            border-radius: 16px;
        }
        .user-avatar-circle {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #22c55e;
            color: #0b1a28;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 700;
        }

        /* 2. MAIN LAYOUT: SIDEBAR + CONTENT */
        .workspace-layout {
            display: flex;
            flex: 1;
            min-height: calc(100vh - 56px);
        }

        /* LEFT SIDEBAR */
        .workspace-sidebar {
            width: 240px;
            background-color: #0f2438;
            color: #cbd5e1;
            display: flex;
            flex-direction: column;
            border-right: 1px solid #1e3a56;
            flex-shrink: 0;
        }
        .sidebar-header {
            padding: 16px 18px 10px 18px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            color: #64748b;
        }
        .sidebar-nav {
            list-style: none;
            padding: 0 8px;
            display: flex;
            flex-direction: column;
            gap: 2px;
            flex: 1;
        }
        .nav-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 9px 12px;
            font-size: 13px;
            font-weight: 500;
            border-radius: 6px;
            color: #94a3b8;
            cursor: pointer;
            transition: all 0.15s ease;
            user-select: none;
        }
        .nav-item:hover {
            color: #ffffff;
            background-color: rgba(255, 255, 255, 0.06);
        }
        .nav-item.active {
            color: #ffffff;
            background: linear-gradient(90deg, #0284c7 0%, #0369a1 100%);
            font-weight: 600;
            box-shadow: 0 2px 4px rgba(2, 132, 199, 0.25);
        }
        .nav-item svg {
            width: 17px;
            height: 17px;
            fill: none;
            stroke: currentColor;
            stroke-width: 2;
            flex-shrink: 0;
        }
        .sidebar-divider {
            height: 1px;
            background: #1e3a56;
            margin: 10px 8px;
        }

        /* WORKSPACE CONTENT AREA */
        .workspace-content {
            flex: 1;
            padding: 24px 28px;
            max-width: 1400px;
            margin: 0 auto;
            width: 100%;
        }

        /* VIEW CONTAINERS */
        .workspace-view {
            display: none;
            animation: fadeInView 0.2s ease-in-out;
        }
        .workspace-view.active {
            display: block;
        }
        @keyframes fadeInView {
            from { opacity: 0; transform: translateY(3px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* 3. EXECUTIVE HERO CARD */
        .exec-hero-card {
            background: #ffffff;
            border: 1px solid var(--sn-border);
            border-radius: var(--sn-radius);
            padding: 18px 22px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 22px;
            box-shadow: var(--sn-shadow);
        }
        .hero-left {
            display: flex;
            align-items: center;
            gap: 16px;
        }
        .hero-icon-box {
            width: 50px;
            height: 50px;
            border-radius: 10px;
            background: linear-gradient(135deg, #6366f1, #4338ca);
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 4px 8px rgba(99, 102, 241, 0.25);
        }
        .hero-text h2 {
            font-size: 19px;
            font-weight: 700;
            color: var(--sn-text-main);
            letter-spacing: -0.3px;
        }
        .hero-text p {
            font-size: 13px;
            color: var(--sn-text-muted);
            margin-top: 2px;
        }

        .hero-controls {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .sn-select {
            padding: 7px 12px;
            font-size: 13px;
            font-weight: 500;
            color: var(--sn-text-main);
            background: #ffffff;
            border: 1px solid var(--sn-border);
            border-radius: 6px;
            cursor: pointer;
            outline: none;
        }
        .sn-select:focus { border-color: var(--sn-border-focus); }

        .sn-btn {
            padding: 7px 14px;
            font-size: 13px;
            font-weight: 600;
            border-radius: 6px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.15s ease;
            border: none;
            outline: none;
        }
        .sn-btn-primary {
            background-color: #0284c7;
            color: #ffffff;
        }
        .sn-btn-primary:hover { background-color: #0369a1; }
        .sn-btn-emerald {
            background-color: #10b981;
            color: #ffffff;
        }
        .sn-btn-emerald:hover { background-color: #059669; }
        .sn-btn-secondary {
            background-color: #f1f5f9;
            color: var(--sn-text-main);
            border: 1px solid var(--sn-border);
        }
        .sn-btn-secondary:hover { background-color: #e2e8f0; }
        .sn-btn-danger {
            background-color: #ef4444;
            color: #ffffff;
        }
        .sn-btn-danger:hover { background-color: #dc2626; }

        /* 4. KPI METRIC CARDS GRID (5 Cards) */
        .kpi-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 16px;
            margin-bottom: 24px;
        }
        .kpi-card {
            background: #ffffff;
            border: 1px solid var(--sn-border);
            border-radius: var(--sn-radius);
            padding: 16px 18px;
            box-shadow: var(--sn-shadow);
            transition: transform 0.15s ease;
        }
        .kpi-card:hover { transform: translateY(-2px); }
        .kpi-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        .kpi-title {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--sn-text-muted);
        }
        .kpi-icon {
            width: 26px;
            height: 26px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
        }
        .kpi-val {
            font-size: 22px;
            font-weight: 700;
            color: var(--sn-text-main);
            line-height: 1.2;
            margin-bottom: 4px;
        }
        .kpi-sub {
            font-size: 11px;
            color: #16a34a;
            font-weight: 500;
        }

        /* 5. DASHBOARD CHARTS ROW */
        .dash-charts-row {
            display: grid;
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 18px;
            margin-bottom: 24px;
        }
        .chart-card {
            background: #ffffff;
            border: 1px solid var(--sn-border);
            border-radius: var(--sn-radius);
            padding: 18px;
            box-shadow: var(--sn-shadow);
        }
        .chart-card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 14px;
        }
        .chart-card-title {
            font-size: 14px;
            font-weight: 700;
            color: var(--sn-text-main);
        }

        /* SVG Trend Chart Styling */
        .trend-bars-container {
            display: flex;
            align-items: flex-end;
            gap: 10px;
            height: 140px;
            padding-top: 10px;
            border-bottom: 1px solid var(--sn-border);
        }
        .trend-col {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            justify-content: flex-end;
        }
        .trend-bar {
            width: 100%;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            background: #38bdf8;
            transition: height 0.3s ease, background 0.15s ease;
        }
        .trend-bar:hover { background: #0284c7; }
        .trend-label {
            font-size: 10px;
            color: var(--sn-text-muted);
            margin-top: 6px;
        }

        /* Vendor Redemption Progress Rows */
        .vendor-redempt-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .vendor-redempt-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
        }
        .vendor-progress-bar {
            height: 6px;
            background: #f1f5f9;
            border-radius: 3px;
            overflow: hidden;
            margin-top: 4px;
        }
        .vendor-progress-fill {
            height: 100%;
            background: #0284c7;
            border-radius: 3px;
        }

        /* Donut Chart Simulation */
        .donut-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px 0;
        }
        .donut-legend {
            width: 100%;
            margin-top: 14px;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .donut-legend-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .donut-badge-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 6px;
        }

        /* 6. DATA TABLES */
        .sn-table-container {
            background: #ffffff;
            border: 1px solid var(--sn-border);
            border-radius: var(--sn-radius);
            box-shadow: var(--sn-shadow);
            overflow: hidden;
            margin-bottom: 24px;
        }
        .table-toolbar {
            padding: 14px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--sn-border);
        }
        .table-toolbar-title {
            font-size: 14px;
            font-weight: 700;
            color: var(--sn-text-main);
        }
        .table-search-input {
            padding: 6px 12px;
            font-size: 12px;
            border: 1px solid var(--sn-border);
            border-radius: 6px;
            outline: none;
            width: 220px;
        }
        .table-search-input:focus { border-color: var(--sn-border-focus); }

        .sn-data-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            text-align: left;
        }
        .sn-data-table th {
            background: #f8fafc;
            color: var(--sn-text-muted);
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 10px 18px;
            border-bottom: 1px solid var(--sn-border);
        }
        .sn-data-table td {
            padding: 12px 18px;
            border-bottom: 1px solid #f1f5f9;
            color: var(--sn-text-main);
        }
        .sn-data-table tr:hover td {
            background-color: #f8fafc;
        }
        .badge-status {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
        }
        .status-active { background: #dcfce7; color: #166534; }
        .status-pending { background: #fef9c3; color: #854d0e; }
        .status-closed { background: #f1f5f9; color: #475569; }

        .pagination-bar {
            padding: 10px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            color: var(--sn-text-muted);
            border-top: 1px solid var(--sn-border);
            background: #ffffff;
        }

        /* 7. FORM SECTIONS */
        .form-card {
            background: #ffffff;
            border: 1px solid var(--sn-border);
            border-radius: var(--sn-radius);
            padding: 22px 24px;
            box-shadow: var(--sn-shadow);
            max-width: 800px;
            margin-bottom: 24px;
        }
        .form-group {
            margin-bottom: 16px;
        }
        .form-label {
            display: block;
            font-size: 12px;
            font-weight: 600;
            color: #334155;
            margin-bottom: 6px;
        }
        .form-label .req { color: #dc2626; }
        .form-input {
            width: 100%;
            padding: 8px 12px;
            font-size: 13px;
            color: var(--sn-text-main);
            border: 1px solid var(--sn-border);
            border-radius: 6px;
            outline: none;
            transition: border-color 0.15s ease;
        }
        .form-input:focus { border-color: var(--sn-border-focus); }
        .form-grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }

        /* 8. MODAL POPUP DIALOGS */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(2px);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 100;
            animation: fadeInModal 0.15s ease;
        }
        .modal-box {
            background: #ffffff;
            border-radius: 10px;
            width: 520px;
            max-width: 90vw;
            box-shadow: var(--sn-shadow-lg);
            overflow: hidden;
            animation: slideUpModal 0.2s ease;
        }
        @keyframes fadeInModal { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUpModal { from { transform: translateY(12px); } to { transform: translateY(0); } }

        .modal-header {
            padding: 16px 20px;
            background: #f8fafc;
            border-bottom: 1px solid var(--sn-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .modal-title {
            font-size: 15px;
            font-weight: 700;
            color: var(--sn-text-main);
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 18px;
            color: #94a3b8;
            cursor: pointer;
        }
        .modal-close:hover { color: var(--sn-text-main); }
        .modal-body {
            padding: 20px;
            max-height: 75vh;
            overflow-y: auto;
        }
        .modal-footer {
            padding: 14px 20px;
            background: #f8fafc;
            border-top: 1px solid var(--sn-border);
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 10px;
        }

        /* TOAST BANNER */
        .toast-banner {
            position: fixed;
            bottom: 24px;
            right: 24px;
            padding: 12px 18px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 500;
            color: #ffffff;
            z-index: 200;
            box-shadow: var(--sn-shadow-lg);
            display: none;
            animation: slideUpModal 0.2s ease;
        }
        .toast-success { background-color: #10b981; }
        .toast-error { background-color: #ef4444; }
        .toast-info { background-color: #0284c7; }
    </style>
</head>
<body>
    <input type="hidden" id="g_ck_token" value="\${jvar_ck}" />

    <!-- 1. AUTHENTIC BRAND HEADER -->
    <header class="brand-header">
        <div class="brand-left">
            <img src="${logoBase64}" alt="KonnectFest Logo" class="brand-logo-img" />
            <div class="brand-titles">
                <h1>KonnectFest Command Center</h1>
                <div class="badge-sub">ServiceNow Polaris Workspace</div>
            </div>
        </div>

        <div class="brand-right">
            <div class="sync-indicator">
                <span class="sync-dot"></span>
                <span>Live Telemetry (5s)</span>
                <span id="headerSyncTime" style="margin-left:4px; color:#cbd5e1;">-</span>
            </div>
            <a href="/x_2327324_konnect_register.do" target="_blank" class="quick-nav-link">Public Registration ↗</a>
            <a href="/x_2327324_konnect_financer_workspace.do" target="_blank" class="quick-nav-link">Finance Workspace ↗</a>
            <a href="/x_2327324_konnect_vendor_workspace.do" target="_blank" class="quick-nav-link">Vendor POS ↗</a>
            <div class="user-pill">
                <span class="user-avatar-circle">AS</span>
                <span>Aswin Sai (Organizer Admin)</span>
            </div>
        </div>
    </header>

    <!-- 2. WORKSPACE LAYOUT -->
    <div class="workspace-layout">
        <!-- SIDEBAR -->
        <aside class="workspace-sidebar">
            <div class="sidebar-header">Main Workspaces</div>
            <ul class="sidebar-nav">
                <li class="nav-item active" onclick="switchView('viewDashboard', this)">
                    <svg viewBox="0 0 24 24"><path d="M3 3h7v9H3V3zm11 0h7v5h-7V3zm0 9h7v9h-7v-9zM3 16h7v5H3v-5z"/></svg>
                    <span>Organizer Dashboard</span>
                </li>
                <li class="nav-item" onclick="switchView('viewEventSetup', this)">
                    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    <span>Event Setup</span>
                </li>
                <li class="nav-item" onclick="switchView('viewParticipants', this)">
                    <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 3s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                    <span>Participants</span>
                </li>
                <li class="nav-item" onclick="switchView('viewVendors', this)">
                    <svg viewBox="0 0 24 24"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/></svg>
                    <span>Vendors and Stalls</span>
                </li>
                <li class="nav-item" onclick="switchView('viewTransactions', this)">
                    <svg viewBox="0 0 24 24"><path d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-9-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-6v11c0 1.1-.9 2-2 2H4v-2h17V7h2z"/></svg>
                    <span>Transactions</span>
                </li>
                <li class="nav-item" onclick="switchView('viewWallets', this)">
                    <svg viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                    <span>Wallets and Ledger</span>
                </li>
                <li class="nav-item" onclick="switchView('viewCoupons', this)">
                    <svg viewBox="0 0 24 24"><path d="M20 10V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v5c1.1 0 2 .9 2 2s-.9 2-2 2v5c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-5c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-4v2.54c-.98.3-1.72 1.17-1.92 2.21-.05.25-.08.5-.08.75s.03.5.08.75c.2 1.04.94 1.91 1.92 2.21V19H6v-2.54c.98-.3 1.72-1.17 1.92-2.21.05-.25.08-.5.08-.75s-.03-.5-.08-.75c-.2-1.04-.94-1.91-1.92-2.21V5h12z"/></svg>
                    <span>Digital Coupons</span>
                </li>
                <li class="nav-item" onclick="switchView('viewSettlements', this)">
                    <svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                    <span>Settlements</span>
                </li>
                <li class="nav-item" onclick="switchView('viewReports', this)">
                    <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
                    <span>Reports and Analytics</span>
                </li>
                <li class="sidebar-divider"></li>
                <li class="nav-item" onclick="switchView('viewSysAdmin', this)">
                    <svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
                    <span>System Administration</span>
                </li>
            </ul>
        </aside>

        <!-- CONTENT VIEWS -->
        <main class="workspace-content">
            <!-- 1. DASHBOARD VIEW -->
            <div id="viewDashboard" class="workspace-view active">
                <!-- HERO CARD -->
                <div class="exec-hero-card">
                    <div class="hero-left">
                        <div class="hero-icon-box">🎟</div>
                        <div class="hero-text">
                            <h2 id="heroEventTitle">KonnectFest 2026</h2>
                            <p>Real-time telemetry of registrations, vendor transactions, and float balances.</p>
                        </div>
                    </div>
                    <div class="hero-controls">
                        <select id="dashEventSelect" class="sn-select" onchange="onDashEventChange(this.value)">
                            <option value="">Loading events...</option>
                        </select>
                        <select class="sn-select">
                            <option>Last 7 days</option>
                            <option>Today</option>
                            <option>Entire Festival</option>
                        </select>
                        <button class="sn-btn sn-btn-secondary" onclick="manualRefresh()">↻ Refresh</button>
                        <button class="sn-btn sn-btn-primary" onclick="openCreateEventModal()">+ New Event</button>
                        <button class="sn-btn sn-btn-emerald" onclick="openOnboardStallModal()">+ Onboard Stall</button>
                    </div>
                </div>

                <!-- 5 KPI CARDS -->
                <div class="kpi-grid">
                    <div class="kpi-card">
                        <div class="kpi-header">
                            <span class="kpi-title">Total Participants</span>
                            <span class="kpi-icon" style="background:#e0f2fe; color:#0284c7;">👥</span>
                        </div>
                        <div class="kpi-val" id="kpiParticipants">0</div>
                        <div class="kpi-sub" id="kpiParticipantsSub">Verified &amp; active</div>
                    </div>

                    <div class="kpi-card">
                        <div class="kpi-header">
                            <span class="kpi-title">Wallet Balance (Total)</span>
                            <span class="kpi-icon" style="background:#dcfce7; color:#16a34a;">👛</span>
                        </div>
                        <div class="kpi-val" id="kpiWalletBalance">₹0.00</div>
                        <div class="kpi-sub">Total active float liability</div>
                    </div>

                    <div class="kpi-card">
                        <div class="kpi-header">
                            <span class="kpi-title">Total Transactions</span>
                            <span class="kpi-icon" style="background:#f3e8ff; color:#9333ea;">🧾</span>
                        </div>
                        <div class="kpi-val" id="kpiTransactions">0</div>
                        <div class="kpi-sub">Verified coupon orders</div>
                    </div>

                    <div class="kpi-card">
                        <div class="kpi-header">
                            <span class="kpi-title">Redeemed Value</span>
                            <span class="kpi-icon" style="background:#ffedd5; color:#ea580c;">🎁</span>
                        </div>
                        <div class="kpi-val" id="kpiRedeemed">₹0.00</div>
                        <div class="kpi-sub">Coupons spent at stalls</div>
                    </div>

                    <div class="kpi-card">
                        <div class="kpi-header">
                            <span class="kpi-title">Active Vendors</span>
                            <span class="kpi-icon" style="background:#fee2e2; color:#dc2626;">🏪</span>
                        </div>
                        <div class="kpi-val" id="kpiActiveVendors">0</div>
                        <div class="kpi-sub">100% operational stalls</div>
                    </div>
                </div>

                <!-- CHARTS ROW -->
                <div class="dash-charts-row">
                    <!-- Trend Chart -->
                    <div class="chart-card">
                        <div class="chart-card-header">
                            <div class="chart-card-title">Transaction Trend</div>
                            <span style="font-size:11px; color:#64748b;">Hourly gross purchases</span>
                        </div>
                        <div class="trend-bars-container" id="trendBarsBox">
                            <div class="trend-col"><div class="trend-bar" style="height:35%;"></div><span class="trend-label">8 AM</span></div>
                            <div class="trend-col"><div class="trend-bar" style="height:48%;"></div><span class="trend-label">10 AM</span></div>
                            <div class="trend-col"><div class="trend-bar" style="height:62%;"></div><span class="trend-label">12 PM</span></div>
                            <div class="trend-col"><div class="trend-bar" style="height:55%;"></div><span class="trend-label">2 PM</span></div>
                            <div class="trend-col"><div class="trend-bar" style="height:70%;"></div><span class="trend-label">4 PM</span></div>
                            <div class="trend-col"><div class="trend-bar" style="height:95%; background:#0284c7;"></div><span class="trend-label">6 PM</span></div>
                            <div class="trend-col"><div class="trend-bar" style="height:80%;"></div><span class="trend-label">8 PM</span></div>
                            <div class="trend-col"><div class="trend-bar" style="height:40%;"></div><span class="trend-label">10 PM</span></div>
                        </div>
                    </div>

                    <!-- Redemption by Vendor -->
                    <div class="chart-card">
                        <div class="chart-card-header">
                            <div class="chart-card-title">Redemption by Vendor</div>
                            <span style="font-size:11px; color:#0284c7; cursor:pointer;" onclick="switchView('viewVendors')">View all</span>
                        </div>
                        <div class="vendor-redempt-list" id="dashVendorList">
                            <div style="font-size:12px; color:#94a3b8; text-align:center; padding:20px 0;">Loading vendor redemption telemetry...</div>
                        </div>
                    </div>

                    <!-- Settlement Status -->
                    <div class="chart-card">
                        <div class="chart-card-header">
                            <div class="chart-card-title">Settlement Status</div>
                            <span style="font-size:11px; color:#0284c7; cursor:pointer;" onclick="switchView('viewSettlements')">View all</span>
                        </div>
                        <div class="donut-container">
                            <svg width="120" height="120" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" stroke-width="3.8"></circle>
                                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#10b981" stroke-width="3.8" stroke-dasharray="60 40" stroke-dashoffset="25"></circle>
                                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#0284c7" stroke-width="3.8" stroke-dasharray="25 75" stroke-dashoffset="65"></circle>
                                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f59e0b" stroke-width="3.8" stroke-dasharray="15 85" stroke-dashoffset="90"></circle>
                                <text x="18" y="20.5" font-size="6.5" font-weight="bold" fill="#0f172a" text-anchor="middle" id="donutTotalVendors">0</text>
                            </svg>
                            <div class="donut-legend">
                                <div class="donut-legend-item">
                                    <span><span class="donut-badge-dot" style="background:#10b981;"></span>Settled</span>
                                    <strong id="statSettledCount">0</strong>
                                </div>
                                <div class="donut-legend-item">
                                    <span><span class="donut-badge-dot" style="background:#0284c7;"></span>Approved</span>
                                    <strong id="statApprovedCount">0</strong>
                                </div>
                                <div class="donut-legend-item">
                                    <span><span class="donut-badge-dot" style="background:#f59e0b;"></span>Pending Review</span>
                                    <strong id="statPendingCount">0</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- RECENT TRANSACTIONS TABLE -->
                <div class="sn-table-container">
                    <div class="table-toolbar">
                        <div class="table-toolbar-title">Recent Transactions</div>
                        <input type="text" id="txSearchInput" class="table-search-input" placeholder="Search transactions..." oninput="filterRecentTx(this.value)" />
                    </div>
                    <table class="sn-data-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Timestamp</th>
                                <th>Participant</th>
                                <th>Vendor / Stall</th>
                                <th>Coupons (₹)</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="txTableBody">
                            <tr><td colspan="6" style="text-align:center; color:#94a3b8;">Loading transactions...</td></tr>
                        </tbody>
                    </table>
                    <div class="pagination-bar">
                        <span id="txPaginationInfo">Showing 0-0 of 0</span>
                        <div style="display:flex; gap:6px;">
                            <button class="sn-btn sn-btn-secondary" style="padding:4px 10px; font-size:11px;" onclick="changeTxPage(-1)">‹ Prev</button>
                            <button class="sn-btn sn-btn-secondary" style="padding:4px 10px; font-size:11px;" onclick="changeTxPage(1)">Next ›</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. EVENT SETUP VIEW -->
            <div id="viewEventSetup" class="workspace-view">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
                    <div>
                        <h2 style="font-size:18px; font-weight:700;">Festival Event Setup and Centralized Receiving UPI</h2>
                        <p style="font-size:13px; color:#64748b;">Configure master event parameters, fixed registration fees, and committee receiving account.</p>
                    </div>
                    <button class="sn-btn sn-btn-primary" onclick="openCreateEventModal()">+ Create New Event</button>
                </div>

                <div class="form-card">
                    <div class="form-group">
                        <label class="form-label">Select Event to Edit</label>
                        <select id="editEventSelector" class="sn-select" style="width:100%;" onchange="onSelectEventToEdit(this.value)">
                            <option value="">Loading events...</option>
                        </select>
                    </div>

                    <div class="form-grid-2">
                        <div class="form-group">
                            <label class="form-label">Event Name <span class="req">*</span></label>
                            <input type="text" id="fEvName" class="form-input" placeholder="Enter event name" onfocus="onFormFieldFocus()" onblur="onFormFieldBlur()" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Event Official Registration Fee (INR) <span class="req">*</span></label>
                            <input type="number" id="fEvFee" class="form-input" placeholder="Enter registration fee (e.g. 300)" onfocus="onFormFieldFocus()" onblur="onFormFieldBlur()" />
                        </div>
                    </div>

                    <div class="form-grid-2">
                        <div class="form-group">
                            <label class="form-label">Official Receiving UPI ID (VPA) <span class="req">*</span></label>
                            <input type="text" id="fEvUpi" class="form-input" placeholder="Enter UPI ID (e.g. 9849600480@ybl)" onfocus="onFormFieldFocus()" onblur="onFormFieldBlur()" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Official Payee Legal Display Name <span class="req">*</span></label>
                            <input type="text" id="fEvPayee" class="form-input" placeholder="Enter legal payee name (e.g. KonnectFest Committee)" onfocus="onFormFieldFocus()" onblur="onFormFieldBlur()" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Lifecycle Status</label>
                        <select id="fEvState" class="sn-select" style="width:100%;" onfocus="onFormFieldFocus()" onblur="onFormFieldBlur()">
                            <option value="draft">Draft</option>
                            <option value="registration_open">Registration Open</option>
                            <option value="active">Active / Live Fest</option>
                            <option value="completed">Completed (Unlock Refunds)</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Event Description / Guidelines</label>
                        <textarea id="fEvDesc" class="form-input" rows="3" placeholder="Enter festival guidelines and rules..." onfocus="onFormFieldFocus()" onblur="onFormFieldBlur()"></textarea>
                    </div>

                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
                        <button class="sn-btn sn-btn-primary" onclick="submitUpdateEventForm()">Save Configuration (Update Event)</button>
                        <div style="display:flex; gap:8px;">
                            <button class="sn-btn sn-btn-secondary" onclick="quickTransitionState('registration_open')">Open Registration</button>
                            <button class="sn-btn sn-btn-emerald" onclick="quickTransitionState('active')">Set Active</button>
                            <button class="sn-btn sn-btn-secondary" onclick="quickTransitionState('completed')">Complete Event</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. PARTICIPANTS VIEW -->
            <div id="viewParticipants" class="workspace-view">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
                    <div>
                        <h2 style="font-size:18px; font-weight:700;">Participant Registry &amp; Wallet Allocations</h2>
                        <p style="font-size:13px; color:#64748b;">Attendees verified by finance with access passwords and digital wallets.</p>
                    </div>
                    <button class="sn-btn sn-btn-emerald" onclick="bulkAllocateWallets()">+ Bulk Activate Wallets</button>
                </div>

                <div class="sn-table-container">
                    <div class="table-toolbar">
                        <div class="table-toolbar-title">Registered Attendees</div>
                        <input type="text" id="partSearchInput" class="table-search-input" placeholder="Search by name, email, phone..." oninput="filterParticipants(this.value)" />
                    </div>
                    <table class="sn-data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Event</th>
                                <th>Reg Fee</th>
                                <th>Status</th>
                                <th>Access PIN</th>
                            </tr>
                        </thead>
                        <tbody id="partTableBody">
                            <tr><td colspan="7" style="text-align:center; color:#94a3b8;">Loading participant records...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 4. VENDORS & STALLS VIEW -->
            <div id="viewVendors" class="workspace-view">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
                    <div>
                        <h2 style="font-size:18px; font-weight:700;">Authorized Festival Vendors &amp; Stalls</h2>
                        <p style="font-size:13px; color:#64748b;">Manage vendor merchants, POS terminals, and redeemed coupon ledgers.</p>
                    </div>
                    <button class="sn-btn sn-btn-emerald" onclick="openOnboardStallModal()">+ Onboard New Stall</button>
                </div>

                <div class="sn-table-container">
                    <div class="table-toolbar">
                        <div class="table-toolbar-title">Onboarded Merchant Stalls</div>
                        <input type="text" id="vendorSearchInput" class="table-search-input" placeholder="Search stalls..." oninput="filterVendors(this.value)" />
                    </div>
                    <table class="sn-data-table">
                        <thead>
                            <tr>
                                <th>Stall #</th>
                                <th>Vendor Brand</th>
                                <th>Category</th>
                                <th>Contact / Phone</th>
                                <th>Coupons Collected</th>
                                <th>Unsettled Balance</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="vendorTableBody">
                            <tr><td colspan="7" style="text-align:center; color:#94a3b8;">Loading merchant stalls...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 5. TRANSACTIONS VIEW -->
            <div id="viewTransactions" class="workspace-view">
                <h2 style="font-size:18px; font-weight:700; margin-bottom:4px;">All Festival Transactions</h2>
                <p style="font-size:13px; color:#64748b; margin-bottom:18px;">Comprehensive audit log of POS coupon redemptions and wallet debits.</p>

                <div class="sn-table-container">
                    <div class="table-toolbar">
                        <div class="table-toolbar-title">Transaction Ledger</div>
                        <input type="text" id="allTxSearchInput" class="table-search-input" placeholder="Search transactions..." oninput="filterAllTx(this.value)" />
                    </div>
                    <table class="sn-data-table">
                        <thead>
                            <tr>
                                <th>Ref ID</th>
                                <th>Timestamp</th>
                                <th>Participant</th>
                                <th>Stall</th>
                                <th>Coupons (₹)</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="allTxTableBody">
                            <tr><td colspan="6" style="text-align:center; color:#94a3b8;">Loading transactions...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 6. WALLETS & LEDGER VIEW -->
            <div id="viewWallets" class="workspace-view">
                <h2 style="font-size:18px; font-weight:700; margin-bottom:4px;">Participant Wallets &amp; Balance Ledger</h2>
                <p style="font-size:13px; color:#64748b; margin-bottom:18px;">Live float liability, available balances, and reserved coupons.</p>

                <div class="sn-table-container">
                    <div class="table-toolbar">
                        <div class="table-toolbar-title">Active Wallets</div>
                        <input type="text" id="walletSearchInput" class="table-search-input" placeholder="Search wallets..." oninput="filterWallets(this.value)" />
                    </div>
                    <table class="sn-data-table">
                        <thead>
                            <tr>
                                <th>Wallet ID</th>
                                <th>Participant</th>
                                <th>Available Coupons</th>
                                <th>Reserved Coupons</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="walletTableBody">
                            <tr><td colspan="5" style="text-align:center; color:#94a3b8;">Loading wallets...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 7. DIGITAL COUPONS VIEW -->
            <div id="viewCoupons" class="workspace-view">
                <h2 style="font-size:18px; font-weight:700; margin-bottom:4px;">Digital Coupons &amp; Token Lifecycle</h2>
                <p style="font-size:13px; color:#64748b; margin-bottom:18px;">Track single-use 120-second dynamic POS tokens generated across stalls.</p>

                <div class="form-card">
                    <h3 style="font-size:15px; font-weight:700; margin-bottom:8px;">Digital Coupon Protocol Details</h3>
                    <p style="font-size:13px; color:#475569; line-height:1.6; margin-bottom:14px;">
                        KonnectFest replaces physical cash and external UPI at stalls with digital coupons (1 Coupon = ₹1 INR). Tokens expire in 120 seconds to prevent replay attacks and double-spending.
                    </p>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
                        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:12px;">
                            <div style="font-size:11px; color:#64748b; font-weight:700;">TOKEN EXPIRATION WINDOW</div>
                            <div style="font-size:18px; font-weight:700; color:#0f172a; margin-top:2px;">120 Seconds (Dynamic)</div>
                        </div>
                        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:12px;">
                            <div style="font-size:11px; color:#64748b; font-weight:700;">EXCHANGE RATE</div>
                            <div style="font-size:18px; font-weight:700; color:#16a34a; margin-top:2px;">1 Coupon = ₹1.00 INR</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 8. SETTLEMENTS VIEW -->
            <div id="viewSettlements" class="workspace-view">
                <h2 style="font-size:18px; font-weight:700; margin-bottom:4px;">Vendor Stall Payout Settlements</h2>
                <p style="font-size:13px; color:#64748b; margin-bottom:18px;">Finance disbursement tracking from gross coupon sales to bank accounts.</p>

                <div class="sn-table-container">
                    <div class="table-toolbar">
                        <div class="table-toolbar-title">Settlement Records</div>
                    </div>
                    <table class="sn-data-table">
                        <thead>
                            <tr>
                                <th>Settlement ID</th>
                                <th>Vendor</th>
                                <th>Amount (INR)</th>
                                <th>Bank Reference / UTR</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="settlementTableBody">
                            <tr><td colspan="6" style="text-align:center; color:#94a3b8;">Loading settlements...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 9. REPORTS & ANALYTICS VIEW -->
            <div id="viewReports" class="workspace-view">
                <h2 style="font-size:18px; font-weight:700; margin-bottom:4px;">Commerce Reports &amp; Now Assist AI Insights</h2>
                <p style="font-size:13px; color:#64748b; margin-bottom:18px;">Automated intelligence on footfall rushes, best-selling inventory, and float health.</p>

                <div class="form-card" style="max-width:100%; margin-bottom:20px;">
                    <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
                        <span style="font-size:18px;">✨</span>
                        <h3 style="font-size:16px; font-weight:700; color:#0f172a;">Now Assist AI Commerce Analysis</h3>
                    </div>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:14px;">
                            <strong style="color:#166534; font-size:13px;">🏆 Peak Velocity Prediction</strong>
                            <p style="font-size:12px; color:#14532d; margin-top:4px;">
                                Peak purchase frequency occurs between <strong>6:00 PM - 8:30 PM</strong> during concert performances. Recommend pre-staging extra beverage counters.
                            </p>
                        </div>
                        <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:14px;">
                            <strong style="color:#1e40af; font-size:13px;">📊 Float Liability Coverage</strong>
                            <p style="font-size:12px; color:#1e3a8a; margin-top:4px;">
                                Current verified attendee float exceeds active vendor redemptions by 100%. No liquidity strain detected across committee accounts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 10. SYSTEM ADMINISTRATION VIEW -->
            <div id="viewSysAdmin" class="workspace-view">
                <h2 style="font-size:18px; font-weight:700; margin-bottom:4px;">System Administration &amp; Data Maintenance</h2>
                <p style="font-size:13px; color:#64748b; margin-bottom:18px;">Purge test records and review the immutable security audit log.</p>

                <div class="form-card" style="border-left:4px solid #ef4444; margin-bottom:24px;">
                    <h3 style="font-size:15px; font-weight:700; color:#b91c1c; margin-bottom:6px;">Clean Application State (Data Purge)</h3>
                    <p style="font-size:13px; color:#64748b; margin-bottom:14px;">
                        Removes all demo stalls, test participants, dummy transactions, and test payments. The active master event configuration is preserved.
                    </p>
                    <button class="sn-btn sn-btn-danger" onclick="triggerPurgeTestData()">🗑 Purge Demo Data &amp; Reset Ledgers</button>
                </div>

                <div class="sn-table-container">
                    <div class="table-toolbar">
                        <div class="table-toolbar-title">Security &amp; Operations Audit Trail</div>
                    </div>
                    <table class="sn-data-table">
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>Target</th>
                                <th>Previous Status</th>
                                <th>New Status</th>
                                <th>Timestamp</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody id="auditTableBody">
                            <tr><td colspan="6" style="text-align:center; color:#94a3b8;">Loading audit trail...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>

    <!-- MODAL 1: CREATE NEW EVENT -->
    <div id="modalCreateEvent" class="modal-overlay">
        <div class="modal-box">
            <div class="modal-header">
                <div class="modal-title">+ Create New Festival Event</div>
                <button class="modal-close" onclick="closeModal('modalCreateEvent')">×</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Event Name <span class="req">*</span></label>
                    <input type="text" id="mEvName" class="form-input" placeholder="e.g. KonnectFest 2026 - Annual Fest" />
                </div>
                <div class="form-group">
                    <label class="form-label">Event Registration Fee (INR) <span class="req">*</span></label>
                    <input type="number" id="mEvFee" class="form-input" placeholder="e.g. 300.00" value="300" />
                </div>
                <div class="form-grid-2">
                    <div class="form-group">
                        <label class="form-label">Receiving UPI ID (VPA) <span class="req">*</span></label>
                        <input type="text" id="mEvUpi" class="form-input" placeholder="e.g. 9849600480@ybl" />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Payee Legal Name <span class="req">*</span></label>
                        <input type="text" id="mEvPayee" class="form-input" placeholder="e.g. KonnectFest Committee" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Lifecycle Status</label>
                    <select id="mEvState" class="sn-select" style="width:100%;">
                        <option value="registration_open">Registration Open</option>
                        <option value="active">Active / Live Fest</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Description / Guidelines</label>
                    <textarea id="mEvDesc" class="form-input" rows="2" placeholder="Enter festival details and guidelines..."></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="sn-btn sn-btn-secondary" onclick="closeModal('modalCreateEvent')">Cancel</button>
                <button class="sn-btn sn-btn-primary" onclick="submitModalCreateEvent()">Create &amp; Activate Event</button>
            </div>
        </div>
    </div>

    <!-- MODAL 2: ONBOARD NEW STALL -->
    <div id="modalOnboardStall" class="modal-overlay">
        <div class="modal-box">
            <div class="modal-header">
                <div class="modal-title">+ Onboard New Vendor Merchant Stall</div>
                <button class="modal-close" onclick="closeModal('modalOnboardStall')">×</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Vendor Brand / Stall Name <span class="req">*</span></label>
                    <input type="text" id="mStallBrand" class="form-input" placeholder="e.g. Hot Bites &amp; Beverages" />
                </div>
                <div class="form-grid-2">
                    <div class="form-group">
                        <label class="form-label">Stall Number <span class="req">*</span></label>
                        <input type="text" id="mStallNumber" class="form-input" placeholder="e.g. Stall #01" />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Category</label>
                        <select id="mStallCategory" class="sn-select" style="width:100%;">
                            <option value="F&amp;B">Food &amp; Beverages (F&amp;B)</option>
                            <option value="Merchandise">Merchandise &amp; Apparel</option>
                            <option value="Entertainment">Gaming &amp; Entertainment</option>
                            <option value="Services">Services</option>
                        </select>
                    </div>
                </div>
                <div class="form-grid-2">
                    <div class="form-group">
                        <label class="form-label">Contact Person</label>
                        <input type="text" id="mStallContact" class="form-input" placeholder="Manager Name" />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Contact Phone (10 Digits)</label>
                        <input type="tel" id="mStallPhone" class="form-input" placeholder="9876543210" maxlength="10" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Vendor Settlement UPI ID</label>
                    <input type="text" id="mStallUpi" class="form-input" placeholder="e.g. vendor@okhdfcbank" />
                </div>
            </div>
            <div class="modal-footer">
                <button class="sn-btn sn-btn-secondary" onclick="closeModal('modalOnboardStall')">Cancel</button>
                <button class="sn-btn sn-btn-emerald" onclick="submitModalOnboardStall()">Register &amp; Authorize Stall</button>
            </div>
        </div>
    </div>

    <!-- TOAST BANNER -->
    <div id="toastBanner" class="toast-banner"></div>

    <script src="/api/x_2327324_konnect/konnectfest/public/script?page=organizer"></script>
</body>
</html>
</j:jelly>`;

fs.writeFileSync('src/fluent/pages/organizer.html', organizerHtml, 'utf8');
console.log('Successfully written src/fluent/pages/organizer.html');
