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
                key : 'rCvi9+aOAYxlzBZgTlGe/ajDHWo6GF4W+JiHWn8Uuzc=', //'o8KzSGh22UN6CZzQ6qQTiGJiWqgXFwVeNmhr0uzo7jo=',yours
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
                tempBillingInfoDummy.key = '';

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
                tempBillingInfoDummy.key = '';
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
            tempBillingInfoDummy.key = 'ErrorKey';

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
        var spy;
        beforeEach(function() {
            // toast.billing.buyProduct 1st argument : dummy data
            productInfoDummy = {
                productId : 'DP111000002597',//'DP111000002594',
                productName : 'rozanne_subscription_01',//rozanne_product_01',
                currency : 'USD',
                amount : '0.79',
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
            spy = spyOn(toast.billing, 'buyProduct').and.callThrough();
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

        // toast.billing.buyProduct 1st argument check
        it('verify the 1st arguments are all matched to spec', function(done) {
            var firstArgs = {};
            expect(window.toast.billing.buyProduct).toHaveBeenCalled();

            // firstArgs = spy.getCall(0).args[0];
            // expect(typeof firstArgs.productId).toBe('string');
            // expect(typeof firstArgs.appId).toBe('string');
            done();
        }, 3000);

        // // toast.billing.buyProduct return data check
        // it('verify the return data is ok', function() {
        //     toast.billing.buyProduct(productInfoDummy, function(data) {
        //         expect(typeof data).toBe('object');
        //         done();
        //     }, function(e) {
        //         done.fail();
        //     });
        // }, 3000);

        // // toast.billing.buyProduct return data check
        // it('verify the return data is ok', function() {
        //     var result;
        //     runs(function() {
        //         toast.billing.buyProduct(productInfoDummy, function(data) {
        //             result = data;
        //         }, function(e) {});
        //     });
        //
        //     waitsFor(function() {
        //         return result;
        //     }, 'received return data', 1000);
        //
        //     runs(function() {
        //         console.log('Received data is ' + JSON.stringify(result));
        //     });
        // });
    });

    describe('toast.billing.checkPurchaseStatus', function() {
        var productInfoDummy = {};
        var billingInfoDummy = {};
        var interval = 5000;
        beforeEach(function() {
            // toast.billing.checkPurchaseStatus 1st argument : dummy data
            productInfoDummy = {
                productId : 'DP111000002597',
                userId : 'orderId'
                // pageSize : 10,
                // pageNumber : 10,
                // appId : 'appId',
                // checkValue : 'checkValue',
                // countryCode : 'KR'
            };

            // toast.billing.init 1st argument : dummy data
            billingInfoDummy = {
                key : 'rCvi9+aOAYxlzBZgTlGe/ajDHWo6GF4W+JiHWn8Uuzc=', //'o8KzSGh22UN6CZzQ6qQTiGJiWqgXFwVeNmhr0uzo7jo=',yours
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

        it('verify the return data is ok', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.checkPurchaseStatus(productInfoDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    helper.alert('Received data : ' + JSON.stringify(data), function(ok){
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
                productId : 'DP111000002597',
                userId : 'orderId'
                // appId : 'appId',
                // appId : 'appId',
                // countryCode : 'KR',
                // CustomID : 'customId'
            };

            // toast.billing.init 1st argument : dummy data
            billingInfoDummy = {
                key : 'rCvi9+aOAYxlzBZgTlGe/ajDHWo6GF4W+JiHWn8Uuzc=', //'o8KzSGh22UN6CZzQ6qQTiGJiWqgXFwVeNmhr0uzo7jo=',yours
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

        it('verify the return data is ok', function(done) {
            toast.billing.init(billingInfoDummy, function () {
                toast.billing.cancelSubscription(productInfoDummy, function(data) {
                    expect(data).not.toBeUndefined();
                    expect(typeof data).toBe('object');

                    helper.alert('Received data : ' + JSON.stringify(data), function(ok){
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
