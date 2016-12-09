'use strict';

var h = require('../interface/result.h');


h.fromSuccess = function ($val) {
    
    return new h($val);
};
