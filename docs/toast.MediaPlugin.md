# Constructor toast.MediaPlugin
toast.MediaPlugin provides the instance that is used to bind to toast.media
This plugin supported special content(adaptive streaming / DRM) playback with option data.
This plugin defines a toast.MediaPlugin Constructor.

## Supported platforms
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
    <td rowspan="2" style="">MEMO</td>
  </tr>
  <tr align="center"><td>Emulator (ver 5.1)</td><td>Device ('12 - '14)</td><td>Emulator (ver 2.3.1)</td><td>Device ('15 - '16)</td><td>Emulator (ver 3.0.0)</td><td>Device ('14 - '16)</td></tr>
  <tr align="center"><td>setOption</td><td>X</td><td>X</td><td>O</td><td>X</td><td>O</td><td>X</td><td>O</td><td>MPEG-DASH is not recommended on webOS.<br>Smooth Streaming is not recommended on webOS.<br>Please refer to the following URL for detail.<br>[Orsay / Tizen](https://www.samsungdforum.com/Tizen/Spec#2016TVSpec)<br>[WebOS](http://developer.lge.com/webOSTV/discover/specifications/webos-tv-platform/supported-media-formats/)
</td></tr>
  <tr align="center"><td>unsetOption</td><td>X</td><td>X</td><td>O</td><td>X</td><td>O</td><td>X</td><td>O</td><td></td></tr>
 </table>

## Full WebIDL
```WebIDL
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
* Throw 
	* throws Error
		* if unknown error occured. 	 

* Examples
	1. Creates MediaPlugin instance.

		```js
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

		```js
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

		```js
		var mediaPlugin = new toast.MediaPlugin()
		mediaPlugin.unsetOption('myKey')
		```

## Examples
* Examples
	1. Basic usage of MediaPluginWideVine which is inherited from MediaPlugin
		* Make a new file.(deviceInfo.js)
		* Set the DRM options in self-invoking function.

			```js
			(function (window) {
				var platform = cordova.require('cordova/platform');	
				
				window.getMediaOption = function(url) {
					var drmOptions = {};
					var customdata;
					switch (platform.id)
					{
						case 'sectv-orsay':
						case 'sectv-tizen':
							drmOptions = {
					            DEVICE_ID : 'myDeviceId', 
					            DEVICET_TYPE_ID : 'myDeviceTypeId', // ex) '60'
					            STREAM_ID : 'myStreamId',
					            DRM_URL : 'http://myDrmUrl.com',
					            I_SEEK : 'myI\_SEEK', // ex) 'TIME'
					            CUR_TIME : 'myCurTime', // ex) 'PTS'
					            PORTAL : 'myPortal',
					            USER_DATA : 'myUserData'
							};
							break;
						case 'tv-webos':
							customdata = '<?xml version="1.0" encoding="utf-8"?>' +
								'<WidevineCredentialsInfo xmlns="http://www.smarttv-alliance.org/DRM/widevine/2012/protocols/">' +
									'<ContentURL>'+ url +'</ContentURL>' +
									'<DeviceID>ab-cd-ef-01-02-03</DeviceID>'+
									'<StreamID>123abc-ab12-1234-abcd-abc123</StreamID>'+
									'<ClientIP>Sample</ClientIP>'+
									'<DRMServerURL>https://drmserver.example.org/drmserver.cgi</DRMServerURL>' +
									'<DRMAckServerURL>https://ackserver.example.org/ack.cgi</DRMAckServerURL>'+
									'<DRMHeartBeatURL>https://heartbeat.example.org/heartbeat.cgi</DRMHeartBeatURL>'+
									'<DRMHeartBeatPeriod>120</DRMHeartBeatPeriod>'+
									'<UserData>SampleUserData</UserData>'+
									'<Portal>Sample (e.g. company name)</Portal>'+
									'<StoreFront>Sample (e.g. company name)</StoreFront>'+
									'<BandwidthCheckURL>none</BandwidthCheckURL>'+
									'<BandwidthCheckInterval>none</BandwidthCheckInterval>'+
								'</WidevineCredentialsInfo>';

							var options = {};
							options.mediaTransportType = "WIDEVINE";
							options.option = {};
							options.option.drm = {};
							options.option.drm.type = "widevine";

							drmOptions = {
								"OPTIONS" : JSON.stringify(options),
								"SOURCE_TYPE": "video/mp4",
								"CUSTOM_DATA" : customdata
							};
						break;
					}
					return drmOptions;
				};
			})(this);
			```
		* Include the new file in index.html.

			```html
				<script src='deviceInfo.js'></script>
			```
		* Use the API.

			```js
				var url = 'http://mydomain.com/video.wvm';

				var mediaIns = toast.Media.getInstance();
				var drmOptions = window.getMediaOption(url);
				var mediaPlugin = new toast.MediaPluginWideVine(wideVineData);

				mediaIns.resetPlugin();
				mediaIns.attachPlugin(mediaPlugin);
				mediaIns.open(url);
			```

	2. Basic usage of MediaPluginPlayReady which is inherited from MediaPlugin
		* Make a new file.(deviceInfo.js)
		* Set the DRM options in self-invoking function.

			```js
			(function (window) {
				var platform = cordova.require('cordova/platform');	
				
				window.getMediaOption = function() {
					var drmOptions = {};
					var customdata;
					switch (platform.id)
					{
						case 'sectv-orsay':
						case 'sectv-tizen':
							drmOptions = {
		            			LicenseServer  : 'myLicenseServer',
		            			CustomData  : 'myCustomData'
							};
							break;
						case 'tv-webos':
							customdata = '<?xml version="1.0" encoding="utf-8"?>' +
								'<PlayReadyInitiator xmlns= "http://schemas.microsoft.com/DRM/2007/03/protocols/">' +
									'<LicenseAcquisition>' +
										'<Header>'+
											'<WRMHEADER xmlns= "http://schemas.microsoft.com/DRM/2007/03/PlayReadyHeader" version="4.0.0.0">'+
												'<DATA>'+
													'<PROTECTINFO>' +
														'<KEYLEN>16</KEYLEN>'+
														'<ALGID>AESCTR</ALGID>'+
													'</PROTECTINFO>'+
													'<LA_URL>http://playready.directtaps.net/pr/svc/rightsmanager.asmx</LA_URL>'+
													'<KID>lFmb2gxg0Cr5bfEnJXgJeA==</KID>'+
													'<CHECKSUM>P7ORpD2IpA==</CHECKSUM>'+
												'</DATA>'+
											'</WRMHEADER>'+
										'</Header>'+
										'<CustomData>AuthZToken XYZ</CustomData>'+
									'</LicenseAcquisition>'+
								'</PlayReadyInitiator>';
							
							var options = {};
							options.option = {};
							options.option.drm = {};
							options.option.drm.type = 'playready';

							drmOptions = {
								OPTIONS : JSON.stringify(options),
								SOURCE_TYPE: 'video/mp4',
								CUSTOM_DATA : customdata
							};
						break;
					}
					return drmOptions;
				};
			})(this);
			```
		* Include the new file in index.html.

			```html
				<script src='deviceInfo.js'></script>
			```
		* Use the API.

			```js
				var mediaIns = toast.Media.getInstance();
				var drmOptions = window.getMediaOption();
				var mediaPlugin = new toast.MediaPluginPlayReady(drmOptions);

				mediaIns.resetPlugin();
				mediaIns.attachPlugin(mediaPlugin);
				mediaIns.open('http://mydomain.com/video.ism/Manifest');
			```

	3. Basic usage of MediaPluginHLS which is inherited from MediaPlugin
		* Make a new file.(deviceInfo.js)
		* Set the DRM options in self-invoking function.

			```js
			(function (window) {
				var platform = cordova.require('cordova/platform');	
				
				window.getMediaOption = function() {
					var drmOptions = {};
					var customdata;
					switch (platform.id)
					{
						case 'sectv-orsay':
						case 'sectv-tizen':
							drmOptions = {
								BITRATES : 'yourBitRates',
								STARTBITRATE : 'yourStartBitRate',
								SKIPBITRATE : 'yourSkipBitRate'
							};
							break;
						case 'tv-webos':					
							var options = {};
							options.option = {};
							options.option.mediaFormat.type = 'audio';

							drmOptions = {
								OPTIONS : JSON.stringify(options),
							};
						break;
					}
					return drmOptions;
				};
			})(this);
			```
		* Include the new file in index.html.

			```html
				<script src='deviceInfo.js'></script>
			```
		* Use the API.

			```js
				var mediaIns = toast.Media.getInstance();
				var drmOptions = window.getMediaOption();
				var mediaPlugin = new toast.MediaPluginHLS(drmOptions);

				mediaIns.resetPlugin();
				mediaIns.attachPlugin(mediaPlugin);
				mediaIns.open('http://mydomain.com/video.m3u8');
			```

	4. Basic usage of MediaPluginUHD which is inherited from MediaPlugin

		```js
			var mediaIns = toast.Media.getInstance();

			var mediaPlugin = new toast.MediaPluginUHD();

			mediaIns.resetPlugin();
			mediaIns.attachPlugin(mediaPlugin);
			mediaIns.open('http://mydomain.com/video.mp4');
		```

## See others
[toast.Media](toast.Media.md)
