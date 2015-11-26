// ime Element
var imeEl = null;

// note Element
var noteEl = null;

// button Element
var submitEl = null;

function showIMEScene() {
    var sceneEl = document.getElementById('imeScene');
    var appEl = document.getElementById('app');
    noteEl = document.getElementById('note');
    imeEl = document.getElementById('imeinput');
    submitEl = document.getElementById('submit');
    var clearEl = document.getElementById('clear');
    
    appEl.style.visibility = 'hidden';
    sceneEl.style.visibility = 'visible';

    addImeEvent();
    
    // add submit button event
    submitEl.addEventListener('click', function() {
        imeSubmit();

        imeEl.focus();
    });

    clearEl.addEventListener('click', function() {
        // reset input
        imeEl.value = '';
    });
}

function addImeEvent() {
    // add submit event of IME
    window.addEventListener('submit', function() {
        appLog('clicked DONE of IME');

        imeSubmit();
    });

    // add cancel event of IME
    window.addEventListener('cancel', function() {
        appLog('clicked CANCEL of IME');
    });

    // add blur event of IME
    imeEl.addEventListener('blur', function() {
        appLog('lost focus of IME');

        if(imeEl.getAttribute('data-toast-ime-shown') == 'false'){
            appLog('closed IME');
        }
    });

    imeEl.focus();
}

function imeSubmit() {
    appLog('completed to submit');
    
    if(noteEl.scrollHeight > 0) {
        noteEl.scrollTop = noteEl.scrollHeight/2;
    }
    noteEl.innerHTML += '<p>' + imeEl.value + '</p>';
}

// for debugging
function appLog(msg) {
    var now = new Date();
    var time = now.toJSON();
    var debugMsg = "[toast ime tutorial] (" + time + ") : " + msg;
    
    console.log(debugMsg);
    
    var prevText = '';
    var debugEl = document.getElementById('debug_log');
    if(debugEl.scrollHeight > 0) {
        debugEl.scrollTop = debugEl.scrollHeight/2;
    }

    prevText = debugEl.innerHTML;
    debugEl.innerHTML =  prevText + '<p>' + debugMsg + '</p>';
}
