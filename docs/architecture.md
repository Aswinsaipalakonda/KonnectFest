# KonnectFest Application Architecture

## 1. System Overview

KonnectFest operates as a native ServiceNow scoped application (`x_495021_konnect`). The application architecture separates responsibilities into four distinct layers:

1. **Data Model Layer (ServiceNow Tables & Dictionaries)**
   - Normalized relational tables with explicit foreign keys.
   - Fixed scale decimals for currency (`INR`), ensuring consistent arithmetic.
   - Comprehensive audit logging and ledger immutability.

2. **Server-Side Domain Logic (Script Includes & Business Rules)**
   - `KonnectFestWalletService`: Atomic ledger balance calculator, balance reservation, and debit/credit mutations.
   - `KonnectFestQRService`: Ephemeral cryptographic token generator with 60-second expiration and single-use enforcement.
   - `KonnectFestPaymentService`: State transitions for registration and top-up verification.
   - `KonnectFestRefundService`: Pre-flight validation, hold reservation, and payout finalization.
   - `KonnectFestSettlementService`: Vendor sales ledger batching and settlement reporting.

3. **API Layer (Scripted REST APIs)**
   - Scoped REST API namespace: `/api/x_495021_konnect/v1/`
   - Uniform JSON response formats (`status`, `data`, `error`, `timestamp`).
   - ACL-enforced endpoints requiring valid session or API credentials.

4. **Experience Layer (UI Pages & Workspaces)**
   - Participant Mobile Portal (`x_495021_konnect_participant_portal.do`)
   - Vendor QR Workspace (`x_495021_konnect_vendor_workspace.do`)
   - Finance Settlement Workspace (`x_495021_konnect_financer_workspace.do`)
   - Organizer Control Dashboard (`x_495021_konnect_organizer_dashboard.do`)

---

## 2. Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                              SERVICE-NOW INSTANCE                                 |
|                                                                                   |
|  [Participant Portal]     [Vendor Workspace]     [Financer Queue]  [Organizer Dash]
|         |                        |                      |                 |       |
|         +------------------------+----------------------+-----------------+       |
|                                  |                                                |
|                   [Scripted REST API: /v1/*]                                      |
|                                  |                                                |
|             +--------------------+---------------------+                          |
|             |          SECURITY & ACCESS LAYER        |                          |
|             |   Role Verification & ACL Evaluation    |                          |
|             +--------------------+---------------------+                          |
|                                  |                                                |
|        +-------------------------+-------------------------+                      |
|        |                  CORE SERVICES                    |                      |
|        | - KonnectFestWalletService     (Ledger & Balances)|                      |
|        | - KonnectFestQRService         (Token Life-cycle) |                      |
|        | - KonnectFestPaymentService    (Bank UTR Verification)                   |
|        | - KonnectFestRefundService     (Holds & Payouts)  |                      |
|        | - KonnectFestSettlementService (Vendor Batches)   |                      |
|        +-------------------------+-------------------------+                      |
|                                  |                                                |
|             +--------------------+---------------------+                          |
|             |          DATABASE TABLES (Fluent)        |                          |
|             | Event | Participant | Vendor | Payment   |                          |
|             | Wallet | Wallet Ledger | Purchase Tx     |                          |
|             | Vendor Ledger | Digital Coupon | Refund  |                          |
|             +------------------------------------------+                          |
+-----------------------------------------------------------------------------------+
                                   | (External Bank Reconciliation)
                                   v
             [Off-Platform Bank/UPI Rails (Manual Financer Verification)]
```
