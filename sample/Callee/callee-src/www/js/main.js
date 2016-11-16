var tvKey = {};
var result = '';
var text = '';

function main() {
	log('[TOAST Sample App] onload - [Callee App]');

	window.addEventListener('appcontrol', deepLink);
	document.addEventListener('visibilitychange', function() {
			if(document.hidden){
				text = 'hidden';
				log(text);
				
			} else {
				text = 'visible';
				log(text);
			}
		}
	);

	setKeyTable();
	registerKeys();
	registerKeyHandler();
	registerMouseEvents();

	deepLink();
}

/**
 * Set key table used in this application.
 */
function setKeyTable() {
	var prefixKeyName = 'KEY_';
	toast.inputdevice.getSupportedKeys(function (supportedKeys) {
        for (var i = 0; i < supportedKeys.length; i++) {
            switch(supportedKeys[i].name) {
                case '0' :
                    tvKey[prefixKeyName + '0'] = supportedKeys[i].code;
                    break;
                case '1' :
                    tvKey[prefixKeyName + '1'] = supportedKeys[i].code;
                    break;
                case '2' :
                    tvKey[prefixKeyName + '2'] = supportedKeys[i].code;
                    break;

                case 'Return' :
                    tvKey[prefixKeyName + 'RETURN'] = supportedKeys[i].code;
                    break;
            }
        }
    }, function(err){
        console.log('Error : ' + err.message);
    });
}

/**
 * Register keys used in this application
 */
function registerKeys() {
	var usedKeys = ['0', '1', '2']; // 'return key' is already registered.
	for (var i = 0; i < usedKeys.length; i++) {
        try {
        	toast.inputdevice.registerKey(usedKeys[i], function() {}, function(err) {
                console.log('Error: ' + err.message);
            });
        } catch(e){
            console.log("failed to register " + usedKeys[i] + ": " + e);
        }
    }
}

/**
 * Handle input from remote
 */
function registerKeyHandler(){
	document.addEventListener("keydown", function(e) {
        log("[keyCode] : " + "[" + e.keyCode + "]");
		switch(e.keyCode) {
			case tvKey.KEY_0:
				log(); // log clear
				break;
			case tvKey.KEY_1:
				test1();
				break;
			case tvKey.KEY_2:
				test2();
				break;
			case tvKey.KEY_RETURN:
				log('[Callee App] return');
				toast.application.exit();
				break;
		}
	});
}

function registerMouseEvents() {
    document.querySelector('.launch .exit').addEventListener('click', test1);
    document.querySelector('.launch .data').addEventListener('click', test2);
    document.querySelector('.launch .clear').addEventListener('click', logclear);
}

function test1() {
	toast.application.exit();
}

function test2() {
	deepLink();
}

function deepLink() {
	toast.application.getRequestedAppInfo(function(reqAppInfo) {
	    log("toast.application.getRequestedAppInfo.callerAppId : " + reqAppInfo.callerAppId);
	    log("toast.application.getRequestedAppInfo.data : " + JSON.stringify(reqAppInfo.data));
	}, function(err) {
	    console.log('fail' + err.message);
	});
}

function log(string) {
	var logsEl = document.getElementById('logs');

    if (string) {
        // Update logs
        console.log('[Callee App]: ', string);
        logsEl.innerHTML += string + '<br />';
    } else {
        // Clear logs
        logsEl.innerHTML = '';
    }

    logsEl.scrollTop = logsEl.scrollHeight;
}

function logclear(){
	document.getElementById('logs').innerHTML = '';
}
