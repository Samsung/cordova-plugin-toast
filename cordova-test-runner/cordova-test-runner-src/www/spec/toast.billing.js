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
    it('should be defined as "toast.billing" namespace.', function() {
        expect(window.toast).toBeDefined();
        expect(window.toast.billing).toBeDefined();
    });

    it('should contain a "init" function.', function() {
        expect(window.toast.billing.init).toBeDefined();
        expect(typeof window.toast.billing.init).toBe('function');
    });
    it('should contain a "buyProduct" function.', function() {
        expect(window.toast.billing.buyProduct).toBeDefined();
        expect(typeof window.toast.billing.buyProduct).toBe('function');
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
                'checkPurchaseStatus',
                'cancelSubscription'
            ].indexOf(prop) >= 0).toBeTruthy();
        }
    });

    describe('toast.billing.init', function() {
        var billingInfoDummy = {};
        var interval = 5000;
        beforeEach(function() {
            // toast.billing.init 1st argument : dummy data
            billingInfoDummy = {
                key : {
                    paymentwallKey : 't_0f6a922e0d3af023124ae0dc2374b6',
                    checkoutKey : 'rCvi9+aOAYxlzBZgTlGe/ajDHWo6GF4W+JiHWn8Uuzc=' //'o8KzSGh22UN6CZzQ6qQTiGJiWqgXFwVeNmhr0uzo7jo=',yours
                },
                countryCode : 'US',
                containerId : 'containerid',
                lang : 'EN',
                gaWebPropertyId : 'poSample', //googleAccount
                appId : '3201508004443', //yours 3201611011047
                serverType : 'FAKE'
                // brand : 'samsung'
            };
        });

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
                }, function(){
                    done();
                });
            }).toThrowError(TypeError);

            expect(function(done) {
                var tempBillingInfoDummy = billingInfoDummy;
                tempBillingInfoDummy.appId = '';

                toast.billing.init(tempBillingInfoDummy, function() {
                    done.fail();
                }, function(){
                    done();
                });
            }).toThrowError(TypeError);

            expect(function(done) {
                var tempBillingInfoDummy = billingInfoDummy;
                tempBillingInfoDummy.key.checkoutKey = '';
                tempBillingInfoDummy.key.paymentwallKey = '';
                tempBillingInfoDummy.appId = '';

                toast.billing.init(tempBillingInfoDummy, function() {
                    done.fail();
                }, function(){
                    done();
                });
            }).toThrowError(TypeError);
        });

        it('verify the value of success callback is empty', function(done) {
            toast.billing.init(billingInfoDummy, function(data) {
                expect(data).toBeUndefined();
                done();
            }, function() {
                done.fail();
            });
        }, interval);

        it('verify error callback is invoked', function(done) {
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

    describe('toast.billing.buyProduct', function() {
        var productInfoDummy = {};
        var billingInfoDummy = {};
        var interval = 5000;
        beforeEach(function() {
            // toast.billing.buyProduct 1st argument : dummy data
            productInfoDummy = {
                productId : 'DP111000002594',//'DP111000002594',
                productName : 'rozanne_product_01',//rozanne_product_01',
                currency : 'USD',
                amount : 0.79,
                period : '',
                duration : 3,
                userId : '',
                onExit : function () {},
                showBackButton : false,
                enablePaymentRecoverFlow : false,
                titles : {key : "test", value : "test"},
                orderId : 'orderId',
                orderItemPath : 'jpg'
                // appId : 'applicationId',
                // paymentDetails : {},
                // paymentServer : 'FAKE'
            };

            // toast.billing.init 1st argument : dummy data
            billingInfoDummy = {
                key : {
                    paymentwallKey : 't_0f6a922e0d3af023124ae0dc2374b6',
                    checkoutKey : 'rCvi9+aOAYxlzBZgTlGe/ajDHWo6GF4W+JiHWn8Uuzc=' //'o8KzSGh22UN6CZzQ6qQTiGJiWqgXFwVeNmhr0uzo7jo=',yours
                },
                countryCode : 'US',
                containerId : 'containerid',
                lang : 'EN',
                gaWebPropertyId : 'poSample', //googleAccount
                appId : '3201508004443', //yours 3201611011047
                serverType : 'FAKE'
                // brand : 'samsung'
            };
        });
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
                }, function(){
                    done();
                });
            }).toThrowError(TypeError);

            expect(function(done) {
                var tempProductInfoDummy = productInfoDummy;
                tempProductInfoDummy.userId = '';

                toast.billing.buyProduct(tempProductInfoDummy, function() {
                    done.fail();
                }, function(){
                    done();
                });
            }).toThrowError(TypeError);

            expect(function(done) {
                var tempProductInfoDummy = productInfoDummy;
                tempProductInfoDummy.productId = '';
                tempProductInfoDummy.userId = '';

                toast.billing.buyProduct(tempProductInfoDummy, function() {
                    done.fail();
                }, function(){
                    done();
                });
            }).toThrowError(TypeError);
        });

        it('verify working this method was normal (non-subscription)', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.buyProduct(productInfoDummy, function() {
                    helper.aOrB('Did you see "buyProduct" screen? (non-subscription)', ['YES', 'NO'], function(answer) {
                        expect(answer).toBe(true);
                        expect(answer).not.toBe('TIMEOUT');
                        done();
                    });
                }, function(e) {
                    done.fail();
                });
            }, function(e) {
                done.fail();
            });
        }, 60000);

        it('verify working this method was normal (subscription)', function(done) {
            var tempProductInfoDummy = productInfoDummy;
            tempProductInfoDummy.productId = 'DP111000002597';
            tempProductInfoDummy.productName = 'rozanne_subscription_01';
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.buyProduct(tempProductInfoDummy, function() {
                    helper.aOrB('Did you see "buyProduct" screen? (subscription)', ['YES', 'NO'], function(answer) {
                        expect(answer).toBe(true);
                        expect(answer).not.toBe('TIMEOUT');
                        done();
                    });
                }, function(e) {
                    done.fail();
                });
            }, function(e) {
                done.fail();
            });
        }, 60000);

        it('verify error callback is invoked', function(done) {
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

    describe('toast.billing.checkPurchaseStatus', function() {
        var productInfoDummy = {};
        var billingInfoDummy = {};
        var interval = 5000;
        beforeEach(function() {
            // toast.billing.checkPurchaseStatus 1st argument : dummy data
            productInfoDummy = {
                productId : 'DP111000002594',
                userId : 'orderId'
                // pageSize : 10,
                // pageNumber : 10,
                // appId : 'appId',
                // checkValue : 'checkValue',
                // countryCode : 'KR'
            };

            // toast.billing.init 1st argument : dummy data
            billingInfoDummy = {
                key : {
                    paymentwallKey : 't_0f6a922e0d3af023124ae0dc2374b6',
                    checkoutKey : 'rCvi9+aOAYxlzBZgTlGe/ajDHWo6GF4W+JiHWn8Uuzc=' //'o8KzSGh22UN6CZzQ6qQTiGJiWqgXFwVeNmhr0uzo7jo=',yours
                },
                countryCode : 'US',
                containerId : 'containerid',
                lang : 'EN',
                gaWebPropertyId : 'poSample', //googleAccount
                appId : '3201508004443', //yours 3201611011047
                serverType : 'FAKE'
                // brand : 'samsung'
            };
        });

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
                }, function(){
                    done();
                });
            }).toThrowError(TypeError);

            expect(function(done) {
                var tempProductInfoDummy = productInfoDummy;
                tempProductInfoDummy.userId = '';

                toast.billing.checkPurchaseStatus(tempProductInfoDummy, function() {
                    done.fail();
                }, function(){
                    done();
                });
            }).toThrowError(TypeError);

            expect(function(done) {
                var tempProductInfoDummy = productInfoDummy;
                tempProductInfoDummy.productId = '';
                tempProductInfoDummy.userId = '';

                toast.billing.checkPurchaseStatus(tempProductInfoDummy, function() {
                    done.fail();
                }, function(){
                    done();
                });
            }).toThrowError(TypeError);
        });

        it('verify the return data is ok (non-subscription)', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.checkPurchaseStatus(productInfoDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    helper.alert('(non-subscription) Received data : ' + JSON.stringify(data), function(){
                        done();
                    },5000);
                }, function(e) {
                    done.fail();
                });
            }, function(e) {
                done.fail();
            })
        }, 10000);

        it('verify the return data is ok (subscription)', function(done) {
            var tempProductInfoDummy = productInfoDummy;
            tempProductInfoDummy.productId = 'DP111000002597';
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.checkPurchaseStatus(tempProductInfoDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    helper.alert('(subscription) Received data : ' + JSON.stringify(data), function(){
                        done();
                    },5000);
                }, function(e) {
                    done.fail();
                });
            }, function(e) {
                done.fail();
            })
        }, 10000);

        it('verify error callback is invoked', function(done) {
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

    describe('toast.billing.cancelSubscription', function() {
        var productInfoDummy = {};
        var billingInfoDummy = {};
        var interval = 5000;
        beforeEach(function() {
            // toast.billing.cancelSubscription 1st argument : dummy data
            productInfoDummy = {
                productId : 'DP111000002594',
                userId : 'orderId'
                // appId : 'appId',
                // appId : 'appId',
                // countryCode : 'KR',
                // CustomID : 'customId'
            };

            // toast.billing.init 1st argument : dummy data
            billingInfoDummy = {
                key : {
                    paymentwallKey : 't_0f6a922e0d3af023124ae0dc2374b6',
                    checkoutKey : 'rCvi9+aOAYxlzBZgTlGe/ajDHWo6GF4W+JiHWn8Uuzc=' //'o8KzSGh22UN6CZzQ6qQTiGJiWqgXFwVeNmhr0uzo7jo=',yours
                },
                countryCode : 'US',
                containerId : 'containerid',
                lang : 'EN',
                gaWebPropertyId : 'poSample', //googleAccount
                appId : '3201508004443', //yours 3201611011047
                serverType : 'FAKE'
                // brand : 'samsung'
            };
        });

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
                }, function(){
                    done();
                });
            }).toThrowError(TypeError);

            expect(function(done) {
                var tempProductInfoDummy = productInfoDummy;
                tempProductInfoDummy.userId = '';

                toast.billing.cancelSubscription(tempProductInfoDummy, function() {
                    done.fail();
                }, function(){
                    done();
                });
            }).toThrowError(TypeError);

            expect(function(done) {
                var tempProductInfoDummy = productInfoDummy;
                tempProductInfoDummy.productId = '';
                tempProductInfoDummy.userId = '';

                toast.billing.cancelSubscription(tempProductInfoDummy, function() {
                    done.fail();
                }, function(){
                    done();
                });
            }).toThrowError(TypeError);
        });

        it('verify the return data is ok (non-subscription)', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.cancelSubscription(productInfoDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    helper.alert('(non-subscription) Received data : ' + JSON.stringify(data), function(){
                        done();
                    },5000);
                }, function(e) {
                    done.fail();
                });
            }, function(e) {
                done.fail();
            })
        }, 10000);

        it('verify the return data is ok (subscription)', function(done) {
            var tempProductInfoDummy = productInfoDummy;
            tempProductInfoDummy.productId = 'DP111000002597';

            toast.billing.init(billingInfoDummy, function () {
                toast.billing.cancelSubscription(tempProductInfoDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    helper.alert('(subscription) Received data : ' + JSON.stringify(data), function(){
                        done();
                    },5000);
                }, function(e) {
                    done.fail();
                });
            }, function(e) {
                done.fail();
            })
        }, 10000);

        it('verify error callback is invoked', function(done) {
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
});
