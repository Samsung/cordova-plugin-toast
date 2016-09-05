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

var media = -1;
var mediaContainer = -1;

var playReadyData = -1;
var mediaPlugin = -1;

var mediaState = -1;
var duration = -1;

var contentState = 1;
var resolutionState = 'full';

var jumpNum = 10000;
var fullResolution = ['0%', '0%', '100%', '100%'];
var partialResolution = ['25%', '25%', '50%', '50%'];

function playDrmMedia() {
    console.log('[drmMediaSample] playDrmMedia');

    var bgContainer = document.createElement('div');
    bgContainer.id = 'playerDiv';
    document.body.appendChild(bgContainer);

    media = toast.Media.getInstance();

    playReadyData = {
        LicenseServer  : 'http://playready.directtaps.net/pr/svc/rightsmanager.asmx?'
    };
    mediaPlugin = new toast.MediaPluginPlayReady(playReadyData);

    media.resetPlugin();
    media.attachPlugin(mediaPlugin);
    media.open('http://playready.directtaps.net/smoothstreaming/SSWSS720H264PR/SuperSpeedway_720.ism/Manifest');

    mediaContainer = media.getContainerElement();
    mediaContainer.style.position = 'fixed';
    mediaContainer.style.left = fullResolution[0];
    mediaContainer.style.top = fullResolution[1];
    mediaContainer.style.width = fullResolution[2];
    mediaContainer.style.height = fullResolution[3];
    document.body.appendChild(mediaContainer);

    media.syncVideoRect(); //for supporting 2013's sectv-orsay

    addControlBar();

    media.setListener({
        onevent: function(evt) {
            switch(evt.type) {
                case 'STATE':
                    document.getElementById('log').innerHTML = 'State is ' + evt.data.state;

                    if(evt.data.state == 'IDLE' || evt.data.state == 'PAUSED') {
                        mediaState = false;
                        document.getElementById('playOrPauseButton').innerHTML = '▶';
                    }
                    else if(evt.data.state == 'PLAYING') {
                        mediaState = true;
                        document.getElementById('playOrPauseButton').innerHTML = '||';
                    }

                    break;
                case 'DURATION':
                    document.getElementById('log').innerHTML = 'Duration is ' + evt.data.duration + 'ms';

                    duration = evt.data.duration;

                    break;
                case 'POSITION':
                    document.getElementById('log').innerHTML = 'Position is ' + evt.data.position + 'ms';
                    document.getElementById('progressBlue').style.width = Number(evt.data.position * 100 / duration) + '%';

                    break;
                case 'BUFFERINGPROGRESS':
                    document.getElementById('log').innerHTML = 'Buffering is ' + evt.data.bufferingPercentage + '%';

                    if(evt.data.bufferingPercentage >= 100) {
                        document.getElementById('log').innerHTML = 'Buffering is completed';
                    }

                    break;
                case 'ENDED':
                    document.getElementById('log').innerHTML = 'Media is ended';
                    document.getElementById('progressBlue').style.width = '0%';

                    prevOrNext();

                    break;
            }
        },
        onerror: function (err) {
            console.error('MediaError is occured: ' + JSON.stringify(err));
            document.getElementById('log').innerHTML = 'MediaError is occured';
        }
    });

    media.play();
    //You don't have to call setScreenSaver Method. It is configurated by toast.avplay.
}

function addControlBar() {
    console.log('[drmMediaSample] playMedia');

    var controlContainer = document.createElement('div');
    controlContainer.id = 'bar';
    document.body.appendChild(controlContainer);

    var controlBarTemplate = '<div id="progress">' +
                                '<div id="progressBlack"></div>' +
                                '<div id="progressBlue"></div>' +
                             '</div>' +
                             '<div id="controller">'+
                                '<div id="log"></div>' +
                                '<div id="prevButton">|◀◀</div>' +
                                '<div id="prevSeekButton">◀◀</div>' +
                                '<div id="playOrPauseButton">||</div>' +
                                '<div id="nextSeekButton">▶▶</div>' +
                                '<div id="nextButton">▶▶|</div>' +
                                '<div id="right"></div>' +
                                '<div id="resolutionButton">Change resolution</div>' +
                             '</div>';
    document.getElementById('bar').innerHTML = controlBarTemplate;

    document.getElementById('prevButton').addEventListener('click', function() {
        prevOrNext();
    });
    document.getElementById('prevSeekButton').addEventListener('click', function() {
        seekTo('prev');
    });
    document.getElementById('playOrPauseButton').addEventListener('click', function() {
        playOrPause();
    });
    document.getElementById('nextSeekButton').addEventListener('click', function() {
        seekTo('next');
    });
    document.getElementById('nextButton').addEventListener('click', function() {
        prevOrNext();
    });
    document.getElementById('resolutionButton').addEventListener('click', function() {
        changeResolution();
    });
}

function prevOrNext() {
    media.stop();

    if(contentState == 1) {
        media.resetPlugin();
        media.attachPlugin(mediaPlugin);
        media.open('http://playready.directtaps.net/smoothstreaming/SSWSS720H264PR/SuperSpeedway_720.ism/Manifest');

        media.play();
        contentState = 2;
    }
    else {
        media.resetPlugin();
        media.attachPlugin(mediaPlugin);
        media.open('http://playready.directtaps.net/smoothstreaming/SSWSS720H264PR/SuperSpeedway_720.ism/Manifest');

        media.play();
        contentState = 1;
    }
    //You don't have to call setScreenSaver Method. It is configurated by toast.avplay.
}

function seekTo(param) {
    var curPos = -1;

    if(param == 'prev') {
        curPos = media.getCurrentPosition();
        media.seekTo(curPos - jumpNum);
    }
    else if(param == 'next') {
        curPos = media.getCurrentPosition();
        media.seekTo(curPos + jumpNum);
    }
}

function playOrPause() {
    if(mediaState) {
        media.pause();
        //You don't have to call setScreenSaver Method. It is configurated by toast.avplay.
    }
    else {
        media.play();
        //You don't have to call setScreenSaver Method. It is configurated by toast.avplay.
    }
}

function changeResolution () {
    switch(resolutionState) {
        case 'partial':
            mediaContainer.style.left = fullResolution[0];
            mediaContainer.style.top = fullResolution[1];
            mediaContainer.style.width = fullResolution[2];
            mediaContainer.style.height = fullResolution[3];
            mediaContainer.style.outline = '0px';

            resolutionState = 'full';

            break;
        case 'full':
            mediaContainer.style.left = partialResolution[0];
            mediaContainer.style.top = partialResolution[1];
            mediaContainer.style.width = partialResolution[2];
            mediaContainer.style.height = partialResolution[3];
            mediaContainer.style.outline = '1px solid white';

            resolutionState = 'partial';

            break;
    }
}
