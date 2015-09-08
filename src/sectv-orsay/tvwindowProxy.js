'use strict';

module.exports = {
	getAvailableWindows: function (success, fail, args) {
		webapis.tv.window.getAvailableWindow(success, fail);
	},
	setSource: function (success, fail, args){
		webapis.tv.window.setSource(args[0], success, fail, args[1]);
	},
	getSource: function (success, fail, args) {
		var source = tizen.tvwindow.getSource(args[0]);

		setTimeout(function () {
			success(source);
		}, 0);
	},
	show: function (success, fail, args) {
		if (webapis.tv.window.setRect(args[0], args[1])) {
			if (webapis.tv.window.show(args[1])) {
				setTimeout(function () {
					success();
				}, 0);
			} else {
				setTimeout(function () {
					fail();
				}, 0);
			}
		} else {
			setTimeout(function () {
				fail();
			}, 0);
		}
		
	},
	hide: function (success, fail, args) {
		if (webapis.tv.window.hide(args[0])) {
			setTimeout(function () {
				success();
			}, 0);
		} else {
			setTimeout(function () {
				fail();
			}, 0);
		}
	},
	getRect: function (success, fail, args) {

	}
};

require('cordova/exec/proxy').add('toast.tvwindow', module.exports);