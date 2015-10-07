'use strict';

var Media = require('cordova-plugin-toast.Media');
var Util = require('cordova-plugin-toast.util');

var avplayState = {
    NONE : 'NONE',
    IDLE : 'IDLE',
    READY : 'READY',
    PLAYING : 'PLAYING',
    PAUSED : 'PAUSED'
};
var containerElem = null;

function createVideoContainer(id){
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
        containerElem.innerHTML = '<OBJECT type="application/avplayer" style="width:0px; height:0px;"></OBJECT>';
        setContainerStyleEventListener(containerElem,containerStyleEventCallback);
        setContainerAppendEventListener(containerAppendEventCallback);
        Media.mediaEvent(id,getMediaEventVaule(Media._MEDIA_CONTAINER,containerElem));
    }
    else {
        throw Error('The platform does not support toast.media');
    }
}

var containerStylecallbackFnTimer = null;
function containerStyleEventCallback(MutationRecordProperty) {
    if(containerStylecallbackFnTimer){
        clearTimeout(containerStylecallbackFnTimer);
    }
    containerStylecallbackFnTimer = setTimeout(function(){
        if (MutationRecordProperty == 'style'){
            containerElem.childNodes[0].style.width = containerElem.style.width;
            containerElem.childNodes[0].style.height = containerElem.style.height;
            setAvplayVideoRect(containerElem);
        }
    },0);
}

var containerAppendcallbackFnTimer = null;
function containerAppendEventCallback(MutationRecordProperty){
    if(containerAppendcallbackFnTimer){
        clearTimeout(containerAppendcallbackFnTimer);
    }

    containerAppendcallbackFnTimer = setTimeout(function(){
        if (MutationRecordProperty.addedNodes.length > 0) {
            console.log('addedNodes.............');
            if(hasContainerElem(MutationRecordProperty.addedNodes)){
                console.log('append containerElem.............');
                setAvplayVideoRect(containerElem);
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

function setAvplayVideoRect(element){
    var boundingRect = Util.getBoundingRect(element);
    console.log('boundingRect.left.............'+boundingRect.left);
    console.log('boundingRect.top.............'+boundingRect.top);
    console.log('boundingRect.width.............'+boundingRect.width);
    console.log('boundingRect.height.............'+boundingRect.height);

    try{
        var state = webapis.avplay.getState();
        if(state == avplayState.IDLE || state == avplayState.PAUSED || state == avplayState.PLAYING || state ==avplayState.READY){
            webapis.avplay.setDisplayRect(Math.ceil(Number(boundingRect.left)),Math.ceil(Number(boundingRect.top)),Math.ceil(Number(boundingRect.width)),Math.ceil(Number(boundingRect.height)));
        }
    }
    catch (e){
        console.log('[Warning]Fail to setDisplayRect' + e);
    }
}

var currentMediaState = null;
function getMediaEventVaule (type,data) {
    var reval = {};
    switch(type){
    case Media.EVENT_STATE :
        reval = {
            'type' : type,
            'data' : {
                'state' : data,
                'oldState' : currentMediaState
            }
        };
        currentMediaState = data;
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

var bBlockTimeUpdate = false;

module.exports = {
    create:function(successCallback, errorCallback, args) {
        var id = args[0];
        console.log('media::create() - id =' + id);
        createVideoContainer(id);
    },

    open:function(successCallback, errorCallback, args) {
        var id = args[0],
            src = args[1],
            state = null;

        console.log('media::open() - id =' + id + ' src = ' + src);

        state = webapis.avplay.getState();

        if(state !== avplayState.NONE && state !== avplayState.IDLE) {
            webapis.avplay.stop();
            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_IDLE));
            bBlockTimeUpdate = false;
        }

        if(window.webapis){
            webapis.avplay.open(src);
            webapis.avplay.setListener({
                onbufferingstart: function() {
                    console.log('media::onStalled()');
                    bBlockTimeUpdate = true;
                    Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_STATE,Media.STATE_STALLED));
                },
                onbufferingprogress: function(percent) {
                    console.log('Buffering progress data : ' + percent);
                    Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_BUFFERINGPROGRESS,percent));
                },
                onbufferingcomplete: function() {
                    console.log('Buffering complete.');
                    bBlockTimeUpdate = false;
                    state = webapis.avplay.getState();
                    if(state !== 'READY') {
                        Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_STATE,state));
                    }
                    Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_POSITION,webapis.avplay.getCurrentTime()));
                },
                onstreamcompleted: function(currentTime) {
                    console.log('media::streamcompleted()');
                    webapis.avplay.stop();
                    Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_IDLE));
                },
                oncurrentplaytime: function(currentTime) {
                    state = webapis.avplay.getState();
                    if(!bBlockTimeUpdate && (state == avplayState.PLAYING || state == avplayState.PAUSED)){
                        console.log('Current playtime: ' + currentTime);
                        Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_POSITION,currentTime));
                    }
                },
                onevent: function(eventType, eventData) {
                    console.log('Event type error : ' + eventType + ', eventData: ' + eventData);
                },
                onerror: function(errorData) {
                    console.log('Event type error : ' + errorData);
                    Media.mediaEvent(id,getMediaEventVaule(Media._MEDIA_ERROR,errorData));
                },
                onsubtitlechange: function(duration, text, data1, data2) {
                    console.log('Subtitle Changed.');
                },
                ondrmevent: function(drmEvent, drmData) {
                    console.log('DRM callback: ' + drmEvent + ', data: ' + drmData);
                }
            });
            currentMediaState = Media.STATE_IDLE;
            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_IDLE));
        }
    },

    // Start playing the media
    play:function(successCallback, errorCallback, args) {
        var id = args[0];

        console.log('media::play() - id =' + id);
        if(webapis.avplay.getState() == avplayState.IDLE){
            webapis.avplay.prepare();
            webapis.avplay.play();
            var duration = webapis.avplay.getDuration();
            console.log('duration.....................'+duration);
            Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_DURATION,duration));
        }
        else {
            webapis.avplay.play();
            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_PLAYING));
        }
    },

    // Stops the playing media
    stop:function(successCallback, errorCallback, args) {
        var id = args[0];
        console.log('media::stop() - EVENT_STATE -> IDLE');
        webapis.avplay.stop();
        Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_IDLE));
        bBlockTimeUpdate = false;
        setTimeout(function(){
            successCallback();
        },0);
    },

    // Seeks to the position in the media
    seekTo:function(successCallback, errorCallback, args) {
        //var id = args[0];
        var milliseconds = args[1];

        console.log('media::seekTo()');
        webapis.avplay.seekTo(milliseconds,function(){
            successCallback(webapis.avplay.getCurrentTime());
        },function(e){
            throw Error('Failed to seekTo');
        });
        bBlockTimeUpdate = true;
    },

    // Pauses the playing media
    pause:function(successCallback, errorCallback, args) {
        var id = args[0];
        console.log('media::pause() - EVENT_STATE -> PAUSED');

        webapis.avplay.pause();
        Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_PAUSED));
    },

    setStreamingProperty:function(successCallback, errorCallback, args) {
        console.log('media::setStreamingProperty() - type= '+args[0]);

        webapis.avplay.setStreamingProperty.apply(webapis.avplay, args);
    },

    setDrm:function(successCallback, errorCallback, args) {
        console.log('media::setStreamingProperty() - type= '+args[0]);

        webapis.avplay.setDrm.apply(webapis.avplay, args);
    }
};

require('cordova/exec/proxy').add('toast.Media',module.exports);
