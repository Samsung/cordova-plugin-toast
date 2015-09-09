# Constructor toast.Media
toast.Media play back video or audio files.

## Supported platforms
* browser
* sectv-orsay
* sectv-tizen

## Full WebIDL
```widl
module Media {
	enum MediaEventType {"STATE", "DURATION", "POSITION", "BUFFERINGPROGRESS"};
	enum MediaState {"IDLE", "PLAYING", "PAUSED", "SEEK"};

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
	};
};
```

## APIs
### [Constructor()] interface Media
Media constructor provides media player APIs.
The Media's instance can be created with `getInstance` method which creates singleton instance. Creating an instance with `new` keyword is not allowed and InternalError will be thrown.
* Examples
	1. Creates media instance to play back.
		```javascript
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
		```javascript
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
		```javascript
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
		```javascript
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
		```javascript
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
		```javascript
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

## Examples
1. Basic usage to play back an Audio file
```javascript
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
				case "BUFFERINGPROGRESS"
					console.log("Media buffering in progress: " + evt.data.bufferingPercentage + "%");
					if(evt.data.bufferingPercentage >= 100) {
						console.log("Buffering completed");
					}
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
```javascript
device.addEventListener('deviceready', function () {
	// ... Please refer to "Basic usage to play back an Audio" for basic media key handling.

	media.open('http://mydomain.com/video.mp4');

	// Play the video in full screen.
	var elContainer = media.getContainerElement();
	// Video will be rendered in the container element. You can change the rect of video by changing the container's style.
	// Before you change the container's style, the video will not be rendered on a screen, but its sound will be played in backgrond.

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

	// now, start play back!
	media.play();
});
```

## See others
toast.drminfo
toast.application