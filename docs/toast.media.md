# toast.Media
toast.Media play back video or audio files on a device.

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
		void play(DOMString mediaUrl) raises(Error);
		void stop() raises(Error);
		void pause() raises(Error);
		void seekTo(long msPosition) raises(Error);
		long getDuration() raises(Error);
		long getCurrentPosition() raises(Error);
		long setListener(MediaEventListener listener) raises(Error);
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

	dictionary MediaEventData {
		MediaState state;
		long duration;
		long position;
		long bufferingPercentage;
	};
};
```

## APIs
* {{Property Signature}}
{{Description}}
	* Examples
		1. {{Example_Desc_1}}
			```javascript
			{{Example_Code_1}}
			```

* {{Method Signature}}
provides global namespace named "toast" to provide APIs for TV application.
Every toast APIs will be appended to this namespace.
	* Parameters
	* Return value
	* Exceptions
		* {{Exception}}
			* if {{something wrong...}}
	* Examples
		1. {{description}}
			```javascript
			{{example_code}}
			```

## See others
toast.application
toast.drminfo
toast.inputdevice
toast.media
toast.tvaudiocontrol
toast.tvchannel
toast.tvwindow
