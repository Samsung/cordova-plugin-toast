'use strict';

var videoSourceTypeList = ['TV', 'AV', 'SVIDEO', 'COMP', 'PC', 'HDMI', 'SCART', 'DVI', 'MEDIA'];
var videoSource = {
    type: 0,
    number: 1
};

module.exports = {
    setSource: function (success, fail, args){
        try {
            var i = 0;
            var windowType = 0;

            if (args[1] == 'MAIN') {
                windowType = 0;
            }

            if (args[0].type && args[0].number) {
                for (i = 0; i < videoSourceTypeList.length; i++) {
                    if (args[0].type == videoSourceTypeList[i]) {
                        videoSource.type = i;
                        videoSource.number = args[0].number;

                        webapis.tv.window.setSource(videoSource, success, fail, windowType);
                    }
                }
            }
            else {
                setTimeout(function () {
                    fail({
                        code: 17,
                        name: 'TYPE_MISMATCH_ERR',
                        message: 'Failed to find the source.'
                    });
                }, 0);    
            }
        }
        catch (e) {
            throw e;
        }
    },
    getSource: function (success, fail, args) {
        try {
            var source = webapis.tv.window.getSource(args[0]);

            setTimeout(function () {
                success(source);
            }, 0);    
        }
        catch (e) {
            throw e;
        }
    },
    show: function (success, fail, args) {
        try {
            if (webapis.tv.window.setRect(args[0], args[1])) {
                if (webapis.tv.window.show(args[1])) {
                    setTimeout(function () {
                        success();
                    }, 0);
                }
                else {
                    setTimeout(function () {
                        fail();
                    }, 0);
                }
            }
            else {
                setTimeout(function () {
                    fail();
                }, 0);
            }    
        }
        catch (e) {
            throw e;
        }
    },
    hide: function (success, fail, args) {
        try {
            if (webapis.tv.window.hide(args[0])) {
                setTimeout(function () {
                    success();
                }, 0);
            }
            else {
                setTimeout(function () {
                    fail();
                }, 0);
            }
        }
        catch (e) {
            throw e;
        }
    },
    getRect: function (success, fail, args) {
        try {
            webapis.tv.window.getRect(success, fail);
        }
        catch (e) {

        }
    }
};

require('cordova/exec/proxy').add('toast.tvwindow', module.exports);
