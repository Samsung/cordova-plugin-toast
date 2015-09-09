# toast.application
toast.application privides something

## Supported platforms
* browser
* sectv-orsay
* sectv-tizen

## Full WebIDL
```widl
module Application {
    [NoInterfaceObject] interface ApplicationManager {
        readonly attribute ApplicationManager tvchannel;
    };
    Toast implements ApplicationManager;

    [NoInterfaceObject] interface ApplicationManager {
        void exit();
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
