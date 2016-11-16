var tvKey={};

/**
 * @name TVtuner module manager
 * @type {Object}
 * @property {Number} channelListenerID - The identifier of the listener for channel changes
 * @property {HTMLElement} progInfo - HTML element which displays information at the top of the screen
 */
var TVtuner = (function() {
    var progInfo = null;

    /**
     * @description Tune callback for tune(), tuneUp() and tuneDown() functions when tuning has been completed
     * @type {Object}
     * @private
     */
    tuneCB = {
        /**
         * @description Method invoked when the tuning is successfully done
         * @method tuneCB.onsuccess()
         * @param channel - The tuned channel information
         * @param type - The window type
         */
        onsuccess: function(channel, type) {
            log("tune is successfully done. And there is a signal.");
            // Display channel and program info on onsuccess callback
            displayTest();
        },
        /**
         * @description Method invoked when the tuning is successfully done, but there is no signal on the switched channel
         * @method tuneCB.onnosignal()
         */
        onnosignal: function() {
            log("tune is successfully done. But there is no signal.");
        },

        /**
         * @description Method invoked when information about the current program is available after the tune operation
         * @method tuneCB.onprograminforeceived()
         * @param program - The information about program on offer from the tuned channel
         * @param type - The window type
         */
        onprograminforeceived: function(program, type) {
            log("Program is ready");
        }
    };

    /**
     * @description initialize TVtuner module
     * @method TVtuner.init()
     * @public
     */
    function init() {
        log("init method");

        progInfo = document.getElementById("progInfo").getElementsByTagName("h1")[0];

        setKeyTable();
        registerKeys();
        registerKeyHandler();

        addChannelChangeListener();
        displayTest();

        tvwindowShow();
    }

    /**
     * Set key table used in this application
     */
    function setKeyTable() {
        var prefixKeyName = 'KEY_';
        toast.inputdevice.getSupportedKeys(function (supportedKeys) {
            for (var i = 0; i < supportedKeys.length; i++) {
                switch(supportedKeys[i].name) {
                    case 'ChannelUp' :
                        tvKey[prefixKeyName + 'CHANNEL_UP'] = supportedKeys[i].code;
                        break;
                    case 'ChannelDown' :
                        tvKey[prefixKeyName + 'CHANNEL_DOWN'] = supportedKeys[i].code;
                        break;
                    case '0' :
                        tvKey[prefixKeyName + '0'] = supportedKeys[i].code;
                        break;
                    case '1' :
                        tvKey[prefixKeyName + '1'] = supportedKeys[i].code;
                        break;
                    case '2' :
                        tvKey[prefixKeyName + '2'] = supportedKeys[i].code;
                        break;

                    case 'Return' :
                        tvKey[prefixKeyName + 'RETURN'] = supportedKeys[i].code;
                        break;
                }
            }
        }, function(err){
            console.log('Error : ' + err.message);
        });
    }

    /**
     * Register keys used in this application
     */
    function registerKeys() {
        var usedKeys = [
            'ChannelUp',
            'ChannelDown',
            '0',
            '1',
            '2'
        ]; // 'up, down, enter, return key' is already registered.
        for (var i = 0; i < usedKeys.length; i++) {
            try{
                toast.inputdevice.registerKey(usedKeys[i], function() {}, function(err) {
                    console.log('Error: ' + err.message);
                });
            } catch(e){
                console.log("failed to register " + usedKeys[i] + ": " + e);
            }
        }
    }

    /**
     * Handle input from remote
     */
    function registerKeyHandler() {
        window.addEventListener("keydown", function(e) {
            log("[keyCode] : " + "[" + e.keyCode + "]");
            switch(e.keyCode) {
                case tvKey.KEY_RETURN:
                    toast.application.exit();
                    break;

                case tvKey.KEY_CHANNEL_UP:
                    tuneUp();
                    break;

                case tvKey.KEY_CHANNEL_DOWN:
                    tuneDown();
                    break;

                case tvKey.KEY_0:
                    log(); // log clear
                    break;

                case tvKey.KEY_1:
                    getProgramList();
                    break;

                case tvKey.KEY_2:
                    getProgramInfo();
                    break;
            }
        });
    }

    /**
     * @description Method invoked when the channel has been changed.
     * @method TVtuner.channelChangeCB()
     * @param channelInfo {Object} The switched channel information
     * @param type - The window type
     * @private
     */
    function channelChangeCB (channelInfo, type) {
        log("Switched to the new channel (major = " + channelInfo.major + ", minor = " + channelInfo.minor + ", channel name = " + channelInfo.channelName);
    }

    /**
     * @description The method invoked when the list of TV program informations is retrieved.
     * @method TVtuner.programListCB()
     * @param programInfos {Object} - A list of TV program informations of a channel
     * @private
     */
    function programListCB (programInfos) {
        log("getting all available programs is successfully retrieved.");
        log("retrieved " + programInfos.length + " programs");
        for (var i = 0; i < programInfos.length; i++) {
            log("--------------- Program " + i + " ---------------");
            log("title = " + programInfos[i].title);
            log("duration = " + programInfos[i].duration);
            // you can get other attributes in the retrieved ProgramInfo objects.
        }
    }

    /**
     * @description Method invoked when all channels are found.
     * @method TVtuner.channelListCB()
     * @param channels {Object} - A list of channel Informations
     * @private
     */
    function channelListCB (channels) {
        log("getChannelList() is successfully done. Totally " + channels.length + " channels are retrieved.");
        for (var i = 0; i < channels.length; i++) {
            log("----- Channel [" + i + "] -----");

            // The major channel number. The first number in a two-part number used to identify a virtual channel.
            // Each virtual channel carries one service, such as a television program.
            log("Major channel = " + channels[i].major);

            // The minor channel number. The second number in a two-part number used to identify a virtual channel.
            // The minor number changes for each different service that is or will be present in a DTV transport stream.
            log("Minor channel = " + channels[i].minor);

            // Channel Name to represent the station's indentity
            log("Channel Name = " + channels[i].channelName);

            // Program number
            log("Program Number = " + channels[i].programNumber);

            // PTC(Physical Transmission Channel) number
            log("PTC = " + channels[i].ptc);

            // The logical channel number. It is used in DVB(Digital Video Broadcasting) standards for digital television.
            log("LCN = " + channels[i].lcn);

            // It is a number that uniquely identifies a source of scheduled programming.
            log("Source ID = " + channels[i].sourceID);

            // TSID (Transport Stream ID or transmission signal ID)
            log("Transport stream ID = " + channels[i].transportStreamID);

            // original network ID
            log("Original network ID = " + channels[i].originalNetworkID);

            // service name
            log("Service name = " + channels[i].serviceName);
        }
    }

    function errorCB(error) {
        log("Error name = "+ error.name + ", Error message = " + error.message);
    }

    /**
     * @description Adds a channel change listener for getting notified about the channel changes.
     * @method TVtuner.addChannelChangeListener()
     * @public
     */
    function addChannelChangeListener() {
        try {
            toast.tvchannel.addChannelChangeListener(channelChangeCB);
        } catch (error) {
            log("Error name = "+ error.name + ", Error message = " + error.message);
        }
    }

    /**
     * @description Test function to display current information about channel and program at the top of the screen
     * @method TVtuner.displayTest()
     * @public
     */
    function displayTest() {
        try {
            toast.tvchannel.getCurrentChannel(function(channel) {
                log("The current channel name is "  + channel.channelName);
                log("The current channel's major number is "  + channel.major);
                toast.tvchannel.getCurrentProgram(function(program) {
                    progInfo.innerHTML = channel.major + " " + channel.channelName + ": " + program.title;
                }, errorCB);
            }, errorCB);
        } catch (error) {
            log("Error name = "+ error.name + ", Error message = " + error.message);
        }
    }

    function tvwindowShow() {
        toast.tvwindow.show([0, 100, 1320, 880], function() {
            log('toast.tvwindow.show Success');
        }, function(error) {
            log('toast.tvwindow.show Error : ' + JSON.stringify(error));
        });
    }

    /**
     * @description Gets information about the current television program.
     * @method TVtuner.getProgramInfo()
     * @returns {ProgramInfo} - the information of television program
     * @public
     */
    function getProgramInfo() {
        try{
            toast.tvchannel.getCurrentProgram(function(program) {
                if(program == null) {
                    program.title = "There is no program";
                }
                else if(program.title.length == 0) {
                    program.title = "no title available";
                }
                log("The current program is titled: "  + program.title);
            }, errorCB);
        } catch(error){
            log("Error name = "+ error.name + ", Error message = " + error.message);
        }
    }

    /**
     * @description Gets the TV channel list.
     * @method TVtuner.getChannelList()
     * @param numb {Number} - number of channels to retreive
     * @public
     */
    function getChannelList(numb) {

        var amount = 10;

        if(numb && typeof(numb) == "number") {
            amount = numb;
        }

        try {
            // channelListCB - The method to invoke when a list of tv channels is retrieved successfully.
            // errorCB - error callback
            // "ALL" - The channel navigation mode. By default, this attribute is set to ALL.
            // 0 - The starting index. By default, this attribute is set to 0.
            // amount - gets 10 channel information among all channels if no numb is typed
            toast.tvchannel.getChannelList(channelListCB, errorCB, 'ALL', 0, amount);
        } catch (error) {
            log("Error name = "+ error.name + ", Error message = " + error.message);
        }
    }

    /**
     * @description Gets a list of programs for a specific channel within a specified time duration. If this method is
     * invoked without the duration parameter, all available program informations are retrieved.
     * @method TVtuner.getProgramList()
     * @public
     */
    function getProgramList() {
        try {
            toast.tvchannel.getCurrentChannel(function(channel) {
                log("The current channel name is "  + channel.channelName);
                log("The current channel's major number is "  + channel.major);
                try {
                    toast.tvchannel.getProgramList(channel, new Date(), programListCB, errorCB);
                } catch (error) {
                    log(error.name);
                }
            }, errorCB);
        } catch (error) {
            log("Error name = "+ error.name + ", Error message = " + error.message);
        }
    }

    /**
     * @description Tunes the specified channel.
     * @method TVtuner.tune()
     * @param index {Number} - Tune to the typed number of channel
     * @public
     */
    function tune(index) {

        function channelCB(channels) {
            log("getting channels is successful. " + channels.length + " channels are retreived.");
            if (channels.length === 0 ) {
                log("There is no found channel.");
                return;
            }

            if (index >=  channels.length) {
                log("channel number is beyond the available list");
                return;
            }

            try {
                //{major: channels[index].major} - The tuning option. By default, this attribute is set to null.
                // tuneCB - The method to invoke when the tunning operation is completed successfully.
                // errorCB - error callback
                toast.tvchannel.tune(
                    {major: channels[index].major}, tuneCB, errorCB);
            } catch(error) {
                log("Error name = "+ error.name + ", Error message = " + error.message);
            }
        }

        try {
            // requests to get information about 10 channels.
            toast.tvchannel.getChannelList(channelCB, errorCB, 'ALL', 0, 10);
        } catch (error) {
            log("Error name = "+ error.name + ", Error message = " + error.message);
        }
    }

    /**
     * @description Changes channel up.
     * @method TVtuner.tuneUp()
     * @public
     */
    function tuneUp() {
        try {
            // tuneCB - The method to invoke when the tunning operation is completed successfully.
            // errorCB - error callback
            toast.tvchannel.tuneUp(tuneCB, errorCB);
        } catch(e) {
            log("Error name = "+ error.name + ", Error message =  " + error.message);
        }
    }

    /**
     * @description Changes channel down.
     * @method TVtuner.tuneDown()
     * @public
     */
    function tuneDown() {
        try {
            // tuneCB - The method to invoke when the tunning operation is completed successfully.
            // errorCB - error callback
            toast.tvchannel.tuneDown(tuneCB, errorCB);
        } catch(e) {
            log("Error name = "+ error.name + ", Error message = " + error.message);
        }
    }

    /**
     * Displays logging information on the screen and in the console.
     * @param {string} msg - Message to log.
     */
    function log(msg) {
        var logsEl = document.getElementById('logs');

        if (msg) {
            // Update logs
            console.log('[TVChannel]: ', msg);
            logsEl.innerHTML += msg + '<br />';
        } else {
            // Clear logs
            logsEl.innerHTML = '';
        }

        logsEl.scrollTop = logsEl.scrollHeight;
    }

    return {
        init: init,
        addChannelChangeListener: addChannelChangeListener,
        getProgramInfo: getProgramInfo,
        getChannelList: getChannelList,
        getProgramList: getProgramList,
        tune: tune,
        tuneUp: tuneUp,
        tuneDown: tuneDown
    }

}());

function main() {
    log('[TOAST Sample App] onload - [TVChannel]');
    TVtuner.init();
}
