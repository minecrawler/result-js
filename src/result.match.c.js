'use strict';

const hProto = require('../interface/result.h').prototype;
const sym = require('../interface/result-sym.h');


hProto.match = function ($okHandler, $errHandler) {
    if (this[sym.isOk]) {
        (typeof $okHandler === 'function') && $okHandler(this[sym.value]);
    }
    else {
        (typeof $errHandler === 'function') && $errHandler(this[sym.value]);
    }
};
