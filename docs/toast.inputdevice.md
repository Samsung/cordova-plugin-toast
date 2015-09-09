# toast.tvdevice
toast.tvdevice privides something

## Supported platforms
* browser
* sectv-orsay
* sectv-tizen

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
* keyCode of each keys could be different by platforms. So, we recommend to generate collection like below:
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
