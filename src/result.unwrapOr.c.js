'use strict';

const hProto = require('../interface/result.h').prototype;
const sym = require('../interface/result-sym.h');


hProto.unwrapOr = function ($val) {
    return this.or($val).unwrap();
};
