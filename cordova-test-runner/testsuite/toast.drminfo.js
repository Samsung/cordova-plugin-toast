/* globals testsuite */
(function() {
    testsuite('toast.drminfo', 'getEsn() to \'WIDEVINE\'', function(report) {
        toast.drminfo.getEsn('WIDEVINE', function(value) {
            report('Success: ' + value);
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
    testsuite('toast.drminfo', 'getSdi()', function(report) {
        toast.drminfo.getSdi(function(value) {
            report('Success: ' + value);
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
})();
