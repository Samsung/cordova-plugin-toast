'use strict';

var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var tvchannelExport = {};

tvchannelExport = {
	tune: function (tuneOption, successCallback, errorCallback, type) {
		argscheck.checkArgs('ooFS', 'tvchannel.tune', arguments);

		successCallback.onsuccess = successCallback.onsuccess || function () {};
		successCallback.onnosignal = successCallback.onnosignal || function () {};
		successCallback.onprograminforeceived = successCallback.onprograminforeceived || function () {};
		errorCallback = errorCallback || function () {};
		type = type || 'MAIN';

		var args = [tuneOption, type];
		exec(successCallback, errorCallback, 'toast.tvchannel', 'tune', args);
	},
	tuneUp: function (successCallback, errorCallback, tuneMode, type) {
		argscheck.checkArgs('oFSS', 'tvchannel.tuneUp', arguments);

		successCallback.onsuccess = successCallback.onsuccess || function () {};
		successCallback.onnosignal = successCallback.onnosignal || function () {};
		successCallback.onprograminforeceived = successCallback.onprograminforeceived || function () {};
		errorCallback = errorCallback || function () {};
		tuneMode = tuneMode || 'ALL';
		type = type || 'MAIN';

		var args = [tuneMode, type];
		exec(successCallback, errorCallback, 'toast.tvchannel', 'tuneUp', args);
	},
	tuneDown: function (successCallback, errorCallback, tuneMode, type) {
		argscheck.checkArgs('oFSS', 'tvchannel.tuneDown', arguments);

		successCallback.onsuccess = successCallback.onsuccess || function () {};
		successCallback.onnosignal = successCallback.onnosignal || function () {};
		successCallback.onprograminforeceived = successCallback.onprograminforeceived || function () {};
		errorCallback = errorCallback || function () {};
		tuneMode = tuneMode || 'ALL';
		type = type || 'MAIN';

		var args = [tuneMode, type];
		exec(successCallback, errorCallback, 'toast.tvchannel', 'tuneDown', args);
	},
	findChannel: function (major, minor, successCallback, errorCallback) {
		argscheck.checkArgs('nnfF', 'tvchannel.findChannel', arguments);

		errorCallback = errorCallback || function () {};

		var args = [major, minor];
		exec(successCallback, errorCallback, 'toast.tvchannel', 'findChannel', args);
	},
	getChannelList: function (successCallback, errorCallback, mode, nStart, number) {
		argscheck.checkArgs('fFSNN', 'tvchannel.getChannelList', arguments);

		errorCallback = errorCallback || function () {};
		mode = mode || 'ALL';
		nStart = nStart || 0;
		number = number || 0;

		var args = [mode, nStart, number];
		exec(successCallback, errorCallback, 'toast.tvchannel', 'getChannelList', args);
	},
	getCurrentChannel: function (successCallback, errorCallback, type) {
		argscheck.checkArgs('fFS', 'tvchannel.getCurrentChannel', arguments);

		errorCallback = errorCallback || function () {};
		type = type || 'MAIN';

		var args = [type];
		exec(successCallback, errorCallback, 'toast.tvchannel', 'getCurrentChannel', args);
	},
	getProgramList: function (channelInfo, startTime, successCallback, errorCallback, duration) {
		argscheck.checkArgs('oofFN', 'tvchannel.getProgramList', arguments);

		errorCallback = errorCallback || function () {};
		duration = duration || 0;

		var args = [channelInfo, startTime, duration];
		exec(successCallback, errorCallback, 'toast.tvchannel', 'getProgramList', args);
	},
	getCurrentProgram: function (successCallback, errorCallback, type) {
		argscheck.checkArgs('fFS', 'tvchannel.getCurrentProgram', arguments);

		errorCallback = errorCallback || function () {};
		type = type || 'MAIN';

		var args = [type];
		exec(successCallback, errorCallback, 'toast.tvchannel', 'getCurrentProgram', args);
	},
	addChannelChangeListener: function (callback, type) {
		argscheck.checkArgs('fS', 'tvchannel.addChannelChangeListener', arguments);

		type = type || 'MAIN';
		
		var args = [type];
		exec(callback, null, 'toast.tvchannel', 'addChannelChangeListener', args);
	},
	removeChannelChangeListener: function (callback) {
		argscheck.checkArgs('f', 'tvchannel.removeChannelChangeListener', arguments);

		var args = [];
		exec(callback, null, 'toast.tvchannel', 'removeChannelChangeListener', args);
	}
};

module.exports = tvchannelExport;