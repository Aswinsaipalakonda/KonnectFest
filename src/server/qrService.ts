import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide'

export interface QRGenerationResult {
    success: boolean
    message: string
    transactionSysId?: string
    qrToken?: string
    expiresAt?: string
    amount?: number
    itemDescription?: string
}

/**
 * Service to manage ephemeral, secure 60-second QR tokens for vendor purchases.
 */
export class KonnectFestQRService {
    /**
     * Vendor creates a pending purchase transaction and receives a 60-second QR token.
     */
    static generatePurchaseQR(
        eventSysId: string,
        vendorSysId: string,
        itemDescription: string,
        amount: number,
        expirySeconds: number = 60
    ): QRGenerationResult {
        if (amount <= 0) {
            return { success: false, message: 'Purchase amount must be greater than zero.' }
        }

        // Validate vendor and event
        const vendorGr = new GlideRecord('x_2327324_konnect_vendor')
        if (!vendorGr.get(vendorSysId)) {
            return { success: false, message: 'Vendor record not found.' }
        }

        if (vendorGr.getValue('status') !== 'active') {
            return { success: false, message: 'Vendor is not active.' }
        }

        const eventGr = new GlideRecord('x_2327324_konnect_event')
        if (!eventGr.get(eventSysId)) {
            return { success: false, message: 'Event not found.' }
        }

        const evState = eventGr.getValue('state')
        if (evState !== 'active') {
            return { success: false, message: `Event is currently '${evState}'. Purchases are only permitted when Active.` }
        }

        // Generate random 32-character opaque token
        const randomSeed = `${new GlideDateTime().getNumericValue()}_${Math.random()}_${vendorSysId}`
        const qrToken = `KF_QR_${Math.random().toString(36).substring(2, 12)}_${new GlideDateTime().getNumericValue()}`

        // Calculate expiry (default 60 seconds)
        const expGdt = new GlideDateTime()
        expGdt.addSeconds(expirySeconds)

        const txGr = new GlideRecord('x_2327324_konnect_purchase_tx')
        txGr.initialize()
        txGr.setValue('transaction_id', `TXN-${new GlideDateTime().getNumericValue()}`)
        txGr.setValue('event', eventSysId)
        txGr.setValue('vendor', vendorSysId)
        txGr.setValue('item_description', itemDescription)
        txGr.setValue('amount', amount)
        txGr.setValue('qr_token', qrToken)
        txGr.setValue('qr_expires_at', expGdt.getValue())
        txGr.setValue('status', 'pending')
        const txSysId = txGr.insert()

        return {
            success: true,
            message: 'Purchase transaction created and QR token generated.',
            transactionSysId: txSysId,
            qrToken: qrToken,
            expiresAt: expGdt.getValue(),
            amount: amount,
            itemDescription: itemDescription,
        }
    }

    /**
     * Participant scans QR and loads pending transaction details.
     */
    static getTransactionByQR(qrToken: string): {
        valid: boolean
        message: string
        transaction?: {
            sysId: string
            transactionId: string
            vendorName: string
            stallNumber: string
            eventName: string
            itemDescription: string
            amount: number
            expiresAt: string
            isExpired: boolean
        }
    } {
        const txGr = new GlideRecord('x_2327324_konnect_purchase_tx')
        txGr.addQuery('qr_token', qrToken)
        txGr.query()

        if (!txGr.next()) {
            return { valid: false, message: 'Invalid or unknown QR token.' }
        }

        const status = txGr.getValue('status')
        if (status !== 'pending') {
            return { valid: false, message: `This QR transaction is no longer active (status: ${status}).` }
        }

        const expiresAtStr = txGr.getValue('qr_expires_at')
        let isExpired = false
        if (expiresAtStr) {
            const expGdt = new GlideDateTime(expiresAtStr)
            const nowGdt = new GlideDateTime()
            if (nowGdt.after(expGdt)) {
                isExpired = true
                txGr.setValue('status', 'expired')
                txGr.setValue('rejection_reason', 'QR token expired (60s limit)')
                txGr.update()
                return { valid: false, message: 'QR token has expired. Vendor must generate a new QR.' }
            }
        }

        let vendorName = 'Vendor'
        let stallNumber = ''
        const vendorGr = new GlideRecord('x_2327324_konnect_vendor')
        if (vendorGr.get(txGr.getValue('vendor'))) {
            vendorName = vendorGr.getValue('name') || 'Vendor'
            stallNumber = vendorGr.getValue('stall_number') || ''
        }

        let eventName = 'Event'
        const eventGr = new GlideRecord('x_2327324_konnect_event')
        if (eventGr.get(txGr.getValue('event'))) {
            eventName = eventGr.getValue('name') || 'Event'
        }

        return {
            valid: true,
            message: 'Transaction details retrieved successfully.',
            transaction: {
                sysId: txGr.getUniqueValue(),
                transactionId: txGr.getValue('transaction_id') || '',
                vendorName,
                stallNumber,
                eventName,
                itemDescription: txGr.getValue('item_description') || '',
                amount: parseFloat(txGr.getValue('amount') || '0'),
                expiresAt: expiresAtStr || '',
                isExpired,
            },
        }
    }
}
