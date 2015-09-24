'use strict';

var windowType = 'MAIN';

module.exports = {
    setSource: function (success, fail, args){
        try {
            var match = -1;

            tizen.systeminfo.getPropertyValue('VIDEOSOURCE', function (videoSource) {
                var connectedVideoSources = videoSource.connected;
                for (var i = 0; i < connectedVideoSources.length; i++) {
                    if (args[0].type == connectedVideoSources[i].type && args[0].number == connectedVideoSources[i].number) {
                        match = i;
                        break;
                    }
                }

                if (match != -1) {
                    tizen.tvwindow.setSource(connectedVideoSources[match], success, fail, windowType);
                }
                else {
                    setTimeout(function () {
                        fail(new Error('Fail to find source.'));
                    }, 0);
                }
            });

        }
        catch (e) {
            fail(e);
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
            fail(e);
        }
    },
    show: function (success, fail, args) {
        args[0][0] = args[0][0] + 'px';
        args[0][1] = args[0][1] + 'px';
        args[0][2] = args[0][2] + 'px';
        args[0][3] = args[0][3] + 'px';

        try {
            tizen.tvwindow.show(success, fail, args[0], windowType);
        }
        catch (e) {
            fail(e);
        }
    },
    hide: function (success, fail, args) {
        try {
            tizen.tvwindow.hide(success, fail, windowType);
        }
        catch (e) {
            fail(e);
        }
    },
    getRect: function (success, fail, args) {
        try {
            tizen.tvwindow.getRect(success, fail, 'px', windowType);
        }
        catch (e) {
            fail(e);
        }
    }
};

require('cordova/exec/proxy').add('toast.tvwindow', module.exports);
