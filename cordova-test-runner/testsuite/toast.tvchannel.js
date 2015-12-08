/* globals testsuite */
(function() {
    var globalReport1 = null;
    var globalReport2 = null;

    var testFunc1 = function (channelInfo) {
        globalReport1('testFunc1 is called: ' + JSON.stringify(channelInfo));
    };
    var testFunc2 = function (channelInfo) {
        globalReport2('testFunc2 is called: ' + JSON.stringify(channelInfo));
    };

    testsuite('toast.tvchannel', 'tune() to \'7-1\'', function(report) {
        toast.tvchannel.tune({
            major: 7,
            minor: 1,
            channelName: 'KBS2',
            programNumber: 2,
            ptc: 17,
            lcn: 0,
            sourceID: 2,
            transportStreamID: 2065,
            originalNetworkID: 0,
            serviceName: 'KBS2'
        },{
            onsuccess: function (channelInfo) {
                report('OnSuccess: ' + JSON.stringify(channelInfo));
            },
            onnosignal: function () {
                report('OnNoSignal');
            },
            onprograminforeceived: function (channelInfo) {
                report('OnProgramInfoReceived: ' + JSON.stringify(channelInfo));
            }
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
    testsuite('toast.tvchannel', 'tuneUp()', function(report) {
        toast.tvchannel.tuneUp({
            onsuccess: function (channelInfo) {
                report('OnSuccess: ' + JSON.stringify(channelInfo));
            },
            onnosignal: function () {
                report('OnNoSignal');
            },
            onprograminforeceived: function (channelInfo) {
                report('OnProgramInfoReceived: ' + JSON.stringify(channelInfo));
            }
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        }, 'ALL');
    });
    testsuite('toast.tvchannel', 'tuneDown()', function(report) {
        toast.tvchannel.tuneDown({
            onsuccess: function (channelInfo) {
                report('OnSuccess: ' + JSON.stringify(channelInfo));
            },
            onnosignal: function () {
                report('OnNoSignal');
            },
            onprograminforeceived: function (channelInfo) {
                report('OnProgramInfoReceived: ' + JSON.stringify(channelInfo));
            }
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        }, 'ALL');
    });
    testsuite('toast.tvchannel', 'findChannel() \'7-1\'', function(report) {
        toast.tvchannel.findChannel(7, 1, function (channelInfoList) {
            report('Success: ' + JSON.stringify(channelInfoList));
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
    testsuite('toast.tvchannel', 'getChannelList()', function(report) {
        toast.tvchannel.getChannelList(function (channelInfoList) {
            report('Success: ' + JSON.stringify(channelInfoList));
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        }, 'ALL', 0, 10);
    });
    testsuite('toast.tvchannel', 'getCurrentChannel()', function(report) {
        toast.tvchannel.getCurrentChannel(function (channelInfo) {
            report('Success: ' + JSON.stringify(channelInfo));
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
    testsuite('toast.tvchannel', 'getProgramList() \'7-1\'', function(report) {
        toast.tvchannel.getProgramList({
            major: 7,
            minor: 1,
            channelName: 'KBS2',
            programNumber: 2,
            ptc: 17,
            lcn: 0,
            sourceID: 2,
            transportStreamID: 2065,
            originalNetworkID: 0,
            serviceName: 'KBS2'
        }, new Date(), function (programInfoList) {
            report('Success: ' + JSON.stringify(programInfoList));
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        }, 3);
    });
    testsuite('toast.tvchannel', 'getCurrentProgram()', function(report) {
        toast.tvchannel.getCurrentProgram(function(programInfo) {
            report('Success: ' + JSON.stringify(programInfo));
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
    testsuite('toast.tvchannel', 'addChannelChangeListener() \'testFunc1\'', function(report) {
        globalReport1 = report;
        toast.tvchannel.addChannelChangeListener(testFunc1);
    });
    testsuite('toast.tvchannel', 'addChannelChangeListener() \'testFunc2\'', function(report) {
        globalReport2 = report;
        toast.tvchannel.addChannelChangeListener(testFunc2);
    });
    testsuite('toast.tvchannel', 'removeChannelChangeListener() \'testFunc1\'', function(report) {
        toast.tvchannel.removeChannelChangeListener(testFunc1);
        report('Success: toast.tvchannel.removeChannelChangeListener()');
    });
    testsuite('toast.tvchannel', 'removeChannelChangeListener() \'testFunc2\'', function(report) {
        toast.tvchannel.removeChannelChangeListener(testFunc2);
        report('Success: toast.tvchannel.removeChannelChangeListener()');
    });
    testsuite('toast.tvchannel', 'removeChannelChangeListener() \'all\'', function(report) {
        toast.tvchannel.removeChannelChangeListener();
        report('Success: toast.tvchannel.removeChannelChangeListener()');
    });
})();
