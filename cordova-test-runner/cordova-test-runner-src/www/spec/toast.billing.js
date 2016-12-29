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
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // toast.billing.init 1st argument : dummy data
            var billingInfoDummy = {
                key : '',
                countryCode : 'KR',
                containerId : 'containerid',
                lang : 'KO',
                gaWebPreopertyId : 'googleAccount',
                appId : 'applicationId',
                serverType : 'FAKE'
                // brand : 'samsung'
            };

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

        // toast.billing.init 1st argument check
        it('verify the 1st arguments are all matched to spec', function() {
            var spy = spyOn(toast.billing, init);
            var firstArgs = {};
            expect(spy).toHaveBeenCalled();

            firstArgs = spy.getCall(0).args[0];
            expect(firstArgs.key).toBeDefined().toEqual(jasmine.any(String));
            expect(firstArgs.appId).toBeDefined().toEqual(jasmine.any(String));;
        });
    });

    describe('toast.billing.buyProduct', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // toast.billing.buyProduct 1st argument : dummy data
            var productInfoDummy = {
                productId : 'alpahId',
                productName : 'productName',
                currency : 'USD',
                amount : '10.00',
                period : 'week',
                duration : 3,
                userId : 'numericID',
                onExit : function () {},
                showBackButton : yes,
                enablePaymentRecoverFlow : yes,
                titles : {key : "test", value : "test"},
                orderId : 'orderId',
                orderItemPath : 'jpg'
                // appId : 'applicationId',
                // paymentDetails : {},
                // paymentServer : 'FAKE'
            };

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
        it('verify the 1st arguments are all matched to spec', function() {
            var spy = spyOn(toast.billing, buyProduct);
            var firstArgs = {};
            expect(spy).toHaveBeenCalled();

            firstArgs = spy.getCall(0).args[0];
            expect(firstArgs.productId).toBeDefined().toEqual(jasmine.any(String));
            expect(firstArgs.appId).toBeDefined().toEqual(jasmine.any(String));;
        });
    });

    describe('toast.billing.checkPurchaseStatus', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // toast.billing.checkPurchaseStatus 1st argument : dummy data
            var productInfoDummy = {
                productId : 'productId',
                userId : 'userId'
                // pageSize : 10,
                // pageNumber : 10,
                // appId : 'appId',
                // checkValue : 'checkValue',
                // countryCode : 'KR'
            };

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

        // toast.billing.checkPurchaseStatus 1st argument check
        it('verify the 1st arguments are all matched to spec', function() {
            var spy = spyOn(toast.billing, checkPurchaseStatus);
            var firstArgs = {};
            expect(spy).toHaveBeenCalled();

            firstArgs = spy.getCall(0).args[0];
            expect(firstArgs.productId).toBeDefined().toEqual(jasmine.any(String));
            expect(firstArgs.userId).toBeDefined().toEqual(jasmine.any(String));;
        });
    });

    describe('toast.billing.cancelSubscription', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // toast.billing.cancelSubscription 1st argument : dummy data
            var productInfoDummy = {
                productId : 'productId',
                userId : 'userId'
                // appId : 'appId',
                // InvoiceID : 'invoiceID',
                // appId : 'appId',
                // countryCode : 'KR',
                // CustomID : 'customId'
            };

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

        // toast.billing.cancelSubscription 1st argument check
        it('verify the 1st arguments are all matched to spec', function() {
            var spy = spyOn(toast.billing, cancelSubscription);
            var firstArgs = {};
            expect(spy).toHaveBeenCalled();

            firstArgs = spy.getCall(0).args[0];
            expect(firstArgs.productId).toBeDefined().toEqual(jasmine.any(String));
            expect(firstArgs.userId).toBeDefined().toEqual(jasmine.any(String));;
        });
    });
});
