# KonnectFest Test Suite Documentation

## Test Categories

1. **Unit Tests**:
   - `KonnectFestWalletService`: Balance calculations, balance reservation, negative balance prevention.
   - `KonnectFestQRService`: QR token generation, single-use invalidation, expiry calculations.
   - `KonnectFestPaymentService`: State transitions, idempotency checks.

2. **Integration & Workflow Tests**:
   - End-to-end registration verification -> wallet initialization.
   - Vendor QR generation -> participant scan -> atomic debit/credit.
   - Post-event balance refund -> hold reservation -> payout confirmation.
   - Duplicate redemption prevention (replay attack protection).
   - Concurrency tests (race condition handling on balance debits).

3. **Security & ACL Tests**:
   - Participant cross-tenant data isolation.
   - Vendor cross-vendor data isolation.
   - Non-admin restricted access to financial ledgers.
