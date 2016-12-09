'use strict';

require('../interface/result.h').prototype.isErr = function () {

    return this._err !== null;
};
