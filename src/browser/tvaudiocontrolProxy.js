'use strict';

// var audioOutputMode = [ 'PCM', 'DOLBY', 'DTS', 'AAC' ];
// var audioBeepType = [ 'UP', 'DOWN', 'LEFT', 'RIGHT', 'PAGE_LEFT', 'PAGE_RIGHT', 'BACK', 'SELECT', 'CANCEL', 'WARNING', 'KEYPAD', 'KEYPAD_ENTER', 'KEYPAD_DEL', 'MOVE', 'PREPARING' ];

module.exports = {
	setMute: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			console.log('success : ' + success + ' , fail : ' + fail + ' , args : '+args);
		} catch (e) {
			throw e;
		}
	},
	isMute: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			console.log('success : ' + success + ' , fail : ' + fail + ' , args : '+args);
		} catch (e) {
			throw e;
		}
	},
	setVolume: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			console.log('success : ' + success + ' , fail : ' + fail + ' , args : '+args);
		} catch (e) {
			throw e;
		}
	},
	setVolumeUp: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			console.log('success : ' + success + ' , fail : ' + fail + ' , args : '+args);
		} catch (e) {
			throw e;
		}	
	},
	setVolumeDown: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			console.log('success : ' + success + ' , fail : ' + fail + ' , args : '+args);
		} catch (e) {
			throw e;
		}
	},
	getVolume: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			console.log('success : ' + success + ' , fail : ' + fail + ' , args : '+args);
		} catch (e) {
			throw e;
		}
	},
	setVolumeChangeListener: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			console.log('success : ' + success + ' , fail : ' + fail + ' , args : '+args);
		} catch (e) {
			throw e;
		}
	},
	unsetVolumeChangeListener: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			console.log('success : ' + success + ' , fail : ' + fail + ' , args : '+args);
		} catch (e) {
			throw e;
		}
	},
	getOutputMode: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			console.log('success : ' + success + ' , fail : ' + fail + ' , args : '+args);
		} catch (e) {
			throw e;
		}
	},
	playSound: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			console.log('success : ' + success + ' , fail : ' + fail + ' , args : '+args);
		} catch (e) {
			throw e;
		}
	}
};

require('cordova/exec/proxy').add('toast.tvaudiocontrol', module.exports);