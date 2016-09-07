# toast.drminfo
toast.drminfo provides DRM information.

## Supported platforms
* browser
* sectv-orsay (sectv-orsay)
* sectv-tizen (sectv-tizen)
    - Privilege `<tizen:privilege name="http://developer.samsung.com/privilege/drminfo"/>` must be declared in the config.xml of tizen package. Please note that drminfo API is required privilege of partner level.

<table>
  <tr align="center">
    <td rowspan="2" style="">Method Name</td>
    <td rowspan="2" style="">Browser</td>
    <td colspan="2" style="">Legacy Samsung Smart TV</td>
    <td colspan="2" style="">Tizen Samsung Smart TV</td>
    <td colspan="2" style="">WebOS LG Smart TV</td>
  </tr>
  <tr align="center"><td>Emulator (ver 5.1)</td><td>Device ('12 - '14)</td><td>Emulator (ver 2.3.1)</td><td>Device ('15 - '16)</td><td>Emulator (ver 3.0.0)</td><td>Device ('14 - '16)</td></tr>
  <tr align="center"><td>getEsn</td><td>O</td><td>X</td><td>O</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>getSdi</td><td>O</td><td>X</td><td>O</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
 </table>

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
### void getEsn(DOMString component, DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
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

### void getSdi(DOMStringCallback successCallback, optional ErrorCallback? errorCallback);
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
