import { UiPage } from '@servicenow/sdk/core'

/**
 * 1. PARTICIPANT MOBILE PORTAL UI PAGE
 * Endpoint: x_2327324_konnect_participant_portal.do
 */
export const pageParticipantPortal = UiPage({
    $id: Now.ID['page_participant_portal'],
    endpoint: 'x_2327324_konnect_participant_portal.do',
    category: 'general',
    description: 'KonnectFest Participant Mobile Portal - Registration, Wallet, Top-Up, QR Confirmation, and Refunds',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KonnectFest - Participant Portal</title>
    <style>
        :root {
            --primary: #0f4c81;
            --primary-light: #1a6ab4;
            --accent: #00a88f;
            --bg: #f4f6f9;
            --card-bg: #ffffff;
            --text-main: #1e293b;
            --text-muted: #64748b;
            --border: #e2e8f0;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            --radius: 10px;
            --shadow: 0 4px 12px rgba(15, 76, 129, 0.08);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { background: var(--bg); color: var(--text-main); padding-bottom: 60px; }
        .header { background: var(--primary); color: white; padding: 18px 20px; box-shadow: var(--shadow); display: flex; justify-content: space-between; align-items: center; }
        .header h1 { font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
        .header-badge { background: rgba(255,255,255,0.18); padding: 4px 10px; border-radius: 20px; font-size: 12px; }
        .container { max-width: 600px; margin: 0 auto; padding: 16px; }
        .nav-tabs { display: flex; gap: 8px; margin-bottom: 16px; overflow-x: auto; padding-bottom: 4px; }
        .tab-btn { flex: 1; min-width: 100px; text-align: center; padding: 10px 14px; border: 1px solid var(--border); background: var(--card-bg); border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; color: var(--text-muted); transition: all 0.2s; }
        .tab-btn.active { background: var(--primary); color: white; border-color: var(--primary); box-shadow: var(--shadow); }
        .card { background: var(--card-bg); border-radius: var(--radius); padding: 20px; margin-bottom: 16px; border: 1px solid var(--border); box-shadow: var(--shadow); }
        .wallet-card { background: linear-gradient(135deg, #0f4c81 0%, #1e3a8a 100%); color: white; border: none; }
        .wallet-title { font-size: 13px; opacity: 0.85; text-transform: uppercase; letter-spacing: 0.5px; }
        .wallet-balance { font-size: 34px; font-weight: 800; margin: 8px 0; }
        .wallet-stats { display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 12px; margin-top: 12px; font-size: 12px; }
        .form-group { margin-bottom: 14px; }
        .form-label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--text-main); }
        .form-input { width: 100%; padding: 11px 14px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px; background: #fff; }
        .form-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(15,76,129,0.12); }
        .btn { width: 100%; padding: 12px 18px; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; transition: 0.2s; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-primary { background: var(--primary); color: white; }
        .btn-primary:hover { background: var(--primary-light); }
        .btn-accent { background: var(--accent); color: white; }
        .btn-accent:hover { filter: brightness(1.05); }
        .alert { padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 14px; display: none; }
        .alert-success { background: #dcfce7; color: #166534; border: 1px solid #86efac; }
        .alert-error { background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; }
        .alert-info { background: #e0f2fe; color: #075985; border: 1px solid #7dd3fc; }
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 100; align-items: center; justify-content: center; padding: 20px; }
        .modal-content { background: white; border-radius: 12px; width: 100%; max-width: 480px; padding: 24px; position: relative; }
        .timer-badge { display: inline-block; background: #fef3c7; color: #92400e; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>KonnectFest</h1>
        <span class="header-badge" id="roleBadge">Participant</span>
    </div>

    <div class="container">
        <div id="alertBox" class="alert"></div>

        <div class="nav-tabs">
            <button class="tab-btn active" onclick="switchTab('walletTab')">My Wallet</button>
            <button class="tab-btn" onclick="switchTab('scanTab')">Scan & Pay</button>
            <button class="tab-btn" onclick="switchTab('topupTab')">Top-Up</button>
            <button class="tab-btn" onclick="switchTab('historyTab')">History</button>
            <button class="tab-btn" onclick="switchTab('refundTab')">Refund</button>
            <button class="tab-btn" onclick="switchTab('registerTab')">Register</button>
        </div>

        <!-- 1. WALLET TAB -->
        <div id="walletTab" class="tab-content">
            <div class="card wallet-card">
                <div class="wallet-title">Verified Available Balance</div>
                <div class="wallet-balance" id="displayBalance">₹0.00</div>
                <div class="wallet-stats">
                    <div><span>Reserved on Hold:</span> <strong id="displayReserved">₹0.00</strong></div>
                    <div><span>Total Spent:</span> <strong id="displaySpent">₹0.00</strong></div>
                </div>
            </div>

            <div class="card">
                <h3 style="font-size:15px; margin-bottom:12px;">Quick Actions</h3>
                <div style="display:flex; gap:10px;">
                    <button class="btn btn-accent" onclick="switchTab('scanTab')">Pay Vendor</button>
                    <button class="btn btn-primary" onclick="switchTab('topupTab')">+ Add Funds</button>
                </div>
            </div>
        </div>

        <!-- 2. SCAN & CONFIRM TAB -->
        <div id="scanTab" class="tab-content" style="display:none;">
            <div class="card">
                <h3 style="font-size:16px; margin-bottom:12px;">Vendor Purchase Checkout</h3>
                <p style="font-size:13px; color:var(--text-muted); margin-bottom:14px;">
                    Enter or scan the 60-second QR token shown on the vendor's terminal.
                </p>
                <div class="form-group">
                    <label class="form-label">Vendor QR Token</label>
                    <input type="text" id="qrTokenInput" class="form-input" placeholder="e.g. KF_QR_... or scan via camera" />
                </div>
                <button class="btn btn-primary" onclick="lookupQRToken()">Verify Purchase Details</button>
            </div>
        </div>

        <!-- 3. TOP-UP TAB -->
        <div id="topupTab" class="tab-content" style="display:none;">
            <div class="card">
                <h3 style="font-size:16px; margin-bottom:12px;">Wallet Top-Up Request</h3>
                <p style="font-size:13px; color:var(--text-muted); margin-bottom:14px;">
                    Enter the amount and submit after paying to the event UPI account. Funds will be credited once verified by Finance.
                </p>
                <div class="form-group">
                    <label class="form-label">Top-Up Amount (INR)</label>
                    <input type="number" id="topupAmount" class="form-input" placeholder="₹ Amount (e.g. 500)" min="10" />
                </div>
                <div class="form-group">
                    <label class="form-label">Bank UTR / Transaction Reference</label>
                    <input type="text" id="topupUtr" class="form-input" placeholder="12-digit UPI UTR / RRN" />
                </div>
                <button class="btn btn-primary" onclick="submitTopUp()">Submit for Verification</button>
            </div>
        </div>

        <!-- 4. HISTORY TAB -->
        <div id="historyTab" class="tab-content" style="display:none;">
            <div class="card">
                <h3 style="font-size:16px; margin-bottom:12px;">Recent Wallet Transactions</h3>
                <div id="historyList" style="font-size:13px; color:var(--text-muted);">
                    Loading ledger records...
                </div>
            </div>
        </div>

        <!-- 5. REFUND TAB -->
        <div id="refundTab" class="tab-content" style="display:none;">
            <div class="card">
                <h3 style="font-size:16px; margin-bottom:12px;">Post-Event Balance Refund</h3>
                <div class="alert alert-info" style="display:block; margin-bottom:12px;">
                    Refunds are available after the event is marked COMPLETED. Requested amounts are reserved on hold until Finance executes bank transfer.
                </div>
                <div class="form-group">
                    <label class="form-label">Refund Amount (INR)</label>
                    <input type="number" id="refundAmount" class="form-input" placeholder="Amount to withdraw" />
                </div>
                <div class="form-group">
                    <label class="form-label">Account Holder Name</label>
                    <input type="text" id="refundHolder" class="form-input" placeholder="Full name as in bank" />
                </div>
                <div class="form-group">
                    <label class="form-label">Bank Account Number</label>
                    <input type="text" id="refundAccount" class="form-input" placeholder="Bank account number" />
                </div>
                <div class="form-group">
                    <label class="form-label">Bank IFSC Code</label>
                    <input type="text" id="refundIfsc" class="form-input" placeholder="e.g. SBIN0001234" />
                </div>
                <div class="form-group">
                    <label class="form-label">UPI ID (Optional)</label>
                    <input type="text" id="refundUpi" class="form-input" placeholder="username@upi" />
                </div>
                <button class="btn btn-primary" onclick="submitRefund()">Submit Refund Request</button>
            </div>
        </div>

        <!-- 6. REGISTER TAB -->
        <div id="registerTab" class="tab-content" style="display:none;">
            <div class="card">
                <h3 style="font-size:16px; margin-bottom:12px;">Participant Registration</h3>
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" id="regName" class="form-input" placeholder="John Doe" />
                </div>
                <div class="form-group">
                    <label class="form-label">Working Email</label>
                    <input type="email" id="regEmail" class="form-input" placeholder="john@example.com" />
                </div>
                <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" id="regPhone" class="form-input" placeholder="+91 9876543210" />
                </div>
                <div class="form-group">
                    <label class="form-label">College / Organization</label>
                    <input type="text" id="regCollege" class="form-input" placeholder="University / Company" />
                </div>
                <div class="form-group">
                    <label class="form-label">Initial Wallet Top-Up (INR)</label>
                    <input type="number" id="regAmount" class="form-input" placeholder="₹500" />
                </div>
                <div class="form-group">
                    <label class="form-label">Payment UTR / Reference (if paid)</label>
                    <input type="text" id="regUtr" class="form-input" placeholder="Bank UTR" />
                </div>
                <button class="btn btn-primary" onclick="submitRegistration()">Register for KonnectFest</button>
            </div>
        </div>
    </div>

    <!-- PURCHASE CONFIRMATION MODAL -->
    <div id="confirmModal" class="modal">
        <div class="modal-content">
            <span class="timer-badge" id="modalTimer">Expires in 60s</span>
            <h3 style="font-size:18px; margin-bottom:6px;">Confirm Purchase</h3>
            <p style="font-size:13px; color:var(--text-muted); margin-bottom:16px;" id="modalVendor">Vendor Name</p>
            <div style="background:#f8fafc; padding:14px; border-radius:8px; margin-bottom:16px;">
                <div style="font-size:13px; color:var(--text-muted);">Item Description</div>
                <div style="font-size:15px; font-weight:600;" id="modalItem">Item</div>
                <div style="font-size:24px; font-weight:800; color:var(--primary); margin-top:8px;" id="modalAmount">₹0.00</div>
            </div>
            <div style="display:flex; gap:10px;">
                <button class="btn btn-primary" onclick="executeConfirmPurchase()">Confirm & Pay</button>
                <button class="btn" style="background:#e2e8f0; color:#334155;" onclick="closeModal()">Cancel</button>
            </div>
        </div>
    </div>

    <script>
        let currentTxSysId = '';
        let participantSysId = '';
        let eventSysId = '';

        function switchTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
            document.getElementById(tabId).style.display = 'block';
            event.target.classList.add('active');
        }

        function showAlert(msg, type) {
            const el = document.getElementById('alertBox');
            el.className = 'alert alert-' + type;
            el.innerText = msg;
            el.style.display = 'block';
            setTimeout(() => { el.style.display = 'none'; }, 6000);
        }

        function lookupQRToken() {
            const token = document.getElementById('qrTokenInput').value.trim();
            if (!token) return showAlert('Please enter a valid QR token', 'error');

            fetch('/api/x_2327324_konnect/v1/vendor/qr-details?qr_token=' + encodeURIComponent(token))
                .then(r => r.json())
                .then(res => {
                    const data = res.result || res;
                    if (data.valid && data.transaction) {
                        currentTxSysId = data.transaction.sysId;
                        document.getElementById('modalVendor').innerText = data.transaction.vendorName + ' (Stall ' + data.transaction.stallNumber + ')';
                        document.getElementById('modalItem').innerText = data.transaction.itemDescription;
                        document.getElementById('modalAmount').innerText = '₹' + data.transaction.amount.toFixed(2);
                        document.getElementById('confirmModal').style.display = 'flex';
                    } else {
                        showAlert(data.message || 'Invalid or expired QR token', 'error');
                    }
                })
                .catch(err => showAlert('Error validating QR token: ' + err.message, 'error'));
        }

        function executeConfirmPurchase() {
            if (!currentTxSysId) return;
            fetch('/api/x_2327324_konnect/v1/purchase/confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    transaction_sys_id: currentTxSysId,
                    participant_sys_id: participantSysId
                })
            })
            .then(r => r.json())
            .then(res => {
                const data = res.result || res;
                closeModal();
                if (data.success) {
                    showAlert(data.message, 'success');
                    if (data.availableBalance !== undefined) {
                        document.getElementById('displayBalance').innerText = '₹' + data.availableBalance.toFixed(2);
                    }
                } else {
                    showAlert(data.message, 'error');
                }
            })
            .catch(err => showAlert('Transaction failed: ' + err.message, 'error'));
        }

        function closeModal() {
            document.getElementById('confirmModal').style.display = 'none';
        }

        function submitTopUp() {
            const amount = parseFloat(document.getElementById('topupAmount').value);
            const utr = document.getElementById('topupUtr').value.trim();
            if (!amount || amount <= 0) return showAlert('Enter a valid amount', 'error');

            fetch('/api/x_2327324_konnect/v1/wallet/topup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    participant_sys_id: participantSysId,
                    event_sys_id: eventSysId,
                    amount: amount,
                    utr_reference: utr
                })
            })
            .then(r => r.json())
            .then(res => {
                const data = res.result || res;
                if (data.success) {
                    showAlert(data.message, 'success');
                    document.getElementById('topupAmount').value = '';
                    document.getElementById('topupUtr').value = '';
                } else {
                    showAlert(data.message, 'error');
                }
            });
        }

        function submitRefund() {
            const amount = parseFloat(document.getElementById('refundAmount').value);
            const holder = document.getElementById('refundHolder').value.trim();
            const account = document.getElementById('refundAccount').value.trim();
            const ifsc = document.getElementById('refundIfsc').value.trim();
            const upi = document.getElementById('refundUpi').value.trim();

            if (!amount || amount <= 0 || !holder || !account || !ifsc) {
                return showAlert('Please fill all required bank details', 'error');
            }

            fetch('/api/x_2327324_konnect/v1/refund/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    participant_sys_id: participantSysId,
                    event_sys_id: eventSysId,
                    requested_amount: amount,
                    bank_account_holder: holder,
                    bank_account_number: account,
                    bank_ifsc: ifsc,
                    upi_id: upi
                })
            })
            .then(r => r.json())
            .then(res => {
                const data = res.result || res;
                if (data.success) {
                    showAlert(data.message, 'success');
                    if (data.availableBalance !== undefined) {
                        document.getElementById('displayBalance').innerText = '₹' + data.availableBalance.toFixed(2);
                        document.getElementById('displayReserved').innerText = '₹' + data.reservedBalance.toFixed(2);
                    }
                } else {
                    showAlert(data.message, 'error');
                }
            });
        }

        function submitRegistration() {
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const phone = document.getElementById('regPhone').value.trim();
            const college = document.getElementById('regCollege').value.trim();
            const amount = parseFloat(document.getElementById('regAmount').value || '0');
            const utr = document.getElementById('regUtr').value.trim();

            if (!name || !email) return showAlert('Name and email are mandatory', 'error');

            fetch('/api/x_2327324_konnect/v1/registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    college_organization: college,
                    event_sys_id: eventSysId,
                    requested_amount: amount,
                    payment_reference: utr
                })
            })
            .then(r => r.json())
            .then(res => {
                const data = res.result || res;
                if (data.success) {
                    showAlert(data.message, 'success');
                    if (data.participantSysId) participantSysId = data.participantSysId;
                } else {
                    showAlert(data.message, 'error');
                }
            });
        }
    </script>
</body>
</html>`,
})

/**
 * 2. VENDOR WORKSPACE UI PAGE
 * Endpoint: x_2327324_konnect_vendor_workspace.do
 */
export const pageVendorWorkspace = UiPage({
    $id: Now.ID['page_vendor_workspace'],
    endpoint: 'x_2327324_konnect_vendor_workspace.do',
    category: 'general',
    description: 'KonnectFest Vendor Terminal - Create Purchase, 60-Second Ephemeral QR, and Stall Sales Dashboard',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KonnectFest - Vendor Terminal</title>
    <style>
        :root {
            --primary: #0f4c81;
            --accent: #00a88f;
            --bg: #f8fafc;
            --card: #ffffff;
            --border: #e2e8f0;
            --text: #0f172a;
            --muted: #64748b;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { background: var(--bg); color: var(--text); padding-bottom: 40px; }
        .header { background: #0f172a; color: white; padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; }
        .container { max-width: 900px; margin: 20px auto; padding: 0 16px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
        .card { background: var(--card); border-radius: 10px; padding: 22px; border: 1px solid var(--border); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .qr-display { background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 30px; text-align: center; margin-top: 14px; min-height: 280px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .qr-code-box { background: white; padding: 16px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); font-family: monospace; font-size: 13px; word-break: break-all; margin: 12px 0; max-width: 320px; }
        .timer-bar-wrap { width: 100%; background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden; margin-top: 10px; }
        .timer-bar { height: 100%; background: var(--accent); width: 100%; transition: width 1s linear; }
        .form-group { margin-bottom: 14px; }
        .form-label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; }
        .form-input { width: 100%; padding: 11px 14px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px; }
        .btn { width: 100%; padding: 12px 18px; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; }
        .btn-primary { background: var(--primary); color: white; }
    </style>
</head>
<body>
    <div class="header">
        <h2>KonnectFest Vendor Terminal</h2>
        <span style="background:rgba(255,255,255,0.2); padding:4px 12px; border-radius:12px; font-size:13px;" id="vendorTitle">Vendor Stall</span>
    </div>

    <div class="container">
        <div class="grid">
            <!-- 1. CREATE PURCHASE -->
            <div class="card">
                <h3 style="font-size:17px; margin-bottom:14px;">Create Purchase Request</h3>
                <div class="form-group">
                    <label class="form-label">Item / Food Description</label>
                    <input type="text" id="vItem" class="form-input" placeholder="e.g. Masala Dosa + Filter Coffee" />
                </div>
                <div class="form-group">
                    <label class="form-label">Purchase Amount (INR)</label>
                    <input type="number" id="vAmount" class="form-input" placeholder="₹ Amount (e.g. 120)" min="1" />
                </div>
                <button class="btn btn-primary" onclick="generateQR()">Generate 60-Second QR</button>

                <div style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border);">
                    <div style="font-size:13px; color:var(--muted);">Total Stall Sales:</div>
                    <div style="font-size:28px; font-weight:800; color:var(--primary);" id="stallSales">₹0.00</div>
                </div>
            </div>

            <!-- 2. LIVE QR DISPLAY -->
            <div class="card">
                <h3 style="font-size:17px; margin-bottom:14px;">Participant Scan QR</h3>
                <div class="qr-display" id="qrContainer">
                    <div style="color:var(--muted); font-size:14px;">Enter item and amount to display purchase QR</div>
                </div>
            </div>
        </div>
    </div>

    <script>
        let eventSysId = '';
        let vendorSysId = '';
        let timerInterval = null;
        let pollInterval = null;

        function generateQR() {
            const item = document.getElementById('vItem').value.trim();
            const amount = parseFloat(document.getElementById('vAmount').value);
            if (!item || !amount || amount <= 0) return alert('Enter valid item and amount');

            fetch('/api/x_2327324_konnect/v1/vendor/create-qr', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event_sys_id: eventSysId,
                    vendor_sys_id: vendorSysId,
                    item_description: item,
                    amount: amount
                })
            })
            .then(r => r.json())
            .then(res => {
                const data = res.result || res;
                if (data.success) {
                    renderQRBox(data);
                } else {
                    alert(data.message || 'Error generating QR');
                }
            });
        }

        function renderQRBox(data) {
            clearInterval(timerInterval);
            clearInterval(pollInterval);

            let secondsLeft = 60;
            const container = document.getElementById('qrContainer');
            container.innerHTML = \`
                <div style="font-size:15px; font-weight:700; color:var(--primary);">\${data.itemDescription}</div>
                <div style="font-size:32px; font-weight:800; margin:6px 0;">₹\${data.amount.toFixed(2)}</div>
                <div class="qr-code-box">\${data.qrToken}</div>
                <div style="font-size:13px; font-weight:700; color:#b45309;" id="qrTimer">Valid for \${secondsLeft}s</div>
                <div class="timer-bar-wrap"><div class="timer-bar" id="qrBar"></div></div>
                <div style="font-size:12px; color:var(--muted); margin-top:10px;">Waiting for participant scan & confirmation...</div>
            \`;

            timerInterval = setInterval(() => {
                secondsLeft--;
                const timerEl = document.getElementById('qrTimer');
                const barEl = document.getElementById('qrBar');
                if (timerEl) timerEl.innerText = 'Valid for ' + secondsLeft + 's';
                if (barEl) barEl.style.width = (secondsLeft / 60 * 100) + '%';

                if (secondsLeft <= 0) {
                    clearInterval(timerInterval);
                    clearInterval(pollInterval);
                    container.innerHTML = '<div style="color:#ef4444; font-weight:700;">QR Expired (60s). Please regenerate.</div>';
                }
            }, 1000);

            // Poll transaction status
            pollInterval = setInterval(() => {
                fetch('/api/x_2327324_konnect/v1/vendor/qr-details?qr_token=' + encodeURIComponent(data.qrToken))
                    .then(r => r.json())
                    .then(res => {
                        const qData = res.result || res;
                        if (!qData.valid) {
                            clearInterval(timerInterval);
                            clearInterval(pollInterval);
                            container.innerHTML = '<div style="color:#10b981; font-weight:800; font-size:20px;">✓ Purchase Confirmed!</div>';
                        }
                    });
            }, 2000);
        }
    </script>
</body>
</html>`,
})

/**
 * 3. FINANCE WORKSPACE UI PAGE
 * Endpoint: x_2327324_konnect_financer_workspace.do
 */
export const pageFinanceWorkspace = UiPage({
    $id: Now.ID['page_finance_workspace'],
    endpoint: 'x_2327324_konnect_financer_workspace.do',
    category: 'general',
    description: 'KonnectFest Finance Workspace - Bank Payment Verification, UTR Checking, Refunds, and Settlements',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KonnectFest - Finance & Settlement Workspace</title>
    <style>
        :root { --primary: #0f4c81; --accent: #00a88f; --bg: #f1f5f9; --card: #ffffff; --border: #cbd5e1; }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { background: var(--bg); padding-bottom: 50px; }
        .header { background: #1e293b; color: white; padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; }
        .container { max-width: 1100px; margin: 20px auto; padding: 0 16px; }
        .card { background: var(--card); border-radius: 8px; padding: 20px; margin-bottom: 20px; border: 1px solid var(--border); box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
        th, td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #e2e8f0; }
        th { background: #f8fafc; font-weight: 600; color: #475569; }
        .badge { padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: 700; }
        .badge-warning { background: #fef3c7; color: #92400e; }
        .badge-success { background: #dcfce7; color: #166534; }
        .btn-sm { padding: 6px 12px; font-size: 12px; border-radius: 6px; border: none; font-weight: 600; cursor: pointer; }
        .btn-verify { background: var(--accent); color: white; }
        .btn-reject { background: #ef4444; color: white; }
    </style>
</head>
<body>
    <div class="header">
        <h2>KonnectFest Finance & Settlement Desk</h2>
        <span style="font-size:13px; opacity:0.8;">Role: Financer</span>
    </div>

    <div class="container">
        <!-- 1. PENDING PAYMENT VERIFICATION QUEUE -->
        <div class="card">
            <h3 style="font-size:16px; margin-bottom:6px;">Payment Verification Queue</h3>
            <p style="font-size:13px; color:#64748b; margin-bottom:12px;">
                Verify bank receipt against UTR reference before crediting participant wallets.
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Payment #</th>
                        <th>Type</th>
                        <th>Participant</th>
                        <th>Amount (INR)</th>
                        <th>Bank UTR / Ref</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="paymentQueue">
                    <tr>
                        <td>PAY100001</td>
                        <td>Initial Registration</td>
                        <td>Aswin Sai</td>
                        <td>₹500.00</td>
                        <td><strong>UTR987654321012</strong></td>
                        <td><span class="badge badge-warning">Under Review</span></td>
                        <td>
                            <button class="btn-sm btn-verify" onclick="verifyPay('sample_pay_id', 500)">Verify & Credit</button>
                            <button class="btn-sm btn-reject" onclick="rejectPay('sample_pay_id')">Reject</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 2. REFUND REQUESTS QUEUE -->
        <div class="card">
            <h3 style="font-size:16px; margin-bottom:6px;">Post-Event Refund Payout Queue</h3>
            <p style="font-size:13px; color:#64748b; margin-bottom:12px;">
                Execute bank transfer outside ServiceNow and record payout reference below.
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Refund #</th>
                        <th>Participant</th>
                        <th>Amount</th>
                        <th>Bank Details</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="refundQueue">
                    <tr><td colspan="6" style="text-align:center; color:#94a3b8;">No pending refund requests</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <script>
        function verifyPay(paymentSysId, amount) {
            const utr = prompt('Confirm Bank Statement UTR match for ₹' + amount + ' credit:');
            if (!utr) return;

            fetch('/api/x_2327324_konnect/v1/finance/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    payment_sys_id: paymentSysId,
                    verified_amount: amount
                })
            })
            .then(r => r.json())
            .then(res => {
                const data = res.result || res;
                alert(data.message);
                location.reload();
            });
        }
    </script>
</body>
</html>`,
})

/**
 * 4. ORGANIZER DASHBOARD UI PAGE
 * Endpoint: x_2327324_konnect_organizer_dashboard.do
 */
export const pageOrganizerDashboard = UiPage({
    $id: Now.ID['page_organizer_dashboard'],
    endpoint: 'x_2327324_konnect_organizer_dashboard.do',
    category: 'general',
    description: 'KonnectFest Organizer Dashboard - Event Overview, Wallet Liability, Vendor Performance, and Event Closure',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KonnectFest - Organizer Dashboard</title>
    <style>
        :root { --primary: #0f4c81; --bg: #f8fafc; --card: #ffffff; --border: #e2e8f0; }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { background: var(--bg); padding-bottom: 50px; }
        .header { background: #0f4c81; color: white; padding: 20px 28px; display: flex; justify-content: space-between; align-items: center; }
        .container { max-width: 1100px; margin: 24px auto; padding: 0 16px; }
        .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
        @media (max-width: 768px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } }
        .kpi-card { background: var(--card); padding: 18px; border-radius: 8px; border: 1px solid var(--border); box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
        .kpi-label { font-size: 12px; color: #64748b; font-weight: 600; text-transform: uppercase; }
        .kpi-val { font-size: 26px; font-weight: 800; color: #0f172a; margin-top: 6px; }
        .card { background: var(--card); border-radius: 8px; padding: 20px; border: 1px solid var(--border); margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h2>KonnectFest Command Center</h2>
        <span style="font-size:13px; opacity:0.85;">Organizer Dashboard</span>
    </div>

    <div class="container">
        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-label">Total Registrations</div>
                <div class="kpi-val" id="kpiReg">0</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-label">Active Event Wallets</div>
                <div class="kpi-val" id="kpiWallets">0</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-label">Verified Funding (INR)</div>
                <div class="kpi-val" id="kpiFunds">₹0.00</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-label">Total Vendor Sales</div>
                <div class="kpi-val" id="kpiSales">₹0.00</div>
            </div>
        </div>

        <div class="card">
            <h3 style="font-size:16px; margin-bottom:12px;">Event State Lifecycle</h3>
            <p style="font-size:13px; color:#64748b; margin-bottom:14px;">
                Manage event state. Marking an event <strong>Completed</strong> halts new purchases and unlocks the participant unused balance refund portal.
            </p>
            <div style="display:flex; gap:10px;">
                <button style="padding:10px 16px; background:#0f4c81; color:white; border:none; border-radius:6px; font-weight:600; cursor:pointer;">Set Active</button>
                <button style="padding:10px 16px; background:#d97706; color:white; border:none; border-radius:6px; font-weight:600; cursor:pointer;">Mark Completed (Unlock Refunds)</button>
                <button style="padding:10px 16px; background:#475569; color:white; border:none; border-radius:6px; font-weight:600; cursor:pointer;">Close Event</button>
            </div>
        </div>
    </div>
</body>
</html>`,
})
