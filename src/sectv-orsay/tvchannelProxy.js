'use strict';

var sefObject = require('cordova/plugin/SEF');
var sef = sefObject.get('Window');

var windowType = 0;
var channelChangeCallback = [];

var setChannel = {
    up: 3,
    down: 4
};
var tuneModeList = {
    ALL: 0,
    DIGITAL: 1,
    ANALOG: 2,
    FAVORITE: 3
};

function fireChannelChangeEvent (channelInfo) {
    for (var i = 0; i < channelChangeCallback.length; i++) {
        channelChangeCallback[i](channelInfo);
    }
}

module.exports = {
    tune: function (success, fail, args) {
        var result = sef.Execute('SetChannel', args[0].major, args[0].minor);

        if (result != -1) {
            var channelInfo = webapis.tv.channel.getCurrentChannel(windowType);
            setTimeout(function () {
                success.onsuccess(channelInfo);
                fireChannelChangeEvent(channelInfo);
            }, 0);
        }
        else {
            setTimeout(function () {
                success.onnosignal();
            }, 0);
        }
    },
    tuneUp: function (success, fail, args) {
        var result = sef.Execute('SetChannel_Seek', setChannel.up, tuneModeList[args[0]]);

        if (result != -1) {
            var channelInfo = webapis.tv.channel.getCurrentChannel(windowType);
            setTimeout(function () {
                success.onsuccess(channelInfo);
                fireChannelChangeEvent(channelInfo);
            }, 0);
        }
        else {
            setTimeout(function () {
                fail(new Error('Fail to tune up.'));
            }, 0);
        }
    },
    tuneDown: function (success, fail, args) {
        var result = sef.Execute('SetChannel_Seek', setChannel.down, tuneModeList[args[0]]);
        
        if (result != -1) {
            setTimeout(function () {
                var channelInfo = webapis.tv.channel.getCurrentChannel(windowType);
                success.onsuccess(channelInfo);
                fireChannelChangeEvent(channelInfo);
            }, 0);
        }
        else {
            setTimeout(function () {
                fail(new Error('Fail to tune up.'));
            }, 0);
        }
    },
    findChannel: function (success, fail, args) {
        webapis.tv.channel.findChannel(args[0], args[1], success, fail);
    },
    getChannelList: function (success, fail, args) {
        webapis.tv.channel.getChannelList(success, fail, tuneModeList[args[0]], args[1], args[2]);
    },
    getCurrentChannel: function (success, fail, args) {
        var channelInfo = webapis.tv.channel.getCurrentChannel(windowType);

        setTimeout(function () {
            success(channelInfo);
        }, 0);
    },
    getProgramList: function (success, fail, args) {
        webapis.tv.channel.getProgramList(args[0], args[1], success, fail, args[2]);
    },
    getCurrentProgram: function (success, fail, args) {
        var programInfo = webapis.tv.channel.getCurrentProgram(windowType);

        setTimeout(function () {
            success(programInfo);
        }, 0);
    },
    addChannelChangeListener: function (success, fail, args) {
        channelChangeCallback.push(success);
    },
    removeChannelChangeListener: function (success, fail, args) {
        for (var i = 0; i < channelChangeCallback.length; i++) {
            if (channelChangeCallback[i] === success) {
                channelChangeCallback.splice(i, 1);
            }
        }
    }
};

require('cordova/exec/proxy').add('toast.tvchannel', module.exports);
