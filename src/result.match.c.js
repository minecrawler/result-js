'use strict';

require('../interface/result.h').prototype.match = function ($okHandler, $errHandler) {

    if (this.isOk()) {

        $okHandler(this._val);
    }
    else {

        $errHandler(this._err);
    }
};
