module.exports = {
    getAvailableWindows: function () {
        console.log("getAvailableWindows("+Array.prototype.join.call(arguments, ", ")+")");
    },
    setSource: function(){
        console.log("setSource("+Array.prototype.join.call(arguments, ", ")+")");
    }
};

require("cordova/exec/proxy").add("toast.tvwindow",module.exports);