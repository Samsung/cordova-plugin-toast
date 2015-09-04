'use strict';

var channelChangeCallback = [];

module.exports = {
	tune: function (success, fail, args) {
		tizen.tvchannel.tune(args[0], success, fail, args[1]);
	},
	tuneUp: function (success, fail, args) {
		tizen.tvchannel.tuneUp(success, fail, args[0], args[1]);
	},
	tuneDown: function (success, fail, args) {
		tizen.tvchannel.tuneDown(success, fail, args[0], args[1]);
	},
	findChannel: function (success, fail, args) {
		tizen.tvchannel.findChannel(args[0], args[1], success, fail);
	},
	getChannelList: function (success, fail, args) {
		tizen.tvchannel.findChannel(args[0], args[1], success, fail);
	},
	getCurrentChannel: function (success, fail, args) {
		fail = null;
		
		var channelInfo = tizen.tvchannel.getCurrentChannel(args[0]);

		setTimeout(function () {
			success(channelInfo);
		}, 0);
	},
	getProgramList: function (success, fail, args) {
		tizen.tvchannel.getProgramList(args[0], args[1], success, fail, args[2]);
	},
	getCurrentProgram: function (success, fail, args) {
		fail = null;

		var channelProgram = tizen.tvchannel.getCurrentProgram(args[0]);

		setTimeout(function () {
			success(channelProgram);
		}, 0);
	},
	addChannelChangeListener: function (success, fail, args) {
		fail = null;
		
		channelChangeCallback.push({
			callback: success,
			id : tizen.tvchannel.addChannelChangeListener(success, args[0])
		});
	},
	removeChannelChangeListener: function (success, fail, args) {
		fail = null;
		args = null;

		for (var i = 0; i < channelChangeCallback.length; i++) {
			if (channelChangeCallback[i].callback === success) {
				tizen.tvchannel.removeChannelChangeListener(channelChangeCallback[i].id);
				channelChangeCallback.splice(i, 1);
			}
		}
	}
};

require('cordova/exec/proxy').add('toast.tvchannel', module.exports);