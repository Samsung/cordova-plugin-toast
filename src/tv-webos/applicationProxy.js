'use strict';

// Store success callback of getRequestedAppInfo
var hookSuccessCallback = {};

document.addEventListener('webOSLaunch', function(inData) {
    if(typeof hookSuccessCallback === 'function') {

        // Keep receivedData in localStorage
        window.localStorage.setItem('requestedappinfodata', JSON.stringify(inData.detail));
        hookSuccessCallback({callerAppId: inData.detail.callerAppId, data: inData.detail.data});
    }
}, false);

document.addEventListener('webOSRelaunch', function(inData) {
    if(typeof hookSuccessCallback === 'function') {

        // Keep receivedData in localStorage
        window.localStorage.setItem('requestedappinfodata', JSON.stringify(inData.detail));
        hookSuccessCallback({callerAppId: inData.detail.callerAppId, data: inData.detail.data});
    }

    // Run in the foreground
    /*jshint undef: false */
    PalmSystem.activate();
}, false);

module.exports = {
    exit: function (success, fail, args) {

        // Use web standard 'window.close', since webos doesn't have exit method.
        window.close();
    },
    launchApp: function (success, fail, args) {
        try {
            var paramAppId = args[0].appId;
            var paramData = {};

            paramData.data = args[0].data;

            // When launching callee app with data, pass callerAPPId additionally.
            /*jshint undef: false */
            paramData.callerAppId = webOS.fetchAppId();

            /*jshint undef: false */
            webOS.service.request('luna://com.webos.applicationManager', {
                method: 'launch',
                parameters: {
                    'id': paramAppId,
                    'params': paramData
                },
                onSuccess: function (data) {
                    success(data);
                },
                onFailure: function (e) {
                    var error = new Error();
                    error.name = e.name;
                    throw error;
                }
            });
        }
        catch (e) {
            var error = new Error();
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },
    getRequestedAppInfo: function (success, fail, args) {
        try {
            console.log('getRequestedAppInfo');

            var receivedData = {};

            if(!!window.localStorage.getItem('requestedappinfodata')) {

                // If have localStorage value, return receivedData in localStorage.
                receivedData = JSON.parse(window.localStorage.getItem('requestedappinfodata'));
            }

            if(typeof receivedData === 'object' && receivedData.hasOwnProperty('data')) {

                // If receivedData has data, return value.
                success({callerAppId: receivedData.callerAppId, data: receivedData.data});
            }
            else {

                // If receivedData doesn't have data, hold success callback until responding Launch Event from webos.
                hookSuccessCallback = success;
            }
        }
        catch (e) {
            setTimeout(function() {
                fail(e);
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('toast.application', module.exports);
