'use strict';

var sefObject = require('cordova/plugin/SEF');

var videoSourceTypeList = ['TV', 'AV', 'SVIDEO', 'COMP', 'PC', 'HDMI', 'SCART', 'DVI', 'MEDIA'];
var videoSourceList = {
    TV1: 0,
    AV1: 15, AV2: 16, AV3: 17, AV4: 18,
    SVIDEO1: 19, SVIDEO2: 20, SVIDEO3: 21, SVIDEO4: 22,
    COMP1: 23, COMP2: 24, COMP3: 25, COMP4: 26,
    PC1: 27, PC2: 28, PC3: 29, PC4: 30,
    HDMI1: 31, HDMI2: 32, HDMI3: 33, HDMI4: 34,
    SCART1: 35, SCART2: 36, SCART3: 37, SCART4: 38,
    DVI1: 39, DVI2: 40, DVI3: 41, DVI4: 42,
    MEDIA: 43
};
var windowType = 0;
var videoSource = {
    type: 'TV',
    number: 1
};
var windowRect = ['', '', '', ''];

module.exports = {
    setSource: function (success, fail, args){
        var videoSourceStr = args[0].type + args[0].number;

        sefObject.get('Window').Execute('SetSource', videoSourceList[videoSourceStr]);
        videoSource.type = args[0].type;
        videoSource.number = args[0].number;

        setTimeout(function () {
            success(videoSource);
        }, 0);
    },
    getSource: function (success, fail, args) {
        var source = webapis.tv.window.getSource(windowType);

        if (source.type !== undefined) {
            videoSource.type = videoSourceTypeList[source.type];
            videoSource.number = source.number;

            setTimeout(function () {
                success(videoSource);
            }, 0);
        }
        else {
            setTimeout(function () {
                fail();
            }, 0);
        }
    },
    show: function (success, fail, args) {
        var result = webapis.tv.window.setRect({
            left: args[0][0],
            top: args[0][1],
            width: args[0][2],
            height: args[0][3]
        }, windowType);

        if (result) {
            windowRect[0] = args[0][0] + 'px';
            windowRect[1] = args[0][1] + 'px';
            windowRect[2] = args[0][2] + 'px';
            windowRect[3] = args[0][3] + 'px';

            sefObject.get('Window').Execute('SetPreviousSource');
            document.getElementById('_plugin_Window').style.position = 'fixed';

            result = webapis.tv.window.show(windowType);
            if (result) {
                setTimeout(function () {
                    success(windowRect);
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
    },
    hide: function (success, fail, args) {
        sefObject.get('Window').Execute('SetSource', videoSourceList.MEDIA);

        var result = webapis.tv.window.hide(windowType);
        if (result) {
            windowRect[0] = '';
            windowRect[1] = '';
            windowRect[2] = '';
            windowRect[3] = '';

            setTimeout(function () {
                success();
            }, 0);
        }
        else {
            setTimeout(function () {
                fail();
            }, 0);
        }
    },
    getRect: function (success, fail, args) {
        if (windowRect[0]) {
            setTimeout(function () {
                success(windowRect);
            }, 0);
        }
        else {
            setTimeout(function () {
                fail();
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('toast.tvwindow', module.exports);
