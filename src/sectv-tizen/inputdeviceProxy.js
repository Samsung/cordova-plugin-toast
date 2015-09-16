'use strict';

module.exports = {
	getSupportedKeys: function (success, fail, args) {
		try {		
			var supportedKeys = [];
			supportedKeys = tizen.tvinputdevice.getSupportedKeys();
			setTimeout(function(){
				success(supportedKeys);
			}, 0);
		} catch (e) {
			var error = new Error(e.message);
			error.name = e.name;
			setTimeout(function(){
				fail(e);
			}, 0);			
		}
	},
	getKey: function(success, fail, args){
		try	{
			var inputDeviceKey = tizen.tvinputdevice.getKey(args[0]);
			setTimeout(function(){
				success(inputDeviceKey);	
			}, 0);
		} catch (e) {
			var error;
			if(e.name === 'InvalidValuesError') {
				error = new RangeError(e.message);
			}
			else {
				error = new Error(e.message);
			}
			error.name = e.name;
			setTimeout(function(){
				fail(error);
			}, 0);
			
		}
	},
	registerKey: function(success, fail, args){
		try {
			tizen.tvinputdevice.registerKey(args[0]);
		} catch (e) {
			var error;
			if(e.name === 'InvalidValuesError') {
				error = new RangeError(e.message);
			}
			else {
				error = new Error(e.message);
			}
			error.name = e.name;
			setTimeout(function(){
				fail(error);
			}, 0);
		}
	},
	unregisterKey: function(success, fail, args){
		try	{
			tizen.tvinputdevice.unregisterKey(args[0]);
		} catch (e) {
			var error;
			if(e.name === 'InvalidValuesError') {
				error = new RangeError(e.message);
			}
			else {
				error = new Error(e.message);
			}
			error.name = e.name;
			setTimeout(function(){
				fail(error);
			}, 0);
		}
	}
};

require('cordova/exec/proxy').add('toast.inputdevice',module.exports);