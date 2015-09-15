'use strict';

var browserTV = require('cordova-plugin-toast.sampleEPG');
var channelChangeCallback = [];
var listIndex = 0;

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

function fireChannelChangeEvent (channelInfo) {
    for (var i = 0; i < channelChangeCallback.length; i++) {
        channelChangeCallback[i](channelInfo);
    }
}

module.exports = {
    tune: function (success, fail, args) {
        var match = false;
        var element = getTvwindowElement();

        for (var i = 0; i < browserTV.channelList.length; i++) {
            if (args[0].major == browserTV.channelList[i].major && args[0].minor == browserTV.channelList[i].minor) {
                listIndex = i;

                element.style.backgroundColor = randomColor();
                element.innerHTML = 'Channel : ' + browserTV.channelList[listIndex].major + '-' + browserTV.channelList[listIndex].minor;

                match = true;
            }
        }

        if (!match) {
            throw new RangeError('Failed to find the channel.');
        }

        setTimeout(function () {
            success.onsuccess(browserTV.channelList[listIndex]);
            fireChannelChangeEvent(browserTV.channelList[listIndex]);
        }, 0);
    },
    tuneUp: function (success, fail, args) {
        var element = getTvwindowElement();

        if (listIndex < browserTV.channelList.length - 1) {
            listIndex = listIndex + 1;
        }
        else {
            listIndex = 0;
        }

        element.style.backgroundColor = randomColor();
        element.innerHTML = 'Channel : ' + browserTV.channelList[listIndex].major + '-' + browserTV.channelList[listIndex].minor;

        setTimeout(function () {
            success.onsuccess(browserTV.channelList[listIndex]);
            fireChannelChangeEvent(browserTV.channelList[listIndex]);
        }, 0);
    },
    tuneDown: function (success, fail, args) {
        var element = getTvwindowElement();

        if (0 < listIndex) {
            listIndex = listIndex - 1;
        }
        else {
            listIndex = 6;
        }

        element.style.backgroundColor = randomColor();
        element.innerHTML = 'Channel : ' + browserTV.channelList[listIndex].major + '-' + browserTV.channelList[listIndex].minor;

        setTimeout(function () {
            success.onsuccess(browserTV.channelList[listIndex]);
            fireChannelChangeEvent(browserTV.channelList[listIndex]);
        }, 0);
    },
    findChannel: function (success, fail, args) {
        var channelInfoIndex = 0;
        var channelInfo = [];

        for (var i = 0; i < browserTV.channelList.length; i++) {
            if (args[0] == browserTV.channelList[i].major && args[1] == browserTV.channelList[i].minor) {
                channelInfo[channelInfoIndex] = browserTV.channelList[i];
                channelInfoIndex = channelInfoIndex + 1;
            }
        }

        if (!channelInfo) {
            throw new RangeError('Failed to find the channel.');
        }
        setTimeout(function () {
            success(channelInfo);
        }, 0);
    },
    getChannelList: function (success, fail, args) {
        setTimeout(function () {
            success(browserTV.channelList);
        }, 0);
    },
    getCurrentChannel: function (success, fail, args) {
        setTimeout(function () {
            success(browserTV.channelList[listIndex]);
        }, 0);
    },
    getProgramList: function (success, fail, args) {
        setTimeout(function () {
            success(browserTV.programList);
        }, 0);
    },
    getCurrentProgram: function (success, fail, args) {
        setTimeout(function () {
            success(browserTV.programList[listIndex]);
        }, 0);
    },
    addChannelChangeListener: function (success, fail, args) {
        channelChangeCallback.push(success);
    },
    removeChannelChangeListener: function (success, fail, args) {
        for (var i = 0; i < channelChangeCallback.length; i++) {
            if (channelChangeCallback[i] === success) {
                channelChangeCallback.splice(i, 1);
            }
        }
    }
};

require('cordova/exec/proxy').add('toast.tvchannel', module.exports);
