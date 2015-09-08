'use strict';

var Media = require('cordova-plugin-toast.media');

var currentVideoinfo = null;

var containerElem = null;

var callbackFnTimer = null;

function createVideContainer(id){
    function setContainerStyleEventListener(elem,callback) {
        var options = {
            subtree: false,
            attributes: true
        };

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(e) {
                callback.call(e.target, e.attributeName);
            });
        });
        observer.observe(elem, options);
        Media.onStatus(id,Media.MEDIA_CONTAINER,elem);
    }

    if(window.MutationObserver) {
        var body = document.getElementsByTagName('body')[0];
        containerElem = document.createElement('OBJECT');
        containerElem.type = 'application/avplayer';
        containerElem.style.left = '0px';
        containerElem.style.top =  '0px';
        containerElem.style.width =  '0px';
        containerElem.style.height =  '0px';
        body.appendChild(containerElem);
        setContainerStyleEventListener (containerElem,containerStyleEventCallback);
    } else {
        throw Error('The platform does not support toast.media');
    }
}

function containerStyleEventCallback(target,attributeName) {
    if(callbackFnTimer){
        clearTimeout(callbackFnTimer);
    }
    callbackFnTimer = setTimeout(function(){
        if (target == 'style'){
            var boundingRect = getBoundingRect(containerElem);
            console.log('boundingRect.left.............'+boundingRect.left);
            console.log('boundingRect.top.............'+boundingRect.top);
            console.log('boundingRect.width.............'+boundingRect.width);
            console.log('boundingRect.height.............'+boundingRect.height);
        
            currentVideoinfo.displayRect = {
                'left' : Number(boundingRect.left),
                'top' : Number(boundingRect.top),
                'width' : Number(boundingRect.width),
                'height' : Number(boundingRect.height)
            };

            try{
                if(webapis.avplay.getState() == 'IDLE' || webapis.avplay.getState() == 'PAUSED' || webapis.avplay.getState() == 'PLAYING'){
                    webapis.avplay.setDisplayRect(currentVideoinfo.displayRect.left,currentVideoinfo.displayRect.top,currentVideoinfo.displayRect.width,currentVideoinfo.displayRect.height);
                }
            } catch (e){
                console.log('[Warning]Fail to setDisplayRect' + e);
            }
            
        }
    },0);
}

function getBoundingRect (el) {
    var width = 0, height = 0, left = 0, top = 0;
    if (el && el === el.window) {   // window
        width = el.document.documentElement.clientWidth;
        height = el.document.documentElement.clientHeight;
        return {left: 0, top: 0, width: width, height: height, right: width, bottom: height};
    }
    if (el && el.nodeType && el.nodeType === 9) {   // document
        width = Math.max(el.body.scrollWidth, el.documentElement.scrollWidth, el.body.offsetWidth, el.documentElement.offsetWidth, el.documentElement.clientWidth);
        height = Math.max(el.body.scrollHeight, el.documentElement.scrollHeight, el.body.offsetHeight, el.documentElement.offsetHeight, el.documentElement.clientHeight);
        return {left: 0, top: 0, width: width, height: height, right: width, bottom: height};
    }

    if ('getBoundingClientRect' in document.documentElement) {
        var clientRect = el.getBoundingClientRect();
        if (el === el.ownerDocument.body) {
            left = document.body.offsetLeft + parseFloat(getStyle(el, 'marginLeft') || 0);
            top = document.body.offsetTop + parseFloat(getStyle(el, 'marginTop') || 0);
        }
        else {
            left += clientRect.left;
            top += clientRect.top;
            left += (window.pageXOffset || el.ownerDocument.documentElement.scrollLeft || document.body.scrollLeft);
            top += (window.pageYOffset || el.ownerDocument.documentElement.scrollTop || document.body.scrollTop);
            left -= el.ownerDocument.documentElement.clientLeft;
            top -= el.ownerDocument.documentElement.clientTop;
        }
        width = clientRect.width;
        height = clientRect.height;
    }

    return {
        left: left,
        top: top,
        width: width,
        height: height,
        right: left+width,
        bottom: top+height
    };
}

function getStyle(element, prop) {
    prop = camelCase(prop);
    return element.currentStyle ?
        element.currentStyle[prop] :
        document.defaultView.getComputedStyle(element, '')[prop];
}

var camelCache = {};
var rexHypen = /-(.)/gi;
function camelCase(input) {
    if(!rexHypen.test(input)) {
        return input;
    }
    if(camelCache[input]) {
        return camelCache[input];
    }
    camelCache[input] = input.toLowerCase().replace(rexHypen, function(match, word, index) {
        return index === 0 ? word : word.toUpperCase();
    });
    return camelCache[input];
}


function createAvplay(id,src) {
    setTimeout(function(){
        if(window.webapis){
            currentVideoinfo.id = id;
            currentVideoinfo.src = src;
            webapis.avplay.open(src);
            webapis.avplay.setListener({
                onbufferingstart: function() {
                    console.log('Buffering start.');
                    Media.onStatus(id,Media.MEDIA_STATE,Media.MEDIA_BUFFERINGSTART);
                },
                onbufferingprogress: function(percent) {
                    console.log('Buffering progress data : ' + percent);
                    Media.onStatus(id,Media.MEDIA_BUFFERINGPROGRESS,percent);
                },
                onbufferingcomplete: function() {
                    console.log('Buffering complete.');
                    Media.onStatus(id,Media.MEDIA_STATE,Media.MEDIA_BUFFERINGCOMPLETE);
                },
                onstreamcompleted: function(currentTime) {
                    webapis.avplay.stop();
                    Media.onStatus(id,Media.MEDIA_STATE,Media.MEDIA_STOPPED);
                },
                oncurrentplaytime: function(currentTime) {
                    console.log('Current playtime: ' + currentTime);
                    Media.onStatus(id,Media.MEDIA_POSITION,currentTime);
                },
                onevent: function(eventType, eventData) {
                    console.log('Event type error : ' + eventType + ', eventData: ' + eventData);
                },
                onerror: function(errorData) {
                    console.log('Event type error : ' + errorData);
                    Media.onStatus(id,Media.MEDIA_ERROR,errorData);
                },
                onsubtitlechange: function(duration, text, data1, data2) {
                    console.log('Subtitle Changed.');
                    Media.onStatus(id,Media.MEDIA_SUBTITLE,[text, data1, data2]);
                },
                ondrmevent: function(drmEvent, drmData) {
                    console.log('DRM callback: ' + drmEvent + ', data: ' + drmData);
                }
            });
        }
    },0);
}

function setInitVideoInfo(){
    currentVideoinfo = null;
    currentVideoinfo = {
        id : null,
        src : null,
        displayRect : {
            left : '0',
            top : '0',
            width : window.document.documentElement.clientWidth,
            height : window.document.documentElement.clientHeight
        }
    };
}

module.exports = {
    create:function(successCallback, errorCallback, args) {
        var id = args[0], src = args[1], containerId = args[2];
        console.log('media::create() - id =' + id + ', src =' + src + ', containerId=' + containerId);
        setInitVideoInfo();
        createAvplay(id,src);
        createVideContainer(id,containerId);
    },

    // Start playing the video
    startPlayingVideo:function(successCallback, errorCallback, args) {
        var id = args[0], src = args[1], options = args[2];

        console.log('media::startPlayingVideo() - id =' + id + ', src =' + src + ', options =' + options);

        if(currentVideoinfo.src != src){
            createAvplay(id,src);
        }

        setTimeout(function(){
            if(webapis.avplay.getState() == 'PAUSED') {
                webapis.avplay.play();
            } else if(webapis.avplay.getState() == 'IDLE'){
                containerElem.style.display = 'block';
                containerElem.style.left = currentVideoinfo.displayRect.left + 'px';
                containerElem.style.top = currentVideoinfo.displayRect.top + 'px';
                containerElem.style.width = currentVideoinfo.displayRect.width + 'px';
                containerElem.style.height = currentVideoinfo.displayRect.height + 'px';
                try{
                    webapis.avplay.setDisplayRect(currentVideoinfo.displayRect.left,currentVideoinfo.displayRect.top,currentVideoinfo.displayRect.width,currentVideoinfo.displayRect.height);
                } catch(e){
                    errorCallback(e);
                }
                    
                try{
                    webapis.avplay.prepareAsync(function(){
                        webapis.avplay.play();
                        Media.onStatus(id,Media.MEDIA_DURATION,webapis.avplay.getDuration());
                    },function(e){
                        errorCallback(e);
                    });
                } catch(e) {
                    errorCallback(e);
                }
            }
        },0);
    },

    // Stops the playing video
    stopPlayingVideo:function(successCallback, errorCallback, args) {
        var id = args[0];
        webapis.avplay.stop();
        Media.onStatus(id, Media.MEDIA_STATE, Media.MEDIA_STOPPED);
    },

    // Seeks to the position in the video
    seekToVideo:function(successCallback, errorCallback, args) {
        //var id = args[0];
        var milliseconds = args[1];

        console.log('media::seekToVideo()');
        try {
            webapis.avplay.seekTo(milliseconds,function(time){
                setTimeout(function(){
                    successCallback(webapis.avplay.getCurrentTime());
                },0);
                
            },function(){
                errorCallback();
            });
        } catch(e) {
            errorCallback(e);
        }
    },

    // Pauses the playing video
    pausePlayingVideo:function(successCallback, errorCallback, args) {
        var id = args[0];

        console.log('media::pausePlayingVideo() - MEDIA_STATE -> MEDIA_PAUSED');
        webapis.avplay.pause();
        Media.onStatus(id, Media.MEDIA_STATE, Media.MEDIA_PAUSED);
    },

    // Gets current position in the video
    getCurrentPositionVideo:function(successCallback, errorCallback, args) {
        //var id = args[0];
        console.log('media::getCurrentPositionVideo()');
        setTimeout(function(){
            successCallback(webapis.avplay.getCurrentTime());
        },0);
    }
};

require('cordova/exec/proxy').add('toast.media',module.exports);