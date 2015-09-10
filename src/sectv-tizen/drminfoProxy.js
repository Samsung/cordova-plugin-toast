'use strict';

module.exports = {
	getVersion: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
	},
	getEsn: function(success, fail, args){
		success = null;
		fail = null;
		args = null;
	},
	getSdiId: function(success, fail, args){
		success = null;
		fail = null;
		args = null;
	}
};

require('cordova/exec/proxy').add('toast.drminfo',module.exports);