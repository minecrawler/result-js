'use strict';

const H = require('../interface/result.h').prototype;


H.unwrapAndThen = function ($resultEmitter) {
    return this.andThen($resultEmitter).unwrap();
};
