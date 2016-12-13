'use strict';

require('../interface/result.h').prototype.unwrap = function () {

    if (this.isOk()) {

        return this._val;
    }

    throw this._err;
};
