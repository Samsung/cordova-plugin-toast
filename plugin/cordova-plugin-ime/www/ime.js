
var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');


var IME = function() {
};

IME.close = function() {
    exec(null, null, "IME", "close", []);
};

IME.show = function() {
    exec(null, null, "IME", "show", []);
};

IME.isVisible = false;

module.exports = IME;
