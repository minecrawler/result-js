'use strict';

const sym = require('../interface/result-sym.h');


require('../interface/result.h').prototype.isOk = function () {
    return !!this[sym.isOk];
};
