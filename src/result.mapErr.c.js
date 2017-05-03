'use strict';

const hProto = require('../interface/result.h').prototype;


hProto.mapErr = function ($op = $ => $) {

    if (this.isErr()) {

        this._err = $op(this._err);
    }

    return this;
};
