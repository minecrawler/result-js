'use strict';

const hProto = require('../interface/result.h').prototype;
const sym = require('../interface/result-sym.h');


hProto.orElse = function ($resultEmitter) {
    if (!this[sym.isOk]) {
        return hProto.fromTry($resultEmitter(this[sym.value]));
    }

    return this;
};
