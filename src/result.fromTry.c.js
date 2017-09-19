'use strict';

const H = require('../interface/result.h');
const sym = require('../interface/result-sym.h');


H.fromTry = function ($fun) {
    const result = new H();

    try {
        result[sym.value] = $fun();
        result[sym.isOk] = true;
    }
    catch ($err) {
        result[sym.value] = $err;
        result[sym.isOk] = false;
    }

    return result;
};
