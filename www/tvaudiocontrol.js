'use strict';

var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var tvaudiocontrolExport = {
	setMute: function (mute) {
		argscheck.checkArgs('*', 'tvaudiocontrol.setMute', arguments);

		if(typeof mute != 'boolean'){
			var error = new Error();
			error.name = 'TypeMismatchError';
			error.message = 'TypeMismatchError';
			throw error;
		}

		var args = [mute];
		exec(null, null, 'toast.tvaudiocontrol', 'setMute', args);	
	},
	isMute: function (successCallback, errorCallback) {
		argscheck.checkArgs('fF', 'tvaudiocontrol.isMute', arguments);
		errorCallback = errorCallback || function () {};

		var args = [];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'isMute', args);
	},
	setVolume: function (volume) {
		argscheck.checkArgs('n', 'tvaudiocontrol.setVolume', arguments);

		var args = [volume];
		exec(null, null, 'toast.tvaudiocontrol', 'setVolume', args);
	},
	setVolumeUp: function () {
		var args = [];
		exec(null, null, 'toast.tvaudiocontrol', 'setVolumeUp', args);
	},
	setVolumeDown: function () {
		var args = [];
		exec(null, null, 'toast.tvaudiocontrol', 'setVolumeDown', args);
	},
	getVolume: function (successCallback, errorCallback) {
		argscheck.checkArgs('fF', 'tvaudiocontrol.getVolume', arguments);
		errorCallback = errorCallback || function () {};

		var args = [];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'getVolume', args);
	},
	setVolumeChangeListener: function (callback) {
		argscheck.checkArgs('f', 'tvaudiocontrol.setVolumeChangeListener', arguments);
		
		var args = [];
		exec(callback, null, 'toast.tvaudiocontrol', 'setVolumeChangeListener', args);
	},
	unsetVolumeChangeListener: function () {
		var args = [];
		exec(null, null, 'toast.tvaudiocontrol', 'unsetVolumeChangeListener', args);
	}
};

module.exports = tvaudiocontrolExport;