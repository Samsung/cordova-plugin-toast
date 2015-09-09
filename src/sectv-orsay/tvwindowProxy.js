'use strict';

module.exports = {
	getAvailableWindows: function (success, fail, args) {
		try {
			webapis.tv.window.getAvailableWindow(success, fail);
		} catch (e) {
			throw e;
		}
		
	},
	setSource: function (success, fail, args){
		try {
			webapis.tv.window.setSource(args[0], success, fail, args[1]);
		} catch (e) {
			throw e;
		}
	},
	getSource: function (success, fail, args) {
		try {
			var source = webapis.tv.window.getSource(_windowID);

			setTimeout(function () {
				success(source);
			}, 0);	
		} catch (e) {
			throw e;
		}
		
	},
	show: function (success, fail, args) {
		try {
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
		} catch (e) {
			throw e;
		}
	},
	hide: function (success, fail, args) {
		try {
			if (webapis.tv.window.hide(args[0])) {
				setTimeout(function () {
					success();
				}, 0);
			} else {
				setTimeout(function () {
					fail();
				}, 0);
			}
		} catch (e) {
			throw e;
		}
	},
	getRect: function (success, fail, args) {
		try {
			webaspi.tv.window.getRect(success, fail);
		} catch (e) {

		}

	}
};

require('cordova/exec/proxy').add('toast.tvwindow', module.exports);