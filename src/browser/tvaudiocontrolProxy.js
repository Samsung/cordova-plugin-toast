'use strict';

var isMute = false;
var volume = 0;
var volumeChangeCallback = '';

module.exports = {
	setMute: function (success, fail, args) {
		try{
			isMute = args[0];
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
			success();
		}
		catch(e) {
			fail(new Error('failed to setVolumeDown'));
		}
	},
	getVolume: function (success, fail, args) {
		try{
			var result = volume;
			success(result);
		}
		catch(e) {
			fail(new Error('failed to getVolume'));
		}
	},
	setVolumeChangeListener: function (success, fail, args) {
		try{
			volumeChangeCallback = args[0];
			success();
		}
		catch(e) {
			fail(new Error('failed to setVolumeChangeListener'));
		}
	},
	unsetVolumeChangeListener: function (success, fail, args) {
		try{
			volumeChangeCallback = '';
			success();
		}
		catch(e) {
			fail(new Error('failed to unsetVolumeChangeListener'));
		}
	}
};

require('cordova/exec/proxy').add('toast.tvaudiocontrol', module.exports);
