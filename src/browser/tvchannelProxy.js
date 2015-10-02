'use strict';

var sampleEPG = require('cordova-plugin-toast.sampleEPG');
var channelChangeCallback = [];
var listIndex = 0;

function getTVWindowElement () {
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
    var color = 'rgb(';

    color = color + Number(128 + Math.floor(Math.random() * 128)) + ', ';
    color = color + Number(128 + Math.floor(Math.random() * 128)) + ', ';
    color = color + Number(128 + Math.floor(Math.random() * 128));

    color = color + ')';

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
        var element = getTVWindowElement();

        for (var i = 0; i < sampleEPG.channelList.length; i++) {
            if (args[0].major == sampleEPG.channelList[i].major && args[0].minor == sampleEPG.channelList[i].minor) {
                listIndex = i;

                element.style.backgroundColor = randomColor();
                element.innerHTML = 'Channel : ' + sampleEPG.channelList[listIndex].major + '-' + sampleEPG.channelList[listIndex].minor;

                match = true;
                break;
            }
        }
        if (match) {
            setTimeout(function () {
                success.onsuccess(sampleEPG.channelList[listIndex]);
                fireChannelChangeEvent(sampleEPG.channelList[listIndex]);
            }, 0);
        }
        else {
            setTimeout(function () {
                success.onnosignal();
            }, 0);
        }
    },
    tuneUp: function (success, fail, args) {
        var element = getTVWindowElement();

        if (listIndex < sampleEPG.channelList.length - 1) {
            listIndex = listIndex + 1;
        }
        else {
            listIndex = 0;
        }

        element.style.backgroundColor = randomColor();
        element.innerHTML = 'Channel : ' + sampleEPG.channelList[listIndex].major + '-' + sampleEPG.channelList[listIndex].minor;

        setTimeout(function () {
            success.onsuccess(sampleEPG.channelList[listIndex]);
            fireChannelChangeEvent(sampleEPG.channelList[listIndex]);
        }, 0);
    },
    tuneDown: function (success, fail, args) {
        var element = getTVWindowElement();

        if (0 < listIndex) {
            listIndex = listIndex - 1;
        }
        else {
            listIndex = 6;
        }

        element.style.backgroundColor = randomColor();
        element.innerHTML = 'Channel : ' + sampleEPG.channelList[listIndex].major + '-' + sampleEPG.channelList[listIndex].minor;

        setTimeout(function () {
            success.onsuccess(sampleEPG.channelList[listIndex]);
            fireChannelChangeEvent(sampleEPG.channelList[listIndex]);
        }, 0);
    },
    findChannel: function (success, fail, args) {
        var channelInfoIndex = 0;
        var channelInfo = [];

        for (var i = 0; i < sampleEPG.channelList.length; i++) {
            if (args[0] == sampleEPG.channelList[i].major && args[1] == sampleEPG.channelList[i].minor) {
                channelInfo[channelInfoIndex] = sampleEPG.channelList[i];
                channelInfoIndex = channelInfoIndex + 1;
            }
        }

        if (channelInfo) {
            setTimeout(function () {
                success(channelInfo);
            }, 0);
        }
        else {
            setTimeout(function () {
                fail(new Error('Fail to find channel.'));
            }, 0);
        }
    },
    getChannelList: function (success, fail, args) {
        setTimeout(function () {
            success(sampleEPG.channelList);
        }, 0);
    },
    getCurrentChannel: function (success, fail, args) {
        setTimeout(function () {
            success(sampleEPG.channelList[listIndex]);
        }, 0);
    },
    getProgramList: function (success, fail, args) {
        setTimeout(function () {
            success(sampleEPG.programList);
        }, 0);
    },
    getCurrentProgram: function (success, fail, args) {
        setTimeout(function () {
            success(sampleEPG.programList[listIndex]);
        }, 0);
    },
    addChannelChangeListener: function (success, fail, args) {
        channelChangeCallback.push(success);
    },
    removeChannelChangeListener: function (success, fail, args) {
        for (var i = 0; i < channelChangeCallback.length; i++) {
            if (success === channelChangeCallback[i]) {
                channelChangeCallback.splice(i, 1);
            }
        }
    }
};

require('cordova/exec/proxy').add('toast.tvchannel', module.exports);
