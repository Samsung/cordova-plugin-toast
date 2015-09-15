'use strict';

var tuneModeList = ['ALL', 'DIGITAL', 'ANALOG', 'FAVORITE'];

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var tvchannelExport = {
    tune: function (tuneOption, successCallback, errorCallback) {
        argscheck.checkArgs('ooF', 'tvchannel.tune', arguments);
        if(!tuneOption.major || typeof tuneOption.major != 'number') {
            throw new TypeError('tuneOption is not a number.');
        }
        if(!tuneOption.minor || typeof tuneOption.minor != 'number') {
            throw new TypeError('tuneOption is not a number.');
        }
        if(!successCallback.onsuccess || typeof successCallback.onsuccess != 'function') {
            throw new TypeError('successCallback.onsuccess is not a function.');
        }
        if(!successCallback.onnosignal || typeof successCallback.onnosignal != 'function') {
            throw new TypeError('successCallback.onnosignal is not a function.');
        }
        if(!successCallback.onprograminforeceived || typeof successCallback.onprograminforeceived != 'function') {
            throw new TypeError('successCallback.onprograminforeceived is not a function.');
        }

        errorCallback = errorCallback || function () {};

        var args = [tuneOption];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'tune', args);
    },
    tuneUp: function (successCallback, errorCallback, tuneMode) {
        argscheck.checkArgs('oFSS', 'tvchannel.tuneUp', arguments);
        if(!successCallback.onsuccess || typeof successCallback.onsuccess != 'function') {
            throw new TypeError('successCallback.onsuccess is not a function.');
        }
        if(!successCallback.onnosignal || typeof successCallback.onnosignal != 'function') {
            throw new TypeError('successCallback.onnosignal is not a function.');
        }
        if(!successCallback.onprograminforeceived || typeof successCallback.onprograminforeceived != 'function') {
            throw new TypeError('successCallback.onprograminforeceived is not a function.');
        }

        errorCallback = errorCallback || function () {};
        tuneMode = tuneMode || 'ALL';

        var match = false;
        for (var i = 0; i < tuneModeList.length; i++) {
            if (tuneMode == tuneModeList[i]) {
                match = true;
                break;
            }
        }
        if (!match) {
            throw new RangeError('tuneMode is wrong.');
        }

        var args = [tuneMode];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'tuneUp', args);
    },
    tuneDown: function (successCallback, errorCallback, tuneMode) {
        argscheck.checkArgs('oFSS', 'tvchannel.tuneDown', arguments);
        if(!successCallback.onsuccess || typeof successCallback.onsuccess != 'function') {
            throw new TypeError('successCallback.onsuccess is not a function.');
        }
        if(!successCallback.onnosignal || typeof successCallback.onnosignal != 'function') {
            throw new TypeError('successCallback.onnosignal is not a function.');
        }
        if(!successCallback.onprograminforeceived || typeof successCallback.onprograminforeceived != 'function') {
            throw new TypeError('successCallback.onprograminforeceived is not a function.');
        }

        errorCallback = errorCallback || function () {};
        tuneMode = tuneMode || 'ALL';

        var match = false;
        for (var i = 0; i < tuneModeList.length; i++) {
            if (tuneMode == tuneModeList[i]) {
                match = true;
                break;
            }
        }
        if (!match) {
            throw new RangeError('tuneMode is wrong.');
        }

        var args = [tuneMode];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'tuneDown', args);
    },
    findChannel: function (major, minor, successCallback, errorCallback) {
        argscheck.checkArgs('nnfF', 'tvchannel.findChannel', arguments);

        errorCallback = errorCallback || function () {};

        var args = [major, minor];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'findChannel', args);
    },
    getChannelList: function (successCallback, errorCallback, tuneMode, nStart, number) {
        argscheck.checkArgs('fFSNN', 'tvchannel.getChannelList', arguments);

        errorCallback = errorCallback || function () {};
        tuneMode = tuneMode || 'ALL';
        nStart = nStart || 0;
        number = number || '';

        var match = false;
        for (var i = 0; i < tuneModeList.length; i++) {
            if (tuneMode == tuneModeList[i]) {
                match = true;
                break;
            }
        }
        if (!match) {
            throw new RangeError('tuneMode is wrong.');
        }
        if(nStart < 0) {
            throw new RangeError('nStart is a negative number.');
        }
        if(number < 0) {
            throw new RangeError('number is a negative number.');
        }

        var args = [tuneMode, nStart, number];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'getChannelList', args);
    },
    getCurrentChannel: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvchannel.getCurrentChannel', arguments);

        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'getCurrentChannel', args);
    },
    getProgramList: function (channelInfo, startTime, successCallback, errorCallback, duration) {
        argscheck.checkArgs('odfFN', 'tvchannel.getProgramList', arguments);
        if(!channelInfo.major || typeof channelInfo.major != 'number') {
            throw new TypeError('channelInfo.major is not a number.');
        }
        if(!channelInfo.minor || typeof channelInfo.minor != 'number') {
            throw new TypeError('channelInfo.minor is not a number.');
        }

        errorCallback = errorCallback || function () {};
        duration = duration || '';

        if(duration < 0) {
            throw new RangeError('duration is a negative number.');
        }

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
