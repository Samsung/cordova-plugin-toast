'use strict';

var securityKey;
var uid;
var countryCode;
var appId;
var curServerType;
var serverDpiUrlList = {
    'FAKE': 'https://sbox-dpiapi.samsungcloudsolution.com/openapi',
    'DEV': 'https://sbox-dpiapi.samsungcloudsolution.com/openapi',
    'PRD': 'https://dpiapi.samsungcloudsolution.com/openapi'
};

function checkSsoLogin() {
    if (webapis.sso.getLoginStatus() != webapis.sso.SsoLoginState.SSO_LOGIN) {
        webapis.sso.showAccountView('CheckoutTest', function() {
            uid = webapis.sso.getLoginUid();
        }, function(e) {
            throw new Error('SSO login fail');
        });
    }
    else {
        uid = webapis.sso.getLoginUid();
    }
}

module.exports = {
    init: function(success, fail, args) {
        console.log('init');
        try {
            var scriptJquery = document.createElement('script');
            scriptJquery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js';
            scriptJquery.onload = function() {
                var dataDetailObj = {};
                dataDetailObj.AppID = args[0].appId;
                dataDetailObj.CountryCode = webapis.productinfo.getSystemConfig(webapis.productinfo.ProductInfoConfigKey.CONFIG_KEY_SERVICE_COUNTRY);
                dataDetailObj.PageSize = '1';
                dataDetailObj.PageNumber = '1';

                /* jshint undef: false*/
                var hash = CryptoJS.HmacSHA256(dataDetailObj.AppID + dataDetailObj.CountryCode, args[0].key.checkoutKey);
                var checkValue = CryptoJS.enc.Base64.stringify(hash);
                /* jshint undef: true*/

                dataDetailObj.CheckValue = checkValue;
                var dataDetailJson = JSON.stringify(dataDetailObj);

                curServerType = args[0].serverType;
                if (curServerType == 'PRD') {
                    var tvServer = webapis.productinfo.getSmartTVServerType();
                    if (tvServer == 1) { // TV environment is on dev.
                        curServerType = 'DEV';
                    }
                }

                console.log('param' + dataDetailJson);

                /* jshint undef: false*/
                $.ajax({
                    /* jshint undef: true*/
                    url: serverDpiUrlList[curServerType] + '/cont/list',
                    type: 'POST',
                    dataType: 'JSON',
                    data: dataDetailJson,
                    timeout: 10000,
                    success: function(res) {
                        console.log('success1' + JSON.stringify(res));
                        if (res.CPStatus == '100000') {
                            securityKey = args[0].key.checkoutKey;
                            appId = args[0].appId;
                            curServerType = args[0].serverType;
                            countryCode = webapis.productinfo.getSystemConfig(webapis.productinfo.ProductInfoConfigKey.CONFIG_KEY_SERVICE_COUNTRY);
                            if (curServerType == 'PRD') {
                                var tvServer = webapis.productinfo.getSmartTVServerType();
                                if (tvServer == 1) { // TV environment is on dev.
                                    curServerType = 'DEV';
                                }
                            }
                            setTimeout(function() {
                                success();
                            }, 0);
                        }
                        else {
                            setTimeout(function() {
                                var error = new Error('Invalid Parameter');
                                fail(error);
                            }, 0);
                        }
                    },
                    error: function(jqXHR, ajaxOptions, thrownError, request, error) {
                        setTimeout(function() {
                            var error = new Error(jqXHR.responseText);
                            fail(error);
                        }, 0);
                    },
                    complete: function() {},
                    failure: function() {
                        setTimeout(function() {
                            var error = new Error('Invalid Parameter');
                            fail(error);
                        }, 0);
                    }
                });
            };
            document.body.appendChild(scriptJquery);
        }
        catch (e) {
            var error = new Error(e.message);
            error.code = e.code;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },
    buyProduct: function(success, fail, args) {
        console.log('buyProduct');
        try {
            if (!securityKey) {
                var initError = new Error('init() isn\'t called');
                setTimeout(function() {
                    fail(initError);
                }, 0);
            }

            checkSsoLogin();

            var dataDetailObj = {};
            dataDetailObj.AppID = appId;
            dataDetailObj.CountryCode = countryCode;

            /* jshint undef: false*/
            var hash = CryptoJS.HmacSHA256(appId + countryCode, securityKey);
            var strCheckValue = CryptoJS.enc.Base64.stringify(hash);
            /* jshint undef: true*/

            dataDetailObj.CheckValue = strCheckValue;

            var dataDetailJson = JSON.stringify(dataDetailObj);

            if (dataDetailJson === '') {
                var jsonError = new Error('Fail to get data param ');
                setTimeout(function() {
                    fail(jsonError);
                }, 0);
            }

            /* jshint undef: false*/
            $.ajax({
                /* jshint undef: true*/
                url: serverDpiUrlList[curServerType] + '/cont/list',
                type: 'POST',
                dataType: 'JSON',
                data: dataDetailJson,
                timeout: 10000,
                success: function(res) {
                    console.log('success' + JSON.stringify(res));
                    if (res.CPStatus == '100000') {
                        var resJson = JSON.stringify(res);
                        var resProductsList = JSON.parse(resJson);

                        for (var key in resProductsList.ItemDetails) {
                            if (resProductsList.ItemDetails.hasOwnProperty(key)) {
                                var obj = resProductsList.ItemDetails[key];
                                if (obj.ItemID == args[0].productId) {
                                    var detailObj = {};
                                    detailObj.OrderItemID = args[0].productId;
                                    detailObj.OrderTitle = args[0].productName || obj.ItemTitle;
                                    detailObj.OrderCurrencyID = args[0].currency || obj.CurrencyID;
                                    detailObj.OrderTotal = args[0].amount || obj.Price;
                                    detailObj.OrderID = args[0].orderId;
                                    detailObj.OrderItemPath = args[0].orderItemPath;
                                    detailObj.OrderCustomID = uid;

                                    var detailJson = JSON.stringify(detailObj);

                                    /* jshint loopfunc:true */
                                    webapis.billing.buyItem(appId, curServerType, detailJson, function(result) {
                                        // result : SUCCESS FAILED CANCEL
                                        if (result.payResult == 'SUCCESS') {
                                            setTimeout(function() {
                                                success();
                                            }, 0);
                                        }
                                        else {
                                            var FailError = new Error();
                                            if(result.payResult == 'CANCEL') {
                                                FailError.message = 'User cancelled payment process';
                                            }
                                            else {
                                                FailError.message = 'Fail payment';
                                            }
                                            setTimeout(function() {
                                                fail(FailError);
                                            }, 0);
                                        }
                                    }, function(e) {
                                        setTimeout(function() {
                                            var buyItemError = new Error(e.message);
                                            buyItemError.code = e.code;
                                            fail(buyItemError);
                                        }, 0);
                                    });
                                    /* jshint loopfunc:false */
                                }
                            }
                        }
                    }
                    else {
                        var cPStatusError = new Error(res.CPResult);
                        setTimeout(function() {
                            fail(cPStatusError);
                        }, 0);
                    }
                },
                error: function(jqXHR, ajaxOptions, thrownError, request, error) {
                    console.log('[Error] thrownError:' + thrownError + ';error:' + error + ';[Message]:' + jqXHR.responseText);
                    var getListerror = new Error(jqXHR.responseText);
                    setTimeout(function() {
                        fail(getListerror);
                    }, 0);
                },
                complete: function() {},
                failure: function() {
                    var getListFailureError = new Error('Failure');
                    setTimeout(function() {
                        fail(getListFailureError);
                    }, 0);
                }
            });
        }
        catch (e) {
            var buyProductError = new Error(e.message);
            buyProductError.code = e.code;
            setTimeout(function() {
                fail(buyProductError);
            }, 0);
        }
    },
    cancelSubscription: function(success, fail, args) {
        try {
            if (!securityKey) {
                var initError = new Error('init isn\'t called');
                setTimeout(function() {
                    fail(initError);
                }, 0);
            }

            checkSsoLogin();

            var dataDetailObj = {};
            dataDetailObj.AppID = appId;
            dataDetailObj.CustomID = uid;
            dataDetailObj.CountryCode = countryCode;
            dataDetailObj.ItemType = '2';
            dataDetailObj.PageNumber = '1';

            /* jshint undef: false*/
            var hash = CryptoJS.HmacSHA256(appId + uid + countryCode + dataDetailObj.ItemType + dataDetailObj.PageNumber, securityKey);
            var checkValue = CryptoJS.enc.Base64.stringify(hash);
            /* jshint undef: true*/

            dataDetailObj.CheckValue = checkValue;

            var dataDetailJson = JSON.stringify(dataDetailObj);

            if (dataDetailJson === '') {
                var jsonError = new Error('Fail to get data param');
                setTimeout(function() {
                    fail(jsonError);
                }, 0);
            }

            /* jshint undef: false*/
            $.ajax({
                /* jshint undef: true*/
                url: serverDpiUrlList[curServerType] + '/invoice/list',
                type: 'POST',
                dataType: 'JSON',
                data: dataDetailJson,
                timeout: 10000,
                success: function(res) {
                    console.log('success' + JSON.stringify(res));
                    if (res.CPStatus == '100000') {
                        var resJson = JSON.stringify(res);
                        var resPurchasesList = JSON.parse(resJson);

                        for (var key in resPurchasesList.InvoiceDetails) {
                            if (resPurchasesList.InvoiceDetails.hasOwnProperty(key)) {
                                var obj = resPurchasesList.InvoiceDetails[key];
                                if (obj.subscriptionInfo && obj.ItemID == args[0].productId && obj.CancelStatus === false) {
                                    var cancelDataDetailObj = {};
                                    cancelDataDetailObj.InvoiceID = obj.InvoiceID;
                                    cancelDataDetailObj.AppID = appId;
                                    cancelDataDetailObj.CustomID = uid;
                                    cancelDataDetailObj.CountryCode = countryCode;

                                    var cancelDataDetailJson = JSON.stringify(cancelDataDetailObj);
                                    console.log('productID check' + cancelDataDetailJson);

                                    /* jshint loopfunc:true */
                                    /* jshint undef: false*/
                                    $.ajax({
                                        /* jshint undef: true*/
                                        url: serverDpiUrlList[curServerType] + '/subscription/cancel',
                                        type: 'POST',
                                        dataType: 'JSON',
                                        data: cancelDataDetailJson,
                                        timeout: 10000,
                                        success: function(resCancel) {
                                            console.log('success' + JSON.stringify(resCancel));
                                            if (resCancel.CPStatus == '100000') {
                                                var cancelResJson = JSON.stringify(resCancel);
                                                var resCanceledProduct = JSON.parse(cancelResJson);
                                                console.log('csncel success' + cancelResJson);

                                                var responseObj = {};
                                                responseObj.cPStatus = resCanceledProduct.CPStatus;
                                                responseObj.cPResult = resCanceledProduct.CPResult;
                                                responseObj.invoiceID = resCanceledProduct.InvoiceID;
                                                responseObj.subscancelTime = resCanceledProduct.SubsCancelTime;
                                                responseObj.subsStatus = resCanceledProduct.SubsStatus;

                                                setTimeout(function() {
                                                    success(responseObj);
                                                }, 0);
                                            }
                                            else {
                                                var cPStatusError = new Error(resCancel.CPResult);
                                                setTimeout(function() {
                                                    fail(cPStatusError);
                                                }, 0);
                                            }
                                        },
                                        error: function(jqXHR, ajaxOptions, thrownError, request, error) {
                                            var cancleError = new Error(jqXHR.responseTex);
                                            setTimeout(function() {
                                                fail(cancleError);
                                            }, 0);
                                        },
                                        complete: function() {},
                                        failure: function() {
                                            var cancelFailureError = new Error('Failure');
                                            setTimeout(function() {
                                                fail(cancelFailureError);
                                            }, 0);
                                        }
                                    });
                                    /* jshint loopfunc:false */
                                }
                            }
                        }
                        var notFoundError = new Error('Not found product');
                        setTimeout(function() {
                            fail(notFoundError);
                        }, 0);
                    }
                    else {
                        var cPStatusError = new Error(res.CPResult);
                        setTimeout(function() {
                            fail(cPStatusError);
                        }, 0);
                    }
                },
                error: function(jqXHR, ajaxOptions, thrownError, request, error) {
                    var getInvoiceListError = new Error(jqXHR.responseTex);
                    setTimeout(function() {
                        fail(getInvoiceListError);
                    }, 0);
                },
                complete: function() {},
                failure: function() {
                    var getInvoiceListFailureError = new Error('failure');
                    setTimeout(function() {
                        fail(getInvoiceListFailureError);
                    }, 0);
                }
            });

        }
        catch (e) {
            var cancelSubscriptionError = new Error(e.message);
            setTimeout(function() {
                fail(cancelSubscriptionError);
            }, 0);
        }
    },
    checkPurchaseStatus: function(success, fail, args) {
        console.log('checkPurchaseStatus');
        try {
            if (!securityKey) {
                var initError = new Error('init isn\'t called');
                setTimeout(function() {
                    fail(initError);
                }, 0);
            }

            checkSsoLogin();

            var responseList = [];
            var responseListLen = 0;

            var dataDetailObj = {};
            dataDetailObj.AppID = appId;
            dataDetailObj.CustomID = uid;
            dataDetailObj.CountryCode = countryCode;
            dataDetailObj.ItemType = '2'; // all
            dataDetailObj.PageNumber = '1';

            /* jshint undef: false*/
            var hash = CryptoJS.HmacSHA256(appId + uid + countryCode + dataDetailObj.ItemType + dataDetailObj.PageNumber, securityKey);
            var checkValue = CryptoJS.enc.Base64.stringify(hash);
            /* jshint undef: true*/

            dataDetailObj.CheckValue = checkValue;

            var dataDetailJson = JSON.stringify(dataDetailObj);

            if (dataDetailJson == 'Fail to get data param') {
                var jsonError = new Error('');
                setTimeout(function() {
                    fail(jsonError);
                }, 0);
            }

            /* jshint undef: false*/
            $.ajax({
                /* jshint undef: true*/
                url: serverDpiUrlList[curServerType] + '/invoice/list',
                type: 'POST',
                dataType: 'JSON',
                data: dataDetailJson,
                timeout: 10000,
                success: function(res) {
                    console.log('success' + JSON.stringify(res));
                    if (res.CPStatus == '100000') {
                        var resJson = JSON.stringify(res);
                        var resPurchasesList = JSON.parse(resJson);

                        for (var key in resPurchasesList.InvoiceDetails) {
                            if (resPurchasesList.InvoiceDetails.hasOwnProperty(key)) {
                                var obj = resPurchasesList.InvoiceDetails[key];
                                if (obj.ItemID == args[0].productId) {
                                    responseList[responseListLen] = {};
                                    responseList[responseListLen].invoiceId = obj.InvoiceID;
                                    responseList[responseListLen].productId = obj.ItemID;
                                    responseList[responseListLen].productName = obj.ItemTitle;
                                    responseList[responseListLen].itemType = obj.ItemType;
                                    responseList[responseListLen].orderTime = obj.OrderTime;
                                    responseList[responseListLen].amount = obj.Price;
                                    responseList[responseListLen].currency = obj.OrderCurrencyID;
                                    responseList[responseListLen].cancelStatus = obj.CancelStatus;
                                    responseList[responseListLen].appliedStatus = obj.AppliedStatus;

                                    // optional 항목
                                    if(obj.hasOwnProperty('Period')) {
                                        responseList[responseListLen].period = obj.Period;
                                    }
                                    if(obj.hasOwnProperty('AppliedTime')) {
                                        responseList[responseListLen].appliedTime = obj.AppliedTime;
                                    }
                                    if(obj.hasOwnProperty('LimitEndTime')) {
                                        responseList[responseListLen].limitEndTime = obj.LimitEndTime;
                                    }
                                    if(obj.hasOwnProperty('RemainTime')) {
                                        responseList[responseListLen].remainTime = obj.RemainTime;
                                    }

                                    if (obj.ItemType == 4) {
                                        responseList[responseListLen].subscriptionInfo = {};
                                        responseList[responseListLen].subscriptionInfo.subscriptionId = obj.SubscriptionInfo.subscriptionId;
                                        responseList[responseListLen].subscriptionInfo.subsStartTime = obj.SubscriptionInfo.SubsStartTime;
                                        responseList[responseListLen].subscriptionInfo.subsEndTime = obj.SubscriptionInfo.SubsEndTime;
                                        responseList[responseListLen].subscriptionInfo.subsStatus = obj.SubscriptionInfo.SubsStatus;
                                    }
                                    responseListLen++;
                                }
                            }
                        }
                        setTimeout(function() {
                            success(responseList);
                        }, 0);
                    }
                    else {
                        var cPStatusError = new Error(res.CPStatus);
                        setTimeout(function() {
                            fail(cPStatusError);
                        }, 0);
                    }
                },
                error: function(jqXHR, ajaxOptions, thrownError, request, error) {
                    var getInvocieListError = new Error(jqXHR.responseText);
                    setTimeout(function() {
                        fail(getInvocieListError);
                    }, 0);
                },
                complete: function() {},
                failure: function() {
                    var getInvoiceListFailureError = new Error('failure');
                    setTimeout(function() {
                        fail(getInvoiceListFailureError);
                    }, 0);
                }
            });
        }
        catch (e) {
            var checkPurchaseStatusError = new Error(e.message);
            setTimeout(function() {
                fail(checkPurchaseStatusError);
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('toast.billing', module.exports);
