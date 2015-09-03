'use strict';
module.exports = {
	getSupportedKeys: function (success, fail, args) {
		//var inputDevicesKey = [];

		success = success || function () {};
		fail = fail || function () {};
		args = '';
		/*settimeout(function(){
			success(inputDevicesKey);
		}, 0);*/

	},
	getKey: function(success, fail, args){
		success = success || function () {};
		fail = fail || function () {};
		args = '';
	},
	registerKey: function(success, fail, args){
		success = success || function () {};
		fail = fail || function () {};
		args = '';
	},
	unregisterKey: function(success, fail, args){
		success = success || function () {};
		fail = fail || function () {};
		args = '';
	}
};

require('cordova/exec/proxy').add('toast.inputdevice',module.exports);