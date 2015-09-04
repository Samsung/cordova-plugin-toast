'use strict';

var channelChangeCallback = [];

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

function fireChannelChangeEvent (channelInfo, args) {
	for (var i = 0; i < channelChangeCallback.length; i++) {
		channelChangeCallback[i](channelInfo, args);
	}
}

module.exports = {
	tune: function (success, fail, args) {
		var element = getTvwindowElement();

		element.style.backgroundColor = randomColor();

		var channelInfo = {
			major: args[0].major,
			minor: args[0].minor,
			channelName: '',
			programNumber: args[0].programNumber,
			ptc: args[0].ptc,
			lcn: '',
			sourceID: args[0].sourceID,
			transportStreamID: '',
			originalNetworkID: args[0].originalNetworkID,
			serviceName: ''
		};

		setTimeout(function () {
			success.onsuccess(channelInfo, args[1]);
			fireChannelChangeEvent(channelInfo, args[1]);
		}, 0);
	},
	tuneUp: function (success, fail, args) {
		var element = getTvwindowElement();

		element.style.backgroundColor = randomColor();

		var channelInfo = {
			major: '',
			minor: '',
			channelName: '',
			programNumber: '',
			ptc: '',
			lcn: '',
			sourceID: '',
			transportStreamID: '',
			originalNetworkID: '',
			serviceName:''
		};

		setTimeout(function () {
			success.onsuccess(channelInfo, args[1]);
			fireChannelChangeEvent(channelInfo, args[1]);
		}, 0);
	},
	tuneDown: function (success, fail, args) {
		var element = getTvwindowElement();

		element.style.backgroundColor = randomColor();

		var channelInfo = {
			major: '',
			minor: '',
			channelName: '',
			programNumber: '',
			ptc: '',
			lcn: '',
			sourceID: '',
			transportStreamID: '',
			originalNetworkID: '',
			serviceName:''
		};

		setTimeout(function () {
			success.onsuccess(channelInfo, args[1]);
			fireChannelChangeEvent(channelInfo, args[1]);
		}, 0);
	},
	findChannel: function (success, fail, args) {
		fail = null;
		args = null;

		var channelInfo = [{
			major: '',
			minor: '',
			channelName: '',
			programNumber: '',
			ptc: '',
			lcn: '',
			sourceID: '',
			transportStreamID: '',
			originalNetworkID: '',
			serviceName:''
		},{
			major: '',
			minor: '',
			channelName: '',
			programNumber: '',
			ptc: '',
			lcn: '',
			sourceID: '',
			transportStreamID: '',
			originalNetworkID: '',
			serviceName:''
		}];

		setTimeout(function () {
			success(channelInfo);
		}, 0);
	},
	getChannelList: function (success, fail, args) {
		fail = null;
		args = null;

		var channelInfo = [{
			major: '',
			minor: '',
			channelName: '',
			programNumber: '',
			ptc: '',
			lcn: '',
			sourceID: '',
			transportStreamID: '',
			originalNetworkID: '',
			serviceName:''
		},{
			major: '',
			minor: '',
			channelName: '',
			programNumber: '',
			ptc: '',
			lcn: '',
			sourceID: '',
			transportStreamID: '',
			originalNetworkID: '',
			serviceName:''
		}];

		setTimeout(function () {
			success(channelInfo);
		}, 0);
	},
	getCurrentChannel: function (success, fail, args) {
		fail = null;
		args = null;

		var channelInfo = {
			major: '',
			minor: '',
			channelName: '',
			programNumber: '',
			ptc: '',
			lcn: '',
			sourceID: '',
			transportStreamID: '',
			originalNetworkID: '',
			serviceName:''
		};

		setTimeout(function () {
			success(channelInfo);
		}, 0);
	},
	getProgramList: function (success, fail, args) {
		fail = null;
		args = null;

		var programInfo = {
			title: '',
			startTime: '',
			duration: '',
			detailedDescription: '',
			language: '',
			rating: ''
		};

		setTimeout(function () {
			success(programInfo);
		}, 0);
	},
	getCurrentProgram: function (success, fail, args) {
		fail = null;
		args = null;

		var programInfo = {
			title: '',
			startTime: '',
			duration: '',
			detailedDescription: '',
			language: '',
			rating: ''
		};

		setTimeout(function () {
			success(programInfo);
		}, 0);
	},
	addChannelChangeListener: function (success, fail, args) {
		fail = null;
		args = null;

		channelChangeCallback.push(success);
	},
	removeChannelChangeListener: function (success, fail, args) {
		fail = null;
		args = null;

		for (var i = 0; i < channelChangeCallback.length; i++) {
			if (channelChangeCallback[i] === success) {
				channelChangeCallback.splice(i, 1);
			}
		}
	}
};

require('cordova/exec/proxy').add('toast.tvchannel', module.exports);