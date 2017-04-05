/* globals testsuite */
(function() {
    // toast.billing.init 1st argument : dummy data
    var billingInfoDummy = {
        key: {
            paymentwallKey: 'dc50d495932a7009b3f193916aab5005', //'t_0f6a922e0d3af023124ae0dc2374b6',
            checkoutKey: 'rCvi9+aOAYxlzBZgTlGe/ajDHWo6GF4W+JiHWn8Uuzc=' //'o8KzSGh22UN6CZzQ6qQTiGJiWqgXFwVeNmhr0uzo7jo=',yours
        },
        countryCode: 'US',
        containerId: 'billing_form',
        lang: 'en',
        gaWebPropertyId: 'googleAccount', //googleAccount
        appId: '3201508004443', //yours 3201611011047
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

    // subscription product info 1st argument : dummy data
    var subscriptionInfoDummy = {
        productId: 'DP111000002597',//'DP111000002594',
        productName: 'rozanne_subscription_01',//rozanne_product_01',
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
    }, 'non-subscription');
    testsuite('toast.billing', 'requestProductsList()', function(report) {
        toast.billing.requestProductsList(requestProductInfoDummy, function(data) {
            report('Success : ' + JSON.stringify(data));
        }, function(err) {
            report('Error : ' + JSON.stringify(err));
        });
    }, 'non-subscription');
    testsuite('toast.billing', 'verifyPurchase()', function(report) {
        toast.billing.requestPurchasesList(requestPurchaseInfoDummy, function(data) {
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
    }, 'non-subscription');
    testsuite('toast.billing', 'applyProduct()', function(report) {
        toast.billing.requestPurchasesList(requestPurchaseInfoDummy, function(data) {
            var invoiceDetails = data.InvoiceDetails;
            applyProductDummy.invoiceId = invoiceDetails[0].InvoiceID;
            toast.billing.applyProduct(applyProductDummy, function(data) {
                report('Success : ' + JSON.stringify(data));
            }, function(err) {
                report('Error : ' + JSON.stringify(err));
            });
        }, function(err) {
            console.log('requestPurchasesList Error : ' + JSON.stringify(err));
        });
    }, 'non-subscription');
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
            report('Error : ' + JSON.stringify(err));
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
            report('Error : ' + JSON.stringify(err));
        });
    }, 'subscription');
})();
