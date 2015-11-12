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

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var tvaudiocontrolExport = {
    setMute: function (mute, successCallback, errorCallback) {
        argscheck.checkArgs('*fF', 'tvaudiocontrol.setMute', arguments);
        errorCallback = errorCallback || function () {};

        if(typeof mute != 'boolean') {
            var error = new TypeError('First parameter needs to be boolean type.');
            throw error;
        }

        var args = [mute];
        exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setMute', args);
    },
    isMute: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvaudiocontrol.isMute', arguments);
        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'isMute', args);
    },
    setVolume: function (volume, successCallback, errorCallback) {
        argscheck.checkArgs('nfF', 'tvaudiocontrol.setVolume', arguments);
        errorCallback = errorCallback || function () {};

        var args = [volume];
        exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setVolume', args);
    },
    setVolumeUp: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvaudiocontrol.setVolumeUp', arguments);
        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setVolumeUp', args);
    },
    setVolumeDown: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvaudiocontrol.setVolumeDown', arguments);
        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setVolumeDown', args);
    },
    getVolume: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvaudiocontrol.getVolume', arguments);
        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'getVolume', args);
    },
    setVolumeChangeListener: function (callback, successCallback, errorCallback) {
        argscheck.checkArgs('ffF', 'tvaudiocontrol.setVolumeChangeListener', arguments);
        errorCallback = errorCallback || function () {};

        var args = [callback];
        exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setVolumeChangeListener', args);
    },
    unsetVolumeChangeListener: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvaudiocontrol.unsetVolumeChangeListener', arguments);
        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'unsetVolumeChangeListener', args);
    }
};

module.exports = tvaudiocontrolExport;
