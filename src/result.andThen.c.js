'use strict';

const H = require('../interface/result.h').prototype;
const sym = require('../interface/result-sym.h');


H.andThen = function ($resultEmitter) {
    if (this[sym.isOk]) {
        this[sym.value] = $resultEmitter(this[sym.value]);
    }

    return this;
};
