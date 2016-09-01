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

var volumeChangeCallback = null;

function volumeTrigger(volume) {
    if(volumeChangeCallback && (typeof volumeChangeCallback == 'function')) {
        if((typeof volume == 'number') && (volume != -1)) {
            volumeChangeCallback(volume);
        }
        else {
            webOS.service.request('luna://com.webos.audio', {
                method: 'getVolume',
                onSuccess: function (inResponse) {
                    volumeChangeCallback(inResponse.volume);
                },
                onFailure: function (inError) {
                    console.log('failed to volumeTrigger');
                }
            });
        }
    }
}

module.exports = {
    setMute: function (success, fail, args) {
        try {
            var isMuted = args[0];
            webOS.service.request('luna://com.webos.audio', {
                method: 'setMuted',
                parameters: {
                    'muted': isMuted
                },
                onSuccess: function (inResponse) {
                    success();
                },
                onFailure: function (inError) {
                    fail();
                }
            });
        }
        catch (e) {
            var error = new Error('failed to setMute');
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },

    isMute: function (success, fail, args) {
        try {
            webOS.service.request('luna://com.webos.audio', {
                method: 'getVolume',
                onSuccess: function (inResponse) {
                    console.log(inResponse);
                    success(inResponse.muted);
                },
                onFailure: function (inError) {
                    fail();
                }
            });
        }
        catch (e) {
            var error = new Error('failed to execute isMute');
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },

    setVolume: function (success, fail, args) {
        try {
            var volume = args[0];
            webOS.service.request('luna://com.webos.audio', {
                method: 'setVolume',
                parameters: {
                    'volume': volume
                },
                onSuccess: function (inResponse) {
                    volumeTrigger(volume);
                    success();
                },
                onFailure: function (inError) {
                    fail();
                }
            });
        }
        catch (e) {
            var error = new Error('failed to setVolume');
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },

    setVolumeUp: function (success, fail, args) {
        try {
            webOS.service.request('luna://com.webos.audio', {
                method: 'volumeUp',
                onSuccess: function (inResponse) {
                    volumeTrigger();
                    success();
                },
                onFailure: function (inError) {
                    fail();
                }
            });
        }
        catch (e) {
            var error = new Error('failed to setVolumeUp');
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },

    setVolumeDown: function (success, fail, args) {
        try {
            webOS.service.request('luna://com.webos.audio', {
                method: 'volumeDown',
                onSuccess: function (inResponse) {
                    volumeTrigger();
                    success();
                },
                onFailure: function (inError) {
                    fail();
                }
            });
        }
        catch (e) {
            var error = new Error('failed to setVolumeDown');
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },

    getVolume: function (success, fail, args) {
        try {
            webOS.service.request('luna://com.webos.audio', {
                method: 'getVolume',
                onSuccess: function (inResponse) {
                    console.log(inResponse);
                    success(inResponse.volume);
                },
                onFailure: function (inError) {
                    fail();
                }
            });
        }
        catch (e) {
            var error = new Error('failed to getVolume');
            error.name = e.name;
            setTimeout(function() {
                fail(error);
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
            var error = new Error('failed to setVolumeChangeListener');
            error.name = 'Fail';
            setTimeout(function() {
                fail(error);
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
            var error = new Error('failed to unsetVolumeChangeListener');
            error.name = 'Fail';
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('toast.tvaudiocontrol', module.exports);
