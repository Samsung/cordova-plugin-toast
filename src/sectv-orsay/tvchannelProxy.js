'use strict';

var sefObject = require('cordova/plugin/SEF');
var sefWindow = sefObject.get('Window');

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
        try {
            var result = sefWindow.Execute('SetChannel', args[0].major, args[0].minor);

            if (result) {
                var channelInfo = webapis.tv.channel.getCurrentChannel(windowType);
                setTimeout(function () {
                    success.onsuccess(channelInfo);
                    fireChannelChangeEvent(channelInfo);
                }, 0);
            } else {
                setTimeout(function () {
                    success.onnosignal();
                }, 0);
            }
        }
        catch (e) {
            fail(e);
        }
    },
    tuneUp: function (success, fail, args) {
        try {
            sefWindow.Execute('SetChannel_Seek', setChannel.up, tuneModeList[args[0]]);

            var channelInfo = webapis.tv.channel.getCurrentChannel(windowType);
            setTimeout(function () {
                success.onsuccess(channelInfo);
                fireChannelChangeEvent(channelInfo);
            }, 0);
        }
        catch (e) {
            fail(e);
        }
    },
    tuneDown: function (success, fail, args) {
        try {
            sefWindow.Execute('SetChannel_Seek', setChannel.down, tuneModeList[args[0]]);
            
            setTimeout(function () {
                var channelInfo = webapis.tv.channel.getCurrentChannel(windowType);
                success.onsuccess(channelInfo);
                fireChannelChangeEvent(channelInfo);
            }, 0);
        }
        catch (e) {
            fail(e);
        }
    },
    findChannel: function (success, fail, args) {
        try {
            webapis.tv.channel.findChannel(args[0], args[1], success, fail);
        }
        catch (e) {
            fail(e);
        }
    },
    getChannelList: function (success, fail, args) {
        try {
            webapis.tv.channel.getChannelList(success, fail, tuneModeList[args[0]], args[1], args[2]);
        }
        catch (e) {
            fail(e);
        }
    },
    getCurrentChannel: function (success, fail, args) {
        try {
            var channelInfo = webapis.tv.channel.getCurrentChannel(windowType);

            setTimeout(function () {
                success(channelInfo);
            }, 0);
        }
        catch (e) {
            fail(e);
        }
    },
    getProgramList: function (success, fail, args) {
        try {
            webapis.tv.channel.getProgramList(args[0], args[1], success, fail, args[2]);
        }
        catch (e) {
            fail(e);
        }
    },
    getCurrentProgram: function (success, fail, args) {
        try {
            var programInfo = webapis.tv.channel.getCurrentProgram(windowType);

            setTimeout(function () {
                success(programInfo);
            }, 0);
        }
        catch (e) {
            fail(e);
        }
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
