/* globals testsuite */
(function() {
    // toast.billing.init 1st argument : dummy data
    var billingInfoDummy = {
        key: {
            paymentwallKey: 't_36ee924e678a7a985ba50088afb3fd',
            checkoutKey: 'rCvi9+aOAYxlzBZgTlGe/ajDHWo6GF4W+JiHWn8Uuzc='
        },
        countryCode: 'US',
        containerId: 'billing_form',
        lang: 'en',
        gaWebPropertyId: 'googleAccount',
        appId: '3201508004443',
        serverType: 'DUMMY'
    };

    var requestPurchaseInfoDummy = {
        itemType: '2',
        pageNumber: 1
    };

    var requestProductInfoDummy = {
        pageSize: 1,
        pageNumber: 1
    };

    var verifyPurchaseDummy = {
        invoiceId: 'DMY1701US000108283'
    };

    var applyProductDummy = {
        invoiceId: 'DMY1701US000108283'
    };

    // non-subscription product info 1st argument : dummy data
    var nonSubscriptionInfoDummy = {
        productId: 'DP111000002594',
        productName: 'rozanne_product_01',
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

    // subscription product info 1st argument : dummy data
    var subscriptionInfoDummy = {
        productId: 'DP111000002757',
        productName: 'rozanne_subscription_01',
        currency: 'USD',
        amount: 0.79,
        period: 'month',
        duration: 1,
        userId: 'orderId',
        onExit: function () {},
        showBackButton: false,
        enablePaymentRecoverFlow: false,
        titles: {'buyHeading': 'Subscribe to #product', 'buyHeadingRecurring': '#price per #period'},
        orderId: 'orderId',
        orderItemPath: 'jpg'
    };

    var error = {
        NOT_EXIST_INVOICEDETAILS : 'InvoiceDetails property is not exist.',
        NOT_EXIST_INVOICEID : 'invoiceId property is not exist.',
    }

    // non-subscription
    testsuite('toast.billing', 'init()', function(report) {
        toast.billing.init(billingInfoDummy, function() {
            report('Success');
        }, function(err) {
            report('Error : ' + JSON.stringify(err));
        });
    }, 'non-subscription');
    testsuite('toast.billing', 'requestPurchasesList()', function(report) {
        toast.billing.requestPurchasesList(requestPurchaseInfoDummy, function(data) {
            report('Success : ' + JSON.stringify(data));
        }, function(err) {
            report('Error : ' + JSON.stringify(err));
        });
    }, 'non-subscription', {'tv-webos': 'INVISIBLE', 'sectv-orsay': 'INVISIBLE'});
    testsuite('toast.billing', 'requestProductsList()', function(report) {
        toast.billing.requestProductsList(requestProductInfoDummy, function(data) {
            report('Success : ' + JSON.stringify(data));
        }, function(err) {
            report('Error : ' + JSON.stringify(err));
        });
    }, 'non-subscription', {'tv-webos': 'INVISIBLE', 'sectv-orsay': 'INVISIBLE'});
    testsuite('toast.billing', 'verifyPurchase()', function(report) {
        toast.billing.requestPurchasesList(requestPurchaseInfoDummy, function(data) {
            // Check InvoiceDetails property is exist or not
            if(data == null || data == undefined || typeof data !== 'object' || !data.hasOwnProperty('InvoiceDetails')) {
                report('Failed : ' + error.NOT_EXIST_INVOICEDETAILS);
                return;
            }

            var invoiceDetails = data.InvoiceDetails;
            verifyPurchaseDummy.invoiceId = invoiceDetails[0].InvoiceID;
            toast.billing.verifyPurchase(verifyPurchaseDummy, function(data) {
                report('Success : ' + JSON.stringify(data));
            }, function(err) {
                report('Error : ' + JSON.stringify(err));
            });
        }, function(err) {
            console.log('requestPurchasesList Error : ' + JSON.stringify(err));
        });
    }, 'non-subscription', {'tv-webos': 'INVISIBLE', 'sectv-orsay': 'INVISIBLE'});
    testsuite('toast.billing', 'applyProduct()', function(report) {
        toast.billing.requestPurchasesList(requestPurchaseInfoDummy, function(data) {
            // Check InvoiceDetails property is exist or not
            if(data == null || data == undefined || typeof data !== 'object' || !data.hasOwnProperty('InvoiceDetails')) {
                report('Failed : ' + error.NOT_EXIST_INVOICEDETAILS);
                return;
            }
            
            var invoiceDetails = data.InvoiceDetails;
            applyProductDummy.invoiceId = invoiceDetails[0].InvoiceID;
            toast.billing.applyProduct(applyProductDummy, function(data) {
                report('Success : ' + JSON.stringify(data));
            }, function(err) {
                if(err.code !== null && err.code !== undefined && typeof err.code === 'number' && err.code === 400303) {
                    // code : 400303, message : Purchase for the requested InvoiceID was already applied
                    report('Success : ' + JSON.stringify(err));
                }
                else {
                    report('Error : ' + JSON.stringify(err));
                }
            });
        }, function(err) {
            console.log('requestPurchasesList Error : ' + JSON.stringify(err));
        });
    }, 'non-subscription', {'tv-webos': 'INVISIBLE', 'sectv-orsay': 'INVISIBLE'});
    testsuite('toast.billing', 'buyProduct()', function(report) {
        var productInfoDummy = nonSubscriptionInfoDummy;
        toast.billing.buyProduct(productInfoDummy, function() {
            report('Success');
        }, function(err) {
            report('Error : ' + JSON.stringify(err));
        });
    }, 'non-subscription');
    testsuite('toast.billing', 'checkPurchaseStatus()', function(report) {
        var productInfoDummy = nonSubscriptionInfoDummy;
        toast.billing.checkPurchaseStatus(productInfoDummy, function(data) {
            report('Success : ' + JSON.stringify(data));
        }, function(err) {
            report('Error : ' + JSON.stringify(err));
        });
    }, 'non-subscription');

    //subscription
    testsuite('toast.billing', 'buyProduct()', function(report) {
        var productInfoDummy = subscriptionInfoDummy;
        toast.billing.buyProduct(productInfoDummy, function() {
            report('Success');
        }, function(err) {
            if(err.code !== null && err.code !== undefined && typeof err.code === 'number' && err.code === 100002) {
                // code : 100002, message : User cancelled payment process
                report('Success : ' + JSON.stringify(err));
            }
            else {
                report('Error : ' + JSON.stringify(err));
            }
        });
    }, 'subscription');
    testsuite('toast.billing', 'checkPurchaseStatus()', function(report) {
        var productInfoDummy = subscriptionInfoDummy;
        toast.billing.checkPurchaseStatus(productInfoDummy, function(data) {
            report('Success : ' + JSON.stringify(data));
        }, function(err) {
            report('Error : ' + JSON.stringify(err));
        });
    }, 'subscription');
    testsuite('toast.billing', 'cancelSubscription()', function(report) {
        var productInfoDummy = subscriptionInfoDummy;
        toast.billing.cancelSubscription(productInfoDummy, function(data) {
            report('Success : ' + JSON.stringify(data));
        }, function(err) {
            if(err.code !== null && err.code !== undefined && typeof err.code === 'number' && err.code === 100001) {
                // code : 100001, message : Not found product
                report('Success : ' + JSON.stringify(err));
            }
            else if(err.code !== null && err.code !== undefined && typeof err.code === 'number' && err.code === 410410) {
                // code : 410410, message : Requested InvoicedID is canceled already
                report('Success : ' + JSON.stringify(err));
            }
            else {
                report('Error : ' + JSON.stringify(err));
            }
        });
    }, 'subscription');
    testsuite('toast.billing', 'cancelSubscription()', function(report) {
        toast.billing.checkPurchaseStatus(subscriptionInfoDummy, function(data) {
            // Check invoiceId property is exist or not
            if(data == null || data == undefined || typeof data[0] !== 'object' || !data[0].hasOwnProperty('invoiceId')) {
                report('Failed : ' + error.NOT_EXIST_INVOICEID);
                return;
            }

            var productInfoDummy = subscriptionInfoDummy;
            productInfoDummy.invoiceId = data[0].invoiceId;

            toast.billing.cancelSubscription(productInfoDummy, function(data) {
                report('Success : ' + JSON.stringify(data));
            }, function(err) {
                if(err.code !== null && err.code !== undefined && typeof err.code === 'number' && err.code === 100001) {
                    // code : 100001, message : Not found product
                    report('Success : ' + JSON.stringify(err));
                }
                else if(err.code !== null && err.code !== undefined && typeof err.code === 'number' && err.code === 410410) {
                    // code : 410410, message : Requested InvoicedID is canceled already
                    report('Success : ' + JSON.stringify(err));
                }
                else {
                    report('Error : ' + JSON.stringify(err));
                }
            });
        }, function(err) {
            console.log('requestPurchasesList Error : ' + JSON.stringify(err));
        });
    }, 'subscription(invoiceId)', {'tv-webos': 'INVISIBLE', 'sectv-orsay': 'INVISIBLE'});
})();
