/* globals testsuite */
(function() {
    // non-subscription
    testsuite('toast.billing', 'init()', function(report) {
        // toast.billing.init 1st argument : dummy data
        var billingInfoDummy = {
            key : 'rCvi9+aOAYxlzBZgTlGe/ajDHWo6GF4W+JiHWn8Uuzc=', //'o8KzSGh22UN6CZzQ6qQTiGJiWqgXFwVeNmhr0uzo7jo=',yours
            countryCode : 'US',
            containerId : 'containerid',
            lang : 'EN',
            gaWebPropertyId : 'poSample', //googleAccount
            appId : '3201508004443', //yours 3201611011047
            serverType : 'FAKE'
            // brand : 'samsung'
        };

        toast.billing.init(billingInfoDummy, function() {
            report('Success');
        }, function(err) {
            report('Error : ' + err.message);
        });
    }, 'non-subscription');
    testsuite('toast.billing', 'buyProduct()', function(report) {
        // toast.billing.buyProduct 1st argument : dummy data
        var productInfoDummy = {
            productId : 'DP111000002594',//'DP111000002594',
            productName : 'rozanne_product_01',//rozanne_product_01',
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

        toast.billing.buyProduct(productInfoDummy, function() {
            report('Success');
        }, function(err) {
            report('Error : ' + err.message);
        });
    }, 'non-subscription');
    testsuite('toast.billing', 'checkPurchaseStatus()', function(report) {
        // toast.billing.checkPurchaseStatus 1st argument : dummy data
        var productInfoDummy = {
            productId : 'DP111000002594',
            userId : 'orderId'
            // pageSize : 10,
            // pageNumber : 10,
            // appId : 'appId',
            // checkValue : 'checkValue',
            // countryCode : 'KR'
        };

        toast.billing.checkPurchaseStatus(productInfoDummy, function(data) {
            report('Success : ' + JSON.stringify(data));
        }, function(err) {
            report('Error : ' + err.message);
        });
    }, 'non-subscription');
    testsuite('toast.billing', 'cancelSubscription()', function(report) {
        // toast.billing.cancelSubscription 1st argument : dummy data
        var productInfoDummy = {
            productId : 'DP111000002594',
            userId : 'orderId'
            // appId : 'appId',
            // appId : 'appId',
            // countryCode : 'KR',
            // CustomID : 'customId'
        };

        toast.billing.cancelSubscription(productInfoDummy, function(data) {
            report('Success : ' + JSON.stringify(data));
        }, function(err) {
            report('Error : ' + err.message);
        });
    }, 'non-subscription');

    //subscription
    testsuite('toast.billing', 'init()', function(report) {
        // toast.billing.init 1st argument : dummy data
        var billingInfoDummy = {
            key : 'rCvi9+aOAYxlzBZgTlGe/ajDHWo6GF4W+JiHWn8Uuzc=', //'o8KzSGh22UN6CZzQ6qQTiGJiWqgXFwVeNmhr0uzo7jo=',yours
            countryCode : 'US',
            containerId : 'containerid',
            lang : 'EN',
            gaWebPropertyId : 'poSample', //googleAccount
            appId : '3201508004443', //yours 3201611011047
            serverType : 'FAKE'
            // brand : 'samsung'
        };

        toast.billing.init(billingInfoDummy, function() {
            report('Success');
        }, function(err) {
            report('Error : ' + err.message);
        });
    }, 'subscription');
    testsuite('toast.billing', 'buyProduct()', function(report) {
        // toast.billing.buyProduct 1st argument : dummy data
        var productInfoDummy = {
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

        toast.billing.buyProduct(productInfoDummy, function() {
            report('Success');
        }, function(err) {
            report('Error : ' + err.message);
        });
    }, 'subscription');
    testsuite('toast.billing', 'checkPurchaseStatus()', function(report) {
        // toast.billing.checkPurchaseStatus 1st argument : dummy data
        var productInfoDummy = {
            productId : 'DP111000002597',
            userId : 'orderId'
            // pageSize : 10,
            // pageNumber : 10,
            // appId : 'appId',
            // checkValue : 'checkValue',
            // countryCode : 'KR'
        };

        toast.billing.checkPurchaseStatus(productInfoDummy, function(data) {
            report('Success : ' + JSON.stringify(data));
        }, function(err) {
            report('Error : ' + err.message);
        });
    }, 'subscription');
    testsuite('toast.billing', 'cancelSubscription()', function(report) {
        // toast.billing.cancelSubscription 1st argument : dummy data
        var productInfoDummy = {
            productId : 'DP111000002597',
            userId : 'orderId'
            // appId : 'appId',
            // appId : 'appId',
            // countryCode : 'KR',
            // CustomID : 'customId'
        };

        toast.billing.cancelSubscription(productInfoDummy, function(data) {
            report('Success : ' + JSON.stringify(data));
        }, function(err) {
            report('Error : ' + err.message);
        });
    }, 'subscription');
})();
