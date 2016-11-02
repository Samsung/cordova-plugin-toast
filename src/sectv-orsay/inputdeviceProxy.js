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

var supportedKeys = [
    {name: 'ArrowUp', code: 29460},
    {name: 'ArrowDown', code: 29461},
    {name: 'ArrowLeft', code: 4},
    {name: 'ArrowRight', code: 5},
    {name: 'Enter', code: 29443},
    {name: 'Return', code: 88},
    {name: 'ColorF0Red', code: 108},
    {name: 'ColorF1Green', code: 20},
    {name: 'ColorF2Yellow', code: 21},
    {name: 'ColorF3Blue', code: 22},
    {name: 'MediaRecord', code: 192},
    {name: 'MediaStop', code: 70},
    {name: 'MediaFastForward', code: 72},
    {name: 'MediaPlay', code: 71},
    {name: 'MediaPause', code: 74},
    {name: 'MediaRewind', code: 69},
    {name: 'Tools', code: 75},
    {name: '0', code: 17},
    {name: '1', code: 101},
    {name: '2', code: 98},
    {name: '3', code: 6},
    {name: '4', code: 8},
    {name: '5', code: 9},
    {name: '6', code: 10},
    {name: '7', code: 12},
    {name: '8', code: 13},
    {name: '9', code: 14},
    {name: 'ChannelUp', code: 68},
    {name: 'ChannelDown', code: 65}
];

module.exports = {

    getSupportedKeys: function (success, fail, args) {
        try {
            setTimeout(function() {
                success(supportedKeys);
            }, 0);
        }
        catch (e) {
            var error = new Error(e.message);
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },
    getKey: function(success, fail, args) {
        try {
            for(var i = 0; i < supportedKeys.length; i++) {
                if(supportedKeys[i].name === args[0]) {
                    break;
                }
            }
            if(i != supportedKeys.length) {
                setTimeout(function() {
                    success(supportedKeys[i]);
                }, 0);
            }
            else {
                var error = new RangeError('keyName is not in the supported keys set.');
                error.name = 'RangeError';
                setTimeout(function() {
                    fail(error);
                }, 0);
            }
        }
        catch (e) {
            var error = new Error(e.message);
            error.name = e.name;
            setTimeout(function() {
                fail(e);
            }, 0);
        }
    },
    registerKey: function(success, fail, args) {
        try {
            var error;
            var SEF = require('cordova/plugin/SEF');
            var AppCommonPlugin = SEF.get('AppCommon');
            for(var i = 0; i < supportedKeys.length; i++) {
                if(supportedKeys[i].name === args[0]) {
                    break;
                }
            }
            if(i != supportedKeys.length) {
                var result = AppCommonPlugin.Execute('RegisterKey',supportedKeys[i].code);
                if(result > 0) {
                    setTimeout(function() {
                        success();
                    }, 0);
                }
                else {
                    error = new Error('registerKey error');
                    error.name = 'registerKey error';
                    setTimeout(function() {
                        fail(error);
                    }, 0);
                }
            }
            else {
                error = new RangeError('keyName is not in the supported keys set.');
                error.name = 'RangeError';
                setTimeout(function() {
                    fail(error);
                }, 0);
            }
        }
        catch (e) {
            error = new Error(e.message);
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },
    unregisterKey: function(success, fail, args) {
        try {
            var error;
            var SEF = require('cordova/plugin/SEF');
            var AppCommonPlugin = SEF.get('AppCommon');
            for(var i = 0; i < supportedKeys.length; i++) {
                if(supportedKeys[i].name === args[0]) {
                    break;
                }
            }
            if(i != supportedKeys.length) {
                var result = AppCommonPlugin.Execute('UnregisterKey',supportedKeys[i].code);
                if(result > 0) {
                    success();
                }
                else {
                    error = new Error('UnregisterKey error');
                    error.name = 'UnregisterKey error';
                    setTimeout(function() {
                        fail(error);
                    }, 0);
                }
            }
            else {
                error = new RangeError('keyName is not in the supported keys set.');
                error.name = 'RangeError';
                setTimeout(function() {
                    fail(error);
                }, 0);
            }
        }
        catch (e) {
            error = new Error(e.message);
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('toast.inputdevice',module.exports);
