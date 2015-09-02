module.exports = {
	getSupportedKeys: function (success, fail, args) {
		
	},
	getKey: function(success, fail, args){

	},
	registerKey: function(success, fail, args){

	},
	unregisterKey: function(success, fail, args){

	}
};

require('cordova/exec/proxy').add('toast.inputdevice',module.exports);