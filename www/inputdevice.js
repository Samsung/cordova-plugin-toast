'use strict';

var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var inputdeviceExport = {};

inputdeviceExport = {
	//void getSupportedKeys(InputDevicesKeyCallback callback, option ErrorCallback error?)
	getSupportedKeys: function (callback, error) {
		argscheck.checkArgs('fF', 'inputdevice.getSupportedKeys', arguments);
		error = error || function () {};

		var args = [];

		exec(callback, error, 'toast.inputdevice', 'getSupportedKeys', args);
	},
	//void getKey(InputDeviceKeyName keyName)
	getKey: function (keyName) {
		argscheck.checkArgs('s', 'inputdevice.getKey', arguments);
		var args = [keyName];
		exec(null, null, 'toast.inputdevice', 'getKey', args);
	},
	//void registerKey(InputDeviceKeyName keyName)
	registerKey: function (keyName) {
		argscheck.checkArgs('s', 'inputdevice.registerKey', arguments);
		var args = [keyName];
		exec(null, null, 'toast.inputdevice', 'registerKey', args);
	},
	//void unregisterKey(InputDeviceKeyName keyName)
	unregisterKey: function (keyName) {
		argscheck.checkArgs('s', 'inputdevice.unregisterKey', arguments);
		var args = [keyName];
		exec(null, null, 'toast.inputdevice', 'unregisterKey', args);
	}
};

module.exports = inputdeviceExport;