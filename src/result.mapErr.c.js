'use strict';

const Result = require('../interface/result.h');
const hProto = Result.prototype;


hProto.mapErr = function ($op = $ => $) {

    if (this.isErr()) {

        return Result.fromError($op(this._err));
    }

    return Result.fromSuccess(this._val);
};
