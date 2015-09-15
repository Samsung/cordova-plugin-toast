'use strict';

var videoSourceTypeList = ['TV', 'AV', 'SVIDEO', 'COMP', 'PC', 'HDMI', 'SCART', 'DVI', 'MEDIA'];
var videoSource = {
    type: 'TV',
    number: 1
};

function getTvwindowElement () {
    var element = '';

    if (!document.getElementById('tvwindowshow')) {
        element = document.createElement('div');
        element.id = 'tvwindowshow';
    }
    else {
        element = document.getElementById('tvwindowshow');
    }

    return element;
}

function randomColor () {
    var color = '#';

    for (var i = 0; i < 6; i++) {
        if(Math.floor(Math.random() * 2) === 0){
            color = color + '0';
        }
        else {
            color = color + 'f';
        }
    }

    return color;
}

module.exports = {
    setSource: function (success, fail, args){
        var match = false;
        var element = getTvwindowElement();

        for (var i = 0; i < videoSourceTypeList.length; i++) {
            if (args[0].type == videoSourceTypeList[i]) {
                videoSource.type = videoSourceTypeList[i];
                videoSource.number = args[0].number;

                element.style.backgroundColor = randomColor();
                element.innerHTML = 'Source : ' + videoSource.type + ' ' + videoSource.number;

                match = true;
                break;
            }
        }

        if (!match) {
            throw new RangeError('Failed to find the source.');
        }

        setTimeout(function () {
            success(videoSource);
        }, 0);
    },
    getSource: function (success, fail, args) {
        setTimeout(function () {
            success(videoSource);
        }, 0);
    },
    show: function (success, fail, args) {
        var element = getTvwindowElement();

        element.style.position = 'fixed';
        element.style.left = args[0][0] + 'px';
        element.style.top = args[0][1] + 'px';
        element.style.width = args[0][2] + 'px';
        element.style.height = args[0][3] + 'px';
        element.style.backgroundColor = randomColor();
        element.innerHTML = 'Source : ' + videoSource.type + ' ' + videoSource.number;
        document.getElementsByTagName('body')[0].appendChild(element);

        setTimeout(function () {
            success([
                element.style.left,
                element.style.top,
                element.style.width,
                element.style.height
            ]);
        }, 0);
    },
    hide: function (success, fail, args) {
        var element = document.getElementById('tvwindowshow');

        if (!element) {
            throw new Error('There are no window.');
        }

        document.getElementsByTagName('body')[0].removeChild(element);

        setTimeout(function () {
            success();
        }, 0);
    },
    getRect: function (success, fail, args) {
        var element = document.getElementById('tvwindowshow');
        var rectangle = [];

        if (!element) {
            throw new Error('There are no window.');
        }

        rectangle[0] = element.style.left;
        rectangle[1] = element.style.top;
        rectangle[2] = element.style.width;
        rectangle[3] = element.style.height;

        setTimeout(function () {
            success(rectangle);
        }, 0);
    }
};

require('cordova/exec/proxy').add('toast.tvwindow',module.exports);
