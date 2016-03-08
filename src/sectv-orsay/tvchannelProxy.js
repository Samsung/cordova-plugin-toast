/*
 * Copyright 2015 Samsung Electronics Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
        var startTime = Math.round(args[1].getTime()/1000); //convert to epoch time
        var duration = args[2] * 3600; //convert hour to second

        webapis.tv.channel.getProgramList(args[0], startTime, success, fail, duration);
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
        if(success) {
            for (var i = 0; i < channelChangeCallback.length; i++) {
                if (success === channelChangeCallback[i]) {
                    channelChangeCallback.splice(i, 1);
                }
            }
        }
        else {
            channelChangeCallback = [];
        }
    }
};

require('cordova/exec/proxy').add('toast.tvchannel', module.exports);
