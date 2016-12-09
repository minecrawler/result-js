'use strict';

require('../interface/result.h').prototype.isOk = function () {

    return this._err === null;
};
