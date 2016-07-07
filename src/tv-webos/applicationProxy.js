'use strict';

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
            var receivedData = window.device.receivedData;
            if(typeof receivedData === 'object' && receivedData.detail.hasOwnProperty('data')) {
                var passedData = receivedData.detail.data;
                var callerAppId = receivedData.detail.callerAppId;
                success({callerAppId: callerAppId, data: passedData});
            }
            else {
                var error = new Error();
                error.message = 'failed to get data';
                error.name = 'failed to get data';
                throw error;
            }
        }
        catch(e) {
            setTimeout(function() {
                fail(e);
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('toast.application', module.exports);
