/*
 * Copyright 2015 Samsung Electronics Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* globals testsuite */
(function() {
    testsuite('IME (TV Only)', 'submit event', function(report) {

        var elInput = document.createElement('input');
        report.append(elInput);

        elInput.addEventListener('submit', function (e) {
            report('Success: submit event ' + JSON.stringify(elInput.value));
        });

        elInput.addEventListener('cancel', function (e) {
            report('Error: cancel event');
        });

        elInput.focus();
    });

    testsuite('IME (TV Only)', 'cancel event', function(report) {

        var elInput = document.createElement('input');
        report.append(elInput);

        elInput.addEventListener('submit', function (e) {
            report('Error: submit event');
        });

        elInput.addEventListener('cancel', function (e) {
            report('Success: cancel event');
        });

        elInput.focus();
    });

    testsuite('IME (TV Only)', 'blur event', function(report) {

        var elInput = document.createElement('input');
        report.append(elInput);

        elInput.addEventListener('blur', function (e) {
            if(elInput.getAttribute('data-ime-show') == 'false') {
                report('Success : Closed IME');
            }
        });

        elInput.focus();
    });
})();
