'use strict';

require('../interface/result.h').prototype.unwrapErr = function () {

    if (this.isErr()) {

        return this._err;
    }

    throw new Error(this._ok);
};
