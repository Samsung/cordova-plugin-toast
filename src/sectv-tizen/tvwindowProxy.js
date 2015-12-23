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

var windowType = 'MAIN';

module.exports = {
    setSource: function (success, fail, args) {
        try {
            var match = -1;

            tizen.systeminfo.getPropertyValue('VIDEOSOURCE', function (videoSource) {
                var connectedVideoSources = videoSource.connected;
                for (var i = 0; i < connectedVideoSources.length; i++) {
                    if (args[0].type == connectedVideoSources[i].type && args[0].number == connectedVideoSources[i].number) {
                        match = i;
                        break;
                    }
                }

                if (match != -1) {
                    tizen.tvwindow.setSource(connectedVideoSources[match], success, fail, windowType);
                }
                else {
                    setTimeout(function () {
                        fail(new Error('Fail to find source.'));
                    }, 0);
                }
            });

        }
        catch (e) {
            fail(e);
        }
    },
    getSource: function (success, fail, args) {
        try {
            var sourceInfo = tizen.tvwindow.getSource(windowType);

            setTimeout(function () {
                success(sourceInfo);
            }, 0);
        }
        catch (e) {
            fail(e);
        }
    },
    show: function (success, fail, args) {
        var rect = [];

        rect[0] = args[0][0] + 'px';
        rect[1] = args[0][1] + 'px';
        rect[2] = args[0][2] + 'px';
        rect[3] = args[0][3] + 'px';

        try {
            tizen.tvwindow.show(success, fail, rect, windowType);
        }
        catch (e) {
            fail(e);
        }
    },
    hide: function (success, fail, args) {
        try {
            tizen.tvwindow.hide(success, fail, windowType);
        }
        catch (e) {
            fail(e);
        }
    },
    getRect: function (success, fail, args) {
        try {
            tizen.tvwindow.getRect(success, fail, 'px', windowType);
        }
        catch (e) {
            fail(e);
        }
    }
};

require('cordova/exec/proxy').add('toast.tvwindow', module.exports);
