'use strict';

module.exports = {
	getAvailableWindows: function (success, fail, args) {
		args = null;
		
		tizen.tvwindow.getAvailableWindows(success, fail);
	},
	setSource: function (success, fail, args){
		tizen.tvwindow.setSource(args[0], success, fail, args[1]);
	},
	getSource: function (success, fail, args) {
		var source = tizen.tvwindow.getSource(args[0]);
		success(source);
	},
	show: function (success, fail, args) {
		tizen.tvwindow.show(success, fail, args[0], args[1]);
	},
	hide: function (success, fail, args) {
		tizen.tvwindow.hide(success, fail, args[0]);
	},
	getRect: function (success, fail, args) {
		tizen.tvwindow.getRect(success, fail, args[0], args[1]);
	}
};

require('cordova/exec/proxy').add('toast.tvwindow', module.exports);