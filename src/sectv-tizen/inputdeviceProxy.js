'use strict';

module.exports = {
	getSupportedKeys: function (success, fail, args) {
		args = args || '';
		fail = fail || function () {};
		
		var supportedKeys = [];
		supportedKeys = tizen.tvinputdevice.getSupportedKeys();

		setTimeout(function(){
			success(supportedKeys);
		}, 0);
	},
	getKey: function(success, fail, args){
		fail = fail || function () {};
		args = args || '';

		var inputDeviceKey = tizen.tvinputdevice.getKey(args[0]).code;

		setTimeout(function(){
			success(inputDeviceKey);	
		}, 0);
	},
	registerKey: function(success, fail, args){
		success = success || function () {};
		fail = fail || function () {};
		args = args || '';

		tizen.tvinputdevice.registerKey(args[0]);
	},
	unregisterKey: function(success, fail, args){
		success = success || function () {};
		fail = fail || function () {};
		args = args || '';
		
		tizen.tvinputdevice.unregisterKey(args[0]);
	}
};

require('cordova/exec/proxy').add('toast.inputdevice',module.exports);