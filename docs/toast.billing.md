# Constructor toast.billing
toast.billing provides billing APIs.

## Supported platforms
* sectv-tizen (sectv-tizen)
    * Privileges must be declared in the config.xml of tizen package.       
        * http://developer.samsung.com/privilege/productinfo
        * http://developer.samsung.com/privilege/sso.partner
        * http://developer.samsung.com/privilege/billing
    * For using the billing module, you should learn the billing process through refering to the [Samsung Developers Site](http://developer.samsung.com/tv/develop/tutorials/samsung-checkout).

<table>
  <tr align="center">
    <td rowspan="2" style="">Method Name</td>
    <td rowspan="2" style="">Browser</td>
    <td colspan="2" style="">Legacy Samsung Smart TV</td>
    <td colspan="2" style="">Tizen Samsung Smart TV</td>
    <td colspan="2" style="">WebOS LG Smart TV</td>
  </tr>
  <tr align="center"><td>Emulator (ver 5.1)</td><td>Device ('12 -'14)</td><td>Emulator (ver 2.3.1)</td><td>Device ('15 -'16)</td><td>Emulator (ver 3.0.0)</td><td>Device ('14 -'16)</td></tr>
  <tr align="center"><td>init</td><td>X</td><td>X</td><td>TBD</td><td>X</td><td>O</td><td>X</td><td>TBD</td></tr>
  <tr align="center"><td>buyProduct</td><td>X</td><td>X</td><td>TBD</td><td>X</td><td>O</td><td>X</td><td>TBD</td></tr>
  <tr align="center"><td>cancelSubscription</td><td>X</td><td>X</td><td>TBD</td><td>X</td><td>O</td><td>X</td><td>TBD</td></tr>
  <tr align="center"><td>checkPurchaseStatus</td><td>X</td><td>X</td><td>TBD</td><td>X</td><td>O</td><td>X</td><td>TBD</td></tr>
  <tr align="center"><td>requestPurchasesList</td><td>X</td><td>X</td><td>X</td><td>X</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>requestProductsList</td><td>X</td><td>X</td><td>X</td><td>X</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>verifyPurchase</td><td>X</td><td>X</td><td>X</td><td>X</td><td>O</td><td>X</td><td>X</td></tr>
  <tr align="center"><td>applyProduct</td><td>X</td><td>X</td><td>X</td><td>X</td><td>O</td><td>X</td><td>X</td></tr>
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

    <table>
     <tr align="center">
       <td rowspan="2" style="">Parameter</td>
       <td rowspan="2" style="">Required</td>
       <td rowspan="2" style="">Type</td>
       <td rowspan="2" style="">Description</td>
       <td colspan="2" style="">Influenced Module</td>
     </tr>
     <tr align="center"><td>PaymentWall</td><td>CheckOut</td></tr>
     <tr align="center"><td>key</td><td>true</td><td>Object</td><td align="left">Your Project Key</td><td>O</td><td>O</td></tr>
     <tr align="center"><td>appId</td><td>true</td><td>String</td><td align="left">It provided by Samsung Seller Site</td><td>X</td><td>O</td></tr>
     <tr align="center"><td>countryCode</td><td>false</td><td>String</td><td align="left">Country code in ISO alpha-2 format(e.g. "KR" or "JP")</td><td>O</td><td>X</td></tr>
     <tr align="center"><td>containerId</td><td>false</td><td>String</td><td align="left">ID of the DOM element to append Smart TV form to specific place in the app</td><td>O</td><td>X</td></tr>
     <tr align="center"><td>lang</td><td>false</td><td>String</td><td align="left">ISO 2 Letter code of the language to localizae the payment form(e.g. "KO"or "JA"</td><td>X</td><td>O</td></tr>
     <tr align="center"><td>gaWebPropertyId</td><td>false</td><td>String</td><td align="left">Web property ID listed in the management interface within Goole Analytics</td><td>O</td><td>X</td></tr>     
     <tr align="center"><td>serverType</td><td>false</td><td>String</td><td align="left">Parameter for the selection of payment server</td><td>X</td><td>O</td></tr>
    </table>

    * successCallback: The method to call when initialization is done successfully.
    * errorCallback: The method to invoke when an error occurs.
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
    * throws Error
        * if it is excute on platform that is not supprted.
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

    <table>
     <tr align="center">
       <td rowspan="2" style="">Parameter</td>
       <td rowspan="2" style="">Required</td>
       <td rowspan="2" style="">Type</td>
       <td rowspan="2" style="">Description</td>
       <td colspan="2" style="">Influenced Module</td>
     </tr>
     <tr align="center"><td>PaymentWall</td><td>CheckOut</td></tr>
     <tr align="center"><td>productId</td><td>true</td><td>String</td><td align="left">Alphanumeric ID of the product in your system</td><td>O</td><td>O</td></tr>
     <tr align="center"><td>productName</td><td>false</td><td>String</td><td align="left">Product Name in your system</td><td>O</td><td>O</td></tr>
     <tr align="center"><td>currency</td><td>false</td><td>String</td><td align="left">Currency of the purchase</td><td>O</td><td>O</td></tr>
     <tr align="center"><td>amount</td><td>false</td><td>Number</td><td align="left">Amount of the purchase</td><td>O</td><td>O</td></tr>
     <tr align="center"><td>period</td><td>True if subscription</td><td>String</td><td align="left">Type of product period</td><td>O</td><td>X</td></tr>
     <tr align="center"><td>duration</td><td>true if subscription</td><td>Number</td><td align="left">Length of product period</td><td>O</td><td>X</td></tr>     
     <tr align="center"><td>userId</td><td>false</td><td>String</td><td align="left">ID of the end-user in your system sho is viewing the widget</td><td>O</td><td>X</td></tr>
     <tr align="center"><td>onExit</td><td>false</td><td>Function</td><td align="left">Optional callback on user exting the payment window</td><td>O</td><td>X</td></tr>
     <tr align="center"><td>showBackButton</td><td>false</td><td>Boolean</td><td align="left">show 'Back' button on payment form</td><td>O</td><td>X</td></tr>
     <tr align="center"><td>enablePaymentRecoverFlow</td><td>false</td><td>Boolean</td><td align="left">Enable 'Recover My Payment flow</td><td>O</td><td>X</td></tr>
     <tr align="center"><td>titles</td><td>false</td><td>JSON</td><td align="left">Custom headings</td><td>O</td><td>X</td></tr>
     <tr align="center"><td>orderId</td><td>false</td><td>String</td><td align="left">Management ID for purchase managed by 3rd party application</td><td>X</td><td>O</td></tr>
     <tr align="center"><td>oderItemPath</td><td>false</td><td>String</td><td align="left">Image path of item Image type: jpeg, jpg, png only</td><td>X</td><td>O</td></tr>
    </table>

    * successCallback: The method to call when buy the product successfully.
    * errorCallback: The method to invoke when an error occurs.
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
    * throws Error
        * if it is excute on platform that is not supprted.        
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

    <table>
     <tr align="center">
       <td rowspan="2" style="">Parameter</td>
       <td rowspan="2" style="">Required</td>
       <td rowspan="2" style="">Type</td>
       <td rowspan="2" style="">Description</td>
       <td colspan="2" style="">Influenced Module</td>
     </tr>
     <tr align="center"><td>PaymentWall</td><td>CheckOut</td></tr>
     <tr align="center"><td>productId</td><td>true</td><td>String</td><td align="left">Alphanumeric ID of the product</td><td>O</td><td>O</td></tr>
     <tr align="center"><td>userId</td><td>true</td><td>String</td><td align="left">ID of the end-user in your system who is viewing the widget</td><td>O</td><td>X</td></tr>
     <tr align="center"><td>InvoiceId</td><td>false</td><td>String</td><td align="left">Invoice id</td><td>X</td><td>O</td></tr>     
    </table>

    * successCallback: The method to call when cancel the subscription product successfully.
    * errorCallback: The method to invoke when an error occurs.
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
    * throws Error
        * if it is excute on platform that is not supprted.         
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

    <table>
     <tr align="center">
       <td rowspan="2" style="">Parameter</td>
       <td rowspan="2" style="">Required</td>
       <td rowspan="2" style="">Type</td>
       <td rowspan="2" style="">Description</td>
       <td colspan="2" style="">Influenced Module</td>
     </tr>
     <tr align="center"><td>PaymentWall</td><td>CheckOut</td></tr>
     <tr align="center"><td>productId</td><td>true</td><td>String</td><td align="left">Alphanumeric ID of the product</td><td>O</td><td>O</td></tr>
     <tr align="center"><td>userId</td><td>true</td><td>String</td><td align="left">ID of the end-user in your system who is viewing the widget</td><td>O</td><td>X</td></tr>
    </table>

    * successCallback: The method to call when get the purchase status successfully.
    * errorCallback: The method to invoke when an error occurs.
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

    <table>
     <tr align="center">
       <td rowspan="2" style="">Parameter</td>
       <td rowspan="2" style="">Required</td>
       <td rowspan="2" style="">Type</td>
       <td rowspan="2" style="">Description</td>
       <td colspan="2" style="">Influenced Module</td>
     </tr>
     <tr align="center"><td>PaymentWall</td><td>CheckOut</td></tr>
     <tr align="center"><td>itemType</td><td>true</td><td>String</td><td align="left">1:CONSUMABLE/2:NON-CONSUMABLE/3:LIMITED-PERIOD/4:SUBSCRIPTION</td><td>X</td><td>O</td></tr>
     <tr align="center"><td>pageNumber</td><td>true</td><td>Number</td><td align="left">1~N, each page has 100 entries of purchase records</td><td>X</td><td>O</td></tr>
    </table>

    * successCallback: The method to call when get the purchases list successfully.
    * errorCallback: The method to invoke when an error occurs.
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
    * throws Error
        * if it is excute on platform that is not supprted.         
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

    <table>
     <tr align="center">
       <td rowspan="2" style="">Parameter</td>
       <td rowspan="2" style="">Required</td>
       <td rowspan="2" style="">Type</td>
       <td rowspan="2" style="">Description</td>
       <td colspan="2" style="">Influenced Module</td>
     </tr>
     <tr align="center"><td>PaymentWall</td><td>CheckOut</td></tr>
     <tr align="center"><td>pageSize</td><td>false</td><td>Number</td><td align="left">The number of products on each page (1-N (Maximum : 100))</td><td>X</td><td>O</td></tr>
     <tr align="center"><td>pageNumber</td><td>false</td><td>Number</td><td align="left">1~N, each page has 100 entries of purchase records</td><td>X</td><td>O</td></tr>
    </table>

    * successCallback: The method to call when get the purchases list successfully.
    * errorCallback: The method to invoke when an error occurs.
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
	* billingVerifyPurchaseInfo: Object for inputting requested invoiceId.

    <table>
     <tr align="center">
       <td rowspan="2" style="">Parameter</td>
       <td rowspan="2" style="">Required</td>
       <td rowspan="2" style="">Type</td>
       <td rowspan="2" style="">Description</td>
       <td colspan="2" style="">Influenced Module</td>
     </tr>
     <tr align="center"><td>PaymentWall</td><td>CheckOut</td></tr>
     <tr align="center"><td>InvoiceId</td><td>false</td><td>String</td><td align="left">Invoice id</td><td>X</td><td>O</td></tr>
    </table>

    * successCallback: The method to call when veify the purchase successfully.
    * errorCallback: The method to invoke when an error occurs.
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
    * throws Error
        * if it is excute on platform that is not supprted.         
* Examples

	```js
    toast.billing.verifyPurchase({
        invoiceId: 'YOUR_INVOICE_ID'
    }, successCallback, errorCallback);
	```

### void applyProduct(BillingApplyProductInfo billingApplyProductInfo, BillingApplyProductCallback successCallback, optional ErrorCallback? errorCallback)
The DPI is notified that the purchased product has been successfully applied to the app.
* Parameters
	* billingApplyProductInfo: Object for inputting requested invoiceId.

    <table>
     <tr align="center">
       <td rowspan="2" style="">Parameter</td>
       <td rowspan="2" style="">Required</td>
       <td rowspan="2" style="">Type</td>
       <td rowspan="2" style="">Description</td>
       <td colspan="2" style="">Influenced Module</td>
     </tr>
     <tr align="center"><td>PaymentWall</td><td>CheckOut</td></tr>
     <tr align="center"><td>InvoiceId</td><td>false</td><td>String</td><td align="left">Invoice id</td><td>X</td><td>O</td></tr>
    </table>

    * successCallback: The method to call when  successfully.
    * errorCallback: The method to invoke when an error occurs.
* Return value
	N/A
* Exceptions
	* throws TypeError
		* if type of any parameters is not matched to specification.
    * throws Error
        * if it is excute on platform that is not supprted.         
* Examples

	```js
    toast.billing.verifyPurchase({
        invoiceId: 'YOUR_INVOICE_ID'
    }, successCallback, errorCallback);
	```    
