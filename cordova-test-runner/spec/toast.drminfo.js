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
        it('returns Esn value as string', function (done) {
            var esn = null;
            toast.drminfo.getEsn('WIDEVINE', function(value) {
                esn = value;
                expect(esn).toBeDefined();
                expect(typeof esn).toBe('string');
                done();
            }, function() {
                done.fail();
            });
        }, 3000);
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

            // invalid type for 2nd argument
            expect(function() {
                toast.drminfo.getEsn('WIDEVINE', []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getEsn('WIDEVINE', new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getEsn('WIDEVINE', 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getEsn('WIDEVINE', {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getEsn('WIDEVINE', false);
            }).toThrowError(TypeError);

            // invalid type for 3rd argument
            expect(function() {
                toast.drminfo.getEsn('WIDEVINE', function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getEsn('WIDEVINE', function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getEsn('WIDEVINE', function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getEsn('WIDEVINE', function() {}, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getEsn('WIDEVINE', function() {}, false);
            }).toThrowError(TypeError);
        });
    });
    describe('toast.drminfo.getSdi', function() {
        it('returns SDI(Samsung Device Identifier) as string', function (done) {
            var sdi = null;
            toast.drminfo.getSdi(function(value) {
                sdi = value;
                expect(sdi).toBeDefined();
                expect(typeof sdi).toBe('string');
                done();
            }, function() {
                done.fail();
            });
        }, 3000);
        it('throws TypeError when given arguments is not matched to spec.', function() {
            // no argument
            expect(function() {
                toast.drminfo.getSdi();
            }).toThrowError(TypeError);

            // invalid type for 1st argument
            expect(function() {
                toast.drminfo.getSdi([]);
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getSdi(new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getSdi(0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getSdi({});
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getSdi(false);
            }).toThrowError(TypeError);

            // invalid type for 2nd argument
            expect(function() {
                toast.drminfo.getSdi(function() {}, []);
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getSdi(function() {}, new Date());
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getSdi(function() {}, 0);
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getSdi(function() {}, {});
            }).toThrowError(TypeError);
            expect(function() {
                toast.drminfo.getSdi(function() {}, false);
            }).toThrowError(TypeError);
        });
    });
});
