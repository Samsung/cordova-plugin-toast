'use strict';

module.exports = {
	getAvailableWindows: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
	},
	setSource: function (success, fail, args){
		success = null;
		fail = null;
		args = null;
	},
	getSource: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
	},
	show: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
	},
	hide: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
	},
	getRect: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
	}
};

require('cordova/exec/proxy').add('toast.tvwindow', module.exports);