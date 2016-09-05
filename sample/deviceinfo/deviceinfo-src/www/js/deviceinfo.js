/* jshint undef: true, unused: true */
/* globals device, Connection */
/* exported showDeviceInfoScene */

// Element
var noteEl = null;
var deviceTextEl = null;
var networkTextEl = null;

function showDeviceInfoScene() {
    var sceneEl = document.getElementById('deviceinfo_scene');
    var appEl = document.getElementById('app');
    noteEl = document.getElementById('note_text');
    deviceTextEl = document.getElementById('device_text');
    networkTextEl = document.getElementById('network_text');
    
    appEl.style.visibility = 'hidden';
    sceneEl.style.visibility = 'visible';

    // add button event : clear_btn
    document.getElementById('clear_btn').addEventListener('click', function() {
        toastLog('[Button Event] clicked clear_btn');
        deviceTextEl.innerHTML = '';
        networkTextEl.innerHTML = '';
    });

    // add button event : deviceinfo_btn
    document.getElementById('deviceinfo_btn').addEventListener('click', function() {
        toastLog('[Button Event] clicked deviceinfo_btn');
        displayDeviceInfo();
    });

    // add button event : networkstatus_btn
    document.getElementById('networkstatus_btn').addEventListener('click', function() {
        toastLog('[Button Event] clicked networkstatus_btn');
        checkConnection();
    });
}

function displayDeviceInfo() {
    deviceTextEl.innerHTML = '';

    for(var key in device) {
        deviceTextEl.innerHTML += '<p>' + key + ' : ' + device[key] + '</p>';    
    }
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    toastLog('Connection type: ' + states[networkState]);
    networkTextEl.innerHTML += '<p> status : ' + states[networkState] + '</p>';
}

// for debugging
function toastLog(msg) {
    var now = new Date();
    var time = now.toJSON();
    var debugMsg = '[toast deviceinfo tutorial] (' + time + ') : <br>' + msg;
    
    console.log(debugMsg);
    
    var debugEl = document.getElementById('debug_container');
    if(debugEl.scrollHeight > 0) {
        debugEl.scrollTop = debugEl.scrollHeight/2;
    }

    debugEl.innerHTML += '<p>' + debugMsg + '</p>';
}
