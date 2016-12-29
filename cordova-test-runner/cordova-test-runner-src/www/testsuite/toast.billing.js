/* globals testsuite */
(function() {
    testsuite('toast.billing', 'init()', function(report) {
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

        toast.billing.init(billingInfoDummy, function() {
            report('Success');
        }, function(err) {
            report('Error : ' + err.message);
        });
    });
    testsuite('toast.billing', 'buyProduct()', function(report) {
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

        toast.billing.buyProduct(productInfoDummy, function() {
            report('Success');
        }, function(err) {
            report('Error : ' + err.message);
        });
    });
    testsuite('toast.billing', 'checkPurchaseStatus()', function(report) {
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

        toast.billing.checkPurchaseStatus(productInfoDummy, function() {
            report('Success');
        }, function(err) {
            report('Error : ' + err.message);
        });
    });
    testsuite('toast.billing', 'cancelSubscription()', function(report) {
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

        toast.billing.cancelSubscription(productInfoDummy, function() {
            report('Success');
        }, function(err) {
            report('Error : ' + err.message);
        });
    });
})();
