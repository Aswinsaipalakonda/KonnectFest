import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    acl_digital_coupon_read: {
                        table: 'sys_security_acl'
                        id: '59403fe8f1d44e099891ec9650a7f6b0'
                    }
                    acl_event_create: {
                        table: 'sys_security_acl'
                        id: '0eb2ae9b5f754cb3ae919e13f86471ab'
                    }
                    acl_event_read: {
                        table: 'sys_security_acl'
                        id: '3b247cbdaac94eb8ab8645505b435875'
                    }
                    acl_event_write: {
                        table: 'sys_security_acl'
                        id: '69c67e71a99c4ab899c84e0d88144014'
                    }
                    acl_participant_read: {
                        table: 'sys_security_acl'
                        id: '149d8cf14f414b929e4d48fdd22b746f'
                    }
                    acl_participant_write: {
                        table: 'sys_security_acl'
                        id: '2cdd3979b8e049c9b30176130de5f0b4'
                    }
                    acl_payment_create: {
                        table: 'sys_security_acl'
                        id: 'aea713ff4f484f0fb31527f6e58b1279'
                    }
                    acl_payment_read: {
                        table: 'sys_security_acl'
                        id: '0181fbdcce74467b91080d2db31abb88'
                    }
                    acl_payment_write: {
                        table: 'sys_security_acl'
                        id: 'd48a500876e04c778adff49c119c9c4f'
                    }
                    acl_purchase_tx_create: {
                        table: 'sys_security_acl'
                        id: 'ea6fd66bc8dc4f7593fe1f604b844af8'
                    }
                    acl_purchase_tx_read: {
                        table: 'sys_security_acl'
                        id: 'd98f0369128c419586de21a53bd40a3d'
                    }
                    acl_purchase_tx_write: {
                        table: 'sys_security_acl'
                        id: '9b6fa12fd8d0476fa6c2a3511da8e444'
                    }
                    acl_refund_create: {
                        table: 'sys_security_acl'
                        id: '038f061cedec4861801ffc0dc85dbd6f'
                    }
                    acl_refund_read: {
                        table: 'sys_security_acl'
                        id: '456afd7a18214fa99d9a88b88be2c003'
                    }
                    acl_refund_write: {
                        table: 'sys_security_acl'
                        id: '13a5c66e8a9f45e786c6a5dfec48a35b'
                    }
                    acl_reg_create: {
                        table: 'sys_security_acl'
                        id: '8a26deee119d41cdac9563dcd3ed37f8'
                    }
                    acl_reg_read: {
                        table: 'sys_security_acl'
                        id: 'd373401cbbf54530a30f766a8d2d5f19'
                    }
                    acl_settlement_read: {
                        table: 'sys_security_acl'
                        id: '669b3a8357fd4cfaa3b6c9fc618236e7'
                    }
                    acl_settlement_write: {
                        table: 'sys_security_acl'
                        id: '5759d8e7ba194631be7166f52ff95ac0'
                    }
                    acl_vendor_ledger_read: {
                        table: 'sys_security_acl'
                        id: 'bf4fd395e3614b4590acafe2a90b512d'
                    }
                    acl_vendor_read: {
                        table: 'sys_security_acl'
                        id: '40938b81de304b9b8e015b09b264fb06'
                    }
                    acl_vendor_write: {
                        table: 'sys_security_acl'
                        id: '15b1a3b686ae4185a1f60bbe50441c5a'
                    }
                    acl_wallet_ledger_read: {
                        table: 'sys_security_acl'
                        id: '28b4e44512e74f1aa19a8b9e7e9793a1'
                    }
                    acl_wallet_read: {
                        table: 'sys_security_acl'
                        id: '9ee43f12ac3c4533b4b05532f5c39c40'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'c3c6730d7c824f2e94eecfac9c31fdea'
                    }
                    br_payment_verified_trigger: {
                        table: 'sys_script'
                        id: 'c85bd596098340dfadbc838a2a15ba7a'
                    }
                    br_vendor_ledger_immutable: {
                        table: 'sys_script'
                        id: 'cfb90010b31346b0816fa5e87b83146b'
                    }
                    br_wallet_balance_guard: {
                        table: 'sys_script'
                        id: 'e5fbc2f0804b47eb9bdf5d867a8e4df7'
                    }
                    br_wallet_ledger_immutable: {
                        table: 'sys_script'
                        id: 'defe958b9f7d48208b0633881da84e34'
                    }
                    br0: {
                        table: 'sys_script'
                        id: '036b8af63dab4130adcc3724ffeb26e0'
                        deleted: true
                    }
                    cs0: {
                        table: 'sys_script_client'
                        id: 'd39ac8e603104dfd927429e824d2afb4'
                        deleted: true
                    }
                    menu_konnectfest: {
                        table: 'sys_app_application'
                        id: '20e21853e8f040dbbe61872653a586b2'
                    }
                    mod_audit_log: {
                        table: 'sys_app_module'
                        id: 'a8e58113d2a2470c96d6061ba60b5104'
                    }
                    mod_digital_coupons: {
                        table: 'sys_app_module'
                        id: '484299aa219442dca38936341834b1d3'
                    }
                    mod_events: {
                        table: 'sys_app_module'
                        id: 'dd1ce39145b043468a8fa38cb46a409f'
                    }
                    mod_finance_workspace: {
                        table: 'sys_app_module'
                        id: '5c137a0350d34bd988482327b7b3ee82'
                    }
                    mod_organizer_dashboard: {
                        table: 'sys_app_module'
                        id: '6e08529228ec463794c1f0c45d40f04e'
                    }
                    mod_participant_portal: {
                        table: 'sys_app_module'
                        id: '0dd9774bc21749869356489f7ccbc8d3'
                    }
                    mod_participants: {
                        table: 'sys_app_module'
                        id: '3b501de8edd64efc998c33baa28da39b'
                    }
                    mod_payments: {
                        table: 'sys_app_module'
                        id: 'd7e4b7e005384c70a4eb768e7c61ca2c'
                    }
                    mod_public_register: {
                        table: 'sys_app_module'
                        id: 'c30225bbd4af4ef4a94800d76d09b1d4'
                    }
                    mod_purchase_tx: {
                        table: 'sys_app_module'
                        id: '3c1efd94ad5841ee8f5ee5cdf3d20344'
                    }
                    mod_refunds: {
                        table: 'sys_app_module'
                        id: '2e3044c9e649477181ddcb65736fdf76'
                    }
                    mod_sep_finance: {
                        table: 'sys_app_module'
                        id: 'f62cbc84552d4b39a695dae9127d6a46'
                    }
                    mod_sep_records: {
                        table: 'sys_app_module'
                        id: '92d5bfff6aac4558b141c06b07aeba4a'
                    }
                    mod_settlements: {
                        table: 'sys_app_module'
                        id: '32562b004f7f4ec4ae2d379da94a71e0'
                    }
                    mod_vendor_ledger: {
                        table: 'sys_app_module'
                        id: 'eadef2d9c0214da6acd3d003a9d8f68c'
                    }
                    mod_vendor_workspace: {
                        table: 'sys_app_module'
                        id: '61d2561cc7ca4682b3502d0faf640cc4'
                    }
                    mod_vendors: {
                        table: 'sys_app_module'
                        id: 'efa7733512bd482bba27495d3d575136'
                    }
                    mod_wallet_ledger: {
                        table: 'sys_app_module'
                        id: '82b75dafa48e4925838efdf6535af5c5'
                    }
                    mod_wallets: {
                        table: 'sys_app_module'
                        id: '3cf684988e9b49db98268db8a50db494'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '4ca725d311984435a7273f6265a2417e'
                    }
                    rest_konnectfest: {
                        table: 'sys_ws_definition'
                        id: 'a6baecc1f732452eb008d40224a9b9dc'
                    }
                    route_confirm_purchase: {
                        table: 'sys_ws_operation'
                        id: 'eaef220399cd45cb94e5e8e537d6f51e'
                    }
                    route_finalize_refund: {
                        table: 'sys_ws_operation'
                        id: '4b0341dfbf6142c88484a8062b2cebe6'
                    }
                    route_finance_queues: {
                        table: 'sys_ws_operation'
                        id: '05cb55e455bf4b8b95a0f8dd4b82324d'
                    }
                    route_get_qr_details: {
                        table: 'sys_ws_operation'
                        id: '2aeab9345cc54f4b9b1dc329e91ef24d'
                    }
                    route_organizer_bulk_allocate: {
                        table: 'sys_ws_operation'
                        id: 'a829c18e490b43f4a2f8c3a23dda40e1'
                    }
                    route_organizer_event: {
                        table: 'sys_ws_operation'
                        id: '128515df120e4a37ae8a734fd7eec46d'
                    }
                    route_organizer_overview: {
                        table: 'sys_ws_operation'
                        id: 'c4ccf9cf5d81477086f95d4dbed5bce7'
                    }
                    route_organizer_vendor: {
                        table: 'sys_ws_operation'
                        id: 'b9016d1642cb45cba76e317271433c88'
                    }
                    route_participant_auth: {
                        table: 'sys_ws_operation'
                        id: '26ba09d6c35a473e8123cd0a378e1313'
                    }
                    route_participant_dashboard: {
                        table: 'sys_ws_operation'
                        id: '36686d8eb08049bab21fce3f3eb4cca6'
                    }
                    route_pay_settlement: {
                        table: 'sys_ws_operation'
                        id: 'eb6878fa39084cb4a791b284ea334260'
                    }
                    route_public_events: {
                        table: 'sys_ws_operation'
                        id: '0b1d3a1225eb4fbf898cf6e952ed2534'
                    }
                    route_public_script: {
                        table: 'sys_ws_operation'
                        id: '16b973a89ae64a0ebf7e30f83dcb65c5'
                    }
                    route_register: {
                        table: 'sys_ws_operation'
                        id: '1f02b6dfca2a4842b51c0c3a3572d880'
                    }
                    route_register_utr: {
                        table: 'sys_ws_operation'
                        id: '29039b2613c34804bae34aa7dc88b74f'
                    }
                    route_reject_payment: {
                        table: 'sys_ws_operation'
                        id: 'f5ff91eb583a4deebb21b44b4214faa2'
                    }
                    route_reject_refund: {
                        table: 'sys_ws_operation'
                        id: '5274b48fd80b45d78038b61e766fde5a'
                    }
                    route_request_refund: {
                        table: 'sys_ws_operation'
                        id: '94603829e1ac41f7b4f5bc0bd546f33b'
                    }
                    route_settle_vendor: {
                        table: 'sys_ws_operation'
                        id: 'a531bf1e385c4e60ad1cb87c5ca9ec2b'
                    }
                    route_topup: {
                        table: 'sys_ws_operation'
                        id: '67a79da604f34a0584c39fda7f928736'
                    }
                    route_vendor_create_qr: {
                        table: 'sys_ws_operation'
                        id: '1236dda6f5964a22b4796493309caf57'
                    }
                    route_vendor_dashboard: {
                        table: 'sys_ws_operation'
                        id: '7a1cb88b04ea48d68bffeff3f87e630b'
                    }
                    route_verify_payment: {
                        table: 'sys_ws_operation'
                        id: '80beea68159d424ab83d9045b5ac5e51'
                    }
                    si_qr_helper: {
                        table: 'sys_script_include'
                        id: 'bdffede587894e22ad9d1c1db5276095'
                    }
                    si_wallet_helper: {
                        table: 'sys_script_include'
                        id: '859213d74d034a4bb4e0d17b6eae808c'
                    }
                    src_server_businessRules_ts: {
                        table: 'sys_module'
                        id: '09ead1114b764dc9ac01c0a1dbac7b0d'
                    }
                    src_server_paymentService_ts: {
                        table: 'sys_module'
                        id: '8e5731910c44416c88197ffd210b6381'
                    }
                    src_server_qrService_ts: {
                        table: 'sys_module'
                        id: 'd3b5e557044c4cde90ec1273cc843725'
                    }
                    src_server_restEndpoints_ts: {
                        table: 'sys_module'
                        id: '97815d0cb10c4723ae133d2109a63267'
                    }
                    src_server_script_ts: {
                        table: 'sys_module'
                        id: '44f78a6c32b940209ed83b54f2395968'
                    }
                    src_server_settlementService_ts: {
                        table: 'sys_module'
                        id: '40eb512e3e2748de9426d6c7da4d4739'
                    }
                    src_server_walletService_ts: {
                        table: 'sys_module'
                        id: '1e133c25b0cb4121b1c4e65f437cacb6'
                    }
                    sys_public_finance_workspace: {
                        table: 'sys_public'
                        id: 'efa64f9a097f4f12af49aa7ba3396fa3'
                    }
                    sys_public_organizer_dashboard: {
                        table: 'sys_public'
                        id: 'd802b8f35e4046b2af77b1f02c5d7ed7'
                    }
                    sys_public_participant_portal: {
                        table: 'sys_public'
                        id: '99f986a129354b199305f0be0da5050f'
                    }
                    sys_public_register: {
                        table: 'sys_public'
                        id: '37986823673247bc8293576a054c70fe'
                    }
                    sys_public_vendor_workspace: {
                        table: 'sys_public'
                        id: 'd4d06d2e64594f88a1f82e2a79044d5a'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '00050ab4da094d96a3af360e9bf47286'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'reviewed_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '000a118f23cf4b67b53579914db4dc32'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0011ed24831f483f9b2a1c80cbf9f8c5'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '005620e72a5f4a2084b2b36d288caf8c'
                        deleted: true
                        key: {
                            sys_security_acl: 'd373401cbbf54530a30f766a8d2d5f19'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '00817c7c35e84d49b5c1c2f6c6c6b81e'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'financer_decision_by'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '00eecbb1adad4eb98a8518dd9eb6dccd'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '00f0d2b06d724d568c55ffa085db5b31'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '012da21a052c465f82a7c9c7a86138ad'
                        deleted: true
                        key: {
                            sys_security_acl: '9b6fa12fd8d0476fa6c2a3511da8e444'
                            sys_user_role: {
                                id: 'a56c343d362748de9c1ea5db806766e0'
                                key: {
                                    name: 'x_495021_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0180f2cedb2d48b5ae0f0091846351bd'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'wallet_credit_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '019b1589d1f74045853ac774ccd8201d'
                        deleted: true
                        key: {
                            sys_security_acl: '3b247cbdaac94eb8ab8645505b435875'
                            sys_user_role: {
                                id: '51c600322aa745de84343a97579b83da'
                                key: {
                                    name: 'x_495021_konnect.vendor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '01b0b5fe0e6347fbbcf7410c797a51e4'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '025a64a79fa6478997c7cdc3daf73bf0'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'coupon_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '02602eaf13b74afdb32c173f53ef39aa'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'debit'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '027cecd049364643b422e249007fcff1'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '02b6e5a0b5994ad98d2c1b1a668f8987'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'coupon_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '02e4eede2f924a73a26802d48e1ab2f1'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'status'
                            value: 'verified'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '02ea18a86cae4a81a464341f154ea81f'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'reserved_balance_before'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '02fc7f029d414e4489aeb8497fb9ecaa'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '03209474c1cf40649bdb2119aeb8696e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'wallet_credit_status'
                            value: 'credited'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '03543eadb40f4f668c9966c2b5a1e0b5'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'bank_ifsc'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '036937934e6e4cf9840d685b2fdb8371'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '039e21a232ec450585d963a8662a7614'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '041ec96c67fd429b953563f5a08e7b03'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'status'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '049241c56b1f4a56871283631f7c31cf'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '04b05dcee50346d9bfb14031a0034ab9'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'top_up'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '04c1735bffb241848f8d802cf15e36a9'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '050c3420b4664f42a66fec4fe3c78139'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '0529f4aeb9b64d1ba39d1d900c3d7e56'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '054fd2c06c4a43ddb956c90f7b38993d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '055f8c6b607a45ab8157d3a0390051ba'
                        key: {
                            sys_security_acl: '2cdd3979b8e049c9b30176130de5f0b4'
                            sys_user_role: {
                                id: '754a6cdbfd7e4ce9b4882601c4b20bd8'
                                key: {
                                    name: 'x_2327324_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '0561c29edf6b4b74a7e79ad16d278cbe'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '05d02d18e85d41cc81bed6ae745d898c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'item_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '05e2d9fc952d4c1897ffcafabe4a12fa'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '05e9201deee54584a6a7181742f6ccf7'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '06263c9cce4a4527aca1a08aaac21c57'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'status'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '068ab55bcb694b59b1d6ad11919c4277'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'verified_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '068e8f880335409fb757249904369e15'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '077a38c0128f4537ae9e1680679d146c'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '07f9a467821542969a63e14c2534db05'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '082f90aaa73b4eac9e0e3ba7e82652b1'
                        key: {
                            name: 'x_2327324_konnect_vendor_stall'
                            element: 'stall_code'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0886e3dc39274a1c8182ffdd1087fe3d'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '08a7e606c2fb499f8d1a79bfad588e51'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '090d72727bf4498982df2585bec202ed'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'net_payable_amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '092b45b33f23444787189803ce46028b'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0a0630d5379741f4a62ec40688df4213'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'requested_initial_amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0a6e754bdc274887a902e9a2b0fba3bd'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0a920ed384ed41e4a0cc6a4c525c5cd4'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'action'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0ac0221106514a3bac7c6dacc8351b77'
                        key: {
                            sys_security_acl: '9ee43f12ac3c4533b4b05532f5c39c40'
                            sys_user_role: {
                                id: 'fc4c27ceff30432496a08f49e7313bee'
                                key: {
                                    name: 'x_2327324_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0b3072d5d37c4e1e94ae41591daa0fe8'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0b47d6538e454d6ca489137af709add3'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0b531519869e4615b6347b9d171d6f78'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'rejection_reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0be938d63b1f4f828131cf98cda8a96d'
                        deleted: true
                        key: {
                            sys_security_acl: '2cdd3979b8e049c9b30176130de5f0b4'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0becd6438c5b40d89bde99a3c4836484'
                        key: {
                            sys_security_acl: '40938b81de304b9b8e015b09b264fb06'
                            sys_user_role: {
                                id: '754a6cdbfd7e4ce9b4882601c4b20bd8'
                                key: {
                                    name: 'x_2327324_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0cc43155c5664893a5ac306d0d7e1938'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'status'
                            value: 'submitted'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '0cc671c14fe2431691be8afa6ddf99c6'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0d1deb6f670d46329ee50ce49d3ecbf5'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0d1f03a62d3b45d884df3ae137e47411'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'purchase_transaction'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0d25c926d35a4aa9a4f3e77758a1ee6a'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0d5884d491d64372a66d8d72d8a448f9'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0d7d3b6d16614e9e89704067ed04e828'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'category'
                            value: 'merchandise'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0e2b392d8c6840dd934c3d30f7ab7128'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'total_credit_amount'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '0ea2bf12ce024656a491ba93e0198929'
                        key: {
                            category: 'x_2327324_konnect_participant'
                            prefix: 'PAR'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0ea94825ceea40ddbe6a8c9a1635006d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'assigned_user'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0eb31c2acc6641bfb7dddbcdc449cd4e'
                        deleted: true
                        key: {
                            sys_security_acl: 'd98f0369128c419586de21a53bd40a3d'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0fd0480d23724f50afa53311aab624cd'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'confirmed_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0ff00765f918487f9bab6247492b8158'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '10771395ef9b49d49ba89a85fff96876'
                        key: {
                            sys_security_acl: '13a5c66e8a9f45e786c6a5dfec48a35b'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '1086af888b934ddfb200d07eeb64b26b'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1097c86794794c27b0de40979fed78d3'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'type'
                            value: 'event_topup'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '109e38fccbbf4caeaeabad202eab6ebb'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'last_transaction_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '10c34fc2c1b348ca9b4112a05c97d90c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'redemption_deadline'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '11373b8900e44e4e92ae8a0ffb15f8a2'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1147e0dcafad40dd8ec165dc353d2b89'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '11da1771d5bc4fcfb20c14ff522e8656'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '11e330710fc64455a116c3ea5d13ed46'
                        deleted: true
                        key: {
                            sys_security_acl: '13a5c66e8a9f45e786c6a5dfec48a35b'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '11f2063503a4465386744af39aa85495'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1211ec20eabf480b83d2253d199df091'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'bank_ifsc'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1296e99c203a46259c08df5e5e0dfd96'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'status'
                            value: 'approved_for_payout'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '129b1b81b5e744b99d051d1288258dc9'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'state'
                            value: 'draft'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '12ea759cb4bd41f296ae4b131fbead0f'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'status'
                            value: 'draft'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '136223d917a14f0695babc41f64c1e0c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'status'
                            value: 'frozen'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '13e57634207744a29bc7b89be1f42fc8'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'requested_initial_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '13ff893c93784ca6bee0b3a3038dadcd'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'net_payable_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '146f237423f7404a88caa36a85652530'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'rejection_reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1516cdf731bc411198c8e15f5577d722'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '15967f4b3ff047aebb742b2994318413'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '15e772c336e4431f85e33eb9071a4b6b'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '167ff782102743158718b05bc14dee46'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '16b2a923c35a464badc58cbead3ff5f7'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '174a62efc58d4c10a66010217270e1ed'
                        key: {
                            sys_security_acl: '8a26deee119d41cdac9563dcd3ed37f8'
                            sys_user_role: {
                                id: 'fc4c27ceff30432496a08f49e7313bee'
                                key: {
                                    name: 'x_2327324_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '17fc1ec2cf254263a795283d52829e9e'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '180aa9cf23cd4f9b99331e5621b89d01'
                        key: {
                            sys_security_acl: 'aea713ff4f484f0fb31527f6e58b1279'
                            sys_user_role: {
                                id: 'fc4c27ceff30432496a08f49e7313bee'
                                key: {
                                    name: 'x_2327324_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '18bcd22e0c9b4729aa8c4ce699415fb6'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'status'
                            value: 'pending_verification'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '198956c81d9942358477253b8b8b0e14'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1a29d5a064c94edcb1ddf9bd1e18da4e'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '1a394e3deb1e4ecfb538adc66b255ec6'
                        deleted: true
                        key: {
                            sys_security_acl: 'aea713ff4f484f0fb31527f6e58b1279'
                            sys_user_role: {
                                id: 'a56c343d362748de9c1ea5db806766e0'
                                key: {
                                    name: 'x_495021_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1a6a2243193b402a93d4eea67a11fb4b'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'wallet'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1a7ff7485688458bafe102dd51918a48'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '1ab01815cc6a4b4d95dd30be455e7361'
                        key: {
                            sys_security_acl: '9ee43f12ac3c4533b4b05532f5c39c40'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1abf8f15b2b343a58dac3782efcffedc'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'status'
                            value: 'cancelled'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1ad8076bcff548b7897b2307a6d1958a'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1adec0361515489da0adc76d57bc25d0'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'purchase_transaction'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1afffb5b644743c29d13a41ae57e5f2e'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'bank_account_holder'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1b3884deced7468caba224b28dada63e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '1bb09fcfef964a9a8f92a363b926d05b'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'wallet_credit_status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1bf8bd35038f4acfb3ec186899ef1a73'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'category'
                            value: 'other'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1c050a00eb0549e58187bdb5f7f8bd0d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1c087624da9443308ee3f17351cecb20'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1c0d86a5010348148605a7d7a34c18af'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1c1367e77a694c06a6a95e4377d6316a'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1d0d512bd20641138435a43da6efe811'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1e14dae6b2f74c1aadd6ffa8dbe3c762'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'stall_code'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1e499752a0df409285f37f60cea75d87'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'financer_decision_by'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1e540a3e065d401cae55648b74c5e8df'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1e5eb04be23948d982994c19b07d3b91'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'purchase_transaction'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1e9c7147a0fe442bbfa0e6113c299aed'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'status'
                            value: 'success'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1f3ee83caab44c5398b920061fd3aaf3'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1f4d6287a5ec45758e9274cca09bc99b'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '1f730f9cff53417cb762adf7ddab2a2c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1fc2dea6f61d448aa38980bde8481db3'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'participant_id_code'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1fd1cd097fda4be6929c0f07186cde7a'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '203ea5992f1e4121b55d4497128366a5'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'status'
                            value: 'paid'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '20cb71010152484a83f2c13f29318314'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '20dbaa18dd684ae5b4db2645344a2091'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '213936978f3d4f4fb154702cc9be939c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'state'
                            value: 'active'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '214953bc1a3b4c388f391c4cfa051032'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'reserved_balance'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '219e8c66946f4ff6bc212401cdc111e9'
                        deleted: true
                        key: {
                            sys_security_acl: '0eb2ae9b5f754cb3ae919e13f86471ab'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '21d8a50b23c94c39958df86879009f71'
                        key: {
                            sys_security_acl: '669b3a8357fd4cfaa3b6c9fc618236e7'
                            sys_user_role: {
                                id: 'fd005092a2ad4397945afc0fa039ae69'
                                key: {
                                    name: 'x_2327324_konnect.vendor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '22511bad7232466fbbda5bc42fe0736d'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'verified_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '23000095f8934fcd9ca55a81b4c2c365'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'rejection_reason'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '230e85211381400d888e0e60599f78af'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'status'
                            value: 'active'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2321dc08e1b74c6eb8df6ee3f9c6b892'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '233930abf46842bd887c8c5976c90c82'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'qr_token'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '236eff4e647042be9d711a40d06705f6'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '23a64b82abb7403e8f6a115017b897e4'
                        deleted: true
                        key: {
                            sys_security_acl: '28b4e44512e74f1aa19a8b9e7e9793a1'
                            sys_user_role: {
                                id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                                key: {
                                    name: 'x_495021_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '240d0576b2df4e62876b27dc2d4cc691'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'bank_ifsc'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '242ffe570bf04c81a69f6eb486985bea'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'qr_expires_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '243a07135fa94d53b76089faf32d1f67'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '24ac14a3491f40309bd5e53908ede2b6'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '24cfda5f67cb40c7a89cdcb7ec517ed9'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'category'
                            value: 'services'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '24dd54bdb7894d60941bda181e4746b1'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'target_record'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '24ec98b37ce34b6687b3ebc14e0cec28'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                            value: 'confirmed_processing'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '24f53de6db874702b1d2bf4172358463'
                        key: {
                            sys_security_acl: 'd373401cbbf54530a30f766a8d2d5f19'
                            sys_user_role: {
                                id: 'fc4c27ceff30432496a08f49e7313bee'
                                key: {
                                    name: 'x_2327324_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '250f2f0212634b768df1590ac583ba3e'
                        deleted: true
                        key: {
                            endpoint: 'x_495021_konnect_participant_portal.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '251a013c6d1a4d529af5a7ce34fc5316'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'source_payment'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '255cb3b4e5a3407ba4b294b1717bfcab'
                        deleted: true
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'max_topup_amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '25635ad622c140a1a00bd1258c0986aa'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'credit_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2571c15eb97f4e8092f2ab0302f05bce'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'reason'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '259915fa52134db8a28a368d0eb7397f'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '259fe300d5a14882b4de4f5ef124909f'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'total_refunded'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '26b0c040db0942209712e2faee80859a'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'initial_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '26c641c127cd4a428ac92925e4ac1ba5'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'purchase_transaction'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2711d4bab303412aa354b478ef80cdff'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '27f9fd1f3ff941db99ab1c1c9c1cfa9d'
                        key: {
                            name: 'x_2327324_konnect_payment'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '286e557d52a84b01a755b0c404d06fe8'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'location_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '298a948d826f433990146d70a7fb8a21'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '29c686991f4840ffbac865e695fad6d0'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'assigned_user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '29de972d17024ccd90ebf9face88f3fb'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'source_transaction'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '29ec24a923b649e28d653f2c2c66f1c1'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2a0b6018cd8a4fb786d17d58356bd473'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'status'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2aabfc400c65449ab1dc3490902fc203'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'available_balance'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2adea6220b4043708a640be5ab218b30'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'type'
                            value: 'initial_registration'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2b371ad26bab410dbbf79208751c179d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'status'
                            value: 'redeemed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2b3987e7a514467983ca1ba284b6a7b9'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'adjustments_amount'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '2b89a58f896b4051b2a6e54cd66c66f8'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2bad0e8cb2754f1fb06dff0fdb893cc0'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'phone'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2c0bb3a700934327974a60be36f47342'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'redemption_window_open'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '2cbc2173ac05413d9e5d5a16d3862750'
                        deleted: true
                        key: {
                            sys_security_acl: 'd98f0369128c419586de21a53bd40a3d'
                            sys_user_role: {
                                id: '51c600322aa745de84343a97579b83da'
                                key: {
                                    name: 'x_495021_konnect.vendor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2cd0d1afe13b4963b8cf2617ff37b4db'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2ce73522ed7f4a948d1bf2b2c954c5f0'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'idempotency_key'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2d074a4faf784ed2a134774234665cc9'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'timestamp'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '2d60be996d604f1f945cbf9c6dad3f6a'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2d9054764a784d50b1070bce6570580d'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'status'
                            value: 'active'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2dd345e3eeba44a6abca625162630ed1'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'state'
                            value: 'active'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2e65a8391fba475c9a1a21e6f0b10476'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'max_topup_amount'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2e7e1212486945f7926bda2b6943c1d2'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2eb23a5e70b24bae9580d5320750b76b'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'state'
                            value: 'completed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2edb7371a1c04ba1af8a8d45669de881'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'total_refunded'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '2fce982feaac46d4b5bbf610276d398e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '307393fd1c6b4beab65d288bcabd7bfe'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'payment_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '30aab48b92644bb49d69a9cbe7612bb4'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'upi_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '30b2e977afca427c90d1f0d81fbc0f7f'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'value'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '31566e7727894bdc83138066931cf230'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '31833f26a3944f8495d9a5aa592775bd'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '32457d9df559444ea29a680fe122ea36'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'entry_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '32c5d86fbf0a4f499803f02a72d3d0d9'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'item_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '32ecf1807f1e44c1ae82dd91990ebc91'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'available_balance_after'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3322d1532a454f26ad64b9f0a217264f'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '332e5ddb68f24281904d9381f3f16a78'
                        key: {
                            category: 'x_2327324_konnect_wallet'
                            prefix: 'WAL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '33493bd151844bc38ab87b373bcf4b0e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'new_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '33921dccc2b642c59b73f0e750f4057b'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'idempotency_key'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '34472b03b9c041d28cd9a8a42b1153fd'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3477e0f6c2f04b07823e18cea10020a2'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'action'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '34878616f0584ae3a2b8229933e567b8'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '34969d4fa46f478db1ceb91ac66ff6c6'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'verified_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '34d8d1c55bc44971b1ce6911d7d12937'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'end_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3512f851e38f4b34ab7c77084f6e9b4c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '352cd84d510647e080e5dd2d6651a934'
                        deleted: true
                        key: {
                            category: 'x_495021_konnect_payment'
                            prefix: 'PAY'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '35831f75af0d4bd9825af40ce9a3dfa7'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'entry_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '361265f7909443079e4407d3e3374547'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '365ae3a4ac004f72999b45df5a1e99b9'
                        key: {
                            category: 'x_2327324_konnect_registration'
                            prefix: 'REG'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3666afc7e8414ac0994a7834826c9182'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '36e2d35eaa374b2ca194f911415a9d19'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '37027e898481427aaa48f0cfc782c049'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'rejection_reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '371f49817d81466f9609b965f19b1b38'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'qr_token'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '37571bbc14d14c27916f8510afdb54b8'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'phone'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '376372dab00c4f43bd19560f3223c1f6'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'item_description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '378059ea09b248c1833fc2263bbb93bc'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'refund_release'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3792e46a5d504410917a4d5c75326ec1'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'bank_account'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '37e21de146b646919c37efb53236c867'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'verification_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '38002524135f492ea3e70435e9098933'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'total_refunded'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3801b654e35d4e53ad0817341175177f'
                        key: {
                            sys_security_acl: '456afd7a18214fa99d9a88b88be2c003'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3850cd3f787446cbafe6dbcd16cc7889'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '387d31c23b4d4d3fa9da10cb4f6542dd'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3912f218a9414d5b9336daf820314be3'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'sys_user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3916e9e1894d4b0cae4a98b46b93826b'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '391bcf2274434eb4a17056fdb3c1383e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '39c3f812cb144a318f4aa00b7c2b852e'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'state'
                            value: 'draft'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '39e250c4ad74499d9f5ff49457f1ca66'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3a2a615c35ba45e599bb2d3071d5d7b7'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'rejection_reason'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3a2c5e41a425418e942012af5e7465a3'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'issued_at'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '3a4ef73ea9044f93a20158ca377409dd'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '3a6454fb910a468fb5045e63c638448b'
                        key: {
                            name: 'x_2327324_konnect_registration'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3a6ff5e3e40443b1af108ca5bc153b1d'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'status'
                            value: 'verified'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3aca8ba1094448eaa78dfda05d75e560'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'start_date'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '3b4b8edb87624ae498c3b2b4f12063e7'
                        deleted: true
                        key: {
                            category: 'x_495021_konnect_audit_log'
                            prefix: 'AUD'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3b535ca3f39346fe9fede2b80bc72cea'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3b579bcfe8a842019a9d890d80fe6f94'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3b699cd797d54cf884db25ead7fc2e55'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'status'
                            value: 'payment_proof_received'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3bbabcf97e51408080bcfb0c18631666'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'status'
                            value: 'settled'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '3bc8b2cdb2a64dee85c3a7c8df4c22e0'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3c4b520dba034619be01ef5e1fd6c800'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'actor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3c7c1cd5180846329523b7b336067f91'
                        key: {
                            sys_security_acl: '669b3a8357fd4cfaa3b6c9fc618236e7'
                            sys_user_role: {
                                id: '754a6cdbfd7e4ce9b4882601c4b20bd8'
                                key: {
                                    name: 'x_2327324_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3c9193c41f7a4527beab401a7e10fc6c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'net_payable_amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3cd3c73e976f40b2af365310588b27a5'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3cd7d3fee47e4ae0b7d30fa65b8158a5'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'bank_account'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '3d4c647fb86f41e589f7c9b5e3b6b1e6'
                        key: {
                            category: 'x_2327324_konnect_purchase_tx'
                            prefix: 'TXN'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '3d6e700ccad44c75aa8d37a0cf7de663'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '3d7453cc7f9240609eb7f2b50d21373b'
                        deleted: true
                        key: {
                            category: 'x_495021_konnect_refund_request'
                            prefix: 'REF'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '3d827b2bc2534767a6cc9cdc706d79f2'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3da06a55364d4f44891ba14cd6dbf751'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'status'
                            value: 'settled'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3e2492cae9844f1aa6e16ef52e630091'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'action'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3e569e5ee17845b48c02e1885e6ae7f5'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '3e964297855f418282e0367e8419b6ab'
                        key: {
                            endpoint: 'x_2327324_konnect_participant_portal.do'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3ebff1fb256e46ecaee47ec131b8f340'
                        deleted: true
                        key: {
                            sys_security_acl: '69c67e71a99c4ab899c84e0d88144014'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3eedf3e81aba4ed1b297e9b0d65ccb04'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'credit_amount'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3f58d362a05b453d8add5c4b821eaea6'
                        key: {
                            sys_security_acl: '59403fe8f1d44e099891ec9650a7f6b0'
                            sys_user_role: {
                                id: 'fc4c27ceff30432496a08f49e7313bee'
                                key: {
                                    name: 'x_2327324_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '40aa963c310d40d1a63b85ea3cfb4ab8'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'verified_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '40dacec0708a401387345bc90510414f'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'wallet_credit_status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '40f7bb2faef441d7916f8f74b7191ceb'
                        deleted: true
                        key: {
                            sys_security_acl: 'd98f0369128c419586de21a53bd40a3d'
                            sys_user_role: {
                                id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                                key: {
                                    name: 'x_495021_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4112ccc99f364d23a9ad2c052448ecb6'
                        deleted: true
                        key: {
                            sys_security_acl: '9ee43f12ac3c4533b4b05532f5c39c40'
                            sys_user_role: {
                                id: 'a56c343d362748de9c1ea5db806766e0'
                                key: {
                                    name: 'x_495021_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4113842fa0b64cbeaa38adfc79973d1e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'stall_number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '415e994a08274f5596b23a75b74600b8'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '41c8c98175ea4124b3afc6c1c88ee962'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'actor'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '42394e3685c14a9f8508d2d176a6c5bf'
                        key: {
                            sys_security_acl: 'd373401cbbf54530a30f766a8d2d5f19'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '423cce80a7aa4bb4b0a729cf6d4c4266'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'utr_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '42944ec39da649fda89d112e0686ff11'
                        key: {
                            sys_security_acl: '9b6fa12fd8d0476fa6c2a3511da8e444'
                            sys_user_role: {
                                id: 'fc4c27ceff30432496a08f49e7313bee'
                                key: {
                                    name: 'x_2327324_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '42b777b197754b6c849de9d4eb4d9ff8'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '42fa1e7c72f844b688a22bf5cddf40ff'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '434a2df8d5784b90b2601376da085c51'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'payout_reference'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '43e97777725d49cba7e9dc4008b6784d'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'bank_account_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '44208eb288c04f6baee50392f18b739b'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '44294267af9d4d8d8c607244c5269c1b'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '44913c8826fe45d19b887a2aa7307077'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'batch_id'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4552f29075bd438590a193f3c9fdbbc3'
                        deleted: true
                        key: {
                            sys_security_acl: '5759d8e7ba194631be7166f52ff95ac0'
                            sys_user_role: {
                                id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                                key: {
                                    name: 'x_495021_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '45c19174a1044f7997003c60b57858ee'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '461706aff46e42fd8f170c2a613dc29a'
                        deleted: true
                        key: {
                            sys_security_acl: '40938b81de304b9b8e015b09b264fb06'
                            sys_user_role: {
                                id: '51c600322aa745de84343a97579b83da'
                                key: {
                                    name: 'x_495021_konnect.vendor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '461c71af6e2c48f9a2b9149a375822c8'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4635ae12c1e844da9fcc46bfc576afbd'
                        deleted: true
                        key: {
                            sys_security_acl: '669b3a8357fd4cfaa3b6c9fc618236e7'
                            sys_user_role: {
                                id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                                key: {
                                    name: 'x_495021_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '466a7d6640734a1e83911300d868d8a3'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'status'
                            value: 'closed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '46bfea1545fe4057953ad39ef7bae17e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'reserved_balance_before'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '46c8be79ee2f4d48b22110f2a26eba44'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '470da179fb824b7294675ea7407cbd05'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'item_description'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '471250e6022d43b388c9e88488b8f102'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'status'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '4718867f8ecf4db3aa0cdff9349efaaa'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '473b3b31168541c087379e10b161c2f4'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '474264b95fcf43cf8d6dd65c0a541646'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'status'
                            value: 'reversed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '474c1a0c7d614d2fa8d67db48f641b1b'
                        key: {
                            name: 'x_2327324_konnect_vendor_stall'
                            element: 'location_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '474f7d5a0f674d1eb1845275e7976551'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'available_balance_before'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '47a862fcc75c48b98c91044060609847'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'reserved_balance_after'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '48c69888f659419bb0d22ee2b6b33e40'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'verification_date'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '48e1da2a64394d72b293652fb11ce4c5'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'status'
                            value: 'approved'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '4954e52ddae740259045e806f6378923'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '497c8f358cb34ee5ad762cdac696e3c8'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'qr_expires_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '499e188e54064202a42a72b3a4493ae9'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'financer_decision_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '49ddaa53a35944939510399ec05d156d'
                        key: {
                            name: 'x_2327324_konnect_vendor_stall'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4a9140e37d9d4db580f7292426984a03'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'total_spent'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4ab0eae4bef4456785b28c1d71a6fc29'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'wallet_credit_status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4aea7059127a48d4b4c39e7393d52480'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'item_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4b274483112a4ad19c1cdbb20f96b104'
                        key: {
                            sys_security_acl: '59403fe8f1d44e099891ec9650a7f6b0'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4b5f8bad2b6d4dadbe2a9ee351063bc0'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'reserved_amount'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '4bbe6adf51da4d229013943576b9ddc8'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4bc0b16abdd249f7b14019df566ba011'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4be5a46b9f0c414f8f2b7468e7e82b3f'
                        key: {
                            sys_security_acl: '0181fbdcce74467b91080d2db31abb88'
                            sys_user_role: {
                                id: 'fc4c27ceff30432496a08f49e7313bee'
                                key: {
                                    name: 'x_2327324_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4cfa405c764a41dea7346f7f25868893'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4d1c7111b838488a9f1ed454f2bb2ba1'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4d3329a60b2b4d06bbbe7acfa5ef0472'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'utr_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4d6546a01ff14d5ab614116dc500f2f3'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4da27310d5974d529bc1d5480207c596'
                        key: {
                            sys_security_acl: '3b247cbdaac94eb8ab8645505b435875'
                            sys_user_role: {
                                id: 'fc4c27ceff30432496a08f49e7313bee'
                                key: {
                                    name: 'x_2327324_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4e072d81e3874af1a2d8db5779146907'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'status'
                            value: 'submitted'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4e8a8548a7da43fe9858bcd82d8aff30'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'status'
                            value: 'active'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4f79b851b2964b438266505c3b1d4f1b'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4f9699057d014d508ba01e9509cce01e'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'assigned_user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4fbc8dea426b4afdb9fb49fdd60d5549'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4fd92aa649334d6589398c30d1e3cbb6'
                        key: {
                            sys_security_acl: '40938b81de304b9b8e015b09b264fb06'
                            sys_user_role: {
                                id: 'fd005092a2ad4397945afc0fa039ae69'
                                key: {
                                    name: 'x_2327324_konnect.vendor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4ff7f2fca4d0453b84895eb3b9b8d05c'
                        deleted: true
                        key: {
                            sys_security_acl: '149d8cf14f414b929e4d48fdd22b746f'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5025ee5dfd5a43cd987365036450e2ed'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '506f6acd64af4970a7453752fec42918'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'confirmed_at'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '508922b22c9d46698393eb5b87467d16'
                        key: {
                            sys_security_acl: '5759d8e7ba194631be7166f52ff95ac0'
                            sys_user_role: {
                                id: '754a6cdbfd7e4ce9b4882601c4b20bd8'
                                key: {
                                    name: 'x_2327324_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '50d1fc7b735b4667a32010975fcb53ee'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '50f7443346334946bbcd8cb49fc44f86'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'upi_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '510c256fb239469b8fd99d08d4977ec2'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'previous_status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5142faee80ad48349cdd348e598ae595'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5181404f420d4aada71e6ee04b2d1b3d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'timestamp'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '51986fd7b5ab4109afe119082c24839a'
                        key: {
                            category: 'x_2327324_konnect_event'
                            prefix: 'EVT'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '51a22007b2b6461fa7b977698ae0e5bd'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '51c600322aa745de84343a97579b83da'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect.vendor'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '52303f1905e44b3dbb6ec86fdcc82bb7'
                        key: {
                            name: 'x_2327324_konnect_event'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '525ed6eeca84474f9a77641513f45ef4'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'actor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '526a41f44e6a440a816c27152d572313'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '528754b97a0a47d38a4624cc59bdd3ec'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'refund_payout'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '528b470b79ec4f83818dc71cce1ec011'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5356e6ecc5194e5bab05668e88c3134d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'payout_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5374c8f8c2cc4f4c839dde05e948a4f3'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'verification_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '53a2f02b32fa4349807f0c87086210ca'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '53f99149c4544b0882e978222b8eba57'
                        key: {
                            name: 'x_2327324_konnect_event'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '53ffea124284438281b1ff8e1ce84303'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'status'
                            value: 'closed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '54a63f164a944efcbba5d0f0db222c48'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'upi_payee_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '54ca02b1ae204443996b1ab95fa6cf36'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'event'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '550a5c6b976a4376994d4cef3b1f7bdc'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5564e353ff7548a78f50af12cb4f3fef'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'total_credit_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5578dedae2824f77baa1c39ad9fcc339'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'registration_fee'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '558d11948be348e08fe3be56837cd9cd'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'payout_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '55bbd4c29d22494688ac51bdda43f694'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '561a6beeed58478fb3930f0d6246ce19'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'item_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5622d7edb2864ff3acafcdf2ab7db0d0'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'payment_screenshot_data'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '569198e3d01d489a8aa53af318409578'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5697504b245748f793a33df0b91a77f1'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '56f4f4fd5d7c4de590c456598620ccfe'
                        key: {
                            category: 'x_2327324_konnect_vendor_ledger'
                            prefix: 'VLD'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '576248ab394e47d7beb6edb7ca775e48'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '57c32767012c4afb99c9b7f727beb99a'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'payout_reference'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '57ce1cc9d29f454dafa8f7eef34b757c'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'category'
                            value: 'services'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '57f9543c4f51418fb22621d70af58f25'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'status'
                            value: 'unsettled'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '58023102a7904239ab22ff57c54f82e9'
                        key: {
                            sys_security_acl: 'd48a500876e04c778adff49c119c9c4f'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5827d5f281b049b1a6d23d9f8f42c285'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'status'
                            value: 'pending_verification'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '58797841836f4c62b7c5a98509d84988'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5887c5785daa429cad8608cbf417a6a3'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'settlement_batch'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5ad0fdc1aee14be3a702e7f8dc3cf0f8'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'payout_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5ad57fb514e84c0cbdbf0c312c906db7'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5b8270804189427498dbc122a08078be'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'status'
                            value: 'draft'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '5bb206e728454105903927a0d0b15cd1'
                        key: {
                            name: 'x_2327324_konnect_vendor_stall'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5bc55eade7f9458587a4a317595a8d07'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '5c31b28f06c84938a579903f81d42cb7'
                        key: {
                            sys_security_acl: '149d8cf14f414b929e4d48fdd22b746f'
                            sys_user_role: {
                                id: 'fc4c27ceff30432496a08f49e7313bee'
                                key: {
                                    name: 'x_2327324_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5c41d850d314471ba49f4883d3c19962'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'transaction_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5c4e3435fb084c4ab9449fea11bbfe9a'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'status'
                            value: 'deactivated'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '5c9660a094ff49b590a1138e7fbf7d8f'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5cdf5e4f7fe14b0d9d7815b85419ac97'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'status'
                            value: 'paid'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5d1602760c2d45658496f9d314b2e285'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'refund_payout'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5d21323391444e8394602ce59834811c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'proof_attachment_sys_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5d6c9b27a8d643449923c87b71cd9d3d'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'status'
                            value: 'approved_for_payout'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5dd47b3f8d2547d993c8494221dd87e1'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'status'
                            value: 'pending_verification'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '5dd66907ba4b455598c31451f05dee05'
                        deleted: true
                        key: {
                            sys_security_acl: '15b1a3b686ae4185a1f60bbe50441c5a'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5e1d19feebe5461a8f014a419bdca9bd'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5e3cc5c1fc4540609f0fb4d14215116e'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'status'
                            value: 'pending'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5e79b713fcb047fca6914ae3f9c89dda'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'rejection_reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5ea34e73157f42f294b67cbfea0f5d97'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'stall_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5eaaa0362a18499589067f95166068c7'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'email'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5f2d81cb87b84147b22b9224492e455c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'start_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5f32d93d54a04980a456db40d23ee585'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'reset_otp_expiry'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '5f7ae3f7a7c14bd9957f29165c1d49f6'
                        deleted: true
                        key: {
                            sys_security_acl: 'd48a500876e04c778adff49c119c9c4f'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '5fa00ef18c5d4c418273df9f4b19923f'
                        deleted: true
                        key: {
                            sys_security_acl: '149d8cf14f414b929e4d48fdd22b746f'
                            sys_user_role: {
                                id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                                key: {
                                    name: 'x_495021_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5fab9306e5654e65a45e790f8613f02e'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'transaction_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5fbc1ffc74f449da97a66c041083e47a'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5fd9141b78f9460cacf11716e174264d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'credit_amount'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5fe3b9aa2cab4ef7aeb1a533e3c8fa90'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'bank_account'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '600840059b9a417bba16c692c08de83e'
                        key: {
                            name: 'x_2327324_konnect_vendor_stall'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '603bd31fe98a49439e15675049e41968'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '609d3a967a2d4bc2a9cc1c7d79f60692'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '609da7f626184ee691500b1527891f5f'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'reserved_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '60a17a7d31fe432587926e806317eba0'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'settlement_batch'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '60d0e10753454c03a598fd288764b600'
                        key: {
                            category: 'x_2327324_konnect_wallet_ledger'
                            prefix: 'LED'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '60e116c28ca34d54a6a784f9e11fb133'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'status'
                            value: 'submitted'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '60ef47e6b6b44b4aa77bfe81c4e0d760'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '61217a4aebf44f9fb027e76b432c9cae'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6125f88a26844c67bbbc40d6558aa5eb'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '613bfbf604444f8ab67c5d70f1cabdc8'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'wallet_credit_timestamp'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6149282015a9460e8a874cf418780517'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'reviewed_by'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '615093391eca4f039079206437c5b3a3'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '615b78a273914637a8c503644f412831'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6173f765efc3466f8c850920cdcd015c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'purchase_transaction'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6189b729703b411fa57fb28f029f3a04'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'status'
                            value: 'in_settlement_batch'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '6193c5807a9a4f47bd651bcb97e4ba96'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '61f058d04dfd47298c464ac2110a8521'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'credit_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '61f2c4cd3f6e42c499794ea3d8c07c07'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'stall_number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '61f5d744d63d4770948916b40ea2df88'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6280309a6469400983532e4d943fc445'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '62e9bb18a2b44568a8600d4523ea3e10'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'redemption_window_open'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '63298a8773f6406892f5b8726f027d76'
                        key: {
                            sys_security_acl: '28b4e44512e74f1aa19a8b9e7e9793a1'
                            sys_user_role: {
                                id: 'fc4c27ceff30432496a08f49e7313bee'
                                key: {
                                    name: 'x_2327324_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '63722646dd664d45a857f72b83058aee'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '63acdd675dc74576884513fdfd340d87'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'new_status'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '63c3a9e202fe405abf1f03def1fe4f19'
                        key: {
                            name: 'x_2327324_konnect_registration'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '64054bbe85824d8889a63289c01dabb2'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '645d1b6b14074d9b8dd17218b649c2a9'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'status'
                            value: 'settled'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '648a910b90eb436685adeee9604fa4c1'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '653c567733454f909809815ce460f2f4'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '654a9452d6824094ad386aa191bb3a1b'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'available_balance_before'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '65560b7327b24dfabf55e8a9d593313d'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '65effacc67fa4f85a284bbc14116f892'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                            value: 'expired'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '660ee2d1726a4e7da320036626d4ce1b'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '661c95b5409449b4974a42be4f15fe71'
                        deleted: true
                        key: {
                            sys_security_acl: '40938b81de304b9b8e015b09b264fb06'
                            sys_user_role: {
                                id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                                key: {
                                    name: 'x_495021_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '664ead95e3a14dcab2b0606c724089b5'
                        key: {
                            name: 'x_2327324_konnect_vendor_stall'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '669e42bd9175482bafcc4153c6a216a2'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'category'
                            value: 'games_entertainment'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '66ace621c4844f32a57288426d42a414'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'reviewed_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '66e1b3cfac1342c9bcf50422a23b4b79'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'total_refunded'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '670cb180ccb341f4a88c3fad9c750097'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '6754bcdcee0a4e438c602dea22599a05'
                        key: {
                            sys_security_acl: 'ea6fd66bc8dc4f7593fe1f604b844af8'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '675a7d817e3144a99f50c50229e808e6'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'payout_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '67aa1167902640c99801f70601aed135'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'status'
                            value: 'verified'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '67ca2ef56e494ea6a36da6bb7072b493'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'sys_user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '67d1bc292e5e47b1a9f01f0d28d314e1'
                        deleted: true
                        key: {
                            sys_security_acl: '40938b81de304b9b8e015b09b264fb06'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '67d6b954fdf64b63aea3b60e7f6bad63'
                        deleted: true
                        key: {
                            sys_security_acl: 'bf4fd395e3614b4590acafe2a90b512d'
                            sys_user_role: {
                                id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                                key: {
                                    name: 'x_495021_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '67dc5019c523480a9eb3084fb07ed824'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '684856211d0145cfa10b923ffde5a453'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'source_transaction'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '68db855e08fb49b7af7e3f562af28345'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '68dfedc7d84b47ecb642d317942d14b5'
                        key: {
                            category: 'x_2327324_konnect_payment'
                            prefix: 'PAY'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '68e88cbacaff4472a17c5dd30b295632'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'last_transaction_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '692d1c3d470a4944b0970ba84fca1636'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '69dcf3109f854caebf7e98853b50a2f8'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'entry_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6a35a9c62e534d718297ec0f1e683a45'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6a5634226eb14ab69a994a2092317ee6'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'action'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '6ae2220cc8b84303b2597ed2940fc210'
                        key: {
                            sys_security_acl: '69c67e71a99c4ab899c84e0d88144014'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6ae7b9e09b9e46d6956f42bcaf9ba20d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'stall_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6af6161222d24fe7a66012663f00ab4b'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'available_balance_after'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '6affef411de545b59c76d81989b91ba2'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '6b857f9e688748f2b308ba2da38c6774'
                        key: {
                            sys_security_acl: 'bf4fd395e3614b4590acafe2a90b512d'
                            sys_user_role: {
                                id: 'fd005092a2ad4397945afc0fa039ae69'
                                key: {
                                    name: 'x_2327324_konnect.vendor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6b9e4336f67e480ca63667ec6352438d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6bb878685e2a46bd86091bced54f4f81'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6c4de3eb74524e83a02814b626419997'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'status'
                            value: 'under_review'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6c564f9af1484accbf2513c28852fb9e'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6c802a0bef0d4a599dcf360646a72d1c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'verified_by'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6ccbaf34298b41ceb1fcbaec7d3e3dfa'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'purchase_transaction'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '6cddfee1076f4ca497b8c4dc8c80a5b4'
                        key: {
                            sys_security_acl: 'd98f0369128c419586de21a53bd40a3d'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6db124f23dcb4f10bc13c4622bf50736'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'idempotency_key'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6dc562bd8cf041e7acdee1414d9bc94d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'participant_id_code'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6ddc52b5a50d4c66af1433a4a3587d54'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'bank_account_holder'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6e7aa37f830e439db5d133aed0c71a30'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6f220f78d1104450a923f115b495f1ad'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '6f4edcbf3cde44a08481e43f227b00b8'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6f6196bab30b4daa902d72a1f2064176'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'available_balance'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6f65ec6896774924bf83304203020c7a'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'state'
                            value: 'registration_open'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6f929a63591d4086b2669d4c1afbcea2'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '70065ba2ad6d4ed38d7343133344e06e'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'reserved_balance_after'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '700fdf03aeb546b9a9853c11c577de9d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7014da824c28436db3026d2e714c9c76'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'reset_otp_expiry'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7069b134b6784846b156dffec265290c'
                        deleted: true
                        key: {
                            sys_security_acl: '8a26deee119d41cdac9563dcd3ed37f8'
                            sys_user_role: {
                                id: 'a56c343d362748de9c1ea5db806766e0'
                                key: {
                                    name: 'x_495021_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '70ed5fa32c354f67b3588a2ab9554c7d'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '70f03d8e08d14705b8af321efb5e59b0'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'coupon_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '7115dbc215e8430bb811560463da4625'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '714345515b6e4b429e552653045e6281'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'category'
                            value: 'food_beverage'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '71577cc1c5df4280b1eb6db8c53d5b68'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'initial_amount'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '718b4fda3d5841aa9516a4c99caabe6f'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'category'
                            value: 'games_entertainment'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '71c6a7c6babe4de9898f144bfeeda816'
                        key: {
                            sys_security_acl: 'd98f0369128c419586de21a53bd40a3d'
                            sys_user_role: {
                                id: 'fc4c27ceff30432496a08f49e7313bee'
                                key: {
                                    name: 'x_2327324_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7219ee3e8baa4a62bc25fdd8bcb24f1d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'status'
                            value: 'active'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7235db6d407d46648de09153e1445a90'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'top_up'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '725e2832ec714a2badbd92271c97ce82'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '727c87db70a849e9ae90a262277320f6'
                        key: {
                            sys_security_acl: 'd373401cbbf54530a30f766a8d2d5f19'
                            sys_user_role: {
                                id: '754a6cdbfd7e4ce9b4882601c4b20bd8'
                                key: {
                                    name: 'x_2327324_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '72c0b899a74f4b349d22718211e0b1a8'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '72d5ee950c26466aa3725f1951806de1'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '72e755f1c5604df7a39fd890e7260d7a'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'purchase_transaction'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '72e82e7d36304646a43a3d92e5bc2646'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'available_balance_after'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7351171833774574b1aa023457aeef84'
                        key: {
                            name: 'x_2327324_konnect_vendor_stall'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '73daec66779d42de91e2812d74f44317'
                        deleted: true
                        key: {
                            sys_security_acl: 'bf4fd395e3614b4590acafe2a90b512d'
                            sys_user_role: {
                                id: '51c600322aa745de84343a97579b83da'
                                key: {
                                    name: 'x_495021_konnect.vendor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '742aec67ef934c62bd584d2860214b9a'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'sys_user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7465fc450ac94525be44277ea331af7d'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'requested_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '750e969fd39c4013abe67de95d6b6231'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'min_topup_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '752f360e92e24b0bb3654114b43d27ab'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'requested_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '754a6cdbfd7e4ce9b4882601c4b20bd8'
                        key: {
                            name: 'x_2327324_konnect.financer'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '75cb266533ba4f1c8e747b57bbe2c943'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '760516ce485f43d0b6d22c8ba2949e07'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'upi_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '76132d082fa64aaaa4064bea687d5496'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '762393777b424fbcae26c3a644189074'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'actor'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7696d29c212b4d9da59fdc130111a9b3'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'net_payable_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '76c8f7e17117477db964edbead37dd5f'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '76d85554bcad406c9003671f673fb12a'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '770ca496f0744121a49968acc9886603'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'requested_amount'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '772dbc6fb12c4fb2b55de5a635306bef'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '773541c297d34a2fb172852d30ae77e5'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '77c0dc0a7eb0422d9f17205feb53db68'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'timestamp'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '77e4e37ee87c4d52b7eaff989df2bb04'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'status'
                            value: 'suspended'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '77eb3fed7f374786a65bd5e56ee7809c'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'status'
                            value: 'suspended'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '78b4c16fb56e4f01917fecb91373f457'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'wallet'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '78fac446eb354b60a06317d5815de5c4'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '79e745ca164f4344a184383c507ead0f'
                        key: {
                            sys_security_acl: '13a5c66e8a9f45e786c6a5dfec48a35b'
                            sys_user_role: {
                                id: '754a6cdbfd7e4ce9b4882601c4b20bd8'
                                key: {
                                    name: 'x_2327324_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7a02c93c199b4b9da539560d2bb7e4bf'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7a0e0affa5bd41d58a2779d028461f91'
                        key: {
                            sys_security_acl: '669b3a8357fd4cfaa3b6c9fc618236e7'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7a549dcd98ef4a93b7ca321244d73bdf'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '7a5d7501c0b4447593d2b2aa3c1317bc'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7aa08ced6c2143629e193f1e9975e36c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7aaad0107c914c9aa5e00a8ff5ab89d8'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'order_items_json'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7ad41b3584974ec38ef18ee7f4489eab'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7ada149640c14b83a45120fad729cfdc'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'min_topup_amount'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7b4d9c1b391b43a48974e4c8ee427c23'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'settlement_batch'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7b559b2cfc9e423faf81eeb217daab8e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7bc5da5811cf42ce8022a5c4a10c1c47'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'payment_reference'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7bdc0bfe3cbe4e65808eaafd69bc4f9e'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'upi_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7bec3174a1144f0d8fda58ff919c0263'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'value'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7c98cdefaf1141c5ae287ff0ef9fe9c3'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7d131d3d3cb14ea396aeb63338748a1a'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7d40724d51f2497bb9c8351f9790a814'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'phone'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7d82bbdfd91742a8b9a2fdc9b6a7c03f'
                        deleted: true
                        key: {
                            sys_security_acl: 'd373401cbbf54530a30f766a8d2d5f19'
                            sys_user_role: {
                                id: 'a56c343d362748de9c1ea5db806766e0'
                                key: {
                                    name: 'x_495021_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7d90dcb0313c4db8a8c4f7779539320b'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'payout_date'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7da324ee3467469bbaf428e801386017'
                        key: {
                            sys_security_acl: '3b247cbdaac94eb8ab8645505b435875'
                            sys_user_role: {
                                id: 'fd005092a2ad4397945afc0fa039ae69'
                                key: {
                                    name: 'x_2327324_konnect.vendor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7dc7a8dd90f84d339869f26f5398b1dd'
                        key: {
                            sys_security_acl: '456afd7a18214fa99d9a88b88be2c003'
                            sys_user_role: {
                                id: '754a6cdbfd7e4ce9b4882601c4b20bd8'
                                key: {
                                    name: 'x_2327324_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7e597dfb8b2543a995ea8d4e096911e0'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'utr_reference'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7e8dc03fef5f43848c39fb8338730b96'
                        key: {
                            name: 'x_2327324_konnect_vendor_stall'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7e982d430ba5476eb15223492179acce'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7f2010a021fe4f41b2f465750c8f5ce9'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7fef7141fa2444d3a86d5d76c53553be'
                        key: {
                            sys_security_acl: '8a26deee119d41cdac9563dcd3ed37f8'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '803ce76b4f0e4e32ba593ae76a852093'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'payout_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8059907b49db4eb483eeb8e50e85e66c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'upi_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '809e2c7dae8c41da8056e5eddf22f612'
                        key: {
                            endpoint: 'x_2327324_konnect_vendor_workspace.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '80c2433db5404536a2fab88453168952'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'bank_account_holder'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '80f9dcf8bf6a4ebd83e950e0458abf8f'
                        key: {
                            category: 'x_2327324_konnect_settlement'
                            prefix: 'SET'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8143315e256442fd96bdee4a82d4da00'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'payout_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8199bd9cdf02418b80b301208a21d371'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'idempotency_key'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '81a32add13334315bdd79a69c05a5f16'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '81bb6138e9444905a80b447be7ec21f2'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'source_transaction'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '81d2a35f9b7c4561a9ded57f31b9aebb'
                        deleted: true
                        key: {
                            sys_security_acl: '149d8cf14f414b929e4d48fdd22b746f'
                            sys_user_role: {
                                id: 'a56c343d362748de9c1ea5db806766e0'
                                key: {
                                    name: 'x_495021_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '81e0226349f04959964b024978ed3cfe'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8230f80ff41f422588a93bfdde3d5818'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '824c2785ed1a404c9bbdaf274e688728'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'status'
                            value: 'under_review'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '82c18534b6d34668ba908396f2091059'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'category'
                            value: 'food_beverage'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '83d49a14a97646eb8a08824f686069e4'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '83dc3adcf9184b728a91caf1306d003d'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '84026e7191b8450f8064efcd0bf6d2d1'
                        deleted: true
                        key: {
                            sys_security_acl: '59403fe8f1d44e099891ec9650a7f6b0'
                            sys_user_role: {
                                id: '51c600322aa745de84343a97579b83da'
                                key: {
                                    name: 'x_495021_konnect.vendor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8453eef10d3f444bb28cf599b00c5887'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '84b625728fa24e478e794fc8f47f7e42'
                        key: {
                            sys_security_acl: '3b247cbdaac94eb8ab8645505b435875'
                            sys_user_role: {
                                id: '754a6cdbfd7e4ce9b4882601c4b20bd8'
                                key: {
                                    name: 'x_2327324_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '852b9a3c42ad4cc2abeaf9a4b77c0b2c'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '85448c3a79814d0fb11f132f02a3e1ce'
                        key: {
                            name: 'x_2327324_konnect_participant'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8594467669c3431ba12e6a2b7100286e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'transaction_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '859fd12864f24331a6ab917332f6885a'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'status'
                            value: 'issued'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '85a1f624066441cbb422da4b67928ad2'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'stall_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '85afa3a724ec4efcbaf1dc5ef33ba643'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '85b7384e2ea542d089d47cbc6a3d57c5'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'wallet'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '85c1899c4e5e4e459db6bf414932c63f'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '860bc4b8bf2d4c269db46033e4cece6d'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8677cd15e4b740e7aaceab3ec9743108'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'location_notes'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '867f6a7a494c4867a6ff2fc3f6236a13'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'adjustment'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8683fb71b6eb45e5a7effa9580cc89ef'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'status'
                            value: 'redeemed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '872cfe31cc094ef1847077f27423e1ad'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'qr_token'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '8760c8336c7b4abcb2f0a0491abbdb9b'
                        deleted: true
                        key: {
                            sys_security_acl: '038f061cedec4861801ffc0dc85dbd6f'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '87c7c5e634b14368a50ce72f0ffc3bf1'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'bank_account_number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '87d2f751630c46aa8aa04fc8aa938413'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'wallet_credit_timestamp'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '87ff5aaef0044a8cb498b8b66d4dc4ba'
                        key: {
                            endpoint: 'x_2327324_konnect_register.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '88c40953141c4bf3bf063720fd77d955'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '88d47e3c9124409e9da13171eb5d2b3b'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'total_credit_amount'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '895a246ecc364c77a58cabebba1cb75e'
                        key: {
                            sys_security_acl: '0181fbdcce74467b91080d2db31abb88'
                            sys_user_role: {
                                id: '754a6cdbfd7e4ce9b4882601c4b20bd8'
                                key: {
                                    name: 'x_2327324_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8967ef7527024a2980918807cd56c0fe'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '898ebe8fe9924e508170846162813d78'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8a9f3f0e715b44919cb492c164e70874'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'rejection_reason'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8abfe3c668cd4f35b859df8782683aae'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'status'
                            value: 'submitted'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8b4e72b59384476a9da5e90bb76dc896'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '8b88905abacd4f7e9223be6bb3fed1a9'
                        key: {
                            sys_security_acl: '149d8cf14f414b929e4d48fdd22b746f'
                            sys_user_role: {
                                id: '754a6cdbfd7e4ce9b4882601c4b20bd8'
                                key: {
                                    name: 'x_2327324_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8ba8783927944308b07266b91703a19d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'bank_ifsc'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '8baf38098dcb4c348cf68fde122af4f5'
                        deleted: true
                        key: {
                            sys_security_acl: '456afd7a18214fa99d9a88b88be2c003'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8bed5ad893d848b6962158250c46a338'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'access_password'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8c086de3f4c34cadb59e079355078131'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '8c7ff5ccf1144dac9af06c642697df72'
                        deleted: true
                        key: {
                            endpoint: 'x_495021_konnect_financer_workspace.do'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '8c8f7ae68bd14eb19b4e45bf924be665'
                        deleted: true
                        key: {
                            sys_security_acl: '5759d8e7ba194631be7166f52ff95ac0'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8d05aa1f663a450083214cb23be0e623'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8d80a223bedd4ef79de974bb3001f207'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'target_record'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8dd71a6a69914e0f8a23d5f5eba1d063'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8de181b938cd4a16aa1cb42a5c354fd9'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'previous_status'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '8eb668d4332c45fd8584c74e47071afd'
                        key: {
                            endpoint: 'x_2327324_konnect_financer_workspace.do'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8ed57d341552449981437e65f7750fef'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'wallet_credit_status'
                            value: 'credited'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8eff7cefa869452b88b64bba682d9c63'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'wallet_credit_status'
                            value: 'pending'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8f5f1ded70f3484095adf04078b00fcf'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'payout_reference'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8f752081de954f0796a3a8698a9cc6d0'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'payout_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8fb1d36be6a84da6b45127fc741e69e0'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'total_spent'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8fb91c39b05049ef8193465c5d280956'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8fe830a708984e35a1b6855065eb6ee7'
                        deleted: true
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'min_topup_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9008c098791047c58c06b3e585016046'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'total_credit_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '904842c434014843bcd1a0765fb2247e'
                        deleted: true
                        key: {
                            sys_security_acl: 'aea713ff4f484f0fb31527f6e58b1279'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '90586b96c8924ede96a90cd9bff605da'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'phone'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '9062cb32cbac47b1af8b92bb90a5a7c4'
                        key: {
                            category: 'x_2327324_konnect_audit_log'
                            prefix: 'AUD'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9091d34beba149bd9166712a855632ec'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'status'
                            value: 'reviewed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '911d195b41d043488cfcd4aa77dba7b9'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'adjustment'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9131394f0c414efe9be78ed9d99c0f84'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'available_balance_before'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9153c53592ba4c749d50ddbc9c4e596d'
                        deleted: true
                        key: {
                            sys_security_acl: 'ea6fd66bc8dc4f7593fe1f604b844af8'
                            sys_user_role: {
                                id: '51c600322aa745de84343a97579b83da'
                                key: {
                                    name: 'x_495021_konnect.vendor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '91c96f4c09ad48f3becd2e618f253cf3'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'source_transaction'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '91d1bec9fe12436c84107c9797b859ce'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '91fe59be86264dcbaab35150c5c29f6e'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'verified_amount'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '92f538f8790b4201b7850f6442778606'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '934d294af7fc45399b2541049f21e57d'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'end_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '934fe8333a8b4510aeadd94fc439bafc'
                        key: {
                            name: 'x_2327324_konnect_vendor_stall'
                            element: 'stall_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '93522faa53ac41d797bc8c3b831b5b93'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'new_status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9424c58554914cdbb59da663ef557d85'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'idempotency_key'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '944d9e359d444be0bdb339bf2c57428f'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '9476b7a808984fe185510c5328113793'
                        deleted: true
                        key: {
                            category: 'x_495021_konnect_participant'
                            prefix: 'PAR'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '94f49acc765b4c3684700ce12dd1b676'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'status'
                            value: 'pending_verification'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '956cd688c563480ca95b74d8f6b2889d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'transaction_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9572139791d64d4784b20f3cbb93999e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'payout_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '95797db12bdb4b1b9042b1dd32e38314'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '95a99360b8b64d00934cdef1716ffa0a'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '95b2b141ddc44846bdfec2b8d820b3cc'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'qr_expires_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9661fc3798ae462fafecde0033ce0646'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '96f29935c33a49fa93cea880e2d7cd09'
                        key: {
                            sys_security_acl: '2cdd3979b8e049c9b30176130de5f0b4'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '97931bdb62564348a0e0dfad04c46870'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '98843a03e93d4ef8836f0a4c3943fe6e'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'idempotency_key'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '98a35397e32242d9885ab2e754a8126c'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '992060cf38cc44e9a0c59e674f1d38fd'
                        key: {
                            sys_security_acl: '40938b81de304b9b8e015b09b264fb06'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '992d4ed00f8644dbabfd3616a8d33c69'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'upi_id'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '992e96f243484c56881cc635489d1140'
                        deleted: true
                        key: {
                            sys_security_acl: '669b3a8357fd4cfaa3b6c9fc618236e7'
                            sys_user_role: {
                                id: '51c600322aa745de84343a97579b83da'
                                key: {
                                    name: 'x_495021_konnect.vendor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '993b99d69a9f415dacd0300cdea55b94'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'issued_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '9985b19ad4fa4fc9b1a985147d430b6b'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '99a058ed4f9a4e6982cd7f92cfb8d255'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'redemption_window_open'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '9a20792ceea94a0c92b543a14614f112'
                        deleted: true
                        key: {
                            category: 'x_495021_konnect_wallet_ledger'
                            prefix: 'LED'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9a56cde002ee49a8aa263d1f2661a746'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'order_items_json'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9a5905ed534142fc9f30fee5d9c52a1a'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'college_organization'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9a717e334147475f9ac2fb55d23aeb96'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'status'
                            value: 'verified'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9ad1c828b3794073bc97724f92315417'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'qr_token'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9ad8bbea5b474d0cad15c4fc4a566eb9'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9b39ad26817e48c3886cb7aed21931ce'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'requested_initial_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9b8a939096f5409098b472da438399ba'
                        deleted: true
                        key: {
                            sys_security_acl: '038f061cedec4861801ffc0dc85dbd6f'
                            sys_user_role: {
                                id: 'a56c343d362748de9c1ea5db806766e0'
                                key: {
                                    name: 'x_495021_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9b92b139ac9d48929ea983d494d524db'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'entry_type'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9bad37dbdd3049759dcd6c6a1e1888dc'
                        deleted: true
                        key: {
                            sys_security_acl: '456afd7a18214fa99d9a88b88be2c003'
                            sys_user_role: {
                                id: 'a56c343d362748de9c1ea5db806766e0'
                                key: {
                                    name: 'x_495021_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9bbae0fea4fe472386f74a5ef7e64ff9'
                        deleted: true
                        key: {
                            sys_security_acl: 'ea6fd66bc8dc4f7593fe1f604b844af8'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '9c2c72e41e7f42cca24e409c9ab08fcd'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9c46b3d6267941889133f8733200d4ac'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '9c814664268d43f19075384310039865'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9cccb020136041c18bc40a68244fa913'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '9cec5e40b9204b03a062e01782003dd4'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9d25447e56784bf099a822142adde1c2'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9d28f60d220f465fbfb6447288a96dec'
                        key: {
                            sys_security_acl: 'bf4fd395e3614b4590acafe2a90b512d'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9d400299288549c9b2bae84e60a95019'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '9d7df4306f7749618e017f412e4b7844'
                        deleted: true
                        key: {
                            category: 'x_495021_konnect_purchase_tx'
                            prefix: 'TXN'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9d834311b9c740eb8fed06761e2d2ef7'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9dd6fb07875c410f9f5e00bd400dee20'
                        deleted: true
                        key: {
                            sys_security_acl: '13a5c66e8a9f45e786c6a5dfec48a35b'
                            sys_user_role: {
                                id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                                key: {
                                    name: 'x_495021_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9e09e8c9a10a4310b349df24b4cd768a'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9e2f4b4e299f4615874d513eb3752f32'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'status'
                            value: 'verified'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9e3bc5d92d27458292910cddd825825c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'available_balance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9e4b3d31d47f4b47b587714876b724b2'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'available_balance_before'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9ef96de8bafc468fb92ce633b7416e41'
                        key: {
                            sys_security_acl: 'bf4fd395e3614b4590acafe2a90b512d'
                            sys_user_role: {
                                id: '754a6cdbfd7e4ce9b4882601c4b20bd8'
                                key: {
                                    name: 'x_2327324_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9f0f59db2b0d4b01a76f56a04d8f3c25'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'reserved_balance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9f1ec333b21c473a85c1277e8315ed43'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9fabe62ece2545b9b17ee01a8276277e'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'reserved_balance_before'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9feb5b9122b64adf825baa8e91c4e6e5'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'proof_attachment_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a00e65de7e494a80a2f83cd32c26b69a'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'new_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a03a3dd109d140d29574f705b3d370f5'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a072e2e7872543f5ab172b31f5785ed9'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'upi_payee_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a09facb65c7548198132e498537ad100'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a0b27ba9edea4f9fa36b893103ee9aa7'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'rejection_reason'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a0b812fb13e74bd981eea9ea372ce791'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a12de759a59948a6bf0ba9b207d0e4d5'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'adjustments_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a18e5db8b1304765b83accaa4dbfb721'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'payout_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'a1a7e920e9f14112b52b5edd44fa1f7e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a1c2e75709a744049933e7e054993f05'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'college_organization'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a1c90a4dfc80461e996698309eb725bb'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a2335f8b8791471e8e0de0f55f3b451e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'reserved_balance_after'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a25150edd2374f168d751784281b3216'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'status'
                            value: 'reviewed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a260982ae3d54aaa8de8c663bb45de8c'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'source_payment'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'a269baf642304a2bb01f2ff9b073af3b'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a2f8214f841b46c6a5744c5b145cfba6'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'status'
                            value: 'frozen'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a320b66fbea246a29e20d10e5204a2a0'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'wallet_credit_timestamp'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a37c7a87ebfa42de898c7ac59645f0c3'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a37efee19f9040cc976b4d1c13d35b77'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'confirmed_at'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'a3915357c0874fa39d2ffe64da64ae81'
                        key: {
                            name: 'x_2327324_konnect_vendor_stall'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a40ee426e06b4151864a77ada648cd26'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a41045c78d0e4f0b8b834df5794ae07b'
                        key: {
                            name: 'x_2327324_konnect_vendor_stall'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a48acecc1b7740da98612e385f2193d4'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a4b779c03b914c96934f1839430b423d'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'status'
                            value: 'expired'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'a4f18c2327154a2ab1e8493823cdb2ac'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a5089ff10b7c4ef18da787f43664d9ec'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'status'
                            value: 'posted'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a52217797cd34827b91e107d458188ed'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'wallet_credit_status'
                            value: 'failed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'a56c343d362748de9c1ea5db806766e0'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect.participant'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a57fde19c0c4498fb7495facd6447cbb'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a58dcd747cde4330957569363e808eb5'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a5d7b0c54d42421db3e34b752bcc6df2'
                        deleted: true
                        key: {
                            sys_security_acl: 'd98f0369128c419586de21a53bd40a3d'
                            sys_user_role: {
                                id: 'a56c343d362748de9c1ea5db806766e0'
                                key: {
                                    name: 'x_495021_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a68760cfd63c46f88392b3bc1f547495'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a68858c299a54550a771efb812a59f4d'
                        deleted: true
                        key: {
                            sys_security_acl: '3b247cbdaac94eb8ab8645505b435875'
                            sys_user_role: {
                                id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                                key: {
                                    name: 'x_495021_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a6a072b51b184785b79cd4836396cf33'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'status'
                            value: 'under_review'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'a6e538b836794306b5f5eb53ff1210d2'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'entry_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a70285e843ee4ef78d4ccfa9f36a005b'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a726747d41ff46c1948f671e7aa364eb'
                        key: {
                            sys_security_acl: 'd98f0369128c419586de21a53bd40a3d'
                            sys_user_role: {
                                id: '754a6cdbfd7e4ce9b4882601c4b20bd8'
                                key: {
                                    name: 'x_2327324_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'a7391e563b2e40fba91b7912143b21ae'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a761bc24b4f4448b93ced6a0ed3a32da'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a7812f50aac64e158df2cf47672c0f6c'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'status'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a79be489dc9a408690995da71448012a'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'wallet_credit_status'
                            value: 'failed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a7ba226cd19a4ac481ab69b2c6fe630d'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a7efa7040a85404a9c9992e6981e42b3'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'purchase_transaction'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a80954ff513049f3b0910f2b2a72166f'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'verification_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a89d52ff513b40d3be5a2279d407f120'
                        deleted: true
                        key: {
                            sys_security_acl: '9b6fa12fd8d0476fa6c2a3511da8e444'
                            sys_user_role: {
                                id: '51c600322aa745de84343a97579b83da'
                                key: {
                                    name: 'x_495021_konnect.vendor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a8a4d6ac6900459cace78abf85b47149'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'adjustments_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a8da5ddeaf68406f9daab186ee85dbf2'
                        deleted: true
                        key: {
                            sys_security_acl: '8a26deee119d41cdac9563dcd3ed37f8'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a902335a691b43e5871d18497c859d41'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'status'
                            value: 'settled'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a90c1ee3523344f581c22003bca9c307'
                        deleted: true
                        key: {
                            sys_security_acl: '59403fe8f1d44e099891ec9650a7f6b0'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a9522e12ed3a42bf91257e1f49a3f712'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a9958ad0a5354acca905693fa94379e5'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a9f14016dca741b59a5250cef1632c82'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'aa56f54ea841463082f2038cf5ed5761'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aa86aa262a714a7cbb2f2cc5eef521f1'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'payment_reference'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ab0294cfb205486e94900a6f3970c9d5'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'wallet'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ab352f50dd9b45f59bb943e68f46467d'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'reviewed_by'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ab5f0ce82171452ea299e49b92eb8429'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'ab715e90a10d499d98aaa7f3a0ff48b8'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ab774e20eb7142e3b22c04e6eef6bc19'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'payout_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ab8b943a7b6240f6b0866371711cd074'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'email'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'abccb1c3fa734a5a9308573f6fd06141'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'abee870f76ec401c8eb7f29ae4eeefc4'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ac16a460262b421caeefc1ddb08fdecb'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ac6185fde933416598e426021a2bd0e8'
                        deleted: true
                        key: {
                            sys_security_acl: '59403fe8f1d44e099891ec9650a7f6b0'
                            sys_user_role: {
                                id: 'a56c343d362748de9c1ea5db806766e0'
                                key: {
                                    name: 'x_495021_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ac7b301485fa45c88a058d16ac50a171'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aca7cd8a99b2470e9dc0a7d7adade599'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'acca455ead254d0181ed6948f7f62cc3'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'acd93a1c3df947f0aafe93e05f34e328'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'bank_account_number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ace92d2ebd804b73a8e1b2b164aef4a2'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'acec9de8c2e346d2b63f534bdbf7e7cd'
                        deleted: true
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'max_topup_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'acfb68569b9e457bbf3b762046bd155a'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'state'
                            value: 'closed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ad0b008ee19d47039276495683c5ec70'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ad5dfbf68c1040e5bd3e8a79ea136cd4'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ada13affb1434a1fb80a243e12fbe786'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ae424b9ce2aa4df8b338afd66dbbce64'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'issued_at'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ae53855b36b24436a785d7c60e871a9c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'refund_hold'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'af3a75b179374b8fbf9030b13e82b9d6'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'af6449edc38046cfa19b8c16ff2b912c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b017cd61cd0f4a60a91d4b0323ca96e3'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'idempotency_key'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b0635493da4b4663b492bcd2ffe6becc'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'status'
                            value: 'active'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b088fa31c2dc408ea53f787778983cac'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'financer_decision_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b19307d894af4a3c954e522c3f97bed5'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'requested_amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b1b1343860514ddb94ebe8dd971ab594'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b1ef0b4d741b472fa2e148c24a7c35f4'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b209420413ab408d853e67c617f2485e'
                        key: {
                            sys_security_acl: '149d8cf14f414b929e4d48fdd22b746f'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'b2502bffae47416a8bf756578fd8e8d0'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b260232a47094373847b756943db6c35'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'payment_screenshot_data'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b2714dfc4042444c917c98b1b73452f2'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b2a7248d0bda440fb50a071356d80136'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b2e00cf41a394b4b9970facf96bbd8a0'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b311c1ff09c04202ad1703ce05b98b4b'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'college_organization'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b3658fad6a5f4813a3d04819f099877e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'type'
                            value: 'initial_registration'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b3e14a6b76904f8689e3ddc91880288f'
                        key: {
                            sys_security_acl: '15b1a3b686ae4185a1f60bbe50441c5a'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b478663070e24bb496c3ba4a0fd6dccb'
                        deleted: true
                        key: {
                            sys_security_acl: '40938b81de304b9b8e015b09b264fb06'
                            sys_user_role: {
                                id: 'a56c343d362748de9c1ea5db806766e0'
                                key: {
                                    name: 'x_495021_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b488df7f0e7f4112909e14d0cfdcbb4d'
                        deleted: true
                        key: {
                            sys_security_acl: '9ee43f12ac3c4533b4b05532f5c39c40'
                            sys_user_role: {
                                id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                                key: {
                                    name: 'x_495021_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b48d86344c1449bdbc2eb6efc64dd892'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'available_balance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'b5097ac68b514c8da99cd643ea17f6bb'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect.organizer_admin'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b5269977738a40a6a689d430590adb3d'
                        key: {
                            sys_security_acl: '40938b81de304b9b8e015b09b264fb06'
                            sys_user_role: {
                                id: 'fc4c27ceff30432496a08f49e7313bee'
                                key: {
                                    name: 'x_2327324_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b56fb213a40944e78859e3855a007302'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'b5893dacd6c1471a986efc5a8e8b8baf'
                        key: {
                            category: 'x_2327324_konnect_vendor'
                            prefix: 'VEN'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b5bee7066dbd4940b765d66903564109'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'value'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b5d9bbb476394fae9da8342b9efe6c35'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'total_spent'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b5f2b39766bd4928bbe546ca10437752'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'debit'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b656f9c076db458687325be9efdc77d0'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'verification_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b674f0e8f6dc434995995548e0b65ef8'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'item_description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b6ad99455ed541509bcb8c023c6027ab'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'bank_ifsc'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b7293709810044d893ccf8f56d496ddc'
                        key: {
                            sys_security_acl: 'ea6fd66bc8dc4f7593fe1f604b844af8'
                            sys_user_role: {
                                id: 'fd005092a2ad4397945afc0fa039ae69'
                                key: {
                                    name: 'x_2327324_konnect.vendor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b72a021e0ada40feb1a0dd7367ddbdad'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b72d97a23f844e04a7500d5a67746ca2'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'state'
                            value: 'closed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b77d14296da24d2b8965b0d52edf9d34'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b85e734e653e43a8ac9405a863afe35f'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'status'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b89e8d19e7dc4a1ab53dc7f1dfc43086'
                        key: {
                            sys_security_acl: '28b4e44512e74f1aa19a8b9e7e9793a1'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b8c337edaa4d45d78e4127160805c9da'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b8e0e5da4f9b4ef8ba986ceaa10c8d9b'
                        key: {
                            name: 'x_2327324_konnect_vendor_stall'
                            element: 'stall_code'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b8efeb76db504156b2e41ca1f68c45b4'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'status'
                            value: 'in_settlement_batch'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b8f8d662ac314149a11fceaee187a9b1'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'source_payment'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b98d7f934e294c2481410cf7b031338b'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b9c70b97699841dcb966295052342459'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ba968cbf571d4988a295ae123e8beadb'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'status'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bb0ad6e36bae4b2bbb8f9e90c3d140a1'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'confirmed_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bb8eba0fe4fd475d896bdaeedfaf75c7'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bc5b061c69414273b3b9d4f6ee3bf624'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'bc77c3c7b5f043cbbf54b40c1f54a79f'
                        deleted: true
                        key: {
                            sys_security_acl: '2cdd3979b8e049c9b30176130de5f0b4'
                            sys_user_role: {
                                id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                                key: {
                                    name: 'x_495021_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'bce450a33f64478aba47a90cc6c22d4d'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bd24ae69c5a143f8bf58feb34446f656'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'upi_payee_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bd6e7ae2de944ecc855b46434080c7a9'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'bank_account_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'bdb24b936e444f11aeb2a9cacc81f1f5'
                        deleted: true
                        key: {
                            sys_security_acl: '28b4e44512e74f1aa19a8b9e7e9793a1'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'bdcbc39a2c6b4eb0b526485b28993c10'
                        deleted: true
                        key: {
                            sys_security_acl: 'bf4fd395e3614b4590acafe2a90b512d'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'be0107fcf0f5494c92f91513e4a5e569'
                        key: {
                            sys_security_acl: 'd98f0369128c419586de21a53bd40a3d'
                            sys_user_role: {
                                id: 'fd005092a2ad4397945afc0fa039ae69'
                                key: {
                                    name: 'x_2327324_konnect.vendor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'be3377ad557540119759acd9f990c26a'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'reserved_balance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'be4c3900c64b4cf68be9e7677ec9cc41'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'verified_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bebbd9e2419243ac81eb6b294bb73539'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'wallet_credit_status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'beedeba3b0024ab5bf3788c834dce142'
                        key: {
                            sys_security_acl: '0eb2ae9b5f754cb3ae919e13f86471ab'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'bf156840f8d344b7b495065efc02963b'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bf40073f0e324672bfbe89fcfe18d452'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'payment_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'bf5a2742b1c248c6b97d1648a4949afd'
                        deleted: true
                        key: {
                            category: 'x_495021_konnect_vendor_ledger'
                            prefix: 'VLD'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bf76cee96de447319527b1a53e92dbb2'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'verified_by'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bf9b33c4626647e7b1fd1789e840a7e6'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'bfdabc771b124353893087fc39d5f2f4'
                        deleted: true
                        key: {
                            sys_security_acl: '3b247cbdaac94eb8ab8645505b435875'
                            sys_user_role: {
                                id: 'a56c343d362748de9c1ea5db806766e0'
                                key: {
                                    name: 'x_495021_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bfe764eaf1194ebaa1debfcaebe14068'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'status'
                            value: 'issued'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c02538aaf27a4dcdb4b92411ab01e3f5'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c0f61ff9a4ea48c39baac1294dd2dc98'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'reset_otp'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'c122664bc793487dbf9ec868c1e9d27e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c12e99b7f3f241d2a2c0da9950ea9193'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c13f8c01373c4ed0bd5ac72b66c5dc30'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'amount'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c1519949468448abbc4823b417a126ea'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'redemption_deadline'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c16b4eda001e4db6a65bdd46fb2fbd52'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                            value: 'cancelled'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c16e346f04144100b2b6fb5d14478dbc'
                        key: {
                            sys_security_acl: '038f061cedec4861801ffc0dc85dbd6f'
                            sys_user_role: {
                                id: 'fc4c27ceff30432496a08f49e7313bee'
                                key: {
                                    name: 'x_2327324_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c17f4d9254d44ba2a4abeafbfcc4a7f0'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'bank_account_holder'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c220ec6647854d839a0159964b3f86c4'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c2430f62b264415a825c980b807b2d3b'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'participant_id_code'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c2436cc33a294460875ea7892573c214'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c255254c137841d2acd93d9260022ce4'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'requested_amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c2600ac6f802429a8fa0a069a75b07bf'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'verified_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c2e006cb04f44c2db3a453c7a4caf218'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c3f1b30739cc477ba17e918944bf94de'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'wallet_credit_status'
                            value: 'pending'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'c496716a8b604da69dfac22eea4ed4ec'
                        deleted: true
                        key: {
                            endpoint: 'x_495021_konnect_organizer_dashboard.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c49dae8ea4604f3d8988c4137c550529'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c4f2e683fc664518932be3057890f982'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c507fb9c99804b6bbe443cbe44ec6e6a'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'payout_reference'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c5ead06a360f426aa495a2cb0ef75d2c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'stall_code'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c670ea5a075b424c813a53fce849dc4d'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'status'
                            value: 'under_review'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'c677f8e5ffc64dc784509d05f38bbe2a'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'c7575d65a0f04a219fbfdfcf29a5e2a6'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c774d27a7ab14a2a98b5f2d8a28944c2'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c7ba824d655048028210fd58d1923e71'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'assigned_user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c85a2856c2e644038bd6c6493eba481e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c85d15bc63544801ac2f4a294158ad1e'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'reset_otp'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c8b3e400fd754162a16e50b7d67c358e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c91413429fda447dbcd09dc4e8797775'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'c915c2bba72942e883511663fd12ea55'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c9368c797de945aea5b5f01086b5b399'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c9d12133c6474b9c97f65ea78a69219f'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'cada1759dd004d2b83c891b979058899'
                        deleted: true
                        key: {
                            category: 'x_495021_konnect_registration'
                            prefix: 'REG'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'caf9204530a74c09bd66d5b1bcc44a4f'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'batch_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cb1c15963deb4861b166eb428d7cfafd'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cb41674ee9544035ab5b295e532bb282'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'cb5be59cd04343d6ba88ebe5af157ffa'
                        deleted: true
                        key: {
                            sys_security_acl: 'd48a500876e04c778adff49c119c9c4f'
                            sys_user_role: {
                                id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                                key: {
                                    name: 'x_495021_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cb8908773e704da0b9dda50196a1079f'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'upi_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cbe9806bb2904876abcaa121be71905d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'cc0ee49bbf6a488ebd4b6227c19e5c02'
                        deleted: true
                        key: {
                            sys_security_acl: '28b4e44512e74f1aa19a8b9e7e9793a1'
                            sys_user_role: {
                                id: 'a56c343d362748de9c1ea5db806766e0'
                                key: {
                                    name: 'x_495021_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cc1247e08792411b9271c1d92cf4f046'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'verified_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cc7f90321dd6457faa58f7f4ba7b5c93'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ccae5d1a318d42888e024fa052dcc2ac'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ccba1847c11c4408a3eb4c7b8bf6c56d'
                        key: {
                            sys_security_acl: '59403fe8f1d44e099891ec9650a7f6b0'
                            sys_user_role: {
                                id: 'fd005092a2ad4397945afc0fa039ae69'
                                key: {
                                    name: 'x_2327324_konnect.vendor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cd09de751c654c808538478043cae4b2'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'redemption_window_open'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'cd28e455e06646368501b22fd76b3602'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cd53644147684079bd792fa04599443d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cd6c93e9ebba45ce960944998c6534c6'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'bank_ifsc'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'cdb24fdbd6c04ae6a403387c8361f145'
                        key: {
                            name: 'x_2327324_konnect_payment'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cdc89a26c1814896805fa434155ce08f'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'cdeff5861f85483fa4bc107d0765fccd'
                        deleted: true
                        key: {
                            sys_security_acl: 'd373401cbbf54530a30f766a8d2d5f19'
                            sys_user_role: {
                                id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                                key: {
                                    name: 'x_495021_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'cdfe558a45f047908df91ce94b40eeba'
                        key: {
                            endpoint: 'x_2327324_konnect_organizer_dashboard.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ce3f266999ec4f6289c74d9e98b6ee8f'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ce59d1359e2946cea7eff6c2c39d091d'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'upi_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cf0f7f54581144db94aa15c71b1c4af2'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cf159f8cd5244fe1b00202d35c44ca3c'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'status'
                            value: 'active'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cf6410116c454db0886cb33fed551051'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'reserved_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cfefcd1041b943fd9b7dc9d16e85d8e1'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd0c51767d7f74416ba23737c79e2ee61'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'status'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd14a5cd64b5947f2b0da4dcfde00230c'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd189f03865df4c6790b12efaea8e8f56'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd1e5de043ad6424cb8df1749519c2a41'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd26fcd0553844f4e87303a08e1be2835'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'last_transaction_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd290cde97bf2447b8e895db222d91a8b'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd2ab2cb6ce5f464d8fa0662afa5b0c72'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'initial_credit'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd2ea2b0611074fffb11e3927f767b246'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'refund_hold'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd2ed595459644bce954f79386d627e6f'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'd321d5351338472698c0d3f3cc1efe50'
                        deleted: true
                        key: {
                            category: 'x_495021_konnect_wallet'
                            prefix: 'WAL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd329a1546f6d4fd4bb91b07070fffe36'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'verification_notes'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd34e702fc926459383ea87b45ab46717'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'type'
                            value: 'event_topup'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd367090c6448470b88139e070b198597'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd3b3726e296946d2bbfdadf6fc8aaebd'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'wallet_credit_timestamp'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd42064fd5ee741149ecaa734068590ad'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'wallet'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd4458263fb704a8081ee1cd90ebd535f'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'start_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd453956a64c8476cabdeb6ab333599ba'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'status'
                            value: 'draft'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd49f074bff9e4b5b9b932f05fcaa5e98'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'target_record'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'd5057b7dda9f49ea8f992cfb6a2289a3'
                        deleted: true
                        key: {
                            category: 'x_495021_konnect_vendor'
                            prefix: 'VEN'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd506522f7b394315a6ef2548b2f7342d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd57efbe9697a47af8137290db80238db'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'redemption_deadline'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd5a35e8d0a264846b9b099af4473a750'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'd64f5422ad1f4ed0a5eedb527761c3e3'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd6879760f8ee410aa032763c09732f77'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'requested_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'd6c1e1a4d0554a51a84f64ea22c573fe'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd6ca270d7edf46e899db6b639582de1f'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'requested_initial_amount'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd6f932dbcdae4632b6108b72b7255316'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'status'
                            value: 'paid'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd6fdd6b187bd4a7b9f203f392a211664'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'refund_release'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd70686e11f6a49958b1392d5059f0fb5'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'status'
                            value: 'approved'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd70915e9d8dc4f25b924763fe36f9dd6'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'status'
                            value: 'verified'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd74e1270434945c4b4ebcbcf281ecf56'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd780ddd2cc31424d8c5a26fc7cc8c183'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'status'
                            value: 'posted'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'd79e2a65d31043c0859847c2b6b91c93'
                        key: {
                            name: 'x_2327324_konnect.organizer_admin'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd7ab84162331482d98b645d165820b72'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd7b8ffde3bcf4fcb9ac92bf2c29d6601'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd85077c087ae46d6b5e62719878c5519'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd8c467db5ec84de8bca499a823af8a58'
                        key: {
                            sys_security_acl: '9b6fa12fd8d0476fa6c2a3511da8e444'
                            sys_user_role: {
                                id: 'fd005092a2ad4397945afc0fa039ae69'
                                key: {
                                    name: 'x_2327324_konnect.vendor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd8ee89b35f1a4faba34449b2a457e301'
                        key: {
                            sys_security_acl: '5759d8e7ba194631be7166f52ff95ac0'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd946c86573794c828ea444949cf982db'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'qr_expires_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd978ba27c98545c5bfbebde4b691d776'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'college_organization'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd9a328ef0d05492781f26c1001870ce5'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'amount'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd9d2e278a4c24edab346a9948dabaefe'
                        deleted: true
                        key: {
                            sys_security_acl: '3b247cbdaac94eb8ab8645505b435875'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd9f3d82ae41643d8a7c392da2922b5ad'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'initial_amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'da6a86be28504b538a535c11defca653'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'payout_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'da7b98c798de464db1063844582cb6eb'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'status'
                            value: 'submitted'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'dafc95ba63d04112b8eea4ae4f94a6c1'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'db348372c50a4a2bb15082b07d263bc5'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'status'
                            value: 'payment_proof_received'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'db8a4ec764f245878e74039660ed4fd3'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dbbdf273a7354c898601ac0451d64ee3'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dbd01d3161e047b1ba05848e7fdeae39'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'wallet'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dbe4385c3bd648b09efb3d2ca6cef321'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dbf13af5dc444615b277be243ea8fe7d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dc2233964c1f4c0da6e4920c907e2d39'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'dc84214ba9614698a9ce70e1b1db3827'
                        deleted: true
                        key: {
                            endpoint: 'x_495021_konnect_vendor_workspace.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dc98164c3bca483a979cc73c91403c6a'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dcc40ff8b31047d99b42f3c9ebf136e8'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dd0aba56c25c40dfa3dd4538e02eae01'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'participant_id_code'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dd39bfa61ec6424188a4d0f94a3dc0fb'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'dd53b2311a29484e872b246fd4786874'
                        key: {
                            category: 'x_2327324_konnect_refund_request'
                            prefix: 'REF'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ddeadf1686f54c2ab81df1a969de7567'
                        key: {
                            sys_security_acl: '9b6fa12fd8d0476fa6c2a3511da8e444'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ddfaee7346f14ee7bf27afb33d8a9b29'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'verification_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'de0392a59e6b4ea8934891ddc6fcc0d2'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'de6be5cbd8a044609f03f2d17e837d0c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'wallet'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'df1002ba2e7949a98e7a3e04b49d7fea'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'issued_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'df43a81860cd47f98fb914d2802c250e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'status'
                            value: 'paid'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'df5c4271b1e14e53b8e46d1c0fb45148'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'df70e6fd3d3e484c84cfdce74768ddc1'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'status'
                            value: 'reversed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dfc10036eac84267a76fd539988045dd'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dfe27095ca5d404e8b0a0041e88b05d9'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e0fd413334604c54a827b722dfdb53fa'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'batch_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e0fdf226a13b4cf2ba077d396a934b47'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e132b7bc292944ada3dfe117b6ba3319'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e1591c013620467c84af16c02070e24d'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e1e51bd73fef4e9d92e19994169b9529'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'registration_fee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e1e801f1444449cd947555009ec1b5f9'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'initial_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'e2325325b0924b25a2d2fd10a09586a8'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e28b7cc7433e438db0053384527620de'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e30bd3449e4d4f339f526278ba3e3731'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'e33876a2b7c24072ade13ecd345d4cc0'
                        key: {
                            sys_security_acl: '28b4e44512e74f1aa19a8b9e7e9793a1'
                            sys_user_role: {
                                id: '754a6cdbfd7e4ce9b4882601c4b20bd8'
                                key: {
                                    name: 'x_2327324_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e3709b92dc5b47f789c234dd620ef1bc'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e3a028c0c8ef4d2a8ede4709fb3804ad'
                        key: {
                            name: 'x_2327324_konnect_vendor_stall'
                            element: 'location_notes'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e3f9bc7ad07b4cf3ad2459e307ae638e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'e4090daa595c492a8870f1414c6b0ddc'
                        key: {
                            sys_security_acl: '9ee43f12ac3c4533b4b05532f5c39c40'
                            sys_user_role: {
                                id: '754a6cdbfd7e4ce9b4882601c4b20bd8'
                                key: {
                                    name: 'x_2327324_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e4322db80a994cb1b00081b44e195d16'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e493856df18f49efa7dc10ed571c8d84'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'bank_ifsc'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e503635d794e4ca8b928fecad2ea01c8'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e52d5105bc444f8bb4590f86e9b6eb5e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'value'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e531fc856ae3465e9160aae84ca8dc5c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'reserved_balance_before'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e5438de8ca4348bdbd603e76235c645e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e547f9f69f594e1cb5685f7cefbf11fb'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'category'
                            value: 'other'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e566d44e1d6a4b8798de7bc5b41bcefb'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e5dd333b3f6f4d91b6f5cf902e3fe56d'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'redemption_deadline'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e607a9659ce8453889ed61ee10a1572d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'max_topup_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e6266cbcbfb743618e350b85a0996ff2'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'bank_ifsc'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e671c705fb9146b198c673e5b0300128'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'sys_user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e71654cf00ce463b8267eded4b117c4f'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'verification_notes'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e7347422eb26465f9a5bc656e2dc1390'
                        key: {
                            name: 'x_2327324_konnect_vendor_ledger'
                            element: 'settlement_batch'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e750dac9db804cf8befaf23aed47b9ac'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'e78f9ada34674a47a14e3b8cac724f30'
                        key: {
                            sys_security_acl: 'd48a500876e04c778adff49c119c9c4f'
                            sys_user_role: {
                                id: '754a6cdbfd7e4ce9b4882601c4b20bd8'
                                key: {
                                    name: 'x_2327324_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e8ad305a171243129be9951f2c075c98'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'adjustments_amount'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e91f007775094b529aa574968f3dae70'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'utr_reference'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'e97126ede9f24b8785dbdd50a4648ffc'
                        deleted: true
                        key: {
                            sys_security_acl: '9ee43f12ac3c4533b4b05532f5c39c40'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e9d44d680f994ab0b8d214219b211b82'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'verified_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e9f55cf9153a49ca95f132f5616f6139'
                        key: {
                            name: 'x_2327324_konnect_registration'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ea02a747ed544da8ababf67a6625fcc7'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ea42405034214c85bb449129714ebf43'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'state'
                            value: 'completed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ea4676ad79ea45d9b69844a4f40e7d10'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ea543fc5f0fb46f1bb2a681084bda860'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'previous_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ea798d4ba49f40fa96d5792db231e052'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'status'
                            value: 'unsettled'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eaba433ede3742e9a957a1cd6cc765ab'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eada622c128844b6b95bdb5a6fc22aa4'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'upi_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eb6e7c98313f42138989b29551844550'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'coupon_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eb94566a7b6646d8b06093632aff0908'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ebbbf449218d4fb788d8981e7def911a'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'requested_amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ec503c3eb1bb4dc6810d8dcd187e35d9'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'batch_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ece1ea489f014e2a9fa34a32b194731f'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'wallet_credit_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ece3f2847bc345b1b8c5f37bccba416e'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'available_balance_after'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'ece71392fca8416e90473777ea1b93fc'
                        key: {
                            name: 'x_2327324_konnect_participant'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eceb20e77dcc48d180af2855ce94ff1a'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ed6ab08505c243ed90b4748099fecbcb'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'edc7624ad5b540ea8bf909476ffd5cea'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'proof_attachment_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'edd43a1b5b634f36aa4c08aa4a97e372'
                        key: {
                            sys_security_acl: 'aea713ff4f484f0fb31527f6e58b1279'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ee159fd2f8b04757a20c96ce85410386'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'idempotency_key'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ee21c3a2b77c4f288d4062f70f1ac0ae'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                            value: 'success'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ee8a10fd82a3489294db2a8de4338477'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ee90d526458945979b83a458d24f1a0d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ee985d8ecfb34836a72ffdff4f6b899f'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'stall_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'eec3ea6f5b334811823b89edf7e3dd9c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'end_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'eee5885f6cf44ac09f1bb20e1207b68d'
                        deleted: true
                        key: {
                            sys_security_acl: '669b3a8357fd4cfaa3b6c9fc618236e7'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ef2ec2d1172446d1929e969e2ffee723'
                        key: {
                            sys_security_acl: '456afd7a18214fa99d9a88b88be2c003'
                            sys_user_role: {
                                id: 'fc4c27ceff30432496a08f49e7313bee'
                                key: {
                                    name: 'x_2327324_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ef54c7cd60fd4b409b47fd3abba55de5'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'start_date'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ef5735b000364305874f1f758e9a0abb'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'status'
                            value: 'draft'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ef6b7dbd30f04453b53f713c20a982ac'
                        deleted: true
                        key: {
                            sys_security_acl: '0181fbdcce74467b91080d2db31abb88'
                            sys_user_role: {
                                id: 'a56c343d362748de9c1ea5db806766e0'
                                key: {
                                    name: 'x_495021_konnect.participant'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'efb160146864441e98eaad2b1d60ed2d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'upi_payee_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'efb43baf9bfc427f9c924d5b72849edb'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'efcf073f90b84946a92a6dc77a1c5e93'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eff14823d7c84b4dbdf01a4f2be5a7a2'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'verified_amount'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'f0671f34ae2b4a71bbf3352ca062f6e7'
                        deleted: true
                        key: {
                            category: 'x_495021_konnect_settlement'
                            prefix: 'SET'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f06d9b8bb904456999407e4b9d6b18a4'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f09b769f825842dabf3181812ed8d312'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'total_spent'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f0ec21f025df4c15ac25414dfa033376'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'timestamp'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f1915dbeba454a9c80cdf9f27d661627'
                        key: {
                            name: 'x_2327324_konnect_refund_request'
                            element: 'status'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f1f075eb11214883b592b5a0e971fc12'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'wallet'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f2043fa593e44e61b573529a90ebd970'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'status'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'f205fe8d11144676987cde9c59b28bf4'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'entry_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f274e5e2708f48ebbf5bc60a3b93d8ec'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'reserved_amount'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f2a0029a0e6e43f59fa5fc942604569c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'category'
                            value: 'merchandise'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f2d7e5707e734900be20cb1436f47ceb'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'initial_credit'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f2eded3a36904ff0ac02feef812e6a47'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'requested_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f31aa51615f54ccaa27abdfb89331522'
                        key: {
                            sys_security_acl: '038f061cedec4861801ffc0dc85dbd6f'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f321b25f8731496c87ea93ac136e97c7'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f378fb38b5ae49c0ab3956f75452f2ff'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'previous_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f393772a32ce4db49586f4c2a139e00e'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f395457dfbe24176890848278f47af6d'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f3b28e144e794cfda5eaf4376e34e59a'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'bank_account'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f3e665da4a3d42b58f4a8bf0dd09ac8d'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'upi_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f3ff77c4f2404928b4f890337b31758d'
                        key: {
                            name: 'x_2327324_konnect_audit_log'
                            element: 'reason'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'f4154cca698c468b9e9566410d2833b1'
                        deleted: true
                        key: {
                            category: 'x_495021_konnect_event'
                            prefix: 'EVT'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f47970c073ac4d70a76e1eac9f681d81'
                        deleted: true
                        key: {
                            sys_security_acl: '0181fbdcce74467b91080d2db31abb88'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f483ccfdb9e44b678798922532c7bbbf'
                        key: {
                            name: 'x_2327324_konnect_vendor'
                            element: 'upi_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f4ec4de75e76422eba76f77bb1fca858'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'source_payment'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f5245986d6ea4fb6a7e6905bd5fe8ebc'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'last_transaction_date'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect.financer'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f59fd18b217b4890b0cc0fb427a34bb9'
                        key: {
                            name: 'x_2327324_konnect_vendor_stall'
                            element: 'stall_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f636f05b833944c8a69f9ed36b5a6f7a'
                        deleted: true
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'min_topup_amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f66232cb6a194772bc586338bac79feb'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'reserved_balance_after'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f786d83f622440a096ccd52b0623f57c'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f80dd784809e463799dc95be923a325f'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'event'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'f83b6561bb104fe184af7aace88444ab'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f8649c957a4949c49fe8a5c99524225d'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'item_description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f87241643f1f4f00a78281c71c173aa2'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'status'
                            value: 'confirmed_processing'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f8c3aa81fece4e8dbff427ce5dad1886'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'target_record'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f90e3c3ebca14817b0917b0f309fa00d'
                        key: {
                            sys_security_acl: '3b247cbdaac94eb8ab8645505b435875'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f94ddd030c974145aad881a5ad886e3d'
                        key: {
                            name: 'x_2327324_konnect_participant'
                            element: 'access_password'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f96d3ed6ea7841319bd243f57993ebb2'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f99efecb34ba47278cae6bce6a032c56'
                        key: {
                            name: 'x_2327324_konnect_event'
                            element: 'state'
                            value: 'registration_open'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f9b684524f02448893ee8abdd9a8db3e'
                        key: {
                            name: 'x_2327324_konnect_wallet'
                            element: 'reserved_balance'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f9cb1579a7244a9dbdb56eafa4753161'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'status'
                            value: 'deactivated'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'faa4ae1f104c4df4b0b0c6dea86c36fd'
                        key: {
                            sys_security_acl: '0181fbdcce74467b91080d2db31abb88'
                            sys_user_role: {
                                id: 'd79e2a65d31043c0859847c2b6b91c93'
                                key: {
                                    name: 'x_2327324_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fabb4e50adb443519ed8f7c2f61ecdd9'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'end_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fbc33216fdd44a64ad9b139e33e44530'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'fbcd187b9c0e4c5280302a42fd7fa21f'
                        deleted: true
                        key: {
                            sys_security_acl: '456afd7a18214fa99d9a88b88be2c003'
                            sys_user_role: {
                                id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                                key: {
                                    name: 'x_495021_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fc270b99d83948e48ad91f9075f463c2'
                        key: {
                            name: 'x_2327324_konnect_purchase_tx'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'fc4c27ceff30432496a08f49e7313bee'
                        key: {
                            name: 'x_2327324_konnect.participant'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'fca0dc8feb50478da6133f467e7344ea'
                        deleted: true
                        key: {
                            sys_security_acl: '0181fbdcce74467b91080d2db31abb88'
                            sys_user_role: {
                                id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                                key: {
                                    name: 'x_495021_konnect.financer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fcf8a448d6d34b26abc73a68cb4e627a'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'upi_id'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'fd005092a2ad4397945afc0fa039ae69'
                        key: {
                            name: 'x_2327324_konnect.vendor'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fded4956a39d42828651371fc1d8d43f'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'status'
                            value: 'submitted'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fe587ee9e3bc490f8ff1c30efa10577c'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                            value: 'pending'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'fe7f508363e140709fb86f8e34baf071'
                        key: {
                            name: 'x_2327324_konnect_digital_coupon'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'feaa192621ac4511ac098e0e6f034b5d'
                        key: {
                            name: 'x_2327324_konnect_payment'
                            element: 'proof_attachment_sys_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ff1213d0677c47e29d735419cf2a6d73'
                        deleted: true
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ff1318b8a00b412baa08452313d9234d'
                        key: {
                            name: 'x_2327324_konnect_wallet_ledger'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ff2b80cee53843898344377766f3d869'
                        key: {
                            name: 'x_2327324_konnect_settlement'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ffd04d04f37e494283c89f8d8121ec85'
                        deleted: true
                        key: {
                            sys_security_acl: '9b6fa12fd8d0476fa6c2a3511da8e444'
                            sys_user_role: {
                                id: 'b5097ac68b514c8da99cd643ea17f6bb'
                                key: {
                                    name: 'x_495021_konnect.organizer_admin'
                                }
                            }
                        }
                    },
                ]
            }
        }
    }
}
