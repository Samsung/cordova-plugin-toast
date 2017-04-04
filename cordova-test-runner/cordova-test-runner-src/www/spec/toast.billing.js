/*
 * Copyright 2015 Samsung Electronics Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* globals helper */
describe('toast.billing', function() {
    var billingInfoDummy = {};
    var productInfoDummy = {};
    var requestPurchaseInfoDummy = {};
    var requestProductInfoDummy = {};
    var verifyPurchaseDummy = {};
    var applyProductDummy = {};

    beforeEach(function() {
        billingInfoDummy = {
            key: {
                paymentwallKey: 'dc50d495932a7009b3f193916aab5005', //t_0f6a922e0d3af023124ae0dc2374b6
                checkoutKey: 'rCvi9+aOAYxlzBZgTlGe/ajDHWo6GF4W+JiHWn8Uuzc=' //'o8KzSGh22UN6CZzQ6qQTiGJiWqgXFwVeNmhr0uzo7jo=',yours
            },
            countryCode: 'US',
            containerId: 'billing_form',
            lang: 'en',
            gaWebPropertyId: 'googleAccount', //googleAccount
            appId: '3201508004443', //yours 3201611011047
            serverType: 'FAKE'
        };

        productInfoDummy = {
            productId: 'DP111000002594',//'DP111000002594',
            productName: 'rozanne_product_01',//rozanne_product_01',
            currency: 'USD',
            amount: 0.79,
            period: 'month',
            duration: 1,
            userId: 'orderId',
            onExit: function () {},
            showBackButton: false,
            enablePaymentRecoverFlow: false,
            titles: {'buyHeading': 'Subscribe to #product', 'buyHeadingRecurring': '#price per #period'}
        };

        requestPurchaseInfoDummy = {
            itemType: '2',
            pageNumber: 1
        };

        requestProductInfoDummy = {
            pageSize: 1,
            pageNumber: 1
        };

        verifyPurchaseDummy = {
            invoiceId: 'DMY1701US000108283'
        };

        applyProductDummy = {
            invoiceId: 'DMY1701US000108283'
        };
    });

    it('should be defined as "toast.billing" namespace.', function() {
        expect(window.toast).toBeDefined();
        expect(window.toast.billing).toBeDefined();
    });
    it('should contain a "buyProduct" function.', function() {
        expect(window.toast.billing.buyProduct).toBeDefined();
        expect(typeof window.toast.billing.buyProduct).toBe('function');
    });
    it('should contain a "init" function.', function() {
        expect(window.toast.billing.init).toBeDefined();
        expect(typeof window.toast.billing.init).toBe('function');
    });
    it('should contain a "requestPurchasesList" function.', function() {
        expect(window.toast.billing.requestPurchasesList).toBeDefined();
        expect(typeof window.toast.billing.requestPurchasesList).toBe('function');
    });
    it('should contain a "requestProductsList" function.', function() {
        expect(window.toast.billing.requestProductsList).toBeDefined();
        expect(typeof window.toast.billing.requestProductsList).toBe('function');
    });
    it('should contain a "verifyPurchase" function.', function() {
        expect(window.toast.billing.verifyPurchase).toBeDefined();
        expect(typeof window.toast.billing.verifyPurchase).toBe('function');
    });
    it('should contain a "applyProduct" function.', function() {
        expect(window.toast.billing.applyProduct).toBeDefined();
        expect(typeof window.toast.billing.applyProduct).toBe('function');
    });
    it('should contain a "checkPurchaseStatus" function.', function() {
        expect(window.toast.billing.checkPurchaseStatus).toBeDefined();
        expect(typeof window.toast.billing.checkPurchaseStatus).toBe('function');
    });
    it('should contain a "cancelSubscription" function.', function() {
        expect(window.toast.billing.cancelSubscription).toBeDefined();
        expect(typeof window.toast.billing.cancelSubscription).toBe('function');
    });

    it('should not contain a property that is not exists in the specs.', function() {
        for (var prop in toast.billing) {
            expect([
                'init',
                'buyProduct',
                'requestPurchasesList',
                'requestProductsList',
                'verifyPurchase',
                'applyProduct',
                'checkPurchaseStatus',
                'cancelSubscription'
            ].indexOf(prop) >= 0).toBeTruthy();
        }
    });

    //toast.billing.init
    describe('toast.billing.init', function() {
        var interval = 5000;

        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.billing.init();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.billing.init([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.init(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.init(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.init('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.init(function () {});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.billing.init(billingInfoDummy, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.init(billingInfoDummy, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.init(billingInfoDummy, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.init(billingInfoDummy, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.init(billingInfoDummy,{});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.billing.init(billingInfoDummy, function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.init(billingInfoDummy, function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.init(billingInfoDummy, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.init(billingInfoDummy, function() {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.init(billingInfoDummy, function() {}, {});
            }).toThrowError(TypeError);
        });

        it('throws Error when mandatory value of 1st argument is missing.', function() {
            expect(function(done) {
                var tempBillingInfoDummy = billingInfoDummy;
                tempBillingInfoDummy.key.checkoutKey = '';
                tempBillingInfoDummy.key.paymentwallKey = '';

                toast.billing.init(tempBillingInfoDummy, function() {
                    done.fail();
                }, function() {
                    done();
                });
            });

            expect(function(done) {
                var tempBillingInfoDummy = billingInfoDummy;
                tempBillingInfoDummy.appId = '';

                toast.billing.init(tempBillingInfoDummy, function() {
                    done.fail();
                }, function() {
                    done();
                });
            });
        });

        it('verify the value of success callback is empty', function(done) {
            toast.billing.init(billingInfoDummy, function(data) {
                expect(data).toBeUndefined();
                done();
            }, function() {
                done.fail();
            });
        }, interval);

        it('verify error callback which has Error object is invoked', function(done) {
            var tempBillingInfoDummy = billingInfoDummy;
            tempBillingInfoDummy.key.checkoutKey = 'ErrorKey';
            tempBillingInfoDummy.key.paymentwallKey = 'ErrorKey';

            toast.billing.init(tempBillingInfoDummy, function() {
                done.fail();
            }, function(e) {
                expect(typeof e).toBe('object');
                expect(e).not.toBeUndefined();
                done();
            });
        }, interval);
    });

    // toast.billing.buyProduct
    describe('toast.billing.buyProduct', function() {
        var interval = 5000;

        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.billing.buyProduct();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.billing.buyProduct([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.buyProduct(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.buyProduct(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.buyProduct('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.buyProduct(function () {});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.billing.buyProduct(productInfoDummy, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.buyProduct(productInfoDummy, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.buyProduct(productInfoDummy, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.buyProduct(productInfoDummy, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.buyProduct(productInfoDummy,{});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.billing.buyProduct(productInfoDummy, function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.buyProduct(productInfoDummy, function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.buyProduct(productInfoDummy, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.buyProduct(productInfoDummy, function() {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.buyProduct(productInfoDummy, function() {}, {});
            }).toThrowError(TypeError);
        });

        it('throws Error when mandatory value of 1st argument is missing.', function() {
            expect(function(done) {
                var tempProductInfoDummy = productInfoDummy;
                tempProductInfoDummy.productId = '';

                toast.billing.buyProduct(tempProductInfoDummy, function() {
                    done.fail();
                }, function() {
                    done();
                });
            }).toThrowError(TypeError);

            expect(function(done) {
                var tempProductInfoDummy = productInfoDummy;
                tempProductInfoDummy.userId = '';

                toast.billing.buyProduct(tempProductInfoDummy, function() {
                    done.fail();
                }, function() {
                    done();
                });
            }).toThrowError(TypeError);

            expect(function(done) {
                var tempProductInfoDummy = productInfoDummy;
                tempProductInfoDummy.productId = '';
                tempProductInfoDummy.userId = '';

                toast.billing.buyProduct(tempProductInfoDummy, function() {
                    done.fail();
                }, function() {
                    done();
                });
            }).toThrowError(TypeError);
        });

        it('verify "buyProduct" screen was shown (non-subscription)', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.buyProduct(productInfoDummy, function() {
                    helper.aOrB('(non-subscription) Did you see "buyProduct" screen? Success callback was invoked normally', ['YES', 'NO'], function(answer) {
                        expect(answer).toBe(true);
                        expect(answer).not.toBe('TIMEOUT');
                        done();
                    });
                }, function(e) {
                    helper.aOrB('(non-subscription) Did you see "buyProduct" screen? Error callback was invoked normally : ' + JSON.stringify(e), ['YES', 'NO'], function(answer) {
                        expect(answer).toBe(true);
                        expect(answer).not.toBe('TIMEOUT');
                        done();
                    });
                });
            }, function(e) {
                done.fail();
            });
        }, 60000);

        it('verify "buyProduct" screen was shown (subscription)', function(done) {
            var tempProductInfoDummy = productInfoDummy;
            tempProductInfoDummy.productId = 'DP111000002597';
            tempProductInfoDummy.productName = 'rozanne_subscription_01';
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.buyProduct(productInfoDummy, function() {
                    helper.aOrB('(subscription) Did you see "buyProduct" screen? Success callback was invoked normally', ['YES', 'NO'], function(answer) {
                        expect(answer).toBe(true);
                        expect(answer).not.toBe('TIMEOUT');
                        done();
                    });
                }, function(e) {
                    helper.aOrB('(subscription) Did you see "buyProduct" screen? Error callback was invoked normally : ' + JSON.stringify(e), ['YES', 'NO'], function(answer) {
                        expect(answer).toBe(true);
                        expect(answer).not.toBe('TIMEOUT');
                        done();
                    });
                });
            }, function(e) {
                done.fail();
            });
        }, 60000);

        it('verify error callback which has Error object is invoked', function(done) {
            var tempProductInfoDummy = productInfoDummy;
            tempProductInfoDummy.productId = 'ErrorProductId';

            toast.billing.buyProduct(tempProductInfoDummy, function() {
                done.fail();
            }, function(e) {
                expect(typeof e).toBe('object');
                expect(e).not.toBeUndefined();
                done();
            });
        }, interval);
    });

    // toast.billing.requestPurchasesList
    describe('toast.billing.requestPurchasesList', function() {
        var interval = 5000;

        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.billing.requestPurchasesList();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.billing.requestPurchasesList([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestPurchasesList(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestPurchasesList(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestPurchasesList('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestPurchasesList(function () {});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.billing.requestPurchasesList(requestPurchaseInfoDummy, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestPurchasesList(requestPurchaseInfoDummy, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestPurchasesList(requestPurchaseInfoDummy, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestPurchasesList(requestPurchaseInfoDummy, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestPurchasesList(requestPurchaseInfoDummy,{});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.billing.requestPurchasesList(requestPurchaseInfoDummy, function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestPurchasesList(requestPurchaseInfoDummy, function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestPurchasesList(requestPurchaseInfoDummy, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestPurchasesList(requestPurchaseInfoDummy, function() {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestPurchasesList(requestPurchaseInfoDummy, function() {}, {});
            }).toThrowError(TypeError);
        });

        it('throws Error when mandatory value of 1st argument is missing.', function() {
            expect(function(done) {
                var tempRequestPurchaseInfoDummy = requestPurchaseInfoDummy;
                tempRequestPurchaseInfoDummy.itemType = '';

                toast.billing.requestPurchasesList(tempRequestPurchaseInfoDummy, function() {
                    done.fail();
                }, function() {
                    done();
                });
            }).toThrowError(TypeError);
            expect(function(done) {
                var tempRequestPurchaseInfoDummy = requestPurchaseInfoDummy;
                tempRequestPurchaseInfoDummy.pageNumber = '';

                toast.billing.requestPurchasesList(tempRequestPurchaseInfoDummy, function() {
                    done.fail();
                }, function() {
                    done();
                });
            }).toThrowError(TypeError);
        });

        it('verify the return data is ok', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.requestPurchasesList(requestPurchaseInfoDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    helper.alert('requestPurchasesList Data : ' + JSON.stringify(data), function() {
                        done();
                    },5000);
                }, function(e) {
                    helper.alert('requestPurchasesList Error : ' + JSON.stringify(e), function() {
                        done.fail();
                    },5000);
                });
            }, function(e) {
                helper.alert('toast.billing.init Error : ' + JSON.stringify(e), function() {
                    done.fail();
                },5000);
            });
        }, 10000);

        it('verify error callback which has Error object is invoked', function(done) {
            var tempRequestPurchaseInfoDummy = requestPurchaseInfoDummy;
            tempRequestPurchaseInfoDummy.itemType = 'ErrorItemType';

            toast.billing.requestPurchasesList(tempRequestPurchaseInfoDummy, function() {
                done.fail();
            }, function(e) {
                expect(typeof e).toBe('object');
                expect(e).not.toBeUndefined();
                done();
            });
        }, interval);
    });

    // toast.billing.requestProductsList
    describe('toast.billing.requestProductsList', function() {
        var interval = 5000;

        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.billing.requestProductsList();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.billing.requestProductsList([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestProductsList(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestProductsList(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestProductsList('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestProductsList(function () {});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.billing.requestProductsList(requestProductInfoDummy, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestProductsList(requestProductInfoDummy, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestProductsList(requestProductInfoDummy, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestProductsList(requestProductInfoDummy, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestProductsList(requestProductInfoDummy,{});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.billing.requestProductsList(requestProductInfoDummy, function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestProductsList(requestProductInfoDummy, function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestProductsList(requestProductInfoDummy, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestProductsList(requestProductInfoDummy, function() {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.requestProductsList(requestProductInfoDummy, function() {}, {});
            }).toThrowError(TypeError);
        });

        it('verify the return data is ok', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.requestProductsList(requestProductInfoDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    helper.alert('requestProductInfoDummy Data : ' + JSON.stringify(data), function() {
                        done();
                    },5000);
                }, function(e) {
                    helper.alert('requestProductInfoDummy Error : ' + JSON.stringify(e), function() {
                        done.fail();
                    },5000);
                });
            }, function(e) {
                helper.alert('toast.billing.init Error : ' + JSON.stringify(e), function() {
                    done.fail();
                },5000);
            });
        }, 10000);

        it('verify error callback which has Error object is invoked', function(done) {
            var tempRequestProductInfoDummy = requestProductInfoDummy;
            tempRequestProductInfoDummy.pageSize = 'ErrorPageSize';

            toast.billing.requestProductsList(tempRequestProductInfoDummy, function() {
                done.fail();
            }, function(e) {
                expect(typeof e).toBe('object');
                expect(e).not.toBeUndefined();
                done();
            });
        }, interval);
    });

    // toast.billing.verifyPurchase
    describe('toast.billing.verifyPurchase', function() {
        var interval = 5000;

        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.billing.verifyPurchase();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.billing.verifyPurchase([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.verifyPurchase(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.verifyPurchase(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.verifyPurchase('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.verifyPurchase(function () {});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.billing.verifyPurchase(verifyPurchaseDummy, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.verifyPurchase(verifyPurchaseDummy, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.verifyPurchase(verifyPurchaseDummy, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.verifyPurchase(verifyPurchaseDummy, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.verifyPurchase(verifyPurchaseDummy,{});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.billing.verifyPurchase(verifyPurchaseDummy, function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.verifyPurchase(verifyPurchaseDummy, function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.verifyPurchase(verifyPurchaseDummy, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.verifyPurchase(verifyPurchaseDummy, function() {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.verifyPurchase(verifyPurchaseDummy, function() {}, {});
            }).toThrowError(TypeError);
        });

        it('throws Error when mandatory value of 1st argument is missing.', function() {
            expect(function(done) {
                var tempVerifyPurchaseDummy = verifyPurchaseDummy;
                tempVerifyPurchaseDummy.invoiceId = '';

                toast.billing.verifyPurchase(tempVerifyPurchaseDummy, function() {
                    done.fail();
                }, function() {
                    done();
                });
            }).toThrowError(TypeError);
        });

        it('verify the return data is ok', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.verifyPurchase(verifyPurchaseDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    helper.alert('verifyPurchase Data : ' + JSON.stringify(data), function() {
                        done();
                    },5000);
                }, function(e) {
                    helper.alert('verifyPurchase Error : ' + JSON.stringify(e), function() {
                        done.fail();
                    },5000);
                });
            }, function(e) {
                helper.alert('toast.billing.init Error : ' + JSON.stringify(e), function() {
                    done.fail();
                },5000);
            });
        }, 10000);

        it('verify error callback which has Error object is invoked', function(done) {
            var tempVerifyPurchaseDummy = verifyPurchaseDummy;
            tempVerifyPurchaseDummy.invoiceId = 'ErrorInvoiceId';

            toast.billing.verifyPurchase(tempVerifyPurchaseDummy, function() {
                done.fail();
            }, function(e) {
                expect(typeof e).toBe('object');
                expect(e).not.toBeUndefined();
                done();
            });
        }, interval);
    });

    // toast.billing.applyProduct
    describe('toast.billing.applyProduct', function() {
        var interval = 5000;

        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.billing.applyProduct();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.billing.applyProduct([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.applyProduct(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.applyProduct(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.applyProduct('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.applyProduct(function () {});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.billing.applyProduct(applyProductDummy, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.applyProduct(applyProductDummy, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.applyProduct(applyProductDummy, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.applyProduct(applyProductDummy, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.applyProduct(applyProductDummy,{});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.billing.applyProduct(applyProductDummy, function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.applyProduct(applyProductDummy, function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.applyProduct(applyProductDummy, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.applyProduct(applyProductDummy, function() {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.applyProduct(applyProductDummy, function() {}, {});
            }).toThrowError(TypeError);
        });

        it('throws Error when mandatory value of 1st argument is missing.', function() {
            expect(function(done) {
                var tempApplyProductDummy = applyProductDummy;
                tempApplyProductDummy.invoiceId = '';

                toast.billing.applyProduct(tempApplyProductDummy, function() {
                    done.fail();
                }, function() {
                    done();
                });
            }).toThrowError(TypeError);
        });

        it('verify the return data is ok', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.applyProduct(applyProductDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    helper.alert('applyProduct Data : ' + JSON.stringify(data), function() {
                        done();
                    },5000);
                }, function(e) {
                    helper.alert('applyProduct Error : ' + JSON.stringify(e), function() {
                        done.fail();
                    },5000);
                });
            }, function(e) {
                helper.alert('toast.billing.init Error : ' + JSON.stringify(e), function() {
                    done.fail();
                },5000);
            });
        }, 10000);

        it('verify error callback which has Error object is invoked', function(done) {
            var tempApplyProductDummy = applyProductDummy;
            tempApplyProductDummy.invoiceId = 'ErrorInvoiceId';

            toast.billing.applyProduct(tempApplyProductDummy, function() {
                done.fail();
            }, function(e) {
                expect(typeof e).toBe('object');
                expect(e).not.toBeUndefined();
                done();
            });
        }, interval);
    });

    // toast.billing.checkPurchaseStatus
    describe('toast.billing.checkPurchaseStatus', function() {
        var interval = 5000;

        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.billing.checkPurchaseStatus();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.billing.checkPurchaseStatus([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.checkPurchaseStatus(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.checkPurchaseStatus(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.checkPurchaseStatus('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.checkPurchaseStatus(function () {});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.billing.checkPurchaseStatus(productInfoDummy, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.checkPurchaseStatus(productInfoDummy, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.checkPurchaseStatus(productInfoDummy, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.checkPurchaseStatus(productInfoDummy, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.checkPurchaseStatus(productInfoDummy,{});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.billing.checkPurchaseStatus(productInfoDummy, function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.checkPurchaseStatus(productInfoDummy, function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.checkPurchaseStatus(productInfoDummy, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.checkPurchaseStatus(productInfoDummy, function() {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.checkPurchaseStatus(productInfoDummy, function() {}, {});
            }).toThrowError(TypeError);
        });

        it('throws Error when mandatory value of 1st argument is missing.', function() {
            expect(function(done) {
                var tempProductInfoDummy = productInfoDummy;
                tempProductInfoDummy.productId = '';

                toast.billing.checkPurchaseStatus(tempProductInfoDummy, function() {
                    done.fail();
                }, function() {
                    done();
                });
            }).toThrowError(TypeError);

            expect(function(done) {
                var tempProductInfoDummy = productInfoDummy;
                tempProductInfoDummy.userId = '';

                toast.billing.checkPurchaseStatus(tempProductInfoDummy, function() {
                    done.fail();
                }, function() {
                    done();
                });
            }).toThrowError(TypeError);

            expect(function(done) {
                var tempProductInfoDummy = productInfoDummy;
                tempProductInfoDummy.productId = '';
                tempProductInfoDummy.userId = '';

                toast.billing.checkPurchaseStatus(tempProductInfoDummy, function() {
                    done.fail();
                }, function() {
                    done();
                });
            }).toThrowError(TypeError);
        });

        it('verify the return data is ok (non-subscription)', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.checkPurchaseStatus(productInfoDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    helper.alert('(non-subscription) Received data : ' + JSON.stringify(data), function() {
                        done();
                    },5000);
                }, function(e) {
                    helper.alert('(non-subscription) toast.billing.checkPurchaseStatus Error : ' + JSON.stringify(e), function() {
                        done.fail();
                    },5000);
                });
            }, function(e) {
                helper.alert('(non-subscription) toast.billing.init Error : ' + JSON.stringify(e), function() {
                    done.fail();
                },5000);
            });
        }, 10000);

        it('verify the return data is ok (subscription)', function(done) {
            var tempProductInfoDummy = productInfoDummy;
            tempProductInfoDummy.productId = 'DP111000002597';
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.checkPurchaseStatus(tempProductInfoDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    helper.alert('(subscription) Received data : ' + JSON.stringify(data), function() {
                        done();
                    },5000);
                }, function(e) {
                    helper.alert('(subscription) toast.billing.checkPurchaseStatus Error : ' + JSON.stringify(e), function() {
                        done.fail();
                    },5000);
                });
            }, function(e) {
                helper.alert('(subscription) toast.billing.init Error : ' + JSON.stringify(e), function() {
                    done.fail();
                },5000);
            });
        }, 10000);

        it('verify error callback which has Error object is invoked', function(done) {
            var tempProductInfoDummy = productInfoDummy;
            tempProductInfoDummy.productId = 'ErrorProductId';

            toast.billing.checkPurchaseStatus(tempProductInfoDummy, function() {
                done.fail();
            }, function(e) {
                expect(typeof e).toBe('object');
                expect(e).not.toBeUndefined();
                done();
            });
        }, interval);
    });

    // toast.billing.cancelSubscription
    describe('toast.billing.cancelSubscription', function() {
        var interval = 5000;

        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.billing.cancelSubscription();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.billing.cancelSubscription([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.cancelSubscription(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.cancelSubscription(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.cancelSubscription('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.cancelSubscription(function () {});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.billing.cancelSubscription(productInfoDummy, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.cancelSubscription(productInfoDummy, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.cancelSubscription(productInfoDummy, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.cancelSubscription(productInfoDummy, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.cancelSubscription(productInfoDummy,{});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.billing.cancelSubscription(productInfoDummy, function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.cancelSubscription(productInfoDummy, function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.cancelSubscription(productInfoDummy, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.cancelSubscription(productInfoDummy, function() {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.billing.cancelSubscription(productInfoDummy, function() {}, {});
            }).toThrowError(TypeError);
        });

        it('throws Error when mandatory value of 1st argument is missing.', function() {
            expect(function(done) {
                var tempProductInfoDummy = productInfoDummy;
                tempProductInfoDummy.productId = '';

                toast.billing.cancelSubscription(tempProductInfoDummy, function() {
                    done.fail();
                }, function() {
                    done();
                });
            }).toThrowError(TypeError);

            expect(function(done) {
                var tempProductInfoDummy = productInfoDummy;
                tempProductInfoDummy.userId = '';

                toast.billing.cancelSubscription(tempProductInfoDummy, function() {
                    done.fail();
                }, function() {
                    done();
                });
            }).toThrowError(TypeError);

            expect(function(done) {
                var tempProductInfoDummy = productInfoDummy;
                tempProductInfoDummy.productId = '';
                tempProductInfoDummy.userId = '';

                toast.billing.cancelSubscription(tempProductInfoDummy, function() {
                    done.fail();
                }, function() {
                    done();
                });
            }).toThrowError(TypeError);
        });

        it('verify the return data is ok (non-subscription)', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.cancelSubscription(productInfoDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    helper.aOrB('(non-subscription) Please check received data is valid : ' + JSON.stringify(data), ['YES', 'NO'], function(answer) {
                        expect(answer).toBe(true);
                        done();
                    });
                }, function(e) {
                    helper.alert('(non-subscription) toast.billing.cancelSubscription Error : ' + JSON.stringify(e), function() {
                        expect(typeof e).toBe('object');
                        done();
                    },5000);
                });
            }, function(e) {
                helper.alert('(non-subscription) toast.billing.init Error : ' + JSON.stringify(e), function() {
                    expect(typeof e).toBe('object');
                    done();
                },5000);
            });
        }, 10000);

        it('verify the return data is ok (subscription)', function(done) {
            var tempProductInfoDummy = productInfoDummy;
            tempProductInfoDummy.productId = 'DP111000002597';

            toast.billing.init(billingInfoDummy, function () {
                toast.billing.cancelSubscription(tempProductInfoDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    helper.aOrB('(subscription) Please check received data is valid : ' + JSON.stringify(data), ['YES', 'NO'], function(answer) {
                        expect(answer).toBe(true);
                        done();
                    });
                }, function(e) {
                    helper.alert('(subscription) toast.billing.cancelSubscription Error : ' + JSON.stringify(e), function() {
                        expect(typeof e).toBe('object');
                        done();
                    },5000);
                });
            }, function(e) {
                helper.alert('(subscription) toast.billing.init Error : ' + JSON.stringify(e), function() {
                    expect(typeof e).toBe('object');
                    done();
                },5000);
            });
        }, 10000);

        it('verify error callback which has Error object is invoked', function(done) {
            var tempProductInfoDummy = productInfoDummy;
            tempProductInfoDummy.productId = 'ErrorProductId';

            toast.billing.cancelSubscription(tempProductInfoDummy, function() {
                done.fail();
            }, function(e) {
                expect(typeof e).toBe('object');
                expect(e).not.toBeUndefined();
                done();
            });
        }, interval);
    });

    describe('init/requestPurchasesList/requestProductsList combination', function() {
        var interval = 60000;

        it('execute init/requestPurchasesList', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.requestPurchasesList(requestPurchaseInfoDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    helper.alert('requestPurchasesList data : ' + JSON.stringify(data), function() {
                        done();
                    },5000);
                }, function(e) {
                    done.fail();
                });
            }, function(e) {
                done.fail();
            });
        }, interval);

        it('execute init/requestProductsList', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.requestProductsList(requestProductInfoDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    helper.alert('requestProductsList data : ' + JSON.stringify(data), function() {
                        done();
                    },5000);
                }, function(e) {
                    done.fail();
                });
            }, function(e) {
                done.fail();
            });
        }, interval);
    });

    describe('init/checkPurchaseStatus/verifyPurchase/applyProduct combination', function() {
        var interval = 60000;

        it('execute init/checkPurchaseStatus/verifyPurchase', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.checkPurchaseStatus(productInfoDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    var tempVerifyPurchaseDummy = verifyPurchaseDummy;
                    tempVerifyPurchaseDummy.invoiceId = data[0].invoiceId;

                    toast.billing.verifyPurchase(tempVerifyPurchaseDummy, function(data) {
                        expect(data).not.toBeUndefined();
                        expect(typeof data).toBe('object');

                        helper.alert('verifyPurchase data : ' + JSON.stringify(data), function() {
                            done();
                        },5000);
                    }, function(e) {
                        done.fail();
                    });
                }, function(e) {
                    done.fail();
                });
            }, function(e) {
                done.fail();
            });
        }, interval);

        it('execute init/checkPurchaseStatus/applyProduct', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.checkPurchaseStatus(productInfoDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    var tempApplyProductDummy = applyProductDummy;
                    tempApplyProductDummy.invoiceId = data[0].invoiceId;

                    toast.billing.applyProduct(tempApplyProductDummy, function(data) {
                        expect(data).not.toBeUndefined();
                        expect(typeof data).toBe('object');

                        helper.alert('applyProduct data : ' + JSON.stringify(data), function() {
                            done();
                        },5000);
                    }, function(e) {
                        done.fail();
                    });
                }, function(e) {
                    done.fail();
                });
            }, function(e) {
                done.fail();
            });
        }, interval);
    });

    describe('init/buyProduct/checkPurchaseStatus/cancelSubscription combination', function() {
        var interval = 60000;

        it('execute init/buyProduct/checkPurchaseStatus for non-subscription item', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.buyProduct(productInfoDummy, function() {
                    helper.aOrB('(non-subscription) Did you see "buyProduct" screen? Success callback was invoked normally', ['YES', 'NO'], function(answer) {
                        expect(answer).toBe(true);
                        expect(answer).not.toBe('TIMEOUT');

                        toast.billing.checkPurchaseStatus(productInfoDummy, function(data) {
                            expect(data).not.toBeUndefined();
                            expect(typeof data).toBe('object');

                            helper.alert('(non-subscription) Received data : ' + JSON.stringify(data), function() {
                                done();
                            },5000);
                        }, function(e) {
                            done.fail();
                        });
                    });
                }, function(e) {
                    done.fail();
                });
            }, function(e) {
                done.fail();
            });
        }, interval);

        it('execute init/buyProduct/checkPurchaseStatus/cancelSubscription for subscription item', function(done) {
            var tempProductInfoDummy = productInfoDummy;
            tempProductInfoDummy.productId = 'DP111000002597';

            toast.billing.init(billingInfoDummy, function () {
                toast.billing.buyProduct(tempProductInfoDummy, function() {
                    helper.aOrB('(non-subscription) Did you see "buyProduct" screen? Success callback was invoked normally', ['YES', 'NO'], function(answer) {
                        expect(answer).toBe(true);
                        expect(answer).not.toBe('TIMEOUT');

                        toast.billing.checkPurchaseStatus(tempProductInfoDummy, function(data) {
                            expect(data).not.toBeUndefined();
                            expect(typeof data).toBe('object');

                            helper.alert('(non-subscription) Received data : ' + JSON.stringify(data), function() {
                                toast.billing.cancelSubscription(tempProductInfoDummy, function(data) {
                                    expect(data).not.toBeUndefined();
                                    expect(typeof data).toBe('object');

                                    helper.alert('(non-subscription) Received data : ' + JSON.stringify(data), function() {
                                        done();
                                    },5000);
                                }, function(e) {
                                    done.fail();
                                });
                            },5000);
                        }, function(e) {
                            done.fail();
                        });
                    });
                }, function(e) {
                    done.fail();
                });
            }, function(e) {
                done.fail();
            });
        }, interval);
    });
});
