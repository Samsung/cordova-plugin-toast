# toast.application
toast.application privides APIs related with the application.

## Supported platforms
* Browser
* sectv-orsay (sectv-orsay)
* sectv-tizen (sectv-tizen)
* tv-webos (tv-webos)

<table>
  <tr align="center">
    <td rowspan="2" style="">Method Name</td>
    <td rowspan="2" style="">Browser</td>
    <td colspan="2" style="">Legacy Samsung Smart TV</td>
    <td colspan="2" style="">Tizen Samsung Smart TV</td>
    <td colspan="2" style="">WebOS LG Smart TV</td>
  </tr>
  <tr align="center"><td>Emulator (ver 5.1)</td><td>Device ('12 - '14)</td><td>Emulator (ver 2.3.1)</td><td>Device ('15 - '16)</td><td>Emulator (ver 3.0.0)</td><td>Device ('14 - '16)</td></tr>
  <tr align="center"><td>exit</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>launchApp</td><td>X</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>getRequestedAppInfo</td><td>X</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
 </table>

## Full WebIDL
```WebIDL
module Application {
    [NoInterfaceObject] interface ApplicationManagerObject {
        readonly attribute ApplicationManager application;
    };
    Toast implements ApplicationManagerObject;

    [NoInterfaceObject] interface ApplicationManager {
        void exit();
        void launchApp(AppInfo appInfo, SuccessCallback successCallback, optional ErrorCallback? errorCallback) raises (Error);
        void getRequestedAppInfo(RequestedAppInfoCallback successCallback, optional ErrorCallback? errorCallback) raises (Error);
    
    [Callback = FunctionOnly, NoInterfaceObject] interface RequestedAppInfoCallback {
        void onsuccess(RequestedAppInfo reqAppInfo);
    };

    dictionary AppInfo {
        DomString appId;
        Object? data;
    };

    dictionary RequestedAppInfo {
        readonly DomString CallerAppId;
        readonly Object? data;
    };       
};
```

## APIs

### void exit();
This function terminates current application.
* Parameters
    N/A
* Return value
    N/A
* Exceptions
    * throws TypeError
        * If given arguments are not matched with API specification.
    * throws Error
        * if any error occured during the operation.
* Examples
    1. Terminate current application when Return key pressed.

        ```js
        window.addEventListener('keydown', function (e) {
            if(e.keyCode === tvKeyCode.Return) {
                toast.application.exit();
            }
        });
        ```

### void launchApp(AppInfo appInfo, SuccessCallback successCallback, optional ErrorCallback? errorCallback);
Launches an application with application details.
* Parameters
    * appInfo: The data structure describing application details.
    * successCallback: The method to call when the source is changed successfully.
    * errorCallback: The method to invoke when an error occurs.
* Return value
    N/A
* Exceptions
    * throws TypeError
        * If given arguments are not matched with API specification.
    * throws Error
        * if any error occured during the operation.
* Examples
    1. Callee(appId) will be lauched with data.

        ```js
        toast.application.launchApp({appId: 'xxxxxxx', data: {url: 'http://...', info: 'This is video url.'}}, function() {
            console.log('success');
        }, function(err) {
            console.log('fail' + err.message);
        });

        ```

### void getRequestedAppInfo(ReqAppInfoCallback successCallback, optional ErrorCallback? errorCallback);
This interface has an application information requested and passed from another application and is passed to launch other applications. 
* Parameters
    * successCallback: The method to call when the source is changed successfully.
    * errorCallback: The method to invoke when an error occurs.
* Return value
    N/A
* Exceptions
    * throws TypeError
        * If given arguments are not matched with API specification.
    * throws Error
        * if any error occured during the operation.
* Examples
    1. Callee received the Data from caller.

        ```js
        toast.application.getRequestedAppInfo(function(reqAppInfo) {
            console.log('success' + reqAppInfo.callerAppId + ' ' + JSON.stringify(reqAppInfo.data));
        }, function(err) {
            console.log('fail' + err.message);
        });
        ```

## See others
[toast.inputdevice](toast.inputdevice.md)
