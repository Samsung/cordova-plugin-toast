/* globals helper */
describe('toast.drminfo', function() {
    it('should be defined as "toast.drminfo" namespace.', function() {
        expect(window.toast).toBeDefined();
        expect(window.toast.drminfo).toBeDefined();
    });

    it('should contain a "getEsn" function.', function() {
        expect(window.toast.drminfo.getEsn).toBeDefined();
        expect(typeof window.toast.drminfo.getEsn).toBe('function');
    });
    it('should contain a "getSdi" function.', function() {
        expect(window.toast.drminfo.getSdi).toBeDefined();
        expect(typeof window.toast.drminfo.getSdi).toBe('function');
    });
    it('should not contain a property that is not exists in the specs.', function() {
        for (var prop in toast.drminfo) {
            expect([
                'getEsn',
                'getSdi'
            ].indexOf(prop) >= 0).toBeTruthy();
        }
    });
    describe('toast.drminfo.getEsn', function() {
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.drminfo.getEsn();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.drminfo.getEsn([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getEsn(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getEsn(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getEsn(function () {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getEsn({});
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getEsn(false);
            }).toThrowError(TypeError);
        });
    });
    describe('toast.drminfo.getSdi', function() {
        it('returns SDI(Samsung Device Identifier) as string', function () {
            var sdi = toast.drminfo.getSdi();
            expect(sdi).toBeDefined();
            expect(typeof sdi).toBe('string');
        });
    });
});