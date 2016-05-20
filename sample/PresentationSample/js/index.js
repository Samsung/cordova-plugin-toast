/*
    js/index.js - Starting point
*/

var isPlay = false;
var isAnim = true;
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('scene_slide');

        // init
        initVideo();
        initKeys();
    },
    receivedEvent: function(id) {
        console.log('show : ' + id);
    }
};

// tv key register
var tvKeyCode = {};

function initKeys(){
    toast.inputdevice.getSupportedKeys(function(keys){
        var len = keys.length;
        for(var i = 0; i < len; i++){
            tvKeyCode[keys[i].name] = keys[i].code;
        }
    });
    
window.addEventListener('keydown', function(e){
    switch(e.keyCode){
        case tvKeyCode.ArrowLeft:
            // manual mode : slide show
            slide.stillSlideDown(); // go to prev slide
            break;
        case tvKeyCode.ArrowRight:
            // manual mode : slide show
            slide.stillSlideUp(); // go to next slide
            break;
        case tvKeyCode.ArrowUp:
            // auto mode : slide show
            slide.showAutoSlide(0);
            break;
        case tvKeyCode.ArrowDown:
            // play video
            if(!isPlay){
                playVideo();
            }else{
                stopVideo();
            }
            break;
        case tvKeyCode.Return:
            // refresh application
            location.reload();               
            break;
        case tvKeyCode.Enter:
            // manual mode : slide show
            slide.stillSlideUp(); // go to next slide
            break;
        }
    });
}

app.initialize();