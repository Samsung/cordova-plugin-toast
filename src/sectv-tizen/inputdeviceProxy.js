'use strict';

module.exports = {
	getSupportedKeys: function (success, fail, args) {
		try {		
			var supportedKeys = [];
			supportedKeys = tizen.tvinputdevice.getSupportedKeys();

			if(typeof supportedKeys == 'object') {
				setTimeout(function(){
					success(supportedKeys);
				}, 0);
			} 
			else {
				setTimeout(function(){
					fail({
						code: 9,
						name: 'NOT_SUPPORTED_ERR',
						message: 'Any other error occurs on platform.'
					});
				}, 0);			
			}
		} catch (e) {
			throw e;
		}
	},
	getKey: function(success, fail, args){
		try	{
			var inputDeviceKey = tizen.tvinputdevice.getKey(args[0]);

			if(typeof inputDeviceKey == 'object') {
				setTimeout(function(){
					success(inputDeviceKey);	
				}, 0);
			}
			else {
				setTimeout(function(){
					fail({
						code: 9,
						name: 'NOT_SUPPORTED_ERR',
						message: 'Any other error occurs on platform.'
					});
				}, 0);			
			}
		} catch (e) {
			throw e;		
		}
	},
	registerKey: function(success, fail, args){
		try {
			tizen.tvinputdevice.registerKey(args[0]);
		} catch (e) {
			throw e;
		}
	},
	unregisterKey: function(success, fail, args){
		try	{
			tizen.tvinputdevice.unregisterKey(args[0]);
		} catch (e) {
			throw e;
		}
	}
};

require('cordova/exec/proxy').add('toast.inputdevice',module.exports);