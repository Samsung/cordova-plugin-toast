# toast
toast provides global namespace named "toast" to provide APIs for TV application.

## Supported platforms
* browser
* sectv-orsay
* sectv-tizen

## Full WebIDL
```widl
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
* Toast toast
provides global namespace named "toast" to provide APIs for TV application.
Every toast APIs will be appended to this namespace.
	* Examples
		1. accessing "toast" namespace
			```javascript
			document.addEventListener('deviceready', function () {
				console.log(toast);	// [object Object] will be printed.
			});
			```

## See others
toast.application
toast.drminfo
toast.inputdevice
toast.media
toast.tvaudiocontrol
toast.tvchannel
toast.tvwindow
