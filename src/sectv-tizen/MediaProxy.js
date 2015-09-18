'use strict';

var Media = require('cordova-plugin-toast.media');
var Util = require('cordova-plugin-toast.util');
var TizenUtil = require('cordova-plugin-toast.tizenutil');

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
        containerElem.style.top =  '0px';
        containerElem.style.width =  '0px';
        containerElem.style.height =  '0px';
        containerElem.innerHTML = '<OBJECT type="application/avplayer"></OBJECT>';
        setContainerStyleEventListener (containerElem,containerStyleEventCallback);
        setContainerAppendEventListener (containerAppendEventCallback);
    } 
    else {
        throw TizenUtil.fromWebAPIException({
            'message':'The platform does not support toast.media',
            'name':'NotSupportedError',
        });
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
        for(var i = 0 ; i < nodes.length ; i++){
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
        if(state == 'IDLE' || state == 'PAUSED' || state == 'PLAYING' || state =='READY'){
            webapis.avplay.setDisplayRect(Number(boundingRect.left),Number(boundingRect.top),Number(boundingRect.width),Number(boundingRect.height));
        }
    } catch (e){
        console.log('[Warning]Fail to setDisplayRect' + e);
    }
}

var currentVideoinfo = null;
function setInitVideoInfo(){
    currentVideoinfo = null;
    currentVideoinfo = {
        id : null,
        src : null
    };
}
var currentVideoState = null;
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
        setInitVideoInfo();
        createVideContainer(id);
    },

    open:function(successCallback, errorCallback, args) {
        var id = args[0], src = args[1];

        console.log('media::open() - id =' + id);
        setTimeout(function(){
            if(window.webapis){
                currentVideoinfo.id = id;
                currentVideoinfo.src = src;
                try {
                    webapis.avplay.open(src);
                    webapis.avplay.setListener({
                        onbufferingstart: function() {
                            console.log('media::onStalled()');
                            Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_STATE,Media.STATE_STALLED));
                        },
                        onbufferingprogress: function(percent) {
                            console.log('Buffering progress data : ' + percent);
                            Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_BUFFERINGPROGRESS,percent));
                        },
                        onbufferingcomplete: function() {
                            console.log('Buffering complete.');
                            var state = webapis.avplay.getState();
                            if(state == 'READY') {
                                Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_STATE,Media.STATE_IDLE));
                            } else {
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
                            console.log('Current playtime: ' + currentTime);
                            Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_POSITION,currentTime));
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
                    currentVideoState = Media.STATE_IDLE;
                    Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_IDLE));
                } catch (e){
                    throw TizenUtil.fromWebAPIException(e);
                }
            }
        },0);
    },

    // Start playing the video
    play:function(successCallback, errorCallback, args) {
        var id = args[0];

        console.log('media::play() - id =' + id);

        setTimeout(function(){
            try {
                if(webapis.avplay.getState() == 'IDLE'){
                    webapis.avplay.prepareAsync(function(){
                        webapis.avplay.play();
                        Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_PLAYING));
                        Media.mediaEvent(id,getMediaEventVaule(Media.EVENT_DURATION,webapis.avplay.getDuration()));
                    },function(e){
                        throw TizenUtil.fromWebAPIException(e);
                    });
                } 
                else {
                    webapis.avplay.play();
                    Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_PLAYING));
                }
            } catch (e){
                throw TizenUtil.fromWebAPIException(e);
            }
        },0);
    },

    // Stops the playing video
    stop:function(successCallback, errorCallback, args) {
        var id = args[0];
        console.log('media::stop() - EVENT_STATE -> IDLE');
        try {
            webapis.avplay.stop();
            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_IDLE));
            successCallback();
        } catch (e){
            throw TizenUtil.fromWebAPIException(e);
        }
        
    },

    // Seeks to the position in the video
    seekTo:function(successCallback, errorCallback, args) {
        //var id = args[0];
        var milliseconds = args[1];

        console.log('media::seekTo()');
        try {
            webapis.avplay.seekTo(milliseconds,function(time){
                setTimeout(function(){
                    successCallback(webapis.avplay.getCurrentTime());
                },0);
                
            },function(e){
                throw TizenUtil.fromWebAPIException(e);
            });
        } catch(e) {
            throw TizenUtil.fromWebAPIException(e);
        }
    },

    // Pauses the playing video
    pause:function(successCallback, errorCallback, args) {
        var id = args[0];
        console.log('media::pause() - EVENT_STATE -> PAUSED');
        try {
            webapis.avplay.pause();
            Media.mediaEvent(id, getMediaEventVaule(Media.EVENT_STATE, Media.STATE_PAUSED));
        } catch(e){
            throw TizenUtil.fromWebAPIException(e);
        }
    }
};

require('cordova/exec/proxy').add('toast.media',module.exports);
