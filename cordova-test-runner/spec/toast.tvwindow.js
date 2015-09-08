describe('toast.tvwindow', function() {
    it('should be defined as "toast.tvwindow" namespace.', function() {
        expect(window.toast).toBeDefined();
        expect(window.toast.tvwindow).toBeDefined();
    });

    it('should contain a "getAvailableWindows" function.', function() {
        expect(window.toast.tvwindow.getAvailableWindows).toBeDefined();
        expect(typeof window.toast.tvwindow.getAvailableWindows).toBe('function');
    });
    it('should contain a "setSource" function.', function() {
        expect(window.toast.tvwindow.setSource).toBeDefined();
        expect(typeof window.toast.tvwindow.setSource).toBe('function');
    });
    it('should contain a "getSource" function.', function() {
        expect(window.toast.tvwindow.getSource).toBeDefined();
        expect(typeof window.toast.tvwindow.getSource).toBe('function');
    });
    it('should contain a "show" function.', function() {
        expect(window.toast.tvwindow.show).toBeDefined();
        expect(typeof window.toast.tvwindow.show).toBe('function');
    });
    it('should contain a "hide" function.', function() {
        expect(window.toast.tvwindow.hide).toBeDefined();
        expect(typeof window.toast.tvwindow.hide).toBe('function');
    });
    it('should contain a "getRect" function.', function() {
        expect(window.toast.tvwindow.getRect).toBeDefined();
        expect(typeof window.toast.tvwindow.getRect).toBe('function');
    });
    it('should not contain a property that is not exists in the specs.', function() {
        for (var prop in toast.tvwindow) {
            expect([
                'getAvailableWindows',
                'setSource',
                'getSource',
                'show',
                'hide',
                'getRect'
            ].indexOf(prop) >= 0).toBeTruthy();
        }
    });

    describe('toast.tvwindow.getAvailableWindows', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvwindow.getAvailableWindows();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvwindow.getAvailableWindows([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getAvailableWindows(new Date);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getAvailableWindows(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getAvailableWindows("DUMMY");
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getAvailableWindows({});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvwindow.getAvailableWindows(function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getAvailableWindows(function() {}, new Date);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getAvailableWindows(function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getAvailableWindows(function() {}, "DUMMY");
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getAvailableWindows(function() {}, {});
            }).toThrowError(TypeError);
        });

        it('gets list of available windows', function(done) {
            function successCB(availableWindows) {
                expect(availableWindows).toBeDefined();
                expect(typeof availableWindows.length).toBe('number');
                for (var i = 0; i < availableWindows.length; i++) {
                    console.log("Window [" + i + "] = " + availableWindows[i]);
                }
                done();
            }

            function errorCB() {
                done.fail();
            }

            toast.tvwindow.getAvailableWindows(successCB, errorCB);
        }, 3000);
    });

    describe('toast.tvwindow.show', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvwindow.show();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvwindow.show([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show(new Date);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show("DUMMY");
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show({});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvwindow.show(function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show(function() {}, new Date);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show(function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show(function() {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show(function() {}, {});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.tvwindow.show(function() {}, function() {}, new Date);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show(function() {}, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show(function() {}, function() {}, "DUMMY");
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show(function() {}, function() {}, function() {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show(function() {}, function() {}, {});
            }).toThrowError(TypeError);

            // invalid type for 4th argument
            expect(function() {
                toast.tvwindow.show(function() {}, function() {}, ["0", "0", "100px", "100px"], []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show(function() {}, function() {}, ["0", "0", "100px", "100px"], new Date);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show(function() {}, function() {}, ["0", "0", "100px", "100px"], 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show(function() {}, function() {}, ["0", "0", "100px", "100px"], function() {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show(function() {}, function() {}, ["0", "0", "100px", "100px"], {});
            }).toThrowError(TypeError);
        });
    });

    describe('toast.tvwindow.setSource', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvwindow.setSource();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvwindow.setSource([], function() {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource(new Date, function() {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource(0, function() {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource("DUMMY", function() {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource(function() {}, function() {});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvwindow.setSource({
                    type: "TV"
                }, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: "TV"
                }, new Date);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: "TV"
                }, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: "TV"
                }, "DUMMY");
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: "TV"
                }, {});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.tvwindow.setSource({
                    type: "TV"
                }, function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: "TV"
                }, function() {}, new Date);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: "TV"
                }, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: "TV"
                }, function() {}, "DUMMY");
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: "TV"
                }, function() {}, {});
            }).toThrowError(TypeError);

            // invalid type for 4th argument
            expect(function() {
                toast.tvwindow.setSource({
                    type: "TV"
                }, function() {}, function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: "TV"
                }, function() {}, function() {}, new Date);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: "TV"
                }, function() {}, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: "TV"
                }, function() {}, function() {}, function() {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: "TV"
                }, function() {}, function() {}, {});
            }).toThrowError(TypeError);
        });
    });

    describe('show/hide/setSource/getSource combination', function(done) {
        it('works well...', function(done) {
            afterEach(function () {
                toast.tvwindow.hide(function() {});
            });

            testShow(function() {
                testSourceChange(function() {
                    testHide(function() {
                        done();
                    });
                });
            });

            function testShow(callback) {
                var flag = true;
                toast.tvwindow.show(function(windowRect, type) {
                    flag = false;
                    expect(windowRect).toBeDefined();
                    expect(windowRect.length).toBe(4);
                    expect(type).toBeDefined();
                    expect(typeof type).toBe("string");
                    var ask = helper.aOrB("Can you see the TV hole window on the screen?", ["YES", "NO"], function(yes) {
                        expect(yes).toBe(true);
                        callback();
                    });
                }, function() {
                    done.fail();
                }, ["100px", "100px", "320px", "180px"]);
                // the flag must be true if the successCallback is invoked asynchronously as expected.
                expect(flag).toBeTruthy();
            }

            function testSourceChange(callback) {
                var flag = true;
                toast.tvwindow.setSource({
                    type: "TV"
                }, function() {
                    flag = false;

                    var flag2 = true;
                    toast.tvwindow.getSource(function(source) {
                        flag2 = false;
                        expect(source).toBeDefined();
                        expect(source.type).toBe("TV");
                        var ask = helper.aOrB("Can you see the \"TV\" source in the hole window?", ["YES", "NO"], function(yes) {
                            expect(yes).toBe(true);
                            callback();
                        });
                    }, function() {
                        done.fail(); // ERROR: setSource
                    });
                    expect(flag2).toBeTruthy();
                }, function() {
                    done.fail(); // ERROR: setSource
                });
                expect(flag).toBeTruthy();
            }

            function testHide(callback) {
                var flag = true;
                toast.tvwindow.hide(function() {
                    flag = false;
                    var ask = helper.aOrB("Is the TV hole window hidden now?", ["YES", "NO"], function(yes) {
                        expect(yes).toBe(true);
                        callback();
                    });
                }, function() {
                    done.fail();
                });
                expect(flag).toBeTruthy();
            }
        }, 60000);
    });
});