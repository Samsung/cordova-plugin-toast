module.exports = {
	getVersion: function (success, fail, args) {
		
	},
	getEsn: function(success, fail, args){

	},
	getSdiId: function(success, fail, args){

	}
};

require('cordova/exec/proxy').add('toast.drminfo',module.exports);