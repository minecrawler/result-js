'use strict';

const sym = require('../interface/result-sym.h');


require('../interface/result.h').prototype.isErr = function () {
    return !this[sym.isOk];
};
