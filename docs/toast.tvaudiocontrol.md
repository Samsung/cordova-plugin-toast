# toast.tvaudiocontrol
toast.tvaudiocontrol provides audio control such as volume or mute.

## Supported platforms
* browser
* sectv-orsay (sectv-orsay)
* sectv-tizen (sectv-tizen)
    - Privilege `<tizen:privilege name="http://tizen.org/privilege/tv.audio"/>` must be declared in the config.xml of tizen package.
* tv-webos (tv-webos)

<table>
  <tr align="center">
    <td rowspan="2" style="">Method Name</td>
    <td rowspan="2" style="">Browser</td>
    <td colspan="2" style="">Legacy Samsung Smart TV</td>
    <td colspan="2" style="">Tizen Samsung Smart TV</td>
    <td colspan="2" style="">WebOS LG Smart TV</td>
  </tr>
  <tr align="center"><td>Emulator (ver 5.1)</td><td>Device ('12 - '14)</td><td>Emulator (ver 2.3.1)</td><td>Device ('15 - '16)</td><td>Emulator (ver 3.0.0)</td><td>Device ('14 - '16)</td></tr>
  <tr align="center"><td>setMute</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>isMute</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>setVolume</td><td>O</td><td>X</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>setVolumeUp</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>setVolumeDown</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>getVolume</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>setVolumeChangeListener</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>unsetVulumeChangeListener</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
 </table>

## Full WebIDL
```WebIDL
module TVAudioControl {
    [NoInterfaceObject] interface TVAudioControlManagerObject {
        readonly attribute TVAudioControlManagerObject tvaudiocontrol;
    };
    Toast implements TVAudioControlManagerObject;

    [NoInterfaceObject] interface TVAudioControlManager {
        void setMute(boolean mute, DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
        void isMute(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
        void setVolume(unsigned short volume, DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
        void setVolumeUp(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
        void setVolumeDown(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
        void getVolume(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
        void setVolumeChangeListener(VolumeChangeCallback callback, DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
        void unsetVolumeChangeListener(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
    };
};

    [Callback = FunctionOnly, NoInterfaceObject] interface VolumeChangeCallback {
        void onchanged(unsigned short volume);
    };
```

## APIs
### void setMute(boolean mute, DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
This method sets to turn on or off mute mode. If changing the volume using setVolumeUp or setVolumeDown then mute is disabled automatically.
Speaker UI might not be shown according to platform.
* Parameters
    - mute : State of mute mode. (true/false)
    - successCallback : The method to call when the mute state is set successfully.
    - errorCallback : The method to invoke when an error occurs.
* Return value
    - N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Setting mute state to true.

        ```js
        var mute = true;
        toast.tvaudiocontrol.setMute(mute, function() {
            console.log('Success');
        }, function(err) {
            console.log('Error: ' + err.message);
        });
        ```

### void isMute(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
This method gets mute state.
* Parameters
    - successCallback : The method to call when the state of mute got successfully.
    - errorCallback : The method to invoke when an error occurs.
* Return value
    - N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Getting mute state.

        ```js
        toast.tvaudiocontrol.isMute(function(value) {
            console.log('Success: ' + value);
        }, function(err) {
            console.log('Error: ' + err.message);
        });
        ```

### void setVolume(unsigned short volume, DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
This method changes the volume level. The value of volume is allowed from 0 to 100.
* Parameters
    - volume : Volume level to set. (The available range is 0~100)
    - successCallback : The method to call when the volume is changed successfully.
    - errorCallback : The method to invoke when an error occurs.
* Return value
    - N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Changing the volume level to 5.

        ```js
        var volume = 5;
        toast.tvaudiocontrol.setVolume(volume, function() {
            console.log('Success');
        }, function(err) {
            console.log('Error: ' + err.message);
        });
        ```

### void setVolumeUp(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
This method increases the volume 1 level. The maximum volume level is 100. If the current volume is above 100 level, it would be ignored.
* Parameters
    - successCallback : The method to call when the volume increases 1 level successfully.
    - errorCallback : The method to invoke when an error occurs.
* Return value
    - N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Increasing the volume 1 level.

        ```js
        toast.tvaudiocontrol.setVolumeUp(function() {
            console.log('Success');
        }, function(err) {
            console.log('Error: ' + err.message);
        });
        ```

### void setVolumeDown(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
This method decreases the volume 1 level. The minimum volume level is 0. If the current volume is under 0 level, it would be ignored.
* Parameters
    - successCallback : The method to call when the volume decreases 1 level successfully.
    - errorCallback : The method to invoke when an error occurs.
* Return value
    - N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Decreasing the volume 1 level.

        ```js
        toast.tvaudiocontrol.setVolumeDown(function() {
            console.log('Success');
        }, function(err) {
            console.log('Error: ' + err.message);
        });
        ```

### void getVolume(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
This method gets the value of current volume.
* Parameters
    - successCallback : The method to call when the value of current volume got successfully.
    - errorCallback : The method to invoke when an error occurs.
* Return value
    - N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Getting the value of current volume.

        ```js
        toast.tvaudiocontrol.getVolume(function(value) {
            console.log('Success: ' + value);
        }, function(err) {
            console.log('Error: ' + err.message);
        });
        ```

### void setVolumeChangeListener(VolumeChangeCallback callback, DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
The method registers a volume change callback for getting notified when TV volume has been changed.
* Parameters
    - callback : The method to invoke when the volume has been changed.
    - successCallback : The method to call when the volume change callback is registered successfully.
    - errorCallback : The method to invoke when an error occurs.
* Return value
    - N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. When the volume has been changed, onVolumeChanged would be invoked.

        ```js
        function onVolumeChanged(volume){
            console.log('volume changes to ' + volume);
        }
        toast.tvaudiocontrol.setVolumeChangeListener(onVolumeChanged, function() {
            console.log('Success');
        }, function(err) {
            console.log('Error: ' + err.message);
        });
        ```

### void unsetVolumeChangeListener(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
The method unregisters a volume change callback.
* Parameters
    - successCallback : The method to call when the volume change callback is unregistered successfully.
    - errorCallback : The method to invoke when an error occurs.
* Return value
    - N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. unregister volume change callback.

        ```js
        toast.tvaudiocontrol.unsetVolumeChangeListener(function() {
            console.log('Success');
        }, function(err) {
            console.log('Error: ' + err.message);
        });
        ```

## See others
None
