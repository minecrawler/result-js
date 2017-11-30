'use strict';

const hProto = require('../interface/result.h').prototype;
const sym = require('../interface/result-sym.h');


hProto.orElse = function ($resultEmitter) {
    return this[sym.isOk]
        ? this
        : hProto.fromTry($resultEmitter(this[sym.value]))
    ;
};
