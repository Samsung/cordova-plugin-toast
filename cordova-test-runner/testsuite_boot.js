/* jshint loopfunc: true */
(function() {
    var tests = {};
    var count = 0;
    window.testsuite = function(category, feature, testfn) {
        tests[category] = tests[category] || [];
        tests[category].push({
            id: count++,
            feature: feature,
            testfn: testfn
        });
    };
    var TEST_TIMEOUT = 10000;

    function renderTests() {
        var container = document.createElement('table');
        container.className = 'container';
        for (var category in tests) {
            var elRow = document.createElement('tr');
            elRow.className = 'row';

            var elCate = document.createElement('td');
            elCate.className = 'category';
            elCate.innerHTML = category;
            elRow.appendChild(elCate);

            var elContent = document.createElement('td');
            for (var i = 0; i < tests[category].length; i++) {
                var tester = getTester(tests[category][i].id, tests[category][i].feature);
                var btn = tester.querySelector('.btn');
                var testfn = tests[category][i].testfn;

                // In the sectv-orsay platform, appendChild must be done before the addEventListener. Seems like platform's bug.
                elContent.appendChild(tester);
                btn.addEventListener('click', (function(fn, tester) {
                    return function() {
                        function report(msg) {
                            tmrTest && clearTimeout(tmrTest);
                            setReportHTML(msg);
                        }

                        function setReportHTML(msg) {
                            tester.querySelector('.report').innerHTML = '[' + Date.now() + ']' + msg;
                        }

                        setReportHTML('wait...');
                        try {
                            var tmrTest = setTimeout(function() {
                                tmrTest = null;
                                setReportHTML('TIMEOUT');
                            }, TEST_TIMEOUT);
                            fn(report);
                        } catch (e) {
                            setReportHTML('Exception: ' + e);
                        }
                    };
                })(testfn, tester));
            }
            elRow.appendChild(elContent);

            container.appendChild(elRow);
        }
        var head = document.createElement('h1');
        head.innerHTML = 'Cordova TOAST TestSuite';
        document.body.appendChild(head);
        document.body.appendChild(container);
    }

    function getTester(id, feature) {
        var tester = document.createElement('div');
        tester.className = 'row';
        tester.setAttribute('id', id);
        tester.innerHTML = '<table class="testfeature"><tr><td class="feature"><a class="btn btn-default">'+ feature + '</a></td>' +
                            '<td class="report">ready</td></tr></table>';
        return tester;
    }

    var type = localStorage.getItem('CORDOVA_TOAST_TESTRUNNER_TYPE');
    if (type !== 'TESTSUITE') {
        return;
    }
    document.addEventListener('deviceready', function() {
        renderTests();
    });
})();
