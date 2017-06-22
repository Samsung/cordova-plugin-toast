package com.cordova.samsung.toast;

import android.view.KeyEvent;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Inputdevice extends CordovaPlugin {
    private JSONArray supportedKeys = new JSONArray();

    private JSONObject keyArrowUp = new JSONObject();
    private JSONObject keyArrowDown = new JSONObject();
    private JSONObject keyArrowLeft = new JSONObject();
    private JSONObject keyArrowRight = new JSONObject();

    private JSONObject keyEnter = new JSONObject();
    private JSONObject keyReturn = new JSONObject();

    private JSONObject keyMediaRecord = new JSONObject();
    private JSONObject keyMediaPlayPause = new JSONObject();
    private JSONObject keyMediaStop = new JSONObject();
    private JSONObject keyMediaFastForward = new JSONObject();
    private JSONObject keyMediaPlay = new JSONObject();
    private JSONObject keyMediaPause = new JSONObject();
    private JSONObject keyMediaRewind = new JSONObject();

    private JSONObject keyChannelUp = new JSONObject();
    private JSONObject keyChannelDown = new JSONObject();

    private JSONObject key0 = new JSONObject();
    private JSONObject key1 = new JSONObject();
    private JSONObject key2 = new JSONObject();
    private JSONObject key3 = new JSONObject();
    private JSONObject key4 = new JSONObject();
    private JSONObject key5 = new JSONObject();
    private JSONObject key6 = new JSONObject();
    private JSONObject key7 = new JSONObject();
    private JSONObject key8 = new JSONObject();
    private JSONObject key9 = new JSONObject();

    /********************
     * Constructor.
     ********************/
    public Inputdevice() {
    }

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        this.setKeys();
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if(action.equals("getSupportedKeys")){
            callbackContext.success(supportedKeys);
        }
        else if(action.equals("getKey")){
            this.getKey(args, callbackContext);
        }
        else if(action.equals("registerKey")){
            this.checkKey(args, callbackContext);
        }
        else if(action.equals("unregisterKey")){
            this.checkKey(args, callbackContext);
        }
        else {
            return false;
        }
        return true;
    }

    private void checkKey (JSONArray args, CallbackContext callbackContext) {
        String keyName = "";
        try {
            keyName = args.getString(0);
            for(int i = 0 ;i < supportedKeys.length() ;i++) {
                if(keyName.equals(supportedKeys.getJSONObject(i).getString("name"))){
                    callbackContext.success();
                    return;
                }
            }
        } catch (JSONException e) {
            callbackContext.error(e.toString());
            e.printStackTrace();
        }
        callbackContext.error("[TOAST] '" + keyName + "' " + "KEY is not supported in TOAST");
    }

    private void getKey (JSONArray args, CallbackContext callbackContext) {
        String keyName = "";
        try {
            keyName = args.getString(0);
            JSONObject keyObject;
            for(int i = 0 ;i < supportedKeys.length() ;i++) {
                keyObject = supportedKeys.getJSONObject(i);
                if (keyObject.getString("name").equals(keyName)) {
                    callbackContext.success(keyObject);
                    return;
                }
            }
        } catch (JSONException e) {
            callbackContext.error(e.toString());
            e.printStackTrace();
        }
        callbackContext.error("[TOAST] '" + keyName + "' " + "KEY is not supported in TOAST");
    }

    private void setKeys () {

        try {
            /********************
             * Arrow Key(Up, Down, Right, Left)
             ********************/
            keyArrowUp.put("name", "ArrowUp");
            keyArrowUp.put("code", KeyEvent.ACTION_UP); // '1'
            supportedKeys.put(keyArrowUp);

            keyArrowDown.put("name", "ArrowDown");
            keyArrowDown.put("code", KeyEvent.ACTION_DOWN); // '0'
            supportedKeys.put(keyArrowDown);

            // Not correct(Just DPAD key code.)
            keyArrowRight.put("name", "ArrowRight");
            keyArrowRight.put("code", KeyEvent.KEYCODE_DPAD_RIGHT); // '22'
            supportedKeys.put(keyArrowRight);

            // Not correct(Just DPAD key code.)
            keyArrowLeft.put("name", "ArrowLeft");
            keyArrowLeft.put("code", KeyEvent.KEYCODE_DPAD_LEFT); // '21'
            supportedKeys.put(keyArrowLeft);

            /********************
             * Base Contorl Key(Enter, Return)
             ********************/
            keyEnter.put("name", "Enter");
            keyEnter.put("code", KeyEvent.KEYCODE_ENTER); // '66'
            supportedKeys.put(keyEnter);

            keyReturn.put("name", "Return");
            keyReturn.put("code", KeyEvent.KEYCODE_BACK); // '4'
            supportedKeys.put(keyReturn);

            /********************
             * Media Control Key(Play, Record, Stop, Etc...)
             ********************/
            keyMediaRecord.put("name", "MediaRecord");
            keyMediaRecord.put("code", KeyEvent.KEYCODE_MEDIA_RECORD); // '130'
            supportedKeys.put(keyMediaRecord);

            keyMediaPlayPause.put("name", "MediaPlayPause");
            keyMediaPlayPause.put("code", KeyEvent.KEYCODE_MEDIA_PLAY_PAUSE); // '85'
            supportedKeys.put(keyMediaPlayPause);

            keyMediaStop.put("name", "MediaStop");
            keyMediaStop.put("code", KeyEvent.KEYCODE_MEDIA_STOP); // '86'
            supportedKeys.put(keyMediaStop);

            keyMediaFastForward.put("name", "MediaFastForward");
            keyMediaFastForward.put("code", KeyEvent.KEYCODE_MEDIA_FAST_FORWARD); // '90'
            supportedKeys.put(keyMediaFastForward);

            keyMediaPlay.put("name", "MediaPlay");
            keyMediaPlay.put("code", KeyEvent.KEYCODE_MEDIA_PLAY); // '126'
            supportedKeys.put(keyMediaPlay);

            keyMediaPause.put("name", "MediaPause");
            keyMediaPause.put("code", KeyEvent.KEYCODE_MEDIA_PAUSE); // '127'
            supportedKeys.put(keyMediaPause);

            keyMediaRewind.put("name", "MediaRewind");
            keyMediaRewind.put("code", KeyEvent.KEYCODE_MEDIA_REWIND); // '89'
            supportedKeys.put(keyMediaRewind);

            /********************
             * Channel Contorl Key(Channel Up, Channel Down)
             ********************/
            keyChannelUp.put("name", "ChannelUp");
            keyChannelUp.put("code", KeyEvent.KEYCODE_CHANNEL_UP); // '166'
            supportedKeys.put(keyChannelUp);

            keyChannelDown.put("name", "ChannelDown");
            keyChannelDown.put("code", KeyEvent.KEYCODE_CHANNEL_DOWN); // '167'
            supportedKeys.put(keyChannelDown);

            /********************
             * Number Key(0 ~ 9)
             ********************/
            key0.put("name", "0");
            key0.put("code", KeyEvent.KEYCODE_0); // '7'
            supportedKeys.put(key0);

            key1.put("name", "1");
            key1.put("code", KeyEvent.KEYCODE_1); // '8'
            supportedKeys.put(key1);

            key2.put("name", "2");
            key2.put("code", KeyEvent.KEYCODE_2); // '9'
            supportedKeys.put(key2);

            key3.put("name", "3");
            key3.put("code", KeyEvent.KEYCODE_3); // '10'
            supportedKeys.put(key3);

            key4.put("name", "4");
            key4.put("code", KeyEvent.KEYCODE_4); // '11'
            supportedKeys.put(key4);

            key5.put("name", "5");
            key5.put("code", KeyEvent.KEYCODE_5); // '12'
            supportedKeys.put(key5);

            key6.put("name", "6");
            key6.put("code", KeyEvent.KEYCODE_6); // '13'
            supportedKeys.put(key6);

            key7.put("name", "7");
            key7.put("code", KeyEvent.KEYCODE_7); // '14'
            supportedKeys.put(key7);

            key8.put("name", "8");
            key8.put("code", KeyEvent.KEYCODE_8); // '15'
            supportedKeys.put(key8);

            key9.put("name", "9");
            key9.put("code", KeyEvent.KEYCODE_9); // '16'
            supportedKeys.put(key9);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
