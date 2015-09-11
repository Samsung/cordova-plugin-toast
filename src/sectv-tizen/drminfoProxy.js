'use strict';

module.exports = {
	getVersion: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			var result = webapis.drminfo.getVersion();

			if (typeof result == 'boolean') {
				setTimeout(function () {
					success(result);
				}, 0);
			} else {
				var error = new Error();
				error.name = 'UnknownError';
				error.message = 'UnknownError';
				fail(error);
			}
		} catch (e) {
			throw e;
		}
	},
	getEsn: function(success, fail, args){
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			var result = webapis.drminfo.getEsn(args[0]);

			if (typeof result == 'boolean') {
				setTimeout(function () {
					success(result);
				}, 0);
			} else {
				var error = new Error();
				error.name = 'UnknownError';
				error.message = 'UnknownError';
				fail(error);
			}
		} catch (e) {
			throw e;
		}
	},
	getSdiId: function(success, fail, args){
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			var result = webapis.drminfo.getSdiId();

			if (typeof result == 'boolean') {
				setTimeout(function () {
					success(result);
				}, 0);
			} else {
				var error = new Error();
				error.name = 'UnknownError';
				error.message = 'UnknownError';
				fail(error);
			}
		} catch (e) {
			throw e;
		}
	}
};

require('cordova/exec/proxy').add('toast.drminfo',module.exports);