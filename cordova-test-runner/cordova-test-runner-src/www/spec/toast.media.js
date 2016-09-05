describe('Constructor toast.Media', function() {
    it('should be defined as "toast.Media" namespace.', function() {
        expect(window.toast).toBeDefined();
        expect(window.toast.Media).toBeDefined();
    });

    it('should contain a "getInstance" as static function.', function() {
        expect(window.toast.Media.getInstance).toBeDefined();
        expect(typeof window.toast.Media.getInstance).toBe('function');
    });
});
describe('Instance of toast.Media', function() {
    var media = null;
    beforeEach(function() {
        media = toast.Media.getInstance();
    });
    afterEach(function() {
        media = null;
    });
    it('should contain a "open" function.', function() {
        expect(media.open).toBeDefined();
        expect(typeof media.open).toBe('function');
    });
    it('should contain a "getContainerElement" function.', function() {
        expect(media.getContainerElement).toBeDefined();
        expect(typeof media.getContainerElement).toBe('function');
    });
    it('should contain a "setListener" function.', function() {
        expect(media.setListener).toBeDefined();
        expect(typeof media.setListener).toBe('function');
    });
    it('should contain a "unsetListener" function.', function() {
        expect(media.unsetListener).toBeDefined();
        expect(typeof media.unsetListener).toBe('function');
    });
    it('should contain a "play" function.', function() {
        expect(media.play).toBeDefined();
        expect(typeof media.play).toBe('function');
    });
    it('should contain a "pause" function.', function() {
        expect(media.pause).toBeDefined();
        expect(typeof media.pause).toBe('function');
    });
    it('should contain a "seekTo" function.', function() {
        expect(media.seekTo).toBeDefined();
        expect(typeof media.seekTo).toBe('function');
    });
    it('should contain a "getDuration" function.', function() {
        expect(media.getDuration).toBeDefined();
        expect(typeof media.getDuration).toBe('function');
    });
    it('should contain a "getCurrentPosition" function.', function() {
        expect(media.getCurrentPosition).toBeDefined();
        expect(typeof media.getCurrentPosition).toBe('function');
    });
    it('should contain a "stop" function.', function() {
        expect(media.stop).toBeDefined();
        expect(typeof media.stop).toBe('function');
    });
});

describe('Video playback feature of toast.Media', function() {
    var media = null;
    var SAMPLE_VIDEO_URL = 'http://media.w3.org/2010/05/sintel/trailer.mp4';
    var SAMPLE_AUDIO_URL = 'http://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp3';
    var MediaEventType = ['STATE', 'DURATION', 'POSITION', 'BUFFERINGPROGRESS','ENDED'];
    var MediaState = ['IDLE', 'PLAYING', 'PAUSED', 'STALLED', 'SEEK'];

    beforeEach(function() {
        media = toast.Media.getInstance();
    });
    afterEach(function() {
        media.unsetListener();
        media.stop();
        media = null;
    });

    it('plays video well...', function (done) {
        media.open(SAMPLE_VIDEO_URL);
        var state = null;
        var waitForPlay = false;
        var waitForCurrentTime = false;
        var waitForPause = false;
        var waitForResume = false;
        var waitForSeekForward = false;
        var waitForSeekBackward = false;
        var waitForStop = false;
        media.setListener({
            onevent: function (evt) {
                expect(evt.type).toBeDefined();
                expect(MediaEventType).toContain(evt.type);
                switch(evt.type) {
                    case 'STATE':
                        expect(evt.data).toBeDefined();
                        if(evt.data.oldState) {
                            expect(MediaState).toContain(evt.data.oldState);
                            expect(evt.data.oldState === evt.data.state).toBeFalsy();
                        }
                        expect(MediaState).toContain(evt.data.state);
                        state = evt.data.state;
                        if(evt.data.state === 'STALLED') {
                            break;
                        }

                        if(waitForPlay && evt.data.state == 'PLAYING') {
                            expect(state).toBe('PLAYING');
                            waitForPlay = false;
                            setTimeout(function () {
                                waitForCurrentTime = true;
                            }, 2000);
                            setTimeout(function () {
                                waitForPause = true;
                                media.pause();
                            }, 3000);
                        }

                        if(waitForPause) {
                            expect(state).toBe('PAUSED');
                            waitForPause = false;
                            setTimeout(function () {
                                waitForResume = true;
                                media.play();
                            }, 3000);
                        }

                        if(waitForResume && state !== 'STALLED') {
                            expect(state).toBe('PLAYING');
                            waitForResume = false;
                            setTimeout(function () {
                                var curPos = media.getCurrentPosition();
                                media.seekTo(curPos+5000);
                                waitForSeekForward = curPos;
                            }, 3000);
                        }

                        if(waitForStop) {
                            expect(state).toBe('IDLE');
                            done();
                        }
                        break;
                    case 'DURATION':
                        expect(evt.data).toBeDefined();
                        expect(evt.data.duration).toBeDefined();
                        expect(typeof evt.data.duration).toBe('number');
                        expect(evt.data.duration).toBe(media.getDuration());
                        break;
                    case 'POSITION':
                        expect(evt.data).toBeDefined();
                        expect(evt.data.position).toBeDefined();
                        expect(typeof evt.data.position).toBe('number');
                        expect(evt.data.position).toBe(media.getCurrentPosition());
                        if(waitForCurrentTime) {
                            expect(evt.data.position >= 0).toBeTruthy();
                            waitForCurrentTime = false;
                        }
                        if(state !== 'STALLED' && waitForSeekForward && evt.data.position > waitForSeekForward) {
                            waitForSeekForward = false;
                            setTimeout(function () {
                                var curPos = media.getCurrentPosition();
                                media.seekTo(curPos-5000);
                                waitForSeekBackward = curPos;
                            }, 3000);
                        }
                        if(state !== 'STALLED' && waitForSeekBackward && evt.data.position < waitForSeekBackward) {
                            waitForSeekBackward = false;
                            setTimeout(function () {
                                waitForStop = true;
                                media.stop();
                            }, 3000);
                        }
                        break;
                    case 'BUFFERINGPROGRESS' :
                        expect(evt.data).toBeDefined();
                        expect(evt.data.bufferingPercentage).toBeDefined();
                        expect(typeof evt.data.bufferingPercentage).toBe('number');
                        break;
                    case 'ENDED' :
                        expect(evt.data).toBeDefined();
                        break;
                }
            },
            onerror: function (err) {
                fail('onerror occured: ' + err);
            }
        });

        waitForPlay = true;
        media.play();
    }, 100000);

    it('plays audio well...', function (done) {
        media.open(SAMPLE_AUDIO_URL);
        var state = null;
        var waitForPlay = false;
        var waitForCurrentTime = false;
        var waitForPause = false;
        var waitForResume = false;
        var waitForSeekForward = false;
        var waitForSeekBackward = false;
        var waitForStop = false;
        media.setListener({
            onevent: function (evt) {
                expect(evt.type).toBeDefined();
                expect(MediaEventType).toContain(evt.type);
                switch(evt.type) {
                    case 'STATE':
                        expect(evt.data).toBeDefined();
                        if(evt.data.oldState) {
                            expect(MediaState).toContain(evt.data.oldState);
                            expect(evt.data.oldState === evt.data.state).toBeFalsy();
                        }
                        expect(MediaState).toContain(evt.data.state);
                        state = evt.data.state;
                        if(evt.data.state === 'STALLED') {
                            break;
                        }
                        if(waitForPlay && evt.data.state == 'PLAYING') {
                            expect(state).toBe('PLAYING');
                            waitForPlay = false;
                            setTimeout(function () {
                                waitForCurrentTime = true;
                            }, 2000);
                            setTimeout(function () {
                                waitForPause = true;
                                media.pause();
                            }, 3000);
                        }

                        if(waitForPause) {
                            expect(state).toBe('PAUSED');
                            waitForPause = false;
                            setTimeout(function () {
                                waitForResume = true;
                                media.play();
                            }, 3000);
                        }

                        if(waitForResume && state !== 'STALLED') {
                            expect(state).toBe('PLAYING');
                            waitForResume = false;
                            setTimeout(function () {
                                var curPos = media.getCurrentPosition();
                                media.seekTo(curPos+5000);
                                waitForSeekForward = curPos;
                            }, 3000);
                        }

                        if(waitForStop) {
                            expect(state).toBe('IDLE');
                            done();
                        }
                        break;
                    case 'DURATION':
                        expect(evt.data).toBeDefined();
                        expect(evt.data.duration).toBeDefined();
                        expect(typeof evt.data.duration).toBe('number');
                        expect(evt.data.duration).toBe(media.getDuration());
                        break;
                    case 'POSITION':
                        expect(evt.data).toBeDefined();
                        expect(evt.data.position).toBeDefined();
                        expect(typeof evt.data.position).toBe('number');
                        expect(evt.data.position).toBe(media.getCurrentPosition());
                        if(waitForCurrentTime) {
                            expect(evt.data.position >= 0).toBeTruthy();
                            waitForCurrentTime = false;
                        }
                        if(state !== 'STALLED' && waitForSeekForward && evt.data.position > waitForSeekForward) {
                            waitForSeekForward = false;
                            setTimeout(function () {
                                var curPos = media.getCurrentPosition();
                                media.seekTo(curPos-5000);
                                waitForSeekBackward = curPos;
                            }, 3000);
                        }
                        if(state !== 'STALLED' && waitForSeekBackward && evt.data.position < waitForSeekBackward) {
                            waitForSeekBackward = false;
                            setTimeout(function () {
                                waitForStop = true;
                                media.stop();
                            }, 3000);
                        }
                        break;
                    case 'BUFFERINGPROGRESS' :
                        expect(evt.data).toBeDefined();
                        expect(evt.data.bufferingPercentage).toBeDefined();
                        expect(typeof evt.data.bufferingPercentage).toBe('number');
                        break;
                }
            },
            onerror: function (err) {
                fail('onerror occured: ' + err);
            }
        });

        waitForPlay = true;
        media.play();
    }, 100000);

    it('does NOT throws Error when "play" is called before "open"', function () {
        expect(function () {
            media.play();
        }).not.toThrow();
    });
    it('does NOT throws Error when "pause" is called before "open"', function () {
        expect(function () {
            media.pause();
        }).not.toThrow();
    });
    it('does NOT throws Error when "seekTo" is called before "open"', function () {
        expect(function () {
            media.seekTo(1000);
        }).not.toThrow();
    });
    it('does NOT throws Error when "stop" is called before "open"', function () {
        expect(function () {
            media.stop();
        }).not.toThrow();
    });
});
