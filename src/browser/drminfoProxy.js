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

'use strict';

// dummy data from tizen
var dummyEsn = 'ESN_DUMMYDATA_TVONLY';
var dummySdi = 'SDI_DUMMYDATA_TVONLY';

module.exports = {
    getEsn: function(success, fail, args) {
        try {
            var result = dummyEsn;
            success(result);
        }
        catch(e) {
            fail(new Error('failed to getEsn'));
        }
    },
    getSdi: function(success, fail, args) {
        try {
            var result = dummySdi;
            success(result);
        }
        catch(e) {
            fail(new Error('failed to getSdi'));
        }
    }
};

require('cordova/exec/proxy').add('toast.drminfo',module.exports);
