'use strict';

const sym = require('../interface/result-sym.h');


require('../interface/result.h').prototype.unwrap = function () {
    if (this[sym.isOk]) {
        return this[sym.value];
    }

    throw new Error(this[sym.value]);
};
