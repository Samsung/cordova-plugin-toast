'use strict';

module.exports = {
	getSupportedKeys: function (success, fail, args) {
		args = '';
		var supportedKeys = [];
		fail = fail || function () {};
		supportedKeys = tizen.tvinputdevice.getSupportedKeys();

//		settimeout(function(){
		success(supportedKeys);
//		}, 0);
/*		if (!document.getElementById('tvwindowshow')) {
			element = document.createElement('div');
			element.id = 'tvwindowshow';
		} else {
			element = document.getElementById('tvwindowshow');
		}*/
	},
	getKey: function(success, fail, args){
		//var inputDeviceKey = getKey(args[0]);
		success = success || function () {};
		fail = fail || function () {};
		args = '';
		//success(inputDeviceKey);
	},
	registerKey: function(success, fail, args){
		//tizen.tvinputdevice.registerKey(args[0]);
		success = success || function () {};
		fail = fail || function () {};
		args = '';		
	},
	unregisterKey: function(success, fail, args){
		//tizen.tvinputdevice.unregisterKey(args[0]);
		success = success || function () {};
		fail = fail || function () {};
		args = '';	
	}
};

require('cordova/exec/proxy').add('toast.inputdevice',module.exports);