'use strict';

module.exports = {
	getAvailableWindows: function (success, fail, args) {
		fail = null;
		args = null;

		success(['MAIN']);
	},
	setSource: function (success, fail, args){
		fail = null;

		var element = '';

		var randomColor = function () {
			var color = '#';

			for (var i = 0; i < 6; i++) {
				if(Math.floor(Math.random() * 2) === 0){
				color = color + '0';
				} else {
					color = color + 'f';
				}	
			}

			return color;
		};
		
		if (!document.getElementById('tvwindowshow')) {
			element = document.createElement('div');
			element.id = 'tvwindowshow';
		} else {
			element = document.getElementById('tvwindowshow');
		}

		element.style.backgroundColor = randomColor();

		success(args[0], args[1]);
	},
	getSource: function (success, fail, args) {
		fail = null;
		args = null;

		var source = {};

		source.type = 'HDMI';
		source.number = '1';

		success(source);
	},
	show: function (success, fail, args) {
		fail = null;

		var element = '';
		var randomColor = function(){
			var color = '#';

			for (var i = 0; i < 6; i++) {
				if(Math.floor(Math.random() * 2) === 0){
				color = color + '0';
				} else {
					color = color + 'f';
				}	
			}

			return color;
		};

		if (!document.getElementById('tvwindowshow')) {
			element = document.createElement('div');
			element.id = 'tvwindowshow';
		} else {
			element = document.getElementById('tvwindowshow');
		}

		element.style.position = 'absolute';
		element.style.left = args[0][0];
		element.style.top = args[0][1];
		element.style.width = args[0][2];
		element.style.height = args[0][3];
		element.style.backgroundColor = randomColor();

		document.getElementsByTagName('body')[0].appendChild(element);
		success(args[0], args[1]);
	},
	hide: function (success, fail, args) {
		args = null;

		var element = '';

		if (document.getElementById('tvwindowshow')) {
			element = document.getElementById('tvwindowshow');

			document.getElementsByTagName('body')[0].removeChild(element);
			success();
		} else {
			fail();
		}
	},
	getRect: function (success, fail, args) {
		var element = '';
		var rectangle = [];

		if (document.getElementById('tvwindowshow')) {
			element = document.getElementById('tvwindowshow');

			rectangle[0] = element.style.left;
			rectangle[1] = element.style.top;
			rectangle[2] = element.style.width;
			rectangle[3] = element.style.height;

			if (args[0] == 'px') {
				if (rectangle[0].search('%') != -1) {
					rectangle[0] = (rectangle[0].split('%')[0] / 100) * window.outerWidth;
					rectangle[0] = parseInt(rectangle[0]);
					rectangle[0] = rectangle[0] + 'px';
				}
				if (rectangle[1].search('%') != -1) {
					rectangle[1] = (rectangle[1].split('%')[0] / 100) * window.outerHeight;
					rectangle[1] = parseInt(rectangle[1]);
					rectangle[1] = rectangle[1] + 'px';
				}
				if (rectangle[2].search('%') != -1) {
					rectangle[2] = (rectangle[2].split('%')[0] / 100) * window.outerWidth;
					rectangle[2] = parseInt(rectangle[2]);
					rectangle[2] = rectangle[2] + 'px';
				}
				if (rectangle[3].search('%') != -1) {
					rectangle[3] = (rectangle[3].split('%')[0] / 100) * window.outerHeight;
					rectangle[3] = parseInt(rectangle[3]);
					rectangle[3] = rectangle[3] + 'px';
				}

				success(rectangle, args[1]);
			} else if (args[0] == '%') {
				if (rectangle[0].search('px') != -1) {
					rectangle[0] = (rectangle[0].split('px')[0] * 100) / window.outerWidth;
					rectangle[0] = parseInt(rectangle[0]);
					rectangle[0] = rectangle[0] + '%';
				}
				if (rectangle[1].search('px') != -1) {
					rectangle[1] = (rectangle[1].split('px')[0] * 100) / window.outerHeight;
					rectangle[1] = parseInt(rectangle[1]);
					rectangle[1] = rectangle[1] + '%';
				}
				if (rectangle[2].search('px') != -1) {
					rectangle[2] = (rectangle[2].split('px')[0] * 100) / window.outerWidth;
					rectangle[2] = parseInt(rectangle[2]);
					rectangle[2] = rectangle[2] + '%';
				}
				if (rectangle[3].search('px') != -1) {
					rectangle[3] = (rectangle[3].split('px')[0] * 100) / window.outerHeight;
					rectangle[3] = parseInt(rectangle[3]);
					rectangle[3] = rectangle[3] + '%';
				}

				success(rectangle, args[1]);
			} else {
				fail();
			}

		} else {
			fail();
		}
	}
};

require('cordova/exec/proxy').add('toast.tvwindow',module.exports);