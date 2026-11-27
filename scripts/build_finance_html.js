const fs = require('fs');
const { logoBase64 } = require('./load_logo');

console.log('Generating minimalist clean Finance Workspace (finance.html)...');

const financeHtml = `<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide">
<g:evaluate var="jvar_ck">gs.getSessionToken();</g:evaluate>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KonnectFest - Finance Verification &amp; Settlement Workspace</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet" />
    <style>
        :root {
            --sn-bg-page: #f8fafc;
            --sn-card-bg: #ffffff;
            --sn-border: #e2e8f0;
            --sn-text-main: #0f172a;
            --sn-text-muted: #64748b;
            --sn-primary: #0f2e46;
            --sn-emerald: #10b981;
            --sn-emerald-dark: #059669;
            --sn-sky: #0284c7;
            --sn-danger: #ef4444;
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
        }

        /* 1. BRAND HEADER */
        .brand-header {
            background-color: #0b1a28;
            color: #ffffff;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 24px;
            border-bottom: 2px solid var(--sn-emerald);
        }
        .brand-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .brand-logo-img {
            width: 32px;
            height: 32px;
            border-radius: 6px;
            object-fit: cover;
            background: #ffffff;
        }
        .brand-titles h1 {
            font-size: 15px;
            font-weight: 700;
            color: #ffffff;
            line-height: 1.2;
        }
        .brand-titles .badge-sub {
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--sn-emerald);
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
            background-color: var(--sn-emerald);
            box-shadow: 0 0 6px var(--sn-emerald);
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

        /* 2. CONTAINER */
        .fin-container {
            max-width: 1280px;
            width: 100%;
            margin: 0 auto;
            padding: 24px;
        }

        /* 3. METRIC SUMMARY CARDS */
        .metrics-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-bottom: 24px;
        }
        .metric-card {
            background: #ffffff;
            border: 1px solid var(--sn-border);
            border-radius: var(--sn-radius);
            padding: 16px 20px;
            box-shadow: var(--sn-shadow);
        }
        .metric-title {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--sn-text-muted);
            margin-bottom: 6px;
        }
        .metric-val {
            font-size: 22px;
            font-weight: 700;
            color: var(--sn-text-main);
        }
        .metric-sub {
            font-size: 11px;
            color: var(--sn-emerald-dark);
            margin-top: 2px;
            font-weight: 500;
        }

        /* 4. CLEAN TABS */
        .tab-bar {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 20px;
            border-bottom: 1px solid var(--sn-border);
            padding-bottom: 12px;
        }
        .tab-btn {
            background: none;
            border: 1px solid transparent;
            padding: 8px 16px;
            font-size: 13px;
            font-weight: 600;
            color: var(--sn-text-muted);
            border-radius: 6px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.15s ease;
        }
        .tab-btn:hover {
            background-color: #f1f5f9;
            color: var(--sn-text-main);
        }
        .tab-btn.active {
            background-color: #ffffff;
            color: var(--sn-primary);
            border-color: var(--sn-border);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }
        .tab-badge {
            background-color: #f1f5f9;
            color: #475569;
            font-size: 10px;
            font-weight: 700;
            padding: 2px 7px;
            border-radius: 10px;
        }
        .tab-btn.active .tab-badge {
            background-color: var(--sn-emerald);
            color: #ffffff;
        }

        /* 5. TABLES */
        .table-card {
            background: #ffffff;
            border: 1px solid var(--sn-border);
            border-radius: var(--sn-radius);
            box-shadow: var(--sn-shadow);
            overflow: hidden;
            display: none;
        }
        .table-card.active { display: block; }
        .table-header {
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--sn-border);
        }
        .table-header-title {
            font-size: 14px;
            font-weight: 700;
            color: var(--sn-text-main);
        }
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
            padding: 12px 20px;
            border-bottom: 1px solid var(--sn-border);
        }
        .sn-data-table td {
            padding: 14px 20px;
            border-bottom: 1px solid #f1f5f9;
            color: var(--sn-text-main);
            vertical-align: middle;
        }
        .sn-data-table tr:hover td {
            background-color: #f8fafc;
        }

        /* BUTTONS */
        .btn-action-group {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .btn-proof {
            background: #f1f5f9;
            border: 1px solid #cbd5e1;
            color: #0f172a;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            transition: all 0.15s ease;
        }
        .btn-proof:hover {
            background: #e2e8f0;
            color: #0f172a;
        }
        .btn-verify {
            background: var(--sn-emerald);
            color: #ffffff;
            border: none;
            padding: 6px 14px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 1px 2px rgba(16, 185, 129, 0.2);
            transition: background 0.15s ease;
        }
        .btn-verify:hover { background: var(--sn-emerald-dark); }
        .btn-reject {
            background: #fef2f2;
            border: 1px solid #fecaca;
            color: #dc2626;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.15s ease;
        }
        .btn-reject:hover { background: #fee2e2; }

        .badge-pill {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
        }
        .pill-pending { background: #fef3c7; color: #92400e; }
        .pill-verified { background: #dcfce7; color: #166534; }
        .pill-rejected { background: #fee2e2; color: #991b1b; }

        /* 6. PROOF VIEWER MODAL */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.65);
            backdrop-filter: blur(3px);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 100;
            animation: fadeIn 0.15s ease;
        }
        .modal-box {
            background: #ffffff;
            border-radius: 10px;
            width: 720px;
            max-width: 92vw;
            box-shadow: var(--sn-shadow-lg);
            overflow: hidden;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

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
            font-size: 20px;
            color: #94a3b8;
            cursor: pointer;
        }
        .modal-body {
            padding: 20px;
            max-height: 80vh;
            overflow-y: auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .proof-img-frame {
            border: 1px solid var(--sn-border);
            border-radius: 8px;
            background: #f8fafc;
            min-height: 280px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        .proof-img {
            max-width: 100%;
            max-height: 380px;
            object-fit: contain;
        }
        .proof-meta {
            display: flex;
            flex-direction: column;
            gap: 12px;
            font-size: 13px;
        }
        .meta-field {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        .meta-label {
            font-size: 11px;
            color: var(--sn-text-muted);
            text-transform: uppercase;
            font-weight: 700;
        }
        .meta-val {
            font-size: 14px;
            font-weight: 600;
            color: var(--sn-text-main);
        }
        .copy-btn {
            background: #f1f5f9;
            border: 1px solid #cbd5e1;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 10px;
            cursor: pointer;
            margin-left: 6px;
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
        }
        .toast-success { background-color: var(--sn-emerald); }
        .toast-error { background-color: var(--sn-danger); }
    </style>
</head>
<body>
    <input type="hidden" id="g_ck_token" value="\${jvar_ck}" />

    <!-- 1. BRAND HEADER -->
    <header class="brand-header">
        <div class="brand-left">
            <img src="${logoBase64}" alt="KonnectFest Logo" class="brand-logo-img" />
            <div class="brand-titles">
                <h1>Finance Verification &amp; Settlement Workspace</h1>
                <div class="badge-sub">Reconciliation and Float Management</div>
            </div>
        </div>

        <div class="brand-right">
            <div class="sync-indicator">
                <span class="sync-dot"></span>
                <span>Live Reconciliation (5s)</span>
                <span id="finSyncTime" style="margin-left:4px; color:#cbd5e1;">-</span>
            </div>
            <a href="/x_2327324_konnect_organizer_dashboard.do" target="_blank" class="quick-nav-link">Organizer Dashboard ↗</a>
            <a href="/x_2327324_konnect_register.do" target="_blank" class="quick-nav-link">Public Registration ↗</a>
        </div>
    </header>

    <!-- 2. CONTAINER -->
    <div class="fin-container">
        <!-- 3. METRIC SUMMARY CARDS -->
        <div class="metrics-row">
            <div class="metric-card">
                <div class="metric-title">Pending Registration Approvals</div>
                <div class="metric-val" id="metricPendingRegCount">0</div>
                <div class="metric-sub" id="metricPendingRegAmt">₹0.00 pending verification</div>
            </div>
            <div class="metric-card">
                <div class="metric-title">Pending Wallet Top-Ups</div>
                <div class="metric-val" id="metricPendingTopupCount">0</div>
                <div class="metric-sub" id="metricPendingTopupAmt">₹0.00 coupon float requests</div>
            </div>
            <div class="metric-card">
                <div class="metric-title">Vendor Stall Settlements</div>
                <div class="metric-val" id="metricPendingSettleCount">0</div>
                <div class="metric-sub" id="metricPendingSettleAmt">₹0.00 awaiting bank disbursement</div>
            </div>
        </div>

        <!-- 4. CLEAN TABS -->
        <div class="tab-bar">
            <button class="tab-btn active" onclick="switchFinTab('tabRegFees', this)">
                <span>🎟 Registration Fee Approvals</span>
                <span class="tab-badge" id="badgeRegCount">0</span>
            </button>
            <button class="tab-btn" onclick="switchFinTab('tabTopUps', this)">
                <span>💳 Wallet Coupon Top-Ups</span>
                <span class="tab-badge" id="badgeTopUpCount">0</span>
            </button>
            <button class="tab-btn" onclick="switchFinTab('tabSettlements', this)">
                <span>🏪 Vendor Stall Settlements</span>
                <span class="tab-badge" id="badgeSettleCount">0</span>
            </button>
        </div>

        <!-- 5. QUEUE TABLES -->
        <!-- Queue 1: Registration Fee Approvals -->
        <div id="tabRegFees" class="table-card active">
            <div class="table-header">
                <div class="table-header-title">Pending Attendee Registration Fee Approvals (Entry Fees)</div>
                <span style="font-size:12px; color:#64748b;">Approving activates account, generates access PIN, and creates wallet at ₹0.00</span>
            </div>
            <table class="sn-data-table">
                <thead>
                    <tr>
                        <th>Reg #</th>
                        <th>Attendee Name</th>
                        <th>Fee Amount</th>
                        <th>UTR Reference</th>
                        <th>Payment Proof</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="regQueueBody">
                    <tr><td colspan="7" style="text-align:center; color:#94a3b8;">Loading pending registration fees...</td></tr>
                </tbody>
            </table>
        </div>

        <!-- Queue 2: Wallet Top-Up Approvals -->
        <div id="tabTopUps" class="table-card">
            <div class="table-header">
                <div class="table-header-title">Pending Participant Wallet Coupon Top-Up Requests</div>
                <span style="font-size:12px; color:#64748b;">Approving credits digital coupons directly into participant wallet</span>
            </div>
            <table class="sn-data-table">
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Participant</th>
                        <th>Top-Up Amount</th>
                        <th>UTR Reference</th>
                        <th>Payment Proof</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="topupQueueBody">
                    <tr><td colspan="7" style="text-align:center; color:#94a3b8;">No pending top-up requests.</td></tr>
                </tbody>
            </table>
        </div>

        <!-- Queue 3: Vendor Settlements -->
        <div id="tabSettlements" class="table-card">
            <div class="table-header">
                <div class="table-header-title">Vendor Stall Payout Settlements</div>
                <span style="font-size:12px; color:#64748b;">Gross coupon sales converted to bank payout disbursements</span>
            </div>
            <table class="sn-data-table">
                <thead>
                    <tr>
                        <th>Settlement Ref</th>
                        <th>Vendor Brand</th>
                        <th>Stall #</th>
                        <th>Redeemed Coupons</th>
                        <th>Payable Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="settleQueueBody">
                    <tr><td colspan="7" style="text-align:center; color:#94a3b8;">No pending vendor settlements.</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- PROOF VIEWER MODAL -->
    <div id="modalProofViewer" class="modal-overlay">
        <div class="modal-box">
            <div class="modal-header">
                <div class="modal-title">Payment Screenshot Verification</div>
                <button class="modal-close" onclick="closeProofModal()">×</button>
            </div>
            <div class="modal-body">
                <div class="proof-img-frame">
                    <img id="mProofImg" class="proof-img" src="" alt="Payment Screenshot" />
                </div>
                <div class="proof-meta">
                    <div class="meta-field">
                        <span class="meta-label">Attendee / Participant</span>
                        <span class="meta-val" id="mProofName">-</span>
                    </div>
                    <div class="meta-field">
                        <span class="meta-label">Payment Amount</span>
                        <span class="meta-val" style="color:var(--sn-emerald-dark); font-size:17px;" id="mProofAmt">-</span>
                    </div>
                    <div class="meta-field">
                        <span class="meta-label">12-Digit Bank UTR Reference</span>
                        <span class="meta-val">
                            <span id="mProofUtr">-</span>
                            <button class="copy-btn" onclick="copyModalUtr()">Copy</button>
                        </span>
                    </div>
                    <div class="meta-field">
                        <span class="meta-label">Event / Purpose</span>
                        <span class="meta-val" id="mProofPurpose">Event Registration Admission Pass</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="sn-btn btn-reject" onclick="rejectFromModal()">Reject Payment</button>
                <button class="sn-btn btn-verify" onclick="approveFromModal()">✓ Verify and Activate Account</button>
            </div>
        </div>
    </div>

    <!-- TOAST BANNER -->
    <div id="fToast" class="toast-banner"></div>

    <script src="/api/x_2327324_konnect/konnectfest/public/script?page=finance"></script>
</body>
</html>
</j:jelly>`;

fs.writeFileSync('src/fluent/pages/finance.html', financeHtml, 'utf8');
console.log('Successfully written src/fluent/pages/finance.html');
