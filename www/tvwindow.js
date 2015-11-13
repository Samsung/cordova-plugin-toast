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

var videoSourceList = [
    'TV1',
    'AV1', 'AV2', 'AV3', 'AV4',
    'SVIDEO1', 'SVIDEO2', 'SVIDEO3', 'SVIDEO4',
    'COMP1', 'COMP2', 'COMP3', 'COMP4',
    'PC1', 'PC2', 'PC3', 'PC4',
    'HDMI1', 'HDMI2', 'HDMI3', 'HDMI4',
    'SCART1', 'SCART2', 'SCART3', 'SCART4',
    'DVI1', 'DVI2', 'DVI3', 'DVI4'
];

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
        var match = false;
        for (var i = 0; i < videoSourceList.length; i++) {
            if (videoSource.type + videoSource.number == videoSourceList[i]) {
                match = true;
                break;
            }
        }
        if (!match) {
            throw new TypeError('videoSource is wrong.');
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
    show: function (rectangle, successCallback, errorCallback) {
        argscheck.checkArgs('afF', 'tvwindow.show', arguments);
        if(rectangle.length != 4) {
            throw new TypeError('rectangle.length is wrong.');
        }
        if(typeof rectangle[0] != 'number' || rectangle[0] < 0) {
            throw new TypeError('rectangle[0] is not a positive number.');
        }
        if(typeof rectangle[1] != 'number' || rectangle[1] < 0) {
            throw new TypeError('rectangle[1] is not a positive number.');
        }
        if(typeof rectangle[2] != 'number' || rectangle[2] < 0) {
            throw new TypeError('rectangle[2] is not a positive number.');
        }
        if(typeof rectangle[3] != 'number' || rectangle[3] < 0) {
            throw new TypeError('rectangle[3] is not a positive number.');
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
