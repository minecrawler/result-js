'use strict';

const h = require('../interface/result.h');
const hProto = h.prototype;
const sym = require('../interface/result-sym.h');


hProto.andThen = function ($resultEmitter) {
    return this[sym.isOk]
        ? h.fromTry(() => $resultEmitter(this[sym.value]))
        : this
    ;
};
