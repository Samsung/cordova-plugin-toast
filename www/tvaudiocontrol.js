'use strict';

var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var tvaudiocontrolExport = {};

tvaudiocontrolExport = {
	//void setMute(boolean mute)
	setMute: function (mute) {
		argscheck.checkArgs('s', 'tvaudiocontrol.setMute', arguments);
		mute = mute;
		// type = type || 'MAIN';

		// var args = [tuneOption, type];
		// exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setMute', args);
	},
	//boolean isMute()
	isMute: function (successCallback, errorCallback, tuneMode, type) {
		argscheck.checkArgs('oFSS', 'tvaudiocontrol.isMute', arguments);

		errorCallback = errorCallback || function () {};
		tuneMode = tuneMode || 'ALL';
		type = type || 'MAIN';

		var args = [tuneMode, type];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'isMute', args);
	},
	//void setVolume(unsigned short volume)
	setVolume: function (successCallback, errorCallback, tuneMode, type) {
		argscheck.checkArgs('oFSS', 'tvaudiocontrol.setVolume', arguments);

		errorCallback = errorCallback || function () {};
		tuneMode = tuneMode || 'ALL';
		type = type || 'MAIN';

		var args = [tuneMode, type];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setVolume', args);
	},
	//void setVolumeUp()
	setVolumeUp: function (major, minor, successCallback, errorCallback) {
		argscheck.checkArgs('nnfF', 'tvaudiocontrol.setVolumeUp', arguments);

		errorCallback = errorCallback || function () {};

		var args = [major, minor];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setVolumeUp', args);
	},
	//void setVolumeDown()
	setVolumeDown: function (successCallback, errorCallback, mode, nStart, number) {
		argscheck.checkArgs('fFSNN', 'tvaudiocontrol.setVolumeDown', arguments);

		errorCallback = errorCallback || function () {};
		mode = mode || 'ALL';
		nStart = nStart || 0;
		number = number || 0;

		var args = [mode, nStart, number];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setVolumeDown', args);
	},
	//nsigned short getVolume()
	getVolume: function (type) {
		argscheck.checkArgs('S', 'tvaudiocontrol.getVolume', arguments);

		type = type || 'MAIN';

		var args = [type];
		exec(null, null, 'toast.tvaudiocontrol', 'getVolume', args);
	},
	//void setVolumeChangeListener(VolumeChangeCallback callback)
	setVolumeChangeListener: function (channelInfo, startTime, successCallback, errorCallback, duration) {
		argscheck.checkArgs('oofFN', 'tvaudiocontrol.setVolumeChangeListener', arguments);

		errorCallback = errorCallback || function () {};
		duration = duration || 0;

		var args = [channelInfo, startTime, duration];
		exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setVolumeChangeListener', args);
	},
	//void unsetVolumeChangeListener()
	unsetVolumeChangeListener: function (type) {
		argscheck.checkArgs('S', 'tvaudiocontrol.unsetVolumeChangeListener', arguments);

		type = type || 'MAIN';

		var args = [type];
		exec(null, null, 'toast.tvaudiocontrol', 'unsetVolumeChangeListener', args);
	},
	//AudioOutputMode getOutputMode()
	getOutputMode: function (callback, type) {
		argscheck.checkArgs('fS', 'tvaudiocontrol.getOutputMode', arguments);

		type = type || 'MAIN';
		
		var args = [type];
		exec(callback, null, 'toast.tvaudiocontrol', 'getOutputMode', args);
	},
	//void playSound(AudioBeepType type)
	playSound: function (channelListenerId) {
		argscheck.checkArgs('n', 'tvaudiocontrol.playSound', arguments);
		var args = [channelListenerId];
		exec(null, null, 'toast.tvaudiocontrol', 'playSound', args);
	}
};

module.exports = tvaudiocontrolExport;