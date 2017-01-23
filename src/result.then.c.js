'use strict';

const hProto = require('../interface/result.h').prototype;


hProto.then = function ($okHandler, $errHandler) {

    if (this.isOk()) {

        process.nextTick(() => $okHandler(this._val));
    }
    else {

        process.nextTick(() => $errHandler(this._err));
    }
};
