/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
   // Application Constructor
   initialize: function() {
      this.bindEvents();
   },
   // Bind Event Listeners
   //
   // Bind any events that are required on startup. Common events are:
   // 'load', 'deviceready', 'offline', and 'online'.
   bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
   },
   // deviceready Event Handler
   //
   // The scope of 'this' is the event. In order to call the 'receivedEvent'
   // function, we must explicitly call 'app.receivedEvent(...);'
   onDeviceReady: function() {
      // [TOAST] Make tv key table using toast inputdevice.
      window.tvKey = []; 
      toast.inputdevice.getSupportedKeys(function(keys) {
         for(var i = 0, len = keys.length; i < len; i++) {
            window.tvKey[keys[i].name] = keys[i].code;
         }
      });
    

     head.js(
            /*Default Libraries*/
            {jQuery: "app/javascripts/jquery-2.0.3.js"},
            {sceneManager: "app/javascripts/state-machine.js"},
            {move: "app/javascripts/move.js"},

            /*Initializer*/
            {initializer: "app/init.js"},

            /*Common functions*/
            {config: "app/config.js"},
            {common: "app/common.js"},
            {language: "app/language.js"},

            /*Scenes functions*/
            {sceneBlackScreen: "app/scenes/BlackScreen.js"},
            {sceneDisclaimer: "app/scenes/Disclaimer.js"},
            {sceneFinishScreen: "app/scenes/FinishScreen.js"},
            {sceneSoundList: "app/scenes/SoundList.js"},
            {sceneTitle: "app/scenes/Title.js"},
            {sceneTitle: "app/scenes/Tutorial.js"}

      , function(){
         /*Start Scene Manager after all scripts are loaded*/
         console.log('ALL LOADED');

         "use strict";

         getData(function(data){
            Scene.soundList = data;
            Scene.cookie = new Cookie('ScaryBoxV4');
            if (!Scene.cookie.getValue("sounds_index_selected")) {
               var sounds_index_selected = [ 0, 0, 2, 0, 0 ];
               Scene.cookie.addValue("sounds_index_selected", sounds_index_selected);
            }
            Scene.language.current = Scene.language.english;

            navigator.globalization.getPreferredLanguage(
               function(language){
                  if (language.value.toLowerCase().indexOf('es') > -1){
                     Scene.language.current = Scene.language.spanish;
                  } 
                  SceneManager.start();
               }, function (error){
                  console.log(error);
               }); 

            Scene.player = new Player('player');
         });

      });

      head.ready("jQuery", function () {
         console.log('JAVASCRIPT LOADED: jQuery library');
      });
      head.ready("sceneManager", function () {
         console.log('JAVASCRIPT LOADED: Scene Manager');
      });
      head.ready("move", function () {
         console.log('JAVASCRIPT LOADED: Move');
      });
      head.ready("initializer", function () {
         console.log('JAVASCRIPT LOADED: Initializer');
      });
      head.ready("common", function () {
         console.log('JAVASCRIPT LOADED: Common Library');
      });
   },
};

app.initialize();
