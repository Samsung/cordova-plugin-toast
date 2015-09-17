# toast.tvaudiocontrol
toast.tvaudiocontrol privides something

## Supported platforms
* browser
* sectv-orsay
* sectv-tizen

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
        void setVolumeChangeListener(DOMStringCallback callback, DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
        void unsetVolumeChangeListener(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
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
