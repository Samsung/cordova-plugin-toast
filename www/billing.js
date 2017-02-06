'use strict';

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

module.exports = {
    init: function(billingInfo, successCallback, errorCallback) {
        argscheck.checkArgs('ofF', 'billing.init', arguments);

        errorCallback = errorCallback || function() {};

        // madatory param
        if (!billingInfo.key || typeof billingInfo.key != 'object') {
            throw new TypeError('billingInfo.key is not a object');
        }
        if (!billingInfo.appId || typeof billingInfo.appId != 'string') {
            throw new TypeError('billingInfo.appId is not a string');
        }

        // optional param
        if (billingInfo.countryCode && typeof billingInfo.countryCode != 'string') {
            throw new TypeError('billingInfo.countryCode is not a string');
        }
        if (billingInfo.containerId && typeof billingInfo.containerId != 'string') {
            throw new TypeError('billingInfo.containerId is not a string');
        }
        if (billingInfo.lang && typeof billingInfo.lang != 'string') {
            throw new TypeError('billingInfo.countryCode is not a string');
        }
        if (billingInfo.gaWebPropertyId && typeof billingInfo.gaWebPropertyId != 'string') {
            throw new TypeError('billingInfo.gaWebPropertyId is not a string');
        }
        if (billingInfo.serverType && typeof billingInfo.serverType != 'string') {
            throw new TypeError('billingInfo.serverType is not a string');
        }

        var args = [billingInfo];
        exec(successCallback, errorCallback, 'toast.billing', 'init', args);
    },
    buyProduct: function(productInfo, successCallback, errorCallback) {
        argscheck.checkArgs('ofF', 'billing.buyProduct', arguments);

        errorCallback = errorCallback || function() {};

        // mandatory param
        if (!productInfo.productId || typeof productInfo.productId != 'string') {
            throw new TypeError('productInfo.strServer is not a string');
        }

        // optional param
        if (productInfo.productName && typeof productInfo.productName != 'string') {
            throw new TypeError('productInfo.productName is not a string');
        }
        if (productInfo.currency && typeof productInfo.currency != 'string') {
            throw new TypeError('productInfo.currency is not a string');
        }
        if (productInfo.amount && typeof productInfo.amount != 'number') {
            throw new TypeError('productInfo.amount is not a number');
        }
        if (productInfo.period && typeof productInfo.period != 'string') {
            throw new TypeError('productInfo.period is not a string');
        }
        if (productInfo.duration && typeof productInfo.duration != 'number') {
            throw new TypeError('productInfo.duration is not a number');
        }
        if (productInfo.userId && typeof productInfo.userId != 'string') {
            throw new TypeError('productInfo.userId is not a string');
        }
        if (productInfo.onExit && typeof productInfo.onExit != 'function') {
            throw new TypeError('productInfo.onExit is not a function');
        }
        if (productInfo.showBackButton && typeof productInfo.showBackButton != 'boolean') {
            throw new TypeError('productInfo.showBackButton is not a boolean');
        }
        if (productInfo.enablePaymentRecoverFlow && typeof productInfo.enablePaymentRecoverFlow != 'boolean') {
            throw new TypeError('productInfo.enablePaymentRecoverFlow is not a boolean');
        }
        if (productInfo.titles && typeof productInfo.titles != 'object') {
            throw new TypeError('productInfo.titles is not a object');
        }
        if (productInfo.orderId && typeof productInfo.orderId != 'string') {
            throw new TypeError('productInfo.orderId is not a string');
        }
        if (productInfo.oerderItemPath && typeof productInfo.oerderItemPath != 'string') {
            throw new TypeError('productInfo.oerderItemPath is not a string');
        }

        var args = [productInfo];
        exec(successCallback, errorCallback, 'toast.billing', 'buyProduct', args);
    },
    cancelSubscription: function(productInfo, successCallback, errorCallback) {
        argscheck.checkArgs('ofF', 'billing.cancelSubscription', arguments);

        errorCallback = errorCallback || function() {};

        // mandatory param
        if (!productInfo.productId || typeof productInfo.productId != 'string') {
            throw new TypeError('productInfo.productId is not a string');
        }
        if (!productInfo.userId || typeof productInfo.userId != 'string') {
            throw new TypeError('productInfo.userId is not a string');
        }

        var args = [productInfo];
        exec(successCallback, errorCallback, 'toast.billing', 'cancelSubscription', args);
    },
    checkPurchaseStatus: function(productInfo, successCallback, errorCallback) {
        argscheck.checkArgs('ofF', 'billing.checkPurchaseStatus', arguments);

        errorCallback = errorCallback || function() {};

        // mandatory param
        if (!productInfo.productId || typeof productInfo.productId != 'string') {
            throw new TypeError('productInfo.productId is not a string');
        }
        if (!productInfo.userId || typeof productInfo.userId != 'string') {
            throw new TypeError('productInfo.userId is not a string');
        }

        var args = [productInfo];
        exec(successCallback, errorCallback, 'toast.billing', 'checkPurchaseStatus', args);
    }
};
