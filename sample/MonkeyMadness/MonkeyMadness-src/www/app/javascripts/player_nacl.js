/**
 *	Generate a "Player_NaCl"
 *	@param {function onMessage} Function to receive the message sent from NaCl
 *  @param {string} path Path when the sounds are located.
 *	@author Gerardo Reyes, g.reyes@samsung.com
 *  Note: This player only play ogg files.
 *  	The current path of the audio files is the root.
 */

function Player_NaCl (onMessage, path) {
	var p = false;
	var soundList = [ ];
	var self = this;
	var callback = false;
	var path = path || '';
	var index = 0;
    /**
     * @constructor
     */
	(function (onMessage){
		if (!document.getElementById("Player_NaCl")) {
			var newElement = document.createElement("embed");
			newElement.setAttribute('id',"Player_NaCl");
			newElement.setAttribute('width',0);
			newElement.setAttribute('height',0);
			newElement.setAttribute('style','position:absolute; z-index:-1000');
			newElement.setAttribute('src','nacl/Player.nmf');
			newElement.setAttribute('type','application/x-nacl');
			var body = document.getElementsByTagName('body')[0];
			body.appendChild(newElement);

			p = document.getElementById("Player_NaCl");
			callback = onMessage || callback;
			p.addEventListener('message', onMessageReceived, true);
		}
	})(onMessage);
	/**
     * Load all sounds in the list.
	 * @param  {Array} array Sounds list.
	 */
	this.load = function (array) {
		if (typeof array === "object") {
			soundList = array;
			loadIndex();
		}
	}
	/**
     * Send each sound that will be loaded for native client.
	 */
	function loadIndex () {
		if (index < soundList.length)
			sendMessage("load", path + soundList[index]);
		else
			onMessageReceived({data:"All sounds loaded"});
	}
	/**
     * Notifies to native client the sound that will be played.
	 * @param  {number} index Index the sound in the array.
	 * @param  {boolean} loop If the sound is gonna be played always loop is true.
	 */
	this.play = function (index,loop) {
		loop = loop || false;
		if (typeof index === "string")
			index = exist(index)
		if (index < 0)
			console.log("Sound doesn't exist");
		else
			sendMessage("play",index,loop);
	}
	/**
     * Notifies to native client which sound is gonna stop.
	 * @param  {number} index
	 */
	this.stop = function (index) {
		if (typeof index === "string")
			index = exist(index);
		if (index < 0)
			console.log("Sound doesn't exist");
		else
			sendMessage("stop",index);

	}
	/**
     * Stop all current sounds.
	 */
	this.stopAll = function () {
		sendMessage("stopAll",'all');
	}
	/**
     * Sends the gain value to native client.
	 * @param  {number} index Index of the sound in the list.
	 * @param  {number} value Gain value.
	 */
	this.gain = function (index,value) {
		if (value < 0 || value > 1)
			console.log("Gain error. Min:0, Max:1");
		else {
			if (typeof index === "string")
				index = exist(index);
			if (index < 0)
				console.log("Sound doesn't exist");
			else
				sendMessage("gain",index,value);
		}
	}
	/**
     * Send size to native client.
	 */
	this.listSize = function () {
		sendMessage("listSize",'size');
	}
    /**
     * Order the list on native client.
     */
	this.listOrder = function () {
		sendMessage("listOrder",'order');
	}
    /**
     * Set a specific call back for received messages.
     */
	this.setCallback = function (data) {
		callback = data;
	}
	/**
     * Change root path of the sounds list.
	 * @param  {string} dir New path.
	 */
	this.changePath = function (dir) {
		if (typeof dir === "string"){
			if (dir[0] == '/')
				dir = dir.slice(1,dir.lenght)
			if (dir[dir.length -1 ] != "/")
				dir = dir + "/"
			path = dir;
		}
		else
			console.log("Needs the new path");
	}
	/**
	 * @param  {string} name Name of the song.
     * @return {number} Index of the sound if exists else -1.
	 */
	function exist (name) {
		return soundList.indexOf(name);
	}
	/**
     * Send a JSON object in string format to the native client.
	 * @param  {string} action Action to do.
	 * @param  {Object} data Data to the native client.
	 * @param  {boolean|number} value True/false for loop or gain value for the sound.
	 */
	function sendMessage (action, data, value) {
		var send = false;
		switch (action) {
			case 'loadList':
				send = data;
			break;
			case 'load':
				send = data;
			break;
			case 'play':
				send = {index: data, loop: value };
			break;
			case 'stop':
				send = data;
			break;
			case 'stopAll':
				send = data;
			break;
			case 'gain':
				send = { index: data, value: value };
			break;
			case 'listSize':
				send = data;
			break;
			case 'listOrder':
				send = data;
			break;
			case 'changePath':
				send = data;
			break;
		}
		if (send && p.postMessage) {
			var json = { action: action, data:send };
			json = JSON.stringify(json);
			p.postMessage(json);
		}
	}
	/**
     * Runs an action depending the message received by the native client.
	 * @param  {string} message Message received by the native client.
	 */
	function onMessageReceived (message) {
		if (message.data.indexOf("maybe the current path is wrong") > -1)
			soundList.pop();
		if (typeof callback === "function")
			callback(message.data);
		if (message.data.indexOf("Sound loaded") > -1) {
			index++;
			loadIndex();
		}

	}
}