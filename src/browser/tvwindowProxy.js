/*
 * Copyright 2015 Samsung Electronics Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var sourceInfo = {
    type: 'TV',
    number: 1
};

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

module.exports = {
    setSource: function (success, fail, args) {
        var element = getTVWindowElement();

        sourceInfo.type = args[0].type;
        sourceInfo.number = args[0].number;

        element.style.backgroundColor = randomColor();
        element.innerHTML = 'Source : ' + sourceInfo.type + sourceInfo.number;

        setTimeout(function () {
            success(sourceInfo);
        }, 0);
    },
    getSource: function (success, fail, args) {
        setTimeout(function () {
            success(sourceInfo);
        }, 0);
    },
    show: function (success, fail, args) {
        var element = getTVWindowElement();

        element.style.position = 'fixed';
        element.style.left = args[0][0] + 'px';
        element.style.top = args[0][1] + 'px';
        element.style.width = args[0][2] + 'px';
        element.style.height = args[0][3] + 'px';
        element.style.backgroundColor = randomColor();
        element.innerHTML = 'Source : ' + sourceInfo.type + sourceInfo.number;
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

        if (element) {
            document.getElementsByTagName('body')[0].removeChild(element);

            setTimeout(function () {
                success();
            }, 0);
        }
        else {
            setTimeout(function () {
                fail(new Error('There are no window.'));
            }, 0);
        }
    },
    getRect: function (success, fail, args) {
        var element = document.getElementById('tvwindowshow');
        var rectangle = [];

        if (element) {
            rectangle[0] = element.style.left;
            rectangle[1] = element.style.top;
            rectangle[2] = element.style.width;
            rectangle[3] = element.style.height;

            setTimeout(function () {
                success(rectangle);
            }, 0);
        }
        else {
            setTimeout(function () {
                fail(new Error('There are no window.'));
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('toast.tvwindow',module.exports);
