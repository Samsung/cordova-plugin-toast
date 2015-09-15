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
			throw error;
		}
	},
	getKey: function(success, fail, args){
		try	{
			var inputDeviceKey = tizen.tvinputdevice.getKey(args[0]);
			setTimeout(function(){
				success(inputDeviceKey);	
			}, 0);
		} catch (e) {
			if(e.name === 'InvalidValuesError') {
				throw toast.tizenutil.createError.fromWebAPIException(e, RangeError);
			}
			throw toast.tizenutil.createError.fromWebAPIException(e);
		}
	},
	registerKey: function(success, fail, args){
		try {
			tizen.tvinputdevice.registerKey(args[0]);
		} catch (e) {
			if(e.name === 'InvalidValuesError') {
				throw toast.tizenutil.createError.fromWebAPIException(e, RangeError);
			}
			throw toast.tizenutil.createError.fromWebAPIException(e);
		}
	},
	unregisterKey: function(success, fail, args){
		try	{
			tizen.tvinputdevice.unregisterKey(args[0]);
		} catch (e) {
			if(e.name === 'InvalidValuesError') {
				throw toast.tizenutil.createError.fromWebAPIException(e, RangeError);
			}
			throw toast.tizenutil.createError.fromWebAPIException(e);
		}
	}
};

require('cordova/exec/proxy').add('toast.inputdevice',module.exports);