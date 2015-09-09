# toast.inputdevice
toast.inputdevice privides TV's inputdevice related APIs.

## Supported platforms
* browser
* sectv-orsay
* sectv-tizen
	* Privilege `http://tizen.org/privilege/tv.inputdevice` must be declared in the config.xml of tizen package.

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
        void registerKey(InputDeviceKeyName keyName) raises(Error);
        void unregisterKey(InputDeviceKeyName keyName) raises(Error);
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

| keyName            | browser (keyboard) | sectv-orsay | sectv-tizen |
|--------------------|--------------------|-------------|-------------|
| UpArrow            | Yes                | Yes         | Yes         |
| DownArrow          | Yes                | Yes         | Yes         |
| LeftArrow          | Yes                | Yes         | Yes         |
| RightArrow         | Yes                | Yes         | Yes         |
| Enter              | Yes                | Yes         | Yes         |
| Return             | Yes (ESC)          | Yes         | Yes         |
| ColorF0Red         | Yes* (F1)          | Yes*        | Yes*        |
| ColorF1Green       | Yes* (F2)          | Yes*        | Yes*        |
| ColorF2Yellow      | Yes* (F3)          | Yes*        | Yes*        |
| ColorF3Blue        | Yes* (F4)          | Yes*        | Yes*        |
| MediaRecord        | Yes* (F5)          | Yes*        | Yes*        |
| MediaPlayPause     | Yes* (F7)          | No          | Yes*        |
| MediaStop          | Yes* (F8)          | Yes*        | Yes*        |
| MediaFastForward   | Yes* (F9)          | Yes*        | Yes*        |
| MediaPlay          | Yes* (F10)         | Yes*        | Yes*        |
| MediaPause         | Yes* (F11)         | Yes*        | Yes*        |
| MediaRewind        | Yes* (F12)         | Yes*        | Yes*        |
| Tools              | Yes* (Context)     | Yes*        | Yes*        |
(Yes*: supported, but callling `registerKey` with the `keyName` is needed.)
* Please refer to the result of `getSupportedKeys` method for more detail.
* We recommend to use below d-pad keys for better user experience for TV device:
	`UpArrow`, `DownArrow`, `LeftArrow`, `RightArrow`, `Enter` and `Return`
* keyCode of each keys could be different by platforms. So, we recommend to generate `tvKeyCode` collection like below:
```javascript
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
			case tvKeyCode.LeftArrow:
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
		```javascript
		var i, keyCode = {};
		toast.inputdevice.getSupportedKeys(function (supportedKeys) {
			for (i = 0; i < supportedKeys.length; i++) {
				keyCode[supportedKeys[i].name] = supportedKeys[i].code;
			}
			if(keyCode.hasOwnProperty("ColorF0Red")) {
				tizen.inputdevice.registerKey("ColorF0Red");
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
	1. 
		```javascript
		{{example_code}}
		```

### void registerKey(InputDeviceKeyName keyName);
This function registers given key. After this operation, pressing the key on remote controller will fire key events with correspond keyCode.
* Parameters
	* keyName: Name of key to register.
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
	1. 
		```javascript
		{{example_code}}
		```

### void unregisterKey(InputDeviceKeyName keyName);
This function unregisters given key. The key can not be handled with key event after this operation.
* Parameters
	* keyName: Name of key to unregister.
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
	1. 
		```javascript
		{{example_code}}
		```

## See others
