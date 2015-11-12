'use strict';

module.exports = {
    exit: function (success, fail, args) {
        curWidget.setPreference('return', 'true');
    }
};

require('cordova/exec/proxy').add('toast.application',module.exports);
