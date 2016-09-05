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

var currentMediaState = null;

var containerElem = null;

var mediaObjects = {};

var sourceElem = null;

var containerStylecallbackFnTimer = null;

var mediaId = '';
var mediaSrc = '';

var isDrm = false;
var isOpenFinished = false;
var isPlayCalled = false;

function createVideContainer(id) {
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
        Media.mediaEvent(id,getMediaEventValue(Media._MEDIA_CONTAINER,elem));
    }

    if(window.MutationObserver) {
        containerElem = document.createElement('div');
        containerElem.style.left = '0px';
        containerElem.style.top = '0px';
        containerElem.style.width = '0px';
        containerElem.style.height = '0px';
        containerElem.appendChild(mediaObjects[id]);
        setContainerStyleEventListener(containerElem,containerStyleEventCallback);
    }
    else {
        throw new Error('The platform does not support toast.media');
    }
}

function containerStyleEventCallback(MutationRecordProperty) {
    if(containerStylecallbackFnTimer) {
        clearTimeout(containerStylecallbackFnTimer);
    }
    containerStylecallbackFnTimer = setTimeout(function() {
        if (MutationRecordProperty == 'style') {
            var boundingRect = Util.getBoundingRect(containerElem);
            console.log('media:: DisplayRect left = '+boundingRect.left + '/ top = ' + boundingRect.top + '/ width = ' + boundingRect.width + '/ height = ' + boundingRect.height);

            containerElem.childNodes[0].style.width = boundingRect.width + 'px';
            containerElem.childNodes[0].style.height = boundingRect.height + 'px';
        }
    },0);
}

function getMediaEventValue (type,data) {
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
            'type': type
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

function openMedia(id, src) {

    sourceElem.src = src;

    mediaObjects[id].appendChild(sourceElem);
    mediaObjects[id].load();

    currentMediaState = Media.STATE_IDLE;
    Media.mediaEvent(id, getMediaEventValue(Media.EVENT_STATE, Media.STATE_IDLE));

    isOpenFinished = true;

    if(isPlayCalled === true) {
        mediaObjects[id].play();
        isPlayCalled = false;
    }
}

module.exports = {
    create: function(successCallback, errorCallback, args) {
        var id = args[0];

        console.log('media::create() - id =' + id);

        mediaObjects[id] = document.createElement('video');
        mediaObjects[id].setAttribute('style', 'background-color: black');

        mediaObjects[id].onStalledCB = function () {
            console.log('media::onStalled()');
            Media.mediaEvent(id, getMediaEventValue(Media.EVENT_STATE, Media.STATE_STALLED));
        };
        mediaObjects[id].onEndedCB = function () {
            console.log('media::onEndedCB() - MEDIA_STATE -> IDLE');
            Media.mediaEvent(id, getMediaEventValue(Media.EVENT_ENDED));
        };
        mediaObjects[id].onErrorCB = function () {
            console.log('media::onErrorCB() - MEDIA_ERROR -> ' + event.srcElement.error);
            Media.mediaEvent(id, getMediaEventValue(Media._MEDIA_ERROR, event.srcElement.error));
        };
        mediaObjects[id].onLoadedMetaDataCB = function () {
            Media.mediaEvent(id, getMediaEventValue(Media.EVENT_DURATION, mediaObjects[id].duration * 1000));
        };
        mediaObjects[id].onPlayingCB = function () {
            console.log('media::onPlayingCB() - MEDIA_STATE -> PLAYING');
            Media.mediaEvent(id, getMediaEventValue(Media.EVENT_STATE, Media.STATE_PLAYING));
        };
        mediaObjects[id].onDurationChangeCB = function () {
            console.log('media::onDurationChangeCB() - EVENT_DURATION -> ' + mediaObjects[id].duration * 1000);
            Media.mediaEvent(id, getMediaEventValue(Media.EVENT_DURATION, mediaObjects[id].duration * 1000));
        };
        mediaObjects[id].onTimeUpdateCB = function () {
            console.log('media::onTimeUpdateCB() - EVENT_POSITION -> ' + mediaObjects[id].currentTime * 1000);
            Media.mediaEvent(id, getMediaEventValue(Media.EVENT_POSITION, mediaObjects[id].currentTime * 1000));
        };

        mediaObjects[id].addEventListener('loadedmetadata', mediaObjects[id].onLoadedMetaDataCB);
        mediaObjects[id].addEventListener('ended', mediaObjects[id].onEndedCB);
        mediaObjects[id].addEventListener('timeupdate', mediaObjects[id].onTimeUpdateCB);
        mediaObjects[id].addEventListener('durationchange', mediaObjects[id].onDurationChangeCB);
        mediaObjects[id].addEventListener('playing', mediaObjects[id].onPlayingCB);
        mediaObjects[id].addEventListener('error', mediaObjects[id].onErrorCB);
        mediaObjects[id].addEventListener('stalled', mediaObjects[id].onStalledCB);

        createVideContainer(id);
    },

    open: function(successCallback, errorCallback, args) {
        var id = args[0],
            src = args[1];
        mediaId = id;
        mediaSrc = src;
        isOpenFinished = false;
        console.log('media::open() - id =' + id + ' src =' + src);

        if(isDrm === false) {
            sourceElem = document.createElement('source');
            openMedia(id, src);
        }
    },

    // play
    play: function(successCallback, errorCallback, args) {
        var id = args[0];
        isPlayCalled = true;
        console.log('media::play() - id =' + id);

        var videoChildNodes = mediaObjects[id].childNodes;

        if(isOpenFinished === true) {
            if(videoChildNodes.length === 0) {
                openMedia(id, sourceElem.src);
            }
            else {
                mediaObjects[id].play();
                isPlayCalled = false;
            }
        }
    },

    // Stops the playing media
    stop: function(successCallback, errorCallback, args) {
        var id = args[0];

        mediaObjects[id].pause();
        if (mediaObjects[id].currentTime !== 0) {
            mediaObjects[id].currentTime = 0;
        }
        console.log('media::stop() - MEDIA_STATE -> IDLE');

        mediaObjects[id].removeChild(sourceElem);
        mediaObjects[id].load();

        Media.mediaEvent(id, getMediaEventValue(Media.EVENT_STATE, Media.STATE_IDLE));
        successCallback(mediaObjects[id].currentTime);
    },

    // Seeks to the position in the media
    seekTo: function(successCallback, errorCallback, args) {
        var id = args[0],
            milliseconds = args[1];
        console.log('media::seekTo(): ' + milliseconds);

        mediaObjects[id].currentTime = milliseconds / 1000;
    },

    // Pauses the playing media
    pause: function(successCallback, errorCallback, args) {
        var id = args[0];

        console.log('media::pause() - MEDIA_STATE -> PAUSED');
        mediaObjects[id].pause();
        Media.mediaEvent(id, getMediaEventValue(Media.EVENT_STATE, Media.STATE_PAUSED));
    },

    setDrm: function(successCallback, errorCallback, args) {
        console.log('media::loadDrmClient() - type= ' + args.drmType);

        isDrm = true;

        var appId = webOS.fetchAppId();

        var drmType = args.drmType;
        var clientId;
        var isDrmClientLoaded;

        loadDrmClient();

        function loadDrmClient() {
            webOS.service.request('luna://com.webos.service.drm', {
                method: 'load',
                parameters: {
                    'drmType': drmType,
                    'appId': appId
                },
                onSuccess: function (result) {
                    clientId = result.clientId;
                    isDrmClientLoaded = true;
                    isLoaded();
                    console.log('DRM Client is loaded successfully.');
                },
                onFailure: function (result) {
                    console.log('[' + result.errorCode + ']' + result.errorText);
                }
            });
        }

        function isLoaded() {
            webOS.service.request('luna://com.webos.service.drm', {
                method: 'isLoaded',
                parameters: {
                    appId: appId
                },
                onSuccess: function (result) {
                    sendRightInformation(result.clientId);
                },
                onFailure: function (result) {
                }
            });
        }

        var msg = args.msg;

        var msgType = args.msgType;
        var drmSystemId = args.drmSystemId;
        var sourceType = args.sourceType || 'video/mp4';

        function sendRightInformation(isLoadedclientId) {
            clientId = isLoadedclientId || clientId;
            webOS.service.request('luna://com.webos.service.drm', {
                method: 'sendDrmMessage',
                parameters: {
                    'clientId': clientId,
                    'msgType': msgType,
                    'msg': msg,
                    'drmSystemId': drmSystemId
                },
                onSuccess: function (result) {
                    console.log('sendDrmMessage successded');
                    var mediaOptionObj = JSON.parse(args.mediaOption);
                    mediaOptionObj.option.drm.clientId = clientId;

                    /* jshint undef: false*/
                    var mediaOption = escape(JSON.stringify(mediaOptionObj));
                    sourceElem = document.createElement('source');
                    sourceElem.type = sourceType + ';mediaOption=' + mediaOption;

                    openMedia(mediaId, mediaSrc);
                    isDrm = false;
                },
                onFailure: function (result) {
                    console.log('[' + result.errorCode + ']' + result.errorText);
                    isDrm = false;
                }
            });
        }
    },

    setStreamingProperty: function(successCallback, errorCallback, args) {
        var mediaOptionObj = JSON.parse(args.mediaOption);

        /* jshint undef: false*/
        var mediaOption = escape(JSON.stringify(mediaOptionObj));
        sourceElem.type = 'mediaOption=' + JSON.stringify(mediaOption);
    }
};

require('cordova/exec/proxy').add('toast.Media',module.exports);
