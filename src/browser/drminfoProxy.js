'use strict';

// dummy data from tizen
var dummyVersion = '1.0';
var dummyEsn = 'TIZENKEY';
var dummySdiId = 'TIZENKEY';

module.exports = {
	getVersion: function (success, fail, args) {
		try{
			var result = dummyVersion;
			success(result);
		}
		catch(e) {
			fail(new Error('failed to getVersion'));
		}
	},
	getEsn: function(success, fail, args){
		try{
			var result = dummyEsn;
			success(result);
		}
		catch(e) {
			fail(new Error('failed to getEsn'));
		}
	},
	getSdiId: function(success, fail, args){
		try{
			var result = dummySdiId;
			success(result);
		}
		catch(e) {
			fail(new Error('failed to getSdiId'));
		}
	}
};

require('cordova/exec/proxy').add('toast.drminfo',module.exports);
