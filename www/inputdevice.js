'use strict';

var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var inputdeviceExport = {
	getSupportedKeys: function (callback, error) {
		argscheck.checkArgs('fF', 'inputdevice.getSupportedKeys', arguments);
		var args = [];
		error = error || function () {};
		exec(callback, error, 'toast.inputdevice', 'getSupportedKeys', args);
	},
	getKey: function (keyName, callback, error) {
		argscheck.checkArgs('sfF', 'inputdevice.getKey', arguments);
		var args = [keyName];
		error = error || function () {};
		exec(callback, error, 'toast.inputdevice', 'getKey', args);
	},
	registerKey: function (keyName, callback, error) {
		argscheck.checkArgs('sfF', 'inputdevice.registerKey', arguments);
		var args = [keyName];
		error = error || function () {};
		exec(callback, error, 'toast.inputdevice', 'registerKey', args);
	},
	unregisterKey: function (keyName, callback, error) {
		argscheck.checkArgs('sfF', 'inputdevice.unregisterKey', arguments);
		var args = [keyName];
		error = error || function () {};
		exec(callback, error, 'toast.inputdevice', 'unregisterKey', args);
	}
};

module.exports = inputdeviceExport;
