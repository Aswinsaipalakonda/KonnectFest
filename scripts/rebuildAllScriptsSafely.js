const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { logoInitCode, logoDataUri } = require('./systemBuilderShared');

console.log('=== SAFELY REBUILDING CLIENT SCRIPTS WITH SYNTAX VALIDATION & PRE-POPULATED EVENTS ===');

// ==============================================================
// 1. REGISTER CLIENT SCRIPT (CLEAN JS, NO SYNTAX ERRORS)
// ==============================================================
const registerClientScript = `
${logoInitCode}

var createdPaymentId = '';

function safeFetch(url, options) {
    options = options || {};
    options.credentials = 'omit';
    options.headers = options.headers || {};
    if (!options.headers['Content-Type'] && options.method && options.method.toUpperCase() === 'POST') {
        options.headers['Content-Type'] = 'application/json';
    }
    return fetch(url, options);
}

function showBanner(id, msg, type) {
    var el = document.getElementById(id);
    if (!el) { alert(msg); return; }
    el.style.display = 'block';
    el.className = 'sn-alert-bar ' + (type === 'error' ? 'sn-alert-error' : 'sn-alert-success');
    el.textContent = msg;
    setTimeout(function() { if (el) el.style.display = 'none'; }, 6000);
}

function formatINR(val) {
    return '₹' + parseFloat(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function copyText(elementId, label) {
    var el = document.getElementById(elementId);
    if (!el) return;
    var text = el.textContent || el.innerText;
    navigator.clipboard.writeText(text.replace('₹', '').trim()).then(function() {
        showBanner('regToast', label + ' copied to clipboard!', 'success');
    });
}

function loadPublicEvents() {
    safeFetch('/api/x_2327324_konnect/konnectfest/public/events')
        .then(function(r) { return r.json(); })
        .then(function(res) {
            var d = res.result || res;
            var sel = document.getElementById('rEvent');
            if (!sel) return;
            var currentVal = sel.value;
            sel.innerHTML = '';
            (d.events || []).forEach(function(ev) {
                var opt = document.createElement('option');
                opt.value = ev.sys_id;
                opt.textContent = ev.name + ' (' + ev.state + ')';
                if (ev.sys_id === currentVal || !currentVal) {
                    opt.selected = true;
                    currentVal = ev.sys_id;
                }
                sel.appendChild(opt);
            });
            if ((d.events || []).length === 0) {
                sel.innerHTML = '<option value="">No events currently open</option>';
            }
        })
        .catch(function(err) {
            console.warn('Could not refresh events dynamically, using default event:', err);
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
        return showBanner('regToast', 'Full Name is required. Please enter your name.', 'error');
    }
    if (!rEmailEl || !rEmailEl.value.trim()) {
        return showBanner('regToast', 'Working Email Address is required.', 'error');
    }

    var amt = parseFloat(rAmountEl ? rAmountEl.value : '0');
    if (isNaN(amt) || amt <= 0) {
        return showBanner('regToast', 'Initial Wallet Funding is required. Please enter a valid positive amount.', 'error');
    }

    var payload = {
        event_sys_id: rEventEl.value,
        name: rNameEl.value.trim(),
        email: rEmailEl.value.trim(),
        phone: rPhoneEl ? rPhoneEl.value.trim() : '',
        requested_amount: amt
    };

    safeFetch('/api/x_2327324_konnect/konnectfest/registration', {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        if (!d.success) return showBanner('regToast', d.message || 'Registration failed', 'error');
        createdPaymentId = d.paymentSysId;

        document.getElementById('regStep1').style.display = 'none';
        document.getElementById('regStep2').style.display = 'block';

        var upi = (d.upiId || 'konnectfest@axisbank').trim();
        var payee = (d.payeeName || 'KonnectFest Committee').trim();
        var amtStr = parseFloat(d.amount).toFixed(2);
        var note = (d.paymentNumber || 'KFREG').replace(/[^a-zA-Z0-9]/g, '').slice(0, 15);

        // Standard NPCI UPI URI
        var npciUri = 'upi://pay?pa=' + upi + '&pn=' + encodeURIComponent(payee) + '&am=' + amtStr + '&cu=INR&tn=' + note;

        // Render QR
        var qrBox = document.getElementById('regQrContainer');
        if (qrBox) {
            qrBox.innerHTML = '';
            if (typeof QRCode !== 'undefined') {
                new QRCode(qrBox, {
                    text: npciUri,
                    width: 200,
                    height: 200,
                    colorDark: '#0f2e46',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.M
                });
            }
        }

        // Set deep link
        var deepLink = document.getElementById('btnRegUpiDeepLink');
        if (deepLink) deepLink.href = npciUri;

        document.getElementById('dispUpiId').textContent = upi;
        document.getElementById('dispAmt').textContent = formatINR(d.amount);
        document.getElementById('dispPayeeName').textContent = payee;
        document.getElementById('dispRefId').textContent = d.paymentNumber || 'PENDING';
    })
    .catch(function(err) {
        showBanner('regToast', 'Registration server error: ' + err.message, 'error');
    });
}

function submitPublicUtr() {
    var utr = (document.getElementById('rUtr').value || '').trim();
    if (!utr) return showBanner('regToast', 'Please enter your 12-digit bank UTR reference.', 'error');

    safeFetch('/api/x_2327324_konnect/konnectfest/registration/submit-utr', {
        method: 'POST',
        body: JSON.stringify({ payment_sys_id: createdPaymentId, utr_reference: utr })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        document.getElementById('regStep2').style.display = 'none';
        document.getElementById('regStep3').style.display = 'block';
        document.getElementById('regDoneMsg').textContent = d.message || 'Payment reference submitted successfully!';
    })
    .catch(function(err) {
        showBanner('regToast', 'Error submitting UTR: ' + err.message, 'error');
    });
}

loadPublicEvents();
`;

// ==============================================================
// 2. PARTICIPANT CLIENT SCRIPT (CLEAN JS, NO QUOTE ESCAPE ISSUES)
// ==============================================================
const participantClientScript = `
${logoInitCode}

var currentPartData = null;
var activePendingTx = null;
var activeTopUpPaymentId = null;

function safeFetch(url, options) {
    options = options || {};
    options.credentials = 'omit';
    options.headers = options.headers || {};
    if (!options.headers['Content-Type'] && options.method && options.method.toUpperCase() === 'POST') {
        options.headers['Content-Type'] = 'application/json';
    }
    return fetch(url, options);
}

function showBanner(id, msg, type) {
    var el = document.getElementById(id);
    if (!el) { alert(msg); return; }
    el.style.display = 'block';
    el.className = 'sn-alert-bar ' + (type === 'error' ? 'sn-alert-error' : 'sn-alert-success');
    el.textContent = msg;
    setTimeout(function() { if (el) el.style.display = 'none'; }, 6000);
}

function formatINR(val) {
    return '₹' + parseFloat(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function copyText(elementId, label) {
    var el = document.getElementById(elementId);
    if (!el) return;
    var text = el.textContent || el.innerText;
    navigator.clipboard.writeText(text.replace('₹', '').trim()).then(function() {
        showBanner('partToast', label + ' copied to clipboard!', 'success');
    });
}

function switchPartTab(tabId) {
    var tabs = ['tabScan', 'tabTopup', 'tabLedger', 'tabRefund'];
    tabs.forEach(function(t) {
        var el = document.getElementById(t);
        if (el) el.style.display = (t === tabId) ? 'block' : 'none';
    });
    var btnMap = { tabScan: 'btnTabScan', tabTopup: 'btnTabTopup', tabLedger: 'btnTabLedger', tabRefund: 'btnTabRefund' };
    for (var k in btnMap) {
        var b = document.getElementById(btnMap[k]);
        if (b) {
            if (k === tabId) b.classList.add('active');
            else b.classList.remove('active');
        }
    }
}

function loadParticipantDash() {
    safeFetch('/api/x_2327324_konnect/konnectfest/participant/dashboard')
        .then(function(r) { return r.json(); })
        .then(function(res) {
            var d = res.result || res;
            currentPartData = d;
            renderParticipantUI(d);
        })
        .catch(function(err) {
            console.error('Participant dash error:', err);
        });
}

function renderParticipantUI(d) {
    if (!d) return;

    var part = d.participant || {};
    var pName = document.getElementById('partUserName');
    if (pName) pName.textContent = part.name || 'Participant';

    var ev = d.event || {};
    var eTitle = document.getElementById('partFestTitle');
    if (eTitle) eTitle.textContent = ev.name || 'KonnectFest 2026 - Annual Fest';
    var eUpi = document.getElementById('partEventUpi');
    if (eUpi) eUpi.textContent = ev.upi_id || 'konnectfest@axisbank';
    var eState = document.getElementById('partEventStateBadge');
    if (eState) {
        eState.textContent = ev.state === 'completed' ? 'Completed' : (ev.state === 'active' ? 'Active / Live Fest' : ev.state);
        eState.className = 'sn-badge ' + (ev.state === 'active' ? 'sn-badge-green' : (ev.state === 'completed' ? 'sn-badge-amber' : 'sn-badge-gray'));
    }

    var w = d.wallet || {};
    var elBal = document.getElementById('partAvailableBalance');
    if (elBal) elBal.textContent = formatINR(w.available_balance);
    var elRes = document.getElementById('partReservedBalance');
    if (elRes) elRes.textContent = formatINR(w.reserved_balance);
    var elSpent = document.getElementById('partTotalSpent');
    if (elSpent) elSpent.textContent = formatINR(w.total_spent);
    var elWId = document.getElementById('partWalletId');
    if (elWId) elWId.textContent = w.number || (w.sys_id ? w.sys_id.slice(0, 10) : 'WAL-10001');

    renderLedgerTable(d.ledger || []);

    var isCompleted = (ev.state === 'completed');
    var lockNotice = document.getElementById('refundLockedNotice');
    var unlockForm = document.getElementById('refundUnlockedForm');
    var refEligible = document.getElementById('refundEligibleAmt');
    var refInput = document.getElementById('refundAmtInput');

    if (isCompleted) {
        if (lockNotice) lockNotice.style.display = 'none';
        if (unlockForm) unlockForm.style.display = 'block';
        if (refEligible) refEligible.textContent = formatINR(w.available_balance);
        if (refInput) refInput.value = (w.available_balance || 0);
    } else {
        if (lockNotice) lockNotice.style.display = 'block';
        if (unlockForm) unlockForm.style.display = 'none';
    }
}

function renderLedgerTable(ledger) {
    var tbody = document.getElementById('partLedgerTbody');
    if (!tbody) return;

    if (!ledger || ledger.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:24px; color:var(--sn-text-muted);">No transactions recorded in wallet ledger.</td></tr>';
        return;
    }

    var rows = '';
    ledger.forEach(function(l, idx) {
        var isCredit = (l.entry_type === 'initial_credit' || l.entry_type === 'top_up' || l.entry_type === 'credit');
        var color = isCredit ? 'var(--sn-teal)' : 'var(--sn-danger)';
        var prefix = isCredit ? '+' : '-';
        var badge = isCredit ? '<span class="sn-badge sn-badge-green">' + l.entry_type + '</span>' : '<span class="sn-badge sn-badge-blue">' + l.entry_type + '</span>';

        var cpnBtn = '';
        if (l.coupon_id) {
            cpnBtn = '<button class="sn-btn sn-btn-sm sn-btn-default" data-idx="' + idx + '" onclick="viewCouponByIdx(' + idx + ')">🎟️ View Receipt</button>';
        } else {
            cpnBtn = '<span style="color:var(--sn-text-muted); font-size:11px;">-</span>';
        }

        rows += '<tr>'
            + '<td>' + (l.timestamp || '-') + '</td>'
            + '<td>' + badge + '</td>'
            + '<td style="font-weight:700; color:' + color + ';">' + prefix + formatINR(l.amount) + '</td>'
            + '<td><strong>' + formatINR(l.available_balance_after) + '</strong></td>'
            + '<td>' + (l.description || l.reference_id || 'Wallet Activity') + '</td>'
            + '<td>' + cpnBtn + '</td>'
            + '</tr>';
    });

    tbody.innerHTML = rows;
}

function viewCouponByIdx(idx) {
    var ledger = (currentPartData && currentPartData.ledger) ? currentPartData.ledger : [];
    var l = ledger[idx];
    if (!l) return;
    document.getElementById('cpnReceiptId').textContent = l.coupon_id || 'KF-CPN-RECEIPT';
    document.getElementById('cpnItem').textContent = l.description || 'Festival Purchase';
    document.getElementById('cpnAmount').textContent = formatINR(l.amount);
    document.getElementById('cpnTime').textContent = l.timestamp || 'Just now';
    document.getElementById('cpnStall').textContent = 'Authorized Vendor Stall';
    document.getElementById('couponModal').style.display = 'flex';
}

function closeCouponModal() {
    document.getElementById('couponModal').style.display = 'none';
}

function lookupVendorQR() {
    var tokenInput = document.getElementById('txTokenInput');
    var token = (tokenInput ? tokenInput.value : '').trim();
    if (!token) return showBanner('partToast', 'Please enter a vendor transaction token.', 'error');

    safeFetch('/api/x_2327324_konnect/konnectfest/vendor/qr-details?qr_token=' + encodeURIComponent(token))
        .then(function(r) { return r.json(); })
        .then(function(res) {
            var d = res.result || res;
            if (!d.success) return showBanner('partToast', d.message || 'Invalid or expired QR token.', 'error');

            activePendingTx = d.transaction;
            document.getElementById('txDetailsBox').style.display = 'block';
            document.getElementById('txStallName').textContent = d.transaction.stall_name || 'Vendor Stall';
            document.getElementById('txItemDesc').textContent = d.transaction.item_description || 'Festival Purchase';
            document.getElementById('txAmountVal').textContent = formatINR(d.transaction.amount);
            document.getElementById('txCreatedAt').textContent = 'Created: ' + (d.transaction.created_at || 'Just now');
            document.getElementById('txTimerBadge').textContent = 'Active (120s Expiry)';
        })
        .catch(function(err) {
            showBanner('partToast', 'Error looking up QR token: ' + err.message, 'error');
        });
}

function cancelPurchaseLookup() {
    activePendingTx = null;
    document.getElementById('txDetailsBox').style.display = 'none';
    document.getElementById('txTokenInput').value = '';
}

function confirmPurchasePayment() {
    if (!activePendingTx || !activePendingTx.sys_id) return;

    var payload = {
        transaction_sys_id: activePendingTx.sys_id,
        participant_sys_id: (currentPartData && currentPartData.participant) ? currentPartData.participant.sys_id : ''
    };

    safeFetch('/api/x_2327324_konnect/konnectfest/purchase/confirm', {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        if (!d.success) return showBanner('partToast', d.message || 'Payment confirmation failed', 'error');

        showBanner('partToast', '✓ Payment successful! Coupon Receipt #' + (d.couponId || 'CPN') + ' generated.', 'success');
        cancelPurchaseLookup();
        loadParticipantDash();
    })
    .catch(function(err) {
        showBanner('partToast', 'Payment error: ' + err.message, 'error');
    });
}

function setTopUpAmt(amt) {
    var inp = document.getElementById('topupAmtInput');
    if (inp) inp.value = amt;
}

function submitTopUpRequest() {
    var amt = parseFloat(document.getElementById('topupAmtInput').value || '0');
    if (amt <= 0) return showBanner('partToast', 'Please enter a valid top-up amount greater than ₹0.', 'error');

    var pSysId = (currentPartData && currentPartData.participant) ? currentPartData.participant.sys_id : '';
    var eSysId = (currentPartData && currentPartData.event) ? currentPartData.event.sys_id : '';

    var payload = {
        participant_sys_id: pSysId,
        event_sys_id: eSysId,
        amount: amt
    };

    safeFetch('/api/x_2327324_konnect/konnectfest/wallet/topup', {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        if (!d.success) return showBanner('partToast', d.message || 'Failed to initialize top-up', 'error');

        activeTopUpPaymentId = d.paymentSysId;
        document.getElementById('topupQrBox').style.display = 'block';

        var upi = d.upiId || 'konnectfest@axisbank';
        var payee = d.payeeName || 'KonnectFest Committee';
        var amtStr = parseFloat(d.amount).toFixed(2);
        var refNote = (d.paymentNumber || 'TOPUP').slice(0, 15);

        var npciUri = 'upi://pay?pa=' + upi + '&pn=' + encodeURIComponent(payee) + '&am=' + amtStr + '&cu=INR&tn=' + refNote;

        var box = document.getElementById('topupQrContainer');
        if (box) {
            box.innerHTML = '';
            if (typeof QRCode !== 'undefined') {
                new QRCode(box, {
                    text: npciUri,
                    width: 180,
                    height: 180,
                    colorDark: '#0f2e46',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.M
                });
            }
        }

        var btnLink = document.getElementById('btnTopupDeepLink');
        if (btnLink) btnLink.href = npciUri;

        document.getElementById('topupVpaVal').textContent = upi;
        document.getElementById('topupAmtDisp').textContent = formatINR(amt);
    })
    .catch(function(err) {
        showBanner('partToast', 'Top-up request failed: ' + err.message, 'error');
    });
}

function submitTopUpUtr() {
    var utr = (document.getElementById('topupUtrInput').value || '').trim();
    if (!utr) return showBanner('partToast', 'Please enter your bank UTR transaction reference.', 'error');

    safeFetch('/api/x_2327324_konnect/konnectfest/registration/submit-utr', {
        method: 'POST',
        body: JSON.stringify({ payment_sys_id: activeTopUpPaymentId, utr_reference: utr })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showBanner('partToast', '✓ Top-up reference submitted! Finance will verify and credit your wallet.', 'success');
        document.getElementById('topupQrBox').style.display = 'none';
        document.getElementById('topupUtrInput').value = '';
        loadParticipantDash();
    })
    .catch(function(err) {
        showBanner('partToast', 'Error submitting UTR: ' + err.message, 'error');
    });
}

function submitRefundClaim() {
    var upi = (document.getElementById('refundUpiInput').value || '').trim();
    var amt = parseFloat(document.getElementById('refundAmtInput').value || '0');

    if (!upi) return showBanner('partToast', 'Please enter your receiving UPI ID.', 'error');
    if (amt <= 0) return showBanner('partToast', 'Please enter a valid refund amount.', 'error');

    var pSysId = (currentPartData && currentPartData.participant) ? currentPartData.participant.sys_id : '';
    var eSysId = (currentPartData && currentPartData.event) ? currentPartData.event.sys_id : '';

    safeFetch('/api/x_2327324_konnect/konnectfest/refund/request', {
        method: 'POST',
        body: JSON.stringify({ participant_sys_id: pSysId, event_sys_id: eSysId, amount: amt, upi_id: upi })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showBanner('partToast', d.message || 'Refund claim submitted for Finance approval!', d.success ? 'success' : 'error');
        loadParticipantDash();
    })
    .catch(function(err) {
        showBanner('partToast', 'Refund request error: ' + err.message, 'error');
    });
}

loadParticipantDash();
setInterval(loadParticipantDash, 5000);
`;

// ==============================================================
// 3. FINANCE CLIENT SCRIPT (CLEAN JS, NO QUOTE ESCAPE ISSUES)
// ==============================================================
const financeClientScript = `
${logoInitCode}

var activeFinanceData = null;

function safeFetch(url, options) {
    options = options || {};
    options.credentials = 'omit';
    options.headers = options.headers || {};
    if (!options.headers['Content-Type'] && options.method && options.method.toUpperCase() === 'POST') {
        options.headers['Content-Type'] = 'application/json';
    }
    return fetch(url, options);
}

function showBanner(id, msg, type) {
    var el = document.getElementById(id);
    if (!el) { alert(msg); return; }
    el.style.display = 'block';
    el.className = 'sn-alert-bar ' + (type === 'error' ? 'sn-alert-error' : 'sn-alert-success');
    el.textContent = msg;
    setTimeout(function() { if (el) el.style.display = 'none'; }, 6000);
}

function formatINR(val) {
    return '₹' + parseFloat(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function switchFinTab(tabId) {
    var tabs = ['tabPayments', 'tabRefunds', 'tabSettlements'];
    tabs.forEach(function(t) {
        var el = document.getElementById(t);
        if (el) el.style.display = (t === tabId) ? 'block' : 'none';
    });
    var btnMap = { tabPayments: 'btnTabPayments', tabRefunds: 'btnTabRefunds', tabSettlements: 'btnTabSettlements' };
    for (var k in btnMap) {
        var b = document.getElementById(btnMap[k]);
        if (b) {
            if (k === tabId) b.classList.add('active');
            else b.classList.remove('active');
        }
    }
}

function loadFinanceQueues() {
    safeFetch('/api/x_2327324_konnect/konnectfest/finance/queues')
        .then(function(r) { return r.json(); })
        .then(function(res) {
            var d = res.result || res;
            activeFinanceData = d;
            renderFinanceData(d);
        })
        .catch(function(err) {
            console.error('Error loading finance queues:', err);
        });
}

function renderFinanceData(d) {
    if (!d) return;

    var payments = d.pendingPayments || [];
    var refunds = d.pendingRefunds || [];
    var settlements = d.vendorSettlements || [];
    var floatVal = d.totalVerifiedFloat || 124000;

    document.getElementById('kpiPendingPayments').textContent = payments.length;
    document.getElementById('tabCountPayments').textContent = payments.length;
    document.getElementById('kpiPendingRefunds').textContent = refunds.length;
    document.getElementById('tabCountRefunds').textContent = refunds.length;
    document.getElementById('kpiVerifiedFloat').textContent = formatINR(floatVal);
    document.getElementById('kpiSettlementBatches').textContent = settlements.length;

    var pTbody = document.getElementById('pendingPaymentsTbody');
    if (pTbody) {
        if (payments.length === 0) {
            pTbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:24px; color:var(--sn-text-muted);">No pending payment verifications. All accounts up to date!</td></tr>';
        } else {
            var pRows = '';
            payments.forEach(function(p, idx) {
                pRows += '<tr>'
                    + '<td><code>' + (p.number || p.sys_id.slice(0, 8)) + '</code></td>'
                    + '<td><strong>' + (p.participant_name || 'Attendee') + '</strong><br/><span style="font-size:11px; color:var(--sn-text-muted);">' + (p.participant_email || '') + '</span></td>'
                    + '<td><span class="sn-badge sn-badge-blue">' + (p.type === 'initial_registration' ? 'Initial Reg' : 'Top-Up') + '</span></td>'
                    + '<td><strong style="color:var(--sn-navy-dark);">' + formatINR(p.requested_amount) + '</strong></td>'
                    + '<td><code>' + (p.utr_reference || 'PENDING') + '</code></td>'
                    + '<td><span class="sn-badge sn-badge-amber">Under Review</span></td>'
                    + '<td><div style="display:flex; gap:6px;">'
                    + '<button class="sn-btn sn-btn-sm sn-btn-teal" data-id="' + p.sys_id + '" data-amt="' + p.requested_amount + '" onclick="verifyPaymentFromBtn(this)">✓ Approve &amp; Credit Wallet</button>'
                    + '<button class="sn-btn sn-btn-sm sn-btn-danger" data-id="' + p.sys_id + '" onclick="rejectPaymentFromBtn(this)">✕ Reject</button>'
                    + '</div></td>'
                    + '</tr>';
            });
            pTbody.innerHTML = pRows;
        }
    }

    var rTbody = document.getElementById('pendingRefundsTbody');
    if (rTbody) {
        if (refunds.length === 0) {
            rTbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:24px; color:var(--sn-text-muted);">No pending refund requests.</td></tr>';
        } else {
            var rRows = '';
            refunds.forEach(function(rf) {
                rRows += '<tr>'
                    + '<td><code>' + (rf.number || rf.sys_id.slice(0, 8)) + '</code></td>'
                    + '<td><strong>' + (rf.participant_name || 'Attendee') + '</strong></td>'
                    + '<td><strong>' + formatINR(rf.amount) + '</strong></td>'
                    + '<td><code>' + (rf.upi_id || '-') + '</code></td>'
                    + '<td><span class="sn-badge sn-badge-amber">Pending Payout</span></td>'
                    + '<td><div style="display:flex; gap:6px;">'
                    + '<button class="sn-btn sn-btn-sm sn-btn-teal" data-id="' + rf.sys_id + '" onclick="approveRefundFromBtn(this)">Record Bank Payout ✓</button>'
                    + '<button class="sn-btn sn-btn-sm sn-btn-danger" data-id="' + rf.sys_id + '" onclick="rejectRefundFromBtn(this)">Reject</button>'
                    + '</div></td>'
                    + '</tr>';
            });
            rTbody.innerHTML = rRows;
        }
    }

    var sTbody = document.getElementById('vendorSettlementTbody');
    if (sTbody) {
        if (settlements.length === 0) {
            sTbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:24px; color:var(--sn-text-muted);">No vendor settlements queued.</td></tr>';
        } else {
            var sRows = '';
            settlements.forEach(function(st) {
                sRows += '<tr>'
                    + '<td><strong>' + (st.stall_number || 'Stall #01') + '</strong></td>'
                    + '<td><strong>' + (st.vendor_name || 'Vendor Brand') + '</strong></td>'
                    + '<td><strong>' + formatINR(st.gross_sales) + '</strong></td>'
                    + '<td>' + formatINR(st.unsettled_balance) + '</td>'
                    + '<td><span class="sn-badge sn-badge-green">Operational</span></td>'
                    + '<td><button class="sn-btn sn-btn-sm sn-btn-primary" data-id="' + st.vendor_sys_id + '" onclick="settleVendorFromBtn(this)">Generate Settlement Batch →</button></td>'
                    + '</tr>';
            });
            sTbody.innerHTML = sRows;
        }
    }
}

function verifyPaymentFromBtn(btn) {
    var pId = btn.getAttribute('data-id');
    var pAmt = parseFloat(btn.getAttribute('data-amt') || '0');
    verifyPayment(pId, pAmt);
}

function rejectPaymentFromBtn(btn) {
    var pId = btn.getAttribute('data-id');
    rejectPayment(pId);
}

function approveRefundFromBtn(btn) {
    var rId = btn.getAttribute('data-id');
    approveRefund(rId);
}

function rejectRefundFromBtn(btn) {
    var rId = btn.getAttribute('data-id');
    rejectRefund(rId);
}

function settleVendorFromBtn(btn) {
    var vId = btn.getAttribute('data-id');
    settleVendorBatch(vId);
}

function verifyPayment(paymentId, amount) {
    safeFetch('/api/x_2327324_konnect/konnectfest/finance/verify-payment', {
        method: 'POST',
        body: JSON.stringify({ payment_sys_id: paymentId, verified_amount: amount })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showBanner('finToast', d.message || 'Payment verified! Wallet initialized and funded.', 'success');
        loadFinanceQueues();
    })
    .catch(function(err) {
        showBanner('finToast', 'Error verifying payment: ' + err.message, 'error');
    });
}

function rejectPayment(paymentId) {
    var reason = prompt('Enter rejection reason:') || 'UTR verification failed';
    safeFetch('/api/x_2327324_konnect/konnectfest/finance/reject-payment', {
        method: 'POST',
        body: JSON.stringify({ payment_sys_id: paymentId, reason: reason })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        showBanner('finToast', 'Payment marked as rejected.', 'success');
        loadFinanceQueues();
    });
}

function approveRefund(refundId) {
    var utr = prompt('Enter Bank Payout Reference (UTR):') || 'PAYOUT-' + Date.now();
    safeFetch('/api/x_2327324_konnect/konnectfest/finance/finalize-refund', {
        method: 'POST',
        body: JSON.stringify({ refund_sys_id: refundId, payout_reference: utr })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        showBanner('finToast', 'Refund payout recorded successfully!', 'success');
        loadFinanceQueues();
    });
}

function rejectRefund(refundId) {
    var reason = prompt('Enter rejection reason:') || 'Policy violation';
    safeFetch('/api/x_2327324_konnect/konnectfest/finance/reject-refund', {
        method: 'POST',
        body: JSON.stringify({ refund_sys_id: refundId, reason: reason })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        showBanner('finToast', 'Refund rejected.', 'success');
        loadFinanceQueues();
    });
}

function settleVendorBatch(vendorId) {
    safeFetch('/api/x_2327324_konnect/konnectfest/finance/settle-vendor', {
        method: 'POST',
        body: JSON.stringify({ vendor_sys_id: vendorId })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        showBanner('finToast', 'Settlement batch created successfully!', 'success');
        loadFinanceQueues();
    });
}

loadFinanceQueues();
setInterval(loadFinanceQueues, 5000);
`;

// ==============================================================
// 4. TEST SYNTAX OF ALL THREE SCRIPTS WITH NODE -C
// ==============================================================
fs.writeFileSync('scripts/test_register.js', registerClientScript, 'utf8');
fs.writeFileSync('scripts/test_participant.js', participantClientScript, 'utf8');
fs.writeFileSync('scripts/test_finance.js', financeClientScript, 'utf8');

execSync('node -c scripts/test_register.js');
console.log('1. registerClientScript: SYNTAX VALID!');
execSync('node -c scripts/test_participant.js');
console.log('2. participantClientScript: SYNTAX VALID!');
execSync('node -c scripts/test_finance.js');
console.log('3. financeClientScript: SYNTAX VALID!');

// ==============================================================
// 5. UPDATE register.html (PRE-POPULATED EVENT, EMPTY 500, MANDATORY ASTERISKS)
// ==============================================================
let regHtml = fs.readFileSync('src/fluent/pages/register.html', 'utf8');

// Pre-populate event in select dropdown
regHtml = regHtml.replace(
    '<select id="rEvent" class="sn-form-select"></select>',
    `<select id="rEvent" class="sn-form-select">
                    <option value="269873514734d3101e52eee3716d4339" selected="selected">KonnectFest 2026 - Annual Fest (Registration Open)</option>
                </select>`
);

// Remove default 500 and set placeholder
regHtml = regHtml.replace(
    '<input type="number" id="rAmount" class="sn-form-input" min="1" step="1" value="500" />',
    '<input type="number" id="rAmount" class="sn-form-input" min="1" step="1" value="" placeholder="Enter initial wallet amount (e.g. 500)" />'
);

// Ensure mandatory asterisks
regHtml = regHtml.replace(
    '<label class="sn-form-label">Festival Event <span class="req">*</span></label>',
    '<label class="sn-form-label">Festival Event <span class="req" style="color:#b91c1c; font-weight:700;">*</span></label>'
);
regHtml = regHtml.replace(
    '<label class="sn-form-label">Full Name <span class="req">*</span></label>',
    '<label class="sn-form-label">Full Name <span class="req" style="color:#b91c1c; font-weight:700;">*</span></label>'
);
regHtml = regHtml.replace(
    '<label class="sn-form-label">Working Email Address <span class="req">*</span></label>',
    '<label class="sn-form-label">Working Email Address <span class="req" style="color:#b91c1c; font-weight:700;">*</span></label>'
);
regHtml = regHtml.replace(
    '<label class="sn-form-label">Initial Wallet Funding (INR) <span class="req">*</span></label>',
    '<label class="sn-form-label">Initial Wallet Funding (INR) <span class="req" style="color:#b91c1c; font-weight:700;">*</span></label>'
);
regHtml = regHtml.replace(
    '<label class="sn-form-label">12-Digit Bank UTR / Transaction Reference <span class="req">*</span></label>',
    '<label class="sn-form-label">12-Digit Bank UTR / Transaction Reference <span class="req" style="color:#b91c1c; font-weight:700;">*</span></label>'
);

fs.writeFileSync('src/fluent/pages/register.html', regHtml, 'utf8');
console.log('4. Updated register.html with pre-populated event, empty amount field, and mandatory asterisks!');

// Validate XML of register.html
execSync('python scripts/temp_validate.py', { stdio: 'inherit' });

// ==============================================================
// 6. UPDATE CLIENT_SCRIPTS IN restEndpoints.ts
// ==============================================================
const restPath = path.resolve('src/server/restEndpoints.ts');
let restCode = fs.readFileSync(restPath, 'utf8');

const marker = 'const CLIENT_SCRIPTS: Record<string, string> = ';
const idx = restCode.indexOf(marker);
const nextFunc = restCode.indexOf('export function handleGetPublicScript', idx);

let rawJson = restCode.substring(idx + marker.length, nextFunc).trim();
if (rawJson.endsWith(';')) rawJson = rawJson.slice(0, -1).trim();

const clientScripts = JSON.parse(rawJson);
clientScripts['register'] = registerClientScript;
clientScripts['participant'] = participantClientScript;
clientScripts['finance'] = financeClientScript;

// Organizer script 5s auto-refresh
if (!clientScripts['organizer'].includes('setInterval(loadOverview, 5000)')) {
    clientScripts['organizer'] += '\nsetInterval(loadOverview, 5000);\n';
}

const updatedJson = JSON.stringify(clientScripts) + ';\n\n';
restCode = restCode.substring(0, idx + marker.length) + updatedJson + restCode.substring(nextFunc);

fs.writeFileSync(restPath, restCode, 'utf8');
console.log('5. Successfully injected validated scripts into restEndpoints.ts!');
