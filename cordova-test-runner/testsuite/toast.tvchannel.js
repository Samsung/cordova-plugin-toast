/* globals testsuite */


(function() {
    var testFunc1 = function (channelInfo) {
        console.log('Call the testFunc1 function.');
    };
    var testFunc2 = function (channelInfo) {
        console.log('Call the testFunc2 function.');
    };
    testsuite('toast.tvchannel', 'tune() to \'7-1\'', function(report) {
        toast.tvchannel.tune({
            major: 7,
            minor: 1,
            programNumber: 2,
            ptc: 17,
            sourceID: 2,
            originalNetworkID: 0
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
        toast.tvchannel.findChannel(7, 1, function (channelInfo) {
            report('Success: ' + JSON.stringify(channelInfo));
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        });
    });
    testsuite('toast.tvchannel', 'getChannelList()', function(report) {
        toast.tvchannel.getChannelList(function (channelInfo) {
            report('Success: ' + JSON.stringify(channelInfo));
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
            programNumber: 2,
            ptc: 17,
            sourceID: 2,
            originalNetworkID: 0
        }, new Date(), function (programInfo) {
            report('Success: ' + JSON.stringify(programInfo));
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
        toast.tvchannel.addChannelChangeListener(testFunc1);
    });
    testsuite('toast.tvchannel', 'addChannelChangeListener() \'testFunc2\'', function(report) {
        toast.tvchannel.addChannelChangeListener(testFunc2);
    });
    testsuite('toast.tvchannel', 'removeChannelChangeListener() \'testFunc1\'', function(report) {
        toast.tvchannel.removeChannelChangeListener(testFunc1);
    });
    testsuite('toast.tvchannel', 'removeChannelChangeListener() \'testFunc2\'', function(report) {
        toast.tvchannel.removeChannelChangeListener(testFunc2);
    });
})();