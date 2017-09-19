'use strict';

const hProto = require('../interface/result.h').prototype;
const sym = require('../interface/result-sym.h');


hProto.node = function ($handler) {
    if (typeof $handler !== 'function') {
        throw new Error('The handler must be callable!');
    }

    if (this[sym.isOk]) {
        $handler(null, this[sym.value]);
    }
    else {
        $handler(this[sym.value]);
    }
};
