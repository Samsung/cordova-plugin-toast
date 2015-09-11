'use strict';

module.exports = {
	setMute: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			tizen.tvaudiocontrol.setMute(args[0]);
		} catch (e) {
			throw e;
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

			tizen.tvaudiocontrol.setVolume(args[0]);
		} catch (e) {
			throw e;
		}
	},
	setVolumeUp: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			tizen.tvaudiocontrol.setVolumeUp();
		} catch (e) {
			throw e;
		}	
	},
	setVolumeDown: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			tizen.tvaudiocontrol.setVolumeDown();
		} catch (e) {
			throw e;
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

			tizen.tvaudiocontrol.setVolumeChangeListener(success);
		} catch (e) {
			throw e;
		}
	},
	unsetVolumeChangeListener: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			tizen.tvaudiocontrol.unsetVolumeChangeListener();
		} catch (e) {
			throw e;
		}
	}
};

require('cordova/exec/proxy').add('toast.tvaudiocontrol', module.exports);