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

module.exports = {
    getSupportedKeys: function (success, fail, args) {
        try {
            var supportedKeys = [];
            supportedKeys = tizen.tvinputdevice.getSupportedKeys();
            supportedKeys.push({name: 'ArrowUp', code: 38});
            supportedKeys.push({name: 'ArrowDown', code: 40});
            supportedKeys.push({name: 'ArrowLeft', code: 37});
            supportedKeys.push({name: 'ArrowRight', code: 39});
            supportedKeys.push({name: 'Enter', code: 13});
            supportedKeys.push({name: 'Return', code: 10009});
            setTimeout(function() {
                success(supportedKeys);
            }, 0);
        }
        catch (e) {
            var error = new Error(e.message);
            error.name = e.name;
            setTimeout(function() {
                fail(e);
            }, 0);
        }
    },
    getKey: function(success, fail, args) {
        try {
            var inputDeviceKey = tizen.tvinputdevice.getKey(args[0]);
            setTimeout(function() {
                success(inputDeviceKey);
            }, 0);
        }
        catch (e) {
            var error;
            if(e.name === 'InvalidValuesError') {
                error = new RangeError(e.message);
            }
            else {
                error = new Error(e.message);
            }
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },
    registerKey: function(success, fail, args) {
        try {
            tizen.tvinputdevice.registerKey(args[0]);
            setTimeout(function() {
                success();
            }, 0);
        }
        catch (e) {
            var error;
            if(e.name === 'InvalidValuesError') {
                error = new RangeError(e.message);
            }
            else {
                error = new Error(e.message);
            }
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },
    unregisterKey: function(success, fail, args) {
        try {
            tizen.tvinputdevice.unregisterKey(args[0]);
            setTimeout(function() {
                success();
            }, 0);
        }
        catch (e) {
            var error;
            if(e.name === 'InvalidValuesError') {
                error = new RangeError(e.message);
            }
            else {
                error = new Error(e.message);
            }
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('toast.inputdevice',module.exports);
