'use strict';

var windowType = ['MAIN'];

var systemInfoVideoSourceNumber = 1;
var systemInfoVideoSourceTypeIndex = 0;
var systemInfoVideoSourceTypeList = ['TV', 'AV', 'SVIDEO', 'COMP', 'PC', 'HDMI', 'SCART', 'DVI', 'MEDIA'];

function getTvwindowElement () {
	var element = '';
	
	if (!document.getElementById('tvwindowshow')) {
		element = document.createElement('div');
		element.id = 'tvwindowshow';
	} else {
		element = document.getElementById('tvwindowshow');
	}

	return element;
}

function randomColor () {
	var color = '#';

	for (var i = 0; i < 6; i++) {
		if(Math.floor(Math.random() * 2) === 0){
		color = color + '0';
		} else {
			color = color + 'f';
		}	
	}

	return color;
}

module.exports = {
	getAvailableWindows: function (success, fail, args) {
		setTimeout(function () {
			success(windowType);
		}, 0);
	},
	setSource: function (success, fail, args){
		var match = false;
		var element = getTvwindowElement();

		if (args[0].type && args[0].number) {
			
			for (var i = 0; i < systemInfoVideoSourceTypeList.length; i++) {
				if (args[0].type  == systemInfoVideoSourceTypeList[i]) {
					systemInfoVideoSourceTypeIndex = i;
					systemInfoVideoSourceNumber = args[0].number;
					element.style.backgroundColor = randomColor();

					match = true;
					break;
				}
			}

			if (match) {
				setTimeout(function () {
					success({
						type: systemInfoVideoSourceTypeList[systemInfoVideoSourceTypeIndex],
						number: systemInfoVideoSourceNumber
					}, windowType[0]);
				}, 0);
			} else {
				setTimeout(function () {
					fail({
						code: 17,
						name: 'TYPE_MISMATCH_ERR',
						message: 'Failed to find the source'
					});
				}, 0);	
			}
		} else {
			setTimeout(function () {
				fail({
					code: 17,
					name: 'TYPE_MISMATCH_ERR',
					message: 'Failed to find the source'
				});
			}, 0);	
		}
	},
	getSource: function (success, fail, args) {
		setTimeout(function () {
			success({
				type: systemInfoVideoSourceTypeList[systemInfoVideoSourceTypeIndex],
				number: systemInfoVideoSourceNumber
			});
		}, 0);
	},
	show: function (success, fail, args) {
		var i = 0;
		var match = 0;
		var type1 = /^[1-9][0-9]*px$/;
		var type2 = /^[1-9][0-9]*%$/;
		var element = getTvwindowElement();

		if (args[0].length == 4) {
			for (i = 0; i < args[0].length; i++) {
				if (typeof args[0][i] == 'number') {
					args[0][i] = args[0][i] + 'px';
				}
			}

			for (i = 0; i < args[0].length; i++) {
				if (type1.test(args[0][i]) || type2.test(args[0][i]) || args[0][i] == '0px' || args[0][i] == '0%'){
					match = match + 1;
				}
			}

			if (match == 4) {
				element.style.position = 'absolute';
				element.style.left = args[0][0];
				element.style.top = args[0][1];
				element.style.width = args[0][2];
				element.style.height = args[0][3];
				element.style.backgroundColor = randomColor();
				document.getElementsByTagName('body')[0].appendChild(element);

				setTimeout(function () {
					success([
						element.style.left,
						element.style.top,
						element.style.width,
						element.style.height
					], windowType[0]);
				}, 0);
			} else {
				setTimeout(function () {
					fail({
						code: 17,
						name: 'TYPE_MISMATCH_ERR',
						message: 'Values are wrong.'
					});
				}, 0);
			}
		} else {
			setTimeout(function () {
				fail({
					code: 17,
					name: 'TYPE_MISMATCH_ERR',
					message: 'Values are wrong.'
				});
			}, 0);
		}
	},
	hide: function (success, fail, args) {
		var element = document.getElementById('tvwindowshow');

		if (element) {
			document.getElementsByTagName('body')[0].removeChild(element);

			setTimeout(function () {
				success();
			}, 0);
		} else {
			setTimeout(function () {
				fail({
					code: 11,
					name: 'INVALID_STATE_ERR',
					message: 'There are no window.'
				});
			}, 0);
		}
	},
	getRect: function (success, fail, args) {
		var element = document.getElementById('tvwindowshow');
		var rectangle = [];

		if (element) {
			rectangle[0] = element.style.left;
			rectangle[1] = element.style.top;
			rectangle[2] = element.style.width;
			rectangle[3] = element.style.height;

			if (args[0] == 'px') {
				if (rectangle[0].search('%') != -1) {
					rectangle[0] = (rectangle[0].split('%')[0] / 100) * window.outerWidth;
					rectangle[0] = rectangle[0] + 'px';
				}
				if (rectangle[1].search('%') != -1) {
					rectangle[1] = (rectangle[1].split('%')[0] / 100) * window.outerHeight;
					rectangle[1] = rectangle[1] + 'px';
				}
				if (rectangle[2].search('%') != -1) {
					rectangle[2] = (rectangle[2].split('%')[0] / 100) * window.outerWidth;
					rectangle[2] = rectangle[2] + 'px';
				}
				if (rectangle[3].search('%') != -1) {
					rectangle[3] = (rectangle[3].split('%')[0] / 100) * window.outerHeight;
					rectangle[3] = rectangle[3] + 'px';
				}

				success(rectangle, args[1]);
			} else if (args[0] == '%') {
				if (rectangle[0].search('px') != -1) {
					rectangle[0] = (rectangle[0].split('px')[0] * 100) / window.outerWidth;
					rectangle[0] = rectangle[0] + '%';
				}
				if (rectangle[1].search('px') != -1) {
					rectangle[1] = (rectangle[1].split('px')[0] * 100) / window.outerHeight;
					rectangle[1] = rectangle[1] + '%';
				}
				if (rectangle[2].search('px') != -1) {
					rectangle[2] = (rectangle[2].split('px')[0] * 100) / window.outerWidth;
					rectangle[2] = rectangle[2] + '%';
				}
				if (rectangle[3].search('px') != -1) {
					rectangle[3] = (rectangle[3].split('px')[0] * 100) / window.outerHeight;
					rectangle[3] = rectangle[3] + '%';
				}

				setTimeout(function () {
					success(rectangle, windowType[0]);
				}, 0);
			} else {
				setTimeout(function () {
					fail({
						code: 17,
						name: 'TYPE_MISMATCH_ERR',
						message: 'Values are wrong.'
					});
				}, 0);
			}

		} else {
			setTimeout(function () {
				fail({
					code: 11,
					name: 'INVALID_STATE_ERR',
					message: 'There are no window.'
				});
			}, 0);
		}
	}
};

require('cordova/exec/proxy').add('toast.tvwindow',module.exports);