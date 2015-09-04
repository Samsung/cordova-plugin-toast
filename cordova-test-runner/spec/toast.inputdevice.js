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
			// invalid type for 1st argument
			expect(function () {
				toast.inputdevice.getSupportedKeys();
			}).toThrowError(TypeError);
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
				toast.inputdevice.getSupportedKeys("DUMMY");
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
				toast.inputdevice.getSupportedKeys(function () {}, "DUMMY");
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getSupportedKeys(function () {}, new Date());
			}).toThrowError(TypeError);

			// more arguments
			expect(function () {
				toast.inputdevice.getSupportedKeys(function () {}, function () {}, 0);
			});
		});
	});

	describe('toast.inputdevice.getKey', function () {
		it('throws TypeError when given arguments is not matched to spec.', function () {
			// invalid type for 1st argument
			expect(function () {
				toast.inputdevice.getKey();
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey([]);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey(new Date);
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
				toast.inputdevice.getKey("Enter", []);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey("Enter", new Date);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey("Enter", 0);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey("Enter", "DUMMY");
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey("Enter", {});
			}).toThrowError(TypeError);

			// invalid type for 3rd argument
			expect(function () {
				toast.inputdevice.getKey("Enter", function () {}, []);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey("Enter", function () {}, new Date);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey("Enter", function () {}, 0);
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey("Enter", function () {}, "DUMMY");
			}).toThrowError(TypeError);
			expect(function () {
				toast.inputdevice.getKey("Enter", function () {}, {});
			}).toThrowError(TypeError);

			// more argument
			expect(function () {
				toast.inputdevice.getKey("Enter", function () {}, function () {}, 0);
			}).toThrowError(TypeError);
		});

		it('throws RangeError when given keyName is not in the supported keys set.', function () {
			expect(function () {
				toast.inputdevice.getKey('NOT_EXISTS_KEYNAME');
			}).toThrowError(RangeError);
		});

		it('invokes the successCallback with requested key\'s InputDeviceKey object.', function (done) {
			toast.inputdevice.getSupportedKeys(function (suppKeys) {
				toast.inputdevice.getKey(suppKeys[0], function (devKey) {
					expect(devKey).toBeDefined();
					expect(devKey.name).toBeDefined();
					expect(devKey.name).toBe(suppKeys[0]);
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
			expect(function () {
				toast.inputdevice.registerKey();
			}).toThrowError(TypeError);
		});
	});

	describe('toast.inputdevice.unregisterKey', function () {
		it('throws TypeError when given arguments is not matched to spec.', function () {
			expect(function () {
				toast.inputdevice.unregisterKey();
			}).toThrowError(TypeError);
		});
	});
});