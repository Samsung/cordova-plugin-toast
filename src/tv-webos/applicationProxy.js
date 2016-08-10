'use strict';

var hookSuccessCallback = {};

document.addEventListener('webOSLaunch', function(inData) {
    console.log('webOSLaunch');

    if(typeof hookSuccessCallback === 'function') {
        window.localStorage.setItem('requestedappinfodata', JSON.stringify(inData.detail));
        hookSuccessCallback({callerAppId: inData.detail.callerAppId, data: inData.detail.data});
    }
}, false);

document.addEventListener('webOSRelaunch', function(inData) {
    /*jshint undef: false */
    console.log('webOSRelaunch');

    if(typeof hookSuccessCallback === 'function') {
        window.localStorage.setItem('requestedappinfodata', JSON.stringify(inData.detail));
        hookSuccessCallback({callerAppId: inData.detail.callerAppId, data: inData.detail.data});
    }

    PalmSystem.activate();
}, false);

module.exports = {
    exit: function (success, fail, args) {
        window.close();
    },
    launchApp: function (success, fail, args) {
        try {
            var paramAppId = args[0].appId;
            var paramData = {};
            paramData.data = args[0].data;
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
                receivedData = JSON.parse(window.localStorage.getItem('requestedappinfodata'));
            }

            if(typeof receivedData === 'object' && receivedData.hasOwnProperty('data')) {
                success({callerAppId: receivedData.callerAppId, data: receivedData.data});
            }
            else {
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
