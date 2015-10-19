(function() {
    var TESTRUNNER_TYPE_KEY = 'CORDOVA_TOAST_TESTRUNNER_TYPE';
    var keyInfo = {
        // Web
        37: 'LEFT',
        38: 'UP',
        39: 'RIGHT',
        40: 'DOWN',
        13: 'ENTER',
        27: 'RETURN',

        // Orsay
        4: 'LEFT',
        5: 'RIGHT',
        29460: 'UP',
        29461: 'DOWN',
        29443: 'ENTER',
        88: 'RETURN',

        // 15' Tizen TV
        10009: 'RETURN'
    };

    document.addEventListener('deviceready', function () {
        window.addEventListener('keydown', function(e) {
            if (keyInfo[e.keyCode] === 'RETURN') {
                toast.application.exit();
            }
        });
    });

    var type = localStorage.getItem(TESTRUNNER_TYPE_KEY);
    if (type) {
        var magicKey = ['LEFT', 'RIGHT', 'UP', 'DOWN', 'ENTER'];
        var cntMatched = 0;
        window.addEventListener('keydown', function(e) {
            var keyName = keyInfo[e.keyCode];
            if (keyName && magicKey[cntMatched] === keyName) {
                cntMatched++;
                console.log(keyName);
                if (cntMatched >= magicKey.length) {
                    cntMatched = 0;
                    resetTestMode();
                }
            }
            else {
                cntMatched = 0;
            }
        });

        var instruction = document.createElement('div');
        instruction.style.position = 'fixed';
        instruction.style.right = '0';
        instruction.style.bottom = '0';
        instruction.style.backgroundColor = '#00f';
        instruction.style.color = '#fff';
        instruction.style.fontSize = '15px';
        instruction.innerHTML = 'Press ' + magicKey.join(',') + ' to select test mode';

        setTimeout(function() { // append to the end of content
            document.body.appendChild(instruction);
        }, 0);

        return;
    }

    function resetTestMode() {
        localStorage.removeItem(TESTRUNNER_TYPE_KEY);
        location.reload(true);
    }

    document.body.innerHTML = 'Please select mode:<br>' + 'LEFT: Jasmine TestRunner<br>' + 'RIGHT: Toast TestSuite<br>';
    window.addEventListener('keydown', function(e) {
        switch (e.keyCode) {
            // LEFT
            case 37:
            case 4:
                localStorage.setItem(TESTRUNNER_TYPE_KEY, 'JASMINE_RUNNER');
                document.body.innerHTML += '<br>SELECTED: ' + localStorage.getItem(TESTRUNNER_TYPE_KEY) + '<br>Please restart the application.';
                break;

                // RIGHT
            case 39:
            case 5:
                localStorage.setItem(TESTRUNNER_TYPE_KEY, 'TESTSUITE');
                document.body.innerHTML += '<br>SELECTED: ' + localStorage.getItem(TESTRUNNER_TYPE_KEY) + '<br>Please restart the application.';
                break;
        }
    });
})();
