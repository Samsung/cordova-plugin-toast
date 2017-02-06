'use strict';

var securityKey;

module.exports = {
    init: function (success, fail, args) {
        try {
            /* jshint undef: false*/
            if(device.version < 'T-INFOLINK2013-9999') {
                /* jshint undef: true*/
                console.log('paymentwall');
            }
            else {
                console.log('checkout');
            }
        }
        catch (e) {
            setTimeout(function() {
                fail(e);
            });
        }
    },
    buyProduct: function (success, fail, args) {
        try {
            if(!securityKey) {
                var initError = new Error('init isn\'t called');
                setTimeout(function() {
                    fail(initError);
                }, 0);
            }
            /* jshint undef: false*/
            if(device.version < 'T-INFOLINK2013-9999') {
                /* jshint undef: true*/
                console.log('paymentwall');
            }
            else {
                console.log('checkout');
            }
        }
        catch(e) {
            setTimeout(function() {
                fail(e);
            }, 0);
        }
    },
    cancelSubscription: function (success, fail, args) {
        try {
            if(!securityKey) {
                var initError = new Error('init isn\'t called');
                setTimeout(function() {
                    fail(initError);
                }, 0);
            }
            /* jshint undef: false*/
            if(device.version < 'T-INFOLINK2013-9999') {
                /* jshint undef: true*/
                console.log('paymentwall');
            }
            else {
                console.log('checkout');
            }
        }
        catch(e) {
            setTimeout(function() {
                fail(e);
            }, 0);
        }
    },
    checkPurchaseStatus: function (success, fail, args) {
        try {
            if(!securityKey) {
                var initError = new Error('init isn\'t called');
                setTimeout(function() {
                    fail(initError);
                }, 0);
            }
            /* jshint undef: false*/
            if(device.version < 'T-INFOLINK2013-9999') {
                /* jshint undef: true*/
                console.log('paymentwall');
            }
            else {
                console.log('checkout');
            }
        }
        catch(e) {
            setTimeout(function() {
                fail(e);
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('toast.billing', module.exports);
