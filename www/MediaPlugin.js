function MediaPlugin (opts) {
	this.options = opts;
}

MediaPlugin.prototype.setOption = function (key, value) {
	this.options = this.options || {};
	this.options[key] = value;
};
MediaPlugin.prototype.unsetOption = function (key) {
	if(typeof this.options === 'object' && this.options.hasOwnProperty(key)) {
		delete this.options[key];
	}
};

module.exports = MediaPlugin;
