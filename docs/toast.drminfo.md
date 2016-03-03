# toast.drminfo
toast.drminfo provides DRM information.

## Supported platforms
* browser
* sectv-orsay
* sectv-tizen
    - Privilege `<tizen:privilege name="http://developer.samsung.com/privilege/drminfo"/>` must be declared in the config.xml of tizen package. Please note that drminfo API is required privilege of partner level.

## Full WebIDL
```WebIDL
module DRMInfo {
    [NoInterfaceObject] interface DRMInfoManagerObject {
        readonly attribute DRMInfoManagerObject drminfo;
    };
    Toast implements DRMInfoManagerObject;

    [NoInterfaceObject] interface DRMInfoManager {
        void getEsn(DOMString component, DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
        void getSdi(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
    };

    callback DOMStringCallback = void (DOMString str);
};
```

## APIs
* void getEsn(DOMString component, DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
This method gets the ESN data of given component name.
	* Parameters
        - component : Name of component (ex. WIDEVINE)
        - successCallback : The method to call when a value of ESN got successfully.
        - errorCallback : The method to invoke when an error occurs.
	* Return value
	    - N/A
	* Exceptions
		* throws TypeError
		    * if type of any parameters is not matched to specification.
		* throws Error
		    * if unknown error occured.
	* Examples
		1. Getting ESN of 'WIDEVINE'.

			```js
			toast.drminfo.getEsn('WIDEVINE', function(value) {
	            console.log('Success: ' + value);
            }, function(err) {
	            console.log('Error: ' + err.message);
            });
			```
			
* void getSdi(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
This method gets the SDI(Samsung Device Identifier). SDI is used by a few CPs to distinguish devices instead of DUID.
	* Parameters
        - successCallback : The method to call when a value of SDI got successfully.
        - errorCallback : The method to invoke when an error occurs.
	* Return value
	    - N/A
	* Exceptions
		* throws TypeError
		    * if type of any parameters is not matched to specification.
		* throws Error
		    * if unknown error occured.
	* Examples
		1. Getting value of SDI.

			```js
            toast.drminfo.getSdi(function(value) {
                console.log('Success: ' + value);
            }, function(err) {
                console.log('Error: ' + err.message);
            });
			```

## See others
None
