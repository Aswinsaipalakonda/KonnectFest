const fs = require('fs');

console.log('=== 4. GENERATING CLEAN CLIENT SCRIPTS FOR ALL ROLES ===');

const logoDataUri = "data:image/jpeg;base64,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";

// ==============================================================
// 1. REGISTER SCRIPT
// ==============================================================
const registerClientScript = `
var createdPaymentId = '';
var selectedRegFee = 300;
var proofBase64 = '';

function safeFetch(url, options) {
    options = options || {};
    options.credentials = 'omit';
    options.headers = options.headers || {};
    if (!options.headers['Content-Type'] && options.method && options.method.toUpperCase() === 'POST') {
        options.headers['Content-Type'] = 'application/json';
    }
    var t = document.getElementById('g_ck_token');
    var tok = t ? t.value : (window.g_ck || '');
    if (tok) options.headers['X-UserToken'] = tok;
    return fetch(url, options);
}

function showToast(msg, type) {
    var b = document.getElementById('regToast');
    if (!b) return;
    b.textContent = msg;
    b.className = 'toast ' + (type === 'error' ? 'toast-error' : 'toast-success');
    b.style.display = 'block';
    setTimeout(function() { b.style.display = 'none'; }, 4000);
}

function onEventSelectChange(sel) {
    var opt = sel.options[sel.selectedIndex];
    if (opt) {
        selectedRegFee = parseFloat(opt.getAttribute('data-fee') || '300');
        var dFee = document.getElementById('dispRegFee');
        if (dFee) dFee.textContent = '₹' + selectedRegFee.toFixed(2);
        var qAmt = document.getElementById('qrDispAmt');
        if (qAmt) qAmt.textContent = '₹' + selectedRegFee.toFixed(2);
    }
}

function handleProofFileSelected(event) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(e) {
        proofBase64 = e.target.result;
        var prev = document.getElementById('proofPreviewImg');
        if (prev) {
            prev.src = proofBase64;
            prev.style.display = 'block';
        }
    };
    reader.readAsDataURL(file);
}

function proceedToPaymentQR() {
    var evSel = document.getElementById('rEvent');
    var evId = evSel ? evSel.value : '';
    var name = (document.getElementById('rName').value || '').trim();
    var email = (document.getElementById('rEmail').value || '').trim();
    var phone = (document.getElementById('rPhone').value || '').trim();
    var college = (document.getElementById('rCollege').value || '').trim();

    if (!evId) return showToast('Please select an event.', 'error');
    if (!name) return showToast('Please enter your full legal name.', 'error');
    if (!email || email.indexOf('@') === -1) return showToast('Please enter a valid working email address.', 'error');
    if (!phone || phone.length !== 10) return showToast('Mobile phone number must be strictly 10 digits.', 'error');

    var btn = document.getElementById('btnProceedToPay');
    if (btn) { btn.disabled = true; btn.textContent = 'Generating UPI QR...'; }

    var payload = {
        event_sys_id: evId,
        name: name,
        email: email,
        phone: phone,
        college_organization: college,
        requested_amount: selectedRegFee
    };

    safeFetch('/api/x_2327324_konnect/konnectfest/registration', {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        if (btn) { btn.disabled = false; btn.textContent = 'Proceed to Registration Fee Payment →'; }
        var d = res.result || res;
        if (!d.success) return showToast(d.message || 'Registration failed.', 'error');

        createdPaymentId = d.paymentSysId;

        document.getElementById('step1Card').style.display = 'none';
        document.getElementById('step2Card').style.display = 'block';

        var upi = (d.upiId || '9849600480@ybl').trim();
        var payee = (d.payeeName || 'KonnectFest Committee').trim();
        var amt = parseFloat(d.amount || selectedRegFee).toFixed(2);
        var ref = d.paymentNumber || 'KFREG';

        document.getElementById('qrDispAmt').textContent = '₹' + amt;
        document.getElementById('qrDispUpi').textContent = upi;
        document.getElementById('qrDispPayee').textContent = payee;
        document.getElementById('qrDispRef').textContent = ref;

        // Render QR
        var qrBox = document.getElementById('regQrContainer');
        if (qrBox) {
            qrBox.innerHTML = '';
            var npciUri = 'upi://pay?pa=' + upi + '&pn=' + encodeURIComponent(payee) + '&am=' + amt + '&cu=INR&tn=' + ref;
            if (typeof QRCode !== 'undefined') {
                new QRCode(qrBox, {
                    text: npciUri,
                    width: 180,
                    height: 180,
                    colorDark: '#0f2e46',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.M
                });
            }
        }
    })
    .catch(function(err) {
        if (btn) { btn.disabled = false; btn.textContent = 'Proceed to Registration Fee Payment →'; }
        showToast('Server connection error: ' + err.message, 'error');
    });
}

function backToStep1() {
    document.getElementById('step2Card').style.display = 'none';
    document.getElementById('step1Card').style.display = 'block';
}

function submitRegistrationWithProof() {
    var utr = (document.getElementById('rUtr').value || '').trim();
    if (!utr || utr.length < 8) return showToast('Please enter your valid 12-digit bank UTR reference.', 'error');
    if (!proofBase64) return showToast('Please upload your payment screenshot/receipt proof.', 'error');

    var btn = document.getElementById('btnSubmitUtr');
    if (btn) { btn.disabled = true; btn.textContent = 'Submitting Proof...'; }

    safeFetch('/api/x_2327324_konnect/konnectfest/registration/submit-utr', {
        method: 'POST',
        body: JSON.stringify({
            payment_sys_id: createdPaymentId,
            utr_reference: utr,
            screenshot_data: proofBase64
        })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        document.getElementById('step2Card').style.display = 'none';
        document.getElementById('step3Card').style.display = 'block';
    })
    .catch(function(err) {
        if (btn) { btn.disabled = false; btn.textContent = 'Submit Registration & Proof →'; }
        showToast('Submission error: ' + err.message, 'error');
    });
}
`;

// ==============================================================
// 2. PARTICIPANT CLIENT SCRIPT
// ==============================================================
const participantClientScript = `
var currentParticipant = null;
var topUpProofBase64 = '';

function safeFetch(url, options) {
    options = options || {};
    options.credentials = 'omit';
    options.headers = options.headers || {};
    if (!options.headers['Content-Type'] && options.method && options.method.toUpperCase() === 'POST') {
        options.headers['Content-Type'] = 'application/json';
    }
    var t = document.getElementById('g_ck_token');
    var tok = t ? t.value : (window.g_ck || '');
    if (tok) options.headers['X-UserToken'] = tok;
    return fetch(url, options);
}

function showToast(msg, type) {
    var b = document.getElementById('pToast');
    if (!b) return;
    b.textContent = msg;
    b.className = 'toast ' + (type === 'error' ? 'toast-error' : 'toast-success');
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

function showForgotPasswordView() {
    document.getElementById('cardLogin').style.display = 'none';
    document.getElementById('cardForgotPassword').style.display = 'block';
    document.getElementById('otpStep1').style.display = 'block';
    document.getElementById('otpStep2').style.display = 'none';
}

function showLoginView() {
    document.getElementById('cardForgotPassword').style.display = 'none';
    document.getElementById('cardLogin').style.display = 'block';
}

function submitParticipantLogin() {
    var email = (document.getElementById('loginEmail').value || '').trim();
    var pwd = (document.getElementById('loginPassword').value || '').trim();

    if (!email) return showToast('Please enter your email.', 'error');
    if (!pwd) return showToast('Please enter your access password/PIN.', 'error');

    safeFetch('/api/x_2327324_konnect/konnectfest/participant/auth', {
        method: 'POST',
        body: JSON.stringify({ action: 'login', email: email, password: pwd })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        if (!d.success) return showToast(d.message || 'Login failed.', 'error');

        currentParticipant = d.participant;
        document.getElementById('cardLogin').style.display = 'none';
        document.getElementById('cardDashboard').style.display = 'block';
        document.getElementById('userNavActions').style.display = 'flex';
        document.getElementById('navUserName').textContent = currentParticipant.name;
        document.getElementById('dispCouponsBal').textContent = (currentParticipant.wallet_balance || 0) + ' Coupons';

        loadParticipantDashboard();
    })
    .catch(function(err) {
        showToast('Login server error: ' + err.message, 'error');
    });
}

function requestResetOtp() {
    var email = (document.getElementById('forgotEmail').value || '').trim();
    if (!email) return showToast('Please enter your registered email.', 'error');

    safeFetch('/api/x_2327324_konnect/konnectfest/participant/auth', {
        method: 'POST',
        body: JSON.stringify({ action: 'forgot_password', email: email })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        if (!d.success) return showToast(d.message || 'OTP request failed.', 'error');

        document.getElementById('otpStep1').style.display = 'none';
        document.getElementById('otpStep2').style.display = 'block';
        if (d.debug_otp) {
            document.getElementById('otpNoticeMsg').innerHTML = 'Verification PIN dispatched! For fest kiosk demo, your OTP is: <strong>' + d.debug_otp + '</strong>';
        }
        showToast('Verification PIN dispatched!', 'success');
    });
}

function submitResetPasswordWithOtp() {
    var email = (document.getElementById('forgotEmail').value || '').trim();
    var otp = (document.getElementById('resetOtpCode').value || '').trim();
    var newP = (document.getElementById('resetNewPassword').value || '').trim();
    var confP = (document.getElementById('resetConfirmPassword').value || '').trim();

    if (!otp) return showToast('Please enter the 6-digit OTP code.', 'error');
    if (!newP) return showToast('Please enter new password.', 'error');
    if (newP !== confP) return showToast('Passwords do not match.', 'error');

    safeFetch('/api/x_2327324_konnect/konnectfest/participant/auth', {
        method: 'POST',
        body: JSON.stringify({ action: 'reset_password', email: email, otp: otp, new_password: newP })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        if (!d.success) return showToast(d.message || 'Reset failed.', 'error');

        showToast('Password updated! Please log in.', 'success');
        showLoginView();
        document.getElementById('loginEmail').value = email;
    });
}

function openChangePasswordModal() { openModal('modalChangePassword'); }
function submitChangePassword() {
    if (!currentParticipant) return;
    var curP = (document.getElementById('cpCurrent').value || '').trim();
    var newP = (document.getElementById('cpNew').value || '').trim();
    var confP = (document.getElementById('cpConfirm').value || '').trim();

    if (!curP) return showToast('Please enter current password.', 'error');
    if (!newP) return showToast('Please enter new password.', 'error');
    if (newP !== confP) return showToast('Passwords do not match.', 'error');

    safeFetch('/api/x_2327324_konnect/konnectfest/participant/auth', {
        method: 'POST',
        body: JSON.stringify({ action: 'change_password', email: currentParticipant.email, current_password: curP, new_password: newP })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        closeModal('modalChangePassword');
        showToast(d.message || 'Password changed successfully!', d.success ? 'success' : 'error');
    });
}

function logoutParticipant() {
    currentParticipant = null;
    document.getElementById('cardDashboard').style.display = 'none';
    document.getElementById('userNavActions').style.display = 'none';
    document.getElementById('cardLogin').style.display = 'block';
}

function openTopUpModal() {
    openModal('modalTopUp');
    renderTopUpQR();
}

function renderTopUpQR() {
    var amt = parseFloat(document.getElementById('topUpAmount').value || '500');
    var area = document.getElementById('topUpQrArea');
    var box = document.getElementById('topUpQrContainer');
    if (area &amp;&amp; box) {
        area.style.display = 'block';
        box.innerHTML = '';
        var npci = 'upi://pay?pa=9849600480@ybl&amp;pn=KonnectFest&amp;am=' + amt.toFixed(2) + '&amp;cu=INR&amp;tn=TOPUP';
        if (typeof QRCode !== 'undefined') {
            new QRCode(box, { text: npci, width: 140, height: 140, colorDark: '#0f2e46', colorLight: '#ffffff' });
        }
    }
}

function handleTopUpFileSelected(event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        topUpProofBase64 = e.target.result;
        var prev = document.getElementById('topUpPreviewImg');
        if (prev) { prev.src = topUpProofBase64; prev.style.display = 'block'; }
    };
    reader.readAsDataURL(file);
}

function submitWalletTopUp() {
    if (!currentParticipant) return;
    var amt = parseFloat(document.getElementById('topUpAmount').value || '0');
    var utr = (document.getElementById('topUpUtr').value || '').trim();

    if (amt <= 0) return showToast('Please enter positive top-up amount.', 'error');
    if (!utr) return showToast('Please enter 12-digit bank UTR reference.', 'error');

    safeFetch('/api/x_2327324_konnect/konnectfest/wallet/topup', {
        method: 'POST',
        body: JSON.stringify({
            participant_sys_id: currentParticipant.sys_id,
            event_sys_id: currentParticipant.event_sys_id,
            amount: amt,
            utr_reference: utr,
            screenshot_data: topUpProofBase64
        })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        closeModal('modalTopUp');
        showToast('Top-Up submitted for Finance verification!', 'success');
    });
}

function lookupQrToken() {
    var token = (document.getElementById('pQrTokenInput').value || '').trim();
    if (!token) return showToast('Please paste or scan a vendor QR token.', 'error');

    safeFetch('/api/x_2327324_konnect/konnectfest/vendor/qr-details?token=' + encodeURIComponent(token))
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        if (!d.valid) return showToast(d.message || 'Invalid or expired QR token.', 'error');

        var tx = d.transaction;
        document.getElementById('revVendorName').textContent = tx.vendorName + ' (' + tx.stallNumber + ')';
        document.getElementById('revItemDesc').textContent = tx.itemDescription;
        document.getElementById('revTotalAmount').textContent = tx.amount + ' Coupons';
        document.getElementById('orderReviewBox').style.display = 'block';
        window.activePendingTxSysId = tx.sysId;
    });
}

function confirmCouponPayment() {
    if (!currentParticipant || !window.activePendingTxSysId) return;

    safeFetch('/api/x_2327324_konnect/konnectfest/purchase/confirm', {
        method: 'POST',
        body: JSON.stringify({
            transaction_sys_id: window.activePendingTxSysId,
            participant_sys_id: currentParticipant.sys_id
        })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        if (!d.success) return showToast(d.message || 'Payment failed.', 'error');

        showToast('Coupons transferred successfully! Order Confirmed.', 'success');
        document.getElementById('orderReviewBox').style.display = 'none';
        document.getElementById('pQrTokenInput').value = '';
        if (d.availableBalance !== undefined) {
            currentParticipant.wallet_balance = d.availableBalance;
            document.getElementById('dispCouponsBal').textContent = d.availableBalance + ' Coupons';
        }
        loadParticipantDashboard();
    });
}

function loadParticipantDashboard() {
    if (!currentParticipant) return;
    safeFetch('/api/x_2327324_konnect/konnectfest/participant/dashboard?participant_sys_id=' + currentParticipant.sys_id)
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        if (d.wallet) {
            document.getElementById('dispCouponsBal').textContent = (d.wallet.available_balance || 0) + ' Coupons';
        }
        var container = document.getElementById('pTxList');
        if (container &amp;&amp; d.transactions &amp;&amp; d.transactions.length > 0) {
            var html = '';
            d.transactions.forEach(function(tx) {
                html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--sn-border);">' +
                    '<div><strong>' + (tx.item_description || 'Purchase') + '</strong> &bull; ' + (tx.vendor_name || 'Vendor') + '</div>' +
                    '<div style="color:#b91c1c; font-weight:700;">-' + tx.amount + ' Coupons</div>' +
                '</div>';
            });
            container.innerHTML = html;
        }
    });
}
`;

// ==============================================================
// 3. VENDOR POS CLIENT SCRIPT
// ==============================================================
const vendorClientScript = `
var vendorMenu = [
    { id: 1, name: 'Cheese Pizza', price: 150, category: 'Food' },
    { id: 2, name: 'Veg Burger', price: 80, category: 'Food' },
    { id: 3, name: 'French Fries', price: 50, category: 'Snack' },
    { id: 4, name: 'Cold Coffee', price: 60, category: 'Beverage' },
    { id: 5, name: 'Popcorn Tub', price: 40, category: 'Snack' },
    { id: 6, name: 'Mineral Water', price: 20, category: 'Beverage' }
];

var cart = {};
var qrCountdownInterval = null;
var activeQrTxSysId = '';

function safeFetch(url, options) {
    options = options || {};
    options.credentials = 'omit';
    options.headers = options.headers || {};
    if (!options.headers['Content-Type'] && options.method && options.method.toUpperCase() === 'POST') {
        options.headers['Content-Type'] = 'application/json';
    }
    var t = document.getElementById('g_ck_token');
    var tok = t ? t.value : (window.g_ck || '');
    if (tok) options.headers['X-UserToken'] = tok;
    return fetch(url, options);
}

function showToast(msg, type) {
    var b = document.getElementById('vToast');
    if (!b) return;
    b.textContent = msg;
    b.className = 'toast ' + (type === 'error' ? 'toast-error' : 'toast-success');
    b.style.display = 'block';
    setTimeout(function() { b.style.display = 'none'; }, 4000);
}

function renderMenuGrid() {
    var container = document.getElementById('menuGridContainer');
    if (!container) return;

    var html = '';
    vendorMenu.forEach(function(item) {
        var count = cart[item.id] || 0;
        html += '<div class="menu-item-card" onclick="addToCart(' + item.id + ')">' +
            '<div>' +
                '<div class="item-name">' + item.name + '</div>' +
                '<div style="font-size:11px; color:var(--sn-muted);">' + item.category + '</div>' +
            '</div>' +
            '<div class="qty-controls" onclick="event.stopPropagation();">' +
                '<span class="item-price">' + item.price + ' C</span>' +
                '<div style="display:flex; align-items:center; gap:4px; margin-left:auto;">' +
                    '<button class="qty-btn" onclick="decrementCart(' + item.id + ')">-</button>' +
                    '<span style="font-weight:700; font-size:12px; min-width:14px; text-align:center;">' + count + '</span>' +
                    '<button class="qty-btn" onclick="addToCart(' + item.id + ')">+</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    });
    container.innerHTML = html;
}

function addToCart(itemId) {
    cart[itemId] = (cart[itemId] || 0) + 1;
    renderMenuGrid();
    renderCart();
}

function decrementCart(itemId) {
    if (cart[itemId] > 1) {
        cart[itemId]--;
    } else {
        delete cart[itemId];
    }
    renderMenuGrid();
    renderCart();
}

function clearCart() {
    cart = {};
    renderMenuGrid();
    renderCart();
    document.getElementById('qrDisplayBox').style.display = 'none';
    if (qrCountdownInterval) clearInterval(qrCountdownInterval);
}

function renderCart() {
    var container = document.getElementById('cartItemsList');
    var totalRow = document.getElementById('cartTotalRow');
    var totalVal = document.getElementById('cartTotalVal');

    var keys = Object.keys(cart);
    if (keys.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:20px; color:var(--sn-muted); font-size:13px;">Cart is empty. Tap items on the left to add.</div>';
        if (totalRow) totalRow.style.display = 'none';
        return;
    }

    var totalCoupons = 0;
    var html = '';
    keys.forEach(function(id) {
        var item = vendorMenu.find(function(m) { return m.id == id; });
        if (item) {
            var qty = cart[id];
            var lineTotal = item.price * qty;
            totalCoupons += lineTotal;
            html += '<div class="cart-line">' +
                '<span>' + qty + 'x ' + item.name + '</span>' +
                '<strong>' + lineTotal + ' Coupons</strong>' +
            '</div>';
        }
    });

    container.innerHTML = html;
    if (totalRow) totalRow.style.display = 'flex';
    if (totalVal) totalVal.textContent = totalCoupons + ' Coupons';
}

function openAddItemModal() {
    document.getElementById('modalAddItem').style.display = 'flex';
}

function saveCustomItem() {
    var name = (document.getElementById('mItemName').value || '').trim();
    var price = parseFloat(document.getElementById('mItemPrice').value || '0');

    if (!name || price <= 0) return showToast('Please enter item name and positive coupon price.', 'error');

    vendorMenu.push({ id: Date.now(), name: name, price: price, category: 'Custom' });
    document.getElementById('modalAddItem').style.display = 'none';
    document.getElementById('mItemName').value = '';
    document.getElementById('mItemPrice').value = '';
    renderMenuGrid();
    showToast('Menu item added successfully!', 'success');
}

function generateDynamicPosQR() {
    var keys = Object.keys(cart);
    if (keys.length === 0) return showToast('Cart is empty. Add items first.', 'error');

    var orderItems = [];
    var total = 0;
    keys.forEach(function(id) {
        var item = vendorMenu.find(function(m) { return m.id == id; });
        if (item) {
            orderItems.push(cart[id] + 'x ' + item.name);
            total += (item.price * cart[id]);
        }
    });

    var desc = orderItems.join(', ');

    safeFetch('/api/x_2327324_konnect/konnectfest/vendor/create-qr', {
        method: 'POST',
        body: JSON.stringify({
            amount: total,
            item_description: desc,
            expiry_seconds: 120
        })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        if (!d.success) return showToast(d.message || 'QR generation failed.', 'error');

        activeQrTxSysId = d.transactionSysId;
        var qrBox = document.getElementById('posQrCanvas');
        qrBox.innerHTML = '';
        if (typeof QRCode !== 'undefined') {
            new QRCode(qrBox, { text: d.qrToken, width: 160, height: 160, colorDark: '#0f2e46', colorLight: '#ffffff' });
        }

        document.getElementById('qrDisplayBox').style.display = 'block';
        document.getElementById('qrOrderTitle').textContent = desc + ' (' + total + ' Coupons)';
        document.getElementById('qrStatusAlert').innerHTML = '⏳ Awaiting participant coupon scan...';
        document.getElementById('qrStatusAlert').style.color = '#0072b2';

        startQrCountdown(120);
        startPollingForPayment();
    })
    .catch(function(err) {
        showToast('POS QR error: ' + err.message, 'error');
    });
}

function startQrCountdown(seconds) {
    if (qrCountdownInterval) clearInterval(qrCountdownInterval);
    var remaining = seconds;
    var badge = document.getElementById('qrTimerBadge');
    qrCountdownInterval = setInterval(function() {
        remaining--;
        if (badge) badge.textContent = '⏱️ QR Active: ' + remaining + 's remaining';
        if (remaining <= 0) {
            clearInterval(qrCountdownInterval);
            if (badge) badge.textContent = '❌ QR Expired';
            document.getElementById('qrStatusAlert').innerHTML = '⚠️ 120s Expired! Generate a new QR.';
            document.getElementById('qrStatusAlert').style.color = '#b91c1c';
        }
    }, 1000);
}

function startPollingForPayment() {
    var pollCount = 0;
    var poller = setInterval(function() {
        pollCount++;
        if (pollCount > 60 || !activeQrTxSysId) {
            clearInterval(poller);
            return;
        }

        safeFetch('/api/x_2327324_konnect/konnectfest/vendor/dashboard')
        .then(function(r) { return r.json(); })
        .then(function(res) {
            var d = res.result || res;
            if (d.recentTransactions) {
                var found = d.recentTransactions.find(function(t) { return t.sys_id === activeQrTxSysId &amp;&amp; t.status === 'success'; });
                if (found) {
                    clearInterval(poller);
                    if (qrCountdownInterval) clearInterval(qrCountdownInterval);
                    document.getElementById('qrStatusAlert').innerHTML = '✅ PAID! ' + found.amount + ' Coupons Transferred!';
                    document.getElementById('qrStatusAlert').style.color = '#15803d';
                    showToast('Order Paid Successfully!', 'success');
                    clearCart();
                    loadVendorDashboard();
                }
            }
        });
    }, 2000);
}

function loadVendorDashboard() {
    safeFetch('/api/x_2327324_konnect/konnectfest/vendor/dashboard')
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        if (d.vendor) {
            document.getElementById('dispStallCode').textContent = d.vendor.stall_number || 'Stall #01';
            document.getElementById('dispVendorBrand').textContent = d.vendor.name || 'Vendor Stall';
        }
        var totalCoupons = 0;
        var tbody = document.getElementById('vendorSalesBody');
        if (tbody &amp;&amp; d.recentTransactions &amp;&amp; d.recentTransactions.length > 0) {
            var html = '';
            d.recentTransactions.forEach(function(tx) {
                totalCoupons += (tx.amount || 0);
                html += '<tr>' +
                    '<td>' + (tx.time || 'Recent') + '</td>' +
                    '<td>' + (tx.item_description || 'Order') + '</td>' +
                    '<td style="text-align:right; font-weight:700; color:#15803d;">' + tx.amount + '</td>' +
                    '<td style="text-align:center;"><span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:10px; font-weight:700;">Success</span></td>' +
                '</tr>';
            });
            tbody.innerHTML = html;
            document.getElementById('dispTotalSalesTally').textContent = 'Total: ' + totalCoupons + ' Coupons';
        }
    });
}

renderMenuGrid();
renderCart();
loadVendorDashboard();
`;

// ==============================================================
// 4. FINANCE CLIENT SCRIPT
// ==============================================================
const financeClientScript = `
var currentFinanceQueues = null;
var activeVerifyPaymentId = '';

function safeFetch(url, options) {
    options = options || {};
    options.credentials = 'omit';
    options.headers = options.headers || {};
    if (!options.headers['Content-Type'] && options.method && options.method.toUpperCase() === 'POST') {
        options.headers['Content-Type'] = 'application/json';
    }
    var t = document.getElementById('g_ck_token');
    var tok = t ? t.value : (window.g_ck || '');
    if (tok) options.headers['X-UserToken'] = tok;
    return fetch(url, options);
}

function showToast(msg, type) {
    var b = document.getElementById('fToast');
    if (!b) return;
    b.textContent = msg;
    b.className = 'toast ' + (type === 'error' ? 'toast-error' : 'toast-success');
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

function switchFinTab(tabId, btn) {
    var contents = document.querySelectorAll('.fin-tab-content');
    contents.forEach(function(c) { c.style.display = 'none'; });
    var target = document.getElementById(tabId);
    if (target) target.style.display = 'block';

    var btns = document.querySelectorAll('.tab-btn');
    btns.forEach(function(b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
}

function loadFinanceQueues() {
    safeFetch('/api/x_2327324_konnect/konnectfest/finance/queues')
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        currentFinanceQueues = d;
        renderFinanceQueues(d);
    })
    .catch(function(err) {
        console.error('Finance queues fetch error:', err);
    });
}

function renderFinanceQueues(d) {
    if (!d) return;

    var pending = d.pendingPayments || [];

    // Tab 1: Registration Fees
    var regPayments = pending.filter(function(p) { return p.type === 'initial_registration'; });
    var rTbody = document.getElementById('regQueueBody');
    if (rTbody) {
        if (regPayments.length === 0) {
            rTbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:18px; color:var(--sn-muted);">No pending registration payments.</td></tr>';
        } else {
            var rHtml = '';
            regPayments.forEach(function(p) {
                rHtml += '<tr>' +
                    '<td style="font-family:monospace; font-weight:700;">' + (p.number || p.sys_id.slice(0, 6)) + '</td>' +
                    '<td><strong>' + (p.participant_name || 'Attendee') + '</strong></td>' +
                    '<td style="font-weight:700; color:#15803d;">₹' + p.requested_amount + '</td>' +
                    '<td style="font-family:monospace;">' + (p.utr_reference || '-') + '</td>' +
                    '<td><button class="sn-btn sn-btn-view" onclick="viewProofModal(\\'' + p.sys_id + '\\')">📷 View Proof</button></td>' +
                    '<td><span class="badge badge-reg">Fee Pending</span></td>' +
                    '<td>' +
                        '<button class="sn-btn sn-btn-verify" onclick="verifyPayment(\\'' + p.sys_id + '\\', ' + p.requested_amount + ')">✓ Verify &amp; Activate</button> ' +
                        '<button class="sn-btn sn-btn-reject" onclick="rejectPayment(\\'' + p.sys_id + '\\')">✕ Reject</button>' +
                    '</td>' +
                '</tr>';
            });
            rTbody.innerHTML = rHtml;
        }
    }

    // Tab 2: Top-Ups
    var topUpPayments = pending.filter(function(p) { return p.type === 'event_topup'; });
    var tTbody = document.getElementById('topUpQueueBody');
    if (tTbody) {
        if (topUpPayments.length === 0) {
            tTbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:18px; color:var(--sn-muted);">No pending top-up requests.</td></tr>';
        } else {
            var tHtml = '';
            topUpPayments.forEach(function(p) {
                tHtml += '<tr>' +
                    '<td style="font-family:monospace; font-weight:700;">' + (p.number || p.sys_id.slice(0, 6)) + '</td>' +
                    '<td><strong>' + (p.participant_name || 'Participant') + '</strong></td>' +
                    '<td style="font-weight:700; color:#15803d;">' + p.requested_amount + ' Coupons</td>' +
                    '<td style="font-family:monospace;">' + (p.utr_reference || '-') + '</td>' +
                    '<td><button class="sn-btn sn-btn-view" onclick="viewProofModal(\\'' + p.sys_id + '\\')">📷 View Proof</button></td>' +
                    '<td><span class="badge badge-topup">Top-Up Review</span></td>' +
                    '<td>' +
                        '<button class="sn-btn sn-btn-verify" onclick="verifyPayment(\\'' + p.sys_id + '\\', ' + p.requested_amount + ')">✓ Credit Coupons</button> ' +
                        '<button class="sn-btn sn-btn-reject" onclick="rejectPayment(\\'' + p.sys_id + '\\')">✕ Reject</button>' +
                    '</td>' +
                '</tr>';
            });
            tTbody.innerHTML = tHtml;
        }
    }
}

function viewProofModal(paymentSysId) {
    activeVerifyPaymentId = paymentSysId;
    var p = (currentFinanceQueues.pendingPayments || []).find(function(x) { return x.sys_id === paymentSysId; });
    if (!p) return;

    document.getElementById('mProofAttendee').textContent = p.participant_name;
    document.getElementById('mProofUtr').textContent = p.utr_reference || 'N/A';
    document.getElementById('mProofAmount').textContent = '₹' + p.requested_amount;

    var img = document.getElementById('mProofImg');
    var noImg = document.getElementById('mProofNoImg');
    if (p.screenshot_data) {
        img.src = p.screenshot_data;
        img.style.display = 'block';
        noImg.style.display = 'none';
    } else {
        img.style.display = 'none';
        noImg.style.display = 'block';
    }

    openModal('modalProofView');
}

function verifyFromModal() {
    if (!activeVerifyPaymentId) return;
    var p = (currentFinanceQueues.pendingPayments || []).find(function(x) { return x.sys_id === activeVerifyPaymentId; });
    var amt = p ? p.requested_amount : 300;
    closeModal('modalProofView');
    verifyPayment(activeVerifyPaymentId, amt);
}

function verifyPayment(paymentSysId, amount) {
    safeFetch('/api/x_2327324_konnect/konnectfest/finance/verify-payment', {
        method: 'POST',
        body: JSON.stringify({ payment_sys_id: paymentSysId, verified_amount: amount })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        var d = res.result || res;
        showToast(d.message || 'Payment verified successfully!', 'success');
        loadFinanceQueues();
    });
}

function rejectPayment(paymentSysId) {
    var reason = prompt('Please enter reason for rejection:', 'UTR reference does not match bank records');
    if (!reason) return;

    safeFetch('/api/x_2327324_konnect/konnectfest/finance/reject-payment', {
        method: 'POST',
        body: JSON.stringify({ payment_sys_id: paymentSysId, rejection_reason: reason })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
        showToast('Payment rejected.', 'error');
        loadFinanceQueues();
    });
}

loadFinanceQueues();
setInterval(loadFinanceQueues, 5000);
`;

// ==============================================================
// 5. INJECT ALL SCRIPTS INTO restEndpoints.ts
// ==============================================================
let restCode = fs.readFileSync('src/server/restEndpoints.ts', 'utf8');
const marker = 'const CLIENT_SCRIPTS: Record<string, string> = ';
const cIdx = restCode.indexOf(marker);

if (cIdx !== -1) {
    const semi = restCode.indexOf(';\n', cIdx);
    const jsonStr = restCode.slice(cIdx + marker.length, semi);
    const clientScripts = JSON.parse(jsonStr);

    clientScripts['register'] = registerClientScript;
    clientScripts['participant'] = participantClientScript;
    clientScripts['vendor'] = vendorClientScript;
    clientScripts['finance'] = financeClientScript;

    restCode = restCode.slice(0, cIdx + marker.length) + JSON.stringify(clientScripts) + restCode.slice(semi);
    fs.writeFileSync('src/server/restEndpoints.ts', restCode, 'utf8');
    console.log('5. Successfully injected all 4 validated client scripts into restEndpoints.ts!');
}
