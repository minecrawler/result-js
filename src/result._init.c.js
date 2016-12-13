'use strict';

require('../interface/result.h').prototype._init = function ($val, $err) {

    // Other objects in the prototype chain can set the following property
    // in order to prevent default initialization which might overwrite
    // previously set data
    if (this._isInitialized) {

        return;
    }

    if (
        (typeof $val === 'undefined' && typeof $err === 'undefined') ||
        ($val === null && $err === null)
    ) {

        this._val = undefined;
        this._err = new Error('Result cannot be initialized with neither `val` nor `err` passed to it!');
    }
    else {

        this._val = $val || null;

        if (typeof $err === 'undefined' || $err === null) {

            this._err = null;
        }
        else {

            this._err = $err;
        }
    }

    this._isInitialized = true;
};
