var MediaPlugin = require('cordova-plugin-toast.MediaPlugin');

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
	var tempSrc = media.src;
	var optionStr = getOptionString(this.options);
	media.registerHook('beforeopen', function (media, args) {
		media.src = media.src + '|COMPONENT=WV|' + optionStr;
	});
	media.registerHook('afterplay', function (media, args) {
		media.src = tempSrc;
	});
};

module.exports = MediaPluginWideVine;
