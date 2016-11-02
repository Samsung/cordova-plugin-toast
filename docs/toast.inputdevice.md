# toast.inputdevice
toast.inputdevice privides TV's inputdevice related APIs.

## Supported platforms
* browser
* sectv-orsay (sectv-orsay)
* sectv-tizen (sectv-tizen)
    * Privilege `http://tizen.org/privilege/tv.inputdevice` must be declared in the config.xml of tizen package.
* tv-webos (tv-webos)

<table>
  <tr align="center">
    <td rowspan="2" style="">Method Name</td>
    <td rowspan="2" style="">Browser</td>
    <td colspan="2" style="">Legacy Samsung Smart TV</td>
    <td colspan="2" style="">Tizen Samsung Smart TV</td>
    <td colspan="2" style="">WebOS LG Smart TV</td>
    <td rowspan="2" style="">MEMO</td>
  </tr>
  <tr align="center"><td>Emulator (ver 5.1)</td><td>Device ('12 - '14)</td><td>Emulator (ver 2.3.1)</td><td>Device ('15 - '16)</td><td>Emulator (ver 3.0.0)</td><td>Device ('14 - '16)</td></tr>
  <tr align="center"><td>getSupportedKeys</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td></td></tr>
  <tr align="center"><td>getKey</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td></td></tr>
  <tr align="center"><td>registerKey</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td rowspan="2">This API is not supported on webos platform. It might not work as real operation. It is supported to avoid error on webos platform.
</td>
</tr>
  <tr align="center"><td>unregisterKey</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td>
</tr>
 </table>

## Full WebIDL
```widl
module InputDevice {
    typedef DOMString InputDeviceKeyName;

    [NoInterfaceObject] interface InputDeviceManagerObject {
        readonly attribute InputDeviceManager inputdevice;
    };
    Toast implements InputDeviceManagerObject;

    [NoInterfaceObject] interface InputDeviceKey {
        readonly attribute InputDeviceKeyName name;
        readonly attribute long code;
    };

    [NoInterfaceObject] interface InputDeviceManager {
        void getSupportedKeys(InputDeviceKeyArrayCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
        void getKey(InputDeviceKeyName keyName, InputDeviceKeyCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
        void registerKey(InputDeviceKeyName keyName, DOMStringCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
        void unregisterKey(InputDeviceKeyName keyName, DOMStringCallback successCallback, optional ErrorCallback? errorCallback) raises(Error);
    };

    [Callback=FunctionOnly, NoInterfaceObject] interface InputDeviceKeyArrayCallback {
        void onsuccess(InputDeviceKey[] keys);
    };

    [Callback=FunctionOnly, NoInterfaceObject] interface InputDeviceKeyCallback {
        void onsuccess(InputDeviceKey key);
    };
};
```

## Supported Keys by platform
Supported Keys are different by each platforms.

:star: Yes*: supported, but callling `registerKey` with the `keyName` is needed.

| keyName            | browser (keyboard) | sectv-orsay | sectv-tizen | tv-webos |
|--------------------|--------------------|-------------|-------------|----------|
| ArrowUp            | Yes                | Yes         | Yes         | Yes      |
| ArrowDown          | Yes                | Yes         | Yes         | Yes      |
| ArrowLeft          | Yes                | Yes         | Yes         | Yes      |
| ArrowRight         | Yes                | Yes         | Yes         | Yes      |
| Enter              | Yes                | Yes         | Yes         | Yes      |
| Return             | Yes (ESC)          | Yes         | Yes         | Yes      |
| ColorF0Red         | Yes (F1)           | Yes*        | Yes*        | Yes      |
| ColorF1Green       | Yes (F2)           | Yes*        | Yes*        | Yes      |
| ColorF2Yellow      | Yes (F3)           | Yes*        | Yes*        | Yes      |
| ColorF3Blue        | Yes (F4)           | Yes*        | Yes*        | Yes      |
| MediaRecord        | Yes (F5)           | Yes*        | Yes*        | No       |
| MediaPlayPause     | Yes (F6)           | No          | Yes*        | No       |
| MediaStop          | Yes (F7)           | Yes*        | Yes*        | Yes      |
| MediaFastForward   | Yes (F8)           | Yes*        | Yes*        | Yes      |
| MediaPlay          | Yes (F9)           | Yes*        | Yes*        | Yes      |
| MediaPause         | Yes (F10)          | Yes*        | Yes*        | Yes      |
| MediaRewind        | Yes (F11)          | Yes*        | Yes*        | Yes      |
| Tools              | Yes (Context)      | Yes*        | Yes*        | No       |
| 0                  | Yes (0)            | Yes*        | Yes*        | Yes      |
| 1                  | Yes (1)            | Yes*        | Yes*        | Yes      |
| 2                  | Yes (2)            | Yes*        | Yes*        | Yes      |
| 3                  | Yes (3)            | Yes*        | Yes*        | Yes      |
| 4                  | Yes (4)            | Yes*        | Yes*        | Yes      |
| 5                  | Yes (5)            | Yes*        | Yes*        | Yes      |
| 6                  | Yes (6)            | Yes*        | Yes*        | Yes      |
| 7                  | Yes (7)            | Yes*        | Yes*        | Yes      |
| 8                  | Yes (8)            | Yes*        | Yes*        | Yes      |
| 9                  | Yes (9)            | Yes*        | Yes*        | Yes      |
| ChannelUp          | Yes (+)            | Yes*        | Yes*        | No       |
| ChannelDown        | Yes (-)            | Yes*        | Yes*        | No       |
* Please refer to the result of `getSupportedKeys` method for more keys' information.
* We recommend to use below d-pad keys for better user experience for TV device:
    `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Enter` and `Return`
* keyCode of each keys could be different by platforms. So, we recommend to generate `tvKeyCode` collection like below:

```js
var tvKeyCode = {};
device.addEventListener('deviceready', function () {
    toast.inputdevice.getSupportedKeys(function (keys) {
        for(var i=0, len=keys.length; i<len; i++) {
            tvKeyCode[keys[i].name] = keys[i].code;
        }
    });
    window.addEventListener('keydown', function (e) {
        switch(e.keyCode) {
            case tvKeyCode.Enter:
                // handle Enter key
                break;
            case tvKeyCode.ArrowLeft:
                // handle Enter key
                break;
        }
    });
});
```

## APIs

### void getSupportedKeys(InputDeviceKeyArrayCallback successCallback, optional ErrorCallback? errorCallback);
This function retrieves supported keys list of the running platform.
* Parameters
    * successCallback: The method to call when a list of supported keys are retrieved successfully.
    * errorCallback: The method to invoke when an error occurs.
* Return value
    N/A
* Exceptions
    * throws TypeError
        * if type of any parameters is not matched to specification.
    * throws Error
        * if unknown error occured.
* Examples
    1. Getting supported keys and register RED button if it is supported.

        ```js
        var i, keyCode = {};
        toast.inputdevice.getSupportedKeys(function (supportedKeys) {
            for (i = 0; i < supportedKeys.length; i++) {
                keyCode[supportedKeys[i].name] = supportedKeys[i].code;
            }
            if(keyCode.hasOwnProperty("ColorF0Red")) {
                toast.inputdevice.registerKey("ColorF0Red", function () {});
            }
        });
        window.addEventListener("keydown", function(keyEvent) {
            if(keyEvent.keyCode === keyCode.ColorF0Red) {
                console.log("The RED was pressed");
            }
        });
        ```

### void getKey(InputDeviceKeyName keyName, InputDeviceKeyCallback successCallback, optional ErrorCallback? errorCallback);
This function retrieves information of the given keyName.
* Parameters
    * keyName: Name of key to retrieve.
    * successCallback: The method to call when a list of supported keys are retrieved successfully.
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
    1. Getting key code of RED button.

        ```js
        toast.inputdevice.getKey("ColorF0Red", function (key) {
            console.log("RED button code: " + key.code);
        }, function(err){
            console.log("Error : " + err.message);
        });
        ```

### void registerKey(InputDeviceKeyName keyName, DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
This function registers given key. After this operation, pressing the key on remote controller will fire key events with correspond keyCode.
* Parameters
    * keyName: Name of key to register.
    * successCallback: The method to call when a list of supported keys are retrieved successfully.
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
    1. Register the RED button.
        
        ```js
        toast.inputdevice.registerKey("ColorF0Red", function () {
            console.log("Success");
        },function(err){
            console.log("Error : " + err.message);
        });
        ```

### void unregisterKey(InputDeviceKeyName keyName, DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
This function unregisters given key. The key can not be handled with key event after this operation.
* Parameters
    * keyName: Name of key to unregister.
    * successCallback: The method to call when a list of supported keys are retrieved successfully.
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
    1. UnRegister the RED button.
        
        ```js
        toast.inputdevice.unregisterKey("ColorF0Red", function () {
            console.log("Success");
        },function(err){
            console.log("Error : " + err.message);
        });
        ```

## See others
None
