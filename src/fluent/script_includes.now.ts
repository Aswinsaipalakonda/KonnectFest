import { ScriptInclude } from '@servicenow/sdk/core'

/**
 * 1. Wallet Helper Script Include
 */
export const siWalletHelper = ScriptInclude({
    $id: Now.ID['si_wallet_helper'],
    name: 'KonnectFestWalletHelper',
    active: true,
    clientCallable: true,
    description: 'Client-callable Script Include for participant wallet balance, history, and purchase operations',
    script: `var KonnectFestWalletHelper = Class.create();
KonnectFestWalletHelper.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
    
    getWalletDetails: function() {
        var participantId = this.getParameter('sysparm_participant_id');
        var eventId = this.getParameter('sysparm_event_id');
        
        var gr = new GlideRecord('x_495021_konnect_wallet');
        gr.addQuery('participant', participantId);
        gr.addQuery('event', eventId);
        gr.query();
        
        if (gr.next()) {
            return JSON.stringify({
                success: true,
                walletSysId: gr.getUniqueValue(),
                number: gr.getValue('number'),
                availableBalance: parseFloat(gr.getValue('available_balance') || '0'),
                reservedBalance: parseFloat(gr.getValue('reserved_balance') || '0'),
                totalSpent: parseFloat(gr.getValue('total_spent') || '0'),
                totalRefunded: parseFloat(gr.getValue('total_refunded') || '0'),
                status: gr.getValue('status')
            });
        }
        
        return JSON.stringify({
            success: false,
            message: 'Wallet not found'
        });
    },

    type: 'KonnectFestWalletHelper'
});`,
})

/**
 * 2. QR Helper Script Include
 */
export const siQRHelper = ScriptInclude({
    $id: Now.ID['si_qr_helper'],
    name: 'KonnectFestQRHelper',
    active: true,
    clientCallable: true,
    description: 'Client-callable Script Include for generating and validating 60-second vendor purchase QR tokens',
    script: `var KonnectFestQRHelper = Class.create();
KonnectFestQRHelper.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    validateToken: function() {
        var token = this.getParameter('sysparm_qr_token');
        var txGr = new GlideRecord('x_495021_konnect_purchase_tx');
        txGr.addQuery('qr_token', token);
        txGr.query();

        if (!txGr.next()) {
            return JSON.stringify({ valid: false, message: 'Invalid QR token.' });
        }

        var status = txGr.getValue('status');
        if (status !== 'pending') {
            return JSON.stringify({ valid: false, message: 'Transaction is already ' + status + '.' });
        }

        var expStr = txGr.getValue('qr_expires_at');
        if (expStr) {
            var expGdt = new GlideDateTime(expStr);
            var nowGdt = new GlideDateTime();
            if (nowGdt.after(expGdt)) {
                txGr.setValue('status', 'expired');
                txGr.update();
                return JSON.stringify({ valid: false, message: 'QR token has expired (60s limit).' });
            }
        }

        var vendorName = 'Vendor';
        var venGr = new GlideRecord('x_495021_konnect_vendor');
        if (venGr.get(txGr.getValue('vendor'))) {
            vendorName = venGr.getValue('name');
        }

        return JSON.stringify({
            valid: true,
            sysId: txGr.getUniqueValue(),
            transactionId: txGr.getValue('transaction_id'),
            vendorName: vendorName,
            itemDescription: txGr.getValue('item_description'),
            amount: parseFloat(txGr.getValue('amount') || '0'),
            expiresAt: expStr
        });
    },

    type: 'KonnectFestQRHelper'
});`,
})
