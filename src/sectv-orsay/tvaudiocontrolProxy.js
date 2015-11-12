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

var SEF = require('cordova/plugin/SEF');

var volumeChangeCallback = null;

var PL_AUDIO_VOLUME_KEY_UP = 0;
var PL_AUDIO_VOLUME_KEY_DOWN = 1;

var PLR_TRUE = 1;
var PLR_FALSE = 0;

function volumeTrigger(volume) {
    var sef = SEF.get('Audio');

    if(!volume) {
        volume = sef.Execute('GetVolume');
    }

    if(volumeChangeCallback) {
        if((typeof volume == 'number') && (volume != -1)) {
            volumeChangeCallback(volume);
        }
    }
}

module.exports = {
    setMute: function (success, fail, args) {
        var userMute = args[0] ? PLR_TRUE : PLR_FALSE;

        var sef = SEF.get('Audio');
        var result = sef.Execute('SetUserMute', userMute);

        if (result != -1) {
            setTimeout(function () {
                success();
            }, 0);
        }
        else {
            setTimeout(function () {
                var e = new Error('failed to setMute');
                fail(e);
            }, 0);
        }
    },
    isMute: function (success, fail, args) {
        var sef = SEF.get('Audio');
        var result = sef.Execute('GetUserMute');

        if (result != -1) {
            result = (result == PLR_TRUE) ? true : false;
            setTimeout(function () {
                success(result);
            }, 0);
        }
        else {
            setTimeout(function () {
                var e = new Error('failed to execute isMute');
                fail(e);
            }, 0);
        }
    },
    setVolume: function (success, fail, args) {
        var sef = SEF.get('Audio');
        var muteResult = sef.Execute('SetUserMute', PLR_FALSE);

        if (muteResult != -1) {
            var result = sef.Execute('SetVolume', args[0]);

            if(result != -1) {
                setTimeout(function () {
                    volumeTrigger(args[0]);
                    success();
                }, 0);
            }
            else {
                setTimeout(function () {
                    var e = new Error('failed to setVolume');
                    fail(e);
                }, 0);
            }
        }
        else {
            setTimeout(function () {
                var e = new Error('failed to setVolumeDown');
                fail(e);
            }, 0);
        }
    },
    setVolumeUp: function (success, fail, args) {
        var sef = SEF.get('Audio');
        var muteResult = sef.Execute('SetUserMute', PLR_FALSE);

        if (muteResult != -1) {
            var result = sef.Execute('SetVolumeWithKey', PL_AUDIO_VOLUME_KEY_UP);

            if(result != -1) {
                setTimeout(function () {
                    volumeTrigger();
                    success();
                }, 0);
            }
            else {
                setTimeout(function () {
                    var e = new Error('failed to setVolumeUp');
                    fail(e);
                }, 0);
            }
        }
        else {
            setTimeout(function () {
                var e = new Error('failed to setVolumeDown');
                fail(e);
            }, 0);
        }
    },
    setVolumeDown: function (success, fail, args) {
        var sef = SEF.get('Audio');
        var muteResult = sef.Execute('SetUserMute', PLR_FALSE);

        if (muteResult != -1) {
            var result = sef.Execute('SetVolumeWithKey', PL_AUDIO_VOLUME_KEY_DOWN);

            if(result != -1) {
                setTimeout(function () {
                    volumeTrigger();
                    success();
                }, 0);
            }
            else {
                setTimeout(function () {
                    var e = new Error('failed to setVolumeDown');
                    fail(e);
                }, 0);
            }
        }
        else {
            setTimeout(function () {
                var e = new Error('failed to setVolumeDown');
                fail(e);
            }, 0);
        }
    },
    getVolume: function (success, fail, args) {
        var sef = SEF.get('Audio');
        var result = sef.Execute('GetVolume');

        if (result != -1) {
            setTimeout(function () {
                success(result);
            }, 0);
        }
        else {
            setTimeout(function () {
                var e = new Error('failed to getVolume');
                fail(e);
            }, 0);
        }
    },
    setVolumeChangeListener: function (success, fail, args) {
        volumeChangeCallback = args[0];
        if(volumeChangeCallback) {
            setTimeout(function () {
                success();
            }, 0);
        }
        else {
            setTimeout(function () {
                var e = new Error('failed to setVolumeChangeListener');
                fail(e);
            }, 0);
        }
    },
    unsetVolumeChangeListener: function (success, fail, args) {
        volumeChangeCallback = '';

        if(!volumeChangeCallback) {
            setTimeout(function () {
                success();
            }, 0);
        }
        else {
            setTimeout(function () {
                var e = new Error('failed to unsetVolumeChangeListener');
                fail(e);
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('toast.tvaudiocontrol', module.exports);
