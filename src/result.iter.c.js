'use strict';

const hProto = require('../interface/result.h').prototype;
const sym = require('../interface/result-sym.h');


hProto.iter = function () {
    const self = this;

    return {
        [Symbol.iterator]: function* () {
            if (self[sym.isOk]) {
                yield self[sym.value];
            }
        },
    };
};
