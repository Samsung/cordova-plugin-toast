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
    utils = require('cordova/utils'),
    exec = require('cordova/exec');
var Util = require('cordova-plugin-toast.util');

var mediaObjects = null;
var containerElem = null;
var boundingRect = null;

var Media = function () {
    if(!mediaObjects) {
        this.id = utils.createUUID();
        mediaObjects = {};
        mediaObjects[this.id] = this;
        this._mediaEventCallBack = {};
        this._containerElem = -1;
        this._duration = -1;
        this._position = 0;
        this._hooks = {};

        setOnMessageChannel();
        createVideoContainer(this.id);
        exec(null, null, 'toast.Media', 'create',[this.id]);
    }
    else {
        throw new RangeError('Media instance exists already. toast Media supported single instance');
    }
};
function setOnMessageChannel(){
    if (cordova.platformId === 'android') {
        var channel = require('cordova/channel');

        channel.createSticky('onMediaPluginReady');
        channel.waitForInitialization('onMediaPluginReady');

        channel.onCordovaReady.subscribe(function() {
            exec(onMessageFromNative, undefined, 'toast.Media', 'messageChannel', []);
            channel.initializationComplete('onMediaPluginReady');
        });
    }
}

/**********************************************
 * Native(Java) -> JS
 * msgFromNative = {
        "action" : "status",
        "status" : {
            "id" : Media.id,
            "mediaEventValue" : {
                "type" : Media EventType("STATE"/"ENDED"/"ERROR"/"POSITION"/"BUFFERINGPROGRESS"),
                "data" : 상태 값, duration 값, position 값 등 toast 스펙에 맞게 셋팅 후 전달.
            }
        }
    }
 * event의 통로를 통해 들어오는 JSON 형태의 data.
 **********************************************/
function onMessageFromNative(msgFromNative) {
    if (msgFromNative.action == 'status') {
        Media.mediaEvent(msgFromNative.status.id, msgFromNative.status.mediaEventValue);
    } else {
        throw new Error('Unknown media action : ' + msgFromNative.action);
    }
}

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

    var reval = {
        'type': Media._MEDIA_CONTAINER,
        'data': {
            'containerElem': containerElem
        }
    };
    Media.mediaEvent(id,reval);

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

            boundingRect = Util.getBoundingRect(containerElem);
            console.log('media:: DisplayRect left = '+ boundingRect.left + ' | top = ' + boundingRect.top + ' | width = ' + boundingRect.width + ' | height = ' + boundingRect.height);

            containerElem.childNodes[0].style.width = boundingRect.width + 'px';
            containerElem.childNodes[0].style.height = boundingRect.height + 'px';

            // conveting rect for Native
            var videoBaseWidth = window.screen.width * window.devicePixelRatio;
            var ratio = videoBaseWidth / window.document.documentElement.clientWidth;

            var boundingRectforNative = {
                left: boundingRect.left * ratio,
                top: boundingRect.top * ratio,
                width: boundingRect.width * ratio,
                height: boundingRect.height * ratio
            };

            exec(null, null, 'toast.Media', 'changeViewSize', [boundingRectforNative]);
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

                boundingRect = Util.getBoundingRect(containerElem);
                console.log('media:: DisplayRect left = '+boundingRect.left + ' | top = ' + boundingRect.top + ' | width = ' + boundingRect.width + ' | height = ' + boundingRect.height);

                // conveting rect for Native
                var videoBaseWidth = window.screen.width * window.devicePixelRatio;
                var ratio = videoBaseWidth / window.document.documentElement.clientWidth;
                
                var boundingRectforNative = {
                    left: boundingRect.left * ratio,
                    top: boundingRect.top * ratio,
                    width: boundingRect.width * ratio,
                    height: boundingRect.height * ratio
                };

                exec(null, null, 'toast.Media', 'changeViewSize', [boundingRectforNative]);
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

// Media EventType
Media.EVENT_STATE = 'STATE';
Media.EVENT_DURATION = 'DURATION';
Media.EVENT_POSITION = 'POSITION';
Media.EVENT_BUFFERINGPROGRESS = 'BUFFERINGPROGRESS';
Media.EVENT_SUBTITLE = 'SUBTITLE';
Media.EVENT_ENDED = 'ENDED';

//Media.MEDIA_SUBTITLE = 5;

// Media states
Media.STATE_IDLE = 'IDLE';
Media.STATE_PLAYING = 'PLAYING';
Media.STATE_PAUSED = 'PAUSED';
Media.STATE_STALLED = 'STALLED';
Media.STATE_SEEK = 'SEEK';

Media._MEDIA_CONTAINER = 'CONTAINER';
Media._MEDIA_ERROR = 'ERROR';

Media.mediaEvent = function(id, value) {
    var media = mediaObjects[id];
    if(media) {
        switch(value.type) {
        case Media.EVENT_STATE :
            if(media._mediaEventCallBack.onevent && value.data.oldState === 'null') {
                media._mediaEventCallBack.onevent(value);
            }
            else if(media._mediaEventCallBack.onevent && value.data.oldState !== value.data.state) {
                media._mediaEventCallBack.onevent(value);
            }
            break;
        case Media.EVENT_DURATION :
            media._duration = value.data.duration;
            media._mediaEventCallBack.onevent && media._mediaEventCallBack.onevent(value);
            break;
        case Media.EVENT_POSITION :
            media._position = Number(value.data.position);
            media._mediaEventCallBack.onevent && media._mediaEventCallBack.onevent(value);
            break;
        case Media.EVENT_BUFFERINGPROGRESS :
            media._mediaEventCallBack.onevent && media._mediaEventCallBack.onevent(value);
            break;
        case Media.EVENT_SUBTITLE :
            media._mediaEventCallBack.onevent && media._mediaEventCallBack.onevent(value);
            break;
        case Media.EVENT_ENDED :
            media.stop();
            media._mediaEventCallBack.onevent && media._mediaEventCallBack.onevent(value);
            break;
        case Media._MEDIA_CONTAINER :
            media._containerElem = value.data.containerElem;
            break;
        case Media._MEDIA_ERROR :
            media._mediaEventCallBack.onerror && media._mediaEventCallBack.onerror(value);
            break;
        default :
            console.log('Unhandled Media.mediaEvent :: ' + value.type);
            break;
        }
    }
    else {
        console.log('Received Media.onStatus callback for unknown media:: ' + id);
    }
};

Media.getInstance = function() {
    if(mediaObjects && typeof mediaObjects == 'object') {
        for(var key in mediaObjects) {
            if (mediaObjects.hasOwnProperty(key)) {
                return mediaObjects[key];
            }
        }
    }
    else {
        return new Media();
    }
};

Media.prototype.open = function(mediaUrl) {
    argscheck.checkArgs('s', 'Media.open', arguments);
    this.src = mediaUrl;
    invokeHooks('beforeopen', [this].concat(arguments));
    exec(null, null, 'toast.Media', 'open', [this.id,this.src]);
    invokeHooks('afteropen', [this].concat(arguments));
};

Media.prototype.getContainerElement = function() {
    return this._containerElem;
};

Media.prototype.play = function() {
    invokeHooks('beforeplay', [this].concat(arguments));
    exec(null, null, 'toast.Media', 'play', [this.id]);
    invokeHooks('afterplay', [this].concat(arguments));
};

Media.prototype.stop = function() {
    var me = this,
        media = mediaObjects[this.id];
    media.resetPlugin();
    exec(function() {
        me._position = 0;
        me._duration = -1;
    }, null, 'toast.Media', 'stop', [this.id]);
};

Media.prototype.seekTo = function(milliseconds) {
    argscheck.checkArgs('n', 'Media.seekTo', arguments);
    var me = this;
    exec(function(p) {
        me._position = p;
    }, null, 'toast.Media', 'seekTo', [this.id, milliseconds]);
};

Media.prototype.pause = function() {
    exec(null, null, 'toast.Media', 'pause', [this.id]);
};

Media.prototype.getDuration = function() {
    return this._duration;
};

Media.prototype.getCurrentPosition = function() {
    return this._position;
};

Media.prototype.setListener = function(listener) {
    argscheck.checkArgs('o', 'Media.setListener', arguments);
    if(arguments[0].onevent && typeof arguments[0].onevent !== 'function') {
        throw new TypeError('Type of listener.onevnet is not function');
    }
    if(arguments[0].onerror && typeof arguments[0].onerror !== 'function') {
        throw new TypeError('Type of listener.onerror is not function');
    }
    mediaObjects[this.id]._mediaEventCallBack = listener;
};

Media.prototype.unsetListener = function() {
    mediaObjects[this.id]._mediaEventCallBack = {};
};

Media.prototype.resetHook = function () {
    for(var hook in this._hooks) {
        if(this._hooks.hasOwnProperty(hook)) {
            for(var i=this._hooks[hook].length-1; i>=0; i--) {
                delete this._hooks[hook][i];
            }
            delete this._hooks[hook];
        }
    }
    this._hooks = {};
};
Media.prototype.registerHook = function (hook, fn) {
    this._hooks[hook] = this._hooks[hook] || [];
    this._hooks[hook].push(fn);
};
Media.prototype.unregisterHook = function (hook, fn) {
    if(!this._hooks[hook]) {
        return;
    }
    for(var i=this._hooks[hook].length-1; i>=0; i--) {
        if(this._hooks[hook][i] === fn) {
            this._hooks[hook].splice(i, 1);
        }
    }
};
Media.prototype.resetPlugin = function () {
    this.resetHook();
};
Media.prototype.attachPlugin = function (plugin) {
    if(plugin.onAttachToMedia) {
        plugin.onAttachToMedia(this);
    }
};

//synchronize VideoRect With Container Element
Media.prototype.syncVideoRect = function() {
    var me = this;
    exec(function(p) {
        me._position = p;
    }, null, 'toast.Media', 'syncVideoRect');
};

Media.prototype.setSubtitlePath = function(path) {
    argscheck.checkArgs('s', 'Media.setSubtitlePath', arguments);
    exec(null, null, 'toast.Media', 'setSubtitlePath',[this.id,path]);
};

Media.prototype.getSubtitleLanguageList = function(successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'Media.getSubtitleLanguageList', arguments);
    errorCallback = errorCallback || function () {};
    exec(successCallback, errorCallback, 'toast.Media', 'getSubtitleLanguageList',[this.id]);
};

Media.prototype.setSubtitleLanguage = function(language) {
    argscheck.checkArgs('s', 'Media.setSubtitleLanguage', arguments);
    exec(null, null, 'toast.Media', 'setSubtitleLanguage',[this.id,language]);
};

Media.prototype.setSubtitleSync = function(milliseconds) {
    argscheck.checkArgs('n', 'Media.setSubtitleSync', arguments);
    exec(null, null, 'toast.Media', 'setSubtitleSync',[this.id,milliseconds]);
};

function invokeHooks (hook, args) {
    var media = args[0];
    args = args.slice(1);
    if(!media._hooks[hook]) {
        return;
    }
    for(var i=0; i<media._hooks[hook].length; i++) {
        media._hooks[hook][i](media, args);
    }
}

module.exports = Media;
