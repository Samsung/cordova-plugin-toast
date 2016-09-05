describe('toast.application', function () {
    it('should be defined as "toast.application" namespace.', function () {
        expect(window.toast).toBeDefined();
        expect(window.toast.application).toBeDefined();
    });
    it('should contain a "exit" function.', function () {
        expect(window.toast.application.exit).toBeDefined();
        expect(typeof window.toast.application.exit).toBe('function');
    });
    it('should not contain a property that is not exists in the specs.', function () {
        for(var prop in toast.application) {
            expect([
                'exit',
                'launchApp',
                'getRequestedAppInfo'
            ].indexOf(prop) >= 0).toBeTruthy();
        }
    });
    it('should contain a "launchApp" function.', function () {
        expect(window.toast.application.launchApp).toBeDefined();
        expect(typeof window.toast.application.launchApp).toBe('function');
    });
    it('should contain a "getRequestedAppInfo" function.', function () {
        expect(window.toast.application.getRequestedAppInfo).toBeDefined();
        expect(typeof window.toast.application.getRequestedAppInfo).toBe('function');
    });
});
