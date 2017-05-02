'use strict';

const h = require('../interface/result.h');


let initialized = false;

h.registerGlobals = function () {

    if (initialized) {

        return;
    }

    global.Ok = h.fromSuccess;
    global.Err = h.fromError;
    initialized = true;
};
