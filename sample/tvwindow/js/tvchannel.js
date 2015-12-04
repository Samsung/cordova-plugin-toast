/* jshint undef: true, unused: true */
/* exported showTvwindowScene */

var screenSize = [];

function showTvwindowScene() {
    // Element
    var sceneEl = document.getElementById('tvwindow_scene');
    var appEl = document.getElementById('app');
    var containerEl = document.getElementById('tv_container');
    var channelNameEl = document.getElementById('channel_name_text');
    var channelNumberEl = document.getElementById('channel_number_text');
    var statusEl = document.getElementById('status_text');

    appEl.style.visibility = 'hidden';
    sceneEl.style.visibility = 'visible';

    // set tvwindow size
    screenSize = [0, 0, containerEl.offsetWidth, containerEl.offsetHeight];

    // set source
    toast.tvwindow.setSource({
        type: 'TV',
        number: 1
    }, function(sourceInfo) {
        toastLog('Success: ' + JSON.stringify(sourceInfo));
    }, function(err) {
        toastLog('Error: ' + JSON.stringify(err));
    });

    // get Channel List
    toast.tvchannel.getChannelList(function (channelInfoList) {
        toastLog('Success: ' + JSON.stringify(channelInfoList));
    }, function(err) {
        toastLog('Error: ' + JSON.stringify(err));
    }, 'ALL', 0, 10);

    // show tvwindow with screen size
    toast.tvwindow.show(screenSize, function(rectInfo) {
        toastLog('Success: ' + JSON.stringify(rectInfo));
    }, function(err) {
        toastLog('Error: ' + JSON.stringify(err));
    });

    // add button event : show
    document.getElementById('show_btn').addEventListener('click', function() {

        // show tvwindow with screen size
        toast.tvwindow.show(screenSize, function(rectInfo) {
            toastLog('Success: ' + JSON.stringify(rectInfo));
        }, function(err) {
            toastLog('Error: ' + JSON.stringify(err));
        });
    });

    // add button event : hide
    document.getElementById('hide_btn').addEventListener('click', function() {

        // hide tvwindow
        toast.tvwindow.hide(function() {
            toastLog('Success');
        }, function(err) {
            toastLog('Error: ' + JSON.stringify(err));
        });
    });

    // add button event : tuneUp
    document.getElementById('tuneup_btn').addEventListener('click', function() {

        // tune up
        toast.tvchannel.tuneUp({
            onsuccess: function (channelInfo) {
                toastLog('OnSuccess: ' + JSON.stringify(channelInfo));
            },
            onnosignal: function () {
                toastLog('OnNoSignal');
                channelNameEl.innerHTML = 'please check signal';
            },
            onprograminforeceived: function (channelInfo) {
                toastLog('OnProgramInfoReceived: ' + JSON.stringify(channelInfo));
            }
        }, function(err) {
            toastLog('Error: ' + JSON.stringify(err));
        });
    });

    // add button event : tuneDown
    document.getElementById('tunedown_btn').addEventListener('click', function() {

        // tune down
        toast.tvchannel.tuneDown({
            onsuccess: function (channelInfo) {
                toastLog('OnSuccess: ' + JSON.stringify(channelInfo));
            },
            onnosignal: function () {
                toastLog('OnNoSignal');
                channelNameEl.innerHTML = 'please check signal';
            },
            onprograminforeceived: function (channelInfo) {
                toastLog('OnProgramInfoReceived: ' + JSON.stringify(channelInfo));
            }
        }, function(err) {
            toastLog('Error: ' + JSON.stringify(err));
        });
    });

    // displayChannel callback
    var displayChannel = function(channelInfo) {
        toastLog('OnSuccess: ' + JSON.stringify(channelInfo));
        channelNameEl.innerHTML = channelInfo.channelName;
        channelNumberEl.innerHTML = channelInfo.major + '-' + channelInfo.minor;
    };

    // add button event : Add Channel Change Listener
    document.getElementById('addchannelchange_btn').addEventListener('click', function() {

        // add channel change listener
        statusEl.innerHTML = 'Channel Change Event is added';
        toast.tvchannel.addChannelChangeListener(displayChannel);
    });

    // add button event : Remove Channel Change Listener
    document.getElementById('rmchannelchange_btn').addEventListener('click', function() {

        // remove channel change listener
        statusEl.innerHTML = 'Channel Change Event is removed';
        channelNameEl.innerHTML = '';
        channelNumberEl.innerHTML = '';
        toast.tvchannel.removeChannelChangeListener(displayChannel);
    });
}

// for debugging
function toastLog(msg) {
    var now = new Date();
    var time = now.toJSON();
    var debugMsg = '[toast tv tutorial] (' + time + ') : ' + msg;

    console.log(debugMsg);

    var debugEl = document.getElementById('debug_container');
    if(debugEl.scrollHeight > 0) {
        debugEl.scrollTop = debugEl.scrollHeight/2;
    }

    debugEl.innerHTML += '<p>' + debugMsg + '</p>';
}
