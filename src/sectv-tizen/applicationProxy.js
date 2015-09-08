'use strict';

module.exports = {
	exit: function (success, fail, args) {
		tizen.application.getCurrentApplication().exit();
	}
};

require('cordova/exec/proxy').add('toast.application',module.exports);