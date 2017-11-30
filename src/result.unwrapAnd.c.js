'use strict';

const H = require('../interface/result.h').prototype;
const sym = require('../interface/result-sym.h');


H.unwrapAnd = function ($val) {
    return this.and($val).unwrap();
};
