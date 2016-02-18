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
You can find project details in [wiki](https://github.com/Samsung/cordova-plugin-toast/wiki).

# Project Structure
```
    ./
     |-cordova-test-runner/ ... TestRunner/TestSuite Cordova application
     |-docs/ .................. Documents which is including API Specification.
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
* [cordova-sectv-orsay](http://github.com/Samsung/cordova-sectv-orsay) is an application library that allows for Cordova-based projects to be built for the Legacy Samsung Smart TV (A.K.A Orsay) Platform.
* [cordova-sectv-tizen](http://github.com/Samsung/cordova-sectv-tizen) is an application library that allows for Cordova-based projects to be built for the 2015's Samsung Tizen TV Platform.
* [grunt-cordova-sectv](http://github.com/Samsung/grunt-cordova-sectv) is a [Grunt](http://gruntjs.com/) task to build and create package from a cordova project for `sectv-orsay` and `sectv-tizen` platforms.

# How to Build
* platform `browser`

    For the `browser` platform, you don't need to build TOAST and just add this plugin by using `cordova plugin add` command. Please see [How to use](#how-to-use) section for details.

* platform `sectv-orsay` and `sectv-tizen`

    Make sure you have all of the node dependencies installed by running the following command from the repository root
    ```sh
    $ npm install
    ```

    All of the build tasks can be run via the grunt node module. Install it globally first by running:
    ```sh
    $ sudo npm install -g grunt-cli
    ```

    Then from the repository root run:
    ```sh
    $ grunt compile
    ```

    It will creates the `toast.js` for each platforms in the `platform_www/<platform>` directories of the repository root.

# How to use
## Platform "browser"
You can develop your cordova TV application by using chrome browser with simulated Toast API.
```sh
$ cordova platform add browser
$ cordova plugin add {{Local or git path to this project}}
$ cordova build browser
$ cordova emulate browser
```

## Platform "sectv-tizen": Samsung Tizen TV
For the 2015's TV:

1. Copy the `platform_www/sectv-tizen/toast.js` to your cordova `www` directory root.
2. Include the `toast.js` right after the including `cordova.js` in your application's `index.html`.

    ```HTML
    <script src="cordova.js"></script>  <!-- existing -->
    <script src="toast.js"></script>
    ```

3. Package your `www` directory using Samsung Tizen TV SDK

## Platform "sectv-orsay": Legacy Samsung Smart TV (A.K.A Orsay)
For the 2014's TV:

1. Copy the `platform_www/sectv-orsay/toast.js` to your cordova `www` directory root.
2. Include the `toast.js` right after the including `cordova.js` in your application's `index.html`.

    ```HTML
    <script src="cordova.js"></script>  <!-- existing -->
    <script src="toast.js"></script>
    ```

3. Configure your application by creating `config.xml` file and Zip your `www` directory to create package.

# How to Test with TestRunner
* You can test on each platforms with Test Runner cordova application which is located at 'cordova-test-runner' directory of this project.
* Please refer to below for running the tests: (Assuming that the [grunt-cordova-sectv](http://github.com/Samsung/grunt-cordova-sectv) project is cloned at the same level with this project)

    ```sh
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
    $ grunt sectv-prepare:sectv-orsay sectv-build:sectv-orsay
    # Run the application on target by using SDK
    
    # Test on sectv-tizen platform
    $ grunt sectv-prepare:sectv-tizen sectv-build:sectv-tizen
    # Run the application on target by using SDK
    ```

# Known Issues
Not yet

[![Analytics](https://ga-beacon.appspot.com/UA-70262254-1/cordova-plugin-toast/README)](https://github.com/igrigorik/ga-beacon)
