import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide'

export interface SettlementBatchResult {
    success: boolean
    message: string
    settlementSysId?: string
    batchId?: string
    totalCredits?: number
    vendorSysId?: string
}

/**
 * Service to aggregate vendor sales ledger entries into settlement batches
 * and manage payout lifecycles.
 */
export class KonnectFestSettlementService {
    /**
     * Creates or updates a settlement batch for a vendor's unsettled sales in an event.
     */
    static createSettlementBatch(
        eventSysId: string,
        vendorSysId: string,
        reviewedByUserSysId: string
    ): SettlementBatchResult {
        const vLedgerGr = new GlideRecord('x_495021_konnect_vendor_ledger')
        vLedgerGr.addQuery('event', eventSysId)
        vLedgerGr.addQuery('vendor', vendorSysId)
        vLedgerGr.addQuery('status', 'unsettled')
        vLedgerGr.query()

        let totalCredits = 0
        const ledgerSysIds: string[] = []

        while (vLedgerGr.next()) {
            totalCredits += parseFloat(vLedgerGr.getValue('credit_amount') || '0')
            ledgerSysIds.push(vLedgerGr.getUniqueValue())
        }

        if (totalCredits <= 0 || ledgerSysIds.length === 0) {
            return {
                success: false,
                message: 'No unsettled transactions found for this vendor in the specified event.',
            }
        }

        const batchId = `SET-${new GlideDateTime().getNumericValue()}`

        const setGr = new GlideRecord('x_495021_konnect_settlement')
        setGr.initialize()
        setGr.setValue('batch_id', batchId)
        setGr.setValue('event', eventSysId)
        setGr.setValue('vendor', vendorSysId)
        setGr.setValue('total_credit_amount', totalCredits)
        setGr.setValue('adjustments_amount', 0)
        setGr.setValue('net_payable_amount', totalCredits)
        setGr.setValue('status', 'reviewed')
        setGr.setValue('reviewed_by', reviewedByUserSysId)
        setGr.setValue('notes', `Settlement batch for ${ledgerSysIds.length} transactions.`)
        const setSysId = setGr.insert()

        // Update vendor ledger entries to in_settlement_batch
        for (const id of ledgerSysIds) {
            const updGr = new GlideRecord('x_495021_konnect_vendor_ledger')
            if (updGr.get(id)) {
                updGr.setValue('status', 'in_settlement_batch')
                updGr.setValue('settlement_batch', setSysId)
                updGr.update()
            }
        }

        return {
            success: true,
            message: `Settlement batch ${batchId} created for ₹${totalCredits.toFixed(2)}.`,
            settlementSysId: setSysId,
            batchId,
            totalCredits,
            vendorSysId,
        }
    }

    /**
     * Financer marks settlement batch as PAID with actual bank transfer UTR.
     */
    static markSettlementPaid(
        settlementSysId: string,
        payoutRef: string,
        financerUserSysId: string
    ): SettlementBatchResult {
        const setGr = new GlideRecord('x_495021_konnect_settlement')
        if (!setGr.get(settlementSysId)) {
            return { success: false, message: 'Settlement record not found.' }
        }

        setGr.setValue('status', 'paid')
        setGr.setValue('payout_reference', payoutRef)
        setGr.setValue('payout_date', new GlideDateTime().getValue())
        setGr.setValue('reviewed_by', financerUserSysId)
        setGr.update()

        // Mark all associated vendor ledger items as settled
        const vLedgerGr = new GlideRecord('x_495021_konnect_vendor_ledger')
        vLedgerGr.addQuery('settlement_batch', settlementSysId)
        vLedgerGr.query()
        while (vLedgerGr.next()) {
            vLedgerGr.setValue('status', 'settled')
            vLedgerGr.update()
        }

        return {
            success: true,
            message: `Settlement marked as PAID with reference: ${payoutRef}`,
            settlementSysId,
        }
    }
}
