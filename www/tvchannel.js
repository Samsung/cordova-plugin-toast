'use strict';

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var tvchannelExport = {};

tvchannelExport = {
    tune: function (tuneOption, successCallback, errorCallback) {
        argscheck.checkArgs('ooF', 'tvchannel.tune', arguments);
        if(!tuneOption.major || !tuneOption.minor) {
            throw new TypeError('tuneOption is wrong.');
        }
        if(successCallback.onsuccess && typeof successCallback.onsuccess !== 'function') {
            throw new TypeError('successCallback.onsuccess is not a function.');
        }
        if(successCallback.onnosignal && typeof successCallback.onnosignal !== 'function') {
            throw new TypeError('successCallback.onnosignal is not a function.');
        }
        if(successCallback.onprograminforeceived && typeof successCallback.onprograminforeceived !== 'function') {
            throw new TypeError('successCallback.onprograminforeceived is not a function.');
        }

        errorCallback = errorCallback || function () {};

        var args = [tuneOption];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'tune', args);
    },
    tuneUp: function (successCallback, errorCallback, tuneMode) {
        argscheck.checkArgs('oFSS', 'tvchannel.tuneUp', arguments);
        if(successCallback.onsuccess && typeof successCallback.onsuccess !== 'function') {
            throw new TypeError('successCallback.onsuccess is not a function.');
        }
        if(successCallback.onnosignal && typeof successCallback.onnosignal !== 'function') {
            throw new TypeError('successCallback.onnosignal is not a function.');
        }
        if(successCallback.onprograminforeceived && typeof successCallback.onprograminforeceived !== 'function') {
            throw new TypeError('successCallback.onprograminforeceived is not a function.');
        }

        errorCallback = errorCallback || function () {};
        tuneMode = tuneMode || 'ALL';

        var args = [tuneMode];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'tuneUp', args);
    },
    tuneDown: function (successCallback, errorCallback, tuneMode) {
        argscheck.checkArgs('oFSS', 'tvchannel.tuneDown', arguments);
        if(successCallback.onsuccess && typeof successCallback.onsuccess !== 'function') {
            throw new TypeError('successCallback.onsuccess is not a function.');
        }
        if(successCallback.onnosignal && typeof successCallback.onnosignal !== 'function') {
            throw new TypeError('successCallback.onnosignal is not a function.');
        }
        if(successCallback.onprograminforeceived && typeof successCallback.onprograminforeceived !== 'function') {
            throw new TypeError('successCallback.onprograminforeceived is not a function.');
        }

        errorCallback = errorCallback || function () {};
        tuneMode = tuneMode || 'ALL';

        var args = [tuneMode];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'tuneDown', args);
    },
    findChannel: function (major, minor, successCallback, errorCallback) {
        argscheck.checkArgs('nnfF', 'tvchannel.findChannel', arguments);

        errorCallback = errorCallback || function () {};

        var args = [major, minor];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'findChannel', args);
    },
    getChannelList: function (successCallback, errorCallback, mode, nStart, number) {
        argscheck.checkArgs('fFSNN', 'tvchannel.getChannelList', arguments);

        errorCallback = errorCallback || function () {};
        mode = mode || 'ALL';
        nStart = nStart || 0;
        number = number || 0;

        var args = [mode, nStart, number];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'getChannelList', args);
    },
    getCurrentChannel: function (successCallback, errorCallback) {
        argscheck.checkArgs('fFS', 'tvchannel.getCurrentChannel', arguments);

        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'getCurrentChannel', args);
    },
    getProgramList: function (channelInfo, startTime, successCallback, errorCallback, duration) {
        argscheck.checkArgs('oofFN', 'tvchannel.getProgramList', arguments);

        errorCallback = errorCallback || function () {};
        duration = duration || 0;

        var args = [channelInfo, startTime, duration];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'getProgramList', args);
    },
    getCurrentProgram: function (successCallback, errorCallback) {
        argscheck.checkArgs('fFS', 'tvchannel.getCurrentProgram', arguments);

        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'getCurrentProgram', args);
    },
    addChannelChangeListener: function (callback) {
        argscheck.checkArgs('fS', 'tvchannel.addChannelChangeListener', arguments);

        var args = [];
        exec(callback, null, 'toast.tvchannel', 'addChannelChangeListener', args);
    },
    removeChannelChangeListener: function (callback) {
        argscheck.checkArgs('f', 'tvchannel.removeChannelChangeListener', arguments);

        var args = [];
        exec(callback, null, 'toast.tvchannel', 'removeChannelChangeListener', args);
    }
};

module.exports = tvchannelExport;
