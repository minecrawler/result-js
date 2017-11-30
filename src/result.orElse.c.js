'use strict';

const h = require('../interface/result.h');
const hProto = h.prototype;
const sym = require('../interface/result-sym.h');


hProto.orElse = function ($resultEmitter) {
    return this[sym.isOk]
        ? this
        : h.fromTry(() => $resultEmitter(this[sym.value]))
    ;
};
