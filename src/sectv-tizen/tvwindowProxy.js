'use strict';

var tizenutil = require('cordova-plugin-toast.tizenutil');
var windowType = 'MAIN';

module.exports = {
    setSource: function (success, fail, args){
        try {
            var match = '';

            tizen.systeminfo.getPropertyValue('VIDEOSOURCE', function (videoSource) {
                var connectedVideoSources = videoSource.connected;
                for (var i = 0; i < connectedVideoSources.length; i++) {
                    if (args[0].type == connectedVideoSources[i].type && args[0].number == connectedVideoSources[i].number) {
                        match = i;
                        break;
                    }
                }

                if (match) {
                    tizen.tvwindow.setSource(connectedVideoSources[match], function (source) {
                        success(source);
                    }, fail, windowType);
                }
                else {
                    setTimeout(function () {
                        fail(new Error('Fail to find source.'));
                    }, 0);
                }
            });

        }
        catch (e) {
            throw tizenutil.createError.fromWebAPIException(e);
        }
    },
    getSource: function (success, fail, args) {
        try {
            var source = tizen.tvwindow.getSource(windowType);

            setTimeout(function () {
                success(source);
            }, 0);
        }
        catch (e) {
            throw tizenutil.createError.fromWebAPIException(e);
        }
    },
    show: function (success, fail, args) {
        try {
            tizen.tvwindow.show(success, fail, args[0], windowType);
        }
        catch (e) {
            throw tizenutil.createError.fromWebAPIException(e);
        }
    },
    hide: function (success, fail, args) {
        try {
            tizen.tvwindow.hide(success, fail, windowType);
        }
        catch (e) {
            throw tizenutil.createError.fromWebAPIException(e);
        }
    },
    getRect: function (success, fail, args) {
        try {
            tizen.tvwindow.getRect(success, fail, 'px', windowType);
        }
        catch (e) {
            throw tizenutil.createError.fromWebAPIException(e);
        }
    }
};

require('cordova/exec/proxy').add('toast.tvwindow', module.exports);
