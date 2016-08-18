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
    {name: 'ArrowUp', code: 38},
    {name: 'ArrowDown', code: 40},
    {name: 'ArrowLeft', code: 37},
    {name: 'ArrowRight', code: 39},
    {name: 'Enter', code: 13},
    {name: 'Return', code: 461},
    {name: 'ColorF0Red', code: 403},
    {name: 'ColorF1Green', code: 404},
    {name: 'ColorF2Yellow', code: 405},
    {name: 'ColorF3Blue', code: 406},
    {name: 'MediaStop', code: 413},
    {name: 'MediaFastForward', code: 417},
    {name: 'MediaPlay', code: 415},
    {name: 'MediaPause', code: 19},
    {name: 'MediaRewind', code: 412},
    {name: '0', code: 48},
    {name: '1', code: 49},
    {name: '2', code: 50},
    {name: '3', code: 51},
    {name: '4', code: 52},
    {name: '5', code: 53},
    {name: '6', code: 54},
    {name: '7', code: 55},
    {name: '8', code: 56},
    {name: '9', code: 57}
];

module.exports = {
    getSupportedKeys: function (success, fail, args) {
        try {
            setTimeout(function() {
                success(supportedKeys);
            }, 0);
        }
        catch (e) {
            setTimeout(function() {
                fail(e);
            }, 0);
        }
    },
    getKey: function(success, fail, args) {
        try {
            console.log(args[0]);
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
        catch(e) {
            setTimeout(function() {
                fail(e);
            }, 0);
        }
    },

    // Not supported method for webos platform
    registerKey: function(success, fail, args) {
        for(var i = 0; i < supportedKeys.length; i++) {
            if(supportedKeys[i].name === args[0]) {
                break;
            }
        }
        if(i == supportedKeys.length) {
            var error = new RangeError('keyName is not in the supported keys set.');
            error.name = 'RangeError';
            setTimeout(function() {
                fail(error);
            }, 0);
        }
        else {
            setTimeout(function() {
                success();
            }, 0);
        }
    },

    // Not supported method for webos platform
    unregisterKey: function(success, fail, args) {
        for(var i = 0; i < supportedKeys.length; i++) {
            if(supportedKeys[i].name === args[0]) {
                break;
            }
        }
        if(i == supportedKeys.length) {
            var error = new RangeError('keyName is not in the supported keys set.');
            error.name = 'RangeError';
            setTimeout(function() {
                fail(error);
            }, 0);
        }
        else {
            setTimeout(function() {
                success();
            }, 0);
        }

    }
};

require('cordova/exec/proxy').add('toast.inputdevice',module.exports);
