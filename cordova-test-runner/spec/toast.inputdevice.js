/* globals helper */
describe('toast.inputdevice', function () {
	it('should be defined as "toast.inputdevice" namespace.', function () {
		expect(window.toast).toBeDefined();
		expect(window.toast.inputdevice).toBeDefined();
	});

	it('should contain a "getSupportedKeys" function.', function () {
		expect(window.toast.inputdevice.getSupportedKeys).toBeDefined();
		expect(typeof window.toast.inputdevice.getSupportedKeys).toBe('function');
	});
	it('should contain a "getKey" function.', function () {
		expect(window.toast.inputdevice.getKey).toBeDefined();
		expect(typeof window.toast.inputdevice.getKey).toBe('function');
	});
	it('should contain a "registerKey" function.', function () {
		expect(window.toast.inputdevice.registerKey).toBeDefined();
		expect(typeof window.toast.inputdevice.registerKey).toBe('function');
	});
	it('should contain a "unregisterKey" function.', function () {
		expect(window.toast.inputdevice.unregisterKey).toBeDefined();
		expect(typeof window.toast.inputdevice.unregisterKey).toBe('function');
	});
	it('should not contain a property that is not exists in the specs.', function () {
		for(var prop in toast.inputdevice) {
			expect([
				'getSupportedKeys',
				'getKey',
				'registerKey',
				'unregisterKey'].indexOf(prop) >= 0).toBeTruthy();
		}
	});

	describe('toast.inputdevice.getSupportedKeys', function () {
		it('throws TypeError when given arguments is not matched to spec.', function () {
			// no argument
			expect(function () {
				toast.inputdevice.getSupportedKeys();
			}).toThrowError(TypeError);
			
			// invalid type for 1st argument
			expect(function () {
				toast.inputdevice.getSupportedKeys(0);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getSupportedKeys([]);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getSupportedKeys({});
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getSupportedKeys('DUMMY');
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getSupportedKeys(new Date());
			}).toThrowError(TypeError);

			// invalid type for 2nd argument
			expect(function () {
				toast.inputdevice.getSupportedKeys(function () {}, 0);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getSupportedKeys(function () {}, []);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getSupportedKeys(function () {}, {});
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getSupportedKeys(function () {}, 'DUMMY');
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getSupportedKeys(function () {}, new Date());
			}).toThrowError(TypeError);
		});
	});

	describe('toast.inputdevice.getKey', function () {
		it('throws TypeError when given arguments is not matched to spec.', function () {
			// no argument
			expect(function () {
				toast.inputdevice.getKey();
			}).toThrowError(TypeError);

			// invalid type for 1st argument
			expect(function () {
				toast.inputdevice.getKey([]);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey(new Date());
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey(0);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey(function () {});
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey({});
			}).toThrowError(TypeError);

			// invalid type for 2nd argument
			expect(function () {
				toast.inputdevice.getKey('Enter', []);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey('Enter', new Date());
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey('Enter', 0);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey('Enter', 'DUMMY');
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey('Enter', {});
			}).toThrowError(TypeError);

			// invalid type for 3rd argument
			expect(function () {
				toast.inputdevice.getKey('Enter', function () {}, []);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey('Enter', function () {}, new Date());
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey('Enter', function () {}, 0);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey('Enter', function () {}, 'DUMMY');
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey('Enter', function () {}, {});
			}).toThrowError(TypeError);
		});

		it('throws RangeError when given keyName is not in the supported keys set.', function () {
			expect(function () {
				toast.inputdevice.getKey('NOT_EXISTS_KEYNAME', function () {});
			}).toThrowError(RangeError);
		});

		it('invokes the successCallback with requested key\'s InputDeviceKey object.', function (done) {
			toast.inputdevice.getSupportedKeys(function (suppKeys) {
				toast.inputdevice.getKey(suppKeys[0].name, function (devKey) {
					expect(devKey).toBeDefined();
					expect(devKey.name).toBeDefined();
					expect(devKey.name).toBe(suppKeys[0].name);
					expect(devKey.code).toBeDefined();
					expect(typeof devKey.code).toBe('number');
					done();
				}, function () {
					// ERROR: getKey
					done.fail();
				});
			}, function () {
				// ERROR: getSupportedKeys
				done.fail();
			});
		}, 3000);	// whole asynchronous jobs are must be done in 5 seconds
	});

	describe('toast.inputdevice.registerKey', function () {
		it('throws TypeError when given arguments is not matched to spec.', function () {
			// no argument
			expect(function () {
				toast.inputdevice.registerKey();
			}).toThrowError(TypeError);

			// invalid type for 1st argument
			expect(function () {
				toast.inputdevice.registerKey([]);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.registerKey(new Date());
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.registerKey(0);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.registerKey(function () {});
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.registerKey({});
			}).toThrowError(TypeError);
		});

		it('throws RangeError when given keyName is not in the supported keys set.', function () {
			expect(function () {
				toast.inputdevice.registerKey('NOT_EXISTS_KEYNAME');
			}).toThrowError(TypeError);
		});
	});

	describe('toast.inputdevice.unregisterKey', function () {
		it('throws TypeError when given arguments is not matched to spec.', function () {
			// no argument
			expect(function () {
				toast.inputdevice.registerKey();
			}).toThrowError(TypeError);

			// invalid type for 1st argument
			expect(function () {
				toast.inputdevice.registerKey([]);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.registerKey(new Date());
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.registerKey(0);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.registerKey(function () {});
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.registerKey({});
			}).toThrowError(TypeError);
		});

		it('throws RangeError when given keyName is not in the supported keys set.', function () {
			expect(function () {
				toast.inputdevice.registerKey('NOT_EXISTS_KEYNAME');
			}).toThrowError(TypeError);
		});
	});

	describe('registerKey & unregisterKey combination', function () {
		it('is available to register with registerKey method and the key is available to accept via keydown event.', function (done) {
			expect(function () {
				var keyData;
				toast.inputdevice.getKey('ColorF0Red', function (key) {
					keyData = key;
					toast.inputdevice.registerKey('ColorF0Red');
					function onKeyDown (e) {
						e.preventDefault();
						if(e.keyCode === keyData.code) {
							ask.done(true);
							window.removeEventListener('keydown', onKeyDown);
						}
					}
					window.addEventListener('keydown', onKeyDown);
					var ask = helper.ask('Press the RED key on the remote control', function (ok) {
						ok===true ? (done()) : (done.fail());
					}, 3000);
				});
			}).toThrowError(RangeError);
		}, 5000);
		it('unregisters given key and the key is available to accept via keydown event.', function (done) {
			expect(function () {
				var keyData;
				toast.inputdevice.getKey('ColorF0Red', function (key) {
					keyData = key;
					toast.inputdevice.unregisterKey('ColorF0Red');
					function onKeyDown (e) {
						e.preventDefault();
						if(e.keyCode === keyData.code) {
							ask.done(false);	// SHOULD NOT BE WORKED!!!
							window.removeEventListener('keydown', onKeyDown);
						}
					}
					window.addEventListener('keydown', onKeyDown);
					var ask = helper.ask('Press the RED key on the remote control. It should not be worked! ;)', function (ok) {
						if(ok === 'TIMEOUT' || ok === true) {
							done();
						}
						else {
							done.fail();
						}
					}, 3000);
				});
			}).toThrowError(RangeError);
		}, 5000);
	});
});
