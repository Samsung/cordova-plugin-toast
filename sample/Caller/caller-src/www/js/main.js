var tvKey = {};
var text = '';

var platform = cordova.require('cordova/platform');
var paramAppId; // variable for launch app.

function main() {
	log('[TOAST Sample App] onload - [Caller App]');

	setKeyTable();
	registerKeys();
	registerKeyHandler();
	registerMouseEvents();
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
                case '3' :
                    tvKey[prefixKeyName + '3'] = supportedKeys[i].code;
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
	var usedKeys = ['0', '1', '2', '3']; // 'return key' is already registered.
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

			// Jump Browser
			case tvKey.KEY_1:
				test1();
				break;

			// Jump Callee WebApplication with no data
			case tvKey.KEY_2:
				test2();
				break;

			// Jump Callee WebApplication with data
			case tvKey.KEY_3:
				test3();
				break;

			case tvKey.KEY_RETURN:
				log('[Caller App] return');
				toast.application.exit();
				break;
		}
	});
}

function registerMouseEvents() {
    document.querySelector('.launch .browser').addEventListener('click', test1);
    document.querySelector('.launch .no_data').addEventListener('click', test2);
    document.querySelector('.launch .data').addEventListener('click', test3);
    document.querySelector('.launch .clear').addEventListener('click', logclear);
}

/**
 * @Jump Browser
 */
function test1() {
	if(platform.id == 'sectv-orsay'){
		paramAppId = '29_fullbrowser';
	}
	else if(platform.id == 'sectv-tizen'){
		paramAppId = 'org.tizen.browser';
	}
	var paramData = {
		url: 'https://www.samsungdforum.com',
		info: 'samsungdforum'
	};
	toast.application.launchApp({appId: paramAppId, data: {url: paramData.url, info: paramData.info}}, function() {
	    text = 'Jump Browser Success';
		log(text);
	}, function(err) {
	    log('Jump Browser Error : ' + err.message);
	});
}

/**
 * @Jump Callee Application
 */
function test2() {
	if(platform.id == 'sectv-orsay'){
		//change variable value.
		paramAppId = 'application name'; // ex) paramAppId = 'callee'
	}
	else if(platform.id == 'sectv-tizen'){
		//change variable value.
		paramAppId = 'application id'; // ex) paramAppId = '4m0xhrnm0k.callee'
	}
	toast.application.launchApp({appId: paramAppId, data: {url: '', info: ''}}, function() {
	    text = 'Jump Callee Application Success';
		log(text);
	}, function(err) {
		log('Jump Callee Application Error : ' + err.message);
	});
}

/**
 * @Jump Callee Application with Data
 */
function test3() {
	if(platform.id == 'sectv-orsay'){
		//change variable value.
		paramAppId = 'application name'; // ex) paramAppId = 'callee'
	}
	else if(platform.id == 'sectv-tizen'){
		//change variable value.
		paramAppId = 'application id'; // ex) paramAppId = '4m0xhrnm0k.callee'
	}
	var petsName = ['dog','cat','bird'];

	toast.application.launchApp({appId: paramAppId, data: {url: '', info: '', pets: petsName}}, function() {
	    text = 'Jump Callee Application with Data Success';
		log(text);
	}, function(err) {
		log('Jump Callee Application with Data Error : ' + err.message);
	});
}

function log(string) {
	var logsEl = document.getElementById('logs');

    if (string) {
        // Update logs
        console.log('[Caller App]: ', string);
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
