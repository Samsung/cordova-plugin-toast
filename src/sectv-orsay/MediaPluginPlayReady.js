var exec = require('cordova/exec'),
	MediaPlugin = require('cordova-plugin-toast.MediaPlugin');

var PLAYREADY_CUSTOM_DATA = 3,
	PLAYREADY_LICENSE_SERVER = 4;

function MediaPluginPlayReady () {
	MediaPlugin.apply(this, arguments);
	this.name = 'MediaPluginPlayReady';
}

MediaPluginPlayReady.prototype = new MediaPlugin();

MediaPluginPlayReady.prototype.onAttachToMedia = function (media) {
	var me = this;
	if(this.options.CustomData){
		media.registerHook('afterplay', function (media, args) {
			exec(null, null, 'toast.Media', 'setDrm', [
				'SetPlayerProperty',
				PLAYREADY_CUSTOM_DATA,
				me.options.CustomData,
				me.options.CustomData.length
			]);
		});
	}

	if(this.options.LicenseServer){
		media.registerHook('afterplay', function (media, args) {
			exec(null, null, 'toast.Media', 'setDrm', [
				'SetPlayerProperty',
				PLAYREADY_LICENSE_SERVER,
				me.options.LicenseServer,
				me.options.LicenseServer.length
			]);
		});
	}
};

module.exports = MediaPluginPlayReady;
