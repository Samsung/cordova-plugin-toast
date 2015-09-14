'use strict';
function createError (message, name) {
	var err = new Error();
	err.message = message || '';
	err.name = name || 'Error';
	return err;
}

createError.fromWebAPIException = function (webapiex) {
	var err = createError(webapiex.message, webapiex.name);
	if(webapiex.stack) {
		err.stack = webapiex.stack;
	}
	return err;
};

createError.fromWebAPIError = function (webapierr) {
	return createError(webapierr.message, webapierr.name);
};

module.exports = {
	createError: createError
};
