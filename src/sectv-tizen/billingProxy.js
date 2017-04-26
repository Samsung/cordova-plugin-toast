'use strict';

var securityKey;
var uid;
var countryCode;
var appId;
var curServerType;
var serverDpiUrlList = {
    'DUMMY': 'https://sbox-dpiapi.samsungcloudsolution.com/openapi',
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
        try {
            curServerType = args[0].serverType;
            if (curServerType == 'PRD') {
                var tvServer = webapis.productinfo.getSmartTVServerType();
                if (tvServer == 1) { // TV environment is on dev.
                    curServerType = 'DEV';
                }
            }
            securityKey = args[0].key.checkoutKey;
            appId = args[0].appId;
            curServerType = args[0].serverType;
            countryCode = webapis.productinfo.getSystemConfig(webapis.productinfo.ProductInfoConfigKey.CONFIG_KEY_SERVICE_COUNTRY);

            var bJSInserted = false;
            var count = 0;
            var scriptJquery = document.createElement('script');
            scriptJquery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js';
            scriptJquery.onload = checkLoaded;
            document.body.appendChild(scriptJquery);

            var scriptCryptoSha256 = document.createElement('script');
            scriptCryptoSha256.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/hmac-sha256.js';
            scriptCryptoSha256.onload = checkLoaded;
            document.body.appendChild(scriptCryptoSha256);

            var scriptCryptoBase64 = document.createElement('script');
            scriptCryptoBase64.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/enc-base64.js';
            scriptCryptoBase64.onload = checkLoaded;
            document.body.appendChild(scriptCryptoBase64);

        }
        catch (e) {
            setTimeout(function() {
                fail(e);
            }, 0);
        }
        function checkLoaded() {
            count++;
            if(count >= 3) {
                bJSInserted = true;
                setTimeout(function() {
                    success();
                }, 0);
            }
        }
    },
    buyProduct: function(success, fail, args) {
        console.log('buyProduct');
        try {
            if (!securityKey) {
                setTimeout(function() {
                    var error = new Error('init() isn\'t called');
                    fail(error);
                }, 0);
            }

            checkSsoLogin();

            // For buyItem
            var detailObj = {};
            detailObj.OrderItemID = args[0].productId;
            detailObj.OrderTitle = args[0].productName === undefined ? null : args[0].productName;
            detailObj.OrderCurrencyID = args[0].currency === undefined ? null : args[0].currency;
            detailObj.OrderTotal = args[0].amount === undefined ? null : args[0].amount;
            detailObj.OrderID = args[0].orderId;
            detailObj.OrderItemPath = args[0].orderItemPath;
            detailObj.OrderCustomID = uid;

            if(!detailObj.OrderTitle || !detailObj.OrderCurrencyID || !detailObj.OrderTotal) {
                setProductInformation(function() {
                    requestBuyProduct();
                },function(e) {
                    setTimeout(function() {
                        fail(e);
                    }, 0);
                });
            }
            else {
                requestBuyProduct();
            }
        }
        catch (e) {
            setTimeout(function() {
                var error = new Error(e.message);
                error.code = e.code;
                fail(error);
            }, 0);
        }

        function setProductInformation(onSetProductInfoSuccess, onSetProductInformationError) {
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
                setTimeout(function() {
                    var error = new Error('Fail to get data param ');
                    onSetProductInformationError(error);
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
                    if (res.CPStatus == '100000') {
                        var resJson = JSON.stringify(res);
                        var resProductsList = JSON.parse(resJson);

                        for (var key in resProductsList.ItemDetails) {
                            if (resProductsList.ItemDetails.hasOwnProperty(key)) {
                                var obj = resProductsList.ItemDetails[key];
                                if (obj.ItemID == args[0].productId) {
                                    detailObj.OrderTitle = detailObj.OrderTitle || obj.ItemTitle;
                                    detailObj.OrderCurrencyID = detailObj.OrderCurrencyID || obj.CurrencyID;
                                    detailObj.OrderTotal = detailObj.OrderTotal || obj.Price;
                                    break;
                                }
                            }
                        }
                        setTimeout(function() {
                            onSetProductInfoSuccess();
                        }, 0);
                    }
                    else {
                        setTimeout(function() {
                            var error = new Error(res.CPResult);
                            error.code = Number(res.CPStatus);
                            onSetProductInformationError(error);
                        }, 0);
                    }
                },
                error: function(jqXHR, ajaxOptions, thrownError, request, error) {
                    console.log('[Error] thrownError:' + thrownError + ';error:' + error + ';[Message]:' + jqXHR.responseText);
                    setTimeout(function() {
                        var error = new Error(jqXHR.responseText);
                        onSetProductInformationError(error);
                    }, 0);
                },
                complete: function() {
                    console.log('complete');
                },
                failure: function() {
                    console.log('failure');
                    setTimeout(function() {
                        var error = new Error('Failure');
                        onSetProductInformationError(error);
                    }, 0);
                }
            });
        }

        function requestBuyProduct() {
            var detailJson = JSON.stringify(detailObj);
            webapis.billing.buyItem(appId, curServerType, detailJson, function(result) {
                // result : SUCCESS FAILED CANCEL
                if (result.payResult == 'SUCCESS') {
                    setTimeout(function() {
                        success();
                    }, 0);
                }
                else {
                    var error = new Error();
                    if(result.payResult == 'CANCEL') {
                        error.code = 100002;
                        error.message = 'User cancelled payment process';
                    }
                    else {
                        error.message = 'Fail payment';
                    }
                    setTimeout(function() {
                        fail(error);
                    }, 0);
                }
            }, function(e) {
                setTimeout(function() {
                    var error = new Error(e.message);
                    error.code = e.code;
                    fail(error);
                }, 0);
            });
        }
    },
    cancelSubscription: function(success, fail, args) {
        try {
            if (!securityKey || securityKey === undefined || typeof securityKey != 'string') {
                setTimeout(function() {
                    var error = new Error('init() isn\'t called');
                    fail(error);
                }, 0);
            }

            checkSsoLogin();

            if(args[0].invoiceId) {
                var cancelDataObj = {};
                cancelDataObj.InvoiceID = args[0].invoiceId;
                cancelDataObj.AppID = appId;
                cancelDataObj.CustomID = uid;
                cancelDataObj.CountryCode = countryCode;

                cancel(cancelDataObj);
            }
            else { // invoiceId가 없는경우
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
                    setTimeout(function() {
                        var error = new Error();
                        error.message = 'Fail to get data param';
                        fail(error);
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
                        if (res.CPStatus == '100000') {
                            var resJson = JSON.stringify(res);
                            var resPurchasesList = JSON.parse(resJson);

                            for (var key in resPurchasesList.InvoiceDetails) {
                                if (resPurchasesList.InvoiceDetails.hasOwnProperty(key)) {
                                    var obj = resPurchasesList.InvoiceDetails[key];
                                    if (obj.SubscriptionInfo && obj.ItemID == args[0].productId && obj.CancelStatus === false) {
                                        var cancelDataObj = {};
                                        cancelDataObj.InvoiceID = obj.InvoiceID;
                                        cancelDataObj.AppID = appId;
                                        cancelDataObj.CustomID = uid;
                                        cancelDataObj.CountryCode = countryCode;

                                        cancel(cancelDataObj);
                                    }
                                }
                            }
                            setTimeout(function() {
                                var error = new Error();
                                error.code = 100001;
                                error.message = 'Not found product';
                                fail(error);
                            }, 0);
                        }
                        else {
                            setTimeout(function() {
                                var error = new Error(res.CPResult);
                                error.message = res.CPResult;
                                error.code = Number(res.CPStatus);
                                fail(error);
                            }, 0);
                        }
                    },
                    error: function(jqXHR, ajaxOptions, thrownError, request, error) {
                        setTimeout(function() {
                            var error = new Error(jqXHR.responseTex);
                            fail(error);
                        }, 0);
                    },
                    complete: function() {},
                    failure: function() {
                        setTimeout(function() {
                            var error = new Error('failure');
                            fail(error);
                        }, 0);
                    }
                });
            }
        }
        catch (e) {
            setTimeout(function() {
                fail(e);
            }, 0);
        }

        function cancel(resCanceledProduct) {
            var cancelDataDetailJson = JSON.stringify(resCanceledProduct);

            /* jshint undef: false*/
            $.ajax({
                /* jshint undef: true*/
                url: serverDpiUrlList[curServerType] + '/subscription/cancel',
                type: 'POST',
                dataType: 'JSON',
                data: cancelDataDetailJson,
                timeout: 10000,
                success: function(resCancel) {
                    if (resCancel.CPStatus == '100000') {
                        var cancelResJson = JSON.stringify(resCancel);
                        var resCanceledProduct = JSON.parse(cancelResJson);

                        var responseObj ={};
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
                        setTimeout(function() {
                            var error = new Error();
                            error.message = JSON.stringify(resCancel.CPResult);
                            error.code = Number(resCancel.CPStatus);
                            fail(error);
                        }, 0);
                    }
                },
                error: function(jqXHR, ajaxOptions, thrownError, request, error) {
                    setTimeout(function() {
                        var error = new Error();
                        error.message = jqXHR.responseText;
                        fail(error);
                    }, 0);
                },
                complete: function() {},
                failure: function() {
                    setTimeout(function() {
                        var error = new Error('failure');
                        error.message = 'failure';
                        fail(error);
                    }, 0);
                }
            });
        }
    },
    checkPurchaseStatus: function(success, fail, args) {
        console.log('checkPurchaseStatus');
        try {
            if (!securityKey) {
                setTimeout(function() {
                    var error = new Error('init isn\'t called');
                    fail(error);
                }, 0);
            }

            checkSsoLogin();

            var responseList = [];
            var responseListLen = 0;

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

            if (dataDetailJson == 'Fail to get data param') {
                setTimeout(function() {
                    var error = new Error('Fail to get data param');
                    fail(error);
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

                                    responseList[responseListLen].period = obj.Period;
                                    responseList[responseListLen].appliedTime = obj.AppliedTime;
                                    responseList[responseListLen].limitEndTime = obj.LimitEndTime;
                                    responseList[responseListLen].remainTime = obj.RemainTime;

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
                        if(responseList.length > 0) {
                            setTimeout(function() {
                                success(responseList);
                            }, 0);
                        }
                        else {
                            setTimeout(function() {
                                var error = new Error('Not found product');
                                fail(error);
                            }, 0);
                        }
                    }
                    else {
                        setTimeout(function() {
                            var error = new Error(res.CPResult);
                            error.code = Number(res.CPStatus);
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
                        var error = new Error('failure');
                        fail(error);
                    }, 0);
                }
            });
        }
        catch (e) {
            setTimeout(function() {
                fail(e);
            }, 0);
        }
    },
    requestPurchasesList: function (success, fail, args) {

        if (!securityKey) {
            setTimeout(function() {
                var error = new Error('init() isn\'t called');
                fail(error);
            }, 0);
        }

        checkSsoLogin();

        var resProductsList = {};

        var detailObj = {};
        detailObj.AppID = appId;
        detailObj.CustomID = uid;
        detailObj.CountryCode = countryCode;
        detailObj.ItemType = args[0].itemType;
        detailObj.PageNumber = args[0].pageNumber;

        /* jshint undef: false*/
        var hash = CryptoJS.HmacSHA256(appId + uid + countryCode + detailObj.ItemType + detailObj.PageNumber, securityKey);
        var strCheckValue = CryptoJS.enc.Base64.stringify(hash);
        /* jshint undef: true*/

        detailObj.CheckValue = strCheckValue;
        var paymentDetails = JSON.stringify(detailObj);

        /* jshint undef: false*/
        $.ajax({
            /* jshint undef: true*/
            url: serverDpiUrlList[curServerType] + '/invoice/list',
            type: 'POST',
            dataType: 'JSON',
            data: paymentDetails,
            timeout: 10000,
            success: function(res) {
                if(res.CPStatus == '100000') {
                    var resJson = JSON.stringify(res);
                    resProductsList = JSON.parse(resJson);

                    setTimeout(function() {
                        success(resProductsList);
                    }, 0);
                }
                else {
                    setTimeout(function() {
                        var error = new Error(res.CPResult);
                        error.code = Number(res.CPStatus);
                        fail(error);
                    }, 0);
                }
            },
            error: function(jqXHR, ajaxOptions, thrownError, request, error) {
                console.log('[Error] thrownError:'+thrownError+';error:'+error+';[Message]:'+jqXHR.responseText);
                setTimeout(function() {
                    var error = new Error();
                    fail(error);
                }, 0);
            },
            complete: function() {
                console.log('complete');
            },
            failure: function() {
                console.log('failure');
                setTimeout(function() {
                    var error = new Error();
                    fail(error);
                }, 0);
            }
        });
    },
    requestProductsList: function (success, fail, args) {

        if (!securityKey) {
            var error = new Error('init() isn\'t called');
            setTimeout(function() {
                fail(error);
            }, 0);
        }

        checkSsoLogin();

        var resProductsList = {};

        var detailObj = {};
        detailObj.AppID = appId;
        detailObj.CountryCode = countryCode;
        detailObj.PageSize = args[0].pageSize;
        detailObj.PageNumber = args[0].pageNumber;

        /* jshint undef: false*/
        var hash = CryptoJS.HmacSHA256(appId + countryCode, securityKey);
        var strCheckValue = CryptoJS.enc.Base64.stringify(hash);
        /* jshint undef: true*/

        detailObj.CheckValue = strCheckValue;

        var paymentDetails = JSON.stringify(detailObj);

        /* jshint undef: false*/
        $.ajax({
            /* jshint undef: true*/
            url: serverDpiUrlList[curServerType] + '/cont/list',
            type: 'POST',
            dataType: 'JSON',
            data: paymentDetails,
            timeout: 10000,
            success: function(res) {

                if(res.CPStatus == '100000') {
                    var resJson = JSON.stringify(res);
                    resProductsList = JSON.parse(resJson);

                    setTimeout(function() {
                        success(resProductsList);
                    }, 0);
                }
                else {
                    setTimeout(function() {
                        var error = new Error(res.CPResult);
                        error.code = Number(res.CPStatus);
                        fail(error);
                    }, 0);
                }
            },
            error: function(jqXHR, ajaxOptions, thrownError, request, error) {
                console.log('[Error] thrownError:'+thrownError+';error:'+error+';[Message]:'+jqXHR.responseText);
                setTimeout(function() {
                    var error = new Error();
                    fail(error);
                }, 0);
            },
            complete: function() {
                console.log('complete');
            },
            failure: function() {
                console.log('failure');
                setTimeout(function() {
                    var error = new Error();
                    fail(error);
                }, 0);
            }
        });
    },
    verifyPurchase: function (success, fail, args) {

        if (!securityKey) {
            var error = new Error('init() isn\'t called');
            setTimeout(function() {
                fail(error);
            }, 0);
        }

        checkSsoLogin();

        var detailObj = {};
        detailObj.AppID = appId;
        detailObj.InvoiceID = args[0].invoiceId;
        detailObj.CustomID = uid;
        detailObj.CountryCode = countryCode;

        var paymentDetails = JSON.stringify(detailObj);

        /* jshint undef: false*/
        $.ajax({
            /* jshint undef: true*/
            url: serverDpiUrlList[curServerType] + '/invoice/verify',
            type: 'POST',
            dataType: 'JSON',
            data: paymentDetails,
            timeout: 10000,
            success: function(res) {

                if(res.CPStatus == '100000') {
                    var resJson = JSON.stringify(res);
                    var resVerifyPurchase = JSON.parse(resJson);

                    setTimeout(function() {
                        success(resVerifyPurchase);
                    }, 0);
                }
                else {
                    setTimeout(function() {
                        var error = new Error(res.CPResult);
                        error.code = Number(res.CPStatus);
                        fail(error);
                    }, 0);
                }
            },
            error: function(jqXHR, ajaxOptions, thrownError, request, error) {
                console.log('[Error] thrownError:'+thrownError+';error:'+error+';[Message]:'+jqXHR.responseText);

                setTimeout(function() {
                    var error = new Error();
                    fail(error);
                }, 0);
            },
            complete: function() {
                console.log('complete');
            },
            failure: function() {
                console.log('failure');

                setTimeout(function() {
                    var error = new Error();
                    fail(error);
                }, 0);
            }
        });
    },
    applyProduct: function (success, fail, args) {

        if (!securityKey) {
            var error = new Error('init() isn\'t called');
            setTimeout(function() {
                fail(error);
            }, 0);
        }

        checkSsoLogin();

        var detailObj = {};
        detailObj.AppID = appId;
        detailObj.InvoiceID = args[0].invoiceId;
        detailObj.CustomID = uid;
        detailObj.CountryCode = countryCode;

        var paymentDetails = JSON.stringify(detailObj);

        /* jshint undef: false*/
        $.ajax({
            /* jshint undef: true*/
            url: serverDpiUrlList[curServerType] + '/invoice/apply',
            type: 'POST',
            dataType: 'JSON',
            data: paymentDetails,
            timeout: 10000,
            success: function(res) {

                if(res.CPStatus == '100000') {
                    var resJson = JSON.stringify(res);
                    var resApplyProduct = JSON.parse(resJson);

                    setTimeout(function() {
                        success(resApplyProduct);
                    }, 0);
                }
                else {
                    setTimeout(function() {
                        var error = new Error(res.CPResult);
                        error.code = Number(res.CPStatus);
                        fail(error);
                    }, 0);
                }

            },
            error: function(jqXHR, ajaxOptions, thrownError, request, error) {
                console.log('[Error] thrownError:'+thrownError+';error:'+error+';[Message]:'+jqXHR.responseText+'</a>');

                setTimeout(function() {
                    var error = new Error();
                    fail(error);
                }, 0);
            },
            complete: function() {
                console.log('complete');
            },
            failure: function() {
                console.log('failure');

                setTimeout(function() {
                    var error = new Error();
                    fail(error);
                }, 0);
            }
        });
    }
};

require('cordova/exec/proxy').add('toast.billing', module.exports);
