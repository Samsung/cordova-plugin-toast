var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var inputdeviceExport = {};

inputdeviceExport = {
	//InputDeviceKey[] getSupportedKeys ()
	getSupportedKeys: function () {
		var args = [];
		exec(null, null, 'toast.inputdevice', 'getSupportedKeys', args);
	},
	//InputDeviceKey? getKey(InputDeviceKeyName keyName)
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