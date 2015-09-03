'use strict';

var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var tvwindowExport = {};

tvwindowExport = {
	//void getAvailableWindows (AvailableWindowListCallback successCallback, optional ErrorCallback? errorCallback)
	getAvailableWindows: function (successCallback, errorCallback) {
		argscheck.checkArgs('fF', 'tvwindow.getAvailableWindows', arguments);

		errorCallback = errorCallback || function () {};
		var args = [];

		exec(successCallback, errorCallback, 'toast.tvwindow', 'getAvailableWindows', args);
	},
	//void setSource (SystemInfoVideoSourceInfo videoSource, SourceChangedSuccessCallback successCallback, optional ErrorCallback? errorCallback, optional WindowType? type)
	setSource: function (videoSource, successCallback, errorCallback, type) {
		argscheck.checkArgs('ofFS', 'tvwindow.setSource', arguments);
		
		errorCallback = errorCallback || function () {};
		type = type || 'MAIN';

		var args = [videoSource, type];
		exec(successCallback, errorCallback, 'toast.tvwindow', 'setSource', args);
	},
	//void getSource (SystemInfoVideoSourceInfoSuccessCallback successCallback, optional SystemInfoVideoSourceInfoErrorCallback? errorCallback, optional WindowType? type)
	getSource: function (successCallback, errorCallback, type) {
		argscheck.checkArgs('fFS', 'tvwindow.getSource', arguments);
        
        errorCallback = errorCallback || function () {};
		type = type || 'MAIN';

        var args = [type];
		exec(successCallback, errorCallback, 'toast.tvwindow', 'getSource', args);
	},
	//void show (WindowRectangleSuccessCallback successCallback, optional ErrorCallback? errorCallback, optional DOMString[]? rectangle, optional WindowType? type)
	show: function (successCallback, errorCallback, rectangle, type) {
		argscheck.checkArgs('fFaS', 'tvwindow.show', arguments);

		errorCallback = errorCallback || function () {};
		type = type || 'MAIN';

		var args = [rectangle, type];
		exec(successCallback, errorCallback, 'toast.tvwindow', 'show', args);
	},
	//void hide (SuccessCallback successCallback, optional ErrorCallback? errorCallback, optional WindowType? type)
	hide: function (successCallback, errorCallback, type) {
		argscheck.checkArgs('fFS', 'tvwindow.hide', arguments);
		
		type = type || 'MAIN';

		var args = [type];
		exec(successCallback, errorCallback, 'toast.tvwindow', 'hide', args);
	},
	//void getRect (WindowRectangleSuccessCallback successCallback, optional ErrorCallback? errorCallback, optional MeasurementUnit? unit, optional WindowType? type)
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