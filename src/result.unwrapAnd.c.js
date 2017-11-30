'use strict';

const H = require('../interface/result.h').prototype;


H.unwrapAnd = function ($val) {
    return this.and($val).unwrap();
};
