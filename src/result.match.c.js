'use strict';

const hProto = require('../interface/result.h').prototype;


hProto.match = function ($okHandler, $errHandler) {

    if (this.isOk()) {

        $okHandler(this._val);
    }
    else {

        $errHandler(this._err);
    }
};


// Aliases
hProto.then = hProto.match;
