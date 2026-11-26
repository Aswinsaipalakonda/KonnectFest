# KonnectFest Security and Access Control Matrix

## 1. Roles Defined

| Role Name | Scope Identifier | Description |
|-----------|------------------|-------------|
| Organizer / Admin | `x_2327324_konnect.organizer_admin` | Full management of events, vendors, participants, reports, and event completion |
| Financer | `x_2327324_konnect.financer` | Verification of bank payments (UTR), top-ups, refund approvals, and vendor settlements |
| Vendor | `x_2327324_konnect.vendor` | Stall operation, purchase QR generation, and viewing own sales |
| Participant | `x_2327324_konnect.participant` | Mobile wallet viewing, top-up requests, QR scan-to-confirm, and post-event refund claims |

---

## 2. Table-Level ACL Matrix

| Table | Organizer/Admin | Financer | Vendor | Participant |
|-------|-----------------|----------|--------|-------------|
| `Event` | Create, Read, Write | Read | Read | Read |
| `Participant` | Read, Write | Read, Write (verify) | No Access | Read (Own Record) |
| `Registration` | Read, Write | Read, Write (verify) | No Access | Read (Own Record) |
| `Vendor` | Create, Read, Write | Read | Read (Own Record) | Read (List of Vendors) |
| `Vendor Stall` | Create, Read, Write | Read | Read (Own Stall) | Read |
| `Payment` | Read | Read, Write (Verify/Reject) | No Access | Create (Top-up), Read (Own) |
| `Wallet` | Read | Read | No Access | Read (Own Wallet) |
| `Wallet Ledger` | Read | Read | No Access | Read (Own Ledger) |
| `Purchase Transaction` | Read | Read | Create, Read (Own Vendor) | Read, Write (Confirm Own) |
| `Vendor Ledger` | Read | Read | Read (Own Vendor) | No Access |
| `Digital Coupon` | Read | Read | Read (Own Vendor) | Read (Own Coupons) |
| `Refund Request` | Read | Read, Write (Approve/Pay) | No Access | Create, Read (Own) |
| `Vendor Settlement` | Read, Write | Create, Read, Write | Read (Own Vendor) | No Access |
| `Audit Log` | Read | Read | No Access | No Access |

---

## 3. Row-Level & Integrity Security Rules

1. **Participant Isolation**:
   - `participant` can query only records where `sys_user == gs.getUserID()` or `participant.sys_user == gs.getUserID()`.
2. **Vendor Isolation**:
   - `vendor` can access transactions, stall, and vendor ledger records only where `assigned_user == gs.getUserID()`.
3. **Immutability of Ledgers**:
   - Business Rules prevent direct `UPDATE` or `DELETE` on `Wallet Ledger` and `Vendor Ledger` records after creation. Reversals must be recorded as explicit adjustment ledger entries.
4. **Server-Authoritative Balances**:
   - Client and REST callers cannot set `available_balance` or `reserved_balance` directly. All updates are executed through `KonnectFestWalletService`.
