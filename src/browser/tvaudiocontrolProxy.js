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

var isMute = false;
var volume = 0;
var volumeChangeCallback = null;

function volumeTrigger(volume) {
    if(volumeChangeCallback) {
        volumeChangeCallback(volume);
    }
    isMute = false;
}

module.exports = {
    setMute: function (success, fail, args) {
        try {
            setTimeout(function() {
                isMute = args[0];
                success();
            }, 0);
        }
        catch(e) {
            fail(new Error('failed to setMute'));
        }
    },
    isMute: function (success, fail, args) {
        try {
            setTimeout(function() {
                var result = isMute;
                success(result);
            }, 0);
        }
        catch(e) {
            fail(new Error('failed to isMute'));
        }
    },
    setVolume: function (success, fail, args) {
        try {
            setTimeout(function() {
                volume = args[0];
                volumeTrigger(volume);
                success();
            }, 0);
        }
        catch(e) {
            fail(new Error('failed to setVolume'));
        }
    },
    setVolumeUp: function (success, fail, args) {
        try {
            setTimeout(function() {
                if(volume < 100) {
                    volume++;
                }
                volumeTrigger(volume);
                success();
            }, 0);
        }
        catch(e) {
            fail(new Error('failed to setVolumeUp'));
        }
    },
    setVolumeDown: function (success, fail, args) {
        try {
            setTimeout(function() {
                if(volume > 0) {
                    volume--;
                }
                volumeTrigger(volume);
                success();
            }, 0);
        }
        catch(e) {
            fail(new Error('failed to setVolumeDown'));
        }
    },
    getVolume: function (success, fail, args) {
        try {
            setTimeout(function() {
                var result = volume;
                success(result);
            }, 0);
        }
        catch(e) {
            fail(new Error('failed to getVolume'));
        }
    },
    setVolumeChangeListener: function (success, fail, args) {
        try {
            setTimeout(function() {
                volumeChangeCallback = args[0];
                success();
            }, 0);
        }
        catch(e) {
            fail(new Error('failed to setVolumeChangeListener'));
        }
    },
    unsetVolumeChangeListener: function (success, fail, args) {
        try {
            setTimeout(function() {
                volumeChangeCallback = '';
                success();
            }, 0);
        }
        catch(e) {
            fail(new Error('failed to unsetVolumeChangeListener'));
        }
    }
};

require('cordova/exec/proxy').add('toast.tvaudiocontrol', module.exports);
