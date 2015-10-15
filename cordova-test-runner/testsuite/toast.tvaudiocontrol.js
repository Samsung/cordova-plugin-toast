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
    testsuite('toast.tvaudiocontrol', 'setMute() to \'true\'', function(report) {
        toast.tvaudiocontrol.setMute(true, function() {
            report('Success');
        }, function(err) {
            report('Error: ' + err.message);
        });
    });
    testsuite('toast.tvaudiocontrol', 'setMute() to \'false\'', function(report) {
        toast.tvaudiocontrol.setMute(false, function() {
            report('Success');
        }, function(err) {
            report('Error: ' + err.message);
        });
    });
    testsuite('toast.tvaudiocontrol', 'isMute()', function(report) {
        toast.tvaudiocontrol.isMute(function(value) {
            report('Success: ' + value);
        }, function(err) {
            report('Error: ' + err.message);
        });
    });
    testsuite('toast.tvaudiocontrol', 'setVolume() to \'5\'', function(report) {
        toast.tvaudiocontrol.setVolume(5, function() {
            report('Success');
        }, function(err) {
            report('Error: ' + err.message);
        });
    });
    testsuite('toast.tvaudiocontrol', 'setVolumeUp()', function(report) {
        toast.tvaudiocontrol.setVolumeUp(function() {
            report('Success');
        }, function(err) {
            report('Error: ' + err.message);
        });
    });
    testsuite('toast.tvaudiocontrol', 'setVolumeDown()', function(report) {
        toast.tvaudiocontrol.setVolumeDown(function() {
            report('Success');
        }, function(err) {
            report('Error: ' + err.message);
        });
    });
    testsuite('toast.tvaudiocontrol', 'getVolume()', function(report) {
        toast.tvaudiocontrol.getVolume(function(value) {
            report('Success: ' + value);
        }, function(err) {
            report('Error: ' + err.message);
        });
    });
    testsuite('toast.tvaudiocontrol', 'setVolumeChangeListener()', function(report) {
        toast.tvaudiocontrol.setVolumeChangeListener(function(value) {
            report('volume changes to ' + value);
        }, function() {
            report('Success');
        }, function(err) {
            report('Error: ' + err.message);
        });
    });
    testsuite('toast.tvaudiocontrol', 'unsetVolumeChangeListener()', function(report) {
        toast.tvaudiocontrol.unsetVolumeChangeListener(function() {
            report('Success');
        }, function(err) {
            report('Error: ' + err.message);
        });
    });
})();
