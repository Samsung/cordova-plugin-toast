/* globals helper */
describe('toast.tvchannel', function() {
    it('should be defined as "toast.tvchannel" namespace.', function() {
        expect(window.toast).toBeDefined();
        expect(window.toast.tvchannel).toBeDefined();
    });

    it('should contain a "tune" function.', function() {
        expect(window.toast.tvchannel.tune).toBeDefined();
        expect(typeof window.toast.tvchannel.tune).toBe('function');
    });
    it('should contain a "tuneUp" function.', function() {
        expect(window.toast.tvchannel.tuneUp).toBeDefined();
        expect(typeof window.toast.tvchannel.tuneUp).toBe('function');
    });
    it('should contain a "tuneDown" function.', function() {
        expect(window.toast.tvchannel.tuneDown).toBeDefined();
        expect(typeof window.toast.tvchannel.tuneDown).toBe('function');
    });
    it('should contain a "findChannel" function.', function() {
        expect(window.toast.tvchannel.findChannel).toBeDefined();
        expect(typeof window.toast.tvchannel.findChannel).toBe('function');
    });
    it('should contain a "getChannelList" function.', function() {
        expect(window.toast.tvchannel.getChannelList).toBeDefined();
        expect(typeof window.toast.tvchannel.getChannelList).toBe('function');
    });
    it('should contain a "getCurrentChannel" function.', function() {
        expect(window.toast.tvchannel.getCurrentChannel).toBeDefined();
        expect(typeof window.toast.tvchannel.getCurrentChannel).toBe('function');
    });
    it('should contain a "getProgramList" function.', function() {
        expect(window.toast.tvchannel.getProgramList).toBeDefined();
        expect(typeof window.toast.tvchannel.getProgramList).toBe('function');
    });
    it('should contain a "getCurrentProgram" function.', function() {
        expect(window.toast.tvchannel.getCurrentProgram).toBeDefined();
        expect(typeof window.toast.tvchannel.getCurrentProgram).toBe('function');
    });
    it('should contain a "addChannelChangeListener" function.', function() {
        expect(window.toast.tvchannel.addChannelChangeListener).toBeDefined();
        expect(typeof window.toast.tvchannel.addChannelChangeListener).toBe('function');
    });
    it('should contain a "removeChannelChangeListener" function.', function() {
        expect(window.toast.tvchannel.removeChannelChangeListener).toBeDefined();
        expect(typeof window.toast.tvchannel.removeChannelChangeListener).toBe('function');
    });
    it('should not contain a property that is not exists in the specs.', function() {
        for (var prop in toast.tvchannel) {
            expect([
                'tune',
                'tuneUp',
                'tuneDown',
                'findChannel',
                'getChannelList',
                'getCurrentChannel',
                'getProgramList',
                'getCurrentProgram',
                'addChannelChangeListener',
                'removeChannelChangeListener'
            ].indexOf(prop) >= 0).toBeTruthy();
        }
    });

    describe('toast.tvchannel.tune', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvchannel.tune();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvchannel.tune([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tune(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tune(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tune('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tune(function () {});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvchannel.tune({
                    major: 7,
                    minor: 1
                }, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tune({
                    major: 7,
                    minor: 1
                }, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tune({
                    major: 7,
                    minor: 1
                }, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tune({
                    major: 7,
                    minor: 1
                }, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tune({
                    major: 7,
                    minor: 1
                }, function () {});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.tvchannel.tune({
                    major: 7,
                    minor: 1
                }, {
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tune({
                    major: 7,
                    minor: 1
                }, {
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tune({
                    major: 7,
                    minor: 1
                }, {
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tune({
                    major: 7,
                    minor: 1
                }, {
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tune({
                    major: 7,
                    minor: 1
                }, {
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, {});
            }).toThrowError(TypeError);
        });
    });

    describe('toast.tvchannel.tuneUp', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvchannel.tuneUp();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvchannel.tuneUp([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneUp(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneUp(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneUp('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneUp(function() {});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvchannel.tuneUp({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneUp({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneUp({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneUp({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneUp({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, {});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.tvchannel.tuneUp({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneUp({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneUp({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneUp({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, function() {}, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneUp({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, function() {}, function () {});
            }).toThrowError(TypeError);
        });
    });

    describe('toast.tvchannel.tuneDown', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvchannel.tuneDown();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvchannel.tuneDown([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneDown(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneDown(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneDown('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneDown(function() {});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvchannel.tuneDown({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneDown({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneDown({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneDown({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneDown({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, {});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.tvchannel.tuneDown({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneDown({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneDown({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneDown({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, function() {}, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.tuneDown({
                    onsuccess: function () {},
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, function() {}, function () {});
            }).toThrowError(TypeError);
        });
    });

    describe('toast.tvchannel.findChannel', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvchannel.findChannel();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvchannel.findChannel([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.findChannel(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.findChannel('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.findChannel({});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.findChannel(function() {});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvchannel.findChannel(7, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.findChannel(7, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.findChannel(7, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.findChannel(7, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.findChannel(7, function () {});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.tvchannel.findChannel(7, 1, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.findChannel(7, 1, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.findChannel(7, 1, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.findChannel(7, 1, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.findChannel(7, 1, {});
            }).toThrowError(TypeError);

            // invalid type for 4rd argument
            expect(function() {
                toast.tvchannel.findChannel(7, 1, function () {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.findChannel(7, 1, function () {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.findChannel(7, 1, function () {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.findChannel(7, 1, function () {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.findChannel(7, 1, function () {}, {});
            }).toThrowError(TypeError);
        });
    });

    describe('toast.tvchannel.getChannelList', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvchannel.getChannelList();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvchannel.getChannelList([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList({});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, {});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, function () {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, function () {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, function () {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, function () {}, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, function () {}, function () {});
            }).toThrowError(TypeError);

            // invalid type for 4rd argument
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, function () {}, 'ALL', []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, function () {}, 'ALL', new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, function () {}, 'ALL', 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, function () {}, 'ALL', {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, function () {}, 'ALL', function () {});
            }).toThrowError(TypeError);

            // invalid type for 5rd argument
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, function () {}, 'ALL', 0, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, function () {}, 'ALL', 0, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, function () {}, 'ALL', 0, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, function () {}, 'ALL', 0, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getChannelList(function () {}, function () {}, 'ALL', 0, function () {});
            }).toThrowError(TypeError);
        });
    });

    describe('toast.tvchannel.getCurrentChannel', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvchannel.getCurrentChannel();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvchannel.getCurrentChannel([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getCurrentChannel(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getCurrentChannel(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getCurrentChannel('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getCurrentChannel({});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvchannel.getCurrentChannel(function () {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getCurrentChannel(function () {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getCurrentChannel(function () {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getCurrentChannel(function () {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getCurrentChannel(function () {}, {});
            }).toThrowError(TypeError);
        });
    });

    describe('toast.tvchannel.getProgramList', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvchannel.getProgramList();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvchannel.getProgramList([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList(function () {});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, function () {});
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, new Date(), []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, new Date(), new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, new Date(), 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, new Date(), 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, new Date(), {});
            }).toThrowError(TypeError);

            // invalid type for 4rd argument
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, new Date(), function () {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, new Date(), function () {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, new Date(), function () {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, new Date(), function () {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, new Date(), function () {}, {});
            }).toThrowError(TypeError);

            // invalid type for 5rd argument
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, new Date(), function () {}, function () {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, new Date(), function () {}, function () {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, new Date(), function () {}, function () {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, new Date(), function () {}, function () {}, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getProgramList({
                    major: 7,
                    minor: 1
                }, new Date(), function () {}, function () {}, function () {});
            }).toThrowError(TypeError);
        });
    });

    describe('toast.tvchannel.getCurrentProgram', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvchannel.getCurrentProgram();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvchannel.getCurrentProgram([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getCurrentProgram(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getCurrentProgram(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getCurrentProgram('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getCurrentProgram({});
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.tvchannel.getCurrentProgram(function () {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getCurrentProgram(function () {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getCurrentProgram(function () {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getCurrentProgram(function () {}, 'DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.getCurrentProgram(function () {}, {});
            }).toThrowError(TypeError);
        });
    });

    describe('toast.tvchannel.addChannelChangeListener', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.tvchannel.addChannelChangeListener();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.tvchannel.addChannelChangeListener([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.addChannelChangeListener(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.addChannelChangeListener(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.addChannelChangeListener('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.addChannelChangeListener({});
            }).toThrowError(TypeError);
        });
    });

    describe('toast.tvchannel.removeChannelChangeListener', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // invalid type for 1st argument
            expect(function() {
                toast.tvchannel.removeChannelChangeListener([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.removeChannelChangeListener(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.removeChannelChangeListener(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.removeChannelChangeListener('DUMMY');
            }).toThrowError(TypeError);
            expect(function() {
                toast.tvchannel.removeChannelChangeListener({});
            }).toThrowError(TypeError);
        });
    });

    describe('tune/tuneUp/tuneDown combination', function(done) {
        it('works well...', function(done) {
            afterEach(function () {
                toast.tvwindow.hide(function() {});
            });

            testTune(function() {
                testChannelChange(function() {
                    testHide(function() {
                        done();
                    });
                });
            });

            function testTune(callback) {
                toast.tvwindow.setSource({
                    type: 'TV',
                    number: 1
                }, function() {
                    toast.tvwindow.show([100, 100, 320, 180], function() {
                        var flag = true;
                        toast.tvchannel.tune({
                            major: 7,
                            minor: 1
                        }, {
                            onsuccess: function (channelInfo) {
                                flag = false;
                                expect(channelInfo).toBeDefined();
                                expect(channelInfo.major).toBe(7);
                                expect(channelInfo.minor).toBe(1);
                                helper.aOrB('Can you see the \"7-1\" channel in the hole window?', ['YES', 'NO'], function(yes) {
                                    expect(yes).toBe(true);
                                    callback();
                                });
                            },
                            onnosignal: function () {},
                            onprograminforeceived: function () {}
                        }, function () {
                            done.fail(); // ERROR: tune
                        });

                        // the flag must be true if the successCallback is invoked asynchronously as expected.
                        expect(flag).toBeTruthy();
                    });
                });
            }

            function testChannelChange(callback) {
                var flag = true;
                toast.tvchannel.tuneUp({
                    onsuccess: function (channelInfo) {
                        flag = false;
                        expect(channelInfo).toBeDefined();

                        var flag2 = true;
                        toast.tvchannel.tuneDown({
                            onsuccess: function (channelInfo) {
                                flag2 = false;
                                expect(channelInfo).toBeDefined();
                                expect(channelInfo.major).toBe(7);
                                expect(channelInfo.minor).toBe(1);
                                helper.aOrB('Can you see the \"7-1\" channel in the hole window?', ['YES', 'NO'], function(yes) {
                                    expect(yes).toBe(true);
                                    callback();
                                });
                            },
                            onnosignal: function () {},
                            onprograminforeceived: function () {}
                        }, function () {
                            done.fail(); // ERROR: tuneDown
                        }, 'ALL');

                        // the flag must be true if the successCallback is invoked asynchronously as expected.
                        expect(flag2).toBeTruthy();
                    },
                    onnosignal: function () {},
                    onprograminforeceived: function () {}
                }, function () {
                    done.fail(); // ERROR: tuneUp
                }, 'ALL');

                // the flag must be true if the successCallback is invoked asynchronously as expected.
                expect(flag).toBeTruthy();
            }

            function testHide(callback) {
                toast.tvwindow.hide(function() {
                    callback();
                });
            }
        }, 60000);
    });
});
