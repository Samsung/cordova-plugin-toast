'use strict';

var volumeChangeCallback = '';

module.exports = {
	setMute: function (success, fail, args) {
		try {
			var result = webapis.audiocontrol.setMute(args[0]);

			if (result) {
				setTimeout(function () {
					success();
				}, 0);
			}
		}
		catch (e) {
			fail(e);
		}
	},
	isMute: function (success, fail, args) {
		try {
			var result = webapis.audiocontrol.getMute();

			if (typeof result == 'boolean') {
				setTimeout(function () {
					success(result);
				}, 0);
			}
		}
		catch (e) {
			fail(e);
		}
	},
	setVolume: function (success, fail, args) {
		try {
			var isMute = webapis.audiocontrol.getMute();
			if(isMute){
				webapis.audiocontrol.setMute(false);
			}
			
			webapis.audiocontrol.setVolume(args[0]);

			if((volumeChangeCallback) && (typeof args[0] == 'number')){
				volumeChangeCallback(args[0]);
			}
			success();
		}
		catch (e) {
			fail(e);
		}
	},
	setVolumeUp: function (success, fail, args) {
		try {
			var isMute = webapis.audiocontrol.getMute();
			if(isMute){
				webapis.audiocontrol.setMute(false);
			}

			webapis.audiocontrol.setVolumeUp();

			if(volumeChangeCallback){
				var volume = webapis.audiocontrol.getVolume();
				if((typeof volume == 'number') && (volume != -1)){
					volumeChangeCallback(volume);
				}
			}
			success();
		}
		catch (e) {
			fail(e);
		}
	},
	setVolumeDown: function (success, fail, args) {
		try {
			var isMute = webapis.audiocontrol.getMute();
			if(isMute){
				webapis.audiocontrol.setMute(false);
			}

			webapis.audiocontrol.setVolumeDown();

			if(volumeChangeCallback){
				var volume = webapis.audiocontrol.getVolume();
				if((typeof volume == 'number') && (volume != -1)){
					volumeChangeCallback(volume);
				}
			}
			success();
		}
		catch (e) {
			fail(e);
		}
	},
	getVolume: function (success, fail, args) {
		var result = webapis.audiocontrol.getVolume();

		if (result != -1) {
			setTimeout(function () {
				success(result);
			}, 0);
		}
		else {
			setTimeout(function () {
				var e = new Error('failed to getVolume');
				fail(e);
			}, 0);
		}
	},
	setVolumeChangeListener: function (success, fail, args) {
		volumeChangeCallback = args[0];
		if(volumeChangeCallback){
			success();
		}
		else{
			var e = new Error('failed to setVolumeChangeListener');
			fail(e);
		}
	},
	unsetVolumeChangeListener: function (success, fail, args) {
		volumeChangeCallback = '';
		
		if(!volumeChangeCallback){
			success();
		}
		else{
			var e = new Error('failed to unsetVolumeChangeListener');
			fail(e);
		}
	}
};

require('cordova/exec/proxy').add('toast.tvaudiocontrol', module.exports);
