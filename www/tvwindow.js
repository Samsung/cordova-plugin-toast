
var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var tvwindowExport = {};

tvwindowExport = {
    //void getAvailableWindows (AvailableWindowListCallback successCallback, optional ErrorCallback? errorCallback)
    getAvailableWindows: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvwindow.getAvailableWindows', arguments);
        exec(successCallback, errorCallback, "toast.tvwindow", "getAvailableWindows", []);
    },
    //void setSource (SystemInfoVideoSourceInfo videoSource, SourceChangedSuccessCallback successCallback, optional ErrorCallback? errorCallback, optional WindowType? type)
    setSource: function (videoSource, successCallback, errorCallback, type) {
        argscheck.checkArgs('ofFS', 'tvwindow.getAvailableWindows', arguments);
        var args = [videoSource, type];
        exec(successCallback, errorCallback, "toast.tvwindow", "setSource", args);
    },
    //SystemInfoVideoSourceInfo getSource (optional WindowType? type)
    //void show (WindowRectangleSuccessCallback successCallback, optional ErrorCallback? errorCallback, optional DOMString[]? rectangle, optional WindowType? type)
    //void hide (SuccessCallback successCallback, optional ErrorCallback? errorCallback, optional WindowType? type)
    //void getRect (WindowRectangleSuccessCallback successCallback, optional ErrorCallback? errorCallback, optional MeasurementUnit? unit, optional WindowType? type)
};

module.exports = tvwindowExport;
