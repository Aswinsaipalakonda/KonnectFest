import { BusinessRule } from '@servicenow/sdk/core'
import {
    preventLedgerModification,
    guardWalletBalance,
    onPaymentStatusVerified,
} from '../server/businessRules'

/**
 * 1. Immutability Guard on Wallet Ledger
 */
export const brWalletLedgerImmutable = BusinessRule({
    $id: Now.ID['br_wallet_ledger_immutable'],
    name: 'KonnectFest_WalletLedger_Immutable',
    table: 'x_2327324_konnect_wallet_ledger',
    when: 'before',
    action: ['update', 'delete'],
    script: preventLedgerModification,
    order: 10,
    active: true,
    description: 'Enforces immutability on double-entry wallet ledger records',
})

/**
 * 2. Immutability Guard on Vendor Ledger
 */
export const brVendorLedgerImmutable = BusinessRule({
    $id: Now.ID['br_vendor_ledger_immutable'],
    name: 'KonnectFest_VendorLedger_Immutable',
    table: 'x_2327324_konnect_vendor_ledger',
    when: 'before',
    action: ['delete'],
    script: preventLedgerModification,
    order: 10,
    active: true,
    description: 'Enforces immutability on vendor ledger records',
})

/**
 * 3. Wallet Balance Integrity Guard
 */
export const brWalletBalanceGuard = BusinessRule({
    $id: Now.ID['br_wallet_balance_guard'],
    name: 'KonnectFest_Wallet_BalanceIntegrity',
    table: 'x_2327324_konnect_wallet',
    when: 'before',
    action: ['insert', 'update'],
    script: guardWalletBalance,
    order: 100,
    active: true,
    description: 'Prevents negative available or reserved balances on participant wallets',
})

/**
 * 4. Automatic Wallet Credit Trigger on Payment Verification
 */
export const brPaymentVerifiedTrigger = BusinessRule({
    $id: Now.ID['br_payment_verified_trigger'],
    name: 'KonnectFest_Payment_AutoCreditOnVerify',
    table: 'x_2327324_konnect_payment',
    when: 'after',
    action: ['update'],
    script: onPaymentStatusVerified,
    order: 100,
    active: true,
    description: 'Automatically credits wallet and provisions participant user identity when Finance verifies payment',
})
