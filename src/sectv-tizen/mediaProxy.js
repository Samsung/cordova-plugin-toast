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

var Media = require('cordova-plugin-toast.Media');
var Util = require('cordova-plugin-toast.util');
var Urlutil = require('cordova/urlutil');

var avplayState = {
    NONE: 'NONE',
    IDLE: 'IDLE',
    READY: 'READY',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED'
};
var containerElem = null;

function createVideoContainer(id) {
    function setContainerStyleEventListener(elem,callback) {
        var containerObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(e) {
                callback.call(e.target, e.attributeName);
            });
        });
        containerObserver.observe(elem, {
            childList: false,
            subtree: false,
            attributes: true
        });
    }

    function setContainerAppendEventListener(callback) {
        var bodyObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(e) {
                callback.call(e.target, e);
            });
        });
        bodyObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false
        });
    }

    containerElem = document.createElement('div');
    containerElem.style.left = '0px';
    containerElem.style.top = '0px';
    containerElem.style.width = '0px';
    containerElem.style.height = '0px';
    containerElem.innerHTML = '<OBJECT type="application/avplayer" style="width:0px; height:0px;"></OBJECT>';
    Media.mediaEvent(id,getMediaEventVaule(Media._MEDIA_CONTAINER,containerElem));

    if(window.MutationObserver) {
        setContainerStyleEventListener(containerElem,containerStyleEventCallback);
        setContainerAppendEventListener(containerAppendEventCallback);
    }
}

var containerStylecallbackFnTimer = null;
function containerStyleEventCallback(MutationRecordProperty) {
    if(containerStylecallbackFnTimer) {
        clearTimeout(containerStylecallbackFnTimer);
    }
    containerStylecallbackFnTimer = setTimeout(function() {
        if (MutationRecordProperty == 'style' && containerElem.childNodes[0]) {
            console.log('media::container style changed');

            var boundingRect = Util.getBoundingRect(containerElem);
            console.log('media:: DisplayRect left = '+boundingRect.left + ' | top = ' + boundingRect.top + ' | width = ' + boundingRect.width + ' | height = ' + boundingRect.height);

            containerElem.childNodes[0].style.width = boundingRect.width + 'px';
            containerElem.childNodes[0].style.height = boundingRect.height + 'px';
            setAvplayVideoRect(boundingRect);
        }
    },0);
}

var containerAppendcallbackFnTimer = null;
function containerAppendEventCallback(MutationRecordProperty) {
    if(containerAppendcallbackFnTimer) {
        clearTimeout(containerAppendcallbackFnTimer);
    }

    containerAppendcallbackFnTimer = setTimeout(function() {
        if (MutationRecordProperty.addedNodes.length > 0) {
            if(hasContainerElem(MutationRecordProperty.addedNodes)) {
                console.log('media::container append');

                var boundingRect = Util.getBoundingRect(containerElem);
                console.log('media:: DisplayRect left = '+boundingRect.left + ' | top = ' + boundingRect.top + ' | width = ' + boundingRect.width + ' | height = ' + boundingRect.height);

                setAvplayVideoRect(boundingRect);
            }
        }
    },0);

    function hasContainerElem(nodes) {
        for(var i = 0; i < nodes.length; i++) {
            if(containerElem === nodes[i] || Util.isChildOf(containerElem,nodes[i])) {
                return true;
            }
        }
        return false;
    }
}

function setAvplayVideoRect(rect) {
    var avplayBaseWidth = 1920; // Base resolution of avplay
    var ratio = avplayBaseWidth / window.document.documentElement.clientWidth; // Calculate ratio as base resolution
    var videoRect = {};

    if(rect && (rect.left > 0 || rect.top > 0 || rect.width > 0 || rect.height > 0)) {
        try {
            videoRect.left = rect.left * ratio; // Convert rect as base resolution
            videoRect.top = rect.top * ratio;
            videoRect.width = rect.width * ratio;
            videoRect.height = rect.height * ratio;

            var state = webapis.avplay.getState();
            if(state == avplayState.IDLE || state == avplayState.PAUSED || state == avplayState.PLAYING || state ==avplayState.READY) {
                webapis.avplay.setDisplayRect(Math.ceil(Number(videoRect.left)),Math.ceil(Number(videoRect.top)),Math.ceil(Number(videoRect.width)),Math.ceil(Number(videoRect.height)));
            }
        }
        catch (e) {
            console.log('[Warning]Fail to setDisplayRect' + e);
        }
    }
    else {
        console.log('[Warning] Rect size value is RangeError');
    }
}

var currentMediaState = null;
function getMediaEventVaule (type,data) {
    var reval = {};
    switch(type) {
    case Media.EVENT_STATE :
        reval = {
            'type': type,
            'data': {
                'state': data,
                'oldState': currentMediaState
            }
        };
        currentMediaState = data;
        break;
    case Media.EVENT_DURATION :
        reval = {
            'type': type,
            'data': {
                'duration': data
            }
        };
        break;
    case Media.EVENT_POSITION :
        reval = {
            'type': type,
            'data': {
                'position': data
            }
        };
        break;
    case Media.EVENT_BUFFERINGPROGRESS :
        reval = {
            'type': type,
            'data': {
                'bufferingPercentage': data
            }
        };
        break;
    case Media.EVENT_ENDED :
        reval = {
            'type': type,
            'data': {}
        };
        break;
    case Media._MEDIA_CONTAINER :
        reval = {
            'type': type,
            'data': {
                'containerElem': data
            }
        };
        break;
    case Media._MEDIA_ERROR :
        reval = {
            'type': type,
            'data': data
        };
        break;
    }
    return reval;
}

function setScreenSaver(state) {
    if(state.toLowerCase() === 'on') {
        try {
            webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON, function() {
                console.log('media:: success to screenSaver ON');
            },
            function() {
                console.log('media:: fail to screenSaver ON');
            });
        }
        catch (e) {
            console.log('media :: error to screenSaver ON = ' + e.code);
        }
    }
    else if(state.toLowerCase() === 'off') {
        try {
            webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF, function() {
                console.log('media:: success to screenSaver OFF');
            },
            function() {
                console.log('media:: fail to screenSaver OFF');
            });
        }
        catch (e) {
            console.log('media :: error to screenSaver OFF = ' + e.code);
        }
    }
}

var bBlockTimeUpdate = false;

module.exports = {
    create: function(successCallback, errorCallback, args) {
        var id = args[0];
        console.log('media::create() - id =' + id);
        createVideoContainer(id);
    },

    open: function(successCallback, errorCallback, args) {
        var id = args[0],
            src = args[1],
            absoluteUrl = Urlutil.makeAbsolute(args[1]),
            state = null;

        console.log('media::open() - id =' + id + ' src = ' + src);

        var boundingRect = Util.getBoundingRect(containerElem);

        if(!Util.isRemoteUrl(absoluteUrl)) {
            src = absoluteUrl.replace(/^file:\/\//,'');
        }

        state = webapis.avplay.getState();

        if(state !== avplayState.NONE && state !== avplayState.IDLE) {
            webapis.avplay.stop();
            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_IDLE));
            bBlockTimeUpdate = false;
        }

        if(window.webapis) {
            webapis.avplay.open(src);
            setAvplayVideoRect(boundingRect);
            webapis.avplay.setListener({
                onbufferingstart: function() {
                    console.log('media::onStalled()');
                    bBlockTimeUpdate = true;
                    Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_STATE,Media.STATE_STALLED));
                },
                onbufferingprogress: function(percent) {
                    console.log('media::Buffering progress data: ' + percent);
                    Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_BUFFERINGPROGRESS,percent));
                },
                onbufferingcomplete: function() {
                    console.log('media::Buffering complete.');
                    bBlockTimeUpdate = false;
                    state = webapis.avplay.getState();
                    if(state !== 'READY') {
                        Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_STATE,state));
                    }
                    Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_POSITION,webapis.avplay.getCurrentTime()));
                },
                onstreamcompleted: function(currentTime) {
                    console.log('media::ended()');
                    Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_ENDED));
                },
                oncurrentplaytime: function(currentTime) {
                    state = webapis.avplay.getState();
                    if(!bBlockTimeUpdate && (state == avplayState.PLAYING || state == avplayState.PAUSED)) {
                        console.log('media::Current playtime: ' + currentTime);
                        Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_POSITION,currentTime));
                    }
                },
                onevent: function(eventType, eventData) {
                    console.log('media::Event type error: ' + eventType + ', eventData: ' + eventData);
                },
                onerror: function(errorData) {
                    console.log('media::Event type error: ' + errorData);
                    Media.mediaEvent(id,getMediaEventVaule(Media._MEDIA_ERROR,errorData));
                },
                onsubtitlechange: function(duration, text, data1, data2) {
                    console.log('media::Subtitle Changed.');
                },
                ondrmevent: function(drmEvent, drmData) {
                    console.log('media::DRM callback: ' + drmEvent + ', data: ' + drmData);
                }
            });
            currentMediaState = Media.STATE_IDLE;
            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_IDLE));
        }
    },

    // Start playing the media
    play: function(successCallback, errorCallback, args) {
        var id = args[0];

        console.log('media::play() - id =' + id);
        if(webapis.avplay.getState() == avplayState.IDLE) {
            webapis.avplay.prepareAsync(function() {
                webapis.avplay.play();
                setScreenSaver('off');
                Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_PLAYING));
                var duration = webapis.avplay.getDuration();
                console.log('media:: duration = '+duration);
                Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_DURATION,duration));
            });
        }
        else {
            webapis.avplay.play();
            setScreenSaver('off');
            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_PLAYING));
        }
    },

    // Stops the playing media
    stop: function(successCallback, errorCallback, args) {
        var id = args[0];
        console.log('media::stop() - EVENT_STATE -> IDLE');
        webapis.avplay.stop();
        Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_IDLE));
        successCallback();
        bBlockTimeUpdate = false;
        setScreenSaver('on');
    },

    // Seeks to the position in the media
    seekTo: function(successCallback, errorCallback, args) {
        //var id = args[0];
        var milliseconds = args[1];

        console.log('media::seekTo()');
        webapis.avplay.seekTo(milliseconds,function() {
            successCallback(webapis.avplay.getCurrentTime());
        },function(e) {
            throw Error('Failed to seekTo');
        });
        bBlockTimeUpdate = true;
    },

    // Pauses the playing media
    pause: function(successCallback, errorCallback, args) {
        var id = args[0];
        console.log('media::pause() - EVENT_STATE -> PAUSED');

        webapis.avplay.pause();
        Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_PAUSED));
        setScreenSaver('on');
    },

    setStreamingProperty: function(successCallback, errorCallback, args) {
        console.log('media::setStreamingProperty() - type= '+args[0]);

        webapis.avplay.setStreamingProperty.apply(webapis.avplay, args);
    },

    setDrm: function(successCallback, errorCallback, args) {
        console.log('media::setDrm() - type= '+args[0]);

        webapis.avplay.setDrm.apply(webapis.avplay, args);
    }
};

require('cordova/exec/proxy').add('toast.Media',module.exports);
