'use strict';
var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

var mediaObjects = null;
var Media = function (src, successCallback, errorCallback, statusCallback){
    if(!mediaObjects){
        argscheck.checkArgs('sSFFF', 'Media', arguments);
        this.id = utils.createUUID();
        mediaObjects = {};
        mediaObjects[this.id] = this;
        this.src = src;
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        this.statusCallback = statusCallback;
        this._containerElem = -1;
        this._duration = -1;
        this._position = -1;
        exec(null, this.errorCallback, 'toast.media', 'create', [this.id, this.src]);
    } else {
        throw Error('Media instance exists already. toast Media supported single instance');
    }
    
};
/**
 * This class provides access to the device media, interfaces to both sound and video
 *
 * @constructor
 * @param src                   The file name or url to play
 * @param successCallback       The callback to be called when the file is done playing.
 *                                  successCallback()
 * @param errorCallback         The callback to be called if there is an error.
 *                                  errorCallback(int errorCode) - OPTIONAL
 * @param statusCallback       The callback to be called when media status has changed.
 *                                  statusCallback(int statusCode) - OPTIONAL
 */
Media.getInstance = function(src, successCallback, errorCallback, statusCallback) {
    if(mediaObjects && typeof mediaObjects == 'object'){
        for(var key in mediaObjects){
            if (mediaObjects.hasOwnProperty(key)){
                return mediaObjects[key];
            }
        }
    } else {
        return new Media(src, successCallback, errorCallback, statusCallback);
    }
};

// Media messages
Media.MEDIA_STATE = 1;
Media.MEDIA_DURATION = 2;
Media.MEDIA_POSITION = 3;
Media.MEDIA_BUFFERINGPROGRESS = 4;
Media.MEDIA_SUBTITLE = 5;
Media.MEDIA_CONTAINER = 6;
Media.MEDIA_ERROR = 9;

// Media states
Media.MEDIA_NONE = 0;
Media.MEDIA_LOADEDMETADATA = 1;
Media.MEDIA_BUFFERINGSTART = 2;
Media.MEDIA_BUFFERINGCOMPLETE = 3;
Media.MEDIA_RUNNING = 4;
Media.MEDIA_PAUSED = 5;
Media.MEDIA_STOPPED = 6;
Media.MEDIA_MSG = ['None', 'LoadedMetaData', 'BufferingStart', 'BufferingComplete', 'Running', 'Paused', 'Stopped'];

Media.prototype.getContainerElem = function() {
    return this._containerElem;
};

Media.prototype.play = function(options){
	exec(null, null, 'toast.media', 'startPlayingVideo', [this.id, this.src, options]);
};

Media.prototype.stop = function() {
	var me = this;
	exec(function() {
		me._position = 0;
	}, this.errorCallback, 'toast.media', 'stopPlayingVideo', [this.id]);
};

Media.prototype.seekTo = function(milliseconds) {
	var me = this;
	exec(function(p) {
		me._position = p;
	}, this.errorCallback, 'toast.media', 'seekToVideo', [this.id, milliseconds]);
};

Media.prototype.pause = function() {
	exec(null, this.errorCallback, 'toast.media', 'pausePlayingVideo', [this.id]);
};

Media.prototype.getDuration = function() {
	return this._duration;
};

Media.prototype.getCurrentPosition = function(success, fail) {
	var me = this;
	exec(function(p) {
		me._position = p;
		success(p);
	}, fail, 'toast.media', 'getCurrentPositionVideo', [this.id]);
};

/**
 * Media has message update.
 * PRIVATE
 *
 * @param msgType       The 'type' of update this is
 * @param value         Use of value is determined by the msgType
 */
Media.onStatus = function(id, msgType, value) {
    var media = mediaObjects[id];
    if(media) {
        switch(msgType) {
            case Media.MEDIA_STATE :
                media.statusCallback && media.statusCallback(value);
                if(value == Media.MEDIA_STOPPED) {
                    media.successCallback && media.successCallback();
                }
                break;
            case Media.MEDIA_DURATION :
                media._duration = value;
                break;
            case Media.MEDIA_ERROR :
                media.errorCallback && media.errorCallback(value);
                break;
            case Media.MEDIA_POSITION :
                media._position = Number(value);
                media.statusCallback && media.statusCallback(Media.MEDIA_POSITION, value);
                break;
            case Media.MEDIA_BUFFERINGPROGRESS :
                media.statusCallback && media.statusCallback(Media.MEDIA_BUFFERINGPROGRESS, value);
                break;
            case Media.MEDIA_SUBTITLE :
                media.statusCallback && media.statusCallback(Media.MEDIA_SUBTITLE, value);
                break;
            case Media.MEDIA_CONTAINER :
                media._containerElem = value;
                break;
            default :
                console.error && console.error('Unhandled Media.onStatus :: ' + msgType);
                break;
        }
    }
    else {
         console.error && console.error('Received Media.onStatus callback for unknown media:: ' + id);
    }
};

module.exports = Media;