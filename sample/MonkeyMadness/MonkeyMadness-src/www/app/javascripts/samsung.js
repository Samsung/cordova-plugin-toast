/**
*	Utilities functions.
*	@author Gerardo Reyes, g.reyes@samsung.com
**/
var Utils = (function(){    
    /*
    *   Logger object factory to perform logs.
    *   @return {Object} Logger object.
    */
    var Logger = function() {
        var logger = {};
        if (applicationConfig.debugMode === true) {
            logger = {
                log : function() {
                    var args = Array.prototype.slice.call(arguments, 0);
                    console.log(arguments);
                },
                info : function() {
                    var args = Array.prototype.slice.call(arguments, 0);
                    console.info(arguments);
                },
                warn : function() {
                    var args = Array.prototype.slice.call(arguments, 0);
                    console.warn(arguments);
                },
                error : function() {
                    var args = Array.prototype.slice.call(arguments, 0);
                    console.error(arguments);
                }
            };
        } else {
            logger = {
                log : function() {},
                info : function() {},
                warn : function() {},
                error : function() {}
            };
        }
        return logger;
    };

    // USAGE:
    // For development and debugging.
    var applicationConfig = {
        debugMode: false
    };
    
    var logger = new Logger(); // Initializes logger. 
    /**
     * Utility function to know if the platfom is orsay.
     */
    var isOrsay = function() { 
        return cordova.require('cordova/platform').id === 'sectv-orsay';
    };
    /**
     * Utility function to know if the platfom is tizen.
     */    
    var isTizen = function() { 
        return cordova.require('cordova/platform').id === 'sectv-tizen';
    };
    /**
     * Utility function to know if the platfom is web.
     */        
    var isWeb = function() {   
        return cordova.require('cordova/platform').id === 'browser';
    };
    
    return {
        logger: logger,
        isOrsay: isOrsay,
        isTizen: isTizen,
        isWeb: isWeb   
    };
})();
    
/**
*	Global function initialization for each platform.
*   @param {string} Platform's name.
*	@author Gerardo Reyes, g.reyes@samsung.com
**/    
(function(platform) {
    switch(platform) {
        case 'sectv-orsay':
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = '$MANAGER_WIDGET/Common/API/Plugin.js';
            var pluginAPI = null;
            script.onload = function() {
                pluginAPI = new Common.API.Plugin();
                window.setOnScreenSaver = function() {
                    pluginAPI.setOnScreenSaver();
                };
                window.setOffScreenSaver = function() {
                    pluginAPI.setOffScreenSaver();
                };
            };
            head.appendChild(script);
            break;
        case 'sectv-tizen':
            window.setOnScreenSaver = function() {
                var screenState = webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON;
                var value = webapis.appcommon.setScreenSaver(screenState);
            };
            window.setOffScreenSaver = function() {
                var screenState = webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF;
                var value = webapis.appcommon.setScreenSaver(screenState);
            };
            break;            
        default:
            window.setOffScreenSaver = function() {
                Utils.logger.info('%c Screen Saver was turned OFF','color:white;background:black');
            };
            window.setOnScreenSaver = function() {
                Utils.logger.info('%c Screen Saver was turned ON','color:white;background:black');
            };
            break;
     }
     if(!Utils.isOrsay()) {
		window.curWidget = {
			id: ''
		};        
        /**
         * Class available for tizen platform to manage FileSystem like orsay.
         */
        window.FileSystem = function () {
			this.openCommonFile = function(dir,type){
				var c_name = dir.replace(".data","").replace("/","");
				var regexp = new RegExp("(?:^" + c_name + "|;\\s*"+ c_name + ")=(.*?)(?:;|$)", "g");
				if(type=='w'){
					var cookie = c_name + "=" + escape("") + ";";
					var expires = new Date(new Date().getTime() + parseInt(10) * 1000 * 60 * 60 * 24);
					cookie += "expires=" + expires.toGMTString() + ";";
					document.cookie = cookie;
				}
				var result = regexp.exec(document.cookie);
				if(result === null){
					return null;
				}else
					return {
						name: c_name,
						val: result[1],
						writeAll:function(val){
							var cookie = this.name + "=" + escape(val) + ";";
							var expires = new Date(new Date().getTime() + parseInt(10) * 1000 * 60 * 60 * 24);
							cookie += "expires=" + expires.toGMTString() + ";";
							document.cookie = cookie;
						},
						readAll:function(){return unescape(this.val);}
					};
			};
			this.closeCommonFile = function(){
				window.logger.log("closeCommonFile");
			};
			this.isValidCommonPath = function(){
				return true;
			};
			this.closeCommonFile = function(){
			};
			this.deleteCommonFile = function(){
			};
		};
    }        
})(cordova.require('cordova/platform').id);