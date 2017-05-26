'use strict';

const hProto = require('../interface/result.h').prototype;


hProto.node = function ($handler) {

    if (typeof $handler !== 'function') {

        throw new Error('The handler must be callable!');
    }

    $handler(
        this.isErr() ? this._err : null,
        this.isOk()  ? this._val : null
    );
};
