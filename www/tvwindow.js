'use strict';

var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var tvwindowExport = {};

tvwindowExport = {
	getAvailableWindows: function (successCallback, errorCallback) {
		argscheck.checkArgs('fF', 'tvwindow.getAvailableWindows', arguments);

		errorCallback = errorCallback || function () {};
		
		var args = [];
		exec(successCallback, errorCallback, 'toast.tvwindow', 'getAvailableWindows', args);
	},
	setSource: function (videoSource, successCallback, errorCallback, type) {
		argscheck.checkArgs('ofFS', 'tvwindow.setSource', arguments);
		
		errorCallback = errorCallback || function () {};
		type = type || 'MAIN';

		var args = [videoSource, type];
		exec(successCallback, errorCallback, 'toast.tvwindow', 'setSource', args);
	},
	getSource: function (successCallback, errorCallback, type) {
		argscheck.checkArgs('fFS', 'tvwindow.getSource', arguments);
        
        errorCallback = errorCallback || function () {};
		type = type || 'MAIN';

        var args = [type];
		exec(successCallback, errorCallback, 'toast.tvwindow', 'getSource', args);
	},
	show: function (successCallback, errorCallback, rectangle, type) {
		argscheck.checkArgs('fFaS', 'tvwindow.show', arguments);

		errorCallback = errorCallback || function () {};
		type = type || 'MAIN';

		var args = [rectangle, type];
		exec(successCallback, errorCallback, 'toast.tvwindow', 'show', args);
	},
	hide: function (successCallback, errorCallback, type) {
		argscheck.checkArgs('fFS', 'tvwindow.hide', arguments);
		
		errorCallback = errorCallback || function () {};
		type = type || 'MAIN';

		var args = [type];
		exec(successCallback, errorCallback, 'toast.tvwindow', 'hide', args);
	},
	getRect: function (successCallback, errorCallback, unit, type) {
		argscheck.checkArgs('fFSS', 'tvwindow.getRect', arguments);
		
		errorCallback = errorCallback || function () {};
		unit = unit || 'px';
		type = type || 'MAIN';

		var args = [unit, type];
		exec(successCallback, errorCallback, 'toast.tvwindow', 'getRect', args);
	}
};

module.exports = tvwindowExport;