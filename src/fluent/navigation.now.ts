import { ApplicationMenu, Record } from '@servicenow/sdk/core'

/**
 * Top-Level KonnectFest Application Menu
 */
export const konnectfestMenu = ApplicationMenu({
    $id: Now.ID['menu_konnectfest'],
    title: 'KonnectFest',
    hint: 'Event Commerce & Digital Wallet Management',
    description: 'KonnectFest Event Commerce, Digital Wallets, QR Redemption, and Settlements',
    active: true,
})

// 1. DASHBOARDS & WORKSPACES
export const modOrganizerDashboard = Record({
    $id: Now.ID['mod_organizer_dashboard'],
    table: 'sys_app_module',
    data: {
        title: 'Organizer Dashboard',
        application: konnectfestMenu,
        link_type: 'DIRECT',
        query: 'x_2327324_konnect_organizer_dashboard.do',
        active: true,
        order: 100,
        roles: ['x_2327324_konnect.organizer_admin'],
    },
})

export const modFinanceWorkspace = Record({
    $id: Now.ID['mod_finance_workspace'],
    table: 'sys_app_module',
    data: {
        title: 'Finance Workspace',
        application: konnectfestMenu,
        link_type: 'DIRECT',
        query: 'x_2327324_konnect_financer_workspace.do',
        active: true,
        order: 200,
        roles: ['x_2327324_konnect.financer', 'x_2327324_konnect.organizer_admin'],
    },
})

export const modVendorWorkspace = Record({
    $id: Now.ID['mod_vendor_workspace'],
    table: 'sys_app_module',
    data: {
        title: 'Vendor Terminal',
        application: konnectfestMenu,
        link_type: 'DIRECT',
        query: 'x_2327324_konnect_vendor_workspace.do',
        active: true,
        order: 300,
        roles: ['x_2327324_konnect.vendor', 'x_2327324_konnect.organizer_admin'],
    },
})

export const modParticipantPortal = Record({
    $id: Now.ID['mod_participant_portal'],
    table: 'sys_app_module',
    data: {
        title: 'Participant Portal',
        application: konnectfestMenu,
        link_type: 'DIRECT',
        query: 'x_2327324_konnect_participant_portal.do',
        active: true,
        order: 400,
        roles: ['x_2327324_konnect.participant', 'x_2327324_konnect.organizer_admin'],
    },
})

export const modPublicRegister = Record({
    $id: Now.ID['mod_public_register'],
    table: 'sys_app_module',
    data: {
        title: 'Public Registration Page',
        application: konnectfestMenu,
        link_type: 'DIRECT',
        query: 'x_2327324_konnect_register.do',
        active: true,
        order: 450,
    },
})

export const publicRegisterAccess = Record({
    $id: Now.ID['sys_public_register'],
    table: 'sys_public',
    data: {
        page: 'x_2327324_konnect_register',
        active: true,
    },
})

// 2. SEPARATOR: EVENT RECORDS
export const modSepRecords = Record({
    $id: Now.ID['mod_sep_records'],
    table: 'sys_app_module',
    data: {
        title: 'Event Management',
        application: konnectfestMenu,
        link_type: 'SEPARATOR',
        active: true,
        order: 500,
    },
})

export const modEvents = Record({
    $id: Now.ID['mod_events'],
    table: 'sys_app_module',
    data: {
        title: 'Events',
        application: konnectfestMenu,
        link_type: 'LIST',
        name: 'x_2327324_konnect_event',
        active: true,
        order: 600,
    },
})

export const modParticipants = Record({
    $id: Now.ID['mod_participants'],
    table: 'sys_app_module',
    data: {
        title: 'Participants',
        application: konnectfestMenu,
        link_type: 'LIST',
        name: 'x_2327324_konnect_participant',
        active: true,
        order: 700,
    },
})

export const modVendors = Record({
    $id: Now.ID['mod_vendors'],
    table: 'sys_app_module',
    data: {
        title: 'Vendors',
        application: konnectfestMenu,
        link_type: 'LIST',
        name: 'x_2327324_konnect_vendor',
        active: true,
        order: 800,
    },
})

// 3. SEPARATOR: FINANCIAL LEDGERS
export const modSepFinance = Record({
    $id: Now.ID['mod_sep_finance'],
    table: 'sys_app_module',
    data: {
        title: 'Wallets & Financial Ledgers',
        application: konnectfestMenu,
        link_type: 'SEPARATOR',
        active: true,
        order: 900,
    },
})

export const modPayments = Record({
    $id: Now.ID['mod_payments'],
    table: 'sys_app_module',
    data: {
        title: 'Payments & Top-Ups',
        application: konnectfestMenu,
        link_type: 'LIST',
        name: 'x_2327324_konnect_payment',
        active: true,
        order: 1000,
    },
})

export const modWallets = Record({
    $id: Now.ID['mod_wallets'],
    table: 'sys_app_module',
    data: {
        title: 'Participant Wallets',
        application: konnectfestMenu,
        link_type: 'LIST',
        name: 'x_2327324_konnect_wallet',
        active: true,
        order: 1100,
    },
})

export const modWalletLedger = Record({
    $id: Now.ID['mod_wallet_ledger'],
    table: 'sys_app_module',
    data: {
        title: 'Wallet Ledger',
        application: konnectfestMenu,
        link_type: 'LIST',
        name: 'x_2327324_konnect_wallet_ledger',
        active: true,
        order: 1200,
    },
})

export const modPurchaseTx = Record({
    $id: Now.ID['mod_purchase_tx'],
    table: 'sys_app_module',
    data: {
        title: 'Purchase Transactions',
        application: konnectfestMenu,
        link_type: 'LIST',
        name: 'x_2327324_konnect_purchase_tx',
        active: true,
        order: 1300,
    },
})

export const modVendorLedger = Record({
    $id: Now.ID['mod_vendor_ledger'],
    table: 'sys_app_module',
    data: {
        title: 'Vendor Ledger',
        application: konnectfestMenu,
        link_type: 'LIST',
        name: 'x_2327324_konnect_vendor_ledger',
        active: true,
        order: 1400,
    },
})

export const modDigitalCoupons = Record({
    $id: Now.ID['mod_digital_coupons'],
    table: 'sys_app_module',
    data: {
        title: 'Digital Receipts',
        application: konnectfestMenu,
        link_type: 'LIST',
        name: 'x_2327324_konnect_digital_coupon',
        active: true,
        order: 1500,
    },
})

export const modRefunds = Record({
    $id: Now.ID['mod_refunds'],
    table: 'sys_app_module',
    data: {
        title: 'Refund Requests',
        application: konnectfestMenu,
        link_type: 'LIST',
        name: 'x_2327324_konnect_refund_request',
        active: true,
        order: 1600,
    },
})

export const modSettlements = Record({
    $id: Now.ID['mod_settlements'],
    table: 'sys_app_module',
    data: {
        title: 'Vendor Settlements',
        application: konnectfestMenu,
        link_type: 'LIST',
        name: 'x_2327324_konnect_settlement',
        active: true,
        order: 1700,
    },
})

export const modAuditLog = Record({
    $id: Now.ID['mod_audit_log'],
    table: 'sys_app_module',
    data: {
        title: 'Audit Log',
        application: konnectfestMenu,
        link_type: 'LIST',
        name: 'x_2327324_konnect_audit_log',
        active: true,
        order: 1800,
    },
})
