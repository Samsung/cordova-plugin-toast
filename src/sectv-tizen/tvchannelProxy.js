'use strict';

var channelChangeCallback = [];

module.exports = {
	tune: function (success, fail, args) {
		try {
			tizen.tvchannel.tune(args[0], success, fail, args[1]);
		} catch (e) {
			throw e;
		}
	},
	tuneUp: function (success, fail, args) {
		try {
			tizen.tvchannel.tuneUp(success, fail, args[0], args[1]);
		} catch (e) {
			throw e;
		}
	},
	tuneDown: function (success, fail, args) {
		try {
			tizen.tvchannel.tuneDown(success, fail, args[0], args[1]);
		} catch (e) {
			throw e;
		}
	},
	findChannel: function (success, fail, args) {
		try {
			tizen.tvchannel.findChannel(args[0], args[1], success, fail);
		} catch (e) {
			throw e;
		}
	},
	getChannelList: function (success, fail, args) {
		try {
			tizen.tvchannel.findChannel(args[0], args[1], success, fail);
		} catch (e) {
			throw e;
		}
	},
	getCurrentChannel: function (success, fail, args) {
		try {
			var channelInfo = tizen.tvchannel.getCurrentChannel(args[0]);

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
			tizen.tvchannel.getProgramList(args[0], args[1], success, fail, args[2]);
		} catch (e) {
			throw e;
		}
	},
	getCurrentProgram: function (success, fail, args) {
		try {
			var channelProgram = tizen.tvchannel.getCurrentProgram(args[0]);

			if (typeof channelProgram == 'object') {
				setTimeout(function () {
					success(channelProgram);
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
		channelChangeCallback.push({
			callback: success,
			id : tizen.tvchannel.addChannelChangeListener(success, args[0])
		});
	},
	removeChannelChangeListener: function (success, fail, args) {
		for (var i = 0; i < channelChangeCallback.length; i++) {
			if (channelChangeCallback[i].callback === success) {
				tizen.tvchannel.removeChannelChangeListener(channelChangeCallback[i].id);
				channelChangeCallback.splice(i, 1);
			}
		}
	}
};

require('cordova/exec/proxy').add('toast.tvchannel', module.exports);