'use strict';

const H = require('../interface/result.h').prototype;
const sym = require('../interface/result-sym.h');


H.unwrapAndThen = function ($resultEmitter) {
    if (this[sym.isOk]) {
        return $resultEmitter(this[sym.value]);
    }

    throw new Error('The contained value is an Err!');
};
