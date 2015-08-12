define("cordova/plugin/tizen/toast.tvchannel", function(require, exports, module) {
module.exports = {
    getAvailableWindows: function (success, fail, args) {
        tizen.tvwindow.getAvailableWindows(success, fail);
    },
    setSource: function(success, fail, args){
        tizen.tvwindow.setSource(
            args[0],
            success, fail,
            args[1]);
    }
};
});
