# Toast
Module Toast provides global namespace named "toast" to provide APIs for TV application.

## Supported platforms
* browser
* sectv-orsay
* sectv-tizen
* tv-webos

## Full WebIDL
```WebIDL
module Toast {
	[NoInterfaceObject] interface ToastObject {
		readonly attribute Toast toast;
	};
	Window implements ToastObject;

	[NoInterfaceObject] interface Toast {
	};
};
```

## APIs
### Toast `toast`
Toast provides global namespace named `toast` to provide APIs for TV application.
Every toast APIs will be appended to this namespace.
* Examples
	1. accessing "toast" namespace

		```js
		document.addEventListener('deviceready', function () {
			console.log(toast);	// [object Object] will be printed.
		});
		```

## See others
* [toast.application](toast.application.md)
* [toast.drminfo](toast.drminfo.md)
* [toast.inputdevice](toast.inputdevice.md)
* [toast.Media](toast.Media.md)
* [toast.tvaudiocontrol](toast.tvaudiocontrol.md)
* [toast.tvchannel](toast.tvchannel.md)
* [toast.tvwindow](toast.tvwindow.md)
