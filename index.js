'use strict';


require('./src/result._init.c');
require('./src/result.and.c');
require('./src/result.andThen.c');
require('./src/result.expect.c');
require('./src/result.fromError.c');
require('./src/result.fromSuccess.c');
require('./src/result.fromTry.c');
require('./src/result.isErr.c');
require('./src/result.isOk.c');
require('./src/result.map.c');
require('./src/result.mapErr.c');
require('./src/result.iter.c');
require('./src/result.match.c');
require('./src/result.or.c');
require('./src/result.orElse.c');
require('./src/result.registerGlobals.c');
require('./src/result.unwrap.c');
require('./src/result.unwrapErr.c');


module.exports = require('./interface/result.h');
