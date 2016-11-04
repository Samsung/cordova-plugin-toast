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

var videoSourceTypeList = ['TV', 'AV', 'SVIDEO', 'COMP', 'PC', 'HDMI', 'SCART', 'DVI', 'MEDIA'];
var videoSourceList = {
    TV1: 0,
    AV1: 15, AV2: 16, AV3: 17, AV4: 18,
    SVIDEO1: 19, SVIDEO2: 20, SVIDEO3: 21, SVIDEO4: 22,
    COMP1: 23, COMP2: 24, COMP3: 25, COMP4: 26,
    PC1: 27, PC2: 28, PC3: 29, PC4: 30,
    HDMI1: 31, HDMI2: 32, HDMI3: 33, HDMI4: 34,
    SCART1: 35, SCART2: 36, SCART3: 37, SCART4: 38,
    DVI1: 39, DVI2: 40, DVI3: 41, DVI4: 42,
    MEDIA: 43
};
var windowType = 0;
var videoSource = {
    type: '',
    number: -1
};
var windowRect = ['', '', '', ''];

module.exports = {
    setSource: function (success, fail, args) {
        var videoSourceStr = args[0].type + args[0].number;

        var result = sef.Execute('SetSource', videoSourceList[videoSourceStr]);

        if (result != -1) {
            videoSource.type = args[0].type;
            videoSource.number = args[0].number;

            setTimeout(function () {
                success(videoSource);
            }, 0);
        }
        else {
            setTimeout(function () {
                fail(new Error('Fail to find source.'));
            }, 0);
        }
    },
    getSource: function (success, fail, args) {
        var sourceInfo = webapis.tv.window.getSource(windowType);

        if (sourceInfo.type !== undefined && typeof sourceInfo.type == 'number' && 0 <= sourceInfo.type && sourceInfo.type <= 8) {
            videoSource.type = videoSourceTypeList[sourceInfo.type];

            if (videoSource.type == 'TV' || videoSource.type == 'MEDIA') {
                videoSource.number = 1;
            }
            else {
                videoSource.number = sourceInfo.number;
            }

            setTimeout(function () {
                success(videoSource);
            }, 0);
        }
        else {
            setTimeout(function () {
                fail(new Error('Fail to get source.'));
            }, 0);
        }
    },
    show: function (success, fail, args) {
        var result = webapis.tv.window.setRect({
            left: args[0][0],
            top: args[0][1],
            width: args[0][2],
            height: args[0][3]
        }, windowType);

        if (result) {
            windowRect[0] = args[0][0] + 'px';
            windowRect[1] = args[0][1] + 'px';
            windowRect[2] = args[0][2] + 'px';
            windowRect[3] = args[0][3] + 'px';

            sef.Execute('SetPreviousSource');
            document.getElementById('_plugin_Window').style.position = 'fixed';

            result = webapis.tv.window.show(windowType);
            if (result) {
                setTimeout(function () {
                    success(windowRect);
                }, 0);
            }
            else {
                setTimeout(function () {
                    fail(new Error('Fail to show window.'));
                }, 0);
            }
        }
        else {
            setTimeout(function () {
                fail(new Error('Fail to show window.'));
            }, 0);
        }
    },
    hide: function (success, fail, args) {
        sef.Execute('SetSource', videoSourceList.MEDIA);

        var result = webapis.tv.window.hide(windowType);
        if (result) {
            windowRect[0] = '';
            windowRect[1] = '';
            windowRect[2] = '';
            windowRect[3] = '';

            setTimeout(function () {
                success();
            }, 0);
        }
        else {
            setTimeout(function () {
                fail(new Error('Fail to hide window.'));
            }, 0);
        }
    },
    getRect: function (success, fail, args) {
        if (windowRect[0]) {
            setTimeout(function () {
                success(windowRect);
            }, 0);
        }
        else {
            setTimeout(function () {
                fail(new Error('Fail to get rectagle.'));
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('toast.tvwindow', module.exports);
