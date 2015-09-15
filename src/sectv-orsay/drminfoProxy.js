'use strict';

var SEF = require('cordova/plugin/SEF');

var version = '1.0';

module.exports = {
	getVersion: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			var result = version;

			if (typeof result == 'string') {
				setTimeout(function () {
					success(result);
				}, 0);
			}
			else {
				setTimeout(function () {
					var error = new Error();
					error.name = 'UnknownError';
					error.message = 'UnknownError';
					fail(error);
				}, 0);
			}
		}
		catch (e) {
			throw e;
		}
	},
	getEsn: function(success, fail, args){
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			var sef = SEF.get('ExternalWidgetInterface');
			var result = sef.Execute('GetESN', args[0]);

			if (result) {
				setTimeout(function () {
					success(result);
					SEF.close();
				}, 0);
			}
			else {
				setTimeout(function () {
					var error = new Error();
					error.name = 'UnknownError';
					error.message = 'UnknownError';
					fail(error);
					SEF.close();
				}, 0);
			}
		}
		catch (e) {
			throw e;
		}
	},
	getSdiId: function(success, fail, args){
		try {
			success = success || function () {};
			fail = fail || function() {};
			args = args || '';

			var sef = SEF.get('ExternalWidgetInterface');
			var result = sef.Execute('GetSDI_ID');

			if (result) {
				setTimeout(function () {
					success(result);
					SEF.close();
				}, 0);
			}
			else {
				setTimeout(function () {
					var error = new Error();
					error.name = 'UnknownError';
					error.message = 'UnknownError';
					fail(error);
					SEF.close();
				}, 0);
			}
		}
		catch (e) {
			throw e;
		}
	}
};

require('cordova/exec/proxy').add('toast.drminfo',module.exports);
