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

var mediaObjects = null;

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
        exec(null, null, 'toast.Media', 'create',[this.id]);
    }
    else {
        throw new RangeError('Media instance exists already. toast Media supported single instance');
    }
};

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
            if(media._mediaEventCallBack.onevent && value.data.oldState === null) {
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
