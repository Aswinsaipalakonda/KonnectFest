# KonnectFest Data Model and Dictionary Specification

## Scope Prefix: `x_2327324_konnect`

### 1. `x_2327324_konnect_event`
- `number`: AutoNumber (`EVT2000001`)
- `name`: String(100), Mandatory
- `start_date`: DateTime
- `end_date`: DateTime
- `state`: Choice (`draft`, `registration_open`, `active`, `completed`, `closed`)
- `upi_id`: String(100) (e.g., `event@okaxis`)
- `upi_payee_name`: String(100)
- `min_topup_amount`: Decimal(scale: 2, default: 50.00)
- `max_topup_amount`: Decimal(scale: 2, default: 10000.00)
- `redemption_window_open`: Boolean(default: false)
- `redemption_deadline`: DateTime

### 2. `x_2327324_konnect_participant`
- `number`: AutoNumber (`PAR2000001`)
- `name`: String(100), Mandatory
- `email`: Email, Mandatory (Unique per event)
- `phone`: String(20)
- `college_organization`: String(150)
- `participant_id_code`: String(50)
- `event`: Reference -> `x_2327324_konnect_event`
- `sys_user`: Reference -> `sys_user`
- `status`: Choice (`pending_verification`, `verified`, `rejected`, `active`, `deactivated`)
- `verification_date`: DateTime

### 3. `x_2327324_konnect_registration`
- `number`: AutoNumber (`REG2000001`)
- `participant`: Reference -> `x_2327324_konnect_participant`
- `event`: Reference -> `x_2327324_konnect_event`
- `requested_initial_amount`: Decimal(scale: 2, default: 0.00)
- `status`: Choice (`submitted`, `pending_verification`, `verified`, `rejected`)
- `payment_reference`: String(100)
- `verification_notes`: String(500)

### 4. `x_2327324_konnect_vendor`
- `number`: AutoNumber (`VEN2000001`)
- `name`: String(100), Mandatory
- `stall_number`: String(50)
- `category`: Choice (`food_beverage`, `merchandise`, `games_entertainment`, `services`, `other`)
- `event`: Reference -> `x_2327324_konnect_event`
- `assigned_user`: Reference -> `sys_user`
- `status`: Choice (`active`, `suspended`, `settled`)
- `upi_id`: String(100)
- `bank_account`: String(50)
- `bank_ifsc`: String(20)

### 5. `x_2327324_konnect_vendor_stall`
- `stall_code`: String(30), Mandatory
- `stall_name`: String(100)
- `vendor`: Reference -> `x_2327324_konnect_vendor`
- `event`: Reference -> `x_2327324_konnect_event`
- `location_notes`: String(255)

### 6. `x_2327324_konnect_payment`
- `number`: AutoNumber (`PAY2000001`)
- `type`: Choice (`initial_registration`, `event_topup`)
- `participant`: Reference -> `x_2327324_konnect_participant`
- `event`: Reference -> `x_2327324_konnect_event`
- `requested_amount`: Decimal(scale: 2), Mandatory
- `verified_amount`: Decimal(scale: 2)
- `utr_reference`: String(100), Mandatory for verification
- `status`: Choice (`draft`, `submitted`, `payment_proof_received`, `under_review`, `verified`, `rejected`)
- `verified_by`: Reference -> `sys_user`
- `verified_at`: DateTime
- `rejection_reason`: String(255)
- `wallet_credit_status`: Choice (`pending`, `credited`, `failed`)
- `wallet_credit_timestamp`: DateTime

### 7. `x_2327324_konnect_wallet`
- `number`: AutoNumber (`WAL2000001`)
- `participant`: Reference -> `x_2327324_konnect_participant`, Unique per event
- `event`: Reference -> `x_2327324_konnect_event`
- `initial_amount`: Decimal(scale: 2, default: 0.00)
- `available_balance`: Decimal(scale: 2, default: 0.00)
- `reserved_balance`: Decimal(scale: 2, default: 0.00)
- `total_spent`: Decimal(scale: 2, default: 0.00)
- `total_refunded`: Decimal(scale: 2, default: 0.00)
- `last_transaction_date`: DateTime
- `status`: Choice (`active`, `frozen`, `closed`)

### 8. `x_2327324_konnect_wallet_ledger`
- `number`: AutoNumber (`LED2000001`)
- `wallet`: Reference -> `x_2327324_konnect_wallet`
- `participant`: Reference -> `x_2327324_konnect_participant`
- `event`: Reference -> `x_2327324_konnect_event`
- `entry_type`: Choice (`initial_credit`, `top_up`, `debit`, `refund_hold`, `refund_payout`, `refund_release`, `adjustment`)
- `amount`: Decimal(scale: 2)
- `available_balance_before`: Decimal(scale: 2)
- `available_balance_after`: Decimal(scale: 2)
- `reserved_balance_before`: Decimal(scale: 2)
- `reserved_balance_after`: Decimal(scale: 2)
- `source_payment`: Reference -> `x_2327324_konnect_payment`
- `source_transaction`: Reference -> `x_2327324_konnect_purchase_tx`
- `idempotency_key`: String(100), Unique
- `status`: Choice (`posted`, `reversed`)
- `notes`: String(255)

### 9. `x_2327324_konnect_purchase_tx`
- `number`: AutoNumber (`TXN2000001`)
- `transaction_id`: String(50), Unique
- `event`: Reference -> `x_2327324_konnect_event`
- `vendor`: Reference -> `x_2327324_konnect_vendor`
- `participant`: Reference -> `x_2327324_konnect_participant`
- `item_description`: String(200)
- `amount`: Decimal(scale: 2), Mandatory
- `qr_token`: String(64), Unique
- `qr_expires_at`: DateTime
- `status`: Choice (`pending`, `confirmed_processing`, `success`, `expired`, `rejected`, `cancelled`)
- `confirmed_at`: DateTime
- `rejection_reason`: String(255)
- `idempotency_key`: String(100)

### 10. `x_2327324_konnect_vendor_ledger`
- `number`: AutoNumber (`VLD2000001`)
- `vendor`: Reference -> `x_2327324_konnect_vendor`
- `event`: Reference -> `x_2327324_konnect_event`
- `purchase_transaction`: Reference -> `x_2327324_konnect_purchase_tx`
- `credit_amount`: Decimal(scale: 2)
- `status`: Choice (`unsettled`, `in_settlement_batch`, `settled`)
- `settlement_batch`: Reference -> `x_2327324_konnect_settlement`

### 11. `x_2327324_konnect_digital_coupon`
- `coupon_id`: String(50), Unique
- `purchase_transaction`: Reference -> `x_2327324_konnect_purchase_tx`
- `event`: Reference -> `x_2327324_konnect_event`
- `vendor`: Reference -> `x_2327324_konnect_vendor`
- `participant`: Reference -> `x_2327324_konnect_participant`
- `item_description`: String(200)
- `value`: Decimal(scale: 2)
- `status`: Choice (`issued`, `redeemed`)
- `issued_at`: DateTime

### 12. `x_2327324_konnect_refund_request`
- `number`: AutoNumber (`REF2000001`)
- `participant`: Reference -> `x_2327324_konnect_participant`
- `wallet`: Reference -> `x_2327324_konnect_wallet`
- `event`: Reference -> `x_2327324_konnect_event`
- `requested_amount`: Decimal(scale: 2)
- `reserved_amount`: Decimal(scale: 2)
- `status`: Choice (`submitted`, `under_review`, `approved_for_payout`, `paid`, `rejected`)
- `bank_account_holder`: String(100)
- `bank_account_number`: String(50)
- `bank_ifsc`: String(20)
- `upi_id`: String(100)
- `financer_decision_by`: Reference -> `sys_user`
- `payout_reference`: String(100)
- `payout_date`: DateTime
- `notes`: String(255)

### 13. `x_2327324_konnect_settlement`
- `number`: AutoNumber (`SET2000001`)
- `batch_id`: String(50), Unique
- `event`: Reference -> `x_2327324_konnect_event`
- `vendor`: Reference -> `x_2327324_konnect_vendor`
- `total_credit_amount`: Decimal(scale: 2)
- `adjustments_amount`: Decimal(scale: 2)
- `net_payable_amount`: Decimal(scale: 2)
- `status`: Choice (`draft`, `reviewed`, `approved`, `paid`)
- `reviewed_by`: Reference -> `sys_user`
- `payout_reference`: String(100)
- `payout_date`: DateTime
- `notes`: String(255)

### 14. `x_2327324_konnect_audit_log`
- `number`: AutoNumber (`AUD2000001`)
- `event`: Reference -> `x_2327324_konnect_event`
- `action`: String(100)
- `target_record`: String(100)
- `actor`: Reference -> `sys_user`
- `previous_status`: String(50)
- `new_status`: String(50)
- `reason`: String(255)
- `timestamp`: DateTime
