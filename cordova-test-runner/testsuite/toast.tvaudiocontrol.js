/* globals testsuite */
(function() {
    testsuite('toast.tvaudiocontrol', 'setMute() to \'true\'', function(report) {
        toast.tvaudiocontrol.setMute(true);
        report('OK');
    });
    testsuite('toast.tvaudiocontrol', 'setMute() to \'false\'', function(report) {
        toast.tvaudiocontrol.setMute(false);
        report('OK');
    });
    testsuite('toast.tvaudiocontrol', 'isMute()', function(report) {
        toast.tvaudiocontrol.isMute(function(value) {
            report('Success: ' + value);
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
    testsuite('toast.tvaudiocontrol', 'setVolume() to \'5\'', function(report) {
        toast.tvaudiocontrol.setVolume(5);
        report('OK');
    });
    testsuite('toast.tvaudiocontrol', 'setVolumeUp()', function(report) {
        toast.tvaudiocontrol.setVolumeUp();
        report('OK');
    });
    testsuite('toast.tvaudiocontrol', 'setVolumeDown()', function(report) {
        toast.tvaudiocontrol.setVolumeDown();
        report('OK');
    });
    testsuite('toast.tvaudiocontrol', 'getVolume()', function(report) {
        toast.tvaudiocontrol.getVolume(function(value) {
            report('Success: ' + value);
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
    testsuite('toast.tvaudiocontrol', 'setVolumeChangeListener()', function(report) {
        toast.tvaudiocontrol.setVolumeChangeListener(function(value) {
            report('Success: volume changes to ' + value);
        });
        report('OK');
    });
    testsuite('toast.tvaudiocontrol', 'unsetVolumeChangeListener()', function(report) {
        toast.tvaudiocontrol.unsetVolumeChangeListener();
        report('OK');
    });
})();