
var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var tvchannelExport = {};

tvchannelExport = {
	//void tune (TuneOption tuneOption, TuneCallback successCallback, optional ErrorCallback? errorCallback, optional WindowType? type)
	tune: function (tuneOption, successCallback, errorCallback, type) {
		argscheck.checkArgs('ooFS', 'tvchannel.tune', arguments);

		successCallback['onsuccess'] = successCallback['onsuccess'] || function () {};
		successCallback['onnosignal'] = successCallback['onnosignal'] || function () {};
		successCallback['onprograminforeceived'] = successCallback['onprograminforeceived']|| function () {};
		errorCallback = errorCallback || function () {};
		type = type || 'MAIN';

		var args = [tuneOption, type];
		exec(successCallback, errorCallback, 'toast.tvchannel', 'tune', args);
	},
	//void tuneUp (TuneCallback successCallback, optional ErrorCallback? errorCallback, optional TuneMode? tuneMode, optional WindowType? type)
	tuneUp: function (successCallback, errorCallback, tuneMode, type) {
		argscheck.checkArgs('oFSS', 'tvchannel.tuneUp', arguments);

		errorCallback = errorCallback || function () {};
		tuneMode = tuneMode || 'ALL';
		type = type || 'MAIN';

		var args = [tuneMode, type];
		exec(successCallback, errorCallback, 'toast.tvchannel', 'tuneUp', args);
	},
	//void tuneDown (TuneCallback successCallback, optional ErrorCallback? errorCallback, optional TuneMode? tuneMode, optional WindowType? type)
	tuneDown: function (successCallback, errorCallback, tuneMode, type) {
		argscheck.checkArgs('oFSS', 'tvchannel.tuneDown', arguments);

		errorCallback = errorCallback || function () {};
		tuneMode = tuneMode || 'ALL';
		type = type || 'MAIN';

		var args = [tuneMode, type];
		exec(successCallback, errorCallback, 'toast.tvchannel', 'tuneDown', args);
	},
	//void findChannel (long major, long minor, FindChannelSuccessCallback successCallback, optional ErrorCallback? errorCallback)
	findChannel: function (major, minor, successCallback, errorCallback) {
		argscheck.checkArgs('nnfF', 'tvchannel.findChannel', arguments);

		errorCallback = errorCallback || function () {};

		var args = [major, minor];
		exec(successCallback, errorCallback, 'toast.tvchannel', 'findChannel', args);
	},
	//void getChannelList (FindChannelSuccessCallback successCallback, optional ErrorCallback? errorCallback, optional TuneMode? mode, optional long? nStart, optional long? number)
	getChannelList: function (successCallback, errorCallback, mode, nStart, number) {
		argscheck.checkArgs('fFSNN', 'tvchannel.getChannelList', arguments);

		errorCallback = errorCallback || function () {};
		mode = mode || 'ALL';
		nStart = nStart || 0;
		number = number || 0;

		var args = [mode, nStart, number];
		exec(successCallback, errorCallback, 'toast.tvchannel', 'getChannelList', args);
	},
	//void getCurrentChannel (ChannelInfoCallback callback, optional WindowType? type)
	getCurrentChannel: function (callback, type) {
		argscheck.checkArgs('fS', 'tvchannel.getCurrentChannel', arguments);

		type = type || 'MAIN';

		var args = [type];
		exec(callback, null, 'toast.tvchannel', 'getCurrentChannel', args);
	},
	//void getProgramList (ChannelInfo channelInfo, TZDate startTime, ProgramListSuccessCallback successCallback, optional ErrorCallback? errorCallback, optional unsigned long? duration)
	getProgramList: function (channelInfo, startTime, successCallback, errorCallback, duration) {
		argscheck.checkArgs('oofFN', 'tvchannel.getProgramList', arguments);

		errorCallback = errorCallback || function () {};
		duration = duration || 0;

		var args = [channelInfo, startTime, duration];
		exec(successCallback, errorCallback, 'toast.tvchannel', 'getProgramList', args);
	},
	//void getCurrentProgram (ProgramInfoCallback callback, optional WindowType? type)
	getCurrentProgram: function (callback, type) {
		argscheck.checkArgs('fS', 'tvchannel.getCurrentProgram', arguments);

		type = type || 'MAIN';

		var args = [type];
		exec(callback, null, 'toast.tvchannel', 'getCurrentProgram', args);
	},
	//void addChannelChangeListener (ChannelChangeCallback callback, optional WindowType? type)
	addChannelChangeListener: function (callback, type) {
		argscheck.checkArgs('fS', 'tvchannel.addChannelChangeListener', arguments);

		type = type || 'MAIN';
		
		var args = [type];
		exec(callback, null, 'toast.tvchannel', 'addChannelChangeListener', args);
	},
	//void removeChannelChangeListener (long channelListenerId)
	removeChannelChangeListener: function (channelListenerId) {
		argscheck.checkArgs('n', 'tvchannel.removeChannelChangeListener', arguments);
		var args = [channelListenerId];
		exec(null, null, 'toast.tvchannel', 'removeChannelChangeListener', args);
	}
};

module.exports = tvchannelExport;