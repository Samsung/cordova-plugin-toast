'use strict';

module.exports = {
	setMute: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
		// var element = '';
		// var source = {};
		// var randomColor = function(){
		// 	var color = '#';

		// 	for(var i = 0; i < 6; i++){
		// 		if(Math.floor(Math.random() * 2) === 0){
		// 		color = color + '0';
		// 		} else {
		// 			color = color + 'f';
		// 		}   
		// 	}

		// 	return color;
		// }
		
		// if (!document.getElementById('tvwindowshow')) {
		// 	element = document.createElement('div');
		// 	element.id = 'tvwindowshow';
		// } else {
		// 	element = document.getElementById('tvwindowshow');
		// }
		// element.style.backgroundColor = randomColor();

		// var channelInfo = {
		// 	major: args[0]['major'],
		// 	minor: args[0]['minor'],
		// 	channelName: '',
		// 	programNumber: args[0]['programNumber'],
		// 	ptc: args[0]['ptc'],
		// 	lcn: '',
		// 	sourceID: args[0]['sourceID'],
		// 	transportStreamID: '',
		// 	originalNetworkID: args[0]['originalNetworkID'],
		// 	serviceName:''
		// };

		// success.onsuccess(channelInfo, args[1]);
	},
	tuneUp: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
		// var element = '';
		// var source = {};
		// var randomColor = function(){
		// 	var color = '#';

		// 	for(var i = 0; i < 6; i++){
		// 		if(Math.floor(Math.random() * 2) === 0){
		// 		color = color + '0';
		// 		} else {
		// 			color = color + 'f';
		// 		}   
		// 	}

		// 	return color;
		// }
		
		// if (!document.getElementById('tvwindowshow')) {
		// 	element = document.createElement('div');
		// 	element.id = 'tvwindowshow';
		// } else {
		// 	element = document.getElementById('tvwindowshow');
		// }
		// element.style.backgroundColor = randomColor();

		// var channelInfo = {
		// 	major: '',
		// 	minor: '',
		// 	channelName: '',
		// 	programNumber: '',
		// 	ptc: '',
		// 	lcn: '',
		// 	sourceID: '',
		// 	transportStreamID: '',
		// 	originalNetworkID: '',
		// 	serviceName:''
		// };

		// success.onsuccess(channelInfo, args[1]);
	},
	tuneDown: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
		// var element = '';
		// var source = {};
		// var randomColor = function(){
		// 	var color = '#';

		// 	for(var i = 0; i < 6; i++){
		// 		if(Math.floor(Math.random() * 2) === 0){
		// 		color = color + '0';
		// 		} else {
		// 			color = color + 'f';
		// 		}   
		// 	}

		// 	return color;
		// }
		
		// if (!document.getElementById('tvwindowshow')) {
		// 	element = document.createElement('div');
		// 	element.id = 'tvwindowshow';
		// } else {
		// 	element = document.getElementById('tvwindowshow');
		// }
		// element.style.backgroundColor = randomColor();

		// var channelInfo = {
		// 	major: '',
		// 	minor: '',
		// 	channelName: '',
		// 	programNumber: '',
		// 	ptc: '',
		// 	lcn: '',
		// 	sourceID: '',
		// 	transportStreamID: '',
		// 	originalNetworkID: '',
		// 	serviceName:''
		// };

		// success.onsuccess(channelInfo, args[1]);
	},
	findChannel: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
		// var channelInfo = [{
		// 	major: '',
		// 	minor: '',
		// 	channelName: '',
		// 	programNumber: '',
		// 	ptc: '',
		// 	lcn: '',
		// 	sourceID: '',
		// 	transportStreamID: '',
		// 	originalNetworkID: '',
		// 	serviceName:''
		// },{
		// 	major: '',
		// 	minor: '',
		// 	channelName: '',
		// 	programNumber: '',
		// 	ptc: '',
		// 	lcn: '',
		// 	sourceID: '',
		// 	transportStreamID: '',
		// 	originalNetworkID: '',
		// 	serviceName:''
		// }];

		// success(channelInfo);
	},
	getChannelList: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
		// var channelInfo = [{
		// 	major: '',
		// 	minor: '',
		// 	channelName: '',
		// 	programNumber: '',
		// 	ptc: '',
		// 	lcn: '',
		// 	sourceID: '',
		// 	transportStreamID: '',
		// 	originalNetworkID: '',
		// 	serviceName:''
		// },{
		// 	major: '',
		// 	minor: '',
		// 	channelName: '',
		// 	programNumber: '',
		// 	ptc: '',
		// 	lcn: '',
		// 	sourceID: '',
		// 	transportStreamID: '',
		// 	originalNetworkID: '',
		// 	serviceName:''
		// }];

		// success(channelInfo);
	},
	getCurrentChannel: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
		// var channelInfo = [{
		// 	major: '',
		// 	minor: '',
		// 	channelName: '',
		// 	programNumber: '',
		// 	ptc: '',
		// 	lcn: '',
		// 	sourceID: '',
		// 	transportStreamID: '',
		// 	originalNetworkID: '',
		// 	serviceName:''
		// }];
	},
	getProgramList: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
		// var programInfo = {
		// 	title: '',
		// 	startTime: '',
		// 	duration: '',
		// 	detailedDescription: '',
		// 	language: '',
		// 	rating: ''
		// };

		// success(programInfo);
	},
	getCurrentProgram: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
		// var programInfo = {
		// 	title: '',
		// 	startTime: '',
		// 	duration: '',
		// 	detailedDescription: '',
		// 	language: '',
		// 	rating: ''
		// };
	},
	addChannelChangeListener: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
		// var element = '';
		// var channelInfo = {
		// 	major: '',
		// 	minor: '',
		// 	channelName: '',
		// 	programNumber: '',
		// 	ptc: '',
		// 	lcn: '',
		// 	sourceID: '',
		// 	transportStreamID: '',
		// 	originalNetworkID: '',
		// 	serviceName:''
		// };

		// if (!document.getElementById('tvwindowshow')) {
		// 	element = document.createElement('div');
		// 	element.id = 'tvwindowshow';
		// } else {
		// 	element = document.getElementById('tvwindowshow');
		// }
		// element.addEventListener('DOMAttrModified', function () {
		// 	success(channelInfo, args[1]);
		// });
	},
	removeChannelChangeListener: function (success, fail, args) {
		success = null;
		fail = null;
		args = null;
		// var element = ''

		// if (!document.getElementById('tvwindowshow')) {
		// 	element = document.createElement('div');
		// 	element.id = 'tvwindowshow';
		// } else {
		// 	element = document.getElementById('tvwindowshow');
		// }
		// element.removeEventListener('DOMAttrModified');
	}
};

require('cordova/exec/proxy').add('toast.tvaudiocontrol', module.exports);