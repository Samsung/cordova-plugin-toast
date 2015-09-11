// DO NOT USE THIS MODULE
'use strict';

// Currently, the DOMException is experimental API.
// It's not available to create its instance in some browsers including Chrome.
// Until creation of the DOMException instance is available to every browsers, we use this implementation.
// TODO: check whether this implementation is needed or not.

var nameList = [
	'IndexSizeError',
	'HierarchyRequestError',
	'WrongDocumentError',
	'InvalidCharacterError',
	'NoModificationAllowedError',
	'NotFoundError',
	'NotSupportedError',
	'InvalidStateError',
	'SyntaxError',
	'InvalidModificationError',
	'NamespaceError',
	'InvalidAccessError',
	'TypeMismatchError',
	'SecurityError',
	'NetworkError',
	'AbortError',
	'URLMismatchError',
	'QuotaExceededError',
	'TimeoutError',
	'InvalidNodeTypeError',
	'DataCloneError'
];
var nameMap = {};
for(var i=0; i<nameList.length; i++) {
	nameMap[nameList[i]] = nameList[i];
}

function ToastException(message, name) {
	if(!(this instanceof ToastException)) {
		throw new TypeError('Constructor ToastException requires \'new\'');
	}
	this.message = (typeof message !== 'undefined') ? (message + '') : '';
	// https://developer.mozilla.org/en-US/docs/Web/API/DOMException#Error_constants
	this.name = nameMap[name] || 'Error';
}
ToastException.prototype = new Error();

module.exports = ToastException;
