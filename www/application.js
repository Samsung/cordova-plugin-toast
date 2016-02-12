'use strict';

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

module.exports = {
    exit: function () {
        exec(null, null, 'toast.application', 'exit', null);
    },
    launchApp: function (appInfo, successCallback, errorCallback) {
        argscheck.checkArgs('ofF', 'application.launchApp', arguments);
        if(!appInfo.appId || typeof appInfo.appId != 'string') {
            throw new TypeError('appControl.appId is not a string');
        }

        appInfo.data = appInfo.data || {};
        if(typeof appInfo.data != 'object') {
            throw new TypeError('appControl.data is not a object');
        }

        var args = [appInfo];
        exec(successCallback, errorCallback, 'toast.application', 'launchApp', args);
    },
    getRequestedAppInfo: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'application.getRequestedAppInfo', arguments);

        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.application', 'getRequestedAppInfo', args);
    }
};
