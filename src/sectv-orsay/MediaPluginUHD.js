var exec = require('cordova/exec'),
    MediaPlugin = require('cordova-plugin-toast.MediaPlugin'),
    SEF = require('cordova/plugin/SEF');

function MediaPluginUHD () {
    var TVPlugin = SEF.get('TV');
    var panelResolution = JSON.parse(TVPlugin.Execute('GetPanelResolution'));
    if(Number(panelResolution.vertical) >= 2160){
        MediaPlugin.apply(this, arguments);
        this.name = 'MediaPluginUHD';
    }
    else {
        throw new Error('This device\'s screen is not suitable for UHD Contents playback.');
    }
}

MediaPluginUHD.prototype = new MediaPlugin();

MediaPluginUHD.prototype.onAttachToMedia = function (media) {
	media.registerHook('afterplay', function (media, args) {
		exec(null, null, 'toast.Media', 'setStreamingProperty', [
			'SetUHDResolution',true
		]);
	});
};

module.exports = MediaPluginUHD;
