/* globals testsuite */
(function() {
    testsuite('toast.application', 'exit()', function(report) {
        toast.application.exit();
        report('exit');
    });
})();
