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
import org.json.JSONObject;
import org.json.JSONException;

import java.io.File;

import android.net.Uri;
import android.util.Log;
import android.app.Activity;
import android.app.Dialog;
import android.graphics.drawable.ColorDrawable;
import android.widget.FrameLayout;
import android.view.Gravity;
import android.view.Window;
import android.view.WindowManager;
import android.view.WindowManager.LayoutParams;

import com.google.android.exoplayer2.*;
import com.google.android.exoplayer2.ui.SimpleExoPlayerView;
import com.google.android.exoplayer2.trackselection.*;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.ExoPlayerFactory;
import com.google.android.exoplayer2.upstream.*;
import com.google.android.exoplayer2.extractor.*;
import com.google.android.exoplayer2.source.*;
import com.google.android.exoplayer2.util.*;


public class MediaPlayer {
    private String id;

	private Activity activity;
	private CordovaWebView webView;

	private Dialog dialog; //WebView 위에 나타나게 함
	private FrameLayout frameLayout; //simpleExoPlayerView를 담는 Layout
	private SimpleExoPlayerView simpleExoPlayerView; //simpleExoPlayerView View

	private SimpleExoPlayer simpleExoPlayer;

	private static final String TAG = "[sk08.lee]";

	private CallbackContext messageChannel;

    enum EventType {
        STATE,
        DURATION,
        POSITION,
        BUFFERINGPROGRESS,
        ENDED
    }

    enum EventTypeSTATE {
        IDLE,
        STALLED,
        PLAYING,
        PAUSED
    }

    private EventType eventType = EventType.STATE;
    private EventTypeSTATE eventTypeState = EventTypeSTATE.IDLE;
    private EventTypeSTATE eventTypeOldState = EventTypeSTATE.IDLE;

	public MediaPlayer(String id, Activity activity, CordovaWebView webView) {
		Log.v(TAG, "MediaPlayer");

        this.id = id;
        this.activity = activity;
        this.webView = webView;
    }

	public void createView() {
		Log.v(TAG, "createView");

		dialog = new Dialog(this.activity, android.R.style.Theme_NoTitleBar); //context, constom style를 Param으로 전달
		dialog.getWindow().getAttributes().windowAnimations = android.R.style.Animation_Dialog; //가장 일반적인 Animation 적용
		dialog.getWindow().setBackgroundDrawable(new ColorDrawable(android.graphics.Color.TRANSPARENT)); //배경을 투명으로
		dialog.getWindow().setFlags(WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL, WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL); //dialog 밖을 Touch 가능하도록
		dialog.getWindow().setGravity(Gravity.TOP | Gravity.LEFT); //좌측 상단으로 정렬
		dialog.requestWindowFeature(Window.FEATURE_NO_TITLE); //Title 없음
		dialog.setCancelable(true); //Return Key 유효

		frameLayout = new FrameLayout(this.activity); 
		frameLayout.setLayoutParams(new WindowManager.LayoutParams(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.MATCH_PARENT)); //Dialog의 모든 영역을 채움
		frameLayout.setKeepScreenOn(true); //Screen Saver Off

        simpleExoPlayerView = new SimpleExoPlayerView(this.activity);
        simpleExoPlayerView.setLayoutParams(new WindowManager.LayoutParams(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.MATCH_PARENT)); //Layout의 모든 영역을 채움

        frameLayout.addView(simpleExoPlayerView);
        dialog.setContentView(frameLayout);
        dialog.show();
	}

	public void createPlayer() { //일단은 간단하게 생성
		Log.v(TAG, "createPlayer");

		TrackSelector trackSelector = new DefaultTrackSelector(); //Adaptive Track Selection은 지원하지 않는 Track Selector 생성
		simpleExoPlayer = ExoPlayerFactory.newSimpleInstance(this.activity, trackSelector); //Context와 TrackSelector로 ExoPlayer 생성
	}

	public void attachPlayerToView() {
		Log.v(TAG, "attachPlayerToView");

		simpleExoPlayerView.setPlayer(simpleExoPlayer);
	}

	public void changeViewSize(JSONObject viewSize) throws JSONException {
		Log.v(TAG, "changeViewSize");

        WindowManager.LayoutParams layoutParams = dialog.getWindow().getAttributes(); //dialog의 Attribute를 얻어와서 Instance를 만듦

        layoutParams.x = viewSize.getInt("left");
        layoutParams.y = viewSize.getInt("top");
        layoutParams.width = viewSize.getInt("width");
        layoutParams.height = viewSize.getInt("height");

        dialog.getWindow().setAttributes(layoutParams);
	}

	public void open(Uri contentUri) {
		Log.v(TAG, "open");

		DataSource.Factory dataSourceFactory = new DefaultDataSourceFactory(this.activity, Util.getUserAgent(this.activity, "app_name"));
		ExtractorsFactory extractorsFactory = new DefaultExtractorsFactory();
		MediaSource videoSource = new ExtractorMediaSource(contentUri, dataSourceFactory, extractorsFactory, null, null);

		simpleExoPlayer.prepare(videoSource);
        simpleExoPlayer.addListener(playerEventListener);
	}

	public void play() {
		Log.v(TAG, "play");
		
		simpleExoPlayer.setPlayWhenReady(true);
	}

    public void pause() {
        Log.v(TAG, "pause");
        
        simpleExoPlayer.setPlayWhenReady(false);
    }

    private ExoPlayer.EventListener playerEventListener = new ExoPlayer.EventListener() {
        @Override
        public void onPlaybackParametersChanged(PlaybackParameters playbackParameters) {
            Log.v(TAG, "Playback parameters changed");
        }
        @Override
        public void onPlayerError(ExoPlaybackException error) {
            Log.v(TAG, "Error in ExoPlayer", error);
            
        }

        @Override
        public void onLoadingChanged(boolean isLoading) {
            eventType = EventType.STATE;

            eventTypeOldState = eventTypeState;
            if (isLoading) {
                eventTypeState = EventTypeSTATE.STALLED;
            }            
        }

        @Override
        public void onPlayerStateChanged(boolean playWhenReady, int playbackState) {
            Log.v(TAG, "onPlayerStateChanged");
            Log.v(TAG, "playWhenReady : " + playWhenReady);
            Log.v(TAG, "playbackState : " + playbackState);

            switch (playbackState) {
                case ExoPlayer.STATE_IDLE:
                    eventType = EventType.STATE;

                    eventTypeOldState = eventTypeState;
                    eventTypeState = EventTypeSTATE.IDLE;

                    break;

                case ExoPlayer.STATE_BUFFERING:
                    eventType = EventType.BUFFERINGPROGRESS;

                    eventTypeOldState = eventTypeState;
                    eventTypeState = EventTypeSTATE.STALLED;

                    break;

                case ExoPlayer.STATE_READY:
                    eventType = EventType.STATE;

                    eventTypeOldState = eventTypeState;
                    if (playWhenReady) {
                        eventTypeState = EventTypeSTATE.PLAYING;
                    }
                    else {
                        eventTypeState = EventTypeSTATE.PAUSED;
                    }

                    break;

                case ExoPlayer.STATE_ENDED:
                    eventType = EventType.ENDED;
                    break;
            }

            sendEventMessage("status");
        }

        @Override
        public void onPositionDiscontinuity() {
            ;
        }

        @Override
        public void onTimelineChanged(Timeline timeline, Object manifest) {
            ;
        }

        @Override
        public void onTracksChanged(TrackGroupArray trackGroups, TrackSelectionArray trackSelections) {
            ;
        }
    };

    void setMessageChannel(CallbackContext callbackContext) {
        Log.v(TAG, "setMessageChannel");

        messageChannel = callbackContext;
    }

    void sendEventMessage(String action) {
        Log.v(TAG, "sendEventMessage");

        JSONObject messageToJS = new JSONObject();
        JSONObject actionData = new JSONObject();
        JSONObject mediaEventValue = new JSONObject();
        JSONObject data = new JSONObject();

        try {
            actionData.put("id", this.id);
            mediaEventValue.put("type", eventType);

            if (eventType == EventType.STATE) {
                data.put("state", eventTypeState);
                data.put("oldState", eventTypeOldState);

                mediaEventValue.put("data", data);
                actionData.put("mediaEventValue", mediaEventValue); 
            }
            else if (eventType == EventType.DURATION) {
                ;
            }
            else if (eventType == EventType.POSITION) {
                ;
            }
            else if (eventType == EventType.BUFFERINGPROGRESS) {
                ;
            }
            else if (eventType == EventType.ENDED) {
                ;
            }

            messageToJS.put("action", action);
            messageToJS.put(action, actionData);
        } catch (JSONException e) {
            LOG.e(TAG, "Failed to create event message", e);
        }     

        PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, messageToJS);
        pluginResult.setKeepCallback(true);

        if (messageChannel != null) {
            messageChannel.sendPluginResult(pluginResult);
        }
    }
	
}