var exec = require('cordova/exec'),
    MediaPlugin = require('cordova-plugin-toast.MediaPlugin');

function MediaPluginWideVine () {
	MediaPlugin.apply(this, arguments);
	this.name = 'MediaPluginWideVine';
}

MediaPluginWideVine.prototype = new MediaPlugin();

function getOptionString(options) {
	var opts = [];
	for(var key in options) {
		opts.push(key + '=' + options[key]);
	}
	return opts.join('|');
}

MediaPluginWideVine.prototype.onAttachToMedia = function (media) {
	media.registerHook('afteropen', function (media, args) {
		exec(null, null, 'toast.Media', 'setStreamingProperty', [
			'WIDEVINE',
			getOptionString(this.options)
		]);
	});
};

module.exports = MediaPluginWideVine;
