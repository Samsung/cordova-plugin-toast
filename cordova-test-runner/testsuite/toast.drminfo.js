/* globals testsuite */
(function() {
    testsuite('toast.drminfo', 'getVersion()', function(report) {
        toast.drminfo.getVersion(function(value) {
            report('Success: ' + value);
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
    testsuite('toast.drminfo', 'getEsn() to \'WIDEVINE\'', function(report) {
        toast.drminfo.getEsn('WIDEVINE', function(value) {
            report('Success: ' + value);
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
    testsuite('toast.drminfo', 'getSdiId()', function(report) {
        toast.drminfo.getSdiId(function(value) {
            report('Success: ' + value);
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
})();
