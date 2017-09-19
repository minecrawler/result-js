'use strict';

const h = require('../interface/result.h');


h.registerGlobals = function () {
    global.Ok = h.fromSuccess;
    global.Err = h.fromError;
};
