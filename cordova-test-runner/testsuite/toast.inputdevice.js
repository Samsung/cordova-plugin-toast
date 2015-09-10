/* globals testsuite */
(function() {
    testsuite('toast.inputdevice', 'getSupportedKeys()', function(report) {
        toast.inputdevice.getSupportedKeys(function(suppKeys) {
            report('Success: ' + JSON.stringify(suppKeys));
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
    testsuite('toast.inputdevice', 'getKey(\'ColorF0Red\')', function(report) {
        toast.inputdevice.getKey('ColorF0Red', function(keyInfo) {
            report('Success: ' + JSON.stringify(keyInfo));
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });

    testsuite('toast.inputdevice', 'registerKey(\'ColorF0Red\')', function(report) {
        toast.inputdevice.registerKey('ColorF0Red');
        report('OK');
    });

    testsuite('toast.inputdevice', 'unregisterKey(\'ColorF0Red\')', function(report) {
        toast.inputdevice.unregisterKey('ColorF0Red');
        report('OK');
    });

    function getKeyDownHandler(report) {
        return function(e) {
            report('event \'keydown\' - keyCode: ' + e.keyCode);
        };
    }
    var keyDownHandler = null;
    testsuite('toast.inputdevice', 'listen keydown event', function(report) {
        keyDownHandler = getKeyDownHandler(report);
        window.addEventListener('keydown', keyDownHandler);
        report('Ready');
    });
    testsuite('toast.inputdevice', 'stop to listen keydown event', function(report) {
        if (keyDownHandler) {
            window.removeEventListener('keydown', keyDownHandler);
            keyDownHandler = null;
            report('Unregistered');
        } else {
            report('Not registered yet');
        }
    });
})();