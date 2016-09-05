/* globals testsuite */
(function() {
    testsuite('toast.tvwindow', 'setSource() to \'TV 1\'', function(report) {
        toast.tvwindow.setSource({
            type: 'TV',
            number: 1
        }, function(sourceInfo) {
            report('Success: ' + JSON.stringify(sourceInfo));
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
    testsuite('toast.tvwindow', 'setSource() to \'HDMI 1\'', function(report) {
        toast.tvwindow.setSource({
            type: 'HDMI',
            number: 1
        }, function(sourceInfo) {
            report('Success: ' + JSON.stringify(sourceInfo));
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
    testsuite('toast.tvwindow', 'getSource()', function(report) {
        toast.tvwindow.getSource(function(sourceInfo) {
            report('Success: ' + JSON.stringify(sourceInfo));
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
    testsuite('toast.tvwindow', 'show()', function(report) {
        var x = parseInt(Math.random() * (window.innerWidth - 320 - 20), 10) + 10;
        var y = parseInt(Math.random() * (window.innerHeight - 180 - 20), 10) + 10;
        toast.tvwindow.show([x, y, 320, 180], function(rectInfo) {
            report('Success: ' + JSON.stringify(rectInfo));
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
    testsuite('toast.tvwindow', 'hide()', function(report) {
        toast.tvwindow.hide(function() {
            report('Success');
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });

    testsuite('toast.tvwindow', 'getRect()', function(report) {
        toast.tvwindow.getRect(function(rectInfo) {
            report('Success: ' + JSON.stringify(rectInfo));
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
})();
