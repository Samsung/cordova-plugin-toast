'use strict';

module.exports = {
	getVersion: function (success, fail, args) {
		try {
			var result = webapis.drminfo.getVersion();

			setTimeout(function () {
				success(result);
			}, 0);
		}
		catch (e) {
			fail(e);
		}
	},
	getEsn: function(success, fail, args){
		try {
			var result = webapis.drminfo.getEsn(args[0]);

			setTimeout(function () {
				success(result);
			}, 0);
		}
		catch (e) {
			fail(e);
		}
	},
	getSdiId: function(success, fail, args){
		try {
			var result = webapis.drminfo.getSdiId();

			setTimeout(function () {
				success(result);
			}, 0);
		}
		catch (e) {
			fail(e);
		}
	}
};

require('cordova/exec/proxy').add('toast.drminfo',module.exports);
