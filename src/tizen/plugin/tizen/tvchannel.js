define("cordova/plugin/tizen/toast.tvchannel", function(require, exports, module) {
module.exports = {
    tune: function (success, fail, args) {
        tizen.tvchannel.tune(
            args[0],
            success,
            fail,
            args[1]);
    },
    getNumOfAvailableTuner: function (success, fail, args) {
        setTimeout(success.bind(null, tizen.tvchannel.getNumOfAvailableTuner()), 0);
    },
    getNumOfAvailableSources: function (success, fail, args) {
        setTimeout(success.bind(null, tizen.tvchannel.getNumOfAvailableSources(args[0])), 0);
    }
};
});
