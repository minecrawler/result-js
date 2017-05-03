'use strict';

const hProto = require('../interface/result.h').prototype;


hProto.map = function ($op = $ => $) {

    if (this.isOk()) {

        this._val = $op(this._val);
    }

    return this;
};
