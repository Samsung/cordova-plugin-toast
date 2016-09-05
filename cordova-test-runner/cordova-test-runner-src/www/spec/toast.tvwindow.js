/* globals helper */
describe('toast.tvwindow', function() {
    it('should be defined as "toast.tvwindow" namespace.', function() {
        expect(window.toast).toBeDefined();
        expect(window.toast.tvwindow).toBeDefined();
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
                'setSource',
                'getSource',
                'show',
                'hide',
                'getRect'
            ].indexOf(prop) >= 0).toBeTruthy();
        }
    });

    describe('toast.tvwindow.setSource', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvwindow.setSource();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvwindow.setSource([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource(function() {});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvwindow.setSource({
                    type: 'TV',
                    number: 1
                }, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: 'TV',
                    number: 1
                }, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: 'TV',
                    number: 1
                }, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: 'TV',
                    number: 1
                }, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: 'TV',
                    number: 1
                }, {});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.tvwindow.setSource({
                    type: 'TV',
                    number: 1
                }, function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: 'TV',
                    number: 1
                }, function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: 'TV',
                    number: 1
                }, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: 'TV',
                    number: 1
                }, function() {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.setSource({
                    type: 'TV',
                    number: 1
                }, function() {}, {});
            }).toThrowError(TypeError);
        });
    });

    describe('toast.tvwindow.getSource', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvwindow.getSource();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvwindow.getSource([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getSource(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getSource(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getSource('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getSource({});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvwindow.getSource(function () {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getSource(function () {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getSource(function () {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getSource(function () {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getSource(function () {}, {});
            }).toThrowError(TypeError);
        });
    });

    describe('toast.tvwindow.show', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvwindow.show();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvwindow.show(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show(function() {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show({});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvwindow.show([], []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show([], new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show([], 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show([], 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show([], {});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.tvwindow.show([], function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show([], function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show([], function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show([], function() {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.show([], function() {}, {});
            }).toThrowError(TypeError);
        });
    });

    describe('toast.tvwindow.hide', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvwindow.hide();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvwindow.hide([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.hide(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.hide(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.hide('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.hide({});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvwindow.hide(function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.hide(function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.hide(function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.hide(function() {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.hide(function() {}, {});
            }).toThrowError(TypeError);
        });
    });

    describe('toast.tvwindow.getRect', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvwindow.getRect();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvwindow.getRect([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getRect(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getRect(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getRect('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getRect({});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvwindow.getRect(function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getRect(function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getRect(function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getRect(function() {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvwindow.getRect(function() {}, {});
            }).toThrowError(TypeError);
        });
    });

    describe('setSource/getSource/show/hide/getRect combination', function(done) {
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

                toast.tvwindow.setSource({
                    type: 'TV',
                    number: 1
                }, function() {
                    toast.tvwindow.show([100, 100, 320, 180], function(windowRect) {
                        flag = false;
                        expect(windowRect).toBeDefined();
                        expect(windowRect.length).toBe(4);
                        helper.aOrB('Can you see the TV hole on the screen?', ['YES', 'NO'], function(yes) {
                            expect(yes).toBe(true);
                            callback();
                        });
                    }, function() {
                        done.fail(); // ERROR: show
                    });

                    // the flag must be true if the successCallback is invoked asynchronously as expected.
                    expect(flag).toBeTruthy();
                });
            }

            function testSourceChange(callback) {
                var flag = true;
                toast.tvwindow.setSource({
                    type: 'HDMI',
                    number: 1
                }, function(source) {
                    flag = false;
                    expect(source).toBeDefined();

                    var flag2 = true;
                    toast.tvwindow.getSource(function(source) {
                        flag2 = false;
                        expect(source).toBeDefined();
                        expect(source.type).toBe('HDMI');
                        helper.aOrB('Can you see the \"HDMI\" source in the hole window?', ['YES', 'NO'], function(yes) {
                            expect(yes).toBe(true);
                            callback();
                        });
                    }, function() {
                        done.fail(); // ERROR: getSource
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
                    helper.aOrB('Is the TV hole hidden now?', ['YES', 'NO'], function(yes) {
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
