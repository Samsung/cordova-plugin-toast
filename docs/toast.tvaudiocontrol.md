# toast.tvaudiocontrol
toast.tvaudiocontrol provides audio control such as volume or mute.

## Supported platforms
* browser
* sectv-orsay
* sectv-tizen
    - Privilege `<tizen:privilege name="http://tizen.org/privilege/tv.audio"/>` must be declared in the config.xml of tizen package.

## Full WebIDL
```widl
module TVAudioControl {
    [NoInterfaceObject] interface TVAudioControlManager {
        readonly attribute TVAudioControlManager tvaudiocontrol;
    };
    Toast implements TVAudioControlManager;

    [NoInterfaceObject] interface TVAudioControlManager {
        void setMute(boolean mute, DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
        boolean isMute(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
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
* void setMute(boolean mute, DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
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
			```javascript
			var mute = true;
            toast.tvaudiocontrol.setMute(mute, function() {
            	console.log('Success');
            }, function(err) {
            	console.log('Error: ' + err.message);
            });
			```
			
* boolean isMute(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
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
			```javascript
            toast.tvaudiocontrol.isMute(function(value) {
                console.log('Success: ' + value);
            }, function(err) {
                console.log('Error: ' + err.message);
            });
			```
			
* void setVolume(unsigned short volume, DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
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
			```javascript
			var volume = 5;
            toast.tvaudiocontrol.setVolume(volume, function() {
                console.log('Success');
            }, function(err) {
                console.log('Error: ' + err.message);
            });
			```
			
* void setVolumeUp(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
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
			```javascript
            toast.tvaudiocontrol.setVolumeUp(function() {
                console.log('Success');
            }, function(err) {
                console.log('Error: ' + err.message);
            });
			```

* void setVolumeDown(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
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
			```javascript
            toast.tvaudiocontrol.setVolumeDown(function() {
                console.log('Success');
            }, function(err) {
                console.log('Error: ' + err.message);
            });
			```

* void getVolume(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
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
			```javascript
            toast.tvaudiocontrol.getVolume(function(value) {
                console.log('Success: ' + value);
            }, function(err) {
                console.log('Error: ' + err.message);
            });
			```
			
* void setVolumeChangeListener(VolumeChangeCallback callback, DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
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
			```javascript
			function onVolumeChanged(volume){
			    console.log('volume changes to ' + value);
			}
            toast.tvaudiocontrol.setVolumeChangeListener(onVolumeChanged, function() {
                console.log('Success');
            }, function(err) {
                console.log('Error: ' + err.message);
            });
			```

* void unsetVolumeChangeListener(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
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
			```javascript
            toast.tvaudiocontrol.unsetVolumeChangeListener(function() {
                console.log('Success');
            }, function(err) {
                console.log('Error: ' + err.message);
            });
			```

## See others
toast.application
toast.drminfo
toast.inputdevice
toast.media
toast.tvchannel
toast.tvwindow
