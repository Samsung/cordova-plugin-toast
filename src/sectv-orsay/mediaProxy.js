'use strict';

var Media = require('cordova-plugin-toast.Media');
var SEFPlayer = require('cordova/plugin/SEF');
var Util = require('cordova-plugin-toast.util');

var containerElem = null;

function createVideContainer(id){
    function setContainerStyleEventListener(elem,callback) {
        var containerObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(e) {
                callback.call(e.target, e.attributeName);
            });
        });

        containerObserver.observe(elem, {
            childList : false,
            subtree: false,
            attributes: true
        });
        Media.mediaEvent(id,getMediaEventVaule(Media._MEDIA_CONTAINER,elem));
    }

    function setContainerAppendEventListener(callback) {
        var bodyObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(e) {
                callback.call(e.target, e);
            });
        });
        bodyObserver.observe(document.body, {
            childList : true,
            subtree : true,
            attributes: false
        });
    }

    if(window.MutationObserver) {
        containerElem = document.createElement('div');
        containerElem.style.left = '0px';
        containerElem.style.top = '0px';
        containerElem.style.width = '0px';
        containerElem.style.height = '0px';
        containerElem.innerHTML = '<OBJECT classid="clsid:SAMSUNG-INFOLINK-SEF" style="display:block;position:absolute;width:0px;height:0px;"></OBJECT>';
        setContainerStyleEventListener(containerElem,containerStyleEventCallback);
        setContainerAppendEventListener(containerAppendEventCallback);
    }
    else {
        throw new Error('The platform does not support toast.media');
    }
}

var containerStylecallbackFnTimer = null;
function containerStyleEventCallback(MutationRecordProperty) {
    if(containerStylecallbackFnTimer){
        clearTimeout(containerStylecallbackFnTimer);
    }

    if(containerAppendcallbackFnTimer){
        clearTimeout(containerAppendcallbackFnTimer);
    }

    containerStylecallbackFnTimer = setTimeout(function(){
        if (MutationRecordProperty == 'style'){
            if(containerElem.childNodes[0]){
                containerElem.childNodes[0].style.width = containerElem.style.width;
                containerElem.childNodes[0].style.height = containerElem.style.height;
                setAvplayVideoRect(containerElem);
            }
        }
    },0);
}

var containerAppendcallbackFnTimer = null;
function containerAppendEventCallback(MutationRecordProperty){
    if(containerAppendcallbackFnTimer){
        clearTimeout(containerAppendcallbackFnTimer);
    }

    if(containerStylecallbackFnTimer){
        clearTimeout(containerStylecallbackFnTimer);
    }

    containerAppendcallbackFnTimer = setTimeout(function(){
        if (MutationRecordProperty.addedNodes.length > 0) {
            console.log('addedNodes.............');
            if(hasContainerElem(MutationRecordProperty.addedNodes)){
                if(containerElem.childNodes[0]){
                    containerElem.childNodes[0].style.width = containerElem.style.width;
                    containerElem.childNodes[0].style.height = containerElem.style.height;
                    setAvplayVideoRect(containerElem);
                }
            }
        }
    },0);

    function hasContainerElem(nodes){
        for(var i = 0; i < nodes.length; i++){
            if(containerElem === nodes[i] || Util.isChildOf(containerElem,nodes[i])){
                return true;
            }
        }
        return false;
    }
}

function getFitDisplayRect(element,videoResolution){
    var boundingRect = Util.getBoundingRect(element);
    var FRAME_LEFT = boundingRect.left,
        FRAME_TOP = boundingRect.top,
        FRAME_WIDTH = boundingRect.width,
        FRAME_HEIGHT = boundingRect.height,
        nLeft,
        nTop,
        nWidth,
        nHeight,
        fnRound = Math.round;

    console.log('boundingRect.left.............'+boundingRect.left);
    console.log('boundingRect.top.............'+boundingRect.top);
    console.log('boundingRect.width.............'+boundingRect.width);
    console.log('boundingRect.height.............'+boundingRect.height);

    if(videoResolution.width && videoResolution.width > 0 && videoResolution.height && videoResolution.height > 0){
        if (videoResolution.width / videoResolution.height > FRAME_WIDTH / FRAME_HEIGHT) {
            nHeight = fnRound((FRAME_WIDTH * videoResolution.height) / videoResolution.width);
            nWidth = FRAME_WIDTH;
        }
        else {
             nWidth = fnRound((FRAME_HEIGHT * videoResolution.width) / videoResolution.height);
             nHeight = FRAME_HEIGHT;
        }

        nLeft = FRAME_LEFT + fnRound((FRAME_WIDTH - nWidth) / 2);
        nTop = FRAME_TOP + fnRound((FRAME_HEIGHT - nHeight) / 2);
    }
    else {
        nLeft = FRAME_LEFT;
        nTop = FRAME_TOP;
        nWidth = videoResolution.width;
        nHeight = videoResolution.height;
    }

    console.log('fitDisplayRect.left.............'+nLeft);
    console.log('fitDisplayRect.top.............'+nTop);
    console.log('fitDisplayRect.width.............'+nWidth);
    console.log('fitDisplayRect.height.............'+nHeight);

    return {
        'left' : nLeft,
        'top' : nTop,
        'width' : nWidth,
        'height' : nHeight
    };
}

function getVideoResolution() {
    var reval = mediaObjects[currentMediaInfo.id].Execute('GetVideoResolution');
    var videoWidth = 0;
    var videoHeight = 0;
    console.log('videoResolution.............'+reval);
    if (typeof reval == 'string') {
        reval = reval.split('|');
        videoWidth = reval[0];
        videoHeight = reval[1];
    }
    return {
        'width' : Number(videoWidth),
        'height' : Number(videoHeight)
    };
}

function setAvplayVideoRect(element){
    var videoResolution = getVideoResolution();
    var FitRect = getFitDisplayRect(element,videoResolution);

    try{
        if(mediaObjects[currentMediaInfo.id]){
            mediaObjects[currentMediaInfo.id].Execute('SetDisplayArea',Number(FitRect.left),Number(FitRect.top),Number(FitRect.width),Number(FitRect.height),curWidget.height);
        }
    }
    catch (e){
        console.log('[Warning]Fail to setDisplayRect' + e);
    }
}

function getMediaEventVaule (type,data) {
    var reval = {};
    switch(type){
    case Media.EVENT_STATE :
        reval = {
            'type' : type,
            'data' : {
                'state' : data,
                'oldState' : currentMediaInfo.state
            }
        };
        currentMediaInfo.state = data;
        break;
    case Media.EVENT_DURATION :
        reval = {
            'type' : type,
            'data' : {
                'duration' : data
            }
        };
        break;
    case Media.EVENT_POSITION :
        reval = {
            'type' : type,
            'data' : {
                'position' : data
            }
        };
        break;
    case Media.EVENT_BUFFERINGPROGRESS :
         reval = {
            'type' : type,
            'data' : {
                'bufferingPercentage' : data
            }
        };
        break;
    case Media._MEDIA_CONTAINER :
        reval = {
            'type' : type,
            'data' : {
                'containerElem' : data
            }
        };
        break;
    case Media._MEDIA_ERROR :
        reval = {
            'type' : type,
            'data' : data
        };
        break;
    }
    return reval;
}

var mediaObjects = {
    //Error
    CONNECTION_FAILED: 1,
    AUTHENTICATION_FAILED: 2,
    STREAM_NOT_FOUND: 3,
    NETWORK_DISCONNECTED: 4,
    NETWORK_SLOW: 5,
    RENDER_ERROR: 6,
    RENDERING_START: 7,

    STREAM_COMPLETED: 8,
    LOADED_METADATA: 9,
    BUFFERING_START: 11,
    BUFFERING_COMPLETE: 12,
    BUFFERING_PROGRESS: 13,
    CURRENT_PLAYTIME: 14,
    SUBTITLE: 19
};

function mediaEventListener(type,data1,data2){
    console.log('mediaEventListener : ('+type+','+data1+','+data2+')');
    switch(type){
    case mediaObjects.LOADED_METADATA :
        var duration = mediaObjects[currentMediaInfo.id].Execute('GetDuration');
        currentMediaInfo.duration = duration;
        Media.mediaEvent(currentMediaInfo.id,getMediaEventVaule(Media.EVENT_DURATION,Number(duration)));
        setAvplayVideoRect(containerElem);
        break;
    case mediaObjects.BUFFERING_START :
        console.log('media::onStalled()');
        currentMediaInfo.oldState = currentMediaInfo.state;
        Media.mediaEvent(currentMediaInfo.id,getMediaEventVaule(Media.EVENT_STATE,Media.STATE_STALLED));
        break;
    case mediaObjects.BUFFERING_PROGRESS :
        console.log('Buffering progress data : ' + data1);
        Media.mediaEvent(currentMediaInfo.id,getMediaEventVaule(Media.EVENT_BUFFERINGPROGRESS,Number(data1)));
        break;
    case mediaObjects.BUFFERING_COMPLETE :
        if(currentMediaInfo.oldState == Media.STATE_PLAYING){
            Media.mediaEvent(currentMediaInfo.id,getMediaEventVaule(Media.EVENT_STATE,Media.STATE_PLAYING));
        }
        else if(currentMediaInfo.oldState == Media.STATE_PAUSED){
            Media.mediaEvent(currentMediaInfo.id,getMediaEventVaule(Media.EVENT_STATE,Media.STATE_PAUSED));
        }
        currentMediaInfo.oldState = currentMediaInfo.state;
        console.log('Buffering complete.');
        break;
    case mediaObjects.RENDERING_START :
        console.log('Rendering start');
        Media.mediaEvent(currentMediaInfo.id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_PLAYING));
        break;
    case mediaObjects.STREAM_COMPLETED :
        console.log('media::streamcompleted()');
        currentMediaInfo.position = 0;
        mediaObjects[currentMediaInfo.id].Execute('Stop');
        currentMediaInfo.oldState = currentMediaInfo.state;
        Media.mediaEvent(currentMediaInfo.id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_IDLE));
        break;
    case mediaObjects.CURRENT_PLAYTIME :
        console.log('Current playtime: ' + data1);
        currentMediaInfo.position = data1;
        Media.mediaEvent(currentMediaInfo.id,getMediaEventVaule(Media.EVENT_POSITION,Number(data1)));
        break;
    case mediaObjects.SUBTITLE :

        break;
    case mediaObjects.CONNECTION_FAILED :
        console.log('Event type error : ' + data1);
        Media.mediaEvent(currentMediaInfo.id,getMediaEventVaule(Media._MEDIA_ERROR,data1));
        break;
    case mediaObjects.AUTHENTICATION_FAILED :
        console.log('Event type error : ' + data1);
        Media.mediaEvent(currentMediaInfo.id,getMediaEventVaule(Media._MEDIA_ERROR,data1));
        break;
    case mediaObjects.STREAM_NOT_FOUND :
        console.log('Event type error : ' + data1);
        Media.mediaEvent(currentMediaInfo.id,getMediaEventVaule(Media._MEDIA_ERROR,data1));
        break;
    case mediaObjects.NETWORK_DISCONNECTED :
        console.log('Event type error : ' + data1);
        Media.mediaEvent(currentMediaInfo.id,getMediaEventVaule(Media._MEDIA_ERROR,data1));
        break;
    case mediaObjects.NETWORK_SLOW :
        console.log('Event type error : ' + data1);
        Media.mediaEvent(currentMediaInfo.id,getMediaEventVaule(Media._MEDIA_ERROR,data1));
        break;
    case mediaObjects.RENDER_ERROR :
        console.log('Event type error : ' + data1);
        Media.mediaEvent(currentMediaInfo.id,getMediaEventVaule(Media._MEDIA_ERROR,data1));
        break;
    }
}

var currentMediaInfo = {};

function createSEFPlayer(id){
    mediaObjects[id] = SEFPlayer.get('Player');
    mediaObjects[id].OnEvent = function (type,data1,data2) {
        mediaEventListener(type,data1,data2);
    };
}

module.exports = {
    create:function(successCallback, errorCallback, args) {
        var id = args[0];
        console.log('media::create() - id =' + id);
        createSEFPlayer(id);
        currentMediaInfo = {};
        createVideContainer(id);
    },

    open:function(successCallback, errorCallback, args){
        var id = args[0],
            src = args[1];

        console.log('media::open() - id =' + id + ' src = '+src);

        if(mediaObjects[id]){
            currentMediaInfo.id = id;
            currentMediaInfo.src = src;
            currentMediaInfo.position = 0;
            currentMediaInfo.duration = -1;
            currentMediaInfo.state = null;
            currentMediaInfo.oldState = null;
            console.log('currentMediaInfo.oldState '+currentMediaInfo.oldState);
            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_IDLE));
        }
        else {
            throw new Error('Fail to Media open');
        }
    },

    // play
    play:function(successCallback, errorCallback, args) {
        var id = args[0];
        var reval = 0;
        console.log('media::play() - id =' + id);
        if(currentMediaInfo.state == Media.STATE_IDLE){
            reval = mediaObjects[id].Execute('InitPlayer',currentMediaInfo.src);
            reval += mediaObjects[id].Execute('StartPlayback',currentMediaInfo.position);
        }
        else {
            reval = mediaObjects[id].Execute('Resume');
        }
        if(reval > 0){
            console.log('Success to Media play');
        }
        else {
            throw new Error('Fail to Media play');
        }
    },

    // Stops the playing media
    stop:function(successCallback, errorCallback, args) {
        var id = args[0];
        var reval = 0;
        console.log('media::stop() - MEDIA_STATE -> IDLE');

        currentMediaInfo.position = 0;
        reval = mediaObjects[id].Execute('Stop');

        if(reval > 0){
            currentMediaInfo.oldState = currentMediaInfo.state;
            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_IDLE));
        }
        else {
            throw new Error('Fail to Media stop');
        }
    },

    // Seeks to the position in the media
    seekTo:function(successCallback, errorCallback, args) {
        var id = args[0],
            milliseconds = args[1],
            reval = 0,
            offset;
        console.log('media::seekTo()');

        if(currentMediaInfo.state == Media.STATE_IDLE) {
            currentMediaInfo.position = milliseconds;
        }
        else if(currentMediaInfo.state == Media.STATE_PLAYING || currentMediaInfo.state == Media.STATE_PAUSED){
            if(milliseconds > (currentMediaInfo.duration-2000)) {
                throw new Error('The seekTo time is too close duration');
            }
            else {
                offset = milliseconds - currentMediaInfo.position;
                if(offset > 0 ) {
                    offset = parseInt(offset / 1000);
                    reval = mediaObjects[id].Execute('JumpForward',offset);
                }
                else {
                    offset = parseInt((offset * -1) / 1000);
                    reval = mediaObjects[id].Execute('JumpBackward',offset);
                }

                if(reval > 0){
                    console.log('Sucess to Media SeekTo ' + milliseconds);
                }
                else {
                    throw new Error('Fail to Media seekTo');
                }
            }
        }
    },

    // Pauses the playing media
    pause:function(successCallback, errorCallback, args) {
        var id = args[0];
        var reval = 0;
        console.log('media::pause() - MEDIA_STATE -> PAUSED');
        reval = mediaObjects[id].Execute('Pause');

        if(reval > 0){
            currentMediaInfo.oldState = currentMediaInfo.state;
            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_PAUSED));
        }
        else {
            throw new Error('Fail to Media pause');
        }
    }
};

require('cordova/exec/proxy').add('toast.Media',module.exports);
