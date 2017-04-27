# Constructor toast.billing
toast.billing provides billing APIs.

## Supported platforms
* sectv-tizen (sectv-tizen)
    * Privilege http://developer.samsung.com/privilege/productinfo must be declared in the config.xml of tizen package.
    * Privilege http://developer.samsung.com/privilege/sso.partner must be declared in the config.xml of tizen package.
    * Privilege http://developer.samsung.com/privilege/billing must be declared in the config.xml of tizen package.

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
 module Billing {
     [NoInterfaceObject] interface BillingManagerObject {
         readonly attribute BillingManager billing;
     };
     Toast implements BillingManagerObject;

     [NoInterfaceObject] interface BillingManager {
         void init(BillingInitialInfo billingInitInfo, SuccessCallback successCallback, optional ErrorCallback? errorCallback);
         void buyProduct(BillingBuyInfo billingBuyInfo, BillingBuyInfoCallback successCallback, optional ErrorCallback? errorCallback);
         void cancelSubscription(BillingCancelInfo billingCancelInfo, BillingCancelInfoCallback successCallback, optional ErrorCallback? errorCallback);
         void checkPurchaseStatus(BillingPurchaseStatusInfo billingPurchaseStatusInfo, BillingPurchaseStatusCallback successCallback, optional ErrorCallback? errorCallback);
         void requestPurchasesList(BiilingReqPurchasesListInfo billingReqPurchasesListInfo, BillingReqPurchasesListCallback successCallback, optional ErrorCallback? errorCallback);
         void requestProductsList(BillingReqProductsListInfo billingReqProductsListInfo, BillingReqProductsListCallback successCallback, optional ErrorCallback? errorCallback);
         void verifyPurchase(BillingVerifyPurchaseInfo billingVerifyPurchaseInfo, BillingVerifyPurchaseCallback successCallback, optional ErrorCallback? errorCallback);
         void applyProduct(BillingApplyProductInfo billingApplyProductInfo, BillingApplyProductCallback successCallback, optional ErrorCallback? errorCallback);
     };

     [NoInterfaceObject] interface BillingInitialInfo {
         readonly attribute BillingKeyType key;
         readonly attribute string appId;
         readonly attribute string countryCode;
         readonly attribute string containerId;
         readonly attribute string lang;
         readonly attribute string gaWebPropertyId;
         readonly attribute string serverType;
     };

     [NoInterfaceObject] interface BillingBuyInfo {
         readonly attribute BillingKeyType key;
         readonly attribute string appId;
         readonly attribute string countryCode;
         readonly attribute string containerId;
         readonly attribute string lang;
         readonly attribute string gaWebPropertyId;
         readonly attribute string serverType;
     };

     [NoInterfaceObject] interface BillingCancelInfo {
         readonly attribute string productId;
         readonly attribute string userId;
         readonly attribute string invoiceId;
     };

     [NoInterfaceObject] interface BillingPurchaseStatusInfo {
         readonly attribute string productId;
         readonly attribute string userId;
     };

     [NoInterfaceObject] interface BiilingReqPurchasesListInfo {
         readonly attribute string itemType;
         readonly attribute number pageNumber;
     };

     [NoInterfaceObject] interface BillingReqProductsListInfo {
         readonly attribute string itemType;
         readonly attribute number pageNumber;
     };

     [NoInterfaceObject] interface BillingVerifyPurchaseInfo {
         readonly attribute string invoiceId;
     };

     [NoInterfaceObject] interface BillingApplyProductInfo {
         readonly attribute string invoiceId;
     };

     [Callback = FunctionOnly, NoInterfaceObject] interface BillingBuyInfoCallback {
         void onsuccess(BillingBuySuccessCallbackInfo billingInfo);
     };

     [Callback = FunctionOnly, NoInterfaceObject] interface BillingCancelInfoCallback {
         void onsuccess(BillingCancelSuccessCallbackInfo billingInfo);
     };

     [Callback = FunctionOnly, NoInterfaceObject] interface BillingPurchaseStatusCallback {
         void onsuccess(billingPurchaseStatusCallbackInfo billingInfo);
     };  

     [Callback = FunctionOnly, NoInterfaceObject] interface BillingReqPurchasesListCallback {
         void onsuccess(BillingReqPurchasesListCallbackInfo billingInfo);
     };   

     [Callback = FunctionOnly, NoInterfaceObject] interface BillingReqPurchasesListCallback {
         void onsuccess(BillingReqProductsListCallbackInfo billingInfo);
     };

     [Callback = FunctionOnly, NoInterfaceObject] interface BillingVerifyPurchaseCallback {
         void onsuccess(BillingVerifyPurchaseCallbackInfo billingInfo);
     };

     [Callback = FunctionOnly, NoInterfaceObject] interface BillingApplyProductCallback {
         void onsuccess(BillingApplyProductCallbackInfo billingInfo);
     };     
 };
 ```

## APIs
### void init(BillingInitialInfo billingInitInfo, SuccessCallback successCallback, optional ErrorCallback? errorCallback);
Initialization for using the billing module.
* Parameters
	* billingInitInfo: Object for configuring the billing module.
    * successCallback: The method to call when initialization is done successfully.
    * errorCallback: The method to invoke when an error occurs.
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
* Examples

		```js
        toast.billing.init({
            key: {
                paymentwallKey: 'YOUR_PROJECT_KEY'
                checkoutKey: 'YOUR_PROJECT_KEY'
            },
            appId: 'YOUR_APP_ID',
            serverType: 'DUMMY' // 'DEV' 'PRD'
            countryCode: 'US',
            containerId: 'my-div',
            lang: 'en',
            gaWebPropertyId: 'UA-XXXX-Y',

        }, successCallback, errorCallback);
		```

### void buyProduct(BillingBuyInfo billingBuyInfo, BillingBuyInfoCallback successCallback, optional ErrorCallback? errorCallback)
It is in order to make the purchase of paid item.
* Parameters
	* billingBuyInfo : Object for buying the product.
    * successCallback: The method to call when buy the product successfully.
    * errorCallback: The method to invoke when an error occurs.
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
* Examples
	1. Call the buyProduct API

		```js
        toast.billing.buyProduct({
            productId: 'YOUR_PRODUCT_ID',
            productName: 'YOUR_PRODUCT_NAME',
            currency: 'USD',
            amount: '1',
            period: 'month',
            userId: 'YOUR_USER_ID',
            onExit: function () {},
            showBackButton: false,
            enablePaymentRecoverFlow: false,
            titles: {},
            orderId: 'YOUR_ODER_ID',
            orderItemPath: 'YOUR_ODER_ITEM_PATH'
        }, successCallback, errorCallback);
		```

### void cancelSubscription(BillingCancelInfo billingCancelInfo, BillingCancelInfoCallback successCallback, optional ErrorCallback? errorCallback)
Cancel for the registration made for subscription.
* Parameters
	* billingCancelInfo : Object for cancel the product.
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
* Examples
	1. Call the cancelSubscription API

		```js
        toast.billing.cancelSubscription({
            productId: 'YOUR_PRODUCT_ID',
            userId: 'YOUR_USER_ID',
            invoiceId: 'YOUR_INVOICE_ID'
        }, successCallback, errorCallback);
		```

### void checkPurchaseStatus(BillingPurchaseStatusInfo billingPurchaseStatusInfo, BillingPurchaseStatusCallback successCallback, optional ErrorCallback? errorCallback)
If you would like to first check if the product has already been purchased, you can use checkPurchaseStatus API
* Parameters
	* billingPurchaseStatusInfo : Object for getting the purcase status
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
* Examples
	1. Call the checkPurchaseStatus API
		```js
        toast.billing.checkPurchaseStatus({
            productId: 'YOUR_PRODUCT_ID',
            userId: 'YOUR_USER_ID'
        }, successCallback, errorCallback);
		```

### void requestPurchasesList(BiilingReqPurchasesListInfo billingReqPurchasesListInfo, BillingReqPurchasesListCallback successCallback, optional ErrorCallback? errorCallback)
Request the list of purchased items for a specific user.
* Parameters
	* billingReqPurchasesListInfo: Object for getting the purchases List for a specific user.
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
* Examples
	1. Call the requestPurchasesList API

		```js
        toast.billing.requestPurchasesList({
            itemType: '2',
            pageNumber: 1
        }, successCallback, errorCallback);
		```
### void requestProductsList(BillingReqProductsListInfo billingReqProductsListInfo, BillingReqProductsListCallback successCallback, optional ErrorCallback? errorCallback)
Request products information.
* Parameters
	* billingReqProductsListInfo: Object for getting the products list.
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
* Examples

	```js
    toast.billing.requestProductsList({
        pageSize: 1,
        pageNumber: 1
    })
	```
### void verifyPurchase(BillingVerifyPurchaseInfo billingVerifyPurchaseInfo, BillingVerifyPurchaseCallback successCallback, optional ErrorCallback? errorCallback)
To check whether a purchase corresponding to the requested invoiceId was successful or not.
* Parameters
	* billingVerifyPurchaseInfo:
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
* Examples

	```js
    toast.billing.verifyPurchase({
        invoiceId: 'YOUR_INVOICE_ID'
    }, successCallback, errorCallback);
	```

### void applyProduct(BillingApplyProductInfo billingApplyProductInfo, BillingApplyProductCallback successCallback, optional ErrorCallback? errorCallback)
The DPI is notified that the purchased product has been successfully applied to the app.
* Parameters
	* billingApplyProductInfo: Object for getting the products list.
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
* Examples

	```js
    toast.billing.verifyPurchase({
        invoiceId: 'YOUR_INVOICE_ID'
    }, successCallback, errorCallback);
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
							if(evt.data.oldState != 'STALLED' && evt.data.state == 'STALLED'){
                        		document.getElementById('log').innerHTML = 'Buffering is started';
                    		}
                    		else if(evt.data.oldState == 'STALLED' && evt.data.state != 'STALLED'){
                        		document.getElementById('log').innerHTML = 'Buffering is ended';
                    		}
							break;
						case "DURATION":
							console.log("Media duration updated: " + evt.data.duration + "ms");
							break;
						case "POSITION":
							console.log("Media position updated: " + evt.data.position + "ms");
							break;
						case "BUFFERINGPROGRESS":
							console.log("Media buffering in progress: " + evt.data.bufferingPercentage + "%");
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
