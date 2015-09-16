'use strict';

module.exports = {
	setMute: function (success, fail, args) {
		try {
			var result = tizen.tvaudiocontrol.setMute(args[0]);

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
			var result = tizen.tvaudiocontrol.setVolume(args[0]);

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
	setVolumeUp: function (success, fail, args) {
		try {
			var result = tizen.tvaudiocontrol.setVolumeUp();

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
	setVolumeDown: function (success, fail, args) {
		try {
			var result = tizen.tvaudiocontrol.setVolumeDown();

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
			var result = tizen.tvaudiocontrol.setVolumeChangeListener(args[0]);

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
	unsetVolumeChangeListener: function (success, fail, args) {
		try {
			var result = tizen.tvaudiocontrol.unsetVolumeChangeListener();

			if (result) {
				setTimeout(function () {
					success();
				}, 0);
			}
		}
		catch (e) {
			fail(e);
		}
	}
};

require('cordova/exec/proxy').add('toast.tvaudiocontrol', module.exports);
