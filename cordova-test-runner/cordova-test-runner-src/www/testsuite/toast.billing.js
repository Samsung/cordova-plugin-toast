/* globals testsuite */
(function() {
    // toast.billing.init 1st argument : dummy data
    var billingInfoDummy = {
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

    // non-subscription product info 1st argument : dummy data
    var nonSubscriptionInfoDummy = {
        productId : 'DP111000002594',//'DP111000002594',
        productName : 'rozanne_product_01',//rozanne_product_01',
        currency : 'USD',
        amount : 0.79,
        period : '',
        duration : 3,
        userId : 'orderId',
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

    // subscription product info 1st argument : dummy data
    var subscriptionInfoDummy = {
        productId : 'DP111000002597',//'DP111000002594',
        productName : 'rozanne_subscription_01',//rozanne_product_01',
        currency : 'USD',
        amount : 0.79,
        period : '',
        duration : 3,
        userId : 'orderId',
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

    // non-subscription
    testsuite('toast.billing', 'init()', function(report) {
        toast.billing.init(billingInfoDummy, function() {
            report('Success');
        }, function(err) {
            report('Error : ' + JSON.stringify(err));
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
