// DO NOT USE THIS MODULE
'use strict';

// we just use DOMError for now.
// we'll implement this when more information need to be passed with the error.
function ToastError (name, message) {
	if(!(this instanceof ToastError)) {
		throw new TypeError('Constructor ToastError requires \'new\'');
	}
	if(!name) {
		throw new TypeError('Not enough arguments to ToastError.');
	}
	// https://developer.mozilla.org/en-US/docs/Web/API/DOMException#Error_constants
	this.name = name;
	this.message = (typeof message !== 'undefined') ? (message + '') : '';
}
ToastError.prototype = new Error();

module.exports = window.DOMError || ToastError;
