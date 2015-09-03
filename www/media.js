'use strict';
var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var mediaObjects = null;
var Media = function (){
    // Media messages
    this.MEDIA_STATE = 1;
    this.MEDIA_DURATION = 2;
    this.MEDIA_POSITION = 3;
    this.MEDIA_BUFFERINGPROGRESS = 4;
    this.MEDIA_SUBTITLE = 5;
    this.MEDIA_ERROR = 9;

    // Media states
    this.MEDIA_NONE = 0;
    this.MEDIA_LOADEDMETADATA = 1;
    this.MEDIA_BUFFERINGSTART = 2;
    this.MEDIA_BUFFERINGCOMPLETE = 3;
    this.MEDIA_RUNNING = 4;
    this.MEDIA_PAUSED = 5;
    this.MEDIA_STOPPED = 6;
    this.MEDIA_MSG = ['None', 'LoadedMetaData', 'BufferingStart', 'BufferingComplete', 'Running', 'Paused', 'Stopped'];

    // Media supported Adaptive Bitrate Streaming type
    this.ABS_TYPE_HLS = 0;
    this.ABS_TYPE_HAS = 1;
    this.ABS_TYPE_SS = 2;
    this.ABS_TYPE_WV = 3;
    this.ABS_TYPE_MSG = ['HLS','HAS','SmoothStreaming','Widevine'];

    // Media supported Digital rights management type
    this.DRM_TYPE_PLAYREADY = 0;
    this.DRM_TYPE_MSG = ['PlayReady'];

    // Media supported 3D Effect mode
    this.EFFECT_3D_TYPE_OFF = 0;
    this.EFFECT_3D_TYPE_TOPNBOTTOM = 1;
    this.EFFECT_3D_TYPE_SIDEBYSIDE = 2;
    this.EFFECT_3D_TYPE_2DTO3D = 3;
    this.EFFECT_3D_TYPE_MSG = ['OFF','TopBottom','SideBySide','2DTo3D'];

    // Media error type
    this.ERR_ABORTED = 1;
    this.ERR_NETWORK = 2;
    this.ERR_DECODE = 3;
    this.ERR_SRC_NOT_SUPPORTED = 4;
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
 * @param msgCallback          The callback to be called when receive message from media(ex. position, subtitleChange etc)
 *                                  msgCallback(int messageType, any messageValue) - OPTIONAL
 */
Media.prototype.create = function(src, successCallback, errorCallback, statusCallback, msgCallback) {
    argscheck.checkArgs('sFFF', 'Media', arguments);
    mediaObjects = this;
    this.src = src;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    this.statusCallback = statusCallback;
    this.msgCallback = msgCallback;
    this._duration = -1;
    this._position = -1;
    exec(null, this.errorCallback, 'toast.media', 'create', this.src);
};

// Media messages
Media.MEDIA_STATE = 1;
Media.MEDIA_DURATION = 2;
Media.MEDIA_POSITION = 3;
Media.MEDIA_BUFFERINGPROGRESS = 4;
Media.MEDIA_SUBTITLE = 5;
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

// Media supported Adaptive Bitrate Streaming type
Media.ABS_TYPE_HLS = 0;
Media.ABS_TYPE_HAS = 1;
Media.ABS_TYPE_SS = 2;
Media.ABS_TYPE_WV = 3;
Media.ABS_TYPE_MSG = ['HLS','HAS','SmoothStreaming','Widevine'];

// Media supported Digital rights management type
Media.DRM_TYPE_PLAYREADY = 0;
Media.DRM_TYPE_MSG = ['PlayReady'];

// Media supported 3D Effect mode
Media.EFFECT_3D_TYPE_OFF = 0;
Media.EFFECT_3D_TYPE_TOPNBOTTOM = 1;
Media.EFFECT_3D_TYPE_SIDEBYSIDE = 2;
Media.EFFECT_3D_TYPE_2DTO3D = 3;
Media.EFFECT_3D_TYPE_MSG = ['OFF','TopBottom','SideBySide','2DTo3D'];

// Media error type
Media.ERR_ABORTED = 1;
Media.ERR_NETWORK = 2;
Media.ERR_DECODE = 3;
Media.ERR_SRC_NOT_SUPPORTED = 4;

Media.prototype.getSupportedABSType = function(){
	return Media.ABS_TYPE_MSG;
};

Media.prototype.getSupportedDRMType = function(){
	return Media.DRM_TYPE_MSG;
};

Media.prototype.getSupported3DType = function(){
	return Media.EFFECT_3D_TYPE_MSG;
};

Media.prototype.setDisplayRect = function(rect){
    exec(null, null, 'toast.media', 'setVideoDisplayRect', rect);
};

/**
 * Start or resume playing video file.
 *
 * @constructor
 * @param options     the options for playing the specific video(adaptive streaming, drm, 3D) contents. - OPTIONAL
 * @ ex) 
 *    options : {
 *        runningPosition : int milliseconds, // video playback has to be started with runningPosition - OPTIONAL(default 0)
 *        abs : {
 *            type : int type, // Adaptive Bitrate Streaming type (refer Media supported Adaptive Bitrate Streaming type)
 *            data : object data // specitic Adaptive data(ex. BITRATES, STARTBITRATE, SKIPBITRATE) - OPTIONAL
 *        },
 *        drm : {
 *            type : int type, // Digital rights management type (refer Media supported Digital rights management type)
 *            data : object data // specitic DRM data(ex. CustomData, LicenseServer)
 *        },
 *        3D : int type // 3D Effect mode (refer Media supported 3D Effect mode) - OPTIONAL(default Media.3D_TYPE_OFF)
 *    }
 */

Media.prototype.play = function(options){
	exec(null, null, 'toast.media', 'startPlayingVideo', [this.src, options]);
};

Media.prototype.stop = function() {
	var me = this;
	exec(function() {
		me._position = 0;
	}, null, 'toast.media', 'stopPlayingVideo', null);
};

Media.prototype.seekTo = function(milliseconds) {
	var me = this;
	exec(function(p) {
		me._position = p;
	}, null, 'toast.media', 'seekToVideo', milliseconds);
};

Media.prototype.pause = function() {
	exec(null, null, 'toast.media', 'pausePlayingVideo', null);
};

Media.prototype.getDuration = function() {
	return this._duration;
};

Media.prototype.getCurrentPosition = function(success, fail) {
	var me = this;
	exec(function(p) {
		me._position = p;
		success(p);
	}, fail, 'toast.media', 'getCurrentPositionVideo', null);
};

/**
 * Media has message update.
 * PRIVATE
 *
 * @param msgType       The 'type' of update this is
 * @param value         Use of value is determined by the msgType
 */
Media.onStatus = function(msgType, value) {
    var media = mediaObjects;
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
                media.msgCallback && media.msgCallback(Media.MEDIA_POSITION, value);
                break;
            case Media.MEDIA_BUFFERINGPROGRESS :
                media.msgCallback && media.msgCallback(Media.MEDIA_BUFFERINGPROGRESS, value);
                break;
            case Media.MEDIA_SUBTITLE :
                media.msgCallback && media.msgCallback(Media.MEDIA_SUBTITLE, value);
                break;    
            default :
                console.error && console.error('Unhandled Media.onStatus :: ' + msgType);
                break;
        }
    }
    else {
         console.error && console.error('Received Media.onStatus callback for unknown media');
    }
};

module.exports = new Media();