# {{Namespace}}
{{Namespace}} privides something

## Supported platforms
* browser
* sectv-orsay
* sectv-tizen

## Full WebIDL
```widl
module TVWindow {
    enum WindowType {
        "MAIN",
    };

    enum MeasurementUnit {
        "px"
    };

    enum VideoSourceType {
        "TV",
        "AV",
        "SVIDEO",
        "COMP",
        "PC",
        "HDMI",
        "SCART",
        "DVI",
        "MEDIA"
    };

    [NoInterfaceObject] interface TVWindowManagerObject {
        readonly attribute TVWindowManager tvwindow;
    };
    Toast implements TVWindowManagerObject;

    [NoInterfaceObject] interface TVWindowManager {
        void getAvailableWindows(WindowTypeArrayCallback successCallback,
                       optional ErrorCallback? errorCallback) raises(Error);

        void setSource(VideoSourceInfo videoSource,
                       VideoSourceChangedCallback successCallback,
                       optional ErrorCallback? errorCallback,
                       optional WindowType? type) raises (Error);

        void getSource(VideoSourceInfoCallback successCallback,
                       ErrorCallback errorCallback,
                       optional WindowType? type) raises(Error);

        void show(WindowRectangleCallback successCallback,
                 optional ErrorCallback? errorCallback,
                 optional DOMString[]? rectangle,
                 optional WindowType? type) raises(Error);

        void hide(SuccessCallback successCallback,
                  optional ErrorCallback? errorCallback,
                  optional WindowType? type) raises(Error);

        void getRect(WindowRectangleSuccessCallback successCallback,
                 optional ErrorCallback? errorCallback,
                 optional MeasurementUnit? unit,
                 optional WindowType? type) raises(Error);

    };

    [NoInterfaceObject] interface VideoSourceInfo {
        readonly attribute VideoSourceType type;
        readonly attribute long number;
    };

    callback WindowTypeArrayCallback = void (WindowType[] type);

    callback WindowRectangleCallback = void (DOMString[] windowRect, WindowType type);

    callback VideoSourceInfoCallback = void (VideoSourceInfo source);

    callback VideoSourceChangedCallback = void (VideoSourceInfo source, WindowType type);

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
