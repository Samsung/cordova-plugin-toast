'use strict';

var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var tvaudiocontrolExport = {};

tvaudiocontrolExport = {
	//void setMute(boolean mute) raises(WebAPIException)
	setMute: function (mute) {
		argscheck.checkArgs('*', 'tvaudiocontrol.setMute', arguments);

		var args = [mute];
		exec(null, null, 'toast.tvaudiocontrol', 'setMute', args);
	},
	//boolean isMute(isMuteSuccessCallback successCallback, ErrorCallback errorCallback) raises(WebAPIException)
	isMute: function (successCallback, errorCallback) {
		argscheck.checkArgs('fF', 'tvaudiocontrol.isMute', arguments);
		errorCallback = errorCallback || function () {};

		var args = [];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'isMute', args);
	},
	//void setVolume(unsigned short volume) raise(WebAPIException)
	setVolume: function (volume) {
		argscheck.checkArgs('n', 'tvaudiocontrol.setVolume', arguments);

		var args = [volume];
		exec(null, null, 'toast.tvaudiocontrol', 'setVolume', args);
	},
	//void setVolumeUp() raise(WebAPIException)
	setVolumeUp: function () {
		var args = [];
		exec(null, null, 'toast.tvaudiocontrol', 'setVolumeUp', args);
	},
	//void setVolumeDown() raise(WebAPIException)
	setVolumeDown: function () {
		var args = [];
		exec(null, null, 'toast.tvaudiocontrol', 'setVolumeDown', args);
	},
	//unsigned short getVolume(getVolumeSuccessCallback successCallback, ErrorCallback errorCallback) raise(WebAPIException)
	getVolume: function (successCallback, errorCallback) {
		argscheck.checkArgs('fF', 'tvaudiocontrol.getVolume', arguments);
		errorCallback = errorCallback || function () {};

		var args = [];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'getVolume', args);
	},
	//void setVolumeChangeListener(VolumeChangeCallback callback)
	setVolumeChangeListener: function (callback) {
		argscheck.checkArgs('f', 'tvaudiocontrol.setVolumeChangeListener', arguments);
		
		var args = [];
		exec(callback, null, 'toast.tvaudiocontrol', 'setVolumeChangeListener', args);
	},
	//void unsetVolumeChangeListener()
	unsetVolumeChangeListener: function () {
		var args = [];
		exec(null, null, 'toast.tvaudiocontrol', 'unsetVolumeChangeListener', args);
	},
	//AudioOutputMode getOutputMode(getOutputModeSuccessCallback successCallback, ErrorCallback errorCallback)
	getOutputMode: function (successCallback, errorCallback) {
		argscheck.checkArgs('fF', 'tvaudiocontrol.getOutputMode', arguments);
		errorCallback = errorCallback || function () {};

		var args = [];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'getOutputMode', args);
	},
	//void playSound(AudioBeepType type)
	playSound: function (type) {
		argscheck.checkArgs('o', 'tvaudiocontrol.getOutputMode', arguments);

		var args = [type];
		exec(null, null, 'toast.tvaudiocontrol', 'playSound', args);
	}
};

module.exports = tvaudiocontrolExport;