# Constructor toast.MediaPlugin
toast.MediaPlugin provides the instance that is used to bind to toast.media

This plugin supported special content(adaptive streaming / DRM) playback with option data.

This plugin defines a toast.MediaPlugin Constructor.

## Supported platforms
* sectv-orsay
* sectv-tizen

## Full WebIDL
```widl
module MediaPlugin {

	[Constructor(object option)]
	interface MediaPlugin {
		void setOption (DOMString key, DOMString value);
		void unsetOption (DOMString key);
	};
};
```

## APIs
### [Constructor(object option)] interface MediaPlugin
MediaPlugin constructor bind to toast.media with option data to be able to playback special content.

* Examples
	1. Creates MediaPlugin instance.
		```javascript
		var mediaPlugin = new toast.MediaPlugin();
		```

### void setOption(DOMString key, DOMString value)
Set the option in Media plugin.
* Parameters
	* key: property of option object.
	* value : data value of option object.
* Return value
	N/A
* Examples
	1. Open an media file
		```javascript
		var mediaPlugin = new toast.MediaPlugin()
		mediaPlugin.setOption('myKey','mydata')
		```

### void unsetOption(DOMString key)
Unset the option in Media plugin.
* Parameters
	* key: property of option object.
* Return value
	N/A
* Examples
	1. Open an media file
		```javascript
		var mediaPlugin = new toast.MediaPlugin()
		mediaPlugin.unsetOption('myKey')
		```

## Examples
1. Basic usage of MediaPluginWideVine which is inherited from MediaPlugin
```javascript
		var mediaIns = toast.Media.getInstance();
		var wideVineData = {
			DEVICE_ID : 'myDeviceId', 
			DEVICET_TYPE_ID : 'myDeviceTypeId', // ex) '60'
			STREAM_ID : 'myStreamId',
			DRM_URL : 'http://myDrmUrl.com',
			I_SEEK : 'myI\_SEEK', // ex) 'TIME'
			CUR_TIME : 'myCurTime', // ex) 'PTS'
			PORTAL : 'myPortal',
			USER_DATA : 'myUserData',
		};

		var mediaPlugin = new toast.MediaPluginWideVine(wideVineData);

		mediaIns.resetPlugin();
		mediaIns.attachPlugin(mediaPlugin);
		mediaIns.open('http://mydomain.com/video.wvm');
```

2. Basic usage of MediaPluginPlayReady which is inherited from MediaPlugin
```javascript
		var mediaIns = toast.Media.getInstance();
		var playReadyData = {
			LicenseServer  : 'myLicenseServer',
			CustomData  : 'myCustomData'
		};

		var mediaPlugin = new toast.MediaPluginPlayReady(playReadyData);

		mediaIns.resetPlugin();
		mediaIns.attachPlugin(mediaPlugin);
		mediaIns.open('http://mydomain.com/video.ism/Manifest');
```

3. Basic usage of MediaPluginHLS which is inherited from MediaPlugin
```javascript
		var mediaIns = toast.Media.getInstance();
		var HLSData = {
			BITRATES : 'yourBitRates',
			STARTBITRATE : "yourStartBitRate",
			SKIPBITRATE : "yourSkipBitRate"
		};

		var mediaPlugin = new toast.MediaPluginHLS(HLSData);

		mediaIns.resetPlugin();
		mediaIns.attachPlugin(mediaPlugin);
		mediaIns.open('http://mydomain.com/video.m3u8');
```

4. Basic usage of MediaPluginUHD which is inherited from MediaPlugin
```javascript
		var mediaIns = toast.Media.getInstance();

		var mediaPlugin = new toast.MediaPluginUHD();

		mediaIns.resetPlugin();
		mediaIns.attachPlugin(mediaPlugin);
		mediaIns.open('http://mydomain.com/video.mp4');
```

## See others
toast.Media
