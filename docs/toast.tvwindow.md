# toast.tvwindow
toast.tvwindow privides picture in graphic on application.

## Supported platforms
* browser
* sectv-orsay
* sectv-tizen
    - Privilege `http://tizen.org/privilege/tv.window"/>` must be declared in the config.xml of tizen package.

## Full WebIDL
```WebIDL
module TVWindow {
    enum VideoSourceType {
        "TV",
        "AV",
        "SVIDEO",
        "COMP",
        "PC",
        "HDMI",
        "SCART",
        "DVI"
    };

    [NoInterfaceObject] interface TVWindowManagerObject {
        readonly attribute TVWindowManager tvwindow;
    };
    Toast implements TVWindowManagerObject;

    [NoInterfaceObject] interface TVWindowManager {
        void setSource(VideoSourceInfo videoSource, VideoSourceInfoCallback successCallback, optional ErrorCallback? errorCallback) raises (Error);
        void getSource(VideoSourceInfoCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
        void show(unsigned long[] rectangle, RectangleInfoCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
        void hide(SuccessCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
        void getRect(RectangleInfoCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
    };

    [NoInterfaceObject] interface VideoSourceInfo {
        readonly attribute VideoSourceType type;
        readonly attribute long number;
    };

    [Callback = FunctionOnly, NoInterfaceObject] interface VideoSourceInfoCallback {
        void onsuccess(VideoSourceInfo sourceInfo);
    };

    [Callback = FunctionOnly, NoInterfaceObject] interface RectangleInfoCallback {
        void onsuccess(unsigned long[] rectInfo);
    };
};
```

## APIs
* void setSource(VideoSourceInfo videoSource, VideoSourceInfoCallback successCallback, optional ErrorCallback? errorCallback);
This method sets the source of TV hole window.
    * Parameters
        - videoSource: The video source to set.
        - successCallback: The method to call when the source is changed successfully.
        - errorCallback: The method to invoke when an error occurs.
    * Return value
        N/A
    * Exceptions
        * throws TypeError
            * if type of any parameters is not matched to specification.
        * throws Error
            * if unknown error occured.
    * Examples
        1. Setting to a source.
            ```javascript
            toast.tvwindow.setSource({
                type: 'TV',
                number: 1
            }, function(sourceInfo) {
                console.log('Success: ' + JSON.stringify(sourceInfo));
            }, function(err) {
                console.log('Error: ' + JSON.stringify(err));
            });
            ```

* void getSource(VideoSourceInfoCallback successCallback, optional ErrorCallback? errorCallback);
This function gets information about the current source of TV hole window.
    * Parameters
        - successCallback: The method to call when the source is retrieved successfully.
        - errorCallback: The method to invoke when an error occurs.
    * Return value
        N/A
    * Exceptions
        * throws TypeError
            * if type of any parameters is not matched to specification.
        * throws Error
            * if unknown error occured.
    * Examples
        1. Getting the source.
            ```javascript
            toast.tvwindow.getSource(function(sourceInfo) {
                console.log('Success: ' + JSON.stringify(sourceInfo));
            }, function(err) {
                console.log('Error: ' + JSON.stringify(err));
            });
            ```

* void show(unsigned long[] rectangle, RectangleInfoCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
This function shows TV hole window on display screen.
    * Parameters
        - rectangle: The location and size of TV window hole.
            - First Element: The x coordinate of TV hole window on display screen.
            - Second Element: The y coordinate of TV hole window on display screen.
            - Third Element: The width of TV hole window.
            - Fourth Element: The width of TV hole window.
        - successCallback: The method to call when TV window hole is shown successfully.
        - errorCallback: The method to invoke when an error occurs.
    * Return value
        N/A
    * Exceptions
        * throws TypeError
            * if type of any parameters is not matched to specification.
        * throws Error
            * if unknown error occured.
    * Examples
        1. Showing TV window hole.
            ```javascript
            toast.tvwindow.show([100, 100, 320, 180], function(rectInfo) {
                console.log('Success: ' + JSON.stringify(rectInfo));
            }, function(err) {
                console.log('Error: ' + JSON.stringify(err));
            });
            ```

* void hide(SuccessCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
This function hides TV hole window on display screen.
    * Parameters
        - successCallback: The method to call when TV window hole is hidden successfully.
        - errorCallback: The method to invoke when an error occurs.
    * Return value
        N/A
    * Exceptions
        * throws TypeError
            * if type of any parameters is not matched to specification.
        * throws Error
            * if unknown error occured.
    * Examples
        1. Hiding TV window hole.
            ```javascript
            toast.tvwindow.hide(function() {
                console.log('Success');
            }, function(err) {
                console.log('Error: ' + JSON.stringify(err));
            });
            ```

* void getRect(RectangleInfoCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
This function gets the location and size of TV window hole.
    * Parameters
        - successCallback: The method to call when the location and size of TV window hole are retrieved successfully.
        - errorCallback: The method to invoke when an error occurs.
    * Return value
        N/A
    * Exceptions
        * throws TypeError
            * if type of any parameters is not matched to specification.
        * throws Error
            * if unknown error occured.
    * Examples
        1. Getting the location and size of TV window hole.
            ```javascript
            toast.tvwindow.getRect(function(rectInfo) {
                console.log('Success: ' + JSON.stringify(rectInfo));
            }, function(err) {
                console.log('Error: ' + JSON.stringify(err));
            });
            ```

## See others
toast.application
toast.drminfo
toast.inputdevice
toast.media
toast.tvaudiocontrol
toast.tvchannel
