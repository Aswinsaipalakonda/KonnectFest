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
                    route_get_qr_details: {
                        table: 'sys_ws_operation'
                        id: '2aeab9345cc54f4b9b1dc329e91ef24d'
                    }
                    route_register: {
                        table: 'sys_ws_operation'
                        id: '1f02b6dfca2a4842b51c0c3a3572d880'
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
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '00050ab4da094d96a3af360e9bf47286'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'reviewed_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '005620e72a5f4a2084b2b36d288caf8c'
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
                        table: 'sys_choice_set'
                        id: '00eecbb1adad4eb98a8518dd9eb6dccd'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '00f0d2b06d724d568c55ffa085db5b31'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '012da21a052c465f82a7c9c7a86138ad'
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
                        table: 'sys_security_acl_role'
                        id: '019b1589d1f74045853ac774ccd8201d'
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
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'amount'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '02602eaf13b74afdb32c173f53ef39aa'
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
                        id: '02b6e5a0b5994ad98d2c1b1a668f8987'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'coupon_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '02e4eede2f924a73a26802d48e1ab2f1'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'status'
                            value: 'verified'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '03209474c1cf40649bdb2119aeb8696e'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'wallet_credit_status'
                            value: 'credited'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '036937934e6e4cf9840d685b2fdb8371'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '039e21a232ec450585d963a8662a7614'
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '049241c56b1f4a56871283631f7c31cf'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '04c1735bffb241848f8d802cf15e36a9'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '050c3420b4664f42a66fec4fe3c78139'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '054fd2c06c4a43ddb956c90f7b38993d'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '0561c29edf6b4b74a7e79ad16d278cbe'
                        key: {
                            name: 'x_495021_konnect_participant'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '05d02d18e85d41cc81bed6ae745d898c'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'item_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '05e2d9fc952d4c1897ffcafabe4a12fa'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '06263c9cce4a4527aca1a08aaac21c57'
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
                        id: '068e8f880335409fb757249904369e15'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '07f9a467821542969a63e14c2534db05'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '08a7e606c2fb499f8d1a79bfad588e51'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '092b45b33f23444787189803ce46028b'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0a0630d5379741f4a62ec40688df4213'
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'requested_initial_amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0a6e754bdc274887a902e9a2b0fba3bd'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0b47d6538e454d6ca489137af709add3'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0b531519869e4615b6347b9d171d6f78'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'rejection_reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0be938d63b1f4f828131cf98cda8a96d'
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
                        table: 'sys_choice'
                        id: '0cc43155c5664893a5ac306d0d7e1938'
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'status'
                            value: 'submitted'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0d1f03a62d3b45d884df3ae137e47411'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'purchase_transaction'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0d25c926d35a4aa9a4f3e77758a1ee6a'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0ea94825ceea40ddbe6a8c9a1635006d'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'assigned_user'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0eb31c2acc6641bfb7dddbcdc449cd4e'
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
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'confirmed_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0ff00765f918487f9bab6247492b8158'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '1086af888b934ddfb200d07eeb64b26b'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1097c86794794c27b0de40979fed78d3'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'type'
                            value: 'event_topup'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '10c34fc2c1b348ca9b4112a05c97d90c'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'redemption_deadline'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '11373b8900e44e4e92ae8a0ffb15f8a2'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1147e0dcafad40dd8ec165dc353d2b89'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '11da1771d5bc4fcfb20c14ff522e8656'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '11e330710fc64455a116c3ea5d13ed46'
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
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1211ec20eabf480b83d2253d199df091'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'bank_ifsc'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1296e99c203a46259c08df5e5e0dfd96'
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
                        id: '136223d917a14f0695babc41f64c1e0c'
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
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'requested_initial_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '15967f4b3ff047aebb742b2994318413'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '1a394e3deb1e4ecfb538adc66b255ec6'
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
                        table: 'sys_documentation'
                        id: '1a7ff7485688458bafe102dd51918a48'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1ad8076bcff548b7897b2307a6d1958a'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1b3884deced7468caba224b28dada63e'
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1c050a00eb0549e58187bdb5f7f8bd0d'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1c0d86a5010348148605a7d7a34c18af'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1c1367e77a694c06a6a95e4377d6316a'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1d0d512bd20641138435a43da6efe811'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1e14dae6b2f74c1aadd6ffa8dbe3c762'
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'stall_code'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1e499752a0df409285f37f60cea75d87'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'financer_decision_by'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1e5eb04be23948d982994c19b07d3b91'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'purchase_transaction'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '1f730f9cff53417cb762adf7ddab2a2c'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '20dbaa18dd684ae5b4db2645344a2091'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '213936978f3d4f4fb154702cc9be939c'
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
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'reserved_balance'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '219e8c66946f4ff6bc212401cdc111e9'
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
                        table: 'sys_choice'
                        id: '230e85211381400d888e0e60599f78af'
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
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '23a64b82abb7403e8f6a115017b897e4'
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
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'bank_ifsc'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '24cfda5f67cb40c7a89cdcb7ec517ed9'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'category'
                            value: 'services'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '24ec98b37ce34b6687b3ebc14e0cec28'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                            value: 'confirmed_processing'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '250f2f0212634b768df1590ac583ba3e'
                        key: {
                            endpoint: 'x_495021_konnect_participant_portal.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '251a013c6d1a4d529af5a7ce34fc5316'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'source_payment'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '25635ad622c140a1a00bd1258c0986aa'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'credit_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2571c15eb97f4e8092f2ab0302f05bce'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'reason'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '26b0c040db0942209712e2faee80859a'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'initial_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2711d4bab303412aa354b478ef80cdff'
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '286e557d52a84b01a755b0c404d06fe8'
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'location_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '29ec24a923b649e28d653f2c2c66f1c1'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2aabfc400c65449ab1dc3490902fc203'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'available_balance'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2b371ad26bab410dbbf79208751c179d'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'status'
                            value: 'redeemed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '2b89a58f896b4051b2a6e54cd66c66f8'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2bad0e8cb2754f1fb06dff0fdb893cc0'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'phone'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2c0bb3a700934327974a60be36f47342'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'redemption_window_open'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '2cbc2173ac05413d9e5d5a16d3862750'
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
                        id: '2ce73522ed7f4a948d1bf2b2c954c5f0'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'idempotency_key'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '2d60be996d604f1f945cbf9c6dad3f6a'
                        key: {
                            name: 'x_495021_konnect_vendor'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2e65a8391fba475c9a1a21e6f0b10476'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'max_topup_amount'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '2fce982feaac46d4b5bbf610276d398e'
                        key: {
                            name: 'x_495021_konnect_registration'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '307393fd1c6b4beab65d288bcabd7bfe'
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'payment_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '31566e7727894bdc83138066931cf230'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '32c5d86fbf0a4f499803f02a72d3d0d9'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'item_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '33493bd151844bc38ab87b373bcf4b0e'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'new_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '34969d4fa46f478db1ceb91ac66ff6c6'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'verified_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3512f851e38f4b34ab7c77084f6e9b4c'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '352cd84d510647e080e5dd2d6651a934'
                        key: {
                            category: 'x_495021_konnect_payment'
                            prefix: 'PAY'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '35831f75af0d4bd9825af40ce9a3dfa7'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'entry_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '36e2d35eaa374b2ca194f911415a9d19'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '371f49817d81466f9609b965f19b1b38'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'qr_token'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '376372dab00c4f43bd19560f3223c1f6'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'item_description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '378059ea09b248c1833fc2263bbb93bc'
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
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'bank_account'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '37e21de146b646919c37efb53236c867'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'verification_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '38002524135f492ea3e70435e9098933'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'total_refunded'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '391bcf2274434eb4a17056fdb3c1383e'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '3a4ef73ea9044f93a20158ca377409dd'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3aca8ba1094448eaa78dfda05d75e560'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'start_date'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '3b4b8edb87624ae498c3b2b4f12063e7'
                        key: {
                            category: 'x_495021_konnect_audit_log'
                            prefix: 'AUD'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3b579bcfe8a842019a9d890d80fe6f94'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3c4b520dba034619be01ef5e1fd6c800'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'actor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3c9193c41f7a4527beab401a7e10fc6c'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'net_payable_amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3cd3c73e976f40b2af365310588b27a5'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3cd7d3fee47e4ae0b7d30fa65b8158a5'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'bank_account'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '3d6e700ccad44c75aa8d37a0cf7de663'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '3d7453cc7f9240609eb7f2b50d21373b'
                        key: {
                            category: 'x_495021_konnect_refund_request'
                            prefix: 'REF'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '3d827b2bc2534767a6cc9cdc706d79f2'
                        key: {
                            name: 'x_495021_konnect_participant'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3da06a55364d4f44891ba14cd6dbf751'
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
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'action'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3ebff1fb256e46ecaee47ec131b8f340'
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
                        table: 'sys_documentation'
                        id: '40aa963c310d40d1a63b85ea3cfb4ab8'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'verified_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '40dacec0708a401387345bc90510414f'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'wallet_credit_status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '40f7bb2faef441d7916f8f74b7191ceb'
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
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'stall_number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '41c8c98175ea4124b3afc6c1c88ee962'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'actor'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '42b777b197754b6c849de9d4eb4d9ff8'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4552f29075bd438590a193f3c9fdbbc3'
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
                        table: 'sys_security_acl_role'
                        id: '461706aff46e42fd8f170c2a613dc29a'
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
                        key: {
                            name: 'x_495021_konnect_audit_log'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4635ae12c1e844da9fcc46bfc576afbd'
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
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'reserved_balance_before'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '470da179fb824b7294675ea7407cbd05'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'item_description'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '471250e6022d43b388c9e88488b8f102'
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '474f7d5a0f674d1eb1845275e7976551'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'available_balance_before'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '47a862fcc75c48b98c91044060609847'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'reserved_balance_after'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '497c8f358cb34ee5ad762cdac696e3c8'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'qr_expires_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '499e188e54064202a42a72b3a4493ae9'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'financer_decision_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4a9140e37d9d4db580f7292426984a03'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'total_spent'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4ab0eae4bef4456785b28c1d71a6fc29'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'wallet_credit_status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4bc0b16abdd249f7b14019df566ba011'
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4cfa405c764a41dea7346f7f25868893'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4d1c7111b838488a9f1ed454f2bb2ba1'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4d3329a60b2b4d06bbbe7acfa5ef0472'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'utr_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4d6546a01ff14d5ab614116dc500f2f3'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4fbc8dea426b4afdb9fb49fdd60d5549'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4ff7f2fca4d0453b84895eb3b9b8d05c'
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
                        table: 'sys_dictionary'
                        id: '50d1fc7b735b4667a32010975fcb53ee'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '50f7443346334946bbcd8cb49fc44f86'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'upi_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5142faee80ad48349cdd348e598ae595'
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5181404f420d4aada71e6ee04b2d1b3d'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'timestamp'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '51c600322aa745de84343a97579b83da'
                        key: {
                            name: 'x_495021_konnect.vendor'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '528754b97a0a47d38a4624cc59bdd3ec'
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
                        id: '5356e6ecc5194e5bab05668e88c3134d'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'payout_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5374c8f8c2cc4f4c839dde05e948a4f3'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'verification_date'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '550a5c6b976a4376994d4cef3b1f7bdc'
                        key: {
                            name: 'x_495021_konnect_settlement'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5564e353ff7548a78f50af12cb4f3fef'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'total_credit_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '55bbd4c29d22494688ac51bdda43f694'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '569198e3d01d489a8aa53af318409578'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5827d5f281b049b1a6d23d9f8f42c285'
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
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5887c5785daa429cad8608cbf417a6a3'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'settlement_batch'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5b8270804189427498dbc122a08078be'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'status'
                            value: 'draft'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5bc55eade7f9458587a4a317595a8d07'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5d21323391444e8394602ce59834811c'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'proof_attachment_sys_id'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '5dd66907ba4b455598c31451f05dee05'
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
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5e79b713fcb047fca6914ae3f9c89dda'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'rejection_reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5f2d81cb87b84147b22b9224492e455c'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'start_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '5f7ae3f7a7c14bd9957f29165c1d49f6'
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
                        table: 'sys_dictionary'
                        id: '5fd9141b78f9460cacf11716e174264d'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'credit_amount'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '609d3a967a2d4bc2a9cc1c7d79f60692'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '60a17a7d31fe432587926e806317eba0'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'settlement_batch'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '60ef47e6b6b44b4aa77bfe81c4e0d760'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '613bfbf604444f8ab67c5d70f1cabdc8'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'wallet_credit_timestamp'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6149282015a9460e8a874cf418780517'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'reviewed_by'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '615093391eca4f039079206437c5b3a3'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '615b78a273914637a8c503644f412831'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6173f765efc3466f8c850920cdcd015c'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'purchase_transaction'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6189b729703b411fa57fb28f029f3a04'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'status'
                            value: 'in_settlement_batch'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '61f5d744d63d4770948916b40ea2df88'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6280309a6469400983532e4d943fc445'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'event'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '63722646dd664d45a857f72b83058aee'
                        key: {
                            name: 'x_495021_konnect_vendor'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '64054bbe85824d8889a63289c01dabb2'
                        key: {
                            name: 'x_495021_konnect_event'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '645d1b6b14074d9b8dd17218b649c2a9'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'status'
                            value: 'settled'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '65effacc67fa4f85a284bbc14116f892'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                            value: 'expired'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '661c95b5409449b4974a42be4f15fe71'
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
                        table: 'sys_choice'
                        id: '669e42bd9175482bafcc4153c6a216a2'
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
                        id: '66e1b3cfac1342c9bcf50422a23b4b79'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'total_refunded'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '670cb180ccb341f4a88c3fad9c750097'
                        key: {
                            name: 'x_495021_konnect_wallet'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '675a7d817e3144a99f50c50229e808e6'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'payout_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '67aa1167902640c99801f70601aed135'
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
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'sys_user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '67d1bc292e5e47b1a9f01f0d28d314e1'
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
                        table: 'sys_dictionary'
                        id: '69dcf3109f854caebf7e98853b50a2f8'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'entry_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6a5634226eb14ab69a994a2092317ee6'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'action'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6ae7b9e09b9e46d6956f42bcaf9ba20d'
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'stall_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6af6161222d24fe7a66012663f00ab4b'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'available_balance_after'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '6affef411de545b59c76d81989b91ba2'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6b9e4336f67e480ca63667ec6352438d'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6bb878685e2a46bd86091bced54f4f81'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6c802a0bef0d4a599dcf360646a72d1c'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'verified_by'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6db124f23dcb4f10bc13c4622bf50736'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'idempotency_key'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6dc562bd8cf041e7acdee1414d9bc94d'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'participant_id_code'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6e7aa37f830e439db5d133aed0c71a30'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'event'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '6f4edcbf3cde44a08481e43f227b00b8'
                        key: {
                            name: 'x_495021_konnect_registration'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6f65ec6896774924bf83304203020c7a'
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
                        id: '700fdf03aeb546b9a9853c11c577de9d'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7069b134b6784846b156dffec265290c'
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
                        table: 'sys_documentation'
                        id: '70f03d8e08d14705b8af321efb5e59b0'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'coupon_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '7115dbc215e8430bb811560463da4625'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '71577cc1c5df4280b1eb6db8c53d5b68'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'initial_amount'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7219ee3e8baa4a62bc25fdd8bcb24f1d'
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
                        id: '72e755f1c5604df7a39fd890e7260d7a'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'purchase_transaction'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '72e82e7d36304646a43a3d92e5bc2646'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'available_balance_after'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '73daec66779d42de91e2812d74f44317'
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
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'sys_user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '750e969fd39c4013abe67de95d6b6231'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'min_topup_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '760516ce485f43d0b6d22c8ba2949e07'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'upi_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7696d29c212b4d9da59fdc130111a9b3'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'net_payable_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '76c8f7e17117477db964edbead37dd5f'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '772dbc6fb12c4fb2b55de5a635306bef'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '773541c297d34a2fb172852d30ae77e5'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '77c0dc0a7eb0422d9f17205feb53db68'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'timestamp'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '77e4e37ee87c4d52b7eaff989df2bb04'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'status'
                            value: 'suspended'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '78b4c16fb56e4f01917fecb91373f457'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'wallet'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7a549dcd98ef4a93b7ca321244d73bdf'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '7a5d7501c0b4447593d2b2aa3c1317bc'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7aa08ced6c2143629e193f1e9975e36c'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7ada149640c14b83a45120fad729cfdc'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'min_topup_amount'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7b559b2cfc9e423faf81eeb217daab8e'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7c98cdefaf1141c5ae287ff0ef9fe9c3'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7d40724d51f2497bb9c8351f9790a814'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'phone'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7d82bbdfd91742a8b9a2fdc9b6a7c03f'
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
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'payout_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7e982d430ba5476eb15223492179acce'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8059907b49db4eb483eeb8e50e85e66c'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'upi_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '80c2433db5404536a2fab88453168952'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'bank_account_holder'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8199bd9cdf02418b80b301208a21d371'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'idempotency_key'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '81a32add13334315bdd79a69c05a5f16'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '81bb6138e9444905a80b447be7ec21f2'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'source_transaction'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '81d2a35f9b7c4561a9ded57f31b9aebb'
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
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '824c2785ed1a404c9bbdaf274e688728'
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
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '84026e7191b8450f8064efcd0bf6d2d1'
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
                        table: 'sys_documentation'
                        id: '8594467669c3431ba12e6a2b7100286e'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'transaction_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '85a1f624066441cbb422da4b67928ad2'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'stall_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '85b7384e2ea542d089d47cbc6a3d57c5'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'wallet'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '85c1899c4e5e4e459db6bf414932c63f'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8677cd15e4b740e7aaceab3ec9743108'
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'location_notes'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '8760c8336c7b4abcb2f0a0491abbdb9b'
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
                        table: 'sys_documentation'
                        id: '88c40953141c4bf3bf063720fd77d955'
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '88d47e3c9124409e9da13171eb5d2b3b'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'total_credit_amount'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8967ef7527024a2980918807cd56c0fe'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '898ebe8fe9924e508170846162813d78'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8a9f3f0e715b44919cb492c164e70874'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'rejection_reason'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8b4e72b59384476a9da5e90bb76dc896'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8ba8783927944308b07266b91703a19d'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'bank_ifsc'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '8baf38098dcb4c348cf68fde122af4f5'
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
                        table: 'sys_ui_page'
                        id: '8c7ff5ccf1144dac9af06c642697df72'
                        key: {
                            endpoint: 'x_495021_konnect_financer_workspace.do'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '8c8f7ae68bd14eb19b4e45bf924be665'
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
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8de181b938cd4a16aa1cb42a5c354fd9'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'previous_status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8f5f1ded70f3484095adf04078b00fcf'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'payout_reference'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8f752081de954f0796a3a8698a9cc6d0'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'payout_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '904842c434014843bcd1a0765fb2247e'
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
                        table: 'sys_choice'
                        id: '911d195b41d043488cfcd4aa77dba7b9'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'adjustment'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9153c53592ba4c749d50ddbc9c4e596d'
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
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'source_transaction'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '91d1bec9fe12436c84107c9797b859ce'
                        key: {
                            name: 'x_495021_konnect_settlement'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '93522faa53ac41d797bc8c3b831b5b93'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'new_status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9424c58554914cdbb59da663ef557d85'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'idempotency_key'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '9476b7a808984fe185510c5328113793'
                        key: {
                            category: 'x_495021_konnect_participant'
                            prefix: 'PAR'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '94f49acc765b4c3684700ce12dd1b676'
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
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'transaction_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9572139791d64d4784b20f3cbb93999e'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'payout_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '95797db12bdb4b1b9042b1dd32e38314'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '97931bdb62564348a0e0dfad04c46870'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '992d4ed00f8644dbabfd3616a8d33c69'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'upi_id'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '992e96f243484c56881cc635489d1140'
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
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'issued_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '9a20792ceea94a0c92b543a14614f112'
                        key: {
                            category: 'x_495021_konnect_wallet_ledger'
                            prefix: 'LED'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9a5905ed534142fc9f30fee5d9c52a1a'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'college_organization'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9ad1c828b3794073bc97724f92315417'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'qr_token'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9b8a939096f5409098b472da438399ba'
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
                        table: 'sys_security_acl_role'
                        id: '9bad37dbdd3049759dcd6c6a1e1888dc'
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
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9c46b3d6267941889133f8733200d4ac'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9cccb020136041c18bc40a68244fa913'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9d25447e56784bf099a822142adde1c2'
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9d400299288549c9b2bae84e60a95019'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '9d7df4306f7749618e017f412e4b7844'
                        key: {
                            category: 'x_495021_konnect_purchase_tx'
                            prefix: 'TXN'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9d834311b9c740eb8fed06761e2d2ef7'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9dd6fb07875c410f9f5e00bd400dee20'
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
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9e2f4b4e299f4615874d513eb3752f32'
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
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'available_balance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9e4b3d31d47f4b47b587714876b724b2'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'available_balance_before'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9f1ec333b21c473a85c1277e8315ed43'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9feb5b9122b64adf825baa8e91c4e6e5'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'proof_attachment_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a09facb65c7548198132e498537ad100'
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a0b27ba9edea4f9fa36b893103ee9aa7'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'rejection_reason'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a0b812fb13e74bd981eea9ea372ce791'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a12de759a59948a6bf0ba9b207d0e4d5'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'adjustments_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'a1a7e920e9f14112b52b5edd44fa1f7e'
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a2335f8b8791471e8e0de0f55f3b451e'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'reserved_balance_after'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a25150edd2374f168d751784281b3216'
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
                        id: 'a37efee19f9040cc976b4d1c13d35b77'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'confirmed_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a40ee426e06b4151864a77ada648cd26'
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'a56c343d362748de9c1ea5db806766e0'
                        key: {
                            name: 'x_495021_konnect.participant'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a58dcd747cde4330957569363e808eb5'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a5d7b0c54d42421db3e34b752bcc6df2'
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
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a68858c299a54550a771efb812a59f4d'
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
                        id: 'a7391e563b2e40fba91b7912143b21ae'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a79be489dc9a408690995da71448012a'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'wallet_credit_status'
                            value: 'failed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a89d52ff513b40d3be5a2279d407f120'
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
                        table: 'sys_security_acl_role'
                        id: 'a8da5ddeaf68406f9daab186ee85dbf2'
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
                        table: 'sys_security_acl_role'
                        id: 'a90c1ee3523344f581c22003bca9c307'
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
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a9f14016dca741b59a5250cef1632c82'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'aa56f54ea841463082f2038cf5ed5761'
                        key: {
                            name: 'x_495021_konnect_payment'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aa86aa262a714a7cbb2f2cc5eef521f1'
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'payment_reference'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ab0294cfb205486e94900a6f3970c9d5'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'wallet'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ab5f0ce82171452ea299e49b92eb8429'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'ab715e90a10d499d98aaa7f3a0ff48b8'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ab774e20eb7142e3b22c04e6eef6bc19'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'payout_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ab8b943a7b6240f6b0866371711cd074'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'email'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'abccb1c3fa734a5a9308573f6fd06141'
                        key: {
                            name: 'x_495021_konnect_payment'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ac16a460262b421caeefc1ddb08fdecb'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ac6185fde933416598e426021a2bd0e8'
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
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aca7cd8a99b2470e9dc0a7d7adade599'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'acca455ead254d0181ed6948f7f62cc3'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'acd93a1c3df947f0aafe93e05f34e328'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'bank_account_number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ace92d2ebd804b73a8e1b2b164aef4a2'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ad0b008ee19d47039276495683c5ec70'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ad5dfbf68c1040e5bd3e8a79ea136cd4'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ae424b9ce2aa4df8b338afd66dbbce64'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'issued_at'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ae53855b36b24436a785d7c60e871a9c'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'refund_hold'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'af6449edc38046cfa19b8c16ff2b912c'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b0635493da4b4663b492bcd2ffe6becc'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'status'
                            value: 'active'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b19307d894af4a3c954e522c3f97bed5'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'requested_amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b1b1343860514ddb94ebe8dd971ab594'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b1ef0b4d741b472fa2e148c24a7c35f4'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'b2502bffae47416a8bf756578fd8e8d0'
                        key: {
                            name: 'x_495021_konnect_event'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b2714dfc4042444c917c98b1b73452f2'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b311c1ff09c04202ad1703ce05b98b4b'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'college_organization'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b3658fad6a5f4813a3d04819f099877e'
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
                        id: 'b478663070e24bb496c3ba4a0fd6dccb'
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
                        table: 'sys_user_role'
                        id: 'b5097ac68b514c8da99cd643ea17f6bb'
                        key: {
                            name: 'x_495021_konnect.organizer_admin'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b56fb213a40944e78859e3855a007302'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b5bee7066dbd4940b765d66903564109'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'value'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b656f9c076db458687325be9efdc77d0'
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'verification_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b72d97a23f844e04a7500d5a67746ca2'
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
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b85e734e653e43a8ac9405a863afe35f'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'status'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b8c337edaa4d45d78e4127160805c9da'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b98d7f934e294c2481410cf7b031338b'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b9c70b97699841dcb966295052342459'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'bc77c3c7b5f043cbbf54b40c1f54a79f'
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
                        table: 'sys_documentation'
                        id: 'bd24ae69c5a143f8bf58feb34446f656'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'upi_payee_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bd6e7ae2de944ecc855b46434080c7a9'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'bank_account_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'bdb24b936e444f11aeb2a9cacc81f1f5'
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
                        table: 'sys_documentation'
                        id: 'be3377ad557540119759acd9f990c26a'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'reserved_balance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'bf156840f8d344b7b495065efc02963b'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'bf5a2742b1c248c6b97d1648a4949afd'
                        key: {
                            category: 'x_495021_konnect_vendor_ledger'
                            prefix: 'VLD'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bf9b33c4626647e7b1fd1789e840a7e6'
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'bfdabc771b124353893087fc39d5f2f4'
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
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'status'
                            value: 'issued'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'c122664bc793487dbf9ec868c1e9d27e'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c12e99b7f3f241d2a2c0da9950ea9193'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c1519949468448abbc4823b417a126ea'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'redemption_deadline'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c16b4eda001e4db6a65bdd46fb2fbd52'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                            value: 'cancelled'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c17f4d9254d44ba2a4abeafbfcc4a7f0'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'bank_account_holder'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c220ec6647854d839a0159964b3f86c4'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c2430f62b264415a825c980b807b2d3b'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'participant_id_code'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c255254c137841d2acd93d9260022ce4'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'requested_amount'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c3f1b30739cc477ba17e918944bf94de'
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
                        key: {
                            endpoint: 'x_495021_konnect_organizer_dashboard.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c4f2e683fc664518932be3057890f982'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c507fb9c99804b6bbe443cbe44ec6e6a'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'payout_reference'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c5ead06a360f426aa495a2cb0ef75d2c'
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'stall_code'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'c7575d65a0f04a219fbfdfcf29a5e2a6'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c7ba824d655048028210fd58d1923e71'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'assigned_user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c85a2856c2e644038bd6c6493eba481e'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c8b3e400fd754162a16e50b7d67c358e'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'c915c2bba72942e883511663fd12ea55'
                        key: {
                            name: 'x_495021_konnect_wallet'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c9368c797de945aea5b5f01086b5b399'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'cada1759dd004d2b83c891b979058899'
                        key: {
                            category: 'x_495021_konnect_registration'
                            prefix: 'REG'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'caf9204530a74c09bd66d5b1bcc44a4f'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'batch_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cb41674ee9544035ab5b295e532bb282'
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'cb5be59cd04343d6ba88ebe5af157ffa'
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
                        id: 'cbe9806bb2904876abcaa121be71905d'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'cc0ee49bbf6a488ebd4b6227c19e5c02'
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
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'verified_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cc7f90321dd6457faa58f7f4ba7b5c93'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ccae5d1a318d42888e024fa052dcc2ac'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cd09de751c654c808538478043cae4b2'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'redemption_window_open'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cd53644147684079bd792fa04599443d'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cd6c93e9ebba45ce960944998c6534c6'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'bank_ifsc'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'cdeff5861f85483fa4bc107d0765fccd'
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
                        table: 'sys_documentation'
                        id: 'ce3f266999ec4f6289c74d9e98b6ee8f'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cf6410116c454db0886cb33fed551051'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'reserved_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd0c51767d7f74416ba23737c79e2ee61'
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
                        id: 'd26fcd0553844f4e87303a08e1be2835'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'last_transaction_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd2ab2cb6ce5f464d8fa0662afa5b0c72'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'entry_type'
                            value: 'initial_credit'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'd321d5351338472698c0d3f3cc1efe50'
                        key: {
                            category: 'x_495021_konnect_wallet'
                            prefix: 'WAL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd329a1546f6d4fd4bb91b07070fffe36'
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'verification_notes'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd367090c6448470b88139e070b198597'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd3b3726e296946d2bbfdadf6fc8aaebd'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'wallet_credit_timestamp'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd453956a64c8476cabdeb6ab333599ba'
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
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'target_record'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'd5057b7dda9f49ea8f992cfb6a2289a3'
                        key: {
                            category: 'x_495021_konnect_vendor'
                            prefix: 'VEN'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd506522f7b394315a6ef2548b2f7342d'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd5a35e8d0a264846b9b099af4473a750'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd6879760f8ee410aa032763c09732f77'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'requested_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'd6c1e1a4d0554a51a84f64ea22c573fe'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd6f932dbcdae4632b6108b72b7255316'
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
                        id: 'd70686e11f6a49958b1392d5059f0fb5'
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
                        id: 'd780ddd2cc31424d8c5a26fc7cc8c183'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'status'
                            value: 'posted'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd7b8ffde3bcf4fcb9ac92bf2c29d6601'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd946c86573794c828ea444949cf982db'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'qr_expires_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd9a328ef0d05492781f26c1001870ce5'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'amount'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd9d2e278a4c24edab346a9948dabaefe'
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
                        table: 'sys_choice'
                        id: 'da7b98c798de464db1063844582cb6eb'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'status'
                            value: 'submitted'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'db348372c50a4a2bb15082b07d263bc5'
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
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dbbdf273a7354c898601ac0451d64ee3'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dbe4385c3bd648b09efb3d2ca6cef321'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dbf13af5dc444615b277be243ea8fe7d'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dc2233964c1f4c0da6e4920c907e2d39'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'dc84214ba9614698a9ce70e1b1db3827'
                        key: {
                            endpoint: 'x_495021_konnect_vendor_workspace.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'de0392a59e6b4ea8934891ddc6fcc0d2'
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'de6be5cbd8a044609f03f2d17e837d0c'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'wallet'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'df43a81860cd47f98fb914d2802c250e'
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
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'df70e6fd3d3e484c84cfdce74768ddc1'
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
                        key: {
                            name: 'x_495021_konnect_vendor_ledger'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dfe27095ca5d404e8b0a0041e88b05d9'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e0fd413334604c54a827b722dfdb53fa'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'batch_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e0fdf226a13b4cf2ba077d396a934b47'
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e132b7bc292944ada3dfe117b6ba3319'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'event'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e30bd3449e4d4f339f526278ba3e3731'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e3709b92dc5b47f789c234dd620ef1bc'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e3f9bc7ad07b4cf3ad2459e307ae638e'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e4322db80a994cb1b00081b44e195d16'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e52d5105bc444f8bb4590f86e9b6eb5e'
                        key: {
                            name: 'x_495021_konnect_digital_coupon'
                            element: 'value'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e531fc856ae3465e9160aae84ca8dc5c'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'reserved_balance_before'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e5438de8ca4348bdbd603e76235c645e'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e547f9f69f594e1cb5685f7cefbf11fb'
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
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e607a9659ce8453889ed61ee10a1572d'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'max_topup_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e8ad305a171243129be9951f2c075c98'
                        key: {
                            name: 'x_495021_konnect_settlement'
                            element: 'adjustments_amount'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e91f007775094b529aa574968f3dae70'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'utr_reference'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'e97126ede9f24b8785dbdd50a4648ffc'
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
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'verified_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ea42405034214c85bb449129714ebf43'
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
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ea543fc5f0fb46f1bb2a681084bda860'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'previous_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ea798d4ba49f40fa96d5792db231e052'
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
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eb94566a7b6646d8b06093632aff0908'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ece1ea489f014e2a9fa34a32b194731f'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'wallet_credit_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ee21c3a2b77c4f288d4062f70f1ac0ae'
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
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ee90d526458945979b83a458d24f1a0d'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ee985d8ecfb34836a72ffdff4f6b899f'
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'stall_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'eec3ea6f5b334811823b89edf7e3dd9c'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'end_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'eee5885f6cf44ac09f1bb20e1207b68d'
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
                        id: 'ef6b7dbd30f04453b53f713c20a982ac'
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
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'upi_payee_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'efcf073f90b84946a92a6dc77a1c5e93'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eff14823d7c84b4dbdf01a4f2be5a7a2'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'verified_amount'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'f0671f34ae2b4a71bbf3352ca062f6e7'
                        key: {
                            category: 'x_495021_konnect_settlement'
                            prefix: 'SET'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f06d9b8bb904456999407e4b9d6b18a4'
                        key: {
                            name: 'x_495021_konnect_vendor_stall'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f09b769f825842dabf3181812ed8d312'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'total_spent'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f2043fa593e44e61b573529a90ebd970'
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
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'entry_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f274e5e2708f48ebbf5bc60a3b93d8ec'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'reserved_amount'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f2a0029a0e6e43f59fa5fc942604569c'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'category'
                            value: 'merchandise'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f2eded3a36904ff0ac02feef812e6a47'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'requested_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f321b25f8731496c87ea93ac136e97c7'
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f393772a32ce4db49586f4c2a139e00e'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f3e665da4a3d42b58f4a8bf0dd09ac8d'
                        key: {
                            name: 'x_495021_konnect_refund_request'
                            element: 'upi_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'f4154cca698c468b9e9566410d2833b1'
                        key: {
                            category: 'x_495021_konnect_event'
                            prefix: 'EVT'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f47970c073ac4d70a76e1eac9f681d81'
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
                        id: 'f4ec4de75e76422eba76f77bb1fca858'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                            element: 'source_payment'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f5245986d6ea4fb6a7e6905bd5fe8ebc'
                        key: {
                            name: 'x_495021_konnect_wallet'
                            element: 'last_transaction_date'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'f57a6dd143ed4f8295da2a989c43f9f7'
                        key: {
                            name: 'x_495021_konnect.financer'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f80dd784809e463799dc95be923a325f'
                        key: {
                            name: 'x_495021_konnect_registration'
                            element: 'event'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'f83b6561bb104fe184af7aace88444ab'
                        key: {
                            name: 'x_495021_konnect_wallet_ledger'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f8c3aa81fece4e8dbff427ce5dad1886'
                        key: {
                            name: 'x_495021_konnect_audit_log'
                            element: 'target_record'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f9cb1579a7244a9dbdb56eafa4753161'
                        key: {
                            name: 'x_495021_konnect_participant'
                            element: 'status'
                            value: 'deactivated'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fabb4e50adb443519ed8f7c2f61ecdd9'
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'end_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fbc33216fdd44a64ad9b139e33e44530'
                        key: {
                            name: 'x_495021_konnect_payment'
                            element: 'type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'fbcd187b9c0e4c5280302a42fd7fa21f'
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
                        table: 'sys_security_acl_role'
                        id: 'fca0dc8feb50478da6133f467e7344ea'
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
                        key: {
                            name: 'x_495021_konnect_event'
                            element: 'upi_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fded4956a39d42828651371fc1d8d43f'
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
                        key: {
                            name: 'x_495021_konnect_purchase_tx'
                            element: 'status'
                            value: 'pending'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ff1213d0677c47e29d735419cf2a6d73'
                        key: {
                            name: 'x_495021_konnect_vendor'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ffd04d04f37e494283c89f8d8121ec85'
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
