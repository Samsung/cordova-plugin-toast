/*
 * Copyright 2015 Samsung Electronics Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.samsung.cordova.toast;

import org.apache.cordova.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.net.Uri;
import android.text.TextUtils;
import android.util.Patterns;

public class Media extends CordovaPlugin { //CordovaPlugin을 상속받아 Media class를 만듦
	private MediaPlayer mediaPlayer;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

	@Override //Cordovaplugin의 execute Method를 재정의
	public boolean execute(final String action, final JSONArray args, final CallbackContext callbackContext) throws JSONException {
		try {

			if(action.equals("create")) { //toast.Media.getInstance(), ExoPlayer를 생성
				String id = args.optString(0);

				mediaPlayer = new MediaPlayer(id, cordova.getActivity(), webView);
				mediaPlayer.createView();
				mediaPlayer.createPlayer();
				mediaPlayer.attachPlayerToView();

				return true;
			}
			else if(action.equals("changeViewSize")) {
				JSONObject viewSize = args.optJSONObject(0);

				mediaPlayer.changeViewSize(viewSize);	

				return true;
			}
			else if(action.equals("open")) {
				Uri contentUri = Uri.parse(args.optString(1));
				mediaPlayer.open(contentUri);

				return true;
			}
			else if(action.equals("messageChannel")) {
				cordova.getActivity().runOnUiThread(new Runnable() {
					public void run() {
						CallbackContext messageChannel = callbackContext;
						mediaPlayer.setMessageChannel(callbackContext);
					}
				});

				return true;
			}
			else if(action.equals("play")) {
				mediaPlayer.play();

	            return true;
			}
			else if(action.equals("pause")) {
				mediaPlayer.pause();

	            return true;
			}
			else {
				return false;
			}

		} catch(Exception e) {
			return false;
		}
	}
}
