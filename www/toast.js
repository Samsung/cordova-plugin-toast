var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var toastExport = {};

toastExport = {
    tvchannel: {
        greet: function (name, successCallback, errorCallback) {
            argscheck.checkArgs('sfF', 'toast.greet', arguments);
            var getValue = argscheck.getValue;
            name = getValue(name, "DEFAULT NAME");

            var args = [name];
            exec(successCallback, errorCallback, "toast.tvchannel", "greet", args);
        }
    },
    tvwindow: {

    }
};

module.exports = toastExport;
