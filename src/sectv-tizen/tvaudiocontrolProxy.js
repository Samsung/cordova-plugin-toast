'use strict';

module.exports = {
	setMute: function (success, fail, args) {
		try {
			tizen.tvaudiocontrol.setMute(args[0]);

			setTimeout(function () {
				success();
			}, 0);
		}
		catch (e) {
			fail(e);
		}
	},
	isMute: function (success, fail, args) {
		try {
			var result = tizen.tvaudiocontrol.isMute();

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
			tizen.tvaudiocontrol.setVolume(args[0]);

			setTimeout(function () {
				success();
			}, 0);
		}
		catch (e) {
			fail(e);
		}
	},
	setVolumeUp: function (success, fail, args) {
		try {
			tizen.tvaudiocontrol.setVolumeUp();

			setTimeout(function () {
				success();
			}, 0);
		}
		catch (e) {
			fail(e);
		}
	},
	setVolumeDown: function (success, fail, args) {
		try {
			tizen.tvaudiocontrol.setVolumeDown();

			setTimeout(function () {
				success();
			}, 0);
		}
		catch (e) {
			fail(e);
		}
	},
	getVolume: function (success, fail, args) {
		try {
			var result = tizen.tvaudiocontrol.getVolume();

			if (typeof result == 'number') {
				setTimeout(function () {
					success(result);
				}, 0);
			}
		}
		catch (e) {
			fail(e);
		}
	},
	setVolumeChangeListener: function (success, fail, args) {
		try {
			tizen.tvaudiocontrol.setVolumeChangeListener(args[0]);

			setTimeout(function () {
				success();
			}, 0);
		}
		catch (e) {
			fail(e);
		}
	},
	unsetVolumeChangeListener: function (success, fail, args) {
		try {
			tizen.tvaudiocontrol.unsetVolumeChangeListener();

			setTimeout(function () {
				success();
			}, 0);
		}
		catch (e) {
			fail(e);
		}
	}
};

require('cordova/exec/proxy').add('toast.tvaudiocontrol', module.exports);
