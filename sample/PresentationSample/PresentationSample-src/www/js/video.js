/*
    js/video.js - Play video
*/

var videoEl = '';

function initVideo(){
	if(!videoEl){
		videoEl = document.getElementById('scene_video');
	}
}

function playVideo(){
	videoEl.play();
	videoEl.setAttribute('style', 'visibility: visible;');
	isPlay = true;
	slide.stopSlide();
}

function stopVideo(){
	isPlay = false;
	videoEl.pause();
	videoEl.currentTime = 0;
	videoEl.setAttribute('style', 'visibility: hidden;');
	slide.resumeSlide();
}