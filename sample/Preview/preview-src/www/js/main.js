var tvKey = {};
var text = '';

var element = '';
var isPlay = false;
var isPaint = false;

var contentsURL = 'https://www.samsungdforum.com/Preview/';

function main() {
	log('[TOAST Sample App] onload - [Preview]');

	window.addEventListener('appcontrol', deepLink);
	document.addEventListener("visibilitychange", function() {
	    if(document.hidden){
	    	text = 'hidden';
			log(text);
	    } else {
	    	text = 'visible';
			log(text);
	    }
	});

	setKeyTable();
	registerKeys();
	registerKeyHandler();

	deepLink();
}

/**
 * Set Key Table used in this application
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

                case '4' :
                    tvKey[prefixKeyName + '4'] = supportedKeys[i].code;
                    break;

                case '5' :
                    tvKey[prefixKeyName + '5'] = supportedKeys[i].code;
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
	var keyValue = ["0", "1", "2", "3", "4", "5"]; // 'return key' is already registered.
	for (var i = 0; i < keyValue.length; i++) {
        try{
        	toast.inputdevice.registerKey(keyValue[i], function() {}, function(err) {
	            console.log('Error: ' + err.message);
	        });
        } catch(e){
        	console.log("failed to register " + keyValue[i] + ": " + e);
        }
    }
}

/**
 * Handle input from remote
 */
function registerKeyHandler(){
	document.addEventListener("keydown", function(e) {
        log("[keyCode] : " + "[" + e.keyCode + "]");
		switch(event.keyCode) {
			case tvKey.KEY_0:
				log(); // log clear
				break;

			// video
			case tvKey.KEY_1:
				play(1);
				break;
			case tvKey.KEY_2:
				play(2);
				break;

			// picture
			case tvKey.KEY_3:
				paint(3);
				break;
			case tvKey.KEY_4:
				paint(4);
				break;
			case tvKey.KEY_5:
				paint(5);
				break;

			case tvKey.KEY_RETURN:
				log('[Preview] return');
				if(element) {
					document.getElementsByTagName('body')[0].removeChild(element);
					element = '';
					isPlay = false;
					isPaint = false;
				}
				else {
					toast.application.exit();
				}
				break;
		}
	});
}

function deepLink() {
    var appControlData;
    var actionData;

    var videoIdx;
    var pictureIdx;

    toast.application.getRequestedAppInfo(function(requestedAppControl) {
    	appControlData = requestedAppControl.data;  // get appcontrol data. action_data is in it.
    	text = '[Preview] appControlData : ' + JSON.stringify(appControlData);
    	log(text);
        if (appControlData.hasOwnProperty('PAYLOAD')) { // find PAYLOAD property.
            actionData = JSON.parse(appControlData.PAYLOAD); // Get action_data
            if(JSON.parse(actionData.values).videoIdx) { // in case Tile is video.
            	videoIdx = JSON.parse(actionData.values).videoIdx

            	text = '[Preview] videoIdx : ' + videoIdx;
                log(text);

                play(videoIdx); // play the video.
            }
            else if(JSON.parse(actionData.values).pictureIdx) { // in case Tile is picture.
            	pictureIdx = JSON.parse(actionData.values).pictureIdx

            	text = '[Preview] pictureIdx : ' + pictureIdx;
                log(text);

                paint(pictureIdx); // paint the picture.
            }
        }
	}, function(err) {
	    log("[getRequestedAppInfo] : fail");
	});
}

function play(value) {
	if(element && isPlay && !isPaint) {
		element.src = contentsURL + value + '.mp4';
		element.play();
	}
	else if(element && !isPlay && isPaint) {
		document.getElementsByTagName('body')[0].removeChild(element);
		isPaint = false;

		element = document.createElement('video');
		element.controls = true;
		element.className = 'video';

		element.src = contentsURL + value + '.mp4';
		document.getElementsByTagName('body')[0].appendChild(element);
		element.play();
		isPlay = true;
	}
	else if(!element) {
		element = document.createElement('video');
		element.controls = true;
		element.className = 'video';

		element.src = contentsURL + value + '.mp4';
		document.getElementsByTagName('body')[0].appendChild(element);
		element.play();
		isPlay = true;
	}
}

function paint(value) {
	if(element && !isPlay && isPaint) {
		element.src = contentsURL + value + '.jpg';
	}
	else if(element && isPlay && !isPaint) {
		document.getElementsByTagName('body')[0].removeChild(element);
		isPlay = false;

		element = document.createElement('img');
		element.className = 'img';

		element.src = contentsURL + value + '.jpg';
		document.getElementsByTagName('body')[0].appendChild(element);
		isPaint = true;
	}
	else if(!element) {
		element = document.createElement('img');
		element.className = 'img';

		element.src = contentsURL + value + '.jpg';
		document.getElementsByTagName('body')[0].appendChild(element);
		isPaint = true;
	}
}

function log(string) {
	var logsEl = document.getElementById('logs');

    if (string) {
        // Update logs
        console.log('[Preview]: ', string);
        logsEl.innerHTML += string + '<br />';
    } else {
        // Clear logs
        logsEl.innerHTML = '';
    }

    logsEl.scrollTop = logsEl.scrollHeight;
}