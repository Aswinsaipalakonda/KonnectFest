with open('src/server/restEndpoints.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update event registration_fee in handleOrganizerOverview
old_event_push = """            events.push({
                sys_id: evGr.getUniqueValue(),
                number: evGr.getValue('number') || '',
                name: evGr.getValue('name') || '',
                state: evGr.getValue('state') || 'draft',
                upi_id: evGr.getValue('upi_id') || '',
                upi_payee_name: evGr.getValue('upi_payee_name') || '',
                start_date: evGr.getValue('start_date') || '',
                end_date: evGr.getValue('end_date') || '',
                redemption_window_open: evGr.getValue('redemption_window_open') === 'true',
            })"""

new_event_push = """            events.push({
                sys_id: evGr.getUniqueValue(),
                number: evGr.getValue('number') || '',
                name: evGr.getValue('name') || '',
                state: evGr.getValue('state') || 'draft',
                upi_id: evGr.getValue('upi_id') || '',
                upi_payee_name: evGr.getValue('upi_payee_name') || '',
                registration_fee: parseFloat(evGr.getValue('registration_fee') || '300.00'),
                description: evGr.getValue('description') || '',
                start_date: evGr.getValue('start_date') || '',
                end_date: evGr.getValue('end_date') || '',
                redemption_window_open: evGr.getValue('redemption_window_open') === 'true',
            })"""

content = content.replace(old_event_push, new_event_push)

# 2. Add recentTransactions, wallets, and settlements queries right before response.setBody in handleOrganizerOverview
old_resp_body = """        response.setStatus(200)
        response.setBody({
            success: true,
            kpis: {
                totalRegistrations,
                pendingRegistrations,
                verifiedParticipants,
                activeWallets,
                totalVerifiedFunding,
                totalWalletLiability,
                totalReserved,
                totalSalesVolume,
                successfulTxCount,
            },
            events,
            vendors,
            auditLogs,
                registrations,
        })"""

new_resp_body = """        // Query recent purchase transactions
        const recentTransactions: any[] = []
        const txGr = new GlideRecord('x_2327324_konnect_purchase_tx')
        txGr.orderByDesc('sys_created_on')
        txGr.setLimit(50)
        txGr.query()
        while (txGr.next()) {
            recentTransactions.push({
                sys_id: txGr.getUniqueValue(),
                tx_id: txGr.getValue('transaction_id') || ('KF-TXN-' + txGr.getUniqueValue().substring(0, 4)),
                time: txGr.getValue('sys_created_on') || '',
                participant: txGr.getDisplayValue('participant') || txGr.getValue('participant') || '',
                vendor: txGr.getDisplayValue('vendor') || txGr.getValue('vendor') || '',
                amount: parseFloat(txGr.getValue('coupon_amount') || '0'),
                status: txGr.getValue('status') || 'Success',
            })
        }

        // Query wallets
        const wallets: any[] = []
        const wGr = new GlideRecord('x_2327324_konnect_wallet')
        wGr.orderByDesc('sys_created_on')
        wGr.setLimit(50)
        wGr.query()
        while (wGr.next()) {
            wallets.push({
                sys_id: wGr.getUniqueValue(),
                wallet_id: wGr.getValue('wallet_id') || '',
                participant: wGr.getDisplayValue('participant') || '',
                available_balance: parseFloat(wGr.getValue('available_balance') || '0'),
                reserved_balance: parseFloat(wGr.getValue('reserved_balance') || '0'),
                status: wGr.getValue('status') || 'active',
            })
        }

        // Query settlements
        const settlements: any[] = []
        let settledCount = 0
        let approvedCount = 0
        let pendingSettlementCount = 0
        const setGr = new GlideRecord('x_2327324_konnect_settlement')
        setGr.orderByDesc('sys_created_on')
        setGr.setLimit(50)
        setGr.query()
        while (setGr.next()) {
            const st = setGr.getValue('status') || 'pending_review'
            if (st === 'settled') settledCount++
            else if (st === 'approved') approvedCount++
            else pendingSettlementCount++
            settlements.push({
                sys_id: setGr.getUniqueValue(),
                settlement_id: setGr.getValue('settlement_id') || '',
                vendor: setGr.getDisplayValue('vendor') || '',
                amount: parseFloat(setGr.getValue('gross_amount') || '0'),
                status: st,
                bank_ref: setGr.getValue('bank_reference') || '-',
                created_on: setGr.getValue('sys_created_on') || '',
            })
        }

        response.setStatus(200)
        response.setBody({
            success: true,
            kpis: {
                totalRegistrations,
                pendingRegistrations,
                verifiedParticipants,
                activeWallets,
                totalVerifiedFunding,
                totalWalletLiability,
                totalReserved,
                totalSalesVolume,
                successfulTxCount,
                activeVendorsCount: vendors.length,
                settledCount,
                approvedCount,
                pendingSettlementCount,
            },
            events,
            vendors,
            auditLogs,
            registrations,
            recentTransactions,
            wallets,
            settlements,
        })"""

content = content.replace(old_resp_body, new_resp_body)

# 3. Update handleOrganizerEventAction to save registration_fee
old_update_action = """            if (body.description) evGr.setValue('description', body.description)
            evGr.update()"""

new_update_action = """            if (body.description) evGr.setValue('description', body.description)
            if (body.registration_fee !== undefined) evGr.setValue('registration_fee', parseFloat(body.registration_fee) || 300.00)
            evGr.update()"""

content = content.replace(old_update_action, new_update_action)

old_create_action = """            newEvGr.initialize()
            newEvGr.setValue('name', name)
            newEvGr.setValue('upi_id', upiId)
            newEvGr.setValue('upi_payee_name', payeeName)
            newEvGr.setValue('state', state)
            newEvGr.setValue('description', desc)"""

new_create_action = """            newEvGr.initialize()
            newEvGr.setValue('name', name)
            newEvGr.setValue('upi_id', upiId)
            newEvGr.setValue('upi_payee_name', payeeName)
            newEvGr.setValue('registration_fee', parseFloat(body.registration_fee) || 300.00)
            newEvGr.setValue('state', state)
            newEvGr.setValue('description', desc)"""

content = content.replace(old_create_action, new_create_action)

with open('src/server/restEndpoints.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print('Successfully updated restEndpoints.ts with registration_fee and dynamic overview data!')
