'use strict';

var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var drminfoExport = {
	getEsn: function (compName, successCallback, errorCallback) {
		argscheck.checkArgs('sfF', 'drminfo.getEsn', arguments);
		errorCallback = errorCallback || function () {};

		var args = [compName];
		exec(successCallback, errorCallback, 'toast.drminfo', 'getEsn', args);
	},
	getSdi: function (successCallback, errorCallback) {
		argscheck.checkArgs('fF', 'drminfo.getSdiId', arguments);
		errorCallback = errorCallback || function () {};

		var args = [];
		exec(successCallback, errorCallback, 'toast.drminfo', 'getSdi', args);
	}
};

module.exports = drminfoExport;
