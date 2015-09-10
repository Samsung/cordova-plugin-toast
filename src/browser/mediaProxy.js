'use strict';

var Media = require('cordova-plugin-toast.media');

var currentVideoState = null;

var containerElem = null;

var videoObjects = {};

var containerStylecallbackFnTimer = null;

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

    if(window.MutationObserver) {
        containerElem = document.createElement('div');
        containerElem.style.left = '0px';
        containerElem.style.top =  '0px';
        containerElem.style.width =  '0px';
        containerElem.style.height =  '0px';
        containerElem.appendChild(videoObjects[id]);
        setContainerStyleEventListener (containerElem,containerStyleEventCallback);
    } else {
        throw Error('The platform does not support toast.media');
    }
}

function containerStyleEventCallback(MutationRecordProperty) {
    if(containerStylecallbackFnTimer){
        clearTimeout(containerStylecallbackFnTimer);
    }
    containerStylecallbackFnTimer = setTimeout(function(){
        if (MutationRecordProperty == 'style'){
            containerElem.childNodes[0].style.width = containerElem.style.width;
            containerElem.childNodes[0].style.height = containerElem.style.height;
        }
    },0);
}

function getMediaEventVaule (type,data) {
    var reval = {};
    switch(type){
    case Media.EVENT_STATE :
        reval = {
            'type' : type,
            'data' : {
                'state' : data,
                'oldState' : currentVideoState
            }
        };
        currentVideoState = data;
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

module.exports = {
    create:function(successCallback, errorCallback, args) {
        var id = args[0];
        console.log('media::create() - id =' + id);
        videoObjects[id] = document.createElement('video');
        
        videoObjects[id].onStalledCB = function () {
            console.log('media::onStalled()');

            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_STALLED));
        };

        videoObjects[id].onEndedCB = function () {
            console.log('media::onEndedCB() - MEDIA_STATE -> IDLE');

            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_IDLE));
        };

        videoObjects[id].onErrorCB = function () {
            console.log('media::onErrorCB() - MEDIA_ERROR -> ' + event.srcElement.error);

            Media.mediaEvent(id, getMediaEventVaule(Media._MEDIA_ERROR, event.srcElement.error));
        };

        videoObjects[id].onLoadedMetaDataCB = function () {

            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_DURATION, videoObjects[id].duration * 1000));
        };

        videoObjects[id].onPlayingCB = function () {
            console.log('media::onPlayingCB() - MEDIA_STATE -> PLAYING');
            
            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_PLAYING));
        };

        videoObjects[id].onDurationChangeCB = function () {
            console.log('media::onDurationChangeCB() - EVENT_DURATION -> ' +  videoObjects[id].duration * 1000);

            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_DURATION, videoObjects[id].duration * 1000));
        };

        videoObjects[id].onTimeUpdateCB = function () {
            console.log('media::onTimeUpdateCB() - EVENT_POSITION -> ' +  videoObjects[id].currentTime * 1000);

            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_POSITION, videoObjects[id].currentTime * 1000));
        };

        createVideContainer(id);
    },

    open:function(successCallback, errorCallback, args){
        var id = args[0], src = args[1];
        videoObjects[id].src = src;
        videoObjects[id].addEventListener('loadedmetadata', videoObjects[id].onLoadedMetaDataCB);
        videoObjects[id].load();
        currentVideoState = Media.STATE_IDLE;
        Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_IDLE));
    },

    // play
    play:function(successCallback, errorCallback, args) {
        var id = args[0];
        console.log('media::startPlayingVideo() - id =' + id);

        videoObjects[id].addEventListener('canplay', videoObjects[id].onCanPlayCB);
        videoObjects[id].addEventListener('ended', videoObjects[id].onEndedCB);
        videoObjects[id].addEventListener('timeupdate', videoObjects[id].onTimeUpdateCB);
        videoObjects[id].addEventListener('durationchange', videoObjects[id].onDurationChangeCB);
        videoObjects[id].addEventListener('playing', videoObjects[id].onPlayingCB);
        videoObjects[id].addEventListener('error', videoObjects[id].onErrorCB);
        videoObjects[id].addEventListener('stalled', videoObjects[id].onStalledCB);

        videoObjects[id].play();
    },

    // Stops the playing video
    stop:function(successCallback, errorCallback, args) {
        var id = args[0];
        
        videoObjects[id].pause();

        if (videoObjects[id].currentTime !== 0) {
            videoObjects[id].currentTime = 0;
        }

        console.log('media::stop() - MEDIA_STATE -> IDLE');

        Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_IDLE));

        videoObjects[id].removeEventListener('loadedmetadata', videoObjects[id].onLoadedMetaDataCB);
        videoObjects[id].removeEventListener('ended', videoObjects[id].onEndedCB);
        videoObjects[id].removeEventListener('timeupdate', videoObjects[id].onTimeUpdateCB);
        videoObjects[id].removeEventListener('durationchange', videoObjects[id].onDurationChangeCB);
        videoObjects[id].removeEventListener('playing', videoObjects[id].onPlayingCB);
        videoObjects[id].removeEventListener('error', videoObjects[id].onErrorCB);
        videoObjects[id].removeEventListener('stalled', videoObjects[id].onStalledCB);

        successCallback(videoObjects[id].currentTime);
    },

    // Seeks to the position in the video
    seekTo:function(successCallback, errorCallback, args) {
        var id = args[0], milliseconds = args[1];

        console.log('media::seekTo()');

        videoObjects[id].currentTime = milliseconds / 1000;
        successCallback(videoObjects[id].currentTime);
    },

    // Pauses the playing video
    pause:function(successCallback, errorCallback, args) {
        var id = args[0];

        console.log('media::pause() - MEDIA_STATE -> PAUSED');
        videoObjects[id].pause();
        Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_PAUSED));
    }
};

require('cordova/exec/proxy').add('toast.media',module.exports);