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

/* jshint undef: true, unused: true */
/* globals showDeviceInfoScene, toastLog */

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
        app.receivedEvent('deviceready');
        registerKey();

        document.getElementById('ready').addEventListener('click', function(){
            showDeviceInfoScene();
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        toastLog('Received Event: ' + id);
    }
};

// toast tv keycode
var tvKeyCode = [];

function registerKey() {
    toastLog('function registerKey');

    toast.inputdevice.getSupportedKeys(function(keys) {
        // get supported keys
        var len = keys.length;
        for(var i = 0; i < len; i++) {
            tvKeyCode[keys[i].name] = keys[i].code;
        }
    });

    window.addEventListener('keydown', function(e) {
        switch(e.keyCode) {
            case tvKeyCode.Return:
                toast.application.exit();
                break;
            case tvKeyCode.Enter:
                showDeviceInfoScene();
                break;
        }
    });
}

app.initialize();
