'use strict';

var windowType = ['MAIN'];
var channelChangeCallback = [];

function fireChannelChangeEvent (channelInfo, windowType) {
	for (var i = 0; i < channelChangeCallback.length; i++) {
		channelChangeCallback[i](channelInfo, windowType);
	}
}

module.exports = {
	tune: function (success, fail, args) {
		try {
			webapis.tv.channel.tune(args[0], success, fail, args[1]);

			setTimeout(function () {
				fireChannelChangeEvent(webapis.tv.channel.getCurrentChannel(windowType[0]), windowType[0]);
			}, 0);

		} catch (e) {
			throw e;
		}
	},
	tuneUp: function (success, fail, args) {
		try {
			webapis.tv.channel.tuneUp(success, fail, args[0], args[1]);

			setTimeout(function () {
				fireChannelChangeEvent(webapis.tv.channel.getCurrentChannel(windowType[0]), windowType[0]);
			}, 0);				
		} catch (e) {
			throw e;
		}
	},
	tuneDown: function (success, fail, args) {
		try {
			webapis.tv.channel.tuneDown(success, fail, args[0], args[1]);

			setTimeout(function () {
				fireChannelChangeEvent(webapis.tv.channel.getCurrentChannel(windowType[0]), windowType[0]);
			}, 0);
		} catch (e) {
			throw e;
		}
	},
	findChannel: function (success, fail, args) {
		try {
			webapis.tv.channel.findChannel(args[0], args[1], success, fail);
		} catch (e) {
			throw e;
		}
	},
	getChannelList: function (success, fail, args) {
		try {
			webapis.tv.channel.getChannelList(success, fail, args[0], args[1], args[2]);
		} catch (e) {
			throw e;
		}
	},
	getCurrentChannel: function (success, fail, args) {
		try {
			var channelInfo = webapis.tv.channel.getCurrentChannel(args[0]);

			if (typeof channelInfo == 'object') {
				setTimeout(function () {
					success(channelInfo);
				}, 0);
			} else {
				setTimeout(function () {
					fail({
						code: 9,
						name: 'NOT_SUPPORTED_ERR',
						message: 'Any other error occurs on platform.'
					});
				}, 0);
			}
		} catch (e) {
			throw e;
		}
	},
	getProgramList: function (success, fail, args) {
		try {
			webapis.tv.channel.getProgramList(args[0], args[1], success, fail, args[2]);
		} catch (e) {
			throw e;
		}
	},
	getCurrentProgram: function (success, fail, args) {
		try {
			var programInfo = webapis.tv.channel.getCurrentProgram(args[0]);

			if (typeof programInfo == 'object') {
				setTimeout(function () {
					success(programInfo);
				}, 0);
			} else {
				setTimeout(function () {
					fail({
						code: 9,
						name: 'NOT_SUPPORTED_ERR',
						message: 'Any other error occurs on platform.'
					});
				}, 0);
			}
		} catch (e) {
			throw e;
		}
	},
	addChannelChangeListener: function (success, fail, args) {
		channelChangeCallback.push(success);
	},
	removeChannelChangeListener: function (success, fail, args) {
		for (var i = 0; i < channelChangeCallback.length; i++) {
			if (channelChangeCallback[i] === success) {
				channelChangeCallback.splice(i, 1);
			}
		}
	}
};

require('cordova/exec/proxy').add('toast.tvchannel', module.exports);