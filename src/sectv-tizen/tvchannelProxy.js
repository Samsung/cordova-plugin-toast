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
		var channelInfo = tizen.tvchannel.getCurrentChannel(args[0]);

		setTimeout(function () {
			success(channelInfo);
		}, 0);
	},
	getProgramList: function (success, fail, args) {
		tizen.tvchannel.getProgramList(args[0], args[1], success, fail, args[2]);
	},
	getCurrentProgram: function (success, fail, args) {
		tizen.tvchannel.getCurrentProgram(success, fail, args[0]);
	},
	channelListenerId: '';
	addChannelChangeListener: function (success, fail, args) {
		this.channelListenerId = tizen.tvchannel.addChannelChangeListener(success, args[0]);
	},
	removeChannelChangeListener: function (success, fail, args) {
		tizen.tvchannel.removeChannelChangeListener(channelListenerId);
	}
};

require("cordova/exec/proxy").add("toast.tvchannel", module.exports);