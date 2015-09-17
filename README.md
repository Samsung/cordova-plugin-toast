# cordova-plugin-toast
Cordova plugin that provides TV Specific functionalities.

# About this project
This plugin defines a global `toast` object, which provides an API for TV specific functionalities that is based on [Cordova](https://cordova.apache.org/) project.

Although the object provides the global scoped `toast` object, it is not available until after the `deviceready` event which is provided by Cordova.
```javascript
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(toast);
}
```
# Project Structure
```
    ./
     |-cordova-test-runner/ ... TestRunner/TestSuite Cordova application
     |-docs/ .................. Documents which is including API Specification.
     |-src/ ................... Platform dependent modules for the plugin TOAST
     |  |-browser/ ............ Plugin implementation for the platform `browser`
     |  |-sectv-orsay/ ........ Plugin implementation for the platform `sectv-orsay`
     |  '-sectv-tizen/ ........ Plugin implementation for the platform `sectv-tizen`
     |-tasks/ ................. custom grunt tasks to build the toast.js
     |-www/ ................... Platform independent modules for the plugin TOAST
     |-Gruntfile.js ........... Gruntfile to build the toast.js
     '-plugin.xml ............. Cordova Plugin configuration for TOAST
```

# How to Build
* platform `browser`
	* For the `browser` platform, you don't need to build TOAST and just add this plugin by using `cordova plugin add`. Please see "How to use" section for details.
* platform `sectv-orsay` and `sectv-tizen`
	* Run below command
	```
	$ grunt compile
	```
	It will creates the `toast.js` for each platforms in the `platform_www/<platform>` directories of project's root.

# How to use
## Platform "browser"
You can develop your cordova TV application by using chrome browser with simulated Toast API.
```shell
$ cordova platform add browser
$ cordova plugin add {{Local or git path to this project}}
$ cordova build browser
$ cordova emulate browser
```

## Platform "sectv-tizen": Samsung Tizen TV
In the 2015's TV
1. Copy the `platform_www/sectv-tizen/toast.js` to your cordova `www` directory root.
2. Include the `toast.js` right after the including `cordova.js` in your application's `index.html`.
```HTML
<script src="cordova.js"></script>	<!-- existing -->
<script src="toast.js"></script>
```
3. Package your `www` directory using Samsung Tizen TV SDK

## Platform "sectv-orsay": Legacy Samsung Smart TV (A.K.A Orsay)
In the 2014's TV
1. Copy the `platform_www/sectv-orsay/toast.js` to your cordova `www` directory root.
2. Include the `toast.js` right after the including `cordova.js` in your application's `index.html`.
```HTML
<script src="cordova.js"></script>	<!-- existing -->
<script src="toast.js"></script>
```
3. Zip your `www` directory

# How to Test with TestRunner
* You can test on each platforms with Test Runner cordova application which is located at 'cordova-test-runner' directory.
* Please refer to below for running the tests:

```shell
$ cordova create TestRunner --src=cordova-plugin-toast/cordova-test-runner
$ cd TestRunner
$ npm install ../grunt-cordova-sectv
$ cp -rf ../grunt-cordova-sectv/sample/* ./
$ npm install
$ cordova platform add browser
$ cordova plugin add ../cordova-plugin-toast

# Test on browser platform
$ cordova build browser
$ cordova emulate browser

# Test on sectv-orsay platform
$ grunt sectv-build:sectv-orsay sectv-package:sectv-orsay
# Run the application on target

# Test on sectv-tizen platform
$ grunt sectv-build:sectv-tizen sectv-package:sectv-tizen
# Run the application on target
```

# Known Issues
Not yet
