const fs = require('fs');

console.log('=== 2. GENERATING PARTICIPANT PORTAL WITH OTP & PASSWORD MANAGEMENT ===');

const participantHtml = `<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide">
<g:evaluate var="jvar_ck">gs.getSessionToken();</g:evaluate>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KonnectFest - Participant Wallet Portal</title>
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
        .portal-nav {
            background-color: var(--sn-header);
            color: #fff;
            padding: 12px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .nav-brand { font-size: 16px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
        .nav-user-actions { display: flex; align-items: center; gap: 12px; font-size: 13px; }
        .nav-btn {
            background: rgba(255,255,255,0.12);
            color: #fff;
            border: 1px solid rgba(255,255,255,0.2);
            padding: 5px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            text-decoration: none;
        }
        .nav-btn:hover { background: rgba(255,255,255,0.2); }
        .portal-container {
            max-width: 680px;
            margin: 32px auto;
            width: 100%;
            padding: 0 16px;
        }
        .portal-card {
            background: #fff;
            border: 1px solid var(--sn-border);
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.03);
        }
        .form-group { margin-bottom: 14px; }
        .form-label { display: block; font-size: 12px; font-weight: 600; margin-bottom: 5px; }
        .form-input {
            width: 100%;
            padding: 9px 12px;
            border: 1px solid var(--sn-border);
            border-radius: 6px;
            font-size: 13px;
            outline: none;
            color: var(--sn-text);
        }
        .form-input:focus { border-color: var(--sn-primary); }
        .sn-btn {
            padding: 9px 16px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        .sn-btn-primary { background: var(--sn-primary); color: #fff; width: 100%; justify-content: center; }
        .sn-btn-primary:hover { background: var(--sn-primary-hover); }
        .sn-btn-success { background: #15803d; color: #fff; }
        .sn-btn-outline { background: #fff; border: 1px solid var(--sn-border); color: var(--sn-text); }
        
        /* Wallet Balance Banner */
        .wallet-banner {
            background: linear-gradient(135deg, #0f2e46, #164e63);
            color: #fff;
            border-radius: 8px;
            padding: 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        .wallet-val { font-size: 32px; font-weight: 800; margin-top: 4px; }
        .wallet-sub { font-size: 12px; color: #94a3b8; }
        
        /* Modal */
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(15, 23, 42, 0.6);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        .modal-box {
            background: #fff;
            border-radius: 8px;
            width: 480px;
            max-width: 90vw;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            overflow: hidden;
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
        .modal-body { padding: 18px; }
        .modal-footer {
            padding: 12px 18px;
            border-top: 1px solid var(--sn-border);
            display: flex;
            justify-content: flex-end;
            gap: 10px;
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
        .toast-error { background: #b91c1c; }
        .toast-success { background: #15803d; }
    </style>
</head>
<body>
    <input type="hidden" id="g_ck_token" value="\${jvar_ck}" />

    <header class="portal-nav">
        <div class="nav-brand">
            <span style="color:#22c55e;">✦</span> KonnectFest Participant Portal
        </div>
        <div class="nav-user-actions" id="userNavActions" style="display:none;">
            <span id="navUserName" style="font-weight:600;">Attendee</span>
            <button class="nav-btn" onclick="openChangePasswordModal()">Change Password</button>
            <button class="nav-btn" onclick="logoutParticipant()">Log Out</button>
        </div>
    </header>

    <div class="portal-container">
        <!-- 1. LOGIN SCREEN -->
        <div class="portal-card" id="cardLogin">
            <h1 style="font-size:20px; font-weight:700; margin-bottom:4px;">Participant Wallet Sign In</h1>
            <p style="font-size:13px; color:var(--sn-muted); margin-bottom:20px;">
                Enter your registered festival email and access password/PIN to view your coupons and make purchases.
            </p>

            <div class="form-group">
                <label class="form-label">Registered Email Address</label>
                <input type="email" id="loginEmail" class="form-input" placeholder="e.g. attendee@gmail.com" />
            </div>

            <div class="form-group">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <label class="form-label">Access Password / PIN</label>
                    <a href="javascript:void(0)" style="font-size:12px; color:var(--sn-primary); text-decoration:none;" onclick="showForgotPasswordView()">Forgot Password?</a>
                </div>
                <input type="password" id="loginPassword" class="form-input" placeholder="Enter your access PIN" />
            </div>

            <button type="button" class="sn-btn sn-btn-primary" onclick="submitParticipantLogin()">
                Log In to Wallet Portal &rarr;
            </button>

            <div style="margin-top:16px; text-align:center; font-size:12px; color:var(--sn-muted);">
                Haven't registered yet? <a href="/x_2327324_konnect_register.do" style="color:var(--sn-primary); font-weight:600;">Register Here</a>
            </div>
        </div>

        <!-- 2. FORGOT PASSWORD (OTP RESET LIKE BIG SAAS PLATFORMS) -->
        <div class="portal-card" id="cardForgotPassword" style="display:none;">
            <h1 style="font-size:20px; font-weight:700; margin-bottom:4px;">Reset Password with OTP</h1>
            <p style="font-size:13px; color:var(--sn-muted); margin-bottom:20px;">
                Enter your registered email address to receive a secure 6-digit verification PIN.
            </p>

            <div id="otpStep1">
                <div class="form-group">
                    <label class="form-label">Registered Email Address</label>
                    <input type="email" id="forgotEmail" class="form-input" placeholder="e.g. attendee@gmail.com" />
                </div>
                <button type="button" class="sn-btn sn-btn-primary" onclick="requestResetOtp()">
                    Send 6-Digit Verification PIN &rarr;
                </button>
            </div>

            <div id="otpStep2" style="display:none; margin-top:16px;">
                <div style="background:#e0f2fe; border:1px solid #bae6fd; padding:10px 14px; border-radius:6px; font-size:12px; color:#0369a1; margin-bottom:14px;" id="otpNoticeMsg">
                    Verification PIN dispatched! Please check your email inbox.
                </div>
                <div class="form-group">
                    <label class="form-label">Enter 6-Digit Verification PIN</label>
                    <input type="text" id="resetOtpCode" class="form-input" placeholder="e.g. 583921" maxlength="6" inputmode="numeric" />
                </div>
                <div class="form-group">
                    <label class="form-label">New Access Password / PIN</label>
                    <input type="password" id="resetNewPassword" class="form-input" placeholder="Enter new password" />
                </div>
                <div class="form-group">
                    <label class="form-label">Confirm New Password</label>
                    <input type="password" id="resetConfirmPassword" class="form-input" placeholder="Confirm new password" />
                </div>
                <button type="button" class="sn-btn sn-btn-primary" onclick="submitResetPasswordWithOtp()">
                    Reset Password &amp; Log In &rarr;
                </button>
            </div>

            <div style="margin-top:16px; text-align:center;">
                <a href="javascript:void(0)" style="font-size:12px; color:var(--sn-muted);" onclick="showLoginView()">&larr; Back to Login</a>
            </div>
        </div>

        <!-- 3. PARTICIPANT ACTIVE DASHBOARD -->
        <div id="cardDashboard" style="display:none;">
            <!-- Wallet Balance Card -->
            <div class="wallet-banner">
                <div>
                    <div style="font-size:12px; text-transform:uppercase; color:#94a3b8; font-weight:600;">Available Festival Cash / Coupons</div>
                    <div class="wallet-val" id="dispCouponsBal">0 Coupons</div>
                    <div class="wallet-sub">1 Coupon = ₹1.00 INR &bull; Digital Currency for All Stalls</div>
                </div>
                <button class="sn-btn sn-btn-success" onclick="openTopUpModal()">
                    + Top-Up Coupons
                </button>
            </div>

            <!-- Pay Vendor via 120s QR -->
            <div class="portal-card">
                <h2 style="font-size:16px; font-weight:700; margin-bottom:4px;">Exchange Coupons at Vendor Stall</h2>
                <p style="font-size:12px; color:var(--sn-muted); margin-bottom:14px;">
                    Scan the vendor's 120-second dynamic POS QR code or enter the payment token below.
                </p>

                <div class="form-group">
                    <label class="form-label">Vendor 120-Second QR Token</label>
                    <input type="text" id="pQrTokenInput" class="form-input" placeholder="Paste or scan vendor QR token (KF_QR_...)" />
                </div>
                <button type="button" class="sn-btn sn-btn-primary" onclick="lookupQrToken()">
                    Review Order &amp; Pay Coupons &rarr;
                </button>

                <!-- Order Review Card -->
                <div id="orderReviewBox" style="display:none; background:#f8fafc; border:1px solid var(--sn-border); border-radius:6px; padding:16px; margin-top:16px;">
                    <div style="font-weight:700; font-size:14px; margin-bottom:4px;" id="revVendorName">Vendor Stall</div>
                    <div style="font-size:12px; color:var(--sn-muted); margin-bottom:10px;" id="revItemDesc">Items Description</div>
                    <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--sn-border); padding-top:10px; margin-top:10px;">
                        <span style="font-size:13px; font-weight:600;">Total Coupons:</span>
                        <strong style="font-size:18px; color:#15803d;" id="revTotalAmount">0 Coupons</strong>
                    </div>
                    <button type="button" class="sn-btn sn-btn-primary" style="background:#15803d; margin-top:14px;" onclick="confirmCouponPayment()">
                        Confirm &amp; Transfer Coupons &rarr;
                    </button>
                </div>
            </div>

            <!-- Transaction Ledger -->
            <div class="portal-card">
                <h2 style="font-size:15px; font-weight:700; margin-bottom:12px;">Coupon Transactions &amp; Receipts</h2>
                <div id="pTxList" style="font-size:12px;">
                    <div style="text-align:center; padding:18px; color:var(--sn-muted);">No transactions recorded.</div>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL 1: TOP-UP WALLET WITH PROOF -->
    <div id="modalTopUp" class="modal-overlay">
        <div class="modal-box">
            <div class="modal-header">
                <span>Top-Up Festival Digital Coupons</span>
                <span style="cursor:pointer;" onclick="closeModal('modalTopUp')">✕</span>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Top-Up Amount (INR / Coupons)</label>
                    <input type="number" id="topUpAmount" class="form-input" placeholder="e.g. 500" min="50" step="50" onchange="renderTopUpQR()" />
                </div>

                <div id="topUpQrArea" style="text-align:center; display:none; margin-bottom:14px;">
                    <div id="topUpQrContainer" style="display:inline-block; padding:8px; border:1px solid var(--sn-border); border-radius:6px; background:#fff;"></div>
                    <div style="font-size:11px; color:var(--sn-muted); margin-top:6px;">Scan with GPay, PhonePe, or Paytm</div>
                </div>

                <div class="form-group">
                    <label class="form-label">12-Digit Bank Transfer UTR <span style="color:#b91c1c;">*</span></label>
                    <input type="text" id="topUpUtr" class="form-input" placeholder="e.g. 839201928374" maxlength="24" />
                </div>

                <div class="form-group">
                    <label class="form-label">Upload Payment Proof Screenshot</label>
                    <input type="file" id="topUpProofFile" accept="image/*" class="form-input" onchange="handleTopUpFileSelected(event)" />
                    <img id="topUpPreviewImg" style="max-width:100%; max-height:140px; margin-top:8px; display:none; border-radius:4px;" />
                </div>
            </div>
            <div class="modal-footer">
                <button class="sn-btn sn-btn-outline" onclick="closeModal('modalTopUp')">Cancel</button>
                <button class="sn-btn sn-btn-primary" style="width:auto;" onclick="submitWalletTopUp()">Submit Top-Up Proof</button>
            </div>
        </div>
    </div>

    <!-- MODAL 2: CHANGE PASSWORD -->
    <div id="modalChangePassword" class="modal-overlay">
        <div class="modal-box">
            <div class="modal-header">
                <span>Change Access Password</span>
                <span style="cursor:pointer;" onclick="closeModal('modalChangePassword')">✕</span>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Current Password / PIN</label>
                    <input type="password" id="cpCurrent" class="form-input" />
                </div>
                <div class="form-group">
                    <label class="form-label">New Password</label>
                    <input type="password" id="cpNew" class="form-input" />
                </div>
                <div class="form-group">
                    <label class="form-label">Confirm New Password</label>
                    <input type="password" id="cpConfirm" class="form-input" />
                </div>
            </div>
            <div class="modal-footer">
                <button class="sn-btn sn-btn-outline" onclick="closeModal('modalChangePassword')">Cancel</button>
                <button class="sn-btn sn-btn-primary" style="width:auto;" onclick="submitChangePassword()">Update Password</button>
            </div>
        </div>
    </div>

    <div id="pToast" class="toast"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    <script src="/api/x_2327324_konnect/konnectfest/public/script?page=participant"></script>
</body>
</html>
</j:jelly>`;

fs.writeFileSync('src/fluent/pages/participant.html', participantHtml, 'utf8');
console.log('2. Generated src/fluent/pages/participant.html with OTP reset and password management!');
