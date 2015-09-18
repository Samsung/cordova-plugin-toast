'use strict';

var supportedKeys = [
	{name : 'ColorF0Red', code: 112},
	{name : 'ColorF1Green', code: 113},
	{name : 'ColorF2Yellow', code: 114}, 
	{name : 'ColorF3Blue', code: 115},
	{name : 'MediaRecord', code: 116}, 
	{name : 'MediaPlayPause', code: 117},
	{name : 'MediaStop', code: 118},
	{name : 'MediaFastForward', code: 119},
	{name : 'MediaPlay', code: 120},
	{name : 'MediaPause', code: 121},
	{name : 'MediaRewind', code: 122},
	{name : 'ArrowUp', code: 38},
	{name : 'ArrowRight', code: 39},
	{name : 'ArrowLeft', code: 37},
	{name : 'ArrowDown', code: 40},
	{name : 'Enter', code: 13},
	{name : 'Tools', code: 93},
	{name : 'Return', code: 27}
];

module.exports = {
	getSupportedKeys: function (success, fail, args) {
		try {
			setTimeout(function(){
				success(supportedKeys);
			}, 0);
		} catch (e) {
			setTimeout(function(){
				fail(e);
			}, 0);
		}
	},
	getKey: function(success, fail, args){
		try {
			console.log(args[0]);
			for(var i = 0; i < supportedKeys.length; i++) {
				if(supportedKeys[i].name === args[0]){
					break;
				}
			}
			if(i != supportedKeys.length) {
				setTimeout(function(){
					success(supportedKeys[i]);
				}, 0);
			}
			else {
				var error = new RangeError('keyName is not in the supported keys set.');
				error.name = 'RangeError';
				setTimeout(function(){
					fail(error);
				}, 0);
			}
		} catch(e) {
			setTimeout(function(){
				fail(e);
			}, 0);
		}	
	},
	registerKey: function(success, fail, args){
		for(var i = 0; i < supportedKeys.length; i++) {
			if(supportedKeys[i].name === args[0]){
				break;
			}
		}
		if(i == supportedKeys.length) {
			var error = new RangeError('keyName is not in the supported keys set.');
			error.name = 'RangeError';
			setTimeout(function(){
				fail(error);
			}, 0);
		}
		else {
			setTimeout(function(){
				success();
			}, 0);
		}
	},
	unregisterKey: function(success, fail, args){
		for(var i = 0; i < supportedKeys.length; i++) {
			if(supportedKeys[i].name === args[0]){
				break;
			}
		}
		if(i == supportedKeys.length) {
			var error = new RangeError('keyName is not in the supported keys set.');
			error.name = 'RangeError';
			setTimeout(function(){
				fail(error);
			}, 0);
		}
		else {
			setTimeout(function(){
				success();
			}, 0);			
		}

	}
};

require('cordova/exec/proxy').add('toast.inputdevice',module.exports);
