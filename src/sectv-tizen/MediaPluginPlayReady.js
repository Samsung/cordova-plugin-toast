var exec = require('cordova/exec'),
    MediaPlugin = require('cordova-plugin-toast.MediaPlugin');

function MediaPluginPlayReady () {
	MediaPlugin.apply(this, arguments);
	this.name = 'MediaPluginPlayReady';
}

MediaPluginPlayReady.prototype = new MediaPlugin();

MediaPluginPlayReady.prototype.onAttachToMedia = function (media) {
	var me = this;
	media.registerHook('beforeopen', function (media, args) {
		exec(null, null, 'toast.Media', 'setDrm', [
			'PLAYREADY',
			'SetProperties',
			JSON.stringify(me.options)
		]);
	});
};

module.exports = MediaPluginPlayReady;
