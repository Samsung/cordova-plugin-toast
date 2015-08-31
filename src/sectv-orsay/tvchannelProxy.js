module.exports = {
    tune: function (success, fail, args) {
        setTimeout(success.bind(null), 0);
    },
    getNumOfAvailableTuner: function (success, fail, args) {
        setTimeout(success.bind(null, 1), 0);
    },
    getNumOfAvailableSources: function (success, fail, args) {
        setTimeout(success.bind(null, 1), 0);
    }
};

require("cordova/exec/proxy").add("toast.tvchannel", module.exports);