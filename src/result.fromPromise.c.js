'use strict';

const h = require('../interface/result.h');


const makeSync = function($fun) {

    const iterator = $fun();
    const loop = $result => {

        if (!$result.done) {

            $result.value.then(
                $res => loop(iterator.next($res)),
                $err => iterator.throw($err)
            );
        }
    };

    loop(iterator.next());
};

// !!!!!!!!!!!!!
// Need https://github.com/yortus/asyncawait for this to work.
// That's why I will probably make a lib without this and then publish a wrapper for it "promise-result-js"



h.fromPromise = function ($promise) {

    if (!($promise instanceof Promise)) {

        return new h(undefined, 'fromPromise can only work on actual Promises!');
    }
    else {

        var resObj;
        makeSync(function*() {

            var promRes = undefined;
            var promErr = undefined;

            try {

                promRes = yield $promise;
            }
            catch ($err) {

                promErr = $err;
            }

            resObj = new h(promRes, promErr);
        });

        return resObj;
    }
};
