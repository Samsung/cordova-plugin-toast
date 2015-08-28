var argscheck = require('cordova/argscheck'),
	exec = require('cordova/exec');

var tvdeviceExport = {};

tvdeviceExport = {
	//DOMString getVersion()
	getVersion: function () {
		var args = [];
		exec(null, null, 'toast.tvdevice', 'getVersion', args);
	},
	//void setScreenSaver(AppCommonScreenSaverState state, optional SuccessCallback ? onsuccess, optional ErrorCallback ? onerror)
	setScreenSaver: function (state, onsuccess, onerror) {
		argscheck.checkArgs('nFF', 'tvdevice.setScreenSaver', arguments);

		onsuccess = onsuccess || function () {};
		onerror = onerror || function () {};

		var args = [state];
		exec(onsuccess, onerror, 'toast.tvdevice', 'setScreenSaver', args);
	},
	//DOMString getModelCode()
	getModelCode: function () {
		var args = [];
		exec(null, null, 'toast.tvdevice', 'getModelCode', args);
	},
	//DOMString getModel()
	getModel: function () {
		var args = [];
		exec(null, null, 'toast.tvdevice', 'getModel', args);
	},
	//unsigned short getSmartTVServerType()
	getSmartTVServerType: function () {
		var args = [];
		exec(null, null, 'toast.tvdevice', 'getSmartTVServerType', args);
	},
	//DOMString getSmartTVServerVersion()
	getSmartTVServerVersion: function () {
		var args = [];
		exec(null, null, 'toast.tvdevice', 'getSmartTVServerVersion', args);
	},
	//DOMString getTunerEpop()
	getTunerEpop: function () {
		var args = [];
		exec(null, null, 'toast.tvdevice', 'getTunerEpop', args);
	},
	//boolean isSoccerModeEnabled()
	isSoccerModeEnabled: function () {
		var args = [];
		exec(null, null, 'toast.tvdevice', 'isSoccerModeEnabled', args);
	},
	//boolean isTtvSupported()
	isTtvSupported: function () {
		var args = [];
		exec(null, null, 'toast.tvdevice', 'isTtvSupported', args);
	},
	//boolean isUdPanelSupported()
	isUdPanelSupported: function () {
		var args = [];
		exec(null, null, 'toast.tvdevice', 'isUdPanelSupported', args);
	},
	//DOMString getRealModel()
	getRealModel: function () {
		var args = [];
		exec(null, null, 'toast.tvdevice', 'getRealModel', args);
	},
	//unsigned short getNoGlass3dSupport()
	getNoGlass3dSupport: function () {
		var args = [];
		exec(null, null, 'toast.tvdevice', 'getNoGlass3dSupport', args);
	},
	//DOMString getLocalSet()
	getLocalSet: function () {
		var args = [];
		exec(null, null, 'toast.tvdevice', 'getLocalSet', args);
	},
	//DOMString getSystemConfig(unsigned short key)
	getSystemConfig: function (key) {
		argscheck.checkArgs('s', 'tvdevice.getSystemConfig', arguments);
		var args = [];
		exec(null, null, 'toast.tvdevice', 'getSystemConfig', args);
	},
	//void setSystemConfig(unsigned short key, DOMString value, optional SuccessCallback ? onsuccess, optional ErrorCallback ? onerror)
	setSystemConfig: function (key, onsuccess, onerror) {
		argscheck.checkArgs('sFF', 'tvdevice.setSystemConfig', arguments);

		onsuccess = onsuccess || function () {};
		onerror = onerror || function () {};

		var args = [key];
		exec(onsuccess, onerror, 'toast.tvdevice', 'setSystemConfig', args);
	},
	//unsigned long addSystemConfigChangeListener(ProductInfoConfigChangeCallback listener, unsigned short key)
	addSystemConfigChangeListener: function (listener, key) {
		argscheck.checkArgs('fs', 'tvdevice.addSystemConfigChangeListener', arguments);
		var args = [key];
		exec(listener, null, 'toast.tvdevice', 'addSystemConfigChangeListener', args);
	},
	//void removeSystemConfigChangeListener(unsigned long listenerId)
	removeSystemConfigChangeListener: function (listenerId) {
		argscheck.checkArgs('s', 'tvdevice.removeSystemConfigChangeListener', arguments);
		var args = [];
		exec(null, null, 'toast.tvdevice', 'removeSystemConfigChangeListener', args);
	}
};

module.exports = tvdeviceExport;