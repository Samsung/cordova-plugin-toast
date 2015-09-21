'use strict';

var volumeChangeCallback = null;

function volumeTrigger(volume){
	if(!volume){
		volume = webapis.audiocontrol.getVolume();
	}

	if(volumeChangeCallback){
		if((typeof volume == 'number') && (volume != -1)){
			volumeChangeCallback(volume);
		}
	}

	var isMute = webapis.audiocontrol.getMute();
	if(isMute){
		webapis.audiocontrol.setMute(false);
	}
}

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
			setTimeout(function () {
				fail(e);
			}, 0);
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
			setTimeout(function () {
				fail(e);
			}, 0);
		}
	},
	setVolume: function (success, fail, args) {
		try {
			webapis.audiocontrol.setVolume(args[0]);

			setTimeout(function () {
				volumeTrigger(args[0]);
				success();
			}, 0);
		}
		catch (e) {
			setTimeout(function () {
				fail(e);
			}, 0);
		}
	},
	setVolumeUp: function (success, fail, args) {
		try {
			webapis.audiocontrol.setVolumeUp();

			setTimeout(function () {
				volumeTrigger();
				success();
			}, 0);
		}
		catch (e) {
			setTimeout(function () {
				fail(e);
			}, 0);
		}
	},
	setVolumeDown: function (success, fail, args) {
		try {
			webapis.audiocontrol.setVolumeDown();

			setTimeout(function () {
				volumeTrigger();
				success();
			}, 0);
		}
		catch (e) {
			setTimeout(function () {
				fail(e);
			}, 0);
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
			setTimeout(function () {
				success();
			}, 0);
		}
		else{
			setTimeout(function () {
				var e = new Error('failed to setVolumeChangeListener');
				fail(e);
			}, 0);
		}
	},
	unsetVolumeChangeListener: function (success, fail, args) {
		volumeChangeCallback = '';

		if(!volumeChangeCallback){
			setTimeout(function () {
				success();
			}, 0);
		}
		else{
			setTimeout(function () {
				var e = new Error('failed to unsetVolumeChangeListener');
				fail(e);
			}, 0);
		}
	}
};

require('cordova/exec/proxy').add('toast.tvaudiocontrol', module.exports);
