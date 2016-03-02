'use strict';

module.exports = {
    exit: function (success, fail, args) {
        tizen.application.getCurrentApplication().exit();
    },
    launchApp: function (success, fail, args) {
        try {
            var paramAppId = args[0].appId;
            var paramData = args[0].data;
            var appCtrlDataAry = [];

            for(var keyName in paramData) {
                var temp = new tizen.ApplicationControlData(keyName, [paramData[keyName]]);
                appCtrlDataAry.push(temp);
            }

            if(paramAppId == 'org.tizen.browser') { // Jump to browser
                var browserAppCtrl = new tizen.ApplicationControl(null, (appCtrlDataAry[0].value)[0], null, null, appCtrlDataAry);
                tizen.application.launchAppControl(browserAppCtrl, paramAppId, success, fail, null);
            }
            else { // Jump to widget
                var widgetAppCtrl = new tizen.ApplicationControl(null, null, null, null, appCtrlDataAry);
                tizen.application.launchAppControl(widgetAppCtrl, paramAppId, success, fail, null);
            }
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
            var reqAppCtrl = tizen.application.getCurrentApplication().getRequestedAppControl();
            var reqCallerAppId = reqAppCtrl.callerAppId;
            var reqAppCtrlDataAry = reqAppCtrl.appControl.data;
            var appCtrlDataObj = {};

            for(var i = 0; i < reqAppCtrlDataAry.length; i++) {
                var key = reqAppCtrlDataAry[i].key;
                var value = (reqAppCtrlDataAry[i].value)[0];
                appCtrlDataObj[key] = value;
            }

            setTimeout(function() {
                success({callerAppId: reqCallerAppId, data: appCtrlDataObj});
            }, 0);
        }
        catch(e) {
            var error = new Error();
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('toast.application', module.exports);
