'use strict';

require('../interface/result.h').prototype.and = function ($val) {

    return this.isOk() ? $val : this._err;
};
