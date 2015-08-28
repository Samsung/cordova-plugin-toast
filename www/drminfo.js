var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var drminfoExport = {};

drminfoExport = {
	//DOMString getVersion()
	getVersion: function () {
		var args = [];
		exec(null, null, 'toast.drminfo', 'getVersion', args);
	},
	//DOMString getEsn(DOMString compName)
	getEsn: function (compName) {
		argscheck.checkArgs('s', 'inputdevice.unregisterKey', arguments);
		var args = [compName];
		exec(null, null, 'toast.drminfo', 'getEsn', args);
	},
	//DOMString getSdiId()
	getSdiId: function () {
		var args = [];
		exec(null, null, 'toast.drminfo', 'getSdiId', args);
	}
};

module.exports = drminfoExport;