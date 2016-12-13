'use strict';

require('../interface/result.h').prototype.and = function ($val) {

    return this.isOk() ? $val : new Error(this._err);
};
