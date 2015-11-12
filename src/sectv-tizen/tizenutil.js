'use strict';
/*
 * var tizenUtil = require('cordova-plugin-toast.tizenutil');
 * try {
 *     tizen.tvinputdevice.getKey('INVALID');
 * }
 * catch (e) {
 *     if(e.name === 'InvalidValuesError') {
 *         throw tizenUtil.createError.fromWebAPIException(e, RangeError);
 *     }
 *     throw tizenUtil.createError.fromWebAPIException(e);
 * }
 */

// create
function createError (message, name, type) {
    var Error = window.Error;
    if(type instanceof Error) {
        Error = type;
    }
    var err = new Error();

    err.message = message || '';
    err.name = name || 'Error';

    return err;
}

createError.fromWebAPIException = function (webapiex, type) {
    var err = createError(webapiex.message, type? type.name : webapiex.name, type);
    var copy = ['stack', 'sourceURL', 'line'];
    for(var i=0; i<copy.length; i++) {
        if(typeof webapiex[copy[i]] !== 'undefined') {
            err[copy[i]] = webapiex[copy[i]];
        }
    }
    return err;
};

createError.fromWebAPIError = function (webapierr, type) {
    return createError(webapierr.message, type? type.name : webapierr.name, type);
};

module.exports = {
    createError: createError
};
