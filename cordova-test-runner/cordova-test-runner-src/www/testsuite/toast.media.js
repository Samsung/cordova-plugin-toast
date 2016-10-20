/* globals testsuite */
(function() {
    var mediaIns = null;
    testsuite('toast.Media', 'getInstance()', function(report) {
        try {
            mediaIns = toast.Media.getInstance();
            report('Success: toast.Media.getInstance()');
        }
        catch (err) {
            report('Error: ' + JSON.stringify(err));
        }
    });
    testsuite('toast.Media', 'open() -> \'SampleVideo\' ', function(report) {
        try {
            mediaIns.open('http://media.w3.org/2010/05/sintel/trailer.mp4');
            report('Success: toast.Media.open(\'http://media.w3.org/2010/05/sintel/trailer.mp4\')');
        }
        catch(err) {
            report('Error: ' + JSON.stringify(err));
        }
    });
    testsuite('toast.Media', 'open() -> \'SampleAudio\' ', function(report) {
        try {
            mediaIns.open('http://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp3');
            report('Success: toast.Media.open(\'http://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp3\')');
        }
        catch(err) {
            report('Error: ' + JSON.stringify(err));
        }
    });
    testsuite('toast.Media', 'getContainerElement()', function(report) {
        try {
            var elContainer = mediaIns.getContainerElement();
            elContainer.style.left = '0px';
            elContainer.style.top = '0px';
            elContainer.style.width = '320px';
            elContainer.style.height = '180px';
            report('Success: getContainerElement()');
            report.append(elContainer);
        }
        catch(err) {
            report('Error: ' + JSON.stringify(err));
        }
    });
    testsuite('toast.Media', 'setListener()', function(report) {
        try {
            mediaIns.setListener({
                onevent: function (evt) {
                    switch(evt.type) {
                        case 'STATE':
                            report('Success: Media State changed: ' + evt.data.oldState + ' -> ' + evt.data.state);
                            break;
                        case 'DURATION':
                            report('Success: Media duration updated: ' + evt.data.duration + 'ms');
                            break;
                        case 'POSITION':
                            report('Success: Media position updated: ' + evt.data.position + 'ms');
                            break;
                        case 'BUFFERINGPROGRESS' :
                            report('Success: Media buffering in progress: ' + evt.data.bufferingPercentage + '%');
                            if(evt.data.bufferingPercentage >= 100) {
                                report('Success: Buffering completed');
                            }
                            break;
                        case 'SUBTITLE' :
                            report('Success: Media subtitle text updated: ' + evt.data.text);
                            break;
                    }
                },
                onerror: function (err) {
                    report('Error : MediaError occured: ' + JSON.stringify(err));
                }
            });
        }
        catch(err) {
            report('Error: ' + JSON.stringify(err));
        }
    });
    testsuite('toast.Media', 'unsetListener()', function(report) {
        try {
            mediaIns.unsetListener();
            report('Success: toast.Media.unsetListener()');
        }
        catch(err) {
            report('Error: ' + JSON.stringify(err));
        }
    });
    testsuite('toast.Media', 'play()', function(report) {
        try {
            mediaIns.play();
            report('Success: toast.Media.play()');
        }
        catch(err) {
            report('Error: ' + JSON.stringify(err));
        }
    });
    testsuite('toast.Media', 'pause()', function(report) {
        try {
            mediaIns.pause();
            report('Success: toast.Media.pause()');
        }
        catch(err) {
            report('Error: ' + JSON.stringify(err));
        }
    });
    testsuite('toast.Media', 'seekTo() to \'FF 3s\'', function(report) {
        try {
            var curPosition = mediaIns.getCurrentPosition();
            mediaIns.seekTo(curPosition + 3000);
            report('Success: FF 3s');
        }
        catch(err) {
            report('Error: ' + JSON.stringify(err));
        }
    });
    testsuite('toast.Media', 'getDuration()', function(report) {
        try {
            var duration = mediaIns.getDuration();
            report('Success: ' + duration);
        }
        catch(err) {
            report('Error: ' + JSON.stringify(err));
        }
    });
    testsuite('toast.Media', 'getCurrentPosition()', function(report) {
        try {
            var position = mediaIns.getCurrentPosition();
            report('Success: ' + position);
        }
        catch(err) {
            report('Error: ' + JSON.stringify(err));
        }
    });
    testsuite('toast.Media', 'stop()', function(report) {
        try {
            mediaIns.stop();
            report('Success: toast.Media.stop()');
        }
        catch(err) {
            report('Error: ' + JSON.stringify(err));
        }
    });
})();
