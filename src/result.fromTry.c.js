'use strict';

const h = require('../interface/result.h');


h.fromTry = function ($fun) {

    try {

        return h.fromSuccess($fun());
    }
    catch ($err) {

        return h.fromError($err);
    }
};
