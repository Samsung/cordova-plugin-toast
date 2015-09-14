'use strict';

// dummy data from tizen
var dummyVersion = "0.1";
var dummyEsn = "TIZENKEY";
var dummySdiId = "TIZENKEY";

module.exports = {
	getVersion: function (success, fail, args) {
		success = success || function () {};
		fail = fail || function() {};
		args = args || '';

		var result = dummyVersion;

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
	},
	getEsn: function(success, fail, args){
		success = success || function () {};
		fail = fail || function() {};
		args = args || '';

		var result = dummyEsn;

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
	},
	getSdiId: function(success, fail, args){
		success = success || function () {};
		fail = fail || function() {};
		args = args || '';

		var result = dummySdiId;

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
	}
};

require('cordova/exec/proxy').add('toast.drminfo',module.exports);
