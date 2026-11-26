const fs = require('fs')
const path = require('path')
const { buildJellyHtml } = require('./generateUiAssets')

const outDir = path.resolve(process.cwd(), 'src/fluent/pages')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

// 1. ORGANIZER
const organizerBody = `
<div class="topbar">
    <div class="topbar-brand">
        <h1>KonnectFest Command Center</h1>
        <span class="role-pill">Organizer / Admin</span>
    </div>
    <div style="display:flex; gap:10px; align-items:center;">
        <a href="/x_2327324_konnect_register.do" target="_blank" class="btn btn-sm" style="background:rgba(255,255,255,0.18); color:#fff;">Public Registration Link ↗</a>
        <button class="btn btn-sm btn-accent" onclick="loadOverview()">↻ Refresh</button>
    </div>
</div>
<div class="container">
    <div id="orgAlert" class="alert"></div>
    <div class="grid-4">
        <div class="kpi-card"><div class="kpi-label">Registrations (Pending)</div><div class="kpi-value" id="kpiReg">-</div></div>
        <div class="kpi-card"><div class="kpi-label">Active Wallets</div><div class="kpi-value" id="kpiWallets">-</div></div>
        <div class="kpi-card"><div class="kpi-label">Verified Funding / Liability</div><div class="kpi-value" id="kpiFunds">₹0.00</div></div>
        <div class="kpi-card"><div class="kpi-label">Vendor Sales (Txns)</div><div class="kpi-value" id="kpiSales">₹0.00</div></div>
    </div>
    <div class="tabs">
        <button class="tab-btn active" onclick="switchOrgTab('tabEvents', this)">Events &amp; Lifecycle</button>
        <button class="tab-btn" onclick="switchOrgTab('tabVendors', this)">Vendors &amp; Performance</button>
        <button class="tab-btn" onclick="switchOrgTab('tabAudit', this)">Audit Trail</button>
    </div>
    <div id="tabEvents" class="org-tab">
        <div class="grid-2">
            <div class="card">
                <div class="card-title">Create New Event</div>
                <div class="card-sub">Configure event name and official UPI payee details. Any positive wallet top-up amount is allowed.</div>
                <div class="form-group"><label class="form-label">Event Name *</label><input type="text" id="evName" class="form-input" placeholder="e.g. KonnectFest 2026" /></div>
                <div class="form-group"><label class="form-label">Official Event UPI ID *</label><input type="text" id="evUpi" class="form-input" placeholder="e.g. konnectfest@axisbank" /></div>
                <div class="form-group"><label class="form-label">Payee Name *</label><input type="text" id="evPayee" class="form-input" placeholder="e.g. KonnectFest Committee" /></div>
                <div class="form-group"><label class="form-label">Initial State</label><select id="evState" class="form-select"><option value="registration_open">Registration Open</option><option value="active">Active / In Progress</option><option value="draft">Draft</option></select></div>
                <div class="form-group"><label class="form-label">Description</label><input type="text" id="evDesc" class="form-input" placeholder="Brief event details" /></div>
                <button class="btn btn-primary btn-block" onclick="createEvent()">+ Create Event</button>
            </div>
            <div class="card">
                <div class="card-title">Event Lifecycle Control</div>
                <div class="card-sub">Transition event state. Marking <strong>Completed</strong> disables purchases and unlocks participant refunds.</div>
                <div id="eventsList" style="display:flex; flex-direction:column; gap:12px;"><div style="color:var(--muted); font-size:13px;">Loading events...</div></div>
            </div>
        </div>
    </div>
    <div id="tabVendors" class="org-tab" style="display:none;">
        <div class="grid-2">
            <div class="card">
                <div class="card-title">Onboard Authorized Vendor</div>
                <div class="card-sub">Register a stall and link it to an event.</div>
                <div class="form-group"><label class="form-label">Event *</label><select id="venEvent" class="form-select"></select></div>
                <div class="form-group"><label class="form-label">Vendor / Brand Name *</label><input type="text" id="venName" class="form-input" placeholder="e.g. Cafe Mocha" /></div>
                <div class="form-group"><label class="form-label">Stall Number</label><input type="text" id="venStall" class="form-input" placeholder="e.g. Stall #04" /></div>
                <div class="form-group"><label class="form-label">Category</label><select id="venCategory" class="form-select"><option value="food_beverage">Food &amp; Beverage</option><option value="merchandise">Merchandise &amp; Apparel</option><option value="games_entertainment">Games &amp; Entertainment</option><option value="services">Services &amp; Experience</option><option value="other">Other</option></select></div>
                <div class="form-group"><label class="form-label">Payout UPI ID</label><input type="text" id="venUpi" class="form-input" placeholder="vendor@upi" /></div>
                <button class="btn btn-primary btn-block" onclick="onboardVendor()">+ Onboard Vendor</button>
            </div>
            <div class="card">
                <div class="card-title">Vendor Performance</div>
                <div class="card-sub">Live sales totals from committed vendor ledger records.</div>
                <div class="table-wrap"><table><thead><tr><th>Vendor</th><th>Stall</th><th>Event</th><th>Txns</th><th>Sales</th><th>Status</th></tr></thead><tbody id="vendorsTable"></tbody></table></div>
            </div>
        </div>
    </div>
    <div id="tabAudit" class="org-tab" style="display:none;">
        <div class="card">
            <div class="card-title">Recent Audit &amp; Lifecycle Log</div>
            <div class="table-wrap"><table><thead><tr><th>Timestamp</th><th>Action</th><th>Target</th><th>From → To</th><th>Reason</th></tr></thead><tbody id="auditTable"></tbody></table></div>
        </div>
    </div>
</div>`

const organizerScript = `
function switchOrgTab(id, btn) {
    document.querySelectorAll('.org-tab').forEach(function(el) { el.style.display = 'none'; });
    document.querySelectorAll('.tab-btn').forEach(function(el) { el.classList.remove('active'); });
    document.getElementById(id).style.display = 'block';
    if (btn) btn.classList.add('active');
}
function loadOverview() {
    fetch('/api/x_2327324_konnect/konnectfest/organizer/overview', { headers: apiHeaders(false) })
        .then(function(r) { return r.json(); })
        .then(function(res) {
            var d = res.result || res;
            if (!d.success) return showBanner('orgAlert', d.message || 'Failed to load overview', 'error');
            var k = d.kpis;
            document.getElementById('kpiReg').textContent = k.totalRegistrations + ' (' + k.pendingRegistrations + ' pending)';
            document.getElementById('kpiWallets').textContent = k.activeWallets;
            document.getElementById('kpiFunds').textContent = formatINR(k.totalVerifiedFunding) + ' / ' + formatINR(k.totalWalletLiability);
            document.getElementById('kpiSales').textContent = formatINR(k.totalSalesVolume) + ' (' + k.successfulTxCount + ')';
            var evHtml = '';
            var evSelect = document.getElementById('venEvent');
            evSelect.innerHTML = '';
            (d.events || []).forEach(function(ev) {
                var opt = document.createElement('option');
                opt.value = ev.sys_id; opt.textContent = ev.name;
                evSelect.appendChild(opt);
                var badgeCls = ev.state === 'active' ? 'badge-success' : (ev.state === 'completed' ? 'badge-warning' : 'badge-info');
                evHtml += '<div style="border:1px solid var(--border); border-radius:8px; padding:14px;">'
                    + '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;"><strong>' + escapeHtml(ev.name) + '</strong><span class="badge ' + badgeCls + '">' + escapeHtml(ev.state) + '</span></div>'
                    + '<div style="font-size:12px; color:var(--muted); margin-bottom:10px;">UPI: ' + escapeHtml(ev.upi_id) + ' (' + escapeHtml(ev.upi_payee_name) + ')</div>'
                    + '<div style="display:flex; gap:6px; flex-wrap:wrap;">'
                    + '<button class="btn btn-sm btn-outline" onclick="setEventState(\\'' + ev.sys_id + '\\', \\'registration_open\\')">Open Reg</button>'
                    + '<button class="btn btn-sm btn-primary" onclick="setEventState(\\'' + ev.sys_id + '\\', \\'active\\')">Set Active</button>'
                    + '<button class="btn btn-sm btn-warning" onclick="setEventState(\\'' + ev.sys_id + '\\', \\'completed\\')">Complete (Unlock Refunds)</button>'
                    + '<button class="btn btn-sm" style="background:#475569;color:#fff;" onclick="setEventState(\\'' + ev.sys_id + '\\', \\'closed\\')">Close</button>'
                    + '</div></div>';
            });
            document.getElementById('eventsList').innerHTML = evHtml || '<div style="color:var(--muted);">No events found.</div>';
            var vHtml = '';
            (d.vendors || []).forEach(function(v) {
                vHtml += '<tr><td><strong>' + escapeHtml(v.name) + '</strong></td><td>' + escapeHtml(v.stall_number) + '</td><td>' + escapeHtml(v.event) + '</td><td>' + v.tx_count + '</td><td><strong>' + formatINR(v.total_sales) + '</strong></td><td><span class="badge badge-success">' + escapeHtml(v.status) + '</span></td></tr>';
            });
            document.getElementById('vendorsTable').innerHTML = vHtml || '<tr><td colspan="6" style="text-align:center;color:var(--muted);">No vendors onboarded</td></tr>';
            var aHtml = '';
            (d.auditLogs || []).forEach(function(a) {
                aHtml += '<tr><td>' + escapeHtml(a.timestamp) + '</td><td><strong>' + escapeHtml(a.action) + '</strong></td><td>' + escapeHtml(a.target) + '</td><td>' + escapeHtml(a.previous_status) + ' → ' + escapeHtml(a.new_status) + '</td><td>' + escapeHtml(a.reason) + '</td></tr>';
            });
            document.getElementById('auditTable').innerHTML = aHtml || '<tr><td colspan="5" style="text-align:center;color:var(--muted);">No audit records yet</td></tr>';
        });
}
function createEvent() {
    var payload = { action: 'create', name: document.getElementById('evName').value.trim(), upi_id: document.getElementById('evUpi').value.trim(), upi_payee_name: document.getElementById('evPayee').value.trim(), state: document.getElementById('evState').value, description: document.getElementById('evDesc').value.trim() };
    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify(payload) })
        .then(function(r) { return r.json(); }).then(function(res) {
            var d = res.result || res;
            showBanner('orgAlert', d.message, d.success ? 'success' : 'error');
            if (d.success) { document.getElementById('evName').value = ''; loadOverview(); }
        });
}
function setEventState(eventSysId, newState) {
    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ action: 'update_state', event_sys_id: eventSysId, new_state: newState }) })
        .then(function(r) { return r.json(); }).then(function(res) {
            var d = res.result || res;
            showBanner('orgAlert', d.message, d.success ? 'success' : 'error');
            loadOverview();
        });
}
function onboardVendor() {
    var payload = { event_sys_id: document.getElementById('venEvent').value, name: document.getElementById('venName').value.trim(), stall_number: document.getElementById('venStall').value.trim(), category: document.getElementById('venCategory').value, upi_id: document.getElementById('venUpi').value.trim() };
    fetch('/api/x_2327324_konnect/konnectfest/organizer/vendor', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify(payload) })
        .then(function(r) { return r.json(); }).then(function(res) {
            var d = res.result || res;
            showBanner('orgAlert', d.message, d.success ? 'success' : 'error');
            if (d.success) { document.getElementById('venName').value = ''; document.getElementById('venStall').value = ''; loadOverview(); }
        });
}
loadOverview();
`

// 2. FINANCE
const financeBody = `
<div class="topbar">
    <div class="topbar-brand"><h1>KonnectFest Finance Desk</h1><span class="role-pill">Financer</span></div>
    <button class="btn btn-sm btn-accent" onclick="loadFinanceQueues()">↻ Refresh Queues</button>
</div>
<div class="container">
    <div id="finAlert" class="alert"></div>
    <div class="grid-4">
        <div class="kpi-card"><div class="kpi-label">Verified Funding</div><div class="kpi-value" id="recCredits">₹0.00</div></div>
        <div class="kpi-card"><div class="kpi-label">Active Wallet Liability</div><div class="kpi-value" id="recWallet">₹0.00</div></div>
        <div class="kpi-card"><div class="kpi-label">Refund Holds / Paid</div><div class="kpi-value" id="recRefunds">₹0.00</div></div>
        <div class="kpi-card"><div class="kpi-label">Vendor Settlements Paid</div><div class="kpi-value" id="recSettled">₹0.00</div></div>
    </div>
    <div class="tabs">
        <button class="tab-btn active" onclick="switchFinTab('finPayTab', this)">Payment Verification Queue</button>
        <button class="tab-btn" onclick="switchFinTab('finRefTab', this)">Refund Payout Queue</button>
        <button class="tab-btn" onclick="switchFinTab('finSetTab', this)">Vendor Settlements</button>
    </div>
    <div id="finPayTab" class="fin-tab">
        <div class="card">
            <div class="card-title">Pending Bank Payments (Registration &amp; Top-Ups)</div>
            <div class="card-sub">Match UTR against actual bank statement before approving. Approval automatically provisions participant login &amp; credits wallet.</div>
            <div class="table-wrap"><table><thead><tr><th>Payment #</th><th>Type</th><th>Participant</th><th>Event</th><th>Amount</th><th>UTR / Ref</th><th>Status</th><th>Actions</th></tr></thead><tbody id="pendingPayBody"></tbody></table></div>
        </div>
    </div>
    <div id="finRefTab" class="fin-tab" style="display:none;">
        <div class="card">
            <div class="card-title">Post-Event Unused Balance Refund Requests</div>
            <div class="card-sub">Execute external bank/UPI transfer first, then record payout UTR to finalize and clear the reserved wallet hold.</div>
            <div class="table-wrap"><table><thead><tr><th>Refund #</th><th>Participant</th><th>Amount</th><th>Bank / UPI Details</th><th>Status</th><th>Actions</th></tr></thead><tbody id="refundQueueBody"></tbody></table></div>
        </div>
    </div>
    <div id="finSetTab" class="fin-tab" style="display:none;">
        <div class="card">
            <div class="card-title">Unsettled Vendor Sales</div>
            <div class="table-wrap"><table><thead><tr><th>Vendor</th><th>Event</th><th>Txns</th><th>Unsettled Credits</th><th>Action</th></tr></thead><tbody id="unsettledVendorsBody"></tbody></table></div>
        </div>
        <div class="card">
            <div class="card-title">Settlement Batches</div>
            <div class="table-wrap"><table><thead><tr><th>Batch ID</th><th>Vendor</th><th>Event</th><th>Net Payable</th><th>Status</th><th>Payout UTR</th><th>Action</th></tr></thead><tbody id="settlementsBody"></tbody></table></div>
        </div>
    </div>
</div>`

const financeScript = `
function switchFinTab(id, btn) {
    document.querySelectorAll('.fin-tab').forEach(function(el) { el.style.display = 'none'; });
    document.querySelectorAll('.tab-btn').forEach(function(el) { el.classList.remove('active'); });
    document.getElementById(id).style.display = 'block';
    if (btn) btn.classList.add('active');
}
function loadFinanceQueues() {
    fetch('/api/x_2327324_konnect/konnectfest/finance/queues', { headers: apiHeaders(false) })
        .then(function(r) { return r.json(); })
        .then(function(res) {
            var d = res.result || res;
            if (!d.success) return showBanner('finAlert', d.message || 'Error loading queues', 'error');
            var rec = d.reconciliation || {};
            document.getElementById('recCredits').textContent = formatINR(rec.totalVerifiedCredits);
            document.getElementById('recWallet').textContent = formatINR(rec.totalWalletAvailable);
            document.getElementById('recRefunds').textContent = formatINR(rec.totalWalletReserved) + ' / ' + formatINR(rec.totalPaidRefunds);
            document.getElementById('recSettled').textContent = formatINR(rec.totalPaidSettlements);
            var pHtml = '';
            (d.pendingPayments || []).forEach(function(p) {
                pHtml += '<tr><td><strong>' + escapeHtml(p.number) + '</strong></td><td>' + escapeHtml(p.type) + '</td><td>' + escapeHtml(p.participant_name) + '</td><td>' + escapeHtml(p.event_name) + '</td><td><strong>' + formatINR(p.requested_amount) + '</strong></td><td><code>' + escapeHtml(p.utr_reference || 'Awaiting UTR') + '</code></td><td><span class="badge badge-warning">' + escapeHtml(p.status) + '</span></td><td style="display:flex; gap:6px;"><button class="btn btn-sm btn-accent" onclick="verifyPayment(\\'' + p.sys_id + '\\', ' + p.requested_amount + ')">Verify &amp; Credit</button><button class="btn btn-sm btn-danger" onclick="rejectPayment(\\'' + p.sys_id + '\\')">Reject</button></td></tr>';
            });
            document.getElementById('pendingPayBody').innerHTML = pHtml || '<tr><td colspan="8" style="text-align:center;color:var(--muted);">No pending payments in queue</td></tr>';
            var rHtml = '';
            (d.refunds || []).forEach(function(rf) {
                var bankInfo = escapeHtml(rf.bank_account_holder) + ' | A/C: ' + escapeHtml(rf.bank_account_number) + ' | IFSC: ' + escapeHtml(rf.bank_ifsc) + (rf.upi_id ? ' | UPI: ' + escapeHtml(rf.upi_id) : '');
                var actions = rf.status === 'paid' || rf.status === 'rejected' ? '<span>' + escapeHtml(rf.payout_reference || '-') + '</span>' : '<button class="btn btn-sm btn-accent" onclick="finalizeRefund(\\'' + rf.sys_id + '\\')">Mark Paid (UTR)</button> <button class="btn btn-sm btn-danger" onclick="rejectRefund(\\'' + rf.sys_id + '\\')">Reject</button>';
                var bCls = rf.status === 'paid' ? 'badge-success' : (rf.status === 'rejected' ? 'badge-danger' : 'badge-warning');
                rHtml += '<tr><td><strong>' + escapeHtml(rf.number) + '</strong></td><td>' + escapeHtml(rf.participant_name) + '</td><td><strong>' + formatINR(rf.requested_amount) + '</strong></td><td style="font-size:12px;">' + bankInfo + '</td><td><span class="badge ' + bCls + '">' + escapeHtml(rf.status) + '</span></td><td>' + actions + '</td></tr>';
            });
            document.getElementById('refundQueueBody').innerHTML = rHtml || '<tr><td colspan="6" style="text-align:center;color:var(--muted);">No refund requests</td></tr>';
            var uHtml = '';
            (d.unsettledVendors || []).forEach(function(uv) {
                uHtml += '<tr><td><strong>' + escapeHtml(uv.vendor_name) + '</strong></td><td>' + escapeHtml(uv.event_name) + '</td><td>' + uv.tx_count + '</td><td><strong>' + formatINR(uv.unsettled_amount) + '</strong></td><td><button class="btn btn-sm btn-primary" onclick="createSettlement(\\'' + uv.event_sys_id + '\\', \\'' + uv.vendor_sys_id + '\\')">Create Settlement Batch</button></td></tr>';
            });
            document.getElementById('unsettledVendorsBody').innerHTML = uHtml || '<tr><td colspan="5" style="text-align:center;color:var(--muted);">All vendor sales are settled or batched</td></tr>';
            var sHtml = '';
            (d.settlements || []).forEach(function(st) {
                var act = st.status === 'paid' ? '<span class="badge badge-success">Settled</span>' : '<button class="btn btn-sm btn-accent" onclick="paySettlement(\\'' + st.sys_id + '\\')">Record Payout UTR</button>';
                sHtml += '<tr><td><strong>' + escapeHtml(st.batch_id) + '</strong></td><td>' + escapeHtml(st.vendor_name) + '</td><td>' + escapeHtml(st.event_name) + '</td><td><strong>' + formatINR(st.net_payable_amount) + '</strong></td><td><span class="badge badge-info">' + escapeHtml(st.status) + '</span></td><td>' + escapeHtml(st.payout_reference || '-') + '</td><td>' + act + '</td></tr>';
            });
            document.getElementById('settlementsBody').innerHTML = sHtml || '<tr><td colspan="7" style="text-align:center;color:var(--muted);">No settlement batches yet</td></tr>';
        });
}
function verifyPayment(sysId, defaultAmt) {
    var amtStr = prompt('Enter actual bank-verified INR amount:', String(defaultAmt));
    if (!amtStr) return;
    fetch('/api/x_2327324_konnect/konnectfest/finance/verify-payment', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ payment_sys_id: sysId, verified_amount: parseFloat(amtStr) }) })
        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });
}
function rejectPayment(sysId) {
    var reason = prompt('Enter rejection reason:');
    if (!reason) return;
    fetch('/api/x_2327324_konnect/konnectfest/finance/reject-payment', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ payment_sys_id: sysId, reason: reason }) })
        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });
}
function finalizeRefund(sysId) {
    var utr = prompt('Enter bank payout UTR / Reference after completing external transfer:');
    if (!utr) return;
    fetch('/api/x_2327324_konnect/konnectfest/finance/finalize-refund', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ refund_sys_id: sysId, payout_reference: utr }) })
        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });
}
function rejectRefund(sysId) {
    var reason = prompt('Enter rejection reason (hold will be released back to participant wallet):');
    if (!reason) return;
    fetch('/api/x_2327324_konnect/konnectfest/finance/reject-refund', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ refund_sys_id: sysId, reason: reason }) })
        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });
}
function createSettlement(evId, venId) {
    fetch('/api/x_2327324_konnect/konnectfest/finance/settle-vendor', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ event_sys_id: evId, vendor_sys_id: venId }) })
        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });
}
function paySettlement(setId) {
    var utr = prompt('Enter bank payout UTR reference for vendor settlement:');
    if (!utr) return;
    fetch('/api/x_2327324_konnect/konnectfest/finance/pay-settlement', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ settlement_sys_id: setId, payout_reference: utr }) })
        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('finAlert', d.message, d.success ? 'success' : 'error'); loadFinanceQueues(); });
}
loadFinanceQueues();
`

// 3. VENDOR
const vendorBody = `
<div class="topbar">
    <div class="topbar-brand"><h1>KonnectFest Vendor Terminal</h1><span class="role-pill" id="vendorPill">Vendor</span></div>
    <div style="display:flex; gap:10px; align-items:center;">
        <select id="vendorSwitcher" class="form-select" style="width:auto; padding:6px 10px; font-size:13px;" onchange="loadVendorDash(this.value)"></select>
        <button class="btn btn-sm btn-accent" onclick="loadVendorDash()">↻ Refresh</button>
    </div>
</div>
<div class="container">
    <div id="venAlert" class="alert"></div>
    <div class="grid-4">
        <div class="kpi-card"><div class="kpi-label">Gross Sales</div><div class="kpi-value" id="vGross">₹0.00</div></div>
        <div class="kpi-card"><div class="kpi-label">Unsettled Balance</div><div class="kpi-value" id="vUnsettled">₹0.00</div></div>
        <div class="kpi-card"><div class="kpi-label">In Settlement Batch</div><div class="kpi-value" id="vBatch">₹0.00</div></div>
        <div class="kpi-card"><div class="kpi-label">Settled &amp; Paid</div><div class="kpi-value" id="vSettled">₹0.00</div></div>
    </div>
    <div class="grid-2">
        <div class="card">
            <div class="card-title">Create Purchase &amp; Generate 120s QR</div>
            <div class="card-sub" id="vStallInfo">Loading stall details...</div>
            <div class="form-group"><label class="form-label">Item / Order Description *</label><input type="text" id="vItem" class="form-input" placeholder="e.g. Paneer Roll + Cold Coffee" /></div>
            <div class="form-group"><label class="form-label">Purchase Amount (INR) *</label><input type="number" id="vAmount" class="form-input" placeholder="₹ Amount (e.g. 120)" min="1" step="0.01" /></div>
            <button class="btn btn-primary btn-block" onclick="generateVendorQR()">Generate 120-Second Purchase QR</button>
        </div>
        <div class="card" style="text-align:center;">
            <div class="card-title">Customer Scan QR</div>
            <div class="card-sub">Participant scans with phone camera → opens Chrome → logs in &amp; confirms.</div>
            <div id="qrDisplayArea" style="min-height:260px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#f8fafc; border:2px dashed #cbd5e1; border-radius:12px; padding:20px;">
                <span style="color:var(--muted); font-size:13px;">Enter item and amount to display scannable QR</span>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-title">Recent Stall Transactions</div>
        <div class="table-wrap"><table><thead><tr><th>Txn ID</th><th>Item</th><th>Amount</th><th>Participant</th><th>Status</th><th>Time</th></tr></thead><tbody id="vTxBody"></tbody></table></div>
    </div>
</div>`

const vendorScript = `
var activeVendor = null;
var qrCountdown = null;
var qrPoller = null;
function loadVendorDash(selectedVendorId) {
    var url = '/api/x_2327324_konnect/konnectfest/vendor/dashboard' + (selectedVendorId ? '?vendor_sys_id=' + encodeURIComponent(selectedVendorId) : '');
    fetch(url, { headers: apiHeaders(false) }).then(function(r) { return r.json(); }).then(function(res) {
        var d = res.result || res;
        if (!d.success) return showBanner('venAlert', d.message || 'Could not load vendor stall', 'error');
        activeVendor = d.vendor;
        document.getElementById('vendorPill').textContent = activeVendor.name + ' (' + activeVendor.stall_number + ')';
        document.getElementById('vStallInfo').textContent = 'Event: ' + activeVendor.event_name + ' | Stall: ' + activeVendor.stall_number + ' | Status: ' + activeVendor.status;
        var sw = document.getElementById('vendorSwitcher'); sw.innerHTML = '';
        (d.allVendors || []).forEach(function(av) {
            var opt = document.createElement('option'); opt.value = av.sys_id; opt.textContent = av.name + ' (' + av.stall_number + ')';
            if (av.sys_id === activeVendor.sys_id) opt.selected = true;
            sw.appendChild(opt);
        });
        var s = d.summary || {};
        document.getElementById('vGross').textContent = formatINR(s.grossSales);
        document.getElementById('vUnsettled').textContent = formatINR(s.unsettledAmount);
        document.getElementById('vBatch').textContent = formatINR(s.inBatchAmount);
        document.getElementById('vSettled').textContent = formatINR(s.settledAmount);
        var tHtml = '';
        (d.transactions || []).forEach(function(tx) {
            var bCls = tx.status === 'success' ? 'badge-success' : (tx.status === 'pending' ? 'badge-warning' : 'badge-danger');
            tHtml += '<tr><td><code>' + escapeHtml(tx.transaction_id) + '</code></td><td>' + escapeHtml(tx.item_description) + '</td><td><strong>' + formatINR(tx.amount) + '</strong></td><td>' + escapeHtml(tx.participant_name) + '</td><td><span class="badge ' + bCls + '">' + escapeHtml(tx.status) + '</span></td><td>' + escapeHtml(tx.confirmed_at || tx.created_on) + '</td></tr>';
        });
        document.getElementById('vTxBody').innerHTML = tHtml || '<tr><td colspan="6" style="text-align:center;color:var(--muted);">No transactions yet</td></tr>';
    });
}
function generateVendorQR() {
    if (!activeVendor) return showBanner('venAlert', 'Vendor stall not loaded', 'error');
    var item = document.getElementById('vItem').value.trim();
    var amount = parseFloat(document.getElementById('vAmount').value || '0');
    if (!item || amount <= 0) return showBanner('venAlert', 'Enter a valid item description and positive amount', 'error');
    fetch('/api/x_2327324_konnect/konnectfest/vendor/create-qr', {
        method: 'POST', headers: apiHeaders(true),
        body: JSON.stringify({ event_sys_id: activeVendor.event_sys_id, vendor_sys_id: activeVendor.sys_id, item_description: item, amount: amount })
    }).then(function(r) { return r.json(); }).then(function(res) {
        var d = res.result || res;
        if (!d.success) return showBanner('venAlert', d.message, 'error');
        startQRDisplay(d);
    });
}
function startQRDisplay(data) {
    clearInterval(qrCountdown); clearInterval(qrPoller);
    var seconds = data.expirySeconds || 120;
    var totalSeconds = seconds;
    var area = document.getElementById('qrDisplayArea');
    area.innerHTML = '<div style="font-weight:700; color:var(--primary); font-size:15px;">' + escapeHtml(data.itemDescription) + '</div>'
        + '<div style="font-size:28px; font-weight:800; margin:4px 0 10px;">' + formatINR(data.amount) + '</div>'
        + '<div class="qr-box" id="vendorQrSvg"></div>'
        + '<div id="qrTimerText" style="font-size:13px; font-weight:700; color:var(--warning); margin-top:10px;">Expires in ' + seconds + 's</div>'
        + '<div class="progress-track" style="max-width:260px;"><div class="progress-fill" id="qrProgressFill" style="width:100%;"></div></div>'
        + '<div style="font-size:11px; color:var(--muted); margin-top:6px; word-break:break-all;">Token: <code>' + escapeHtml(data.qrToken) + '</code></div>'
        + '<a href="' + escapeHtml(data.confirmUrl) + '" target="_blank" style="font-size:12px; color:var(--primary); margin-top:6px; font-weight:600;">Open Confirmation Link ↗</a>';
    renderQRCode(document.getElementById('vendorQrSvg'), data.confirmUrl, 5);
    qrCountdown = setInterval(function() {
        seconds--;
        var txt = document.getElementById('qrTimerText');
        var fill = document.getElementById('qrProgressFill');
        if (txt) txt.textContent = 'Expires in ' + seconds + 's';
        if (fill) fill.style.width = ((seconds / totalSeconds) * 100) + '%';
        if (seconds <= 0) {
            clearInterval(qrCountdown); clearInterval(qrPoller);
            area.innerHTML = '<div style="color:var(--danger); font-weight:700; padding:20px;">QR Expired (120s). Please regenerate a new QR.</div>';
        }
    }, 1000);
    qrPoller = setInterval(function() {
        fetch('/api/x_2327324_konnect/konnectfest/vendor/qr-details?qr_token=' + encodeURIComponent(data.qrToken), { headers: apiHeaders(false) })
            .then(function(r) { return r.json(); }).then(function(res) {
                var qd = res.result || res;
                if (!qd.valid) {
                    clearInterval(qrCountdown); clearInterval(qrPoller);
                    area.innerHTML = '<div style="color:var(--success); font-weight:800; font-size:20px; padding:30px;">✓ Payment Confirmed!<br/><span style="font-size:13px; font-weight:500;">Credited to Vendor Ledger</span></div>';
                    loadVendorDash(activeVendor.sys_id);
                }
            });
    }, 2000);
}
loadVendorDash();
`

// 4. PARTICIPANT
const participantBody = `
<div class="topbar">
    <div class="topbar-brand"><h1>KonnectFest Wallet</h1><span class="role-pill" id="partNamePill">Participant</span></div>
    <button class="btn btn-sm btn-accent" onclick="loadParticipantDash()">↻ Refresh</button>
</div>
<div class="container-sm">
    <div id="partAlert" class="alert"></div>
    <div class="card" style="background:linear-gradient(135deg, #0f4c81 0%, #1e3a8a 100%); color:#fff; border:none;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; opacity:0.85; text-transform:uppercase; font-weight:700;" id="partEventName">Event Wallet</span>
            <span class="badge" style="background:rgba(255,255,255,0.2); color:#fff;" id="partEventState">ACTIVE</span>
        </div>
        <div style="font-size:36px; font-weight:800; margin:10px 0 4px;" id="partBalance">₹0.00</div>
        <div style="font-size:12px; opacity:0.85;">Verified Available Balance</div>
        <div style="display:flex; justify-content:space-between; margin-top:16px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.18); font-size:12px;">
            <div>Reserved Hold: <strong id="partReserved">₹0.00</strong></div>
            <div>Total Spent: <strong id="partSpent">₹0.00</strong></div>
        </div>
    </div>
    <div class="tabs">
        <button class="tab-btn active" onclick="switchPartTab('pScanTab', this)">Scan / Pay QR</button>
        <button class="tab-btn" onclick="switchPartTab('pTopupTab', this)">Top-Up Funds</button>
        <button class="tab-btn" onclick="switchPartTab('pHistoryTab', this)">Ledger &amp; Receipts</button>
        <button class="tab-btn" onclick="switchPartTab('pRefundTab', this)">Refund</button>
    </div>
    <div id="pScanTab" class="part-tab">
        <div class="card">
            <div class="card-title">Confirm Vendor Purchase</div>
            <div class="card-sub">Scan the vendor's 120-second QR with your phone camera, or paste the QR token below.</div>
            <div class="form-group"><label class="form-label">Vendor QR Token</label><input type="text" id="pQrInput" class="form-input" placeholder="KF_QR_..." /></div>
            <button class="btn btn-primary btn-block" onclick="lookupPartQR()">Review Purchase Details</button>
        </div>
    </div>
    <div id="pTopupTab" class="part-tab" style="display:none;">
        <div class="card">
            <div class="card-title">Add Funds to Wallet</div>
            <div class="card-sub">Enter any amount to generate a UPI Funding QR. Funds are credited after Finance verifies your UTR.</div>
            <div class="form-group"><label class="form-label">Top-Up Amount (INR)</label><input type="number" id="topupAmt" class="form-input" placeholder="e.g. 500" min="1" step="0.01" /></div>
            <button class="btn btn-primary btn-block" onclick="createTopUpQR()">Generate UPI Funding QR</button>
            <div id="topupQrSection" style="display:none; margin-top:20px; text-align:center; padding-top:16px; border-top:1px solid var(--border);">
                <div class="qr-box" id="topupQrBox"></div>
                <div style="font-size:12px; color:var(--muted); margin-top:8px;" id="topupPayeeInfo"></div>
                <div class="form-group" style="text-align:left; margin-top:14px;"><label class="form-label">Enter 12-Digit Bank UTR after UPI Payment *</label><input type="text" id="topupUtrInput" class="form-input" placeholder="e.g. 432198765432" /></div>
                <button class="btn btn-accent btn-block" onclick="submitTopUpUtr()">Submit UTR for Finance Verification</button>
            </div>
        </div>
    </div>
    <div id="pHistoryTab" class="part-tab" style="display:none;">
        <div class="card"><div class="card-title">Digital Purchase Coupons / Receipts</div><div id="receiptsList" style="font-size:13px;"></div></div>
        <div class="card"><div class="card-title">Wallet Ledger History</div><div id="ledgerList" style="font-size:13px;"></div></div>
    </div>
    <div id="pRefundTab" class="part-tab" style="display:none;">
        <div class="card">
            <div class="card-title">Post-Event Unused Balance Refund</div>
            <div id="refundLockedMsg" class="alert alert-info" style="display:none;">Refund requests are enabled only after the Organizer marks the event as <strong>Completed</strong>.</div>
            <div id="refundFormArea">
                <div class="form-group"><label class="form-label">Refund Amount (INR) *</label><input type="number" id="rfAmt" class="form-input" placeholder="Amount up to available balance" min="1" step="0.01" /></div>
                <div class="form-group"><label class="form-label">Account Holder Name *</label><input type="text" id="rfHolder" class="form-input" placeholder="Full Name" /></div>
                <div class="form-group"><label class="form-label">Bank Account Number *</label><input type="text" id="rfAcct" class="form-input" placeholder="Account Number" /></div>
                <div class="form-group"><label class="form-label">IFSC Code *</label><input type="text" id="rfIfsc" class="form-input" placeholder="e.g. SBIN0001234" /></div>
                <div class="form-group"><label class="form-label">UPI ID (Optional)</label><input type="text" id="rfUpi" class="form-input" placeholder="name@upi" /></div>
                <button class="btn btn-primary btn-block" onclick="submitPartRefund()">Request Refund &amp; Reserve Hold</button>
            </div>
        </div>
    </div>
</div>
<div id="pConfirmModal" class="modal-backdrop">
    <div class="modal-card">
        <span class="badge badge-warning" style="margin-bottom:8px;">120s Checkout Confirmation</span>
        <h3 style="font-size:18px; margin-bottom:4px;" id="mVendor">Vendor</h3>
        <p style="font-size:13px; color:var(--muted); margin-bottom:14px;" id="mEvent">Event</p>
        <div style="background:#f8fafc; padding:14px; border-radius:8px; border:1px solid var(--border); margin-bottom:16px;">
            <div style="font-size:12px; color:var(--muted);">Item Description</div>
            <div style="font-size:15px; font-weight:700; margin-bottom:6px;" id="mItem">-</div>
            <div style="font-size:28px; font-weight:800; color:var(--primary);" id="mAmt">₹0.00</div>
        </div>
        <div style="display:flex; gap:10px;">
            <button class="btn btn-accent" style="flex:1;" onclick="confirmPartPurchase()">Confirm &amp; Pay</button>
            <button class="btn btn-outline" style="flex:1;" onclick="closePartModal()">Cancel</button>
        </div>
    </div>
</div>`

const participantScript = `
var pData = null;
var pendingTxSysId = '';
var activeTopUpPaymentId = '';
function switchPartTab(id, btn) {
    document.querySelectorAll('.part-tab').forEach(function(el) { el.style.display = 'none'; });
    document.querySelectorAll('.tab-btn').forEach(function(el) { el.classList.remove('active'); });
    document.getElementById(id).style.display = 'block';
    if (btn) btn.classList.add('active');
}
function loadParticipantDash() {
    var params = new URLSearchParams(window.location.search);
    var pId = params.get('participant_sys_id') || '';
    var url = '/api/x_2327324_konnect/konnectfest/participant/dashboard' + (pId ? '?participant_sys_id=' + encodeURIComponent(pId) : '');
    fetch(url, { headers: apiHeaders(false) }).then(function(r) { return r.json(); }).then(function(res) {
        var d = res.result || res;
        if (!d.success) return showBanner('partAlert', d.message || 'Could not load wallet', 'error');
        pData = d;
        document.getElementById('partNamePill').textContent = d.participant.name;
        document.getElementById('partEventName').textContent = d.event.name || 'Event Wallet';
        document.getElementById('partEventState').textContent = (d.event.state || '').toUpperCase();
        document.getElementById('partBalance').textContent = formatINR(d.wallet.available_balance);
        document.getElementById('partReserved').textContent = formatINR(d.wallet.reserved_balance);
        document.getElementById('partSpent').textContent = formatINR(d.wallet.total_spent);
        var isCompleted = d.event.state === 'completed';
        document.getElementById('refundLockedMsg').style.display = isCompleted ? 'none' : 'block';
        document.getElementById('refundFormArea').style.display = isCompleted ? 'block' : 'none';
        var rHtml = '';
        (d.receipts || []).forEach(function(cp) {
            rHtml += '<div style="padding:10px 0; border-bottom:1px solid var(--border); display:flex; justify-content:space-between;"><div><strong>' + escapeHtml(cp.item_description) + '</strong><br/><span style="color:var(--muted); font-size:11px;">' + escapeHtml(cp.vendor_name) + ' • ' + escapeHtml(cp.coupon_id) + '</span></div><div style="font-weight:700; color:var(--primary);">' + formatINR(cp.value) + '</div></div>';
        });
        document.getElementById('receiptsList').innerHTML = rHtml || '<span style="color:var(--muted);">No digital purchase receipts yet.</span>';
        var lHtml = '';
        (d.ledger || []).forEach(function(lg) {
            var isCredit = lg.entry_type === 'initial_credit' || lg.entry_type === 'top_up' || lg.entry_type === 'refund_release';
            lHtml += '<div style="padding:10px 0; border-bottom:1px solid var(--border); display:flex; justify-content:space-between;"><div><strong>' + escapeHtml(lg.entry_type.toUpperCase()) + '</strong><br/><span style="color:var(--muted); font-size:11px;">' + escapeHtml(lg.notes) + '</span></div><div style="text-align:right;"><strong style="color:' + (isCredit ? 'var(--success)' : 'var(--danger)') + ';">' + (isCredit ? '+' : '-') + formatINR(lg.amount) + '</strong><br/><span style="font-size:11px; color:var(--muted);">Bal: ' + formatINR(lg.available_after) + '</span></div></div>';
        });
        document.getElementById('ledgerList').innerHTML = lHtml || '<span style="color:var(--muted);">No ledger entries yet.</span>';
        var qrParam = params.get('qr_token');
        if (qrParam && !pendingTxSysId) { document.getElementById('pQrInput').value = qrParam; lookupPartQR(); }
    });
}
function lookupPartQR() {
    var token = document.getElementById('pQrInput').value.trim();
    if (!token) return showBanner('partAlert', 'Enter a QR token to verify', 'error');
    fetch('/api/x_2327324_konnect/konnectfest/vendor/qr-details?qr_token=' + encodeURIComponent(token), { headers: apiHeaders(false) })
        .then(function(r) { return r.json(); }).then(function(res) {
            var d = res.result || res;
            if (!d.valid || !d.transaction) return showBanner('partAlert', d.message || 'Invalid or expired QR token', 'error');
            pendingTxSysId = d.transaction.sysId;
            document.getElementById('mVendor').textContent = d.transaction.vendorName + (d.transaction.stallNumber ? ' (' + d.transaction.stallNumber + ')' : '');
            document.getElementById('mEvent').textContent = d.transaction.eventName;
            document.getElementById('mItem').textContent = d.transaction.itemDescription;
            document.getElementById('mAmt').textContent = formatINR(d.transaction.amount);
            document.getElementById('pConfirmModal').style.display = 'flex';
        });
}
function confirmPartPurchase() {
    if (!pendingTxSysId || !pData) return;
    fetch('/api/x_2327324_konnect/konnectfest/purchase/confirm', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ transaction_sys_id: pendingTxSysId, participant_sys_id: pData.participant.sys_id }) })
        .then(function(r) { return r.json(); }).then(function(res) {
            var d = res.result || res; closePartModal();
            showBanner('partAlert', d.message, d.success ? 'success' : 'error');
            if (d.success) { document.getElementById('pQrInput').value = ''; loadParticipantDash(); }
        });
}
function closePartModal() { document.getElementById('pConfirmModal').style.display = 'none'; }
function createTopUpQR() {
    if (!pData) return;
    var amt = parseFloat(document.getElementById('topupAmt').value || '0');
    if (amt <= 0) return showBanner('partAlert', 'Enter a positive top-up amount', 'error');
    fetch('/api/x_2327324_konnect/konnectfest/wallet/topup', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ participant_sys_id: pData.participant.sys_id, event_sys_id: pData.event.sys_id, amount: amt }) })
        .then(function(r) { return r.json(); }).then(function(res) {
            var d = res.result || res;
            if (!d.success) return showBanner('partAlert', d.message, 'error');
            activeTopUpPaymentId = d.paymentSysId;
            document.getElementById('topupQrSection').style.display = 'block';
            renderQRCode(document.getElementById('topupQrBox'), d.upiUri, 5);
            document.getElementById('topupPayeeInfo').textContent = 'Pay ' + formatINR(d.amount) + ' to ' + d.payeeName + ' (' + d.upiId + ') • Ref: ' + d.paymentNumber;
        });
}
function submitTopUpUtr() {
    var utr = document.getElementById('topupUtrInput').value.trim();
    if (!activeTopUpPaymentId || !utr) return showBanner('partAlert', 'Enter your bank UTR reference', 'error');
    fetch('/api/x_2327324_konnect/konnectfest/registration/submit-utr', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify({ payment_sys_id: activeTopUpPaymentId, utr_reference: utr }) })
        .then(function(r) { return r.json(); }).then(function(res) {
            var d = res.result || res; showBanner('partAlert', d.message, d.success ? 'success' : 'error');
            if (d.success) { document.getElementById('topupQrSection').style.display = 'none'; document.getElementById('topupAmt').value = ''; document.getElementById('topupUtrInput').value = ''; loadParticipantDash(); }
        });
}
function submitPartRefund() {
    if (!pData) return;
    var payload = { participant_sys_id: pData.participant.sys_id, event_sys_id: pData.event.sys_id, requested_amount: parseFloat(document.getElementById('rfAmt').value || '0'), bank_account_holder: document.getElementById('rfHolder').value.trim(), bank_account_number: document.getElementById('rfAcct').value.trim(), bank_ifsc: document.getElementById('rfIfsc').value.trim(), upi_id: document.getElementById('rfUpi').value.trim() };
    fetch('/api/x_2327324_konnect/konnectfest/refund/request', { method: 'POST', headers: apiHeaders(true), body: JSON.stringify(payload) })
        .then(function(r) { return r.json(); }).then(function(res) { var d = res.result || res; showBanner('partAlert', d.message, d.success ? 'success' : 'error'); if (d.success) loadParticipantDash(); });
}
loadParticipantDash();
`

// 5. PUBLIC REGISTRATION
const registerBody = `
<div class="topbar">
    <div class="topbar-brand"><h1>KonnectFest Registration</h1><span class="role-pill">Public Portal</span></div>
    <a href="/x_2327324_konnect_participant_portal.do" class="btn btn-sm" style="background:rgba(255,255,255,0.18); color:#fff;">Already Verified? Login →</a>
</div>
<div class="container-sm">
    <div id="regAlert" class="alert"></div>
    <div id="regStep1" class="card">
        <div class="card-title">Register for Event &amp; Fund Wallet</div>
        <div class="card-sub">Any working email is accepted. Your participant account &amp; wallet will be activated once Finance verifies your UPI payment.</div>
        <div class="form-group"><label class="form-label">Select Event *</label><select id="rEvent" class="form-select"></select></div>
        <div class="form-group"><label class="form-label">Full Name *</label><input type="text" id="rName" class="form-input" placeholder="e.g. Priya Sharma" /></div>
        <div class="form-group"><label class="form-label">Working Email Address *</label><input type="email" id="rEmail" class="form-input" placeholder="priya@gmail.com" /></div>
        <div class="form-group"><label class="form-label">Phone Number</label><input type="tel" id="rPhone" class="form-input" placeholder="+91 9876543210" /></div>
        <div class="form-group"><label class="form-label">College / Organization</label><input type="text" id="rCollege" class="form-input" placeholder="Institute or Company" /></div>
        <div class="form-group"><label class="form-label">Initial Wallet Amount (INR) *</label><input type="number" id="rAmount" class="form-input" placeholder="Enter amount (e.g. 500)" min="1" step="0.01" /></div>
        <button class="btn btn-primary btn-block" onclick="submitPublicReg()">Proceed to UPI Payment QR →</button>
    </div>
    <div id="regStep2" class="card" style="display:none; text-align:center;">
        <div class="card-title">Complete UPI Payment</div>
        <div class="card-sub">Scan with GPay, PhonePe, or Paytm. Do not modify the amount or payee.</div>
        <div class="qr-box" id="regQrBox"></div>
        <div style="margin:12px 0; font-size:13px;" id="regPayInfo"></div>
        <div style="text-align:left; margin-top:16px; padding-top:16px; border-top:1px solid var(--border);">
            <div class="form-group"><label class="form-label">Enter 12-Digit Bank UTR / Transaction Reference *</label><input type="text" id="rUtr" class="form-input" placeholder="e.g. 432198765432" /></div>
            <button class="btn btn-accent btn-block" onclick="submitPublicUtr()">Submit UTR for Verification</button>
        </div>
    </div>
    <div id="regStep3" class="card" style="display:none; text-align:center;">
        <div style="font-size:40px; margin-bottom:10px;">⏳</div>
        <div class="card-title">Registration Pending Finance Verification</div>
        <div class="card-sub" id="regDoneMsg"></div>
        <a href="/x_2327324_konnect_participant_portal.do" class="btn btn-primary" style="margin-top:10px;">Go to Participant Login</a>
    </div>
</div>`

const registerScript = `
var createdPaymentId = '';
function loadPublicEvents() {
    fetch('/api/x_2327324_konnect/konnectfest/public/events').then(function(r) { return r.json(); }).then(function(res) {
        var d = res.result || res;
        var sel = document.getElementById('rEvent'); sel.innerHTML = '';
        (d.events || []).forEach(function(ev) {
            var opt = document.createElement('option'); opt.value = ev.sys_id; opt.textContent = ev.name + ' (' + ev.state + ')'; sel.appendChild(opt);
        });
        if ((d.events || []).length === 0) sel.innerHTML = '<option value="">No events currently open for registration</option>';
    });
}
function submitPublicReg() {
    var payload = { event_sys_id: document.getElementById('rEvent').value, name: document.getElementById('rName').value.trim(), email: document.getElementById('rEmail').value.trim(), phone: document.getElementById('rPhone').value.trim(), college_organization: document.getElementById('rCollege').value.trim(), requested_amount: parseFloat(document.getElementById('rAmount').value || '0') };
    if (!payload.event_sys_id || !payload.name || !payload.email || payload.requested_amount <= 0) return showBanner('regAlert', 'Please fill event, name, email, and positive amount', 'error');
    fetch('/api/x_2327324_konnect/konnectfest/registration', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function(r) { return r.json(); }).then(function(res) {
            var d = res.result || res;
            if (!d.success) return showBanner('regAlert', d.message, 'error');
            createdPaymentId = d.paymentSysId;
            document.getElementById('regStep1').style.display = 'none';
            document.getElementById('regStep2').style.display = 'block';
            renderQRCode(document.getElementById('regQrBox'), d.upiUri, 5);
            document.getElementById('regPayInfo').innerHTML = '<strong>Pay ' + formatINR(d.amount) + '</strong> to ' + escapeHtml(d.payeeName) + '<br/>UPI ID: <code>' + escapeHtml(d.upiId) + '</code> • Ref: <code>' + escapeHtml(d.paymentNumber) + '</code>';
        });
}
function submitPublicUtr() {
    var utr = document.getElementById('rUtr').value.trim();
    if (!utr) return showBanner('regAlert', 'Please enter your bank UTR reference', 'error');
    fetch('/api/x_2327324_konnect/konnectfest/registration/submit-utr', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ payment_sys_id: createdPaymentId, utr_reference: utr }) })
        .then(function(r) { return r.json(); }).then(function(res) {
            var d = res.result || res;
            if (!d.success) return showBanner('regAlert', d.message, 'error');
            document.getElementById('regStep2').style.display = 'none';
            document.getElementById('regStep3').style.display = 'block';
            document.getElementById('regDoneMsg').textContent = d.message;
        });
}
loadPublicEvents();
`

fs.writeFileSync(path.join(outDir, 'organizer.html'), buildJellyHtml('KonnectFest - Organizer Dashboard', organizerBody, organizerScript, true))
fs.writeFileSync(path.join(outDir, 'finance.html'), buildJellyHtml('KonnectFest - Finance Workspace', financeBody, financeScript, true))
fs.writeFileSync(path.join(outDir, 'vendor.html'), buildJellyHtml('KonnectFest - Vendor Terminal', vendorBody, vendorScript, true))
fs.writeFileSync(path.join(outDir, 'participant.html'), buildJellyHtml('KonnectFest - Participant Wallet Portal', participantBody, participantScript, true))
fs.writeFileSync(path.join(outDir, 'register.html'), buildJellyHtml('KonnectFest - Event Registration', registerBody, registerScript, false))
console.log('Generated all 5 HTML files in src/client/')
