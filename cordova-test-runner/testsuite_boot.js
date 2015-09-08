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
    }
    var TEST_TIMEOUT = 10000;

    function renderTests() {
        var container = document.createElement('div');
        container.className = 'container';
        for (var category in tests) {
            var elRow = document.createElement('div');
            elRow.className = 'row';

            var elCate = document.createElement('div');
            elCate.className = 'col-md-2';
            elCate.innerHTML = category;
            elRow.appendChild(elCate);

            var elContent = document.createElement('div');
            elContent.className = 'col-md-10';
            for (var i = 0; i < tests[category].length; i++) {
                var tester = getTester(tests[category][i].id, tests[category][i].feature);
                var btn = tester.querySelector('.btn');
                var testfn = tests[category][i].testfn;
                btn.addEventListener('click', (function(fn, tester) {
                    return function() {
                        function report(msg) {
                            tmrTest && clearTimeout(tmrTest);
                            setReportHTML(msg);
                        }

                        function setReportHTML(msg) {
                            tester.querySelector('.result').innerHTML = "[" + Date.now() + "]" + msg;
                        }

                        setReportHTML("wait...");
                        try {
                            var tmrTest = setTimeout(function() {
                                tmrTest = null;
                                setReportHTML("TIMEOUT");
                            }, TEST_TIMEOUT);
                            fn(report);
                        } catch (e) {
                            setReportHTML("Exception: " + e);
                        }
                    };
                })(testfn, tester));
                elContent.appendChild(tester);
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
        tester.innerHTML = '' + '<div class="col-md-5"><a class="btn btn-default">' + feature + '</a></div>' + '<div class="col-md-7 result">ready</div>';
        return tester;
    }

    var type = localStorage.getItem('CORDOVA_TOAST_TESTRUNNER_TYPE');
    if (type !== "TESTSUITE") {
        return;
    }
    document.addEventListener('deviceready', function() {
        renderTests();
    });
})();
