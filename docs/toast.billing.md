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
  <tr align="center"><td>init</td><td>X</td><td>X</td><td>TBD</td><td>X</td><td>O</td><td>X</td><td>TBD</td></tr>
  <tr align="center"><td>buyProduct</td><td>X</td><td>X</td><td>TBD</td><td>X</td><td>O</td><td>X</td><td>TBD</td></tr>
  <tr align="center"><td>cancelSubscription</td><td>X</td><td>X</td><td>TBD</td><td>X</td><td>O</td><td>X</td><td>TBD</td></tr>
  <tr align="center"><td>checkPurchaseStatus</td><td>X</td><td>X</td><td>TBD</td><td>X</td><td>O</td><td>X</td><td>TBD</td></tr>
  <tr align="center"><td>requestPurchasesList</td><td>X</td><td>X</td><td>TBD</td><td>X</td><td>O</td><td>X</td><td>TBD</td></tr>
  <tr align="center"><td>requestProductsList</td><td>X</td><td>X</td><td>TBD</td><td>X</td><td>O</td><td>X</td><td>TBD</td></tr>
  <tr align="center"><td>verifyPurchase</td><td>X</td><td>X</td><td>TBD</td><td>X</td><td>O</td><td>X</td><td>TBD</td></tr>
  <tr align="center"><td>applyProduct</td><td>X</td><td>X</td><td>TBD</td><td>X</td><td>O</td><td>X</td><td>TBD</td></tr>
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
