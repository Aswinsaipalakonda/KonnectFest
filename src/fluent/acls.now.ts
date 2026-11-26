import { Acl } from '@servicenow/sdk/core'
import {
    roleOrganizerAdmin,
    roleFinancer,
    roleVendor,
    roleParticipant,
} from './roles.now'

// 1. EVENT ACLS
export const aclEventRead = Acl({
    $id: Now.ID['acl_event_read'],
    type: 'record',
    table: 'x_2327324_konnect_event',
    operation: 'read',
    roles: [roleOrganizerAdmin, roleFinancer, roleVendor, roleParticipant],
    description: 'Allow all KonnectFest roles to view events',
})

export const aclEventWrite = Acl({
    $id: Now.ID['acl_event_write'],
    type: 'record',
    table: 'x_2327324_konnect_event',
    operation: 'write',
    roles: [roleOrganizerAdmin],
    description: 'Allow Organizer/Admin to manage events',
})

export const aclEventCreate = Acl({
    $id: Now.ID['acl_event_create'],
    type: 'record',
    table: 'x_2327324_konnect_event',
    operation: 'create',
    roles: [roleOrganizerAdmin],
    description: 'Allow Organizer/Admin to create events',
})

// 2. PARTICIPANT ACLS
export const aclParticipantRead = Acl({
    $id: Now.ID['acl_participant_read'],
    type: 'record',
    table: 'x_2327324_konnect_participant',
    operation: 'read',
    roles: [roleOrganizerAdmin, roleFinancer, roleParticipant],
    description: 'Allow staff and participants to view participant profiles',
})

export const aclParticipantWrite = Acl({
    $id: Now.ID['acl_participant_write'],
    type: 'record',
    table: 'x_2327324_konnect_participant',
    operation: 'write',
    roles: [roleOrganizerAdmin, roleFinancer],
    description: 'Allow Organizer and Finance to update participant status',
})

// 3. REGISTRATION ACLS
export const aclRegistrationRead = Acl({
    $id: Now.ID['acl_reg_read'],
    type: 'record',
    table: 'x_2327324_konnect_registration',
    operation: 'read',
    roles: [roleOrganizerAdmin, roleFinancer, roleParticipant],
    description: 'Allow Organizer, Financer, and Participant to read registration',
})

export const aclRegistrationCreate = Acl({
    $id: Now.ID['acl_reg_create'],
    type: 'record',
    table: 'x_2327324_konnect_registration',
    operation: 'create',
    roles: [roleOrganizerAdmin, roleParticipant],
    description: 'Allow creating registrations',
})

// 4. VENDOR & STALL ACLS
export const aclVendorRead = Acl({
    $id: Now.ID['acl_vendor_read'],
    type: 'record',
    table: 'x_2327324_konnect_vendor',
    operation: 'read',
    roles: [roleOrganizerAdmin, roleFinancer, roleVendor, roleParticipant],
    description: 'Allow viewing vendor details',
})

export const aclVendorWrite = Acl({
    $id: Now.ID['acl_vendor_write'],
    type: 'record',
    table: 'x_2327324_konnect_vendor',
    operation: 'write',
    roles: [roleOrganizerAdmin],
    description: 'Allow Organizer/Admin to manage vendors',
})

// 5. PAYMENT ACLS
export const aclPaymentRead = Acl({
    $id: Now.ID['acl_payment_read'],
    type: 'record',
    table: 'x_2327324_konnect_payment',
    operation: 'read',
    roles: [roleOrganizerAdmin, roleFinancer, roleParticipant],
    description: 'Allow Organizer, Financer, and Participant to view payment records',
})

export const aclPaymentWrite = Acl({
    $id: Now.ID['acl_payment_write'],
    type: 'record',
    table: 'x_2327324_konnect_payment',
    operation: 'write',
    roles: [roleFinancer, roleOrganizerAdmin],
    description: 'Allow Financer and Organizer to verify or reject payments',
})

export const aclPaymentCreate = Acl({
    $id: Now.ID['acl_payment_create'],
    type: 'record',
    table: 'x_2327324_konnect_payment',
    operation: 'create',
    roles: [roleOrganizerAdmin, roleParticipant],
    description: 'Allow submitting payments and top-ups',
})

// 6. WALLET & LEDGER ACLS
export const aclWalletRead = Acl({
    $id: Now.ID['acl_wallet_read'],
    type: 'record',
    table: 'x_2327324_konnect_wallet',
    operation: 'read',
    roles: [roleOrganizerAdmin, roleFinancer, roleParticipant],
    description: 'Allow viewing wallets',
})

export const aclWalletLedgerRead = Acl({
    $id: Now.ID['acl_wallet_ledger_read'],
    type: 'record',
    table: 'x_2327324_konnect_wallet_ledger',
    operation: 'read',
    roles: [roleOrganizerAdmin, roleFinancer, roleParticipant],
    description: 'Allow viewing wallet ledger entries',
})

// 7. PURCHASE TRANSACTION ACLS
export const aclPurchaseTxRead = Acl({
    $id: Now.ID['acl_purchase_tx_read'],
    type: 'record',
    table: 'x_2327324_konnect_purchase_tx',
    operation: 'read',
    roles: [roleOrganizerAdmin, roleFinancer, roleVendor, roleParticipant],
    description: 'Allow viewing purchase transactions',
})

export const aclPurchaseTxCreate = Acl({
    $id: Now.ID['acl_purchase_tx_create'],
    type: 'record',
    table: 'x_2327324_konnect_purchase_tx',
    operation: 'create',
    roles: [roleVendor, roleOrganizerAdmin],
    description: 'Allow Vendors and Organizers to create purchase transactions',
})

export const aclPurchaseTxWrite = Acl({
    $id: Now.ID['acl_purchase_tx_write'],
    type: 'record',
    table: 'x_2327324_konnect_purchase_tx',
    operation: 'write',
    roles: [roleVendor, roleParticipant, roleOrganizerAdmin],
    description: 'Allow updating purchase transactions during confirmation',
})

// 8. VENDOR LEDGER ACLS
export const aclVendorLedgerRead = Acl({
    $id: Now.ID['acl_vendor_ledger_read'],
    type: 'record',
    table: 'x_2327324_konnect_vendor_ledger',
    operation: 'read',
    roles: [roleOrganizerAdmin, roleFinancer, roleVendor],
    description: 'Allow viewing vendor ledger',
})

// 9. DIGITAL COUPON ACLS
export const aclDigitalCouponRead = Acl({
    $id: Now.ID['acl_digital_coupon_read'],
    type: 'record',
    table: 'x_2327324_konnect_digital_coupon',
    operation: 'read',
    roles: [roleOrganizerAdmin, roleVendor, roleParticipant],
    description: 'Allow viewing digital purchase coupons/receipts',
})

// 10. REFUND REQUEST ACLS
export const aclRefundRead = Acl({
    $id: Now.ID['acl_refund_read'],
    type: 'record',
    table: 'x_2327324_konnect_refund_request',
    operation: 'read',
    roles: [roleOrganizerAdmin, roleFinancer, roleParticipant],
    description: 'Allow viewing refund requests',
})

export const aclRefundCreate = Acl({
    $id: Now.ID['acl_refund_create'],
    type: 'record',
    table: 'x_2327324_konnect_refund_request',
    operation: 'create',
    roles: [roleParticipant, roleOrganizerAdmin],
    description: 'Allow submitting refund requests',
})

export const aclRefundWrite = Acl({
    $id: Now.ID['acl_refund_write'],
    type: 'record',
    table: 'x_2327324_konnect_refund_request',
    operation: 'write',
    roles: [roleFinancer, roleOrganizerAdmin],
    description: 'Allow Financer and Organizer to approve or reject refunds',
})

// 11. VENDOR SETTLEMENT ACLS
export const aclSettlementRead = Acl({
    $id: Now.ID['acl_settlement_read'],
    type: 'record',
    table: 'x_2327324_konnect_settlement',
    operation: 'read',
    roles: [roleOrganizerAdmin, roleFinancer, roleVendor],
    description: 'Allow viewing vendor settlements',
})

export const aclSettlementWrite = Acl({
    $id: Now.ID['acl_settlement_write'],
    type: 'record',
    table: 'x_2327324_konnect_settlement',
    operation: 'write',
    roles: [roleFinancer, roleOrganizerAdmin],
    description: 'Allow Financers and Organizers to manage settlements',
})
