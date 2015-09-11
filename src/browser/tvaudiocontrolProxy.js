'use strict';

var audioOutputMode = [ 'PCM', 'DOLBY', 'DTS', 'AAC' ];
var audioBeepType = [ 'UP', 'DOWN', 'LEFT', 'RIGHT', 'PAGE_LEFT', 'PAGE_RIGHT', 'BACK', 'SELECT', 'CANCEL', 'WARNING', 'KEYPAD', 'KEYPAD_ENTER', 'KEYPAD_DEL', 'MOVE', 'PREPARING' ];

var isMute = false;
var volume = 0;
var currentBeepType = audioBeepType[0];
var volumeChangeCallback = '';

module.exports = {
	setMute: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			if(typeof args[0] == 'boolean'){
				isMute = args[0];

				var muteEl = getMuteElement();
				muteEl.innerHTML = isMute ? 'mute : ON' : 'mute : OFF';
			}else{
				console.error('TypeError');
			}
		} catch (e) {
			throw e;
		}
	},
	isMute: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			var result = isMute;

			if (typeof result == 'boolean') {
				setTimeout(function () {
					success(result);
				}, 0);
			} else {
				setTimeout(function () {
					fail({
						code: 8,
						name: 'NOT_FOUND_ERR'
					});
				}, 0);
			}
		} catch (e) {
			throw e;
		}
	},
	setVolume: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			volume = args[0];

			if(volumeChangeCallback){
				volumeChangeCallback(volume);
			}

			var volumeEl = getVolumeElement();
			volumeEl.innerHTML = 'volume : ' + volume;
		} catch (e) {
			throw e;
		}
	},
	setVolumeUp: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			if(volume < 100){
				volume++;
			}

			if(volumeChangeCallback){
				volumeChangeCallback(volume);
			}

			var volumeEl = getVolumeElement();
			volumeEl.innerHTML = 'volume : ' + volume;
		} catch (e) {
			throw e;
		}	
	},
	setVolumeDown: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			if(volume > 0){
				volume--;
			}

			if(volumeChangeCallback){
				volumeChangeCallback(volume);
			}

			var volumeEl = getVolumeElement();
			volumeEl.innerHTML = 'volume : ' + volume;
		} catch (e) {
			throw e;
		}
	},
	getVolume: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			var result = volume;

			if (typeof result == 'number') {
				setTimeout(function () {
					success(result);

					var volumeEl = getVolumeElement();
					volumeEl.innerHTML = 'volume : ' + result;
				}, 0);
			} else {
				setTimeout(function () {
					fail({
						code: 8,
						name: 'NOT_FOUND_ERR'
					});
				}, 0);
			}
		} catch (e) {
			throw e;
		}
	},
	setVolumeChangeListener: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			if (typeof success == 'function'){
				volumeChangeCallback = success;
			}

			var changeEl = getVolumeChangeListenerElement();
			changeEl.innerHTML = 'volume change listener : attached';
		} catch (e) {
			throw e;
		}
	},
	unsetVolumeChangeListener: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			volumeChangeCallback = '';

			var changeEl = getVolumeChangeListenerElement();
			changeEl.innerHTML = 'volume change listener : dettached';
		} catch (e) {
			throw e;
		}
	},
	getOutputMode: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			var result = audioOutputMode;

			if (typeof result == 'object') {
				setTimeout(function () {
					success(result);

					var outputmodeEl = getOutputModeElement();
					outputmodeEl.innerHTML = 'output mode : ' + result;
				}, 0);
			} else {
				setTimeout(function () {
					fail({
						code: 8,
						name: 'NOT_FOUND_ERR'
					});
				}, 0);
			}
		} catch (e) {
			throw e;
		}
	},
	playSound: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			currentBeepType = args[0];

			var playsoundEl = getPlaySoundElement();
			playsoundEl.innerHTML = 'playsound : ' + currentBeepType;
		} catch (e) {
			throw e;
		}
	}
};

function getSoundBox(){
	var element = '';

	if(!document.getElementById('soundbox')){
		element = document.createElement('div');
		element.id = 'soundbox';
		element.style.outline = '1px solid';
		element.style.width = '300px';
		element.style.height = '100px';
		element.style.margin = '5px';

		document.body.appendChild(element);
	} else{
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
		element.style.height = '20%';
		element.innerHTML = 'mute : ';

		getSoundBox().appendChild(element);
	} else{
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
		element.style.height = '20%';
		element.innerHTML = 'volume : ';

		getSoundBox().appendChild(element);
	} else{
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
		element.style.height = '20%';
		element.innerHTML = 'volume change listener : ';

		getSoundBox().appendChild(element);
	} else{
		element = document.getElementById('volumechange');
	}

	return element;
}

function getOutputModeElement(){
	var element = '';

	if(!document.getElementById('outputmode')){
		element = document.createElement('div');
		element.id = 'outputmode';
		element.style.width = '100%';
		element.style.height = '20%';
		element.innerHTML = 'output mode : ';

		getSoundBox().appendChild(element);
	} else{
		element = document.getElementById('outputmode');
	}

	return element;
}

function getPlaySoundElement(){
	var element = '';

	if(!document.getElementById('playsound')){
		element = document.createElement('div');
		element.id = 'playsound';
		element.style.width = '100%';
		element.style.height = '20%';
		element.innerHTML = 'playsound : ';

		getSoundBox().appendChild(element);
	} else{
		element = document.getElementById('playsound');
	}

	return element;
}

require('cordova/exec/proxy').add('toast.tvaudiocontrol', module.exports);