const fs = require('fs');

console.log('Building enhanced client scripts for Organizer and Finance...');

// 1. ORGANIZER CLIENT SCRIPT
const organizerScript = `
var currentOverviewData = null;
var activeEventSysId = '';
var isFormFieldFocused = false;
var recentTxPage = 1;
var recentTxPageSize = 5;
var allTxList = [];
var filteredTxList = [];
var partList = [];
var vendorList = [];

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
        var items = document.querySelectorAll('.nav-item');
        items.forEach(function(m) { m.classList.remove('active'); });
        menuItem.classList.add('active');
    }
}

function formatINR(val) {
    var n = parseFloat(val) || 0;
    return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function manualRefresh() {
    loadOverview();
    showToast('Telemetry refreshed.', 'info');
}

function loadOverview() {
    fetch('/api/x_2327324_konnect/konnectfest/organizer/overview', { credentials: 'omit' })
        .then(function(r) { return r.json(); })
        .then(function(res) {
            var d = res.result || res;
            currentOverviewData = d;
            renderOrganizerData(d);
            var now = new Date();
            var timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            var syncEl = document.getElementById('headerSyncTime');
            if (syncEl) syncEl.textContent = timeStr;
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
    var editSel = document.getElementById('editEventSelector');

    if (events.length > 0) {
        if (!activeEventSysId) {
            // Find active or take first
            var act = events.find(function(e) { return e.state === 'active' || e.state === 'registration_open'; });
            activeEventSysId = act ? act.sys_id : events[0].sys_id;
        }

        if (dashSel) {
            var prevVal = dashSel.value;
            dashSel.innerHTML = '';
            events.forEach(function(ev) {
                var opt = document.createElement('option');
                opt.value = ev.sys_id;
                opt.textContent = ev.name + (ev.state === 'active' ? ' (Active)' : (ev.state === 'registration_open' ? ' (Open)' : ''));
                if (ev.sys_id === activeEventSysId) opt.selected = true;
                dashSel.appendChild(opt);
            });
        }

        if (editSel) {
            var prevEditVal = editSel.value;
            editSel.innerHTML = '<option value="">-- Choose Event to Edit --</option>';
            events.forEach(function(ev) {
                var opt = document.createElement('option');
                opt.value = ev.sys_id;
                opt.textContent = ev.name;
                if (ev.sys_id === activeEventSysId) opt.selected = true;
                editSel.appendChild(opt);
            });
        }

        // Active Event Details for Header & Edit Form
        var currentEv = events.find(function(e) { return e.sys_id === activeEventSysId; }) || events[0];
        var heroTitle = document.getElementById('heroEventTitle');
        if (heroTitle) heroTitle.textContent = currentEv.name;

        if (!isFormFieldFocused) {
            var inName = document.getElementById('fEvName');
            if (inName) inName.value = currentEv.name || '';
            var inFee = document.getElementById('fEvFee');
            if (inFee) inFee.value = currentEv.registration_fee !== undefined ? currentEv.registration_fee : 300;
            var inUpi = document.getElementById('fEvUpi');
            if (inUpi) inUpi.value = currentEv.upi_id || '';
            var inPayee = document.getElementById('fEvPayee');
            if (inPayee) inPayee.value = currentEv.upi_payee_name || '';
            var inState = document.getElementById('fEvState');
            if (inState) inState.value = currentEv.state || 'registration_open';
            var inDesc = document.getElementById('fEvDesc');
            if (inDesc) inDesc.value = currentEv.description || '';
        }
    }

    // 2. Dynamic Real KPIs (NO FALSY HARDCODED NUMBERS!)
    var kpis = d.kpis || {};
    var totalParts = (kpis.totalRegistrations !== undefined && kpis.totalRegistrations !== null) ? kpis.totalRegistrations : 0;
    var walletBal = (kpis.totalWalletLiability !== undefined && kpis.totalWalletLiability !== null) ? kpis.totalWalletLiability : 0;
    var totalTx = (kpis.successfulTxCount !== undefined && kpis.successfulTxCount !== null) ? kpis.successfulTxCount : 0;
    var redeemed = (kpis.totalSalesVolume !== undefined && kpis.totalSalesVolume !== null) ? kpis.totalSalesVolume : 0;
    var vendorsCount = (d.vendors || []).length;

    var elP = document.getElementById('kpiParticipants');
    if (elP) elP.textContent = totalParts.toLocaleString('en-IN');
    var elPSub = document.getElementById('kpiParticipantsSub');
    if (elPSub) elPSub.textContent = (kpis.verifiedParticipants || 0) + ' verified, ' + (kpis.pendingRegistrations || 0) + ' pending';

    var elW = document.getElementById('kpiWalletBalance');
    if (elW) elW.textContent = formatINR(walletBal);

    var elT = document.getElementById('kpiTransactions');
    if (elT) elT.textContent = totalTx.toLocaleString('en-IN');

    var elR = document.getElementById('kpiRedeemed');
    if (elR) elR.textContent = formatINR(redeemed);

    var elV = document.getElementById('kpiActiveVendors');
    if (elV) elV.textContent = vendorsCount.toLocaleString('en-IN');

    // 3. Dynamic Vendors List in Dashboard
    renderDashboardVendors(d.vendors || []);

    // 4. Dynamic Donut Settlement Breakdown
    var settledCount = kpis.settledCount || 0;
    var approvedCount = kpis.approvedCount || 0;
    var pendingCount = kpis.pendingSettlementCount || 0;
    var donutTotal = document.getElementById('donutTotalVendors');
    if (donutTotal) donutTotal.textContent = vendorsCount;
    var sS = document.getElementById('statSettledCount');
    if (sS) sS.textContent = settledCount;
    var sA = document.getElementById('statApprovedCount');
    if (sA) sA.textContent = approvedCount;
    var sP = document.getElementById('statPendingCount');
    if (sP) sP.textContent = pendingCount;

    // 5. Recent Transactions
    allTxList = d.recentTransactions || [];
    filteredTxList = allTxList.slice();
    renderRecentTransactions();

    // 6. Participants View
    partList = d.registrations || [];
    renderParticipantsTable(partList);

    // 7. Vendors View
    vendorList = d.vendors || [];
    renderVendorsTable(vendorList);

    // 8. Wallets View
    renderWalletsTable(d.wallets || []);

    // 9. Settlements View
    renderSettlementsTable(d.settlements || []);

    // 10. Audit Log View
    renderAuditTable(d.auditLogs || []);
}

function renderDashboardVendors(vendors) {
    var box = document.getElementById('dashVendorList');
    if (!box) return;

    if (!vendors || vendors.length === 0) {
        box.innerHTML = '<div style="font-size:12px; color:#94a3b8; text-align:center; padding:16px 0;">No active stalls onboarded yet. Click <strong>+ Onboard Stall</strong> above.</div>';
        return;
    }

    var html = '';
    var maxVol = 1;
    vendors.forEach(function(v) {
        var vol = parseFloat(v.total_sales || 0);
        if (vol > maxVol) maxVol = vol;
    });

    vendors.slice(0, 5).forEach(function(v) {
        var vol = parseFloat(v.total_sales || 0);
        var pct = Math.max(8, Math.round((vol / maxVol) * 100));
        var tx = v.transaction_count || 0;
        html += '<div style="margin-bottom:8px;">' +
            '<div class="vendor-redempt-row">' +
                '<strong>' + escapeHtml(v.business_name || ('Stall ' + v.stall_number)) + '</strong>' +
                '<span>' + tx + ' tx • ' + formatINR(vol) + '</span>' +
            '</div>' +
            '<div class="vendor-progress-bar">' +
                '<div class="vendor-progress-fill" style="width:' + pct + '%;"></div>' +
            '</div>' +
        '</div>';
    });
    box.innerHTML = html;
}

function renderRecentTransactions() {
    var tbody = document.getElementById('txTableBody');
    var allTbody = document.getElementById('allTxTableBody');
    if (!tbody && !allTbody) return;

    var start = (recentTxPage - 1) * recentTxPageSize;
    var end = start + recentTxPageSize;
    var pageItems = filteredTxList.slice(start, end);

    var info = document.getElementById('txPaginationInfo');
    if (info) {
        info.textContent = 'Showing ' + (filteredTxList.length === 0 ? 0 : start + 1) + '-' + Math.min(end, filteredTxList.length) + ' of ' + filteredTxList.length;
    }

    if (pageItems.length === 0) {
        var emptyRow = '<tr><td colspan="6" style="text-align:center; color:#94a3b8; padding:20px;">No purchase transactions recorded yet.</td></tr>';
        if (tbody) tbody.innerHTML = emptyRow;
        if (allTbody) allTbody.innerHTML = emptyRow;
        return;
    }

    var html = '';
    pageItems.forEach(function(tx) {
        var amt = parseFloat(tx.amount || 0);
        html += '<tr>' +
            '<td><strong>' + escapeHtml(tx.tx_id || 'KF-TXN') + '</strong></td>' +
            '<td style="color:#64748b; font-size:12px;">' + escapeHtml(tx.time || '-') + '</td>' +
            '<td>' + escapeHtml(tx.participant || 'Participant') + '</td>' +
            '<td>' + escapeHtml(tx.vendor || 'Vendor Stall') + '</td>' +
            '<td><strong style="color:#0f172a;">' + formatINR(amt) + '</strong></td>' +
            '<td><span class="badge-status status-active">Completed</span></td>' +
        '</tr>';
    });

    if (tbody) tbody.innerHTML = html;
    if (allTbody) allTbody.innerHTML = html;
}

function changeTxPage(delta) {
    var maxPage = Math.ceil(filteredTxList.length / recentTxPageSize) || 1;
    var target = recentTxPage + delta;
    if (target >= 1 && target <= maxPage) {
        recentTxPage = target;
        renderRecentTransactions();
    }
}

function filterRecentTx(query) {
    query = (query || '').toLowerCase().trim();
    if (!query) {
        filteredTxList = allTxList.slice();
    } else {
        filteredTxList = allTxList.filter(function(tx) {
            return (tx.tx_id || '').toLowerCase().includes(query) ||
                   (tx.participant || '').toLowerCase().includes(query) ||
                   (tx.vendor || '').toLowerCase().includes(query);
        });
    }
    recentTxPage = 1;
    renderRecentTransactions();
}

function filterAllTx(q) { filterRecentTx(q); }

function renderParticipantsTable(list) {
    var tbody = document.getElementById('partTableBody');
    if (!tbody) return;

    if (!list || list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#94a3b8; padding:20px;">No registered participants yet.</td></tr>';
        return;
    }

    var html = '';
    list.forEach(function(p) {
        var stClass = p.status === 'verified' || p.status === 'active' ? 'status-active' : 'status-pending';
        var stLabel = p.status === 'verified' || p.status === 'active' ? 'Verified & Active' : 'Fee Pending';
        html += '<tr>' +
            '<td><strong>' + escapeHtml(p.full_name) + '</strong></td>' +
            '<td style="color:#0284c7;">' + escapeHtml(p.email) + '</td>' +
            '<td>' + escapeHtml(p.phone || '-') + '</td>' +
            '<td>' + escapeHtml(p.event || '-') + '</td>' +
            '<td><strong>₹' + (p.initial_wallet_amount || 300) + '</strong></td>' +
            '<td><span class="badge-status ' + stClass + '">' + stLabel + '</span></td>' +
            '<td><code>' + escapeHtml(p.access_password || '123456') + '</code></td>' +
        '</tr>';
    });
    tbody.innerHTML = html;
}

function filterParticipants(q) {
    q = (q || '').toLowerCase().trim();
    if (!q) return renderParticipantsTable(partList);
    var filtered = partList.filter(function(p) {
        return (p.full_name || '').toLowerCase().includes(q) ||
               (p.email || '').toLowerCase().includes(q) ||
               (p.phone || '').toLowerCase().includes(q);
    });
    renderParticipantsTable(filtered);
}

function renderVendorsTable(list) {
    var tbody = document.getElementById('vendorTableBody');
    if (!tbody) return;

    if (!list || list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#94a3b8; padding:20px;">No stalls onboarded. Click <strong>+ Onboard New Stall</strong> to add one.</td></tr>';
        return;
    }

    var html = '';
    list.forEach(function(v) {
        html += '<tr>' +
            '<td><strong>' + escapeHtml(v.stall_number || '-') + '</strong></td>' +
            '<td>' + escapeHtml(v.business_name || '-') + '</td>' +
            '<td><span class="badge-status status-active">' + escapeHtml(v.category || 'F&B') + '</span></td>' +
            '<td>' + escapeHtml(v.contact_person || '-') + ' (' + escapeHtml(v.contact_phone || '-') + ')</td>' +
            '<td><strong>' + formatINR(v.total_sales || 0) + '</strong></td>' +
            '<td><span style="color:#ea580c; font-weight:600;">' + formatINR(v.unsettled_balance || 0) + '</span></td>' +
            '<td><span class="badge-status status-active">Operational</span></td>' +
        '</tr>';
    });
    tbody.innerHTML = html;
}

function filterVendors(q) {
    q = (q || '').toLowerCase().trim();
    if (!q) return renderVendorsTable(vendorList);
    var filtered = vendorList.filter(function(v) {
        return (v.business_name || '').toLowerCase().includes(q) ||
               (v.stall_number || '').toLowerCase().includes(q) ||
               (v.category || '').toLowerCase().includes(q);
    });
    renderVendorsTable(filtered);
}

function renderWalletsTable(list) {
    var tbody = document.getElementById('walletTableBody');
    if (!tbody) return;

    if (!list || list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#94a3b8; padding:20px;">No wallets allocated yet.</td></tr>';
        return;
    }

    var html = '';
    list.forEach(function(w) {
        html += '<tr>' +
            '<td><strong>' + escapeHtml(w.wallet_id || 'WLT') + '</strong></td>' +
            '<td>' + escapeHtml(w.participant || '-') + '</td>' +
            '<td><strong style="color:#16a34a;">' + formatINR(w.available_balance || 0) + '</strong></td>' +
            '<td>' + formatINR(w.reserved_balance || 0) + '</td>' +
            '<td><span class="badge-status status-active">' + escapeHtml(w.status || 'Active') + '</span></td>' +
        '</tr>';
    });
    tbody.innerHTML = html;
}

function renderSettlementsTable(list) {
    var tbody = document.getElementById('settlementTableBody');
    if (!tbody) return;

    if (!list || list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:#94a3b8; padding:20px;">No settlement requests logged yet.</td></tr>';
        return;
    }

    var html = '';
    list.forEach(function(s) {
        html += '<tr>' +
            '<td><strong>' + escapeHtml(s.settlement_id || 'SETTLE') + '</strong></td>' +
            '<td>' + escapeHtml(s.vendor || '-') + '</td>' +
            '<td><strong>' + formatINR(s.amount || 0) + '</strong></td>' +
            '<td><code>' + escapeHtml(s.bank_ref || '-') + '</code></td>' +
            '<td style="color:#64748b;">' + escapeHtml(s.created_on || '-') + '</td>' +
            '<td><span class="badge-status status-active">' + escapeHtml(s.status || 'Settled') + '</span></td>' +
        '</tr>';
    });
    tbody.innerHTML = html;
}

function renderAuditTable(list) {
    var tbody = document.getElementById('auditTableBody');
    if (!tbody) return;

    if (!list || list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:#94a3b8; padding:20px;">No audit logs recorded yet.</td></tr>';
        return;
    }

    var html = '';
    list.slice(0, 20).forEach(function(a) {
        html += '<tr>' +
            '<td><strong>' + escapeHtml(a.action) + '</strong></td>' +
            '<td>' + escapeHtml(a.target || '-') + '</td>' +
            '<td><code>' + escapeHtml(a.previous_status || '-') + '</code></td>' +
            '<td><code>' + escapeHtml(a.new_status || '-') + '</code></td>' +
            '<td style="color:#64748b;">' + escapeHtml(a.timestamp || '-') + '</td>' +
            '<td style="font-size:12px;">' + escapeHtml(a.reason || '-') + '</td>' +
        '</tr>';
    });
    tbody.innerHTML = html;
}

function onDashEventChange(val) {
    if (val) {
        activeEventSysId = val;
        loadOverview();
    }
}

function onSelectEventToEdit(val) {
    if (!val) return;
    activeEventSysId = val;
    var events = (currentOverviewData && currentOverviewData.events) || [];
    var ev = events.find(function(e) { return e.sys_id === val; });
    if (ev) {
        document.getElementById('fEvName').value = ev.name || '';
        document.getElementById('fEvFee').value = ev.registration_fee !== undefined ? ev.registration_fee : 300;
        document.getElementById('fEvUpi').value = ev.upi_id || '';
        document.getElementById('fEvPayee').value = ev.upi_payee_name || '';
        document.getElementById('fEvState').value = ev.state || 'registration_open';
        document.getElementById('fEvDesc').value = ev.description || '';
    }
}

function submitUpdateEventForm() {
    var name = (document.getElementById('fEvName').value || '').trim();
    var fee = parseFloat(document.getElementById('fEvFee').value) || 300;
    var upi = (document.getElementById('fEvUpi').value || '').trim();
    var payee = (document.getElementById('fEvPayee').value || '').trim();
    var state = document.getElementById('fEvState').value;
    var desc = (document.getElementById('fEvDesc').value || '').trim();

    if (!name || !upi || !payee) {
        return showToast('Event Name, Registration Fee, Receiving UPI ID, and Payee Name are required.', 'error');
    }

    var payload = {
        action: 'update_event',
        event_sys_id: activeEventSysId,
        name: name,
        registration_fee: fee,
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
        showToast(d.message || 'Event parameters updated successfully!', d.success ? 'success' : 'error');
        loadOverview();
        switchView('viewDashboard');
    })
    .catch(function(err) {
        showToast('Event update failed: ' + err.message, 'error');
    });
}

function quickTransitionState(st) {
    if (!activeEventSysId) return showToast('Please select an event first.', 'error');
    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', {
        credentials: 'omit',
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
            action: 'update_event',
            event_sys_id: activeEventSysId,
            state: st
        })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showToast('Event state transitioned to: ' + st, 'success');
        loadOverview();
    })
    .catch(function(err) {
        showToast('Transition error: ' + err.message, 'error');
    });
}

function openCreateEventModal() {
    // Reset all inputs to clean empty state!
    document.getElementById('mEvName').value = '';
    document.getElementById('mEvFee').value = '300';
    document.getElementById('mEvUpi').value = '';
    document.getElementById('mEvPayee').value = '';
    document.getElementById('mEvDesc').value = '';
    document.getElementById('mEvState').value = 'registration_open';
    openModal('modalCreateEvent');
}

function submitModalCreateEvent() {
    var name = (document.getElementById('mEvName').value || '').trim();
    var fee = parseFloat(document.getElementById('mEvFee').value) || 300;
    var upi = (document.getElementById('mEvUpi').value || '').trim();
    var payee = (document.getElementById('mEvPayee').value || '').trim();
    var state = document.getElementById('mEvState').value;
    var desc = (document.getElementById('mEvDesc').value || '').trim();

    if (!name || !upi || !payee) {
        return showToast('Please enter Event Name, Receiving UPI ID, and Payee Name.', 'error');
    }

    var payload = {
        action: 'create',
        name: name,
        registration_fee: fee,
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
        if (!d.success) return showToast(d.message || 'Creation failed', 'error');
        closeModal('modalCreateEvent');
        showToast('Event "' + name + '" created successfully!', 'success');
        if (d.eventSysId) activeEventSysId = d.eventSysId;
        loadOverview();
    })
    .catch(function(err) {
        showToast('Error creating event: ' + err.message, 'error');
    });
}

function openOnboardStallModal() {
    document.getElementById('mStallBrand').value = '';
    document.getElementById('mStallNumber').value = 'Stall #' + (((currentOverviewData && currentOverviewData.vendors) || []).length + 1);
    document.getElementById('mStallContact').value = '';
    document.getElementById('mStallPhone').value = '';
    document.getElementById('mStallUpi').value = '';
    openModal('modalOnboardStall');
}

function submitModalOnboardStall() {
    var brand = (document.getElementById('mStallBrand').value || '').trim();
    var stallNo = (document.getElementById('mStallNumber').value || '').trim();
    var cat = document.getElementById('mStallCategory').value;
    var contact = (document.getElementById('mStallContact').value || '').trim();
    var phone = (document.getElementById('mStallPhone').value || '').trim();
    var upi = (document.getElementById('mStallUpi').value || '').trim();

    if (!brand || !stallNo) {
        return showToast('Brand Name and Stall Number are required.', 'error');
    }

    fetch('/api/x_2327324_konnect/konnectfest/organizer/vendor', {
        credentials: 'omit',
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
            action: 'create',
            business_name: brand,
            stall_number: stallNo,
            category: cat,
            contact_person: contact,
            contact_phone: phone,
            upi_id: upi
        })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        closeModal('modalOnboardStall');
        showToast('Merchant stall onboarded successfully!', 'success');
        loadOverview();
    })
    .catch(function(err) {
        showToast('Error onboarding stall: ' + err.message, 'error');
    });
}

function bulkAllocateWallets() {
    if (!confirm('Activate and allocate digital wallets for all finance-verified participants?')) return;

    fetch('/api/x_2327324_konnect/konnectfest/organizer/bulk-allocate', {
        credentials: 'omit',
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ event_sys_id: activeEventSysId })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showToast(d.message || 'Wallets allocated successfully!', d.success ? 'success' : 'info');
        loadOverview();
    })
    .catch(function(err) {
        showToast('Bulk allocation error: ' + err.message, 'error');
    });
}

function triggerPurgeTestData() {
    if (!confirm('CAUTION: Are you sure you want to purge all demo data (stalls, test attendees, transactions)? This action cannot be undone.')) return;

    fetch('/api/x_2327324_konnect/konnectfest/organizer/event', {
        credentials: 'omit',
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: 'purge_all_test_data' })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showToast(d.message || 'Demo data purged successfully!', 'success');
        loadOverview();
    })
    .catch(function(err) {
        showToast('Purge error: ' + err.message, 'error');
    });
}

// Initial Boot & 5-Second Telemetry Loop
document.addEventListener('DOMContentLoaded', function() {
    loadOverview();
    setInterval(loadOverview, 5000);
});
`;

// 2. FINANCE CLIENT SCRIPT
const financeScript = `
var currentFinanceQueues = null;
var activeProofItem = null;

function getAuthHeaders() {
    var h = { 'Content-Type': 'application/json' };
    var t = document.getElementById('g_ck_token');
    var tok = t ? t.value : (window.g_ck || '');
    if (tok) h['X-UserToken'] = tok;
    return h;
}

function showToast(msg, type) {
    var b = document.getElementById('fToast');
    if (!b) return;
    b.textContent = msg;
    b.className = 'toast-banner ' + (type === 'error' ? 'toast-error' : 'toast-success');
    b.style.display = 'block';
    setTimeout(function() { b.style.display = 'none'; }, 4000);
}

function switchFinTab(tabId, btn) {
    var cards = document.querySelectorAll('.table-card');
    cards.forEach(function(c) { c.classList.remove('active'); });
    var target = document.getElementById(tabId);
    if (target) target.classList.add('active');

    if (btn) {
        var btns = document.querySelectorAll('.tab-btn');
        btns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
    }
}

function formatINR(val) {
    var n = parseFloat(val) || 0;
    return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function loadFinanceQueues() {
    fetch('/api/x_2327324_konnect/konnectfest/finance/queues', { credentials: 'omit' })
        .then(function(r) { return r.json(); })
        .then(function(res) {
            var d = res.result || res;
            currentFinanceQueues = d;
            renderFinanceData(d);
            var now = new Date();
            var timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            var syncEl = document.getElementById('finSyncTime');
            if (syncEl) syncEl.textContent = timeStr;
        })
        .catch(function(err) {
            console.error('Finance queues fetch failed:', err);
        });
}

function renderFinanceData(d) {
    if (!d) return;

    var regPending = d.pendingRegistrations || [];
    var topupPending = d.pendingPayments || [];
    var settlePending = d.pendingSettlements || [];

    // 1. Metric Counts & Amounts
    var regCountEl = document.getElementById('metricPendingRegCount');
    if (regCountEl) regCountEl.textContent = regPending.length;
    var regAmtSum = 0;
    regPending.forEach(function(r) { regAmtSum += parseFloat(r.fee_amount || r.initial_wallet_amount || 300); });
    var regAmtEl = document.getElementById('metricPendingRegAmt');
    if (regAmtEl) regAmtEl.textContent = formatINR(regAmtSum) + ' pending verification';

    var topupCountEl = document.getElementById('metricPendingTopupCount');
    if (topupCountEl) topupCountEl.textContent = topupPending.length;
    var topupAmtSum = 0;
    topupPending.forEach(function(t) { topupAmtSum += parseFloat(t.amount || 0); });
    var topupAmtEl = document.getElementById('metricPendingTopupAmt');
    if (topupAmtEl) topupAmtEl.textContent = formatINR(topupAmtSum) + ' float requests';

    var settleCountEl = document.getElementById('metricPendingSettleCount');
    if (settleCountEl) settleCountEl.textContent = settlePending.length;
    var settleAmtSum = 0;
    settlePending.forEach(function(s) { settleAmtSum += parseFloat(s.amount || 0); });
    var settleAmtEl = document.getElementById('metricPendingSettleAmt');
    if (settleAmtEl) settleAmtEl.textContent = formatINR(settleAmtSum) + ' awaiting payout';

    // Badges
    var bReg = document.getElementById('badgeRegCount');
    if (bReg) bReg.textContent = regPending.length;
    var bTop = document.getElementById('badgeTopUpCount');
    if (bTop) bTop.textContent = topupPending.length;
    var bSet = document.getElementById('badgeSettleCount');
    if (bSet) bSet.textContent = settlePending.length;

    // 2. Render Registration Fee Queue
    var regTbody = document.getElementById('regQueueBody');
    if (regTbody) {
        if (regPending.length === 0) {
            regTbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#94a3b8; padding:24px;">No pending registration fees awaiting verification.</td></tr>';
        } else {
            var html = '';
            regPending.forEach(function(item, idx) {
                var amt = parseFloat(item.fee_amount || item.initial_wallet_amount || 300);
                var utr = item.utr_reference || item.payment_reference || '-';
                var proofBtn = item.screenshot_data ?
                    '<button class="btn-proof" onclick="viewProofByIndex(\\'reg\\', ' + idx + ')">🖼 View Proof</button>' :
                    '<span style="color:#94a3b8; font-size:12px;">No proof</span>';

                html += '<tr>' +
                    '<td><code>' + escapeHtml(item.registration_number || (item.sys_id ? item.sys_id.substring(0, 6) : 'REG')) + '</code></td>' +
                    '<td><strong>' + escapeHtml(item.attendee_name || item.full_name || 'Attendee') + '</strong></td>' +
                    '<td><strong style="color:#0f172a;">' + formatINR(amt) + '</strong></td>' +
                    '<td><span style="font-family:monospace; background:#f1f5f9; padding:2px 6px; border-radius:4px;">' + escapeHtml(utr) + '</span></td>' +
                    '<td>' + proofBtn + '</td>' +
                    '<td><span class="badge-pill pill-pending">Fee Pending</span></td>' +
                    '<td>' +
                        '<div class="btn-action-group">' +
                            '<button class="btn-verify" onclick="verifyRegistration(\\'' + item.sys_id + '\\')">✓ Verify &amp; Activate</button>' +
                            '<button class="btn-reject" onclick="rejectPayment(\\'' + item.payment_sys_id + '\\')">Reject</button>' +
                        '</div>' +
                    '</td>' +
                '</tr>';
            });
            regTbody.innerHTML = html;
        }
    }

    // 3. Render Top-Up Queue
    var topupTbody = document.getElementById('topupQueueBody');
    if (topupTbody) {
        if (topupPending.length === 0) {
            topupTbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#94a3b8; padding:24px;">No pending wallet top-up requests.</td></tr>';
        } else {
            var html = '';
            topupPending.forEach(function(item, idx) {
                var amt = parseFloat(item.amount || 0);
                var utr = item.utr_reference || '-';
                var proofBtn = item.screenshot_data ?
                    '<button class="btn-proof" onclick="viewProofByIndex(\\'topup\\', ' + idx + ')">🖼 View Proof</button>' :
                    '<span style="color:#94a3b8; font-size:12px;">No proof</span>';

                html += '<tr>' +
                    '<td><code>' + escapeHtml(item.payment_number || 'TOP') + '</code></td>' +
                    '<td><strong>' + escapeHtml(item.participant_name || 'Participant') + '</strong></td>' +
                    '<td><strong style="color:#16a34a;">' + formatINR(amt) + '</strong></td>' +
                    '<td><span style="font-family:monospace; background:#f1f5f9; padding:2px 6px; border-radius:4px;">' + escapeHtml(utr) + '</span></td>' +
                    '<td>' + proofBtn + '</td>' +
                    '<td><span class="badge-pill pill-pending">Top-Up Pending</span></td>' +
                    '<td>' +
                        '<div class="btn-action-group">' +
                            '<button class="btn-verify" onclick="verifyPayment(\\'' + item.sys_id + '\\')">✓ Credit Coupons</button>' +
                            '<button class="btn-reject" onclick="rejectPayment(\\'' + item.sys_id + '\\')">Reject</button>' +
                        '</div>' +
                    '</td>' +
                '</tr>';
            });
            topupTbody.innerHTML = html;
        }
    }

    // 4. Render Settlements Queue
    var settleTbody = document.getElementById('settleQueueBody');
    if (settleTbody) {
        if (settlePending.length === 0) {
            settleTbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#94a3b8; padding:24px;">No pending vendor payout settlements.</td></tr>';
        } else {
            var html = '';
            settlePending.forEach(function(item) {
                var amt = parseFloat(item.amount || 0);
                html += '<tr>' +
                    '<td><code>' + escapeHtml(item.settlement_number || 'SETTLE') + '</code></td>' +
                    '<td><strong>' + escapeHtml(item.vendor_name || 'Vendor') + '</strong></td>' +
                    '<td>' + escapeHtml(item.stall_number || '-') + '</td>' +
                    '<td>' + (item.coupon_count || amt) + ' Coupons</td>' +
                    '<td><strong style="color:#0f172a;">' + formatINR(amt) + '</strong></td>' +
                    '<td><span class="badge-pill pill-pending">Awaiting Payout</span></td>' +
                    '<td>' +
                        '<button class="btn-verify" onclick="settleVendor(\\'' + item.sys_id + '\\')">Disburse Bank Payout →</button>' +
                    '</td>' +
                '</tr>';
            });
            settleTbody.innerHTML = html;
        }
    }
}

function viewProofByIndex(type, idx) {
    var item = null;
    if (type === 'reg' && currentFinanceQueues) {
        item = (currentFinanceQueues.pendingRegistrations || [])[idx];
    } else if (type === 'topup' && currentFinanceQueues) {
        item = (currentFinanceQueues.pendingPayments || [])[idx];
    }
    if (!item) return;
    activeProofItem = item;

    document.getElementById('mProofImg').src = item.screenshot_data || '';
    document.getElementById('mProofName').textContent = item.attendee_name || item.full_name || item.participant_name || 'Attendee';
    var amt = parseFloat(item.fee_amount || item.amount || item.initial_wallet_amount || 300);
    document.getElementById('mProofAmt').textContent = formatINR(amt);
    document.getElementById('mProofUtr').textContent = item.utr_reference || item.payment_reference || 'N/A';
    document.getElementById('mProofPurpose').textContent = type === 'reg' ? 'Event Official Admission Pass' : 'Digital Wallet Coupon Float';

    document.getElementById('modalProofViewer').style.display = 'flex';
}

function closeProofModal() {
    document.getElementById('modalProofViewer').style.display = 'none';
    activeProofItem = null;
}

function copyModalUtr() {
    var utr = document.getElementById('mProofUtr').textContent;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(utr).then(function() { showToast('UTR copied to clipboard.', 'success'); });
    } else {
        showToast('UTR: ' + utr, 'info');
    }
}

function approveFromModal() {
    if (!activeProofItem) return;
    if (activeProofItem.registration_number || activeProofItem.full_name) {
        verifyRegistration(activeProofItem.sys_id);
    } else {
        verifyPayment(activeProofItem.sys_id);
    }
    closeProofModal();
}

function rejectFromModal() {
    if (!activeProofItem) return;
    rejectPayment(activeProofItem.payment_sys_id || activeProofItem.sys_id);
    closeProofModal();
}

function verifyRegistration(sysId) {
    fetch('/api/x_2327324_konnect/konnectfest/finance/verify-payment', {
        credentials: 'omit',
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ registration_sys_id: sysId })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showToast(d.message || 'Registration verified! Account activated.', 'success');
        loadFinanceQueues();
    })
    .catch(function(err) {
        showToast('Verification failed: ' + err.message, 'error');
    });
}

function verifyPayment(sysId) {
    fetch('/api/x_2327324_konnect/konnectfest/finance/verify-payment', {
        credentials: 'omit',
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ payment_sys_id: sysId })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showToast(d.message || 'Payment verified! Coupons credited to wallet.', 'success');
        loadFinanceQueues();
    })
    .catch(function(err) {
        showToast('Verification failed: ' + err.message, 'error');
    });
}

function rejectPayment(sysId) {
    var reason = prompt('Please enter reason for rejection:', 'Invalid or unverified bank UTR reference');
    if (!reason) return;

    fetch('/api/x_2327324_konnect/konnectfest/finance/reject-payment', {
        credentials: 'omit',
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ payment_sys_id: sysId, reason: reason })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showToast('Payment rejected.', 'info');
        loadFinanceQueues();
    })
    .catch(function(err) {
        showToast('Rejection error: ' + err.message, 'error');
    });
}

function settleVendor(sysId) {
    var ref = prompt('Enter Bank Transaction Payout Reference (UTR):', 'DISB-' + Date.now().toString().slice(-8));
    if (!ref) return;

    fetch('/api/x_2327324_konnect/konnectfest/finance/pay-settlement', {
        credentials: 'omit',
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ settlement_sys_id: sysId, bank_reference: ref })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showToast(d.message || 'Vendor settlement disbursed successfully!', 'success');
        loadFinanceQueues();
    })
    .catch(function(err) {
        showToast('Settlement error: ' + err.message, 'error');
    });
}

// Initial Boot & 5-Second Telemetry Loop
document.addEventListener('DOMContentLoaded', function() {
    loadFinanceQueues();
    setInterval(loadFinanceQueues, 5000);
});
`;

module.exports = { organizerScript, financeScript };
