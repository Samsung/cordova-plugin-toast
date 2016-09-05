/* jshint loopfunc: true */
(function() {
    var tests = {};
    window.testsuite = function(category, feature, testfn) {
        tests[category] = tests[category] || [];
        tests[category].push({
            feature: feature,
            testfn: testfn
        });
    };
    var TEST_TIMEOUT = 10000;

    function createElem(tagName, attributes, children) {
        var elem = document.createElement(tagName);
        for(var attr in attributes) {
            if(attr === 'className') {
                elem.setAttribute('class', attributes[attr]);
            }
            else {
                elem.setAttribute(attr, attributes[attr]);
            }
        }
        if(typeof children === 'string') {
            elem.appendChild(document.createTextNode(children));
        }
        else {
            for(var i=0; children && i<children.length; i++) {
                elem.appendChild(children[i]);
            }
        }
        return elem;
    }

    var tester = {};
    function renderTests() {
        var count = 0;
        document.body.appendChild(createElem('h1', {}, 'Cordova TOAST TestSuite'));
        var container = createElem('div', {className: 'container'});
        document.body.appendChild(container);
        for (var category in tests) {
            for (var i = 0; i < tests[category].length; i++) {
                var testerId = count++;
                var fields = [];
                fields.push(createElem('div', {className: 'col-md-2'}, category));
                fields.push(createElem('div', {className: 'col-md-3'}, [
                    createElem('button', {className: 'btn btn-default', testerId: testerId}, tests[category][i].feature)
                ]));
                var reporter = createElem('div', {className: 'col-md-7 reporter'+testerId});
                fields.push(reporter);

                var row = createElem('div', {className: 'row'}, fields);
                container.appendChild(row);

                tester[testerId] = tests[category][i].testfn;
            }
        }

        document.body.addEventListener('click', function (e) {
            if(e.target.tagName.toUpperCase() === 'BUTTON' && e.target.getAttribute('testerId') !== null) {
                var testerId = parseInt(e.target.getAttribute('testerId'));
                if(typeof tester[testerId] === 'function') {
                    var testfn = tester[testerId];
                    var report = function (msg) {
                        tmrTest && clearTimeout(tmrTest);
                        setReportHTML(msg);
                    };
                    report.append = function (el) {
                        document.querySelector('.reporter'+testerId).appendChild(el);
                    };

                    var setReportHTML = function (msg) {
                        document.querySelector('.reporter'+testerId).innerHTML = '[' + Date.now() + ']' + msg;
                    };

                    setReportHTML('wait...');
                    try {
                        var tmrTest = setTimeout(function() {
                            tmrTest = null;
                            setReportHTML('TIMEOUT');
                        }, TEST_TIMEOUT);
                        testfn(report);
                    }
                    catch (e) {
                        setReportHTML('Exception: ' + e);
                    }
                }
            }
        });
    }

    var type = localStorage.getItem('CORDOVA_TOAST_TESTRUNNER_TYPE');
    if (type !== 'TESTSUITE') {
        return;
    }
    document.addEventListener('deviceready', function() {
        renderTests();
    });
})();
