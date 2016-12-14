'use strict';

require('../interface/result.h').prototype.expect = function ($msg) {

    return this.orElse(() => {

        const msg = typeof $msg === 'string' ? $msg : 'ERROR: $msg is not a string. Also -> ';
        throw new Error(`${msg}: ${this._err.toString()}`);
    });
};
