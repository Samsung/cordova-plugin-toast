var screenSize = [];

function showTVChannel() {
    var sceneEl = document.getElementById('channelScene');
    var appEl = document.getElementById('app');
    var containerEl = document.getElementById('window');
    var channelNameEl = document.getElementById('channelName');
    var channelNumberEl = document.getElementById('channelNumber');
    var statusEl = document.getElementById('status');

    appEl.style.visibility = 'hidden';
    sceneEl.style.visibility = 'visible';
    
    screenSize = [0, 0, containerEl.offsetWidth, containerEl.offsetHeight];

    // set source
    toast.tvwindow.setSource({
        type: 'TV',
        number: 1
    }, function(sourceInfo) {
        appLog('Success: ' + JSON.stringify(sourceInfo));
    }, function(err) {
        appLog('Error: ' + JSON.stringify(err));
    });

    // get Channel List
    toast.tvchannel.getChannelList(function (channelInfoList) {
        appLog('Success: ' + JSON.stringify(channelInfoList));
    }, function(err) {
        appLog('Error: ' + JSON.stringify(err));
    }, 'ALL', 0, 10);

    // show tvwindow with screen size
    toast.tvwindow.show(screenSize, function(rectInfo) {
        appLog('Success: ' + JSON.stringify(rectInfo));
    }, function(err) {
        appLog('Error: ' + JSON.stringify(err));
    });

    // add click event listener
    document.getElementById('show').addEventListener('click', function(){
        // show tvwindow with screen size
        toast.tvwindow.show(screenSize, function(rectInfo) {
            appLog('Success: ' + JSON.stringify(rectInfo));
        }, function(err) {
            appLog('Error: ' + JSON.stringify(err));
        });
    });

    // add click event listener
    document.getElementById('hide').addEventListener('click', function(){
        // hide tvwindow
        toast.tvwindow.hide(function() {
            appLog('Success');
        }, function(err) {
            appLog('Error: ' + JSON.stringify(err));
        });
    });

    // add click event listener
    document.getElementById('tuneUp').addEventListener('click', function(){
        // tune up
        toast.tvchannel.tuneUp({
            onsuccess: function (channelInfo) {
                appLog('OnSuccess: ' + JSON.stringify(channelInfo));
            },
            onnosignal: function () {
                appLog('OnNoSignal');
                channelNameEl.innerHTML = 'please check signal';
            },
            onprograminforeceived: function (channelInfo) {
                appLog('OnProgramInfoReceived: ' + JSON.stringify(channelInfo));
            }
        }, function(err) {
            appLog('Error: ' + JSON.stringify(err));
        });
    });

    // add click event listener
    document.getElementById('tuneDown').addEventListener('click', function(){
        // tune down
        toast.tvchannel.tuneDown({
            onsuccess: function (channelInfo) {
                appLog('OnSuccess: ' + JSON.stringify(channelInfo));
            },
            onnosignal: function () {
                appLog('OnNoSignal');
                channelNameEl.innerHTML = 'please check signal';
            },
            onprograminforeceived: function (channelInfo) {
                appLog('OnProgramInfoReceived: ' + JSON.stringify(channelInfo));
            }
        }, function(err) {
            appLog('Error: ' + JSON.stringify(err));
        });
    });

    var displayChannel  = function(channelInfo) {
        appLog('OnSuccess: ' + JSON.stringify(channelInfo));
        channelNameEl.innerHTML = channelInfo.channelName;
        channelNumberEl.innerHTML = channelInfo.major + '-' + channelInfo.minor;
    };

    // add click event listener
    document.getElementById('addEvent').addEventListener('click', function(){
        // add channel change listener
        statusEl.innerHTML = 'Channel Change Event is added';
        toast.tvchannel.addChannelChangeListener(displayChannel);
    });

    // add click event listener
    document.getElementById('rmEvent').addEventListener('click', function(){
        // remove channel change listener
        statusEl.innerHTML = 'Channel Change Event is removed';
        channelNameEl.innerHTML = '';
        channelNumberEl.innerHTML = '';
        toast.tvchannel.removeChannelChangeListener(displayChannel);
    });
}

function appLog(msg){
    var now = new Date();
    var time = now.toJSON();
    var debugMsg = "[toast tv tutorial] (" + time + ") : " + msg;
    
    console.log(debugMsg);
    
    var prevText = '';
    var debugEl = document.getElementById('debug_log');
    if(debugEl.scrollHeight > 0) {
        debugEl.scrollTop = debugEl.scrollHeight/2;
    }

    prevText = debugEl.innerHTML;
    debugEl.innerHTML =  prevText + '<p>' + debugMsg + '</p>';
};