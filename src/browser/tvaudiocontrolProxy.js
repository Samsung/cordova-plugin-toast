'use strict';

var isMute = false;
var volume = 0;
var volumeChangeCallback = '';

module.exports = {
	setMute: function (success, fail, args) {
		try{
			isMute = args[0];

			var muteEl = getMuteElement();
			muteEl.innerHTML = isMute ? 'mute : ON' : 'mute : OFF';
			success();
		}
		catch(e) {
			fail(new Error('failed to setMute'));
		}
	},
	isMute: function (success, fail, args) {
		try{
			var result = isMute;
			success(result);
		}
		catch(e) {
			fail(new Error('failed to isMute'));
		}
	},
	setVolume: function (success, fail, args) {
		try{
			volume = args[0];

			if(volumeChangeCallback){
				volumeChangeCallback(volume);
			}

			isMute = false;
			var muteEl = getMuteElement();
			muteEl.innerHTML = isMute ? 'mute : ON' : 'mute : OFF';

			var volumeEl = getVolumeElement();
			volumeEl.innerHTML = 'volume : ' + volume;

			success();
		}
		catch(e) {
			fail(new Error('failed to setVolume'));
		}
	},
	setVolumeUp: function (success, fail, args) {
		try{
			if(volume < 100){
				volume++;
			}

			if(volumeChangeCallback){
				volumeChangeCallback(volume);
			}

			isMute = false;
			var muteEl = getMuteElement();
			muteEl.innerHTML = isMute ? 'mute : ON' : 'mute : OFF';

			var volumeEl = getVolumeElement();
			volumeEl.innerHTML = 'volume : ' + volume;

			success();
		}
		catch(e) {
			fail(new Error('failed to setVolumeUp'));
		}
	},
	setVolumeDown: function (success, fail, args) {
		try{
			if(volume > 0){
				volume--;
			}

			if(volumeChangeCallback){
				volumeChangeCallback(volume);
			}

			isMute = false;
			var muteEl = getMuteElement();
			muteEl.innerHTML = isMute ? 'mute : ON' : 'mute : OFF';

			var volumeEl = getVolumeElement();
			volumeEl.innerHTML = 'volume : ' + volume;

			success();
		}
		catch(e) {
			fail(new Error('failed to setVolumeDown'));
		}
	},
	getVolume: function (success, fail, args) {
		try{
			var result = volume;

			var volumeEl = getVolumeElement();
			volumeEl.innerHTML = 'volume : ' + result;

			success(result);
		}
		catch(e) {
			fail(new Error('failed to getVolume'));
		}
	},
	setVolumeChangeListener: function (success, fail, args) {
		try{
			volumeChangeCallback = args[0];

			var changeEl = getVolumeChangeListenerElement();
			changeEl.innerHTML = 'volume change listener : attached';

			success();
		}
		catch(e) {
			fail(new Error('failed to setVolumeChangeListener'));
		}
	},
	unsetVolumeChangeListener: function (success, fail, args) {
		try{
			volumeChangeCallback = '';

			var changeEl = getVolumeChangeListenerElement();
			changeEl.innerHTML = 'volume change listener : dettached';

			success();
		}
		catch(e) {
			fail(new Error('failed to unsetVolumeChangeListener'));
		}
	}
};

// tvaudio browser simulator UI
function getSoundBox(){
	var element = '';

	if(!document.getElementById('soundbox')){
		element = document.createElement('div');
		element.id = 'soundbox';
		element.style.outline = '1px solid';
		element.style.width = '300px';
		element.style.height = '60px';
		element.style.margin = '5px';

		document.body.appendChild(element);
	}
	else{
		element = document.getElementById('soundbox');
	}

	return element;
}

function getMuteElement(){
	var element = '';

	if(!document.getElementById('mute')){
		element = document.createElement('div');
		element.id = 'mute';
		element.style.width = '100%';
		element.style.height = '30%';
		element.innerHTML = 'mute : ';

		getSoundBox().appendChild(element);
	}
	else{
		element = document.getElementById('mute');
	}

	return element;
}

function getVolumeElement(){
	var element = '';

	if(!document.getElementById('volume')){
		element = document.createElement('div');
		element.id = 'volume';
		element.style.width = '100%';
		element.style.height = '30%';
		element.innerHTML = 'volume : ';

		getSoundBox().appendChild(element);
	}
	else{
		element = document.getElementById('volume');
	}

	return element;
}

function getVolumeChangeListenerElement(){
	var element = '';

	if(!document.getElementById('volumechange')){
		element = document.createElement('div');
		element.id = 'volumechange';
		element.style.width = '100%';
		element.style.height = '30%';
		element.innerHTML = 'volume change listener : ';

		getSoundBox().appendChild(element);
	}
	else{
		element = document.getElementById('volumechange');
	}

	return element;
}

require('cordova/exec/proxy').add('toast.tvaudiocontrol', module.exports);
