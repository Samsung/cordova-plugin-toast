'use strict';

var volumeChangeCallback = '';

module.exports = {
	setMute: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			webapis.audiocontrol.setMute(args[0]);
		}
		catch (e) {
			throw e;
		}
	},
	isMute: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			var result = webapis.audiocontrol.getMute();

			if (typeof result == 'boolean') {
				setTimeout(function () {
					success(result);
				}, 0);
			}
			else {
				setTimeout(function () {
					var error = new Error();
					error.name = 'TypeMismatchError';
					error.message = 'TypeMismatchError';
					fail(error);
				}, 0);
			}
		}
		catch (e) {
			throw e;
		}
	},
	setVolume: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			webapis.audiocontrol.setVolume(args[0]);

			if((volumeChangeCallback) && (typeof args[0] == 'number')){
				volumeChangeCallback(args[0]);
			}
		}
		catch (e) {
			throw e;
		}
	},
	setVolumeUp: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			webapis.audiocontrol.setVolumeUp();

			if(volumeChangeCallback){
				var volume = webapis.audiocontrol.getVolume();
				if((typeof volume == 'number') && (volume != -1)){
					volumeChangeCallback(volume);
				}
			}
		}
		catch (e) {
			throw e;
		}
	},
	setVolumeDown: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			webapis.audiocontrol.setVolumeDown();

			if(volumeChangeCallback){
				var volume = webapis.audiocontrol.getVolume();
				if((typeof volume == 'number') && (volume != -1)){
					volumeChangeCallback(volume);
				}
			}
		}
		catch (e) {
			throw e;
		}
	},
	getVolume: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			var result = webapis.audiocontrol.getVolume();

			if (typeof result == 'number' && (result != -1)) {
				setTimeout(function () {
					success(result);
				}, 0);
			}
			else {
				setTimeout(function () {
					var error = new Error();
					error.name = 'TypeMismatchError';
					error.message = 'TypeMismatchError';
					fail(error);
				}, 0);
			}
		}
		catch (e) {
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
		}
		catch (e) {
			throw e;
		}
	},
	unsetVolumeChangeListener: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			volumeChangeCallback = '';
		}
		catch (e) {
			throw e;
		}
	}
};

require('cordova/exec/proxy').add('toast.tvaudiocontrol', module.exports);
