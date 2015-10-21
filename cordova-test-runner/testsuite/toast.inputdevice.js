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
/* globals testsuite */
(function() {
    testsuite('toast.inputdevice', 'getSupportedKeys()', function(report) {
        toast.inputdevice.getSupportedKeys(function(suppKeys) {
            report('Success: ' + JSON.stringify(suppKeys));
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
    testsuite('toast.inputdevice', 'getKey(\'ColorF0Red\')', function(report) {
        toast.inputdevice.getKey('ColorF0Red', function(keyInfo) {
            report('Success: ' + JSON.stringify(keyInfo));
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });

    testsuite('toast.inputdevice', 'registerKey(\'ColorF0Red\')', function(report) {
        toast.inputdevice.registerKey('ColorF0Red', function () {
            report('OK');
        });
    });

    testsuite('toast.inputdevice', 'unregisterKey(\'ColorF0Red\')', function(report) {
        toast.inputdevice.unregisterKey('ColorF0Red', function () {
            report('OK');
        });
    });

    function getKeyDownHandler(report) {
        return function(e) {
            report('event \'keydown\' - keyCode: ' + e.keyCode);
        };
    }
    var keyDownHandler = null;
    testsuite('toast.inputdevice', 'listen keydown event', function(report) {
        keyDownHandler = getKeyDownHandler(report);
        window.addEventListener('keydown', keyDownHandler);
        report('Ready');
    });
    testsuite('toast.inputdevice', 'stop to listen keydown event', function(report) {
        if (keyDownHandler) {
            window.removeEventListener('keydown', keyDownHandler);
            keyDownHandler = null;
            report('Unregistered');
        }
        else {
            report('Not registered yet');
        }
    });
})();
