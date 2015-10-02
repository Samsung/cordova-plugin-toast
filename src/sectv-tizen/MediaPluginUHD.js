var exec = require('cordova/exec'),
    MediaPlugin = require('cordova-plugin-toast.MediaPlugin');

function MediaPluginUHD () {
    if(webapis.productinfo.isUdPanelSupported()){
        MediaPlugin.apply(this, arguments);
        this.name = 'MediaPluginUHD';
    }
    else {
        throw new Error('This device\'s screen is not suitable for UHD Contents playback.');
    }
}

MediaPluginUHD.prototype = new MediaPlugin();

MediaPluginUHD.prototype.onAttachToMedia = function (media) {
	media.registerHook('afteropen', function (media, args) {
		exec(null, null, 'toast.Media', 'setStreamingProperty', [
			'SET_MODE_4K',
			'TRUE'
		]);
	});
};

module.exports = MediaPluginUHD;
