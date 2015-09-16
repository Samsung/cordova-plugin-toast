'use strict';

var SEF = require('cordova/plugin/SEF');

var version = '1.0';

module.exports = {
	getVersion: function (success, fail, args) {
		var result = version;

		if (typeof result == 'string') {
			setTimeout(function () {
				success(result);
			}, 0);
		}
		else {
			setTimeout(function () {
				var e = new Error('failed to getVersion');
				fail(e);
			}, 0);
		}
	},
	getEsn: function(success, fail, args){
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
				var e = new Error('failed to getEsn');
				fail(e);
				SEF.close();
			}, 0);
		}
	},
	getSdiId: function(success, fail, args){
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
				var e = new Error('failed to getSdiId');
				fail(e);
				SEF.close();
			}, 0);
		}
	}
};

require('cordova/exec/proxy').add('toast.drminfo',module.exports);
