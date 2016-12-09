'use strict';

require('../interface/result.h').prototype.expect = function ($msg) {

    return this.orElse(() => {
        
        throw new Error(`${$msg}: ${this._err.toString()}`);
    });
};
