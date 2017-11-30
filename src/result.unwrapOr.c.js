'use strict';

const hProto = require('../interface/result.h').prototype;


hProto.unwrapOr = function ($val) {
    return this.or($val).unwrap();
};
