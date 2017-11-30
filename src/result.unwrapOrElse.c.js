'use strict';

const hProto = require('../interface/result.h').prototype;


hProto.unwrapOrElse = function ($resultEmitter) {
    return this.orElse($resultEmitter).unwrap();
};
