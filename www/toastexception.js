// Currently, the DOMException is experimental API.
// It's not available to create its instance in some browsers including Chrome.
// Until creation of the DOMException instance is available to every browsers, we use this implementation.
// TODO: check whether this implementation is needed or not.
'use strict';

// just for enumeration
var domexception = window.DOMException || {
	INDEX_SIZE_ERR: 1,
	HIERARCHY_REQUEST_ERR: 3,
	WRONG_DOCUMENT_ERR: 4,
	INVALID_CHARACTER_ERR: 5,
	NO_MODIFICATION_ALLOWED_ERR: 7,
	NOT_FOUND_ERR: 8,
	NOT_SUPPORTED_ERR: 9,
	INVALID_STATE_ERR: 11,
	SYNTAX_ERR: 12,
	INVALID_MODIFICATION_ERR: 13,
	NAMESPACE_ERR: 14,
	INVALID_ACCESS_ERR: 15,
	TYPE_MISMATCH_ERR: 17,
	SECURITY_ERR: 18,
	NETWORK_ERR: 19,
	ABORT_ERR: 20,
	URL_MISMATCH_ERR: 21,
	QUOTA_EXCEEDED_ERR: 22,
	TIMEOUT_ERR: 23,
	INVALID_NODE_TYPE_ERR: 24,
	DATA_CLONE_ERR: 25
};

var name2LegacyCodeMap = {};
// The index is not in the allowed range (e.g. thrown in a range object).
name2LegacyCodeMap.IndexSizeError = domexception.INDEX_SIZE_ERR;
name2LegacyCodeMap.HierarchyRequestError = domexception.HIERARCHY_REQUEST_ERR;
name2LegacyCodeMap.WrongDocumentError = domexception.WRONG_DOCUMENT_ERR;
name2LegacyCodeMap.InvalidCharacterError = domexception.INVALID_CHARACTER_ERR;
name2LegacyCodeMap.NoModificationAllowedError = domexception.NO_MODIFICATION_ALLOWED_ERR;
name2LegacyCodeMap.NotFoundError = domexception.NOT_FOUND_ERR;
name2LegacyCodeMap.NotSupportedError = domexception.NOT_SUPPORTED_ERR;
name2LegacyCodeMap.InvalidStateError = domexception.INVALID_STATE_ERR;
name2LegacyCodeMap.SyntaxError = domexception.SYNTAX_ERR;
name2LegacyCodeMap.InvalidModificationError = domexception.INVALID_MODIFICATION_ERR;
name2LegacyCodeMap.NamespaceError = domexception.NAMESPACE_ERR;
name2LegacyCodeMap.InvalidAccessError = domexception.INVALID_ACCESS_ERR;
name2LegacyCodeMap.TypeMismatchError = domexception.TYPE_MISMATCH_ERR;	// Deprecated: use TypeError instead
name2LegacyCodeMap.SecurityError = domexception.SECURITY_ERR;
name2LegacyCodeMap.NetworkError = domexception.NETWORK_ERR;
name2LegacyCodeMap.AbortError = domexception.ABORT_ERR;
name2LegacyCodeMap.URLMismatchError = domexception.URL_MISMATCH_ERR;
name2LegacyCodeMap.QuotaExceededError = domexception.QUOTA_EXCEEDED_ERR;
name2LegacyCodeMap.TimeoutError = domexception.TIMEOUT_ERR;
name2LegacyCodeMap.InvalidNodeTypeError = domexception.INVALID_NODE_TYPE_ERR;
name2LegacyCodeMap.DataCloneError = domexception.DATA_CLONE_ERR;

function ToastException(message, name) {
	if(!(this instanceof ToastException)) {
		throw new TypeError('Constructor ToastException requires \'new\'');
	}
	this.message = (typeof message !== 'undefined') ? (message + '') : '';
	// https://developer.mozilla.org/en-US/docs/Web/API/DOMException#Error_constants
	this.name = (typeof name !== 'undefined') ? (name + '') : 'Error';
	this.code = name2LegacyCodeMap[this.name] || 0;
}
ToastException.prototype = new Error();

module.exports = ToastException;