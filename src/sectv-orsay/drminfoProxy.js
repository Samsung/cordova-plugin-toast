'use strict';

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
			} else {
				setTimeout(function () {
					var error = new Error();
					error.name = 'UnknownError';
					error.message = 'UnknownError';
					fail(error);
				}, 0);
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

			var sef = getSefObject();
			sef.Open('ExternalWidgetInterface', '1.000', 'ExternalWidgetInterface');
			var result = sef.Execute('GetESN', args[0]);
			sef.Close();

			if (typeof result == 'string') {
				setTimeout(function () {
					success(result);
				}, 0);
			} else {
				setTimeout(function () {
					var error = new Error();
					error.name = 'UnknownError';
					error.message = 'UnknownError';
					fail(error);
				}, 0);
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

			var sef = getSefObject();
			sef.Open('ExternalWidgetInterface', '1.000', 'ExternalWidgetInterface');
			var result = sef.Execute('GetSDI_ID');
			sef.Close();

			if (typeof result == 'string') {
				setTimeout(function () {
					success(result);
				}, 0);
			} else {
				setTimeout(function () {
					var error = new Error();
					error.name = 'UnknownError';
					error.message = 'UnknownError';
					fail(error);
				}, 0);
			}
		} catch (e) {
			throw e;
		}
	}
};

function getSefObject(){
	var object = '';

	if(!document.getElementById('pluginSef')){
		object = document.createElement('object');
		object.id = 'pluginSef';
		object.border = '0';
		object.setAttribute('classid', 'clsid:SAMSUNG-INFOLINK-SEF');
		object.style.opacity = '0.0';
		object.style.position = 'absolute';
		object.style.visibility = 'hidden';
		object.style.width = '0px';
		object.style.height = '0px';

		document.body.appendChild(object);
	}else{
		object = document.getElementById('pluginSef');
	}

	return object;
}

require('cordova/exec/proxy').add('toast.drminfo',module.exports);