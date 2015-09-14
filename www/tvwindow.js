'use strict';

var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var tvwindowExport = {};

tvwindowExport = {
	setSource: function (videoSource, successCallback, errorCallback) {
		argscheck.checkArgs('ofF', 'tvwindow.setSource', arguments);
		
		errorCallback = errorCallback || function () {};

		var args = [videoSource];
		exec(successCallback, errorCallback, 'toast.tvwindow', 'setSource', args);
	},
	getSource: function (successCallback, errorCallback) {
		argscheck.checkArgs('fF', 'tvwindow.getSource', arguments);
        
        errorCallback = errorCallback || function () {};

        var args = [];
		exec(successCallback, errorCallback, 'toast.tvwindow', 'getSource', args);
	},
	show: function (successCallback, errorCallback, rectangle) {
		argscheck.checkArgs('fFa', 'tvwindow.show', arguments);

		errorCallback = errorCallback || function () {};

		var args = [rectangle];
		exec(successCallback, errorCallback, 'toast.tvwindow', 'show', args);
	},
	hide: function (successCallback, errorCallback) {
		argscheck.checkArgs('fF', 'tvwindow.hide', arguments);
		
		errorCallback = errorCallback || function () {};

		var args = [];
		exec(successCallback, errorCallback, 'toast.tvwindow', 'hide', args);
	},
	getRect: function (successCallback, errorCallback) {
		argscheck.checkArgs('fF', 'tvwindow.getRect', arguments);
		
		errorCallback = errorCallback || function () {};

		var args = [];
		exec(successCallback, errorCallback, 'toast.tvwindow', 'getRect', args);
	}
};

module.exports = tvwindowExport;