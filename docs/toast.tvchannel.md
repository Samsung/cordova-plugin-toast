# {{Namespace}}
{{Namespace}} privides something

## Supported platforms
* browser
* sectv-orsay
* sectv-tizen

## Full WebIDL
```widl
module TVChannel {

    enum TuneMode {
        "ALL",
        "DIGITAL",
        "ANALOG",
        "FAVORITE"
    };

    [NoInterfaceObject] interface TVChannelManager {
        readonly attribute ChannelManager tvchannel;
    };
    Toast implements TVChannelManager;

    [NoInterfaceObject] interface ChannelManager {

        void tune(TuneOption tuneOption,
                  TuneCallback successCallback,
                  optional ErrorCallback? errorCallback,
                  optional WindowType? type) raises(Error);

        void tuneUp(TuneCallback successCallback,
                    optional ErrorCallback? errorCallback,
                    optional TuneMode? tuneMode,
                    optional WindowType? type) raises(Error);

        void tuneDown(TuneCallback successCallback,
                      optional ErrorCallback? errorCallback,
                      optional TuneMode? tuneMode,
                      optional WindowType? type) raises(Error);

        void findChannel(long major,
                         long minor,
                         FindChannelSuccessCallback successCallback,
                         optional ErrorCallback? errorCallback) raises(Error);

        void getChannelList(FindChannelSuccessCallback successCallback,
                            optional ErrorCallback? errorCallback,
                            optional TuneMode? mode,
                            optional long? nStart,
                            optional long? number) raises(Error);

        void getCurrentChannel(ChannelInfo successCallback, optional ErrorCallback? errorCallback, optional WindowType? type) raises(Error);

        void getProgramList(ChannelInfo channelInfo,
                            TZDate startTime,
                            ProgramListSuccessCallback successCallback,
                            optional ErrorCallback? errorCallback,
                            optional unsigned long? duration) raises(Error);

        void getCurrentProgram(ProgramInfoCallback successCallback, optional ErrorCallback? errorCallback, optional WindowType? type) raises(Error);

        long addChannelChangeListener(ChannelChangeCallback callback,
                                       optional WindowType? type) raises(Error);

        void removeChannelChangeListener(long channelListenerId) raises(Error);

        long addProgramChangeListener(ProgramChangeCallback callback,
                                       optional ChannelInfo? channel) raises(Error);

        void removeProgramChangeListener(long programListenerId) raises(Error);

        unsigned long getNumOfAvailableTuner() raises(Error);

        long getNumOfAvailableSources(optional sourceType) raises(Error);

    };

    callback ProgramInfoArrayCallback = void (ProgramInfo[] programInfos);

    callback ChannelInfoArrayCallback = void (ChannelInfo[] channelInfos);

    callback ChannelInfoCallback = void (ChannelInfo channelInfo);

    callback ChannelChangeCallback = void (ChannelInfo channelInfo, WindowType type);

    callback ProgramChangeCallback = void (ProgramInfo programInfo, ChannelInfo channelInfo);

    callback NoSignalCallback = void ();

    callback ProgramInfoChangeCallback = void (ProgramInfo program, WindowType type);

    callback ProgramInfoCallback = void (ProgramInfo program);

    [NoInterfaceObject] interface TuneCallback {
        ChannelChangeCallback onsuccess;
        NoSignalCallback onnosignal;
        ProgramInfoChangeCallback onprograminforeceived;
    };

    dictionary TuneOption {
        long? major;
        long? minor;
        long? sourceID;
        long? programNumber;
        long? transportStreamID;
        long? ptc;
        long? originalNetworkID;
    };

    [NoInterfaceObject] interface ChannelInfo {
        readonly attribute long major;

        readonly attribute long minor;

        readonly attribute DOMString channelName;

        readonly attribute long programNumber;

        readonly attribute long ptc;

        readonly attribute long lcn;

        readonly attribute long sourceID;

        readonly attribute long transportStreamID;

        readonly attribute long originalNetworkID;

        readonly attribute DOMString serviceName;
    };

    [NoInterfaceObject] interface ProgramInfo {
        readonly attribute DOMString title;

        readonly attribute Date startTime;

        readonly attribute long duration;

        readonly attribute DOMString? detailedDescription;

        readonly attribute DOMString? language;

        readonly attribute DOMString? rating;
    };

};
```

## APIs
* {{Property Signature}}
{{Description}}
	* Examples
		1. {{Example_Desc_1}}
			```javascript
			{{Example_Code_1}}
			```

* {{Method Signature}}
provides global namespace named "toast" to provide APIs for TV application.
Every toast APIs will be appended to this namespace.
	* Parameters
	* Return value
	* Exceptions
		* {{Exception}}
			* if {{something wrong...}}
	* Examples
		1. {{description}}
			```javascript
			{{example_code}}
			```

## See others
toast.application
toast.drminfo
toast.inputdevice
toast.media
toast.tvaudiocontrol
toast.tvchannel
toast.tvwindow
