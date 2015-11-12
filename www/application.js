'use strict';

var exec = require('cordova/exec');

module.exports = {
    exit: function () {
        exec(null, null, 'toast.application', 'exit', null);
    }
};
