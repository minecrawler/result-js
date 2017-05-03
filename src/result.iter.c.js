'use strict';

const hProto = require('../interface/result.h').prototype;


hProto.iter = function () {

    const self = this;
    return {

        [Symbol.iterator]: function* () {

            if (self.isOk()) {

                yield self._val;
            }
        },
    };
};
