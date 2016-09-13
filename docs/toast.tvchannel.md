# toast.tvchannel
toast.tvchannel provides to control tv channel.

## Supported platforms
* browser
* sectv-orsay (sectv-orsay)
* sectv-tizen (sectv-tizen)
    - Privilege `<tizen:privilege name="http://tizen.org/privilege/tv.channel"/>` must be declared in the config.xml of tizen package.

<table>
  <tr align="center">
    <td rowspan="2" style="">Method Name</td>
    <td rowspan="2" style="">Browser</td>
    <td colspan="2" style="">Legacy Samsung Smart TV</td>
    <td colspan="2" style="">Tizen Samsung Smart TV</td>
    <td colspan="2" style="">WebOS LG Smart TV</td>
  </tr>
  <tr align="center"><td>Emulator (ver 5.1)</td><td>Device ('12 - '14)</td><td>Emulator (ver 2.3.1)</td><td>Device ('15 - '16)</td><td>Emulator (ver 3.0.0)</td><td>Device ('14 - '16)</td></tr>
  <tr align="center"><td>tune</td><td>O</td><td>X</td><td>O</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>tuneUp</td><td>O</td><td>X</td><td>O</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>tuneDown</td><td>O</td><td>X</td><td>O</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>findChannel</td><td>O</td><td>X</td><td>O</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>getChannelList</td><td>O</td><td>X</td><td>O</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>getCurrentChannel</td><td>O</td><td>X</td><td>O</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>getProgramList</td><td>O</td><td>X</td><td>O</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>getCurrentProgram</td><td>O</td><td>X</td><td>O</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>addChannelChangeListener</td><td>O</td><td>X</td><td>O</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>removeChannelChangeListener</td><td>O</td><td>X</td><td>O</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
 </table>

## Full WebIDL
```WebIDL
module TVChannel {
    enum TuneMode {
        'ALL',
        'DIGITAL',
        'ANALOG',
        'FAVORITE'
    };

    [NoInterfaceObject] interface TVChannelManager {
        readonly attribute TVChannelManager tvchannel;
    };
    Toast implements TVChannelManager;

    [NoInterfaceObject] interface TVChannelManager {

        void tune(TuneOption tuneOption, TuneCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
        void tuneUp(TuneCallback successCallback, optional ErrorCallback? errorCallback, optional TuneMode? tuneMode) raises(Error);
        void tuneDown(TuneCallback successCallback, optional ErrorCallback? errorCallback, optional TuneMode? tuneMode) raises(Error);
        void findChannel(long major, long minor, ChannelInfoListCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
        void getChannelList(ChannelInfoListCallback successCallback, optional ErrorCallback? errorCallback, optional TuneMode? tuneMode, optional unsigned long? nStart, optional unsigned long? number) raises(Error);
        void getCurrentChannel(ChannelInfoCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
        void getProgramList(ChannelInfo channelInfo, Date startTime, ProgramInfoListCallback successCallback, optional ErrorCallback? errorCallback, optional unsigned long? duration) raises(Error);
        void getCurrentProgram(ProgramInfoCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
        void addChannelChangeListener(ChannelInfoCallback callback) raises(Error);
        void removeChannelChangeListener(ChannelInfoCallback callback) raises(Error);
    };

    dictionary TuneOption {
        long major;
        long minor;
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

    [NoInterfaceObject] interface TuneCallback {
        void onsuccess(ChannelInfo channel);
        void onnosignal();
        void onprograminforeceived(ProgramInfo program);
    };

    [Callback = FunctionOnly, NoInterfaceObject] interface ChannelInfoCallback {
        void onsuccess(ChannelInfo channelInfo);
    };

    [Callback = FunctionOnly, NoInterfaceObject] interface ChannelInfoListCallback {
        void onsuccess(ChannelInfo[] channelInfo);
    };

    [Callback = FunctionOnly, NoInterfaceObject] interface ProgramInfoCallback {
        void onsuccess(ProgramInfo programInfo);
    };

    [Callback = FunctionOnly, NoInterfaceObject] interface ProgramInfoListCallback {
        void onsuccess(ProgramInfo[] programInfo);
    };
};
```

## APIs
### void tune(TuneOption tuneOption, TuneCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
This method tunes the channel of TV.
* Parameters
    - tuneOption: The tune option to set.
    - successCallback: The method to call when the channel are changed successfully.
    - errorCallback: The method to invoke when an error occurs.
* Return value
    N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Tuning a channel.

        ```js
        toast.tvchannel.tune({
            major: 7,
            minor: 1
        },{
            onsuccess: function(channelInfo) {
                console.log('OnSuccess: ' + JSON.stringify(channelInfo));
            },
            onnosignal: function() {
                console.log('OnNoSignal');
            },
            onprograminforeceived: function(programInfo) {
                console.log('OnProgramInfoReceived: ' + JSON.stringify(programInfo));
            }
        }, function(err) {
            console.log('Error: ' + JSON.stringify(err));
        });
        ```

### void tuneUp(TuneCallback successCallback, optional ErrorCallback? errorCallback, optional TuneMode? tuneMode) raises(Error);
This method tunes up the channel of TV.
* Parameters
    - successCallback: The method to call when the channel is tuned up successfully.
    - errorCallback: The method to invoke when an error occurs.
    - tuneMode: The tuning navigation mode. Default value is 'ALL'.
* Return value
    N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Tuning up a channel.

        ```js
        toast.tvchannel.tuneUp({
            onsuccess: function(channelInfo) {
                console.log('OnSuccess: ' + JSON.stringify(channelInfo));
            },
            onnosignal: function() {
                console.log('OnNoSignal');
            },
            onprograminforeceived: function(programInfo) {
                console.log('OnProgramInfoReceived: ' + JSON.stringify(programInfo));
            }
        }, function(err) {
            console.log('Error: ' + JSON.stringify(err));
        });
        ```

### void tuneDown(TuneCallback successCallback, optional ErrorCallback? errorCallback, optional TuneMode? tuneMode) raises(Error);
This method tunes down the channel of TV.
* Parameters
    - successCallback: The method to call when the channel is tuned down successfully.
    - errorCallback: The method to invoke when an error occurs.
    - tuneMode: The tuning navigation mode. Default value is 'ALL'.
* Return value
    N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Tuning down a channel.

        ```js
        toast.tvchannel.tuneDown({
            onsuccess: function(channelInfo) {
                console.log('OnSuccess: ' + JSON.stringify(channelInfo));
            },
            onnosignal: function() {
                console.log('OnNoSignal');
            },
            onprograminforeceived: function(programInfo) {
                console.log('OnProgramInfoReceived: ' + JSON.stringify(programInfo));
            }
        }, function(err) {
            console.log('Error: ' + JSON.stringify(err));
        });
        ```

### void findChannel(long major, long minor, ChannelInfoListCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
This method finds a channel.
* Parameters
    - major: The major of channel to be found.
    - minor: The minor of channel to be found.
    - successCallback: The method to call when the channel is retrieved successfully.
    - errorCallback: The method to invoke when an error occurs.
* Return value
    N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Finding a channel.

        ```js
        toast.tvchannel.findChannel(7, 1, function(channelInfoList) {
            console.log('Success: ' + JSON.stringify(channelInfoList));
        }, function(err) {
            console.log('Error: ' + JSON.stringify(err));
        });
        ```

### void getChannelList(ChannelInfoListCallback successCallback, optional ErrorCallback? errorCallback, optional TuneMode? tuneMode, optional unsigned long? nStart, optional unsigned long? number) raises(Error);
This method finds a channel.
* Parameters
    - successCallback: The method to call when the channel is retrieved successfully.
    - errorCallback: The method to invoke when an error occurs.
    - tuneMode: The tuning navigation mode. Default value is 'ALL'.
    - nStart: The start index. Default value is 0.
    - number: The number of channel information to retrieve. If it is undefind, all channel information is retrieved.
* Return value
    N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Getting a channel.

        ```js
        toast.tvchannel.getChannelList(function(channelInfoList) {
            console.log('Success: ' + JSON.stringify(channelInfoList));
        }, function(err) {
            console.log('Error: ' + JSON.stringify(err));
        }, 'ALL', 0, 10);
        ```

### void getCurrentChannel(ChannelInfoCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
This method gets a current channel.
* Parameters
    - successCallback: The method to call when a current channel is retrieved successfully.
    - errorCallback: The method to invoke when an error occurs.
* Return value
    N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Getting a current channel.

        ```js
        toast.tvchannel.getCurrentChannel(function(channelInfo) {
            console.log('Success: ' + JSON.stringify(channelInfo));
        }, function(err) {
            console.log('Error: ' + JSON.stringify(err));
        });
        ```

### void getProgramList(ChannelInfo channelInfo, Date startTime, ProgramInfoListCallback successCallback, optional ErrorCallback? errorCallback, optional unsigned long? duration) raises(Error);
This method gets a program list.
* Parameters
    - channelInfo: The channel to be retrieved.
    - startTime: The start time.
    - successCallback: The method to call when a current channel is retrieved successfully.
    - errorCallback: The method to invoke when an error occurs.
    - duration: The hour duration to search programs. If it is undefind, all program information are retrieved.
* Return value
    N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Getting a current channel.

        ```js
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
        }, new Date(), function(programInfoList) {
            report('Success: ' + JSON.stringify(programInfoList));
        }, function(err) {
            report('Error: ' + JSON.stringify(err));
        }, 3);
        ```

### void getCurrentProgram(ProgramInfoCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
This method gets a current program.
* Parameters
    - successCallback: The method to call when a current program is retrieved successfully.
    - errorCallback: The method to invoke when an error occurs.
* Return value
    N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Getting a current program.

        ```js
        toast.tvchannel.getCurrentProgram(function(programInfo) {
            console.log('Success: ' + JSON.stringify(programInfo));
        }, function(err) {
            console.log('Error: ' + JSON.stringify(err));
        });
        ```

### void addChannelChangeListener(ChannelInfoCallback callback) raises(Error);
This method adds listener for changing a channel.
* Parameters
    - callback: The method to call when a channel is changed.
* Return value
    N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Getting a current program.

        ```js
        var testFunc = function(channelInfo) {
            console.log('testFunc is called: ' + JSON.stringify(channelInfo));
        };
        toast.tvchannel.addChannelChangeListener(testFunc);
        ```

### void removeChannelChangeListener(ChannelInfoCallback callback) raises(Error);
This method removes listener for changing a channel.
* Parameters
    - callback: The method is added by addChannelChangeListener.
* Return value
    N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Getting a current program.

        ```js
        var testFunc = function(channelInfo) {
            console.log('testFunc is called: ' + JSON.stringify(channelInfo));
        };
        toast.tvchannel.addChannelChangeListener(testFunc);
        toast.tvchannel.removeChannelChangeListener(testFunc);
        ```

## See others
[toast.tvwindow](toast.tvwindow.md)
