# KonnectFest — Event Commerce and Digital Wallet Management

KonnectFest is a native ServiceNow scoped application designed for college festivals, corporate events, and conferences. It replaces physical coupons, paper tokens, and fragmented vendor tally sheets with an event-scoped digital wallet, QR-code based vendor checkout, strict double-entry ledger tracking, and human-verified financial controls.

---

## 🎯 Key Capabilities

- **Event-Scoped Wallets**: Participant wallets isolated per event with prefilled UPI QR funding.
- **Financer-Verified Funding**: No money is credited to a wallet without actual bank receipt verification by Finance (UTR/reference check).
- **Vendor-Initiated Checkout**: Vendor specifies item and amount; system generates a secure, single-use, 60-second QR token.
- **Participant Scan & Consent**: Participant scans QR, verifies the exact item and amount on their mobile device, and confirms with atomic server-side validation.
- **Reconciliation Invariant**:
  $$\text{Participant Wallet Debit} = \text{Vendor Ledger Credit} = \text{Transaction Amount} = \text{Coupon Receipt Value}$$
- **Post-Event Unused Balance Refund**: Participants request balance return after event completion; funds are reserved on hold until Finance executes external bank payout and logs UTR reference.
- **Vendor Settlement**: Automated batching of vendor credits with net payable computation and payout tracking.

---

## 🏗️ Architecture & Technical Stack

- **Target Instance**: `https://dev495021.service-now.com`
- **Application Scope**: `x_2327324_konnect`
- **SDK**: ServiceNow Fluent SDK v4.14.3 (`@servicenow/sdk`, `@servicenow/glide`)
- **Runtime**: Native ServiceNow Platform (Server Scripts, Business Rules, Script Includes, Scripted REST APIs, Native UI Pages, and ACLs)
- **Currency**: INR (₹)
- **Timezone**: Asia/Kolkata (`IST`)

---

## 👥 Application Roles

1. **`x_2327324_konnect.organizer_admin`** (Organizer / Administrator): Manages events, stalls, vendors, bulk wallet allocation, and event closure.
2. **`x_2327324_konnect.financer`** (Financer): Verifies registration payments, top-up bank UTRs, approves refunds, and processes vendor settlements.
3. **`x_2327324_konnect.vendor`** (Vendor): Operates assigned stall, enters purchases, displays 60-second transaction QR, and tracks stall sales.
4. **`x_2327324_konnect.participant`** (Participant): Registers, views wallet balance and ledger history, confirms vendor purchases, and requests unused balance refund.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (Node v24.13.0 verified)
- ServiceNow SDK: `@servicenow/sdk`
- Access to ServiceNow instance `dev495021.service-now.com`

### Build & Deploy Commands

```bash
# 1. Install dependencies
npm install

# 2. Build application metadata and TypeScript sources
npm run build

# 3. Configure instance credentials (alias: konnectfest-dev)
now-sdk auth --add https://dev495021.service-now.com --type basic --alias konnectfest-dev

# 4. Deploy to target instance
npm run deploy -- --auth konnectfest-dev
```

---

## 🔒 Security & Integrity Principles

- **No Secrets in Code**: Credentials managed via encrypted ServiceNow SDK keystore.
- **Least Privilege Access**: Participant and Vendor data strictly isolated via table-level and row-level ACLs.
- **Idempotency**: All ledger credits and debits require unique idempotency keys to eliminate double-crediting or duplicate redemptions.
- **Server Authoritative**: Form inputs never directly alter balances; all financial mutations occur within server-side Script Includes with concurrency guards.
