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

var inputdeviceExport = {
    getSupportedKeys: function (callback, error) {
        argscheck.checkArgs('fF', 'inputdevice.getSupportedKeys', arguments);
        var args = [];
        error = error || function () {};
        exec(callback, error, 'toast.inputdevice', 'getSupportedKeys', args);
    },
    getKey: function (keyName, callback, error) {
        argscheck.checkArgs('sfF', 'inputdevice.getKey', arguments);
        var args = [keyName];
        error = error || function () {};
        exec(callback, error, 'toast.inputdevice', 'getKey', args);
    },
    registerKey: function (keyName, callback, error) {
        argscheck.checkArgs('sfF', 'inputdevice.registerKey', arguments);
        var args = [keyName];
        error = error || function () {};
        exec(callback, error, 'toast.inputdevice', 'registerKey', args);
    },
    unregisterKey: function (keyName, callback, error) {
        argscheck.checkArgs('sfF', 'inputdevice.unregisterKey', arguments);
        var args = [keyName];
        error = error || function () {};
        exec(callback, error, 'toast.inputdevice', 'unregisterKey', args);
    }
};

module.exports = inputdeviceExport;
