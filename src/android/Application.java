package com.cordova.samsung.toast;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CallbackContext;

import android.app.Activity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Application extends CordovaPlugin {

	/**
     * Constructor.
     */
    public Application() {
    }

	@Override
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
	    super.initialize(cordova, webView);
	}

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		if(action.equals("exit")){
			this.exit();
			callbackContext.success();
			return true;
		}
		return false;
	}

	/**
     * Exit application.
     */
    public void exit() {
    	Activity activity = this.cordova.getActivity();
    	activity.finish();
    }
}
