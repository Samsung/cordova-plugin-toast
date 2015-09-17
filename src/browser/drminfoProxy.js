'use strict';

// dummy data from tizen
var dummyEsn = 'TIZENKEY';
var dummySdi = 'TIZENKEY';

module.exports = {
	getEsn: function(success, fail, args){
		try{
			var result = dummyEsn;
			success(result);
		}
		catch(e) {
			fail(new Error('failed to getEsn'));
		}
	},
	getSdi: function(success, fail, args){
		try{
			var result = dummySdi;
			success(result);
		}
		catch(e) {
			fail(new Error('failed to getSdi'));
		}
	}
};

require('cordova/exec/proxy').add('toast.drminfo',module.exports);
