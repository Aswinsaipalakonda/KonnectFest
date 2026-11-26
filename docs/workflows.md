# KonnectFest End-to-End Workflows

## 1. Registration & Account Provisioning Workflow

```
[Participant]                   [ServiceNow Platform]                   [Financer]
      |                                   |                                  |
      |-- 1. Fills Registration Form ---->|                                  |
      |   (Name, Email, Phone, College)   |                                  |
      |                                   |-- 2. Creates Participant Record  |
      |                                   |      (status: pending_verification)
      |                                   |                                  |
      |-- 3. Pays initial fee via UPI --->|                                  |
      |   & submits Bank UTR reference    |-- 4. Creates Payment Record ---->|
      |                                   |      (status: under_review)      |
      |                                   |                                  |-- 5. Checks Bank Statement
      |                                   |                                  |      for UTR & Amount
      |                                   |                                  |
      |                                   |<-- 6. Marks Payment VERIFIED ----|
      |                                   |
      |                                   |-- 7. Auto-provisions sys_user
      |                                   |      Assigns Participant Role
      |                                   |-- 8. Initializes Event Wallet
      |                                   |      (Balance = Verified Amount)
      |                                   |-- 9. Creates Initial Credit Ledger
      |<-- 10. Activation / Credential ---|
```

---

## 2. Vendor Purchase & QR Redemption Workflow

```
[Vendor]                        [ServiceNow Platform]                   [Participant]
      |                                   |                                   |
      |-- 1. Enters item & amount ------->|                                   |
      |                                   |-- 2. Creates PENDING Purchase Tx  |
      |                                   |-- 3. Generates 60s random QR Token|
      |<-- 4. Displays QR on Screen ------|                                   |
      |                                   |                                   |
      |                                   |<-- 5. Scans QR on phone camera ---|
      |                                   |    Loads confirmation screen      |
      |                                   |                                   |
      |                                   |-- 6. Server validates:            |
      |                                   |      - Token valid & not expired  |
      |                                   |      - Wallet active              |
      |                                   |      - Balance >= Amount          |
      |                                   |                                   |
      |                                   |<-- 7. Participant CONFIRMS -------|
      |                                   |
      |                                   |-- 8. ATOMIC EXECUTION:
      |                                   |      - Debits Participant Wallet
      |                                   |      - Writes Wallet Ledger DEBIT
      |                                   |      - Credits Vendor Ledger
      |                                   |      - Marks Purchase Tx SUCCESS
      |                                   |      - Generates Digital Receipt
      |<-- 9. Shows Purchase SUCCESS -----|-- 10. Shows Confirmation Receipt ->|
```

---

## 3. Post-Event Refund (Unused Balance) Workflow

```
[Organizer]                     [Participant]               [ServiceNow]            [Financer]
     |                                |                          |                      |
     |-- 1. Sets Event COMPLETED ---->|                          |                      |
     |                                |-- 2. Submits Refund ---->|                      |
     |                                |      (Amount, Bank, IFSC)|                      |
     |                                |                          |-- 3. Checks:         |
     |                                |                          |      Amount <= Balance
     |                                |                          |      Event Completed |
     |                                |                          |-- 4. Reserves Hold   |
     |                                |                          |      in Wallet       |
     |                                |                          |-- 5. Enqueues ------>|
     |                                |                          |      for Review      |
     |                                |                          |                      |-- 6. Reviews & Executes
     |                                |                          |                      |      bank transfer
     |                                |                          |                      |
     |                                |                          |<-- 7. Records UTR ---|
     |                                |                          |      payout ref & PAID
     |                                |                          |-- 8. Debits Hold     |
     |                                |                          |      from Wallet     |
     |                                |<-- 9. Email Confirmation-|                      |
```
