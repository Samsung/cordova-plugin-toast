'use strict';
var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

var Media = function (){
    if(!mediaObjects){
        this.id = utils.createUUID();
        mediaObjects = {};
        mediaObjects[this.id] = this;
        this._mediaEventCallBack = {};
        this._containerElem = -1;
        this._duration = -1;
        this._position = -1;
        exec(null, null, 'toast.media', 'create',[this.id]);
    } else {
        throw new RangeError('Media instance exists already. toast Media supported single instance');
    }
};

var mediaObjects = null;
Media.getInstance = function() {
    if(mediaObjects && typeof mediaObjects == 'object'){
        for(var key in mediaObjects){
            if (mediaObjects.hasOwnProperty(key)){
                return mediaObjects[key];
            }
        }
    }
    else {
        return new Media();
    }
};

// Media EventType
Media.EVENT_STATE = 'STATE';
Media.EVENT_DURATION = 'DURATION';
Media.EVENT_POSITION = 'POSITION';
Media.EVENT_BUFFERINGPROGRESS = 'BUFFERINGPROGRESS';
//Media.MEDIA_SUBTITLE = 5;

// Media states
Media.STATE_IDLE = 'IDLE';
Media.STATE_PLAYING = 'PLAYING';
Media.STATE_PAUSED = 'PAUSED';
Media.STATE_STALLED = 'STALLED';
Media.STATE_SEEK = 'SEEK';

Media._MEDIA_CONTAINER = 'CONTAINER';
Media._MEDIA_ERROR = 'ERROR';

Media.prototype.open = function(mediaUrl) {
    argscheck.checkArgs('s', 'Media.open', arguments);
    this.src = mediaUrl;
    exec(null, null, 'toast.media', 'open', [this.id,this.src]);
};

Media.prototype.getContainerElement = function() {
    return this._containerElem;
};

Media.prototype.play = function(){
    exec(null, null, 'toast.media', 'play', [this.id]);
};

Media.prototype.stop = function() {
    var me = this;
    exec(function() {
        me._position = -1;
        me._duration = -1; 
    }, null, 'toast.media', 'stop', [this.id]);
};

Media.prototype.seekTo = function(milliseconds) {
    var me = this;
    exec(function(p) {
        me._position = p;
    }, null, 'toast.media', 'seekTo', [this.id, milliseconds]);
};

Media.prototype.pause = function() {
    exec(null, null, 'toast.media', 'pause', [this.id]);
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

Media.mediaEvent = function(id, value) {
    var media = mediaObjects[id];
    if(media) {
        switch(value.type) {
            case Media.EVENT_STATE :
                media._mediaEventCallBack.onevent && media._mediaEventCallBack.onevent(value);
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
            case Media._MEDIA_CONTAINER :
                media._containerElem = value.data.containerElem;
                break;
            case Media._MEDIA_ERROR :
                media._mediaEventCallBack.onerror && media._mediaEventCallBack.onerror(value);
                break;    
            default :
                console.error && console.error('Unhandled Media.mediaEvent :: ' + value.type);
                break;
        }
    }
    else {
         console.error && console.error('Received Media.onStatus callback for unknown media:: ' + id);
    }
};

module.exports = Media;