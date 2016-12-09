'use strict';

require('../interface/result.h').prototype.or = function ($val) {

    return this.isErr() ? $val : this._val;
};
