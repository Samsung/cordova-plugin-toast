/*
    js/slide.js - Play slideshow (Auto / Manual mode)
*/

// toast data
var toast_commonlist = [];
var toast_slidelist = [];
var toast_videolist = [];
var toastlen = 0;

// container
var slide_animator = $('#slide_animator');

// header element
var header_title = document.getElementById('header_title');
var header_subtitle = document.getElementById('header_subtitle');

// body element
var body_title = document.getElementById('body_title');
var body_text = document.getElementById('body_text');
var body_img = document.getElementById('body_img');

var slide = {
	interval : 8000, // Interval for animation (default : 8sec)
	idx : 0,
	timer : null,
    initialize: function() {
        // init
        slide.getData();
        slide.setTitle();
        slide.showAutoSlide(0);
    },
    getData: function() {
        toast_commonlist = data.toast.common;
        toast_slidelist = data.toast.slide;
        toast_videolist = data.toast.video;
        toastlen = toast_slidelist.length;
    },
    resumeSlide: function() {
        // resume slide show
        if(typeof slide.idx != "number"){
            slide.idx = 0;
        }
        var index = slide.idx;
        slide.showAutoSlide(index);
    },
    stopSlide: function() {
        // stop slide show
        if(slide.timer){
            clearInterval(slide.timer);
            slide.timer = null;
            isAnim = false;
        }
    },
    showSlide: function(item) {
        //animation
        isAnim = true;
        slide_animator.addClass('moveLeft').on('webkitAnimationEnd', function(){
            slide_animator.removeClass('moveLeft');
        });

        var title = item.title;
        var text = item.text;
        var img = item.img;

        // fill element
        body_title.innerHTML = title;
        body_text.innerHTML = text;
        body_img.style.backgroundImage = 'url("'+ img +'")';
    },
    showAutoSlide: function(index) {
        slide.stopSlide();
        slide.idx = index;
        slide.showSlide(toast_slidelist[slide.idx++]);
        slide.timer = setInterval(function(){
            if(slide.idx == toastlen){
                slide.idx = 0;
            }
            slide.showSlide(toast_slidelist[slide.idx++]);
        }, slide.interval);
    },
    setTitle: function() {
        var titletext = toast_commonlist.title;
        var subtitletext = toast_commonlist.subtitle;

        // fill element
        header_title.innerHTML = titletext;
        header_subtitle.innerHTML = subtitletext;
    },
    showStillSlide: function(index) {
        slide.idx = index;
        slide.showSlide(toast_slidelist[index]);
    },
    stillSlideUp: function() {
        // manual mode : next slide
        slide.stopSlide();
        if(typeof slide.idx != "number"){
            slide.idx = 0;
        }

        slide.idx++;

        if(slide.idx == toastlen){
            slide.idx = 0;
        }

        var index = slide.idx;
        slide.showStillSlide(index);
    },
    stillSlideDown: function() {
        // manual mode : prev slide
        slide.stopSlide();
        if(typeof slide.idx != "number"){
            slide.idx = 0;
        }

        slide.idx--;

        if(slide.idx == -1){
            slide.idx = toastlen - 1;
        }

        var index = slide.idx;
        slide.showStillSlide(index);
    }
};

slide.initialize();
