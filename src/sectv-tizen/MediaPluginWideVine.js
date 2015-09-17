var exec = require('cordova/exec');

function MediaPluginWideVine () {
	this.name = 'MediaPluginWideVine';
}

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
			getOptionString()
		]);
	});
};

module.exports = MediaPluginWideVine;
