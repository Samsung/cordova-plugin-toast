'use strict';

//var tizenutil = require('cordova-plugin-toast.tizenutil');
var windowType = 'MAIN';

var channelChangeCallback = [];

module.exports = {
    tune: function (success, fail, args) {
        try {
            tizen.tvchannel.tune(args[0], success, fail, windowType);
        }
        catch (e) {
            fail(e);
        }
    },
    tuneUp: function (success, fail, args) {
        try {
            tizen.tvchannel.tuneUp(success, fail, args[0], windowType);
        }
        catch (e) {
            fail(e);
        }
    },
    tuneDown: function (success, fail, args) {
        try {
            tizen.tvchannel.tuneDown(success, fail, args[0], windowType);
        }
        catch (e) {
            fail(e);
        }
    },
    findChannel: function (success, fail, args) {
        try {
            tizen.tvchannel.findChannel(args[0], args[1], success, fail);
        }
        catch (e) {
            fail(e);
        }
    },
    getChannelList: function (success, fail, args) {
        try {
            tizen.tvchannel.getChannelList(success, fail, args[0], args[1], args[2]);
        }
        catch (e) {
            fail(e);
        }
    },
    getCurrentChannel: function (success, fail, args) {
        try {
            var channelInfo = tizen.tvchannel.getCurrentChannel(windowType);

            if (typeof channelInfo == 'object') {
                setTimeout(function () {
                    success(channelInfo);
                }, 0);
            }
            else {
                setTimeout(function () {
                    fail({
                        code: 9,
                        name: 'NOT_SUPPORTED_ERR',
                        message: 'Any other error occurs on platform.'
                    });
                }, 0);
            }
        }
        catch (e) {
            fail(e);
        }
    },
    getProgramList: function (success, fail, args) {
        try {
            tizen.tvchannel.getProgramList(args[0], args[1], success, fail, args[2]);
        }
        catch (e) {
            fail(e);
        }
    },
    getCurrentProgram: function (success, fail, args) {
        try {
            var programInfo = tizen.tvchannel.getCurrentProgram(windowType);

            if (typeof programInfo == 'object') {
                setTimeout(function () {
                    success(programInfo);
                }, 0);    
            }
            else {
                setTimeout(function () {
                    fail({
                            code: 9,
                            name: 'NOT_SUPPORTED_ERR',
                            message: 'Any other error occurs on platform.'
                        });
                }, 0);
            }
        } catch (e) {
            fail(e);
        }
    },
    addChannelChangeListener: function (success, fail, args) {
        channelChangeCallback.push({
            callback: success,
            id : tizen.tvchannel.addChannelChangeListener(success, args[0])
        });
    },
    removeChannelChangeListener: function (success, fail, args) {
        for (var i = 0; i < channelChangeCallback.length; i++) {
            if (success === channelChangeCallback[i].callback) {
                tizen.tvchannel.removeChannelChangeListener(channelChangeCallback[i].id);
                channelChangeCallback.splice(i, 1);
            }
        }
    }
};

require('cordova/exec/proxy').add('toast.tvchannel', module.exports);
