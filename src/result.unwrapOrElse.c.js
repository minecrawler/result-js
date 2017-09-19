'use strict';

const hProto = require('../interface/result.h').prototype;
const sym = require('../interface/result-sym.h');


hProto.unwrapOrElse = function ($resultEmitter) {
    if (!this[sym.isOk]) {
         return $resultEmitter(this[sym.value]);
    }

    return this[sym.value];
};
