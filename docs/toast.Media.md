# Constructor toast.Media
toast.Media play back video or audio files.

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
  <tr align="center"><td>getInstance</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>open</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>play</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>stop</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>pause</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>seekTo</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>getDuration</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>getCurrentPosition</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>setListener</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>unsetListener</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>getContainerElement</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>setSubtitlePath</td><td>X</td><td>O</td><td>O</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>getSubtitleLanguageList</td><td>X</td><td>O</td><td>O</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>setSubtitleLanguage</td><td>X</td><td>O</td><td>O</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>setSubtitleSync</td><td>X</td><td>O</td><td>O</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>syncVideoRect</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>resetPlugin</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
  <tr align="center"><td>attachPlugin</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
 </table>

## Full WebIDL
```WebIDL
module Media {
	enum MediaEventType {"STATE", "DURATION", "POSITION", "BUFFERINGPROGRESS", "SUBTITLE", "ENDED"};
	enum MediaState {"IDLE", "PLAYING", "PAUSED", "STALLED", "SEEK"};

	[Constructor()]
	interface Media {
		static Media getInstance();
		void open(DOMString mediaUrl) raises(Error);
		void play() raises(Error);
		void stop() raises(Error);
		void pause() raises(Error);
		void seekTo(long msPosition) raises(Error);
		long getDuration() raises(Error);
		long getCurrentPosition() raises(Error);
		long setListener(MediaEventListener listener) raises(Error);
		long unsetListener();
		DOMElement getContainerElement();
		void setSubtitlePath(DOMString subtitlePath) raises(Error);;
		DOMString[] getSubtitleLanguageList() raises(Error);
		void setSubtitleLanguage(DOMString language) raises(Error);
		void setSubtitleSync(long syncValue) raises(Error);
		void syncVideoRect();
		void resetPlugin();
		void attachPlugin(MediaPlugin plugin);
	};
	[Callback, NoInterfaceObject] interface MediaEventListener {
		void onevent(MediaEvent mediaEvent);
		void onerror(MediaError mediaError);
	};

	callback MediaEventCallback = void (MediaEvent mediaEvent);

	[NoInterfaceObject] interface MediaEvent {
		MediaEventType type;
		MediaEventData data;
	};
	[NoInterfaceObject] interface MediaError {
		MediaErrorType type;
		any? data;
	};

	dictionary MediaEventData {
		MediaState? state;
		MediaState? oldState;
		long? duration;
		long? position;
		long? bufferingPercentage;
		DOMString? text;
	};
};
```

## APIs
### [Constructor()] interface Media
Media constructor provides media player APIs.
The Media's instance can be created with `getInstance` method which creates singleton instance. Creating an instance with `new` keyword is not allowed and InternalError will be thrown.
* Throw
	* throws TypeError
		* if the constructor is invoked with `new` keyword.
	* throws Error
		* if unknown error occured.
* Examples
	1. Creates media instance to play back.

		```js
		var media = toast.Media.getInstance();
		```

### void open(DOMString mediaUrl)
Load the media at given url and prepare the playback. Media state is remained to "IDLE".
* Parameters
	* mediaUrl: path to media. local or remote path.
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
	* throws RangeError
		* if given value is not in the set or range of allowed values.
	* throws Error
		* if unknown error occured.
* Examples
	1. Open an media file

		```js
		var media = toast.Media.getInstance();
		media.open('http://mydomain.com/1.mp3');
		```

### void play()
Start playback of currently loaded media. If the playback is succeded, Media state is changeded to "PLAYING".
* Parameters
	N/A
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
	* throws Error
		* if unknown error occured.
* Examples
	1. Open an media file and start playback

		```js
		var media = toast.Media.getInstance();
		media.open('http://mydomain.com/1.mp3');
		media.play();
		```

### void stop()
Stop playback and back to `IDLE` status.
* Parameters
	N/A
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
	* throws Error
		* if unknown error occured.
* Examples
	1. Stop the playback when user press STOP key

		```js
		var media = toast.Media.getInstance();
		media.open('http://mydomain.com/1.mp3');
		media.play();

		function onKeyDown(e) {
			if(e.keyCode === tvKeyCode.MediaStop) {
				media.stop();
			}
		}
		```

### void pause()
Pause the playback and back to `PAUSED` status.
* Parameters
	N/A
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
	* throws Error
		* if unknown error occured.
* Examples
	1. Pause the playback when user press PAUSE key

		```js
		var media = toast.Media.getInstance();
		media.open('http://mydomain.com/1.mp3');
		media.play();

		function onKeyDown(e) {
			if(e.keyCode === tvKeyCode.MediaPause) {
				media.pause();
			}
		}
		```

### void seekTo(long msPosition)
Move the playback position to given position.
The media status is not changed. (Remained as paused if this operation is invoked when the status is `PAUSED`.)
* Parameters
	* msPosition: position to seek in milliseconds.
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
	* throws RangeError
		* if given value is not in the set or range of allowed values. (0 ~ duration)
	* throws Error
		* if unknown error occured.
* Examples
	1. Move 10 seconds forward or backward when user press Foward and Backward key

		```js
		var media = toast.Media.getInstance();
		media.open('http://mydomain.com/1.mp3');
		media.play();

		function onKeyDown(e) {
			switch(e.keyCode) {
				case tvKeyCode.MediaFastForward:
					var curPos = media.getCurrentPosition();
					media.seekTo(curPos + 10000);	// in milliseconds
					break;
				case tvKeyCode.MediaBackward:
					var curPos = media.getCurrentPosition();
					media.seekTo(curPos - 10000);	// in milliseconds
					break;
			}
		}
		```

### void setSubtitlePath(DOMString subtitlePath)
Set the subtitle path to given path.
A valid state of its method, is after the IDEL state(after open method)
* Parameters
	* subtitlePath: path to subtitle. local or remote path.
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
	* throws Error
		* if unknown error occured.
* Examples

		```js
		var media = toast.Media.getInstance();

		media.setListener({
			onevent: function (evt) {
				switch(evt.type) {
					case "STATE":
						console.log("Media State changed: " + evt.data.oldState + " -> " + evt.data.state);
						break;
					case "DURATION":
						console.log("Media duration updated: " + evt.data.duration + "ms");
						break;
					case "POSITION":
						console.log("Media position updated: " + evt.data.position + "ms");
						break;
					case "BUFFERINGPROGRESS":
						console.log("Media buffering in progress: " + evt.data.bufferingPercentage + "%");
						if(evt.data.bufferingPercentage >= 100) {
							console.log("Buffering completed");
						}
						break;
					case "SUBTITLE":
						console.log("Media subtitle text: " + evt.data.text);
						break;
					case "ENDED":
						console.log("Media ended");
						break;
				}
			},
			onerror: function (err) {
				console.error("MediaError occured: " + JSON.stringify(err));
			}
		});

		media.open('http://mydomain.com/1.mp3');
		media.setSubtitlePath('http://mydomain.com/1.smi');

		```
		
### void syncVideoRect();
Synchronize videoRect with container element. This function references the style property of container element which is obtained by `getContainerElement` function.

 :red_circle: In 2013's `sectv-orsay` platform, This function MUST be called when you change the container element's position or size.

  Platform      | Product Year  | Calling this API needed 
 ---------------|---------------|------------------------
  sectv-orsay   | 2013 or older | Mandatory              
  sectv-orsay   | 2014          | Optional               
  sectv-tizen   | 2015 or later | Optional
  tv-webos      | 2014 or later | Optional               
  browser       |               | Optional               

* Parameters
	N/A
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
	* throws Error
		* if unknown error occured.
* Examples

	```js
	var media = toast.Media.getInstance();
	var elContainer = media.getContainerElement();

	//Let's set the render area to full screen.
	elContainer.style.position = 'fixed';
	elContainer.style.left = 0;
	elContainer.style.top = 0;
	elContainer.style.width = window.innerWidth;
	elContainer.style.height = window.innerHeight;
	document.body.appendChild(elContainer);

	//synchronize VideoRect With Container Element
	media.syncVideoRect();

	```

### void resetPlugin();
Clear attached plugins to the Media instance.
* Parameters
	N/A
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
	* throws Error
		* if unknown error occured.

### void attachPlugin(MediaPlugin plugin);
Attache the given plugin instance to the Media instance. This will be affect to playback of content invoking some additional API
* Parameters
	* plugin: MediaPlugin instance to attach.
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
	* throws Error
		* if unknown error occured.
* Examples
	1. clear the plugins and attach new plugin

		```js
		var media = toast.Media.getInstance();
		var plWideVine = toast.MediaPluginWideVine(options);
		media.resetPlugin();
		media.attachPlugin(plWideVine);
		media.open('http://mydomain.com/1.mp3');
		media.play();
		...

		```

## Examples
* Examples
	1. Basic usage to play back an Audio file

		```js
		device.addEventListener('deviceready', function () {
			var media, tvKeyCode;
			function onKeyDown(e) {
				switch(e.keyCode) {
					case tvKeyCode.MediaPlay:
						media.play();
						break;
					case tvKeyCode.MediaPause:
						media.pause();
						break;
					case tvKeyCode.MediaFastForward:
						var curPos = media.getCurrentPostion();
						media.seekTo(curPos + 10000);	// +10 seconds
						break;
					case tvKeyCode.MediaRewind:
						var curPos = media.getCurrentPostion();
						media.seekTo(curPos - 10000);	// -10 seconds
						break;
					case tvKeyCode.MediaStop:
						media.stop();
						break;
					case tvKeyCode.Return:
						toast.application.exit();
						break;
				}
			}
			window.addEventListener('keydown', onKeyDown);
			toast.inputdevice.getSupportedKeys(function (keys) {
				for(var i=0, len=keys.length; i<keys.length; i++) {
					tvKeyCode[keys[i].name] = keys[i].code;
					if(['MediaPlay', 'MediaPause', 'MediaFastForward', 'MediaRewind', 'MediaStop'].indexOf(keys[i].name) >= 0) {
						toast.inputdevice.registerKey(keys[i].name);
					}
				}
			});

			var media = toast.Media.getInstance();
			media.setListener({
				onevent: function (evt) {
					switch(evt.type) {
						case "STATE":
							console.log("Media State changed: " + evt.data.oldState + " -> " + evt.data.state);
							break;
						case "DURATION":
							console.log("Media duration updated: " + evt.data.duration + "ms");
							break;
						case "POSITION":
							console.log("Media position updated: " + evt.data.position + "ms");
							break;
						case "BUFFERINGPROGRESS":
							console.log("Media buffering in progress: " + evt.data.bufferingPercentage + "%");
							if(evt.data.bufferingPercentage >= 100) {
								console.log("Buffering completed");
							}
							break;
						case "ENDED":
							console.log("Media ended");
							break;
					}
				},
				onerror: function (err) {
					console.error("MediaError occured: " + JSON.stringify(err));
				}
			});
			media.open('http://mydomain.com/audio.mp3');
			media.play();
		});
		```

	2. Basic usage to play back a Video file

		```js
		device.addEventListener('deviceready', function () {
			// ... Please refer to "Basic usage to play back an Audio" for basic media key handling.

			media.open('http://mydomain.com/video.mp4');

			// Getting container element which is used for displaying the video.
			// Video will be rendered in the container element. You can change the rect of video by changing the container's style.
			// Before you change the container's style, the video will not be rendered on a screen, but its sound will be played in backgrond.
			var elContainer = media.getContainerElement();

			// OPTION 1: Let's set the render area to full screen.
			elContainer.style.position = 'fixed';
			elContainer.style.left = 0;
			elContainer.style.top = 0;
			elContainer.style.width = window.innerWidth;
			elContainer.style.height = window.innerHeight;
			document.body.appendChild(elContainer);
			
			// OPTION 2: Instead of attaching the container to body,
			//           you can append the 'elContainer' to any other DOM element to show the video in partial screen like below:
			var elPlayer = document.querySelecter(".videoplayer")
			elContainer.className = 'renderarea';	// .renderarea style could be pre-defined with CSS.
			elPlayer.appendChild(elContainer);

			// OPTION others...
			// you can handle the container to show the video with any styles.
			// The position will be calculated and the video will be displayed in the container.

			// now, start play back!
			media.play();
		});
		```

## See others
[toast.drminfo](toast.drminfo.md)
[toast.application](toast.application.md)
