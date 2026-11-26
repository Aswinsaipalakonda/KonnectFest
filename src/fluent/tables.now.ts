import {
    Table,
    StringColumn,
    DecimalColumn,
    DateTimeColumn,
    BooleanColumn,
    ReferenceColumn,
} from '@servicenow/sdk/core'

/**
 * 1. EVENT TABLE
 * Central event configuration holding details, UPI payee information, and status.
 */
export const x_495021_konnect_event = Table({
    name: 'x_495021_konnect_event',
    label: 'KonnectFest Event',
    display: 'name',
    autoNumber: {
        prefix: 'EVT',
        number: 100000,
        numberOfDigits: 7,
    },
    schema: {
        number: StringColumn({ label: 'Number', maxLength: 40, readOnly: true }),
        name: StringColumn({ label: 'Event Name', maxLength: 100, mandatory: true }),
        start_date: DateTimeColumn({ label: 'Start Date' }),
        end_date: DateTimeColumn({ label: 'End Date' }),
        state: StringColumn({
            label: 'State',
            maxLength: 30,
            choices: {
                draft: 'Draft',
                registration_open: 'Registration Open',
                active: 'Active / In Progress',
                completed: 'Completed',
                closed: 'Closed',
            },
            default: 'draft',
        }),
        upi_id: StringColumn({ label: 'Designated Event UPI ID', maxLength: 100, mandatory: true }),
        upi_payee_name: StringColumn({ label: 'Designated Payee Name', maxLength: 100, mandatory: true }),
        min_topup_amount: DecimalColumn({ label: 'Min Top-up Amount (INR)', scale: 2 }),
        max_topup_amount: DecimalColumn({ label: 'Max Top-up Amount (INR)', scale: 2 }),
        redemption_window_open: BooleanColumn({ label: 'Redemption Window Open', default: false }),
        redemption_deadline: DateTimeColumn({ label: 'Redemption Deadline' }),
        description: StringColumn({ label: 'Description', maxLength: 1000 }),
    },
})

/**
 * 2. PARTICIPANT TABLE
 * Registered festival attendee with personal/org details and link to ServiceNow sys_user.
 */
export const x_495021_konnect_participant = Table({
    name: 'x_495021_konnect_participant',
    label: 'KonnectFest Participant',
    display: 'name',
    autoNumber: {
        prefix: 'PAR',
        number: 100000,
        numberOfDigits: 7,
    },
    schema: {
        number: StringColumn({ label: 'Number', maxLength: 40, readOnly: true }),
        name: StringColumn({ label: 'Full Name', maxLength: 100, mandatory: true }),
        email: StringColumn({ label: 'Email', maxLength: 100, mandatory: true }),
        phone: StringColumn({ label: 'Phone Number', maxLength: 20 }),
        college_organization: StringColumn({ label: 'College / Organization', maxLength: 150 }),
        participant_id_code: StringColumn({ label: 'Participant ID / Student Code', maxLength: 50 }),
        event: ReferenceColumn({
            label: 'Event',
            referenceTable: 'x_495021_konnect_event',
            mandatory: true,
        }),
        sys_user: ReferenceColumn({
            label: 'Linked ServiceNow User',
            referenceTable: 'sys_user',
        }),
        status: StringColumn({
            label: 'Status',
            maxLength: 30,
            choices: {
                pending_verification: 'Pending Verification',
                verified: 'Verified',
                rejected: 'Rejected',
                active: 'Active',
                deactivated: 'Deactivated',
            },
            default: 'pending_verification',
        }),
        verification_date: DateTimeColumn({ label: 'Verification Date' }),
    },
})

/**
 * 3. PARTICIPANT REGISTRATION TABLE
 * Initial event registration application record.
 */
export const x_495021_konnect_registration = Table({
    name: 'x_495021_konnect_registration',
    label: 'KonnectFest Registration',
    display: 'number',
    autoNumber: {
        prefix: 'REG',
        number: 100000,
        numberOfDigits: 7,
    },
    schema: {
        number: StringColumn({ label: 'Number', maxLength: 40, readOnly: true }),
        participant: ReferenceColumn({
            label: 'Participant',
            referenceTable: 'x_495021_konnect_participant',
            mandatory: true,
        }),
        event: ReferenceColumn({
            label: 'Event',
            referenceTable: 'x_495021_konnect_event',
            mandatory: true,
        }),
        requested_initial_amount: DecimalColumn({ label: 'Requested Initial Wallet Amount', scale: 2 }),
        status: StringColumn({
            label: 'Status',
            maxLength: 30,
            choices: {
                submitted: 'Submitted',
                pending_verification: 'Pending Verification',
                verified: 'Verified',
                rejected: 'Rejected',
            },
            default: 'submitted',
        }),
        payment_reference: StringColumn({ label: 'Payment / UTR Reference', maxLength: 100 }),
        verification_notes: StringColumn({ label: 'Verification Notes', maxLength: 500 }),
    },
})

/**
 * 4. VENDOR TABLE
 * Authorized stall merchant participating in the festival.
 */
export const x_495021_konnect_vendor = Table({
    name: 'x_495021_konnect_vendor',
    label: 'KonnectFest Vendor',
    display: 'name',
    autoNumber: {
        prefix: 'VEN',
        number: 100000,
        numberOfDigits: 7,
    },
    schema: {
        number: StringColumn({ label: 'Number', maxLength: 40, readOnly: true }),
        name: StringColumn({ label: 'Vendor / Brand Name', maxLength: 100, mandatory: true }),
        stall_number: StringColumn({ label: 'Assigned Stall Number', maxLength: 50 }),
        category: StringColumn({
            label: 'Category',
            maxLength: 40,
            choices: {
                food_beverage: 'Food & Beverage',
                merchandise: 'Merchandise & Apparel',
                games_entertainment: 'Games & Entertainment',
                services: 'Services & Experience',
                other: 'Other',
            },
            default: 'food_beverage',
        }),
        event: ReferenceColumn({
            label: 'Event',
            referenceTable: 'x_495021_konnect_event',
            mandatory: true,
        }),
        assigned_user: ReferenceColumn({
            label: 'Assigned Staff User',
            referenceTable: 'sys_user',
        }),
        status: StringColumn({
            label: 'Status',
            maxLength: 30,
            choices: {
                active: 'Active',
                suspended: 'Suspended',
                settled: 'Settled',
            },
            default: 'active',
        }),
        upi_id: StringColumn({ label: 'Payout UPI ID', maxLength: 100 }),
        bank_account: StringColumn({ label: 'Bank Account Number', maxLength: 50 }),
        bank_ifsc: StringColumn({ label: 'Bank IFSC Code', maxLength: 20 }),
    },
})

/**
 * 5. VENDOR STALL TABLE
 * Physical stall location linked to a vendor and event.
 */
export const x_495021_konnect_vendor_stall = Table({
    name: 'x_495021_konnect_vendor_stall',
    label: 'KonnectFest Vendor Stall',
    display: 'stall_code',
    schema: {
        stall_code: StringColumn({ label: 'Stall Code', maxLength: 30, mandatory: true }),
        stall_name: StringColumn({ label: 'Stall Name / Location', maxLength: 100 }),
        vendor: ReferenceColumn({
            label: 'Vendor',
            referenceTable: 'x_495021_konnect_vendor',
        }),
        event: ReferenceColumn({
            label: 'Event',
            referenceTable: 'x_495021_konnect_event',
            mandatory: true,
        }),
        location_notes: StringColumn({ label: 'Location Notes', maxLength: 255 }),
    },
})

/**
 * 6. PAYMENT TABLE
 * Records external UPI bank payments submitted for registration or top-up.
 */
export const x_495021_konnect_payment = Table({
    name: 'x_495021_konnect_payment',
    label: 'KonnectFest Payment',
    display: 'number',
    autoNumber: {
        prefix: 'PAY',
        number: 100000,
        numberOfDigits: 7,
    },
    schema: {
        number: StringColumn({ label: 'Number', maxLength: 40, readOnly: true }),
        type: StringColumn({
            label: 'Payment Type',
            maxLength: 30,
            choices: {
                initial_registration: 'Initial Registration',
                event_topup: 'Event Top-Up',
            },
            default: 'initial_registration',
        }),
        participant: ReferenceColumn({
            label: 'Participant',
            referenceTable: 'x_495021_konnect_participant',
            mandatory: true,
        }),
        event: ReferenceColumn({
            label: 'Event',
            referenceTable: 'x_495021_konnect_event',
            mandatory: true,
        }),
        requested_amount: DecimalColumn({ label: 'Requested Amount (INR)', scale: 2, mandatory: true }),
        verified_amount: DecimalColumn({ label: 'Verified Amount (INR)', scale: 2 }),
        utr_reference: StringColumn({ label: 'Bank UTR / Transaction Reference', maxLength: 100 }),
        status: StringColumn({
            label: 'Status',
            maxLength: 30,
            choices: {
                draft: 'Draft',
                submitted: 'Submitted',
                payment_proof_received: 'Proof Received',
                under_review: 'Under Review',
                verified: 'Verified',
                rejected: 'Rejected',
            },
            default: 'draft',
        }),
        proof_attachment_sys_id: StringColumn({ label: 'Payment Proof Attachment ID', maxLength: 40 }),
        verified_by: ReferenceColumn({
            label: 'Verified By (Finance)',
            referenceTable: 'sys_user',
        }),
        verified_at: DateTimeColumn({ label: 'Verified At' }),
        rejection_reason: StringColumn({ label: 'Rejection Reason', maxLength: 255 }),
        wallet_credit_status: StringColumn({
            label: 'Wallet Credit Status',
            maxLength: 30,
            choices: {
                pending: 'Pending',
                credited: 'Credited',
                failed: 'Failed',
            },
            default: 'pending',
        }),
        wallet_credit_timestamp: DateTimeColumn({ label: 'Wallet Credit Timestamp' }),
    },
})

/**
 * 7. WALLET TABLE
 * Digital balance for a participant within an event.
 */
export const x_495021_konnect_wallet = Table({
    name: 'x_495021_konnect_wallet',
    label: 'KonnectFest Wallet',
    display: 'number',
    autoNumber: {
        prefix: 'WAL',
        number: 100000,
        numberOfDigits: 7,
    },
    schema: {
        number: StringColumn({ label: 'Number', maxLength: 40, readOnly: true }),
        participant: ReferenceColumn({
            label: 'Participant',
            referenceTable: 'x_495021_konnect_participant',
            mandatory: true,
        }),
        event: ReferenceColumn({
            label: 'Event',
            referenceTable: 'x_495021_konnect_event',
            mandatory: true,
        }),
        initial_amount: DecimalColumn({ label: 'Initial Amount (INR)', scale: 2 }),
        available_balance: DecimalColumn({ label: 'Available Balance (INR)', scale: 2 }),
        reserved_balance: DecimalColumn({ label: 'Reserved Balance (INR)', scale: 2 }),
        total_spent: DecimalColumn({ label: 'Total Spent (INR)', scale: 2 }),
        total_refunded: DecimalColumn({ label: 'Total Refunded (INR)', scale: 2 }),
        last_transaction_date: DateTimeColumn({ label: 'Last Transaction Date' }),
        status: StringColumn({
            label: 'Wallet Status',
            maxLength: 30,
            choices: {
                active: 'Active',
                frozen: 'Frozen',
                closed: 'Closed',
            },
            default: 'active',
        }),
    },
})

/**
 * 8. WALLET LEDGER TABLE
 * Immutable double-entry financial log for all wallet balance mutations.
 */
export const x_495021_konnect_wallet_ledger = Table({
    name: 'x_495021_konnect_wallet_ledger',
    label: 'KonnectFest Wallet Ledger',
    display: 'number',
    autoNumber: {
        prefix: 'LED',
        number: 100000,
        numberOfDigits: 7,
    },
    schema: {
        number: StringColumn({ label: 'Number', maxLength: 40, readOnly: true }),
        wallet: ReferenceColumn({
            label: 'Wallet',
            referenceTable: 'x_495021_konnect_wallet',
            mandatory: true,
        }),
        participant: ReferenceColumn({
            label: 'Participant',
            referenceTable: 'x_495021_konnect_participant',
            mandatory: true,
        }),
        event: ReferenceColumn({
            label: 'Event',
            referenceTable: 'x_495021_konnect_event',
            mandatory: true,
        }),
        entry_type: StringColumn({
            label: 'Entry Type',
            maxLength: 30,
            choices: {
                initial_credit: 'Initial Credit',
                top_up: 'Top-Up',
                debit: 'Debit (Purchase)',
                refund_hold: 'Refund Hold',
                refund_payout: 'Refund Payout',
                refund_release: 'Refund Hold Released',
                adjustment: 'Adjustment',
            },
            mandatory: true,
        }),
        amount: DecimalColumn({ label: 'Amount (INR)', scale: 2, mandatory: true }),
        available_balance_before: DecimalColumn({ label: 'Available Balance Before', scale: 2 }),
        available_balance_after: DecimalColumn({ label: 'Available Balance After', scale: 2 }),
        reserved_balance_before: DecimalColumn({ label: 'Reserved Balance Before', scale: 2 }),
        reserved_balance_after: DecimalColumn({ label: 'Reserved Balance After', scale: 2 }),
        source_payment: ReferenceColumn({
            label: 'Source Payment',
            referenceTable: 'x_495021_konnect_payment',
        }),
        source_transaction: StringColumn({ label: 'Source Transaction SysID', maxLength: 40 }),
        idempotency_key: StringColumn({ label: 'Idempotency Key', maxLength: 100, mandatory: true }),
        status: StringColumn({
            label: 'Status',
            maxLength: 30,
            choices: {
                posted: 'Posted',
                reversed: 'Reversed',
            },
            default: 'posted',
        }),
        notes: StringColumn({ label: 'Notes', maxLength: 255 }),
    },
})

/**
 * 9. PURCHASE TRANSACTION TABLE
 * Point-of-sale transaction record generated by vendor, authorized via 60s QR.
 */
export const x_495021_konnect_purchase_tx = Table({
    name: 'x_495021_konnect_purchase_tx',
    label: 'KonnectFest Purchase Transaction',
    display: 'transaction_id',
    autoNumber: {
        prefix: 'TXN',
        number: 100000,
        numberOfDigits: 7,
    },
    schema: {
        number: StringColumn({ label: 'Number', maxLength: 40, readOnly: true }),
        transaction_id: StringColumn({ label: 'Transaction ID', maxLength: 60, mandatory: true }),
        event: ReferenceColumn({
            label: 'Event',
            referenceTable: 'x_495021_konnect_event',
            mandatory: true,
        }),
        vendor: ReferenceColumn({
            label: 'Vendor',
            referenceTable: 'x_495021_konnect_vendor',
            mandatory: true,
        }),
        participant: ReferenceColumn({
            label: 'Participant',
            referenceTable: 'x_495021_konnect_participant',
        }),
        item_description: StringColumn({ label: 'Item / Service Description', maxLength: 200, mandatory: true }),
        amount: DecimalColumn({ label: 'Amount (INR)', scale: 2, mandatory: true }),
        qr_token: StringColumn({ label: 'Ephemeral QR Token', maxLength: 64, mandatory: true }),
        qr_expires_at: DateTimeColumn({ label: 'QR Expiry Timestamp' }),
        status: StringColumn({
            label: 'Status',
            maxLength: 30,
            choices: {
                pending: 'Pending Participant Scan',
                confirmed_processing: 'Confirmed / Processing',
                success: 'Success',
                expired: 'Expired',
                rejected: 'Rejected',
                cancelled: 'Cancelled',
            },
            default: 'pending',
        }),
        confirmed_at: DateTimeColumn({ label: 'Confirmed At' }),
        rejection_reason: StringColumn({ label: 'Rejection Reason', maxLength: 255 }),
        idempotency_key: StringColumn({ label: 'Idempotency Key', maxLength: 100 }),
    },
})

/**
 * 10. VENDOR LEDGER TABLE
 * Records sales credits due to each vendor from successful transactions.
 */
export const x_495021_konnect_vendor_ledger = Table({
    name: 'x_495021_konnect_vendor_ledger',
    label: 'KonnectFest Vendor Ledger',
    display: 'number',
    autoNumber: {
        prefix: 'VLD',
        number: 100000,
        numberOfDigits: 7,
    },
    schema: {
        number: StringColumn({ label: 'Number', maxLength: 40, readOnly: true }),
        vendor: ReferenceColumn({
            label: 'Vendor',
            referenceTable: 'x_495021_konnect_vendor',
            mandatory: true,
        }),
        event: ReferenceColumn({
            label: 'Event',
            referenceTable: 'x_495021_konnect_event',
            mandatory: true,
        }),
        purchase_transaction: ReferenceColumn({
            label: 'Purchase Transaction',
            referenceTable: 'x_495021_konnect_purchase_tx',
            mandatory: true,
        }),
        credit_amount: DecimalColumn({ label: 'Credit Amount (INR)', scale: 2, mandatory: true }),
        status: StringColumn({
            label: 'Settlement Status',
            maxLength: 30,
            choices: {
                unsettled: 'Unsettled',
                in_settlement_batch: 'In Settlement Batch',
                settled: 'Settled',
            },
            default: 'unsettled',
        }),
        settlement_batch: StringColumn({ label: 'Settlement Batch SysID', maxLength: 40 }),
    },
})

/**
 * 11. DIGITAL COUPON / PURCHASE RECEIPT TABLE
 * Entitlement and proof of purchase receipt (NOT a discount code).
 */
export const x_495021_konnect_digital_coupon = Table({
    name: 'x_495021_konnect_digital_coupon',
    label: 'KonnectFest Digital Coupon Receipt',
    display: 'coupon_id',
    schema: {
        coupon_id: StringColumn({ label: 'Coupon / Receipt ID', maxLength: 60, mandatory: true }),
        purchase_transaction: ReferenceColumn({
            label: 'Purchase Transaction',
            referenceTable: 'x_495021_konnect_purchase_tx',
            mandatory: true,
        }),
        event: ReferenceColumn({
            label: 'Event',
            referenceTable: 'x_495021_konnect_event',
            mandatory: true,
        }),
        vendor: ReferenceColumn({
            label: 'Vendor',
            referenceTable: 'x_495021_konnect_vendor',
            mandatory: true,
        }),
        participant: ReferenceColumn({
            label: 'Participant',
            referenceTable: 'x_495021_konnect_participant',
            mandatory: true,
        }),
        item_description: StringColumn({ label: 'Item Description', maxLength: 200 }),
        value: DecimalColumn({ label: 'Value (INR)', scale: 2, mandatory: true }),
        status: StringColumn({
            label: 'Status',
            maxLength: 30,
            choices: {
                issued: 'Issued',
                redeemed: 'Redeemed',
            },
            default: 'issued',
        }),
        issued_at: DateTimeColumn({ label: 'Issued Timestamp' }),
    },
})

/**
 * 12. REFUND REQUEST TABLE
 * Post-event balance redemption requests submitted by participants.
 */
export const x_495021_konnect_refund_request = Table({
    name: 'x_495021_konnect_refund_request',
    label: 'KonnectFest Refund Request',
    display: 'number',
    autoNumber: {
        prefix: 'REF',
        number: 100000,
        numberOfDigits: 7,
    },
    schema: {
        number: StringColumn({ label: 'Number', maxLength: 40, readOnly: true }),
        participant: ReferenceColumn({
            label: 'Participant',
            referenceTable: 'x_495021_konnect_participant',
            mandatory: true,
        }),
        wallet: ReferenceColumn({
            label: 'Wallet',
            referenceTable: 'x_495021_konnect_wallet',
            mandatory: true,
        }),
        event: ReferenceColumn({
            label: 'Event',
            referenceTable: 'x_495021_konnect_event',
            mandatory: true,
        }),
        requested_amount: DecimalColumn({ label: 'Requested Amount (INR)', scale: 2, mandatory: true }),
        reserved_amount: DecimalColumn({ label: 'Reserved Amount (INR)', scale: 2 }),
        status: StringColumn({
            label: 'Status',
            maxLength: 30,
            choices: {
                submitted: 'Submitted',
                under_review: 'Under Review',
                approved_for_payout: 'Approved for Payout',
                paid: 'Paid / Completed',
                rejected: 'Rejected',
            },
            default: 'submitted',
        }),
        bank_account_holder: StringColumn({ label: 'Account Holder Name', maxLength: 100 }),
        bank_account_number: StringColumn({ label: 'Bank Account Number', maxLength: 50 }),
        bank_ifsc: StringColumn({ label: 'Bank IFSC Code', maxLength: 20 }),
        upi_id: StringColumn({ label: 'Payout UPI ID', maxLength: 100 }),
        financer_decision_by: ReferenceColumn({
            label: 'Financer Decision By',
            referenceTable: 'sys_user',
        }),
        payout_reference: StringColumn({ label: 'Bank Payout Reference / UTR', maxLength: 100 }),
        payout_date: DateTimeColumn({ label: 'Payout Date' }),
        notes: StringColumn({ label: 'Notes', maxLength: 255 }),
    },
})

/**
 * 13. VENDOR SETTLEMENT TABLE
 * Aggregates vendor transactions into payout batches.
 */
export const x_495021_konnect_settlement = Table({
    name: 'x_495021_konnect_settlement',
    label: 'KonnectFest Vendor Settlement',
    display: 'number',
    autoNumber: {
        prefix: 'SET',
        number: 100000,
        numberOfDigits: 7,
    },
    schema: {
        number: StringColumn({ label: 'Number', maxLength: 40, readOnly: true }),
        batch_id: StringColumn({ label: 'Batch ID', maxLength: 60, mandatory: true }),
        event: ReferenceColumn({
            label: 'Event',
            referenceTable: 'x_495021_konnect_event',
            mandatory: true,
        }),
        vendor: ReferenceColumn({
            label: 'Vendor',
            referenceTable: 'x_495021_konnect_vendor',
            mandatory: true,
        }),
        total_credit_amount: DecimalColumn({ label: 'Total Credits (INR)', scale: 2 }),
        adjustments_amount: DecimalColumn({ label: 'Adjustments (INR)', scale: 2 }),
        net_payable_amount: DecimalColumn({ label: 'Net Payable (INR)', scale: 2 }),
        status: StringColumn({
            label: 'Status',
            maxLength: 30,
            choices: {
                draft: 'Draft',
                reviewed: 'Reviewed',
                approved: 'Approved',
                paid: 'Paid',
            },
            default: 'draft',
        }),
        reviewed_by: ReferenceColumn({
            label: 'Reviewed By (Finance)',
            referenceTable: 'sys_user',
        }),
        payout_reference: StringColumn({ label: 'Bank Payout Reference / UTR', maxLength: 100 }),
        payout_date: DateTimeColumn({ label: 'Payout Date' }),
        notes: StringColumn({ label: 'Notes', maxLength: 255 }),
    },
})

/**
 * 14. AUDIT LOG TABLE
 * Records critical state transitions and audit trails.
 */
export const x_495021_konnect_audit_log = Table({
    name: 'x_495021_konnect_audit_log',
    label: 'KonnectFest Audit Log',
    display: 'number',
    autoNumber: {
        prefix: 'AUD',
        number: 100000,
        numberOfDigits: 7,
    },
    schema: {
        number: StringColumn({ label: 'Number', maxLength: 40, readOnly: true }),
        event: ReferenceColumn({
            label: 'Event',
            referenceTable: 'x_495021_konnect_event',
        }),
        action: StringColumn({ label: 'Action', maxLength: 100, mandatory: true }),
        target_record: StringColumn({ label: 'Target Record Ref', maxLength: 100 }),
        actor: ReferenceColumn({
            label: 'Actor',
            referenceTable: 'sys_user',
        }),
        previous_status: StringColumn({ label: 'Previous Status', maxLength: 50 }),
        new_status: StringColumn({ label: 'New Status', maxLength: 50 }),
        reason: StringColumn({ label: 'Reason / Details', maxLength: 500 }),
        timestamp: DateTimeColumn({ label: 'Timestamp' }),
    },
})
