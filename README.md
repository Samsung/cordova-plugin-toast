# cordova-plugin-toast
Cordova plugin that provides TV Specific functionalities.

# About this project
This plugin defines a global toast object, which provides an API for TV specific functionalities that is based on [Cordova](https://cordova.apache.org/) project.

Although the object provides the global scoped `toast` object, it is not available until after the `deviceready` event which is provided by Cordova.
```javascript
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(toast);
}
```

# Installation
```shell
$ cordova plugin add {{Local or git path to this project}}
```

# How to use
## browser as a cordova platform
You can develop your cordova TV application by using chrome browser with simulated Toast API.
```shell
$ cordova platform add browser
$ cordova plugin add {{Local or git path to this project}}
$ cordova build browser
$ cordova emulate browser
```

## Samsung Tizen TV
In the 2015's TV
1. Copy the platform_www/sectv-tizen/toast.js to your cordova `www` directory root.
2. Insert below code to your `index.html`
```HTML
<script src="toast.js"></script>
```
3. Package your `www` directory using Samsung Tizen TV SDK

## Legacy Samsung Smart TV
In the 2014's TV
1. Copy the platform_www/sectv-orsay/toast.js to your cordova `www` directory root.
2. Insert below code to your `index.html`
```HTML
<script src="toast.js"></script>
```
3. Zip your `www` directory

# Project Structure
```
    ./
     |-src/
     |  |-cordova.js ........ common Cordova stuff
     |  |-common/ ........... base modules shared across platfoms
     |-tasks/ ............... custom grunt tasks
     |-tests/ ............... unit tests
     '-pkg/ ................. generated platform cordova.js files
```

# How to Build

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
