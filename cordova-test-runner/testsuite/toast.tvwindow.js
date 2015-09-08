(function() {
    testsuite('toast.tvwindow', 'getAvailableWindows()', function(report) {
        toast.tvwindow.getAvailableWindows(function(availWindows) {
            report("Success: " + JSON.stringify(availWindows));
        }, function(err) {
            report("Error: " + JSON.stringify(err));
        });
    });
    testsuite('toast.tvwindow', 'setSource() to \'HDMI 1\'', function(report) {
        toast.tvwindow.setSource({
            type: 'HDMI',
            number: 1
        }, function(keyInfo) {
            report("Success: " + JSON.stringify(keyInfo));
        }, function(err) {
            report("Error: " + JSON.stringify(err));
        });
    });
    testsuite('toast.tvwindow', 'setSource() to \'TV\'', function(report) {
        toast.tvwindow.setSource({
            type: 'TV'
        }, function(source, type) {
            report("Success- source: " + JSON.stringify(source) + ", type: " + type);
        }, function(err) {
            report("Error- " + JSON.stringify(err));
        }, 'MAIN');
    });
    testsuite('toast.tvwindow', 'getSource()', function(report) {
        toast.tvwindow.getSource(function(sourceInfo) {
            report("Success: " + JSON.stringify(sourceInfo));
        }, function(err) {
            report("Error: " + JSON.stringify(err));
        }, 'MAIN');
    });

    testsuite('toast.tvwindow', 'show()', function(report) {
        var x = parseInt(Math.random() * (window.innerWidth - 320 - 20), 10) + 10;
        var y = parseInt(Math.random() * (window.innerHeight - 180 - 20), 10) + 10;
        toast.tvwindow.show(function(rect) {
            report("Success: " + JSON.stringify(rect));
        }, function(err) {
            report("Error: " + JSON.stringify(err));
        }, [x + "px", y + "px", "320px", "180px"], "MAIN");
    });

    testsuite('toast.tvwindow', 'hide()', function(report) {
        toast.tvwindow.hide(function() {
            report("Success");
        }, function(err) {
            report("Error: " + JSON.stringify(err));
        }, "MAIN");
    });

    testsuite('toast.tvwindow', 'getRect()', function(report) {
        toast.tvwindow.getRect(function(rect) {
            report("Success: " + JSON.stringify(rect));
        }, function(err) {
            report("Error: " + JSON.stringify(err));
        });
    });
})();