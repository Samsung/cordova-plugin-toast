'use strict';

var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var tvaudiocontrolExport = {
	setMute: function (mute, successCallback, errorCallback) {
		argscheck.checkArgs('*fF', 'tvaudiocontrol.setMute', arguments);
		errorCallback = errorCallback || function () {};

		if(typeof mute != 'boolean'){
			var error = new TypeError('First parameter needs to be boolean type.');
			throw error;
		}

		var args = [mute];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setMute', args);
	},
	isMute: function (successCallback, errorCallback) {
		argscheck.checkArgs('fF', 'tvaudiocontrol.isMute', arguments);
		errorCallback = errorCallback || function () {};

		var args = [];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'isMute', args);
	},
	setVolume: function (volume, successCallback, errorCallback) {
		argscheck.checkArgs('nfF', 'tvaudiocontrol.setVolume', arguments);
		errorCallback = errorCallback || function () {};

		var args = [volume];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setVolume', args);
	},
	setVolumeUp: function (successCallback, errorCallback) {
		argscheck.checkArgs('fF', 'tvaudiocontrol.setVolumeUp', arguments);
		errorCallback = errorCallback || function () {};

		var args = [];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setVolumeUp', args);
	},
	setVolumeDown: function (successCallback, errorCallback) {
		argscheck.checkArgs('fF', 'tvaudiocontrol.setVolumeDown', arguments);
		errorCallback = errorCallback || function () {};

		var args = [];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setVolumeDown', args);
	},
	getVolume: function (successCallback, errorCallback) {
		argscheck.checkArgs('fF', 'tvaudiocontrol.getVolume', arguments);
		errorCallback = errorCallback || function () {};

		var args = [];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'getVolume', args);
	},
	setVolumeChangeListener: function (callback, successCallback, errorCallback) {
		argscheck.checkArgs('ffF', 'tvaudiocontrol.setVolumeChangeListener', arguments);
		errorCallback = errorCallback || function () {};

		var args = [callback];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setVolumeChangeListener', args);
	},
	unsetVolumeChangeListener: function (successCallback, errorCallback) {
		argscheck.checkArgs('fF', 'tvaudiocontrol.unsetVolumeChangeListener', arguments);
		errorCallback = errorCallback || function () {};

		var args = [];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'unsetVolumeChangeListener', args);
	}
};

module.exports = tvaudiocontrolExport;
