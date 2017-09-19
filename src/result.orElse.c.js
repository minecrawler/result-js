'use strict';

const hProto = require('../interface/result.h').prototype;
const sym = require('../interface/result-sym.h');


hProto.orElse = function ($resultEmitter) {
    if (!this[sym.isOk]) {
        this[sym.value] = $resultEmitter(this[sym.value]);
        this[sym.isOk] = true;
    }

    return this;
};
