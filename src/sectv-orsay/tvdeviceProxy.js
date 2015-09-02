module.exports = {
	getVersion: function (success, fail, args) {
		
	},
	setScreenSaver: function(success, fail, args){
		if (args[0] == 0 || args[0] == 1) {
			success();
		} else {
			fail();
		}
	},
	getModelCode: function(success, fail, args){

	},
	getModel: function(success, fail, args){

	},
	getSmartTVServerType: function(success, fail, args){

	},
	getSmartTVServerVersion: function(success, fail, args){

	},
	isSoccerModeEnabled: function(success, fail, args){

	},
	isTtvSupported: function(success, fail, args){

	},
	isUdPanelSupported: function(success, fail, args){

	},
	getRealModel: function(success, fail, args){

	},
	getNoGlass3dSupport: function(success, fail, args){

	},
	getLocalSet: function(success, fail, args){

	},
	getSystemConfig: function(success, fail, args){

	},
	setSystemConfig: function(success, fail, args){
		if (0 <= args[0] && args[0] <= 11) {
			success();
		} else {
			fail();
		}
	},
	addSystemConfigChangeListener: function(success, fail, args){
		var element = '';
		
		if (!document.getElementById('tvwindowshow')) {
			element = document.createElement('div');
			element.id = 'tvwindowshow';
		} else {
			element = document.getElementById('tvwindowshow');
		}
		element.addEventListener('DOMAttrModified', function () {
			success(args[0]);
		});
	},
	removeSystemConfigChangeListener: function(success, fail, args){
		
	}
};

require('cordova/exec/proxy').add('toast.tvdevice',module.exports);