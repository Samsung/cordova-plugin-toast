'use strict';

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var tvwindowExport = {
    setSource: function (videoSource, successCallback, errorCallback) {
        argscheck.checkArgs('ofF', 'tvwindow.setSource', arguments);
        if(!videoSource.type || typeof videoSource.type != 'string') {
            throw new TypeError('videoSource.type is not a string.');
        }
        if(!videoSource.number || typeof videoSource.number != 'number') {
            throw new TypeError('videoSource.number is not a number.');
        }

        errorCallback = errorCallback || function () {};

        var args = [videoSource];
        exec(successCallback, errorCallback, 'toast.tvwindow', 'setSource', args);
    },
    getSource: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvwindow.getSource', arguments);

        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvwindow', 'getSource', args);
    },
    show: function (successCallback, errorCallback, rectangle) {
        argscheck.checkArgs('fFa', 'tvwindow.show', arguments);
        if(!rectangle[0] || typeof rectangle[0] != 'number') {
            throw new TypeError('rectangle[0] is not a number.');
        }
        if(!rectangle[1] || typeof rectangle[1] != 'number') {
            throw new TypeError('rectangle[1] is not a number.');
        }
        if(!rectangle[2] || typeof rectangle[2] != 'number') {
            throw new TypeError('rectangle[2] is not a number.');
        }
        if(!rectangle[3] || typeof rectangle[3] != 'number') {
            throw new TypeError('rectangle[3] is not a number.');
        }

        errorCallback = errorCallback || function () {};

        var args = [rectangle];
        exec(successCallback, errorCallback, 'toast.tvwindow', 'show', args);
    },
    hide: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvwindow.hide', arguments);

        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvwindow', 'hide', args);
    },
    getRect: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvwindow.getRect', arguments);

        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvwindow', 'getRect', args);
    }
};

module.exports = tvwindowExport;
