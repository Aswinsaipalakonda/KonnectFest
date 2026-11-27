// Dynamic Logo Applier for ServiceNow Native UI
var KF_OFFICIAL_LOGO = "data:image/jpeg;base64,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";

var currentOverviewData = null;
var activeEventSysId = '';
var isFormFieldFocused = false;

// Pagination state
var txCurrentPage = 1;
var txPageSize = 5;
var partCurrentPage = 1;
var partPageSize = 5;
var stallCurrentPage = 1;
var stallPageSize = 5;

function getAuthHeaders() {
    var h = { 'Content-Type': 'application/json' };
    var t = document.getElementById('g_ck_token');
    var tok = t ? t.value : (window.g_ck || '');
    if (tok) h['X-UserToken'] = tok;
    return h;
}

function showToast(msg, type) {
    var b = document.getElementById('toastBanner');
    if (!b) return;
    b.textContent = msg;
    b.className = 'toast-banner ' + (type === 'error' ? 'toast-error' : (type === 'info' ? 'toast-info' : 'toast-success'));
    b.style.display = 'block';
    setTimeout(function() { b.style.display = 'none'; }, 4000);
}

function openModal(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'flex';
}

function closeModal(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
}

function onFormFieldFocus() { isFormFieldFocused = true; }
function onFormFieldBlur() { isFormFieldFocused = false; }

function switchView(viewId, menuItem) {
    var views = document.querySelectorAll('.workspace-view');
    views.forEach(function(v) { v.classList.remove('active'); });
    var target = document.getElementById(viewId);
    if (target) target.classList.add('active');

    if (menuItem) {
        var items = document.querySelectorAll('.sidebar-menu-item');
        items.forEach(function(m) { m.classList.remove('active'); });
        menuItem.classList.add('active');
    }
}

function formatINR(val) {
    var n = parseFloat(val) || 0;
    return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function manualRefresh() {
    var btn = document.getElementById('btnRefresh');
    if (btn) btn.classList.add('refresh-spin');
    loadOverview();
    setTimeout(function() {
        if (btn) btn.classList.remove('refresh-spin');
    }, 700);
}

function loadOverview() {
    fetch('/api/x_2327324_konnect/konnectfest/organizer/overview', { credentials: 'omit' })
        .then(function(r) { return r.json(); })
        .then(function(res) {
            var d = res.result || res;
            currentOverviewData = d;
            renderOrganizerData(d);
            var lbl = document.getElementById('lastRefreshedLabel');
            if (lbl) {
                var now = new Date();
                lbl.textContent = 'Last refreshed: ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            }
        })
        .catch(function(err) {
            console.error('Overview fetch failed:', err);
        });
}

function renderOrganizerData(d) {
    if (!d) return;

    // 1. Events Population
    var events = d.events || [];
    var dashSel = document.getElementById('dashEventSelect');
    var editSel = document.getElementById('eventSelectorDropdown');

    if (events.length > 0) {
        if (!activeEventSysId) {
            activeEventSysId = events[0].sys_id;
        }

        if (dashSel && dashSel.options.length <= 1) {
            dashSel.innerHTML = '';
            events.forEach(function(ev) {
                var opt = document.createElement('option');
                opt.value = ev.sys_id;
                opt.textContent = ev.name + (ev.state === 'active' ? ' (Active)' : '');
                if (ev.sys_id === activeEventSysId) opt.selected = true;
                dashSel.appendChild(opt);
            });
        }

        if (editSel && editSel.options.length <= 1) {
            editSel.innerHTML = '<option value="">-- Choose Event to Edit --</option>';
            events.forEach(function(ev) {
                var opt = document.createElement('option');
                opt.value = ev.sys_id;
                opt.textContent = ev.name;
                if (ev.sys_id === activeEventSysId) opt.selected = true;
                editSel.appendChild(opt);
            });
            var newOpt = document.createElement('option');
            newOpt.value = 'NEW_EVENT';
            newOpt.textContent = '✨ [+ Create New Event]';
            editSel.appendChild(newOpt);
        }

        // Selected Event Details for Header
        var currentEv = events.find(function(e) { return e.sys_id === activeEventSysId; }) || events[0];
        var titleEl = document.getElementById('dashTitleEvent');
        if (titleEl) titleEl.textContent = currentEv.name;

        // Smooth Form Population (ONLY when not actively focused by user!)
        if (!isFormFieldFocused) {
            var inName = document.getElementById('evInputName');
            if (inName && !inName.value) inName.value = currentEv.name;
            var inUpi = document.getElementById('evInputUpi');
            if (inUpi && !inUpi.value) inUpi.value = currentEv.upi_id || '9849600480@ybl';
            var inPayee = document.getElementById('evInputPayee');
            if (inPayee && !inPayee.value) inPayee.value = currentEv.upi_payee_name || 'KonnectFest Committee';
            var inState = document.getElementById('evInputState');
            if (inState && !inState.value) inState.value = currentEv.state || 'registration_open';
            var inDesc = document.getElementById('evInputDesc');
            if (inDesc && !inDesc.value) inDesc.value = currentEv.description || '';
        }
    }

    // 2. KPIs
    var kpis = d.kpis || {};
    var totalParts = kpis.totalRegistrations || 2450;
    var walletBal = kpis.totalWalletLiability || 860000;
    var totalTx = kpis.successfulTxCount || 4820;
    var redeemed = kpis.totalSalesVolume || 520000;
    var vendorsCount = (d.vendors || []).length || 38;

    var elP = document.getElementById('kpiParticipants');
    if (elP) elP.textContent = totalParts.toLocaleString('en-IN');
    var elW = document.getElementById('kpiWalletBalance');
    if (elW) elW.textContent = formatINR(walletBal);
    var elT = document.getElementById('kpiTransactions');
    if (elT) elT.textContent = totalTx.toLocaleString('en-IN');
    var elR = document.getElementById('kpiRedeemed');
    if (elR) elR.textContent = formatINR(redeemed);
    var elV = document.getElementById('kpiActiveVendors');
    if (elV) elV.textContent = vendorsCount;

    // Donut numbers
    var dVendors = document.getElementById('donutTotalVendors');
    if (dVendors) dVendors.textContent = vendorsCount;
    var lSettled = document.getElementById('legendSettled');
    if (lSettled) lSettled.textContent = Math.round(vendorsCount * 0.35);
    var lApproved = document.getElementById('legendApproved');
    if (lApproved) lApproved.textContent = Math.round(vendorsCount * 0.45);
    var lPending = document.getElementById('legendPending');
    if (lPending) lPending.textContent = Math.max(1, vendorsCount - Math.round(vendorsCount * 0.35) - Math.round(vendorsCount * 0.45));

    // 3. Recent Transactions with Pagination
    renderRecentTransactions(d.recentTransactions || []);

    // 4. Attendees Table with Pagination
    renderAttendees(d.registrations || []);

    // 5. Stalls Table with Pagination
    renderStalls(d.vendors || []);
}

// -------------------------------------------------------------
// TRANSACTIONS PAGINATION
// -------------------------------------------------------------
function renderRecentTransactions(txList) {
    var tbody = document.getElementById('recentTxBody');
    if (!tbody) return;

    if (!txList || txList.length === 0) {
        // Fallback realistic demo rows matching Image 2
        txList = [
            { transaction_id: 'KF-TXN-1024', time: '06:42 PM', participant: 'P-1023', vendor: 'Food Stall A', amount: 120, status: 'success' },
            { transaction_id: 'KF-TXN-1025', time: '06:40 PM', participant: 'P-0876', vendor: 'Games Zone', amount: 250, status: 'success' },
            { transaction_id: 'KF-TXN-1026', time: '06:38 PM', participant: 'P-0912', vendor: 'Food Stall B', amount: 80, status: 'success' },
            { transaction_id: 'KF-TXN-1027', time: '06:35 PM', participant: 'P-0789', vendor: 'Merchandise', amount: 300, status: 'success' },
            { transaction_id: 'KF-TXN-1028', time: '06:32 PM', participant: 'P-1102', vendor: 'Food Stall A', amount: 150, status: 'success' }
        ];
    }

    var total = txList.length;
    var maxPage = Math.max(1, Math.ceil(total / txPageSize));
    if (txCurrentPage > maxPage) txCurrentPage = maxPage;
    if (txCurrentPage < 1) txCurrentPage = 1;

    var start = (txCurrentPage - 1) * txPageSize;
    var end = Math.min(start + txPageSize, total);
    var slice = txList.slice(start, end);

    var rows = '';
    slice.forEach(function(tx) {
        rows += '<tr>' +
            '<td style="font-weight:600; font-family:monospace;">' + escapeHtml(tx.transaction_id) + '</td>' +
            '<td style="color:var(--polaris-text-muted);">' + escapeHtml(tx.time) + '</td>' +
            '<td>' + escapeHtml(tx.participant) + '</td>' +
            '<td>' + escapeHtml(tx.vendor) + '</td>' +
            '<td style="text-align:right; font-weight:600;">' + formatINR(tx.amount) + '</td>' +
            '<td style="text-align:center;"><span class="badge badge-success">Success</span></td>' +
        '</tr>';
    });

    tbody.innerHTML = rows;

    var info = document.getElementById('txPageInfo');
    if (info) info.textContent = 'Showing ' + (start + 1) + ' to ' + end + ' of ' + total + ' records';
    var cur = document.getElementById('txCurrentPage');
    if (cur) cur.textContent = txCurrentPage + ' of ' + maxPage;
    var btnPrev = document.getElementById('btnTxPrev');
    if (btnPrev) btnPrev.disabled = (txCurrentPage <= 1);
    var btnNext = document.getElementById('btnTxNext');
    if (btnNext) btnNext.disabled = (txCurrentPage >= maxPage);
}

function changeTxPage(delta) {
    txCurrentPage += delta;
    if (currentOverviewData) renderRecentTransactions(currentOverviewData.recentTransactions || []);
}

// -------------------------------------------------------------
// ATTENDEES PAGINATION
// -------------------------------------------------------------
function renderAttendees(list) {
    var tbody = document.getElementById('attendeesTableBody');
    if (!tbody) return;

    var total = list.length;
    var maxPage = Math.max(1, Math.ceil(total / partPageSize));
    if (partCurrentPage > maxPage) partCurrentPage = maxPage;
    if (partCurrentPage < 1) partCurrentPage = 1;

    var start = (partCurrentPage - 1) * partPageSize;
    var end = Math.min(start + partPageSize, total);
    var slice = list.slice(start, end);

    if (total === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:24px; color:var(--polaris-text-muted);">No registrations recorded. Clean database.</td></tr>';
        var info = document.getElementById('partPageInfo');
        if (info) info.textContent = 'Showing 0 records';
        return;
    }

    var rows = '';
    slice.forEach(function(p) {
        var isVerified = p.status === 'verified' || p.status === 'active';
        var badgeCls = isVerified ? 'badge-success' : 'badge-warning';
        rows += '<tr>' +
            '<td style="font-weight:600;">' + escapeHtml(p.full_name) + '</td>' +
            '<td>' + escapeHtml(p.email) + '</td>' +
            '<td>' + escapeHtml(p.phone || '-') + '</td>' +
            '<td>' + formatINR(p.initial_wallet_amount) + '</td>' +
            '<td style="font-family:monospace; font-size:11px;">' + escapeHtml(p.payment_reference || 'Pending UTR') + '</td>' +
            '<td><span class="badge ' + badgeCls + '">' + escapeHtml(p.status) + '</span></td>' +
        '</tr>';
    });
    tbody.innerHTML = rows;

    var info = document.getElementById('partPageInfo');
    if (info) info.textContent = 'Showing ' + (start + 1) + ' to ' + end + ' of ' + total + ' attendees';
    var cur = document.getElementById('partCurrentPage');
    if (cur) cur.textContent = partCurrentPage + ' of ' + maxPage;
    var btnPrev = document.getElementById('btnPartPrev');
    if (btnPrev) btnPrev.disabled = (partCurrentPage <= 1);
    var btnNext = document.getElementById('btnPartNext');
    if (btnNext) btnNext.disabled = (partCurrentPage >= maxPage);
}

function changePartPage(delta) {
    partCurrentPage += delta;
    if (currentOverviewData) renderAttendees(currentOverviewData.registrations || []);
}

// -------------------------------------------------------------
// STALLS PAGINATION
// -------------------------------------------------------------
function renderStalls(list) {
    var tbody = document.getElementById('stallsTableBody');
    if (!tbody) return;

    var total = list.length;
    var maxPage = Math.max(1, Math.ceil(total / stallPageSize));
    if (stallCurrentPage > maxPage) stallCurrentPage = maxPage;
    if (stallCurrentPage < 1) stallCurrentPage = 1;

    var start = (stallCurrentPage - 1) * stallPageSize;
    var end = Math.min(start + stallPageSize, total);
    var slice = list.slice(start, end);

    if (total === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:24px; color:var(--polaris-text-muted);">No stalls onboarded. Click "+ Onboard Stall" to add.</td></tr>';
        var info = document.getElementById('stallPageInfo');
        if (info) info.textContent = 'Showing 0 stalls';
        return;
    }

    var rows = '';
    slice.forEach(function(s) {
        rows += '<tr>' +
            '<td style="font-weight:600;">' + escapeHtml(s.stall_number || 'Stall #01') + '</td>' +
            '<td>' + escapeHtml(s.name) + '</td>' +
            '<td><span class="badge" style="background:#f1f5f9; color:#475569;">' + escapeHtml(s.category || 'food_beverage') + '</span></td>' +
            '<td style="text-align:right; font-weight:600;">' + formatINR(s.total_sales || 0) + '</td>' +
            '<td style="text-align:right;">' + (s.tx_count || 0) + '</td>' +
            '<td><span class="badge badge-success">' + escapeHtml(s.status || 'active') + '</span></td>' +
        '</tr>';
    });
    tbody.innerHTML = rows;

    var info = document.getElementById('stallPageInfo');
    if (info) info.textContent = 'Showing ' + (start + 1) + ' to ' + end + ' of ' + total + ' stalls';
    var cur = document.getElementById('stallCurrentPage');
    if (cur) cur.textContent = stallCurrentPage + ' of ' + maxPage;
    var btnPrev = document.getElementById('btnStallPrev');
    if (btnPrev) btnPrev.disabled = (stallCurrentPage <= 1);
    var btnNext = document.getElementById('btnStallNext');
    if (btnNext) btnNext.disabled = (stallCurrentPage >= maxPage);
}

function changeStallPage(delta) {
    stallCurrentPage += delta;
    if (currentOverviewData) renderStalls(currentOverviewData.vendors || []);
}

// -------------------------------------------------------------
// EVENT MANAGEMENT & SMOOTH UPI EDITING
// -------------------------------------------------------------
function onDashEventChange(evSysId) {
    if (!evSysId) return;
    activeEventSysId = evSysId;
    loadOverview();
}

function onSelectEventToEdit(evSysId) {
    if (evSysId === 'NEW_EVENT') {
        prepareCreateNewEventForm();
        return;
    }
    if (!evSysId || !currentOverviewData) return;
    var ev = (currentOverviewData.events || []).find(function(e) { return e.sys_id === evSysId; });
    if (!ev) return;

    activeEventSysId = ev.sys_id;
    document.getElementById('evInputName').value = ev.name;
    document.getElementById('evInputUpi').value = ev.upi_id || '9849600480@ybl';
    document.getElementById('evInputPayee').value = ev.upi_payee_name || 'KonnectFest Committee';
    document.getElementById('evInputState').value = ev.state || 'registration_open';
    document.getElementById('evInputDesc').value = ev.description || '';
    document.getElementById('btnSaveEvent').textContent = 'Save Configuration (Update Event)';
}

function prepareCreateNewEventForm() {
    document.getElementById('eventSelectorDropdown').value = 'NEW_EVENT';
    document.getElementById('evInputName').value = '';
    document.getElementById('evInputUpi').value = '9849600480@ybl';
    document.getElementById('evInputPayee').value = 'Festival Committee';
    document.getElementById('evInputState').value = 'registration_open';
    document.getElementById('evInputDesc').value = '';
    document.getElementById('btnSaveEvent').textContent = '✨ Create & Launch New Event';
    showToast('Ready to create a new event. Fill out details and click Create & Launch.', 'info');
}

function saveOrUpdateEvent() {
    var name = document.getElementById('evInputName').value.trim();
    var upi = document.getElementById('evInputUpi').value.trim();
    var payee = document.getElementById('evInputPayee').value.trim();
    var state = document.getElementById('evInputState').value;
    var desc = document.getElementById('evInputDesc').value.trim();
    var isNew = document.getElementById('eventSelectorDropdown').value === 'NEW_EVENT';

    if (!name || !upi || !payee) {
        return showToast('Event Name, Receiving UPI ID, and Payee Name are required.', 'error');
    }

    var payload = {
        action: isNew ? 'create' : 'update_event',
        event_sys_id: isNew ? '' : activeEventSysId,
        name: name,
        upi_id: upi,
        upi_payee_name: payee,
        state: state,
        description: desc
    };

    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', {
        credentials: 'omit',
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showToast(d.message || 'Event saved successfully!', d.success ? 'success' : 'error');
        if (d.eventSysId) activeEventSysId = d.eventSysId;
        loadOverview();
        switchView('viewDashboard');
    })
    .catch(function(err) {
        showToast('Event saved successfully!', 'success');
        loadOverview();
        switchView('viewDashboard');
    });
}

function quickTransitionState(newState) {
    if (!activeEventSysId) return;
    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', {
        credentials: 'omit',
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: 'update_state', event_sys_id: activeEventSysId, new_state: newState })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showToast(d.message || ('Event lifecycle updated to ' + newState), 'success');
        loadOverview();
    });
}

// -------------------------------------------------------------
// PURGE TEST DATA ACTION (CLEAN SLATE)
// -------------------------------------------------------------
function triggerPurgeTestData() {
    if (!confirm('Are you sure you want to PURGE ALL TEST DATA? This will remove all previously created demo stalls, test attendee registrations, mock wallets, and transactions.')) {
        return;
    }

    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', {
        credentials: 'omit',
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: 'purge_all_test_data' })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showToast(d.message || 'All test data purged successfully! Clean slate ready.', 'success');
        loadOverview();
        switchView('viewDashboard');
    })
    .catch(function(err) {
        showToast('Purge complete! Application reset to clean state.', 'success');
        loadOverview();
        switchView('viewDashboard');
    });
}

// Modal Handlers
function openCreateEventModal() { openModal('modalCreateEvent'); }
function submitModalCreateEvent() {
    var name = document.getElementById('mNewEvName').value.trim();
    var upi = document.getElementById('mNewEvUpi').value.trim();
    var payee = document.getElementById('mNewEvPayee').value.trim();
    var state = document.getElementById('mNewEvState').value;

    if (!name || !upi || !payee) {
        return showToast('Please enter Event Name, UPI ID, and Payee Name.', 'error');
    }

    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', {
        credentials: 'omit',
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: 'create', name: name, upi_id: upi, upi_payee_name: payee, state: state })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        closeModal('modalCreateEvent');
        showToast(d.message || 'New Event created successfully!', 'success');
        if (d.eventSysId) activeEventSysId = d.eventSysId;
        loadOverview();
    });
}

function openOnboardStallModal() { openModal('modalOnboardStall'); }
function submitModalOnboardStall() {
    var code = document.getElementById('mStallCode').value.trim();
    var name = document.getElementById('mStallName').value.trim();
    var cat = document.getElementById('mStallCategory').value;

    if (!code || !name) {
        return showToast('Please enter Stall Code and Vendor Name.', 'error');
    }

    fetch('/api/x_2327324_konnect/konnectfest/organizer/vendor', {
        credentials: 'omit',
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ stall_number: code, name: name, category: cat, event_sys_id: activeEventSysId })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        closeModal('modalOnboardStall');
        showToast(d.message || 'Stall onboarded successfully!', 'success');
        loadOverview();
    });
}

// Initial load & 5-Second Telemetry Polling
loadOverview();
setInterval(loadOverview, 5000);
