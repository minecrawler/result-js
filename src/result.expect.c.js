'use strict';

const sym = require('../interface/result-sym.h');


require('../interface/result.h').prototype.expect = function ($msg) {
    if (!this[sym.isOk]) {
        const msg = typeof $msg === 'string' ? $msg : 'ERROR: $msg is not a string. Also -> ';
        throw new Error(`${msg}: ${this[sym.value].toString()}`);
    }

    return this[sym.value];
};
