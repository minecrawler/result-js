'use strict';

require('../interface/result.h').prototype.expectErr = function ($msg) {

    if (this.isErr()) {

        return this._err;
    }

    const msg = typeof $msg === 'string' ? $msg : 'ERROR: $msg is not a string. Also -> ';
    throw new Error(`${msg}: ${this._ok.toString()}`);
};
