var exec = require('cordova/exec'),
    MediaPlugin = require('cordova-plugin-toast.MediaPlugin');

function MediaPluginHLS () {
	MediaPlugin.apply(this, arguments);
	this.name = 'MediaPluginHLS';
}

MediaPluginHLS.prototype = new MediaPlugin();

function getOptionString(options) {
	var opts = [];
	for(var key in options) {
		opts.push(key + '=' + options[key]);
	}
	return '|'+opts.join('|');
}

MediaPluginHLS.prototype.onAttachToMedia = function (media) {
	if(this.options){
		var me = this;
		media.registerHook('afteropen', function (media, args) {
			exec(null, null, 'toast.Media', 'setStreamingProperty', [
				'ADAPTIVE_INFO',
				getOptionString(me.options)
			]);
		});
	}
};

module.exports = MediaPluginHLS;
