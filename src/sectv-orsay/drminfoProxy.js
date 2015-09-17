'use strict';

var SEF = require('cordova/plugin/SEF');

module.exports = {
	getEsn: function(success, fail, args){
		var sef = SEF.get('ExternalWidgetInterface');
		var result = sef.Execute('GetESN', args[0]);

		if (result) {
			setTimeout(function () {
				success(result);
			}, 0);
		}
		else {
			setTimeout(function () {
				var e = new Error('failed to getEsn');
				fail(e);
			}, 0);
		}
	},
	getSdi: function(success, fail, args){
		var sef = SEF.get('ExternalWidgetInterface');
		var result = sef.Execute('GetSDI_ID');

		if (result) {
			setTimeout(function () {
				success(result);
			}, 0);
		}
		else {
			setTimeout(function () {
				var e = new Error('failed to getSdiId');
				fail(e);
			}, 0);
		}
	}
};

require('cordova/exec/proxy').add('toast.drminfo',module.exports);
