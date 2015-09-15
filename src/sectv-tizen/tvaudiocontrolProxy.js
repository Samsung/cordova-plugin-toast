'use strict';

var tizenutil = require('cordova-plugin-toast.tizenutil');

module.exports = {
	setMute: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			tizen.tvaudiocontrol.setMute(args[0]);
		}
		catch (e) {
			throw tizenutil.createError.fromWebAPIException(e);
		}
	},
	isMute: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			var result = tizen.tvaudiocontrol.isMute();

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
			throw tizenutil.createError.fromWebAPIException(e);
		}
	},
	setVolume: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			tizen.tvaudiocontrol.setVolume(args[0]);
		}
		catch (e) {
			throw tizenutil.createError.fromWebAPIException(e);
		}
	},
	setVolumeUp: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			tizen.tvaudiocontrol.setVolumeUp();
		}
		catch (e) {
			throw tizenutil.createError.fromWebAPIException(e);
		}
	},
	setVolumeDown: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			tizen.tvaudiocontrol.setVolumeDown();
		}
		catch (e) {
			throw tizenutil.createError.fromWebAPIException(e);
		}
	},
	getVolume: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			var result = tizen.tvaudiocontrol.getVolume();

			if (typeof result == 'number') {
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
			throw tizenutil.createError.fromWebAPIException(e);
		}
	},
	setVolumeChangeListener: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			tizen.tvaudiocontrol.setVolumeChangeListener(success);
		}
		catch (e) {
			throw tizenutil.createError.fromWebAPIException(e);
		}
	},
	unsetVolumeChangeListener: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			tizen.tvaudiocontrol.unsetVolumeChangeListener();
		}
		catch (e) {
			throw tizenutil.createError.fromWebAPIException(e);
		}
	}
};

require('cordova/exec/proxy').add('toast.tvaudiocontrol', module.exports);
