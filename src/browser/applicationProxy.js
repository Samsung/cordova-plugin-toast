'use strict';

module.exports = {
    exit: function(success, fail, args) {
        window.close();
    }
};

require('cordova/exec/proxy').add('toast.application',module.exports);
