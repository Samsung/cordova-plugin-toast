'use strict';

var windowType = 'MAIN';

module.exports = {
    setSource: function (success, fail, args){
        try {
            tizen.tvwindow.setSource(args[0], success, fail, windowType);
        }
        catch (e) {
            throw e;
        }
    },
    getSource: function (success, fail, args) {
        try {
            var source = tizen.tvwindow.getSource(args[0]);

            if (typeof source == 'object') {
                setTimeout(function () {
                    success(source);
                }, 0);
            }
            else {
                setTimeout(function () {
                    fail({
                            code: 9,
                            name: 'NOT_SUPPORTED_ERR',
                            message: 'Any other error occurs on platform.'
                        });
                }, 0);
            }
        }
        catch (e) {
            throw e;
        }
    },
    show: function (success, fail, args) {
        try {
            tizen.tvwindow.show(success, fail, args[0], windowType);
        }
        catch (e) {
            throw e;
        }
    },
    hide: function (success, fail, args) {
        try {
            tizen.tvwindow.hide(success, fail, windowType);
        }
        catch (e) {
            throw e;
        }
    },
    getRect: function (success, fail, args) {
        try {
            tizen.tvwindow.getRect(success, fail, args[0], windowType);
        }
        catch (e) {
            throw e;
        }
    }
};

require('cordova/exec/proxy').add('toast.tvwindow', module.exports);
