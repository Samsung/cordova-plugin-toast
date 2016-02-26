[![Build Status](https://travis-ci.org/Samsung/cordova-plugin-toast.svg?branch=master)](https://travis-ci.org/Samsung/cordova-plugin-toast)

# cordova-plugin-toast
Cordova plugin that provides TV Specific functionalities.

# About this project
This plugin defines a global `toast` object, which provides an API for TV specific functionalities that is based on [Cordova](https://cordova.apache.org/) project.

Although the object provides the global scoped `toast` object, it is not available until after the `deviceready` event which is provided by Cordova.
```js
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(toast);
}
```
If you want more project details, please refer to [wiki](https://github.com/Samsung/cordova-plugin-toast/wiki).

# Project Structure
```
    ./
     |-cordova-test-runner/ ... TestRunner/TestSuite Cordova application
     |-docs/ .................. Documents which are including API Specification
     |-sample/ ................ Sample applications using TOAST API
     |-src/ ................... Platform dependent modules for the plugin TOAST
     |  |-browser/ ............ Plugin implementation for the platform `browser`
     |  |-sectv-orsay/ ........ Plugin implementation for the platform `sectv-orsay`
     |  `-sectv-tizen/ ........ Plugin implementation for the platform `sectv-tizen`
     |-tasks/ ................. custom grunt tasks to build the toast.js
     |-www/ ................... Platform independent modules for the plugin TOAST
     |-Gruntfile.js ........... Gruntfile to build the toast.js
     '-plugin.xml ............. Cordova Plugin configuration for TOAST
```

# Associated Projects
* [cordova-sectv-orsay](http://github.com/Samsung/cordova-sectv-orsay) is an application library that allows for Cordova-based projects to be built for the Legacy Samsung Smart TV Platform.(A.K.A Orsay)
* [cordova-sectv-tizen](http://github.com/Samsung/cordova-sectv-tizen) is an application library that allows for Cordova-based projects to be built for the Samsung Tizen TV Platform.
* [grunt-cordova-sectv](http://github.com/Samsung/grunt-cordova-sectv) is a [grunt](http://gruntjs.com/) task to prepare and build package from a cordova project for `sectv-orsay` and `sectv-tizen` platforms.

# Prepare to start
* [Prepare to start](https://github.com/Samsung/cordova-plugin-toast/wiki/Prepare-to-start) contains contents such as precondition, configuration or compile before using TOAST.

# Create Project
* [Create Project](https://github.com/Samsung/cordova-plugin-toast/wiki/Create-Project) contains how to create TOAST Project step by step.

# Prepare and Build
* [Prepare and Build](https://github.com/Samsung/cordova-plugin-toast/wiki/Prepare-and-Build) contains how to prepare and build TOAST project for each platforms.
"Prepare" task could help to compose necessary components of TOAST project for each platforms.
"Build" task could help to package TOAST project as format for each platforms.

# Converting Tizen to Toast
* [Converting Tizen to Toast](https://github.com/Samsung/cordova-plugin-toast/wiki/Prepare-to-convert-for-Tizen) contains how to convert application which is made with Tizen to TOAST.

# Converting Orsay to Toast
* [Converting Orsay to Toast](https://github.com/Samsung/cordova-plugin-toast/wiki/Prepare-to-convert-for-Legacy%20(A.K.A.%20Orsay)) contains how to convert application which is made with Orsay to TOAST.

# API Reference
* [toast.Media](https://github.com/Samsung/cordova-plugin-toast/blob/master/docs/toast.Media.md)
* [toast.MediaPlugin](https://github.com/Samsung/cordova-plugin-toast/blob/master/docs/toast.MediaPlugin.md)
* [toast.drminfo](https://github.com/Samsung/cordova-plugin-toast/blob/master/docs/toast.drminfo.md)
* [toast.application](https://github.com/Samsung/cordova-plugin-toast/blob/master/docs/toast.application.md)
* [toast.inputdevice](https://github.com/Samsung/cordova-plugin-toast/blob/master/docs/toast.inputdevice.md)
* [toast.tvaudiocontrol](https://github.com/Samsung/cordova-plugin-toast/blob/master/docs/toast.tvaudiocontrol.md)
* [toast.tvwindow](https://github.com/Samsung/cordova-plugin-toast/blob/master/docs/toast.tvwindow.md)
* [toast.tvchannel](https://github.com/Samsung/cordova-plugin-toast/blob/master/docs/toast.tvchannel.md)

# Sample App
* [Media](https://github.com/Samsung/cordova-plugin-toast/tree/master/sample/media)
* [drmmedia](https://github.com/Samsung/cordova-plugin-toast/tree/master/sample/drmmedia)
* [ime](https://github.com/Samsung/cordova-plugin-toast/tree/master/sample/ime)
* [tvwindow](https://github.com/Samsung/cordova-plugin-toast/tree/master/sample/tvwindow)
* [deviceinfo](https://github.com/Samsung/cordova-plugin-toast/tree/master/sample/deviceinfo)

# Contribution Guideline
* [Contribution Guideline](https://github.com/Samsung/cordova-plugin-toast/wiki/contribution-guideline) contains several tips to participate in contribution.

# Known Issues
Not yet

[![Analytics](https://ga-beacon.appspot.com/UA-70262254-1/cordova-plugin-toast/README)](https://github.com/igrigorik/ga-beacon)
