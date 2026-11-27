const fs = require('fs');

console.log('=== 3. GENERATING VENDOR POS TERMINAL & FINANCE WORKSPACE ===');

// =========================================================================
// 1. VENDOR POS TERMINAL (src/fluent/pages/vendor.html)
// =========================================================================
const vendorHtml = `<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide">
<g:evaluate var="jvar_ck">gs.getSessionToken();</g:evaluate>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KonnectFest - Vendor Point-of-Sale (POS) Terminal</title>
    <style>
        :root {
            --sn-bg: #f8fafc;
            --sn-card-bg: #ffffff;
            --sn-header: #0f2e46;
            --sn-text: #0f172a;
            --sn-muted: #64748b;
            --sn-border: #e2e8f0;
            --sn-primary: #0072b2;
            --sn-primary-hover: #005a8e;
            --sn-success: #15803d;
            --sn-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: var(--sn-font);
            background-color: var(--sn-bg);
            color: var(--sn-text);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .vendor-nav {
            background-color: var(--sn-header);
            color: #fff;
            padding: 12px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .nav-brand { font-size: 16px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
        .pos-container {
            max-width: 1200px;
            margin: 24px auto;
            width: 100%;
            padding: 0 16px;
            display: grid;
            grid-template-columns: 1.8fr 1.2fr;
            gap: 20px;
        }
        .card {
            background: #fff;
            border: 1px solid var(--sn-border);
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.03);
            margin-bottom: 20px;
        }
        .section-title {
            font-size: 15px;
            font-weight: 700;
            margin-bottom: 14px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        /* Menu Items Grid */
        .menu-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 20px;
        }
        .menu-item-card {
            background: #f8fafc;
            border: 1px solid var(--sn-border);
            border-radius: 6px;
            padding: 14px;
            cursor: pointer;
            transition: all 0.15s ease;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .menu-item-card:hover {
            border-color: var(--sn-primary);
            background: #f0f9ff;
            transform: translateY(-2px);
        }
        .item-name { font-weight: 700; font-size: 13px; color: var(--sn-text); margin-bottom: 4px; }
        .item-price { font-weight: 800; font-size: 15px; color: #15803d; }
        .qty-controls {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 10px;
        }
        .qty-btn {
            background: #fff;
            border: 1px solid var(--sn-border);
            width: 26px;
            height: 26px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-weight: 700;
            font-size: 14px;
        }
        .qty-btn:hover { background: #e2e8f0; }

        /* Cart Summary */
        .cart-box {
            background: #f8fafc;
            border: 1px solid var(--sn-border);
            border-radius: 8px;
            padding: 18px;
        }
        .cart-line {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            padding: 6px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        .cart-total-row {
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            font-weight: 800;
            padding-top: 12px;
            margin-top: 6px;
            color: #15803d;
        }
        .sn-btn {
            padding: 10px 16px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            border: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            width: 100%;
        }
        .sn-btn-primary { background: var(--sn-primary); color: #fff; }
        .sn-btn-primary:hover { background: var(--sn-primary-hover); }
        .sn-btn-danger { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }

        /* 120s Dynamic QR Countdown Area */
        .qr-display-box {
            background: #ffffff;
            border: 2px dashed #0072b2;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            display: none;
            margin-top: 16px;
            animation: fadeIn 0.25s ease;
        }
        .timer-badge {
            display: inline-block;
            background: #fee2e2;
            color: #b91c1c;
            font-weight: 800;
            font-size: 13px;
            padding: 4px 12px;
            border-radius: 14px;
            margin-bottom: 12px;
        }

        /* AI Insights Card */
        .ai-card {
            background: linear-gradient(135deg, #f0fdf4, #e0f2fe);
            border: 1px solid #bbf7d0;
            border-radius: 8px;
            padding: 16px;
            font-size: 12px;
            line-height: 1.5;
        }

        /* Table */
        .sn-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
        }
        .sn-table th {
            text-align: left;
            padding: 8px 10px;
            background: #f1f5f9;
            color: var(--sn-muted);
            border-bottom: 1px solid var(--sn-border);
        }
        .sn-table td {
            padding: 8px 10px;
            border-bottom: 1px solid var(--sn-border);
        }

        .toast {
            position: fixed;
            bottom: 24px;
            right: 24px;
            padding: 12px 20px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 600;
            color: #fff;
            display: none;
            z-index: 9999;
        }
        .toast-success { background: #15803d; }
        .toast-error { background: #b91c1c; }
    </style>
</head>
<body>
    <input type="hidden" id="g_ck_token" value="\${jvar_ck}" />

    <header class="vendor-nav">
        <div class="nav-brand">
            <span style="color:#22c55e;">✦</span> KonnectFest Vendor POS Terminal
        </div>
        <div style="font-size:12px; color:#cbd5e1;">
            <span id="dispStallCode" style="font-weight:700; color:#fff;">Stall #01</span> &bull; 
            <span id="dispVendorBrand">Hot Bites &amp; Beverages</span> &bull; 
            <span class="badge" style="background:#22c55e; color:#fff; padding:2px 8px; border-radius:10px; font-weight:700;">LIVE POS</span>
        </div>
    </header>

    <div class="pos-container">
        <!-- LEFT: MENU CATALOG & ORDER BUILDER -->
        <div>
            <div class="card">
                <div class="section-title">
                    <span>Vendor Catalog &amp; Menu</span>
                    <button type="button" class="sn-btn sn-btn-primary" style="width:auto; padding:5px 12px; font-size:12px;" onclick="openAddItemModal()">
                        + Add Custom Item
                    </button>
                </div>

                <!-- Menu Item Cards -->
                <div class="menu-grid" id="menuGridContainer">
                    <!-- Loaded dynamically from catalog -->
                </div>
            </div>

            <!-- SALES HISTORY TABLE -->
            <div class="card">
                <div class="section-title">
                    <span>Recent Coupon Sales Transactions</span>
                    <span id="dispTotalSalesTally" style="color:#15803d; font-weight:800;">Total: 0 Coupons</span>
                </div>
                <table class="sn-table">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Order Details</th>
                            <th style="text-align:right;">Coupons (₹)</th>
                            <th style="text-align:center;">Status</th>
                        </tr>
                    </thead>
                    <tbody id="vendorSalesBody">
                        <tr><td colspan="4" style="text-align:center; padding:18px; color:var(--sn-muted);">No orders confirmed yet.</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- RIGHT: CART SUMMARY, 120s DYNAMIC QR & AI TRENDS -->
        <div>
            <!-- Order Cart Box -->
            <div class="card">
                <div class="section-title">
                    <span>Current Customer Order</span>
                    <button class="sn-btn sn-btn-danger" style="width:auto; padding:3px 8px; font-size:11px;" onclick="clearCart()">Clear</button>
                </div>

                <div id="cartItemsList">
                    <div style="text-align:center; padding:20px; color:var(--sn-muted); font-size:13px;">
                        Cart is empty. Tap items on the left to add.
                    </div>
                </div>

                <div class="cart-total-row" id="cartTotalRow" style="display:none;">
                    <span>Total Coupons:</span>
                    <span id="cartTotalVal">0 Coupons</span>
                </div>

                <button class="sn-btn sn-btn-primary" id="btnGenQr" style="margin-top:16px;" onclick="generateDynamicPosQR()">
                    ⚡ Generate 120s Scannable QR &rarr;
                </button>

                <!-- 120s DYNAMIC QR DISPLAY -->
                <div class="qr-display-box" id="qrDisplayBox">
                    <div class="timer-badge" id="qrTimerBadge">⏱️ QR Active: 120s remaining</div>
                    <div id="posQrCanvas" style="display:inline-block; padding:10px; background:#fff; border-radius:6px;"></div>
                    <div style="font-size:13px; font-weight:700; color:var(--sn-text); margin-top:10px;" id="qrOrderTitle">
                        Order #KF-POS
                    </div>
                    <div style="font-size:11px; color:var(--sn-muted); margin-top:4px;">
                        Customer scans with Participant Portal to transfer coupons
                    </div>
                    <div id="qrStatusAlert" style="margin-top:10px; font-size:12px; font-weight:700; color:#0072b2;">
                        ⏳ Awaiting participant coupon scan...
                    </div>
                </div>
            </div>

            <!-- VENDOR NOW ASSIST AI SALES ANALYTICS -->
            <div class="card">
                <div class="section-title">
                    <span>✨ AI Sales &amp; Inventory Trends</span>
                    <span style="font-size:10px; background:#e0e7ff; color:#4338ca; padding:2px 8px; border-radius:10px; font-weight:700;">Now Assist</span>
                </div>
                <div class="ai-card">
                    <div style="font-weight:700; color:#15803d; margin-bottom:4px;">📊 AI Stall Intelligence</div>
                    <div id="aiInsightText1" style="margin-bottom:8px;">
                        • <strong>Top Selling Item:</strong> Cheese Pizza accounts for 42% of order volume.
                    </div>
                    <div id="aiInsightText2" style="margin-bottom:8px;">
                        • <strong>Peak Demand Rush:</strong> Transaction activity peaks from 6 PM to 8 PM during fest concerts.
                    </div>
                    <div id="aiInsightText3" style="color:#0369a1;">
                        • <strong>Smart Recommendation:</strong> Bundle beverage combos with snacks to maximize coupon ticket size.
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL: ADD MENU ITEM -->
    <div id="modalAddItem" style="display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(15,23,42,0.6); align-items:center; justify-content:center; z-index:10000;">
        <div style="background:#fff; border-radius:8px; width:400px; max-width:90vw; padding:20px;">
            <h3 style="font-size:15px; font-weight:700; margin-bottom:14px;">Add New Menu Item</h3>
            <div style="margin-bottom:12px;">
                <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Item Name</label>
                <input type="text" id="mItemName" style="width:100%; padding:8px; border:1px solid var(--sn-border); border-radius:4px;" placeholder="e.g. Masala Dosa" />
            </div>
            <div style="margin-bottom:16px;">
                <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Price in Coupons (₹)</label>
                <input type="number" id="mItemPrice" style="width:100%; padding:8px; border:1px solid var(--sn-border); border-radius:4px;" placeholder="e.g. 80" min="10" />
            </div>
            <div style="display:flex; justify-content:flex-end; gap:8px;">
                <button class="sn-btn sn-btn-danger" style="width:auto;" onclick="document.getElementById('modalAddItem').style.display='none'">Cancel</button>
                <button class="sn-btn sn-btn-primary" style="width:auto;" onclick="saveCustomItem()">Save Item</button>
            </div>
        </div>
    </div>

    <div id="vToast" class="toast"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    <script src="/api/x_2327324_konnect/konnectfest/public/script?page=vendor"></script>
</body>
</html>
</j:jelly>`;

fs.writeFileSync('src/fluent/pages/vendor.html', vendorHtml, 'utf8');
console.log('3. Generated src/fluent/pages/vendor.html (Interactive POS System with 120s QR & AI Analytics)!');

// =========================================================================
// 2. FINANCE WORKSPACE (src/fluent/pages/finance.html)
// =========================================================================
const financeHtml = `<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide">
<g:evaluate var="jvar_ck">gs.getSessionToken();</g:evaluate>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KonnectFest - Finance Verification &amp; Settlement Workspace</title>
    <style>
        :root {
            --sn-bg: #f8fafc;
            --sn-card-bg: #ffffff;
            --sn-header: #0f2e46;
            --sn-text: #0f172a;
            --sn-muted: #64748b;
            --sn-border: #e2e8f0;
            --sn-primary: #0072b2;
            --sn-primary-hover: #005a8e;
            --sn-success: #15803d;
            --sn-success-bg: #dcfce7;
            --sn-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: var(--sn-font);
            background-color: var(--sn-bg);
            color: var(--sn-text);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .fin-nav {
            background-color: var(--sn-header);
            color: #fff;
            padding: 12px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .nav-brand { font-size: 16px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
        .fin-container {
            max-width: 1300px;
            margin: 24px auto;
            width: 100%;
            padding: 0 16px;
        }
        .tabs-header {
            display: flex;
            gap: 8px;
            border-bottom: 1px solid var(--sn-border);
            margin-bottom: 20px;
        }
        .tab-btn {
            background: none;
            border: none;
            padding: 10px 16px;
            font-size: 13px;
            font-weight: 600;
            color: var(--sn-muted);
            cursor: pointer;
            border-bottom: 2px solid transparent;
            transition: all 0.15s ease;
        }
        .tab-btn.active {
            color: var(--sn-primary);
            border-bottom-color: var(--sn-primary);
        }
        .card {
            background: #fff;
            border: 1px solid var(--sn-border);
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.03);
            margin-bottom: 20px;
        }
        .sn-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
        }
        .sn-table th {
            text-align: left;
            padding: 10px 12px;
            background: #f8fafc;
            color: var(--sn-muted);
            border-bottom: 1px solid var(--sn-border);
        }
        .sn-table td {
            padding: 10px 12px;
            border-bottom: 1px solid var(--sn-border);
        }
        .sn-btn {
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }
        .sn-btn-verify { background: #15803d; color: #fff; }
        .sn-btn-view { background: #0072b2; color: #fff; }
        .sn-btn-reject { background: #b91c1c; color: #fff; }
        .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 11px;
            font-weight: 600;
        }
        .badge-reg { background: #e0f2fe; color: #0369a1; }
        .badge-topup { background: #dcfce7; color: #15803d; }
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(15, 23, 42, 0.7);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        .modal-box {
            background: #fff;
            border-radius: 8px;
            width: 560px;
            max-width: 90vw;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0,0,0,0.25);
        }
        .modal-header {
            padding: 14px 18px;
            border-bottom: 1px solid var(--sn-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            font-weight: 700;
        }
        .modal-body { padding: 18px; text-align: center; }
        .modal-footer {
            padding: 12px 18px;
            border-top: 1px solid var(--sn-border);
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            background: #f8fafc;
        }
        .toast {
            position: fixed;
            bottom: 24px;
            right: 24px;
            padding: 12px 20px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 600;
            color: #fff;
            display: none;
            z-index: 9999;
        }
        .toast-success { background: #15803d; }
        .toast-error { background: #b91c1c; }
    </style>
</head>
<body>
    <input type="hidden" id="g_ck_token" value="\${jvar_ck}" />

    <header class="fin-nav">
        <div class="nav-brand">
            <span style="color:#22c55e;">✦</span> Finance Verification &amp; Settlement Workspace
        </div>
        <div style="font-size:12px; color:#cbd5e1;">
            Live Reconciliation &bull; Auto-refreshing every 5s
        </div>
    </header>

    <div class="fin-container">
        <!-- TABS -->
        <div class="tabs-header">
            <button class="tab-btn active" id="tabRegsBtn" onclick="switchFinTab('tabRegs', this)">
                🎟️ Registration Fee Approvals
            </button>
            <button class="tab-btn" id="tabTopUpsBtn" onclick="switchFinTab('tabTopUps', this)">
                💳 Wallet Coupon Top-Up Approvals
            </button>
            <button class="tab-btn" id="tabSettlementsBtn" onclick="switchFinTab('tabSettlements', this)">
                🤝 Vendor Stall Settlements
            </button>
        </div>

        <!-- TAB 1: REGISTRATION FEES -->
        <div id="tabRegs" class="fin-tab-content">
            <div class="card">
                <div style="font-size:14px; font-weight:700; margin-bottom:12px;">
                    Pending Attendee Registration Fee Approvals (Entry Fees)
                </div>
                <table class="sn-table">
                    <thead>
                        <tr>
                            <th>Reg #</th>
                            <th>Attendee Name</th>
                            <th>Fee Amount</th>
                            <th>UTR Reference</th>
                            <th>Payment Proof</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="regQueueBody">
                        <tr><td colspan="7" style="text-align:center; padding:18px; color:var(--sn-muted);">No pending registration payments.</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- TAB 2: WALLET TOP-UPS -->
        <div id="tabTopUps" class="fin-tab-content" style="display:none;">
            <div class="card">
                <div style="font-size:14px; font-weight:700; margin-bottom:12px;">
                    Pending Wallet Top-Up Approvals (Credits Coupons to Participant)
                </div>
                <table class="sn-table">
                    <thead>
                        <tr>
                            <th>Pay #</th>
                            <th>Participant Name</th>
                            <th>Top-Up Amount</th>
                            <th>UTR Reference</th>
                            <th>Payment Proof</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="topUpQueueBody">
                        <tr><td colspan="7" style="text-align:center; padding:18px; color:var(--sn-muted);">No pending top-up requests.</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- TAB 3: SETTLEMENTS -->
        <div id="tabSettlements" class="fin-tab-content" style="display:none;">
            <div class="card">
                <div style="font-size:14px; font-weight:700; margin-bottom:12px;">
                    Vendor Stall Settlement Batches
                </div>
                <table class="sn-table">
                    <thead>
                        <tr>
                            <th>Stall</th>
                            <th>Vendor Name</th>
                            <th>Total Sold Coupons</th>
                            <th>Payout UPI / Bank</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="settlementQueueBody">
                        <tr><td colspan="6" style="text-align:center; padding:18px; color:var(--sn-muted);">No unsettled vendor balances.</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- MODAL: VIEW PAYMENT PROOF SCREENSHOT -->
    <div id="modalProofView" class="modal-overlay">
        <div class="modal-box">
            <div class="modal-header">
                <span>Attendee Payment Screenshot Proof</span>
                <span style="cursor:pointer;" onclick="closeModal('modalProofView')">✕</span>
            </div>
            <div class="modal-body">
                <div style="margin-bottom:10px; font-size:12px; text-align:left;">
                    <div><strong>Attendee:</strong> <span id="mProofAttendee">-</span></div>
                    <div><strong>12-Digit UTR:</strong> <span id="mProofUtr" style="font-family:monospace; font-weight:700;">-</span></div>
                    <div><strong>Amount:</strong> <span id="mProofAmount" style="color:#15803d; font-weight:700;">-</span></div>
                </div>
                <div style="border:1px solid var(--sn-border); border-radius:6px; padding:6px; max-height:360px; overflow-y:auto; background:#f8fafc;">
                    <img id="mProofImg" style="max-width:100%; border-radius:4px;" alt="Bank Transfer Screenshot" />
                    <div id="mProofNoImg" style="padding:40px; color:var(--sn-muted); display:none;">No image attached with this payment.</div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="sn-btn sn-btn-verify" id="btnModalVerifyNow" onclick="verifyFromModal()">✓ Approve &amp; Verify Payment</button>
                <button class="sn-btn" style="background:#e2e8f0; color:var(--sn-text);" onclick="closeModal('modalProofView')">Close</button>
            </div>
        </div>
    </div>

    <div id="fToast" class="toast"></div>

    <script src="/api/x_2327324_konnect/konnectfest/public/script?page=finance"></script>
</body>
</html>
</j:jelly>`;

fs.writeFileSync('src/fluent/pages/finance.html', financeHtml, 'utf8');
console.log('4. Generated src/fluent/pages/finance.html (Differentiated queues & Screenshot Modal Viewer)!');
