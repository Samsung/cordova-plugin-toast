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

describe('toast.tvaudiocontrol', function() {
    it('should be defined as "toast.tvaudiocontrol" namespace.', function() {
        expect(window.toast).toBeDefined();
        expect(window.toast.tvaudiocontrol).toBeDefined();
    });
    it('should contain a "setMute" function.', function() {
        expect(window.toast.tvaudiocontrol.setMute).toBeDefined();
        expect(typeof window.toast.tvaudiocontrol.setMute).toBe('function');
    });
    it('should contain a "isMute" function.', function() {
        expect(window.toast.tvaudiocontrol.isMute).toBeDefined();
        expect(typeof window.toast.tvaudiocontrol.isMute).toBe('function');
    });
    it('should contain a "setVolume" function.', function() {
        expect(window.toast.tvaudiocontrol.setVolume).toBeDefined();
        expect(typeof window.toast.tvaudiocontrol.setVolume).toBe('function');
    });
    it('should contain a "setVolumeUp" function.', function() {
        expect(window.toast.tvaudiocontrol.setVolumeUp).toBeDefined();
        expect(typeof window.toast.tvaudiocontrol.setVolumeUp).toBe('function');
    });
    it('should contain a "setVolumeDown" function.', function() {
        expect(window.toast.tvaudiocontrol.setVolumeDown).toBeDefined();
        expect(typeof window.toast.tvaudiocontrol.setVolumeDown).toBe('function');
    });
    it('should contain a "getVolume" function.', function() {
        expect(window.toast.tvaudiocontrol.getVolume).toBeDefined();
        expect(typeof window.toast.tvaudiocontrol.getVolume).toBe('function');
    });
    it('should contain a "setMute" function.', function() {
        expect(window.toast.tvaudiocontrol.setMute).toBeDefined();
        expect(typeof window.toast.tvaudiocontrol.setMute).toBe('function');
    });
    it('should contain a "setVolumeChangeListener" function.', function() {
        expect(window.toast.tvaudiocontrol.setVolumeChangeListener).toBeDefined();
        expect(typeof window.toast.tvaudiocontrol.setVolumeChangeListener).toBe('function');
    });
    it('should contain a "unsetVolumeChangeListener" function.', function() {
        expect(window.toast.tvaudiocontrol.unsetVolumeChangeListener).toBeDefined();
        expect(typeof window.toast.tvaudiocontrol.unsetVolumeChangeListener).toBe('function');
    });
    it('should not contain a property that is not exists in the specs.', function() {
        for (var prop in toast.tvaudiocontrol) {
            expect([
                'setMute',
                'isMute',
                'setVolume',
                'setVolumeUp',
                'setVolumeDown',
                'getVolume',
                'setVolumeChangeListener',
                'unsetVolumeChangeListener'
            ].indexOf(prop) >= 0).toBeTruthy();
        }
    });
    describe('toast.tvaudiocontrol.setMute', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvaudiocontrol.setMute();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvaudiocontrol.setMute([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setMute(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setMute('');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setMute({});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setMute(function() {});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvaudiocontrol.setMute(true, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setMute(true, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setMute(true, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setMute(true, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setMute(true, false);
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.tvaudiocontrol.setMute(true, function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setMute(true, function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setMute(true, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setMute(true, function() {}, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setMute(true, function() {}, false);
            }).toThrowError(TypeError);
        });

        it('sets mute state to \'true\'', function (done) {
            var mutestate = true;
            toast.tvaudiocontrol.setMute(mutestate, function() {
                toast.tvaudiocontrol.isMute(function(value) {
                    expect(value).toBe(mutestate);
                    done();
                }, function() {
                    done.fail();
                });
            }, function() {
                done.fail();
            });
        }, 3000);

        it('sets mute state to \'false\'', function (done) {
            var mutestate = false;
            toast.tvaudiocontrol.setMute(mutestate, function() {
                toast.tvaudiocontrol.isMute(function(value) {
                    expect(value).toBe(mutestate);
                    done();
                }, function() {
                    done.fail();
                });
            }, function() {
                done.fail();
            });
        }, 3000);
    });
    describe('toast.tvaudiocontrol.isMute', function() {
        it('returns mute value as boolean', function (done) {
            var mute = '';
            toast.tvaudiocontrol.isMute(function(value) {
                mute = value;
                expect(mute).toBeDefined();
                expect(typeof mute).toBe('boolean');
                done();
            }, function() {
                done.fail();
            });
        }, 3000);
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvaudiocontrol.isMute();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvaudiocontrol.isMute([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.isMute(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.isMute(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.isMute({});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.isMute(false);
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvaudiocontrol.isMute(function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.isMute(function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.isMute(function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.isMute(function() {}, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.isMute(function() {}, false);
            }).toThrowError(TypeError);
        });
    });
    describe('toast.tvaudiocontrol.setVolume', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvaudiocontrol.setVolume();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvaudiocontrol.setVolume([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolume(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolume('');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolume({});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolume(false);
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvaudiocontrol.setVolume(5, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolume(5, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolume(5, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolume(5, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolume(5, false);
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.tvaudiocontrol.setVolume(5, function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolume(5, function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolume(5, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolume(5, function() {}, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolume(5, function() {}, false);
            }).toThrowError(TypeError);
        });

        it('is the volume set to 5, as you expected?', function (done) {
            var expectValue = 5;

            toast.tvaudiocontrol.setVolume(expectValue, function() {
                var volume = '';
                toast.tvaudiocontrol.getVolume(function(value) {
                    volume = value;
                    expect(volume).toBeDefined();
                    expect(volume).toBe(expectValue);
                    done();
                }, function() {
                    done.fail();
                });
            }, function() {
                done.fail();
            });
        },3000);
    });
    describe('toast.tvaudiocontrol.setVolumeUp', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvaudiocontrol.setVolumeUp();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvaudiocontrol.setVolumeUp([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeUp(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeUp(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeUp({});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeUp(false);
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvaudiocontrol.setVolumeUp(function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeUp(function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeUp(function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeUp(function() {}, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeUp(function() {}, false);
            }).toThrowError(TypeError);
        });

        it('is the volume increased 1 level, as you expected?', function (done) {
            var currentVolume = null;
            toast.tvaudiocontrol.getVolume(function(value) {
                currentVolume = value;
                console.log('currentVolume before volume up: ' + currentVolume);

                toast.tvaudiocontrol.setVolumeUp(function() {
                    toast.tvaudiocontrol.getVolume(function(value) {
                        console.log('currentVolume after volume up : ' + value);
                        if(currentVolume < 100) {
                            expect(value).toBe(currentVolume + 1);
                        }
                        else {
                            expect(value).toBe(currentVolume);
                        }
                        done();
                    });
                }, function() {
                    done.fail();
                });
            });
        },3000);
    });
    describe('toast.tvaudiocontrol.setVolumeDown', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvaudiocontrol.setVolumeDown();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvaudiocontrol.setVolumeDown([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeDown(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeDown(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeDown({});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeDown(false);
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvaudiocontrol.setVolumeDown(function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeDown(function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeDown(function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeDown(function() {}, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeDown(function() {}, false);
            }).toThrowError(TypeError);
        });

        it('is the volume decreased 1 level, as you expected?', function (done) {
            var currentVolume = null;
            toast.tvaudiocontrol.getVolume(function(value) {
                currentVolume = value;
                console.log('currentVolume before volume down: ' + currentVolume);

                toast.tvaudiocontrol.setVolumeDown(function() {
                    toast.tvaudiocontrol.getVolume(function(value) {
                        console.log('currentVolume after volume down : ' + value);
                        if(currentVolume > 0) {
                            expect(value).toBe(currentVolume - 1);
                        }
                        else {
                            expect(value).toBe(currentVolume);
                        }
                        done();
                    });
                }, function() {
                    done.fail();
                });
            });
        },3000);
    });
    describe('toast.tvaudiocontrol.getVolume', function() {
        it('returns volume value as number', function (done) {
            var volume = '';
            toast.tvaudiocontrol.getVolume(function(value) {
                volume = value;
                expect(volume).toBeDefined();
                expect(typeof volume).toBe('number');
                done();
            }, function() {
                done.fail();
            });
        }, 3000);
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvaudiocontrol.getVolume();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvaudiocontrol.getVolume([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.getVolume(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.getVolume(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.getVolume({});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.getVolume(false);
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvaudiocontrol.getVolume(function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.getVolume(function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.getVolume(function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.getVolume(function() {}, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.getVolume(function() {}, false);
            }).toThrowError(TypeError);
        });
    });
    describe('toast.tvaudiocontrol.setVolumeChangeListener', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvaudiocontrol.setVolumeChangeListener();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvaudiocontrol.setVolumeChangeListener([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeChangeListener(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeChangeListener('');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeChangeListener({});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeChangeListener(false);
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvaudiocontrol.setVolumeChangeListener(function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeChangeListener(function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeChangeListener(function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeChangeListener(function() {}, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeChangeListener(function() {}, false);
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.tvaudiocontrol.setVolumeChangeListener(function() {}, function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeChangeListener(function() {}, function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeChangeListener(function() {}, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeChangeListener(function() {}, function() {}, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.setVolumeChangeListener(function() {}, function() {}, false);
            }).toThrowError(TypeError);
        });
    });
    describe('toast.tvaudiocontrol.unsetVolumeChangeListener', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvaudiocontrol.unsetVolumeChangeListener();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvaudiocontrol.unsetVolumeChangeListener([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.unsetVolumeChangeListener(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.unsetVolumeChangeListener(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.unsetVolumeChangeListener({});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.unsetVolumeChangeListener(false);
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvaudiocontrol.unsetVolumeChangeListener(function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.unsetVolumeChangeListener(function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.unsetVolumeChangeListener(function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.unsetVolumeChangeListener(function() {}, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvaudiocontrol.unsetVolumeChangeListener(function() {}, false);
            }).toThrowError(TypeError);
        });
    });
});
