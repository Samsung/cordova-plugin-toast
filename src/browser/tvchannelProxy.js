module.exports = {
    tune: function () {
        console.log("tune("+Array.prototype.join.call(arguments, ", ")+")");
    }
};

require("cordova/exec/proxy").add("toast.tvchannel", module.exports);