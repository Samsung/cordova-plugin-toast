'use strict';


var supportedKeys = [ // Orsay Tizeh  공통 (Code : Orsay(임시))
	{name : '0', code : 17},
	{name : '1', code : 101},
	{name : '2', code: 98},
	{name : '3', code: 6},
	{name : '4', code: 8},
	{name : '5', code: 9},
	{name : '6', code: 10},
	{name : '7', code: 12},
	{name : '8', code: 13},
	{name : '9', code: 14},
	{name : 'PreviousChannel', code: 259},
	{name : 'MediaRewind', code: 412},
	{name : 'MediaPause', code: 74},
	{name : 'MediaFastForward', code: 72},
	{name : 'MediaPlay', code: 415},
	{name : 'MediaStop', code: 413},
	{name : 'MediaRecord', code: 192},
	{name : 'ArrowLeft', code: 4},
	{name : 'ArrowUp', code: 29460},
	{name : 'ArrowRight', code: 5},
	{name : 'ArrowDown', code: 29461},
	{name : 'Enter', code: 29443},
	{name : 'Tools', code: 75},
	{name : 'Return', code: 10009},
	{name : 'Exit', code: 45},
	{name : 'Info', code: 31},
	{name : 'ColorF0Red', code: 108},
	{name : 'ColorF1Green', code: 20},
	{name : 'ColorF2Yellow', code: 31},
	{name : 'ColorF3Blue', code: 22},
	{name : 'VolumeUp', code: 7},
	{name : 'VolumeDown', code: 11},
	{name : 'VolumeMute', code: 27},
	{name : 'ChannelUp', code: 68},
	{name : 'ChannelDown', code: 65},
	{name : 'Source', code: 222}, 
	{name : 'ChannelList', code: 84}, 
	{name : 'Guide', code: 651}, 
	{name : 'MTS', code: 655}
];

module.exports = {
	getSupportedKeys: function (success, fail, args) {
		try {
			success = success || function () {};
			fail = fail || function () {};
			args = args || '';

			setTimeout(function(){
				success(supportedKeys);
			}, 0);
		} catch (e) {
			throw e;
		}
	},
	getKey: function(success, fail, args){
		try {

			for(var i = 0; i < supportedKeys.length; i++){
				if(supportedKeys[i].name === args[0]){
					break;
				}
			}

			if(i != supportedKeys.length)
			{
				setTimeout(function(){
					success(supportedKeys[i].code);
				}, 0);
			}
			else
			{
				setTimeout(function(){
					fail({
						code: 0,
						name: 'NOT_SUPPORTED_ERR',
						message: 'Any other error occurs on platform.'					
					});					
				}, 0);
			}

		} catch(e) {
			throw e;
		}	
	},
	registerKey: function(success, fail, args){
		success = success || function () {};
		fail = fail || function () {};
		args = args || '';
	},
	unregisterKey: function(success, fail, args){
		success = success || function () {};
		fail = fail || function () {};
		args = args || '';
	}
};

require('cordova/exec/proxy').add('toast.inputdevice',module.exports);