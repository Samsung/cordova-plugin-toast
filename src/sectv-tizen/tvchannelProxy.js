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

//var tizenutil = require('cordova-plugin-toast.tizenutil');
var windowType = 'MAIN';

var channelChangeCallback = [];

module.exports = {
    tune: function (success, fail, args) {
        try {
            var match = -1;

            tizen.tvchannel.getChannelList(function (channelList) {
                for (var i = 0; i < channelList.length; i++) {
                    if (args[0].major == channelList[i].major && args[0].minor == channelList[i].minor) {
                        match = i;
                        break;
                    }
                }

                if (match != -1) {
                    tizen.tvchannel.tune(channelList[match], success, fail, windowType);
                }
                else {
                    setTimeout(function () {
                        fail(new Error('Fail to find source.'));
                    }, 0);
                }
            });
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
            var match = -1;

            tizen.tvchannel.getChannelList(function (channelList) {
                for (var i = 0; i < channelList.length; i++) {
                    if (args[0].major == channelList[i].major && args[0].minor == channelList[i].minor) {
                        match = i;
                        break;
                    }
                }

                if (match != -1) {
                    var TZDate = new tizen.TZDate(args[1]);
                    tizen.tvchannel.getProgramList(channelList[match], TZDate, success, fail, args[2]);
                }
                else {
                    setTimeout(function () {
                        fail(new Error('Fail to find source.'));
                    }, 0);
                }
            });
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
        }
        catch (e) {
            fail(e);
        }
    },
    addChannelChangeListener: function (success, fail, args) {
        channelChangeCallback.push({
            callback: success,
            id: tizen.tvchannel.addChannelChangeListener(success, windowType)
        });
    },
    removeChannelChangeListener: function (success, fail, args) {
        var i;
        if(success) {
            for (i = 0; i < channelChangeCallback.length; i++) {
                if (success === channelChangeCallback[i].callback) {
                    tizen.tvchannel.removeChannelChangeListener(channelChangeCallback[i].id);
                    channelChangeCallback.splice(i, 1);
                }
            }
        }
        else {
            for (i = 0; i < channelChangeCallback.length; i++) {
                tizen.tvchannel.removeChannelChangeListener(channelChangeCallback[i].id);
            }
            channelChangeCallback = [];
        }
    }
};

require('cordova/exec/proxy').add('toast.tvchannel', module.exports);
