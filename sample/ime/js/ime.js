/* jshint undef: true, unused: true */
/* exported showIMEScene */

// Element
var imeEl = null;
var noteEl = null;
var submitNotiEl = null;
var cancelNotiEl = null;
var blurNotiEl = null;

function showIMEScene() {
    var sceneEl = document.getElementById('ime_scene');
    var appEl = document.getElementById('app');
    noteEl = document.getElementById('note_text');
    imeEl = document.getElementById('ime_input');
    submitNotiEl = document.getElementById('done_noti');
    cancelNotiEl = document.getElementById('cancel_noti');
    blurNotiEl = document.getElementById('blur_noti');
    
    appEl.style.visibility = 'hidden';
    sceneEl.style.visibility = 'visible';

    // add IME event : submit
    imeEl.addEventListener('submit', function() {
        toastLog('[IME Event] clicked done');
        
        displayInputValue();
        notiCurrentEvent(submitNotiEl);
    });

    // add IME event : cancel
    imeEl.addEventListener('cancel', function() {
        toastLog('[IME Event] clicked cancel');
        
        notiCurrentEvent(cancelNotiEl);
    });

    // add IME event : blur
    imeEl.addEventListener('blur', function() {
        toastLog('[IME Event] lost focus IME');

        notiCurrentEvent(blurNotiEl);

        if(imeEl.getAttribute('data-ime-show') == 'false'){
            toastLog('[IME Event] closed IME');
        }
    });

    // focus IME
    imeEl.focus();
    
    // add button event : submit
    document.getElementById('submit_btn').addEventListener('click', function() {
        toastLog('[Button Event] clicked submit');
        displayInputValue();
    });

    // add button event : clear
    document.getElementById('clear_btn').addEventListener('click', function() {
        toastLog('[Button Event] clicked clear');
        clearInputValue();
    });
}

// display value
function displayInputValue() {
    toastLog('display input value to note');
    
    if(noteEl.scrollHeight > 0) {
        noteEl.scrollTop = noteEl.scrollHeight/2;
    }
    noteEl.innerHTML += '<p>' + imeEl.value + '</p>';
}

// clear value
function clearInputValue() {
    toastLog('clear input value');
    
    imeEl.value = '';
}

// noti IME Event
function notiCurrentEvent(element) {
    element.style.color = '#ff0000';
    setTimeout(function(){
        element.style.color = '#5d5d5d';
    },2000);
}

// for debugging
function toastLog(msg) {
    var now = new Date();
    var time = now.toJSON();
    var debugMsg = '[toast ime tutorial] (' + time + ') : ' + msg;
    
    console.log(debugMsg);
    
    var debugEl = document.getElementById('debug_container');
    if(debugEl.scrollHeight > 0) {
        debugEl.scrollTop = debugEl.scrollHeight/2;
    }

    debugEl.innerHTML += '<p>' + debugMsg + '</p>';
}
