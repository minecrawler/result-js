'use strict';

const h = require('../interface/result.h');


h.fromError = function ($err) {

    return new h(undefined, $err);
};
