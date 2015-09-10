'use strict';

var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var inputdeviceExport = {};

inputdeviceExport = {
	getSupportedKeys: function (callback, error) {
		argscheck.checkArgs('fF', 'inputdevice.getSupportedKeys', arguments);
		callback = callback || function () {};
		error = error || function () {};
		var args = [];
		exec(callback, error, 'toast.inputdevice', 'getSupportedKeys', args);
	},
	getKey: function (keyName, callback, error) {
		argscheck.checkArgs('sfF', 'inputdevice.getKey', arguments); 
		callback = callback || function () {};
		error = error || function () {};
		var args = [];
		args[0] = keyName;
		exec(callback, error, 'toast.inputdevice', 'getKey', args);
	},
	registerKey: function (keyName) {
		argscheck.checkArgs('s', 'inputdevice.registerKey', arguments);
		var args = [keyName];
		exec(null, null, 'toast.inputdevice', 'registerKey', args);
	},
	unregisterKey: function (keyName) {
		argscheck.checkArgs('s', 'inputdevice.unregisterKey', arguments);
		var args = [keyName];
		exec(null, null, 'toast.inputdevice', 'unregisterKey', args);
	}
};

module.exports = inputdeviceExport;