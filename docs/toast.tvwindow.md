# toast.tvwindow
toast.tvwindow privides something

## Supported platforms
* browser
* sectv-orsay
* sectv-tizen
    * Privilege `http://tizen.org/privilege/tv.window"/>` must be declared in the config.xml of tizen package.

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
                       optional ErrorCallback? errorCallback,
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

### void getAvailableWindows(WindowTypeArrayCallback successCallback, optional ErrorCallback? errorCallback);
This function retrieves information of the available windows.
* Parameters
    * successCallback: The method to call when a list of available windows are retrieved successfully.
    * errorCallback: The method to invoke when an error occurs.
* Return value
    N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws RangeError
        * if given value is not in the set or range of allowed values.
    * throws Error
        * if unknown error occured.
* Examples
    1. Getting available windows.
        ```javascript
        var i;
        toast.tvwindow.getAvailableWindows(function(windowType) {
            for (i = 0; i < windowType.length; i++) {
                console.log('windowType['+ i + ']:' + windowType[i]);
            }
        }, function(err) {
            console.log('err.code:' + err.code);
            console.log('err.name:' + err.name);
            console.log('err.message:' + err.message);
        });
        ```

### void setSource(VideoSourceInfo videoSource, VideoSourceChangedCallback successCallback, optional ErrorCallback? errorCallback, optional WindowType? type);
This function retrieves information of the available windows.
* Parameters
    * videoSource: 
    * successCallback: The method to call when a list of available windows are retrieved successfully.
    * errorCallback: The method to invoke when an error occurs.
    * type:
* Return value
    N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws RangeError
        * if given value is not in the set or range of allowed values.
    * throws Error
        * if unknown error occured.
* Examples
    1. Getting available windows.
        ```javascript
        var i;
        toast.tvwindow.getAvailableWindows(function(windowType) {
            for (i = 0; i < windowType.length; i++) {
                console.log('windowType['+ i + ']:' + windowType[i]);
            }
        }, function(err) {
            console.log('err.code:' + err.code);
            console.log('err.name:' + err.name);
            console.log('err.message:' + err.message);
        });
        ```

## See others
toast.tvwindow