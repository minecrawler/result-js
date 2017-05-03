'use strict';

const Result = require('../interface/result.h');
const hProto = Result.prototype;


hProto.map = function ($op = $ => $) {

    if (this.isOk()) {

        return Result.fromSuccess($op(this._val));
    }

    return Result.fromError(this._err);
};
