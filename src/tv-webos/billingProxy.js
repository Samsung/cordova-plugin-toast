'use strict';

var countryCode;

module.exports = {
    init: function(success, fail, args) {
        try {
            var scriptPwSdk = document.createElement('script');
            scriptPwSdk.src = 'https://api.paymentwall.com/js/pwsmart/ver/pwsmart.1.4.js';
            document.body.appendChild(scriptPwSdk);

            countryCode = args[0].countryCode;

            /*jshint undef: false */
            window.PWSmartGatewayOnLoadedCallback = function() {
                /*jshint undef: true */

                console.log('load' + JSON.stringify(args[0]));
                /*jshint undef: false */
                PWSmartGateway.init({
                    /*jshint undef: true */
                    key: args[0].key.paymentwallKey,
                    countryCode: args[0].countryCode,
                    containerId: args[0].containerId,
                    lang: args[0].lang,
                    gaWebPropertyId: args[0].gaWebPropertyId
                });
                setTimeout(function() {
                    success();
                }, 0);
            };
        }
        catch (e) {
            var error = new Error(e.message);
            error.code = e.code;
            setTimeout(function(e) {
                fail(e);
            }, 0);
        }
    },
    buyProduct: function(success, fail, args) {
        try {
            /*jshint undef: false */
            PWSmartGateway.showPaymentForm({
                /*jshint undef: true */
                productId: args[0].productId,
                productName: args[0].productName,
                currency: args[0].currency,
                amount: args[0].amount,
                period: args[0].period,
                duration: args[0].duration,
                userId: args[0].userId,
                onExit: args[0].onExit,
                showBackButton: args[0].showBackButton,
                enablePaymentRecoverFlow: args[0].enablePaymentRecoverFlow,
                title: args[0].title
            },
            function() {
                setTimeout(function() {
                    success();
                }, 0);
            },
            function(e) {
                var error = new Error(e.message);
                error.code = e.code;
                setTimeout(function() {
                    fail(error);
                }, 0);
            });
        }
        catch (e) {
            var error = new Error(e.message);
            error.code = e.code;
            setTimeout(function() {
                fail(e);
            }, 0);
        }
    },
    cancelSubscription: function(success, fail, args) {
        try {
            console.log('cancel function' + JSON.stringify(args[0]));
            /*jshint undef: false */
            PWSmartGateway.showCancelSubscriptionForm({
                /*jshint undef: true */
                productId: args[0].productId,
                userId: args[0].userId
            },
            function(res) {
                console.log('success!!' + JSON.stringify(res));
                setTimeout(function() {
                    success();
                }, 0);
            },
            function(e) {
                var error = new Error(e.message);
                error.code = e.code;
                setTimeout(function() {
                    fail(error);
                }, 0);
            });
        }
        catch (e) {
            var error = new Error(e.message);
            error.code = e.code;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },
    checkPurchaseStatus: function(success, fail, args) {
        try {
            console.log('checkPurchaseStatus' + JSON.stringify(args[0]));
            var productId = args[0].productId;

            var responseList = [];
            var responseListLen = 0;

            /*jshint undef: false */
            PWSmartGateway.checkPaymentStatus({
                /*jshint undef: true */
                productId: productId,
                userId: args[0].userId
            },
            function(res) {
                console.log('success' + JSON.stringify(res));
                var resJson = JSON.stringify(res);
                var resPurchasesList = JSON.parse(resJson);

                for (var key in resPurchasesList) {
                    if(resPurchasesList.hasOwnProperty(key)) {
                        var obj = resPurchasesList[key];
                        responseList[responseListLen] = {};
                        /*jshint camelcase: false */
                        /*jscs:disable requireCamelCaseOrUpperCaseIdentifiers*/
                        responseList[responseListLen].invoiceId = obj.id;
                        responseList[responseListLen].productId = productId;
                        responseList[responseListLen].amount = obj.amount;
                        responseList[responseListLen].currency = obj.currency;
                        responseList[responseListLen].cancelStatus = obj.refunded;
                        responseList[responseListLen].appliedTime = obj.created;
                        responseList[responseListLen].risk = obj.risk;
                        responseList[responseListLen].uid = obj.uid;
                        responseList[responseListLen].paymentSystem = obj.payment_system;

                        responseList[responseListLen].subscriptionInfo = {};
                        responseList[responseListLen].subscriptionInfo.subscriptionId = obj.subscription.id;
                        responseList[responseListLen].subscriptionInfo.period = obj.subscription.perioid;
                        responseList[responseListLen].subscriptionInfo.periodDuration = obj.subscription.period_duration;
                        responseList[responseListLen].subscriptionInfo.paymentsLimit = obj.subscription.payments_limit;
                        responseList[responseListLen].subscriptionInfo.isTrial = obj.subscription.is_trial;
                        responseList[responseListLen].subscriptionInfo.started = obj.subscription.started;
                        responseList[responseListLen].subscriptionInfo.expired = obj.subscription.expired;
                        responseList[responseListLen].subscriptionInfo.active = obj.subscription.active;
                        responseList[responseListLen].subscriptionInfo.dateStarted = obj.subscription.date_started;
                        responseList[responseListLen].subscriptionInfo.dateNext = obj.subscription.date_next;
                        /*jshint camelcase: true */
                        /*jscs:enable requireCamelCaseOrUpperCaseIdentifiers*/
                    }
                }
                setTimeout(function() {
                    success(responseList);
                }, 0);
            },
            function(e) {
                console.log('error' + JSON.stringify(e));
                var error = new Error(e.message);
                error.code = e.code;
                setTimeout(function() {
                    fail(error);
                }, 0);
            });
        }
        catch (e) {
            console.log('error catch' + JSON.stringify(e));
            var error = new Error(e.message);
            error.code = e.code;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('toast.billing', module.exports);
