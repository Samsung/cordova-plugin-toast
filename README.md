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

# TOAST references
If you want more details, please refer belows.
* Guide
    - [wiki](https://github.com/Samsung/cordova-plugin-toast/wiki).
* Youtube
    - [Youtube link](https://youtu.be/vv5emwgtrDc) for 2016 SDC tech session : Write Once and Run Everywhere with TOAST for Smart TV.
* TOAST introduce video
    - [TOAST video](https://www.samsungdforum.com/toastAD) contains introduce for TOAST briefly. It would help you understand easily.

# Project Structure
```
    ./
     |-cordova-test-runner/ ... TestRunner/TestSuite Cordova application
     |-docs/ .................. Documents which are including API Specification
     |-sample/ ................ Sample applications using TOAST API
     |-src/ ................... Platform dependent modules for the plugin TOAST
     |  |-browser/ ............ Plugin implementation for the platform `browser`
     |  |-sectv-orsay/ ........ Plugin implementation for the platform `sectv-orsay`
     |  |-sectv-tizen/ ........ Plugin implementation for the platform `sectv-tizen`
     |  `-tv-webos/ ........... Plugin implementation for the platform `tv-webos`
     |-tasks/ ................. custom grunt tasks to build the toast.js
     |-www/ ................... Platform independent modules for the plugin TOAST
     |-Gruntfile.js ........... Gruntfile to build the toast.js
     '-plugin.xml ............. Cordova Plugin configuration for TOAST
```

# Associated Projects
* [cordova-sectv-orsay](http://github.com/Samsung/cordova-sectv-orsay) is an application library that allows for Cordova-based projects to be built for the Legacy Samsung Smart TV Platform.(A.K.A Orsay)
* [cordova-sectv-tizen](http://github.com/Samsung/cordova-sectv-tizen) is an application library that allows for Cordova-based projects to be built for the Samsung Tizen TV Platform.
* [cordova-tv-webos](http://github.com/Samsung/cordova-tv-webos) is an application library that allows for Cordova-based projects to be built for the LG WebOS TV Platform.
* [grunt-cordova-sectv](http://github.com/Samsung/grunt-cordova-sectv) is a [grunt](http://gruntjs.com/) task to prepare and build package from a cordova project for `sectv-orsay` and `sectv-tizen` and `tv-webos` platforms.


# Supported platform
* browser
* Legacy Samsung Smart TV (sectv-orsay)
* Tizen Samsung Smart TV (sectv-tizen)
* WebOS LG Smart TV (tv-webos)

<table>
  <tr align="center">
    <td rowspan="2" style="">Feature Name</td>
    <td rowspan="2" style="">Browser</td>
    <td colspan="3" style="">Legacy Samsung Smart TV</td>
    <td colspan="2" style="width:220px">Tizen Samsung Smart TV</td>
    <td colspan="3" style="width:220px">WebOS LG Smart TV</td>
  </tr>
  <tr align="center"><td>2012</td><td>2013</td><td>2014</td><td>2015</td><td>2016</td><td>2014</td><td>2015</td><td>2016</td></tr>
  <tr align="center"><td>toast.Media</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
  <tr align="center"><td>toast.MediaPlugin</td><td>No</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
  <tr align="center"><td>toast.drminfo</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>No</td><td>No</td><td>No</td></tr>
  <tr align="center"><td>toast.application</td><td>Partly</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
  <tr align="center"><td>toast.inputdevice</td><td>Partly</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
  <tr align="center"><td>toast.tvaudiocontrol</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
  <tr align="center"><td>toast.tvwindow</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>No</td><td>No</td><td>No</td></tr>
  <tr align="center"><td>toast.tvchannel</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>No</td><td>No</td><td>No</td></tr>
  <tr align="center"><td>IME</td><td>No</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
 </table>

# Prepare to start
* [Prepare to start](https://github.com/Samsung/cordova-plugin-toast/wiki/Prepare-to-start) contains contents such as precondition, configuration or compile before using TOAST.

## Precondition
First, TOAST needs the followings. Please install these.

* [nodejs](https://nodejs.org/)
* [git](https://git-scm.com/)
* [Chrome Browser](https://www.google.co.kr/chrome/browser/desktop/)
* [Samsung Tizen SDK](http://www.samsungdforum.com/) (It is only for Tizen packaging, please refer to [grunt-cordova-sectv](https://github.com/Samsung/grunt-cordova-sectv/blob/master/README.md), [Build and package](https://github.com/Samsung/cordova-plugin-toast/wiki/Build-and-Package)
* npm modules: cordova, grunt

    ```sh
    $ npm install -g cordova
    $ npm install -g grunt-cli
    ```

## git clone
* For copying repositories, please `mkdir` a root directory.
 
    ```sh
    $ mkdir <root directory>
    ```

* In the root directory, please `git clone` the following repositories.
    
    ```sh
    $ git clone https://github.com/apache/cordova-js.git
    $ git clone https://github.com/apache/cordova-browser.git
    $ git clone https://github.com/Samsung/cordova-plugin-toast.git
    $ git clone https://github.com/Samsung/cordova-sectv-orsay.git
    $ git clone https://github.com/Samsung/cordova-sectv-tizen.git
    $ git clone https://github.com/Samsung/cordova-tv-webos.git
    $ git clone https://github.com/Samsung/grunt-cordova-sectv.git
    ```

## Configuration
* Please `npm install` to install dependencies in `cordova-js`, `cordova-plugin-toast`, `cordova-sectv-orsay`, `cordova-sectv-tizen`, `cordova-tv-webos`, `grunt-cordova-sectv`.

    ```sh
    $ npm install
    ```

* In `cordova-js/Gruntfile.js`, please add compile tasks.

    ```js
    module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compile: {
            ...
            "sectv-orsay": {},
            "sectv-tizen": {},
            "tv-webos": {}
        },
    ```

* In `cordova-js/package.json`, please add the platforms to `cordova-platforms` like below.

  ```js
  "cordova-platforms" : {
        ...
    "cordova-sectv-orsay"   : "../cordova-sectv-orsay",
    "cordova-sectv-tizen"   : "../cordova-sectv-tizen",
    "cordova-tv-webos"   : "../cordova-tv-webos"
  }
  ```

## Compile

* In `cordova-js`, please `grunt compile` for packaging.

    ```sh
    $ grunt compile:sectv-orsay compile:sectv-tizen compile:tv-webos
    ```

* In `cordova-plugin-toast`, please `grunt compile` for packaging.

    ```sh
    $ grunt compile:sectv-orsay compile:sectv-tizen compile:tv-webos
    ```

# Create Project
* [Create Project](https://github.com/Samsung/cordova-plugin-toast/wiki/Create-Project) contains how to create TOAST Project step by step.

## How to create Toast project

* recommended workspace

   ```
  ./
     |-cordova-js/ ............
     |-cordova-browser/ .......
     |-cordova-plugin-toast/ ..
     |-cordova-sectv-orsay/ ...
     |-cordova-sectv-tizen/ ...
     |-cordova-tv-webos/ ......
     `-grunt-cordova-sectv/ ...
   ```

* create empty project

    ```sh
    # Create cordova project
    $ cordova create TestApp
    $ cd TestApp

    # Beware of hidden file
    $ cp -rf ../grunt-cordova-sectv/sample/. ./
    $ npm install ../grunt-cordova-sectv
    # Grunt task for build and package

    # Install dependency modules
    $ npm install

    # For toast browser simulator
    $ cordova platform add browser

    # Mandatory plugins for using browser simulator (not for other platforms)
    $ cordova plugin add cordova-plugin-device
    $ cordova plugin add cordova-plugin-network-information
    $ cordova plugin add cordova-plugin-globalization

    # Add toast plugin
    $ cordova plugin add ../cordova-plugin-toast
    ```

* www/index.html

    ```HTML
<!-- REMOVE meta tag for setting CSP(Content-Security-Policy)
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *">
-->

<!-- Please add below script tags to body tag (not head tag) -->
    <body>
        ...
        <script type="text/javascript" src="cordova.js"></script>
        
        <!-- Add toast.js to use toast api -->
        <script type="text/javascript" src="toast.js"></script>
        ...
    </body>
    ```

# Prepare and Build
* [Prepare and Build](https://github.com/Samsung/cordova-plugin-toast/wiki/Prepare-and-Build) contains how to prepare and build TOAST project for each platforms.
"Prepare" task could help to compose necessary components of TOAST project for each platforms.
"Build" task could help to package TOAST project as format for each platforms.

## How to prepare
* browser

    ```sh
    $ cordova build browser
    ```
* sectv-orsay

    ```sh
    $ grunt sectv-prepare:sectv-orsay
    ```
* sectv-tizen

    ```sh
    $ grunt sectv-prepare:sectv-tizen
    ```
* tv-webos

    ```sh
    $ grunt sectv-prepare:tv-webos
    ```    

## How to build and package
* browser

    ```sh
    # Test on browser platform
    $ cordova emulate browser
    ```
* sectv-orsay
    
    ```sh
    # Test on sectv-orsay platform
    $ grunt sectv-build:sectv-orsay
    # Run the application on target by using SDK
    ```
* sectv-tizen

    ```sh
    # Test on sectv-tizen platform
    $ grunt sectv-build:sectv-tizen
    # Run the application on target by using SDK
    ```
* tv-webos

    ```sh
    # Test on tv-webos platform
    $ grunt sectv-build:tv-webos
    # Run the application on target by using SDK
    ```    

* For more details, please refer the [tizen package](https://github.com/Samsung/grunt-cordova-sectv/blob/master/README.md#how-to-build-and-package-the-application-by-platforms)

# How to Test with TestRunner
* You can test on each platforms with Test Runner cordova application which is located at 'cordova-test-runner' directory of this project.
* Please refer to below for running the tests: (Assuming that the [grunt-cordova-sectv](http://github.com/Samsung/grunt-cordova-sectv) project is cloned at the same level with this project)

    ```sh
    # Create cordova project
    $ cordova create TestRunner --template=cordova-plugin-toast/cordova-test-runner
    $ cd TestRunner

    # Beware of hidden file
    $ cp -rf ../grunt-cordova-sectv/sample/. ./
    $ npm install ../grunt-cordova-sectv
    # Grunt task for build and package

    # Install dependency modules
    $ npm install

    # For toast browser simulator
    $ cordova platform add browser

    # Mandatory plugins for using browser simulator (not for other platforms)
    $ cordova plugin add cordova-plugin-device
    $ cordova plugin add cordova-plugin-network-information
    $ cordova plugin add cordova-plugin-globalization

    # Add toast plugin
    $ cordova plugin add ../cordova-plugin-toast
    ```

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
