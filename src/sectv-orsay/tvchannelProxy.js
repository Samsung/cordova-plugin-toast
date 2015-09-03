'use strict';

module.exports = {
	tune: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
	},
	tuneUp: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
	},
	tuneDown: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
	},
	findChannel: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
	},
	getChannelList: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
	},
	getCurrentChannel: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
	},
	getProgramList: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
	},
	getCurrentProgram: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
	},
	addChannelChangeListener: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
	},
	removeChannelChangeListener: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
	}
};

require('cordova/exec/proxy').add('toast.tvchannel', module.exports);