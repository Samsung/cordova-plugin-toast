
var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var tvchannelExport = {};

tvchannelExport = {
    // void tune (TuneOption tuneOption, TuneCallback successCallback, optional ErrorCallback? errorCallback, optional WindowType? type)
    tune: function (tuneOption, successCallback, errorCallback, type) {
        argscheck.checkArgs('ofFs', 'tvchannel.tune', arguments);
        var getValue = argscheck.getValue;
        if(tuneOption.hasOwnProperty("major")) {
            (typeof tuneOption.major === "number") ? null : (delete tuneOption.major);
        }

        var args = [tuneOption, type];
        exec(successCallback, errorCallback, "toast.tvchannel", "tune", args);
    }
    // void tuneUp (TuneCallback successCallback, optional ErrorCallback? errorCallback, optional TuneMode? tuneMode, optional WindowType? type)
    // void tuneDown (TuneCallback successCallback, optional ErrorCallback? errorCallback, optional TuneMode? tuneMode, optional WindowType? type)
    // void findChannel (long major, long minor, FindChannelSuccessCallback successCallback, optional ErrorCallback? errorCallback)
    // void getChannelList (FindChannelSuccessCallback successCallback, optional ErrorCallback? errorCallback, optional TuneMode? mode, optional long? nStart, optional long? number)
    // ChannelInfo getCurrentChannel (optional WindowType? type)
    // void getProgramList (ChannelInfo channelInfo, TZDate startTime, ProgramListSuccessCallback successCallback, optional ErrorCallback? errorCallback, optional unsigned long? duration)
    // ProgramInfo getCurrentProgram (optional WindowType? type)
    // long addChannelChangeListener (ChannelChangeCallback callback, optional WindowType? type)
    // void removeChannelChangeListener (long channelListenerId)
    // long addProgramChangeListener (ProgramChangeCallback callback, optional ChannelInfo? channel)
    // void removeProgramChangeListener (long programListenerId)
    // unsigned long getNumOfAvailableTuner ()
    // long getNumOfAvailableSources (optional sourceType)
};

module.exports = tvchannelExport;
