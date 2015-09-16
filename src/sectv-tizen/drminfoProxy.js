'use strict';

module.exports = {
	getVersion: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			var result = webapis.drminfo.getVersion();

			setTimeout(function () {
				success(result);
			}, 0);
		}
		catch (e) {
			fail && fail(e);
		}
	},
	getEsn: function(success, fail, args){
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			var result = webapis.drminfo.getEsn(args[0]);

			setTimeout(function () {
				success(result);
			}, 0);
		}
		catch (e) {
			fail && fail(e);
		}
	},
	getSdiId: function(success, fail, args){
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			var result = webapis.drminfo.getSdiId();

			setTimeout(function () {
				success(result);
			}, 0);
		}
		catch (e) {
			fail && fail(e);
		}
	}
};

require('cordova/exec/proxy').add('toast.drminfo',module.exports);
