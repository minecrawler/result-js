#!/usr/bin/env node

'use strict';

const TAP    = require('tap');


TAP.test('Test interface', $t => {

    const _interface = require('./interface/result.h');
    const tmp = new _interface('');

    const funs = Object.getOwnPropertyNames(_interface).concat(Object.getOwnPropertyNames(_interface.prototype));

    $t.plan(funs.length);

    funs.forEach($fun => {

        if ($fun === 'constructor') {

            $t.pass($fun + ' is always defined');
            return;
        }

        if (typeof tmp[$fun] === 'function') {

            $t.throws(tmp[$fun].bind(tmp), 'Check Interface ' + $fun + ' throw');
            return;
        }

        if (typeof _interface[$fun] === 'function') {

            $t.throws(_interface[$fun].bind(tmp), 'Check Interface ' + $fun + ' throw');
            return;
        }

        $t.pass($fun + ' is not a function');
    });

    $t.end();
});


const Result = require('.');

TAP.test('Create Results', $t => {

    $t.plan(3);

    $t.ok(Result.fromError('TEST'), 'Create Result from Error');
    $t.ok(Result.fromSuccess('TEST'), 'Create Result from Success');

    $t.ok((new Result()).isErr(), 'Create Result with neither val nor err');

    $t.end();
});

TAP.test('Success Tests', $t => {

    $t.plan(19);

    {
        const s = Result.fromSuccess('TEST');

        $t.ok(s.isOk(), 'Success.isOK');
        $t.notOk(s.isErr(), '!Success.notOk');

        $t.equal(s.unwrap(), 'TEST', 'Check Success.unwrap');
        $t.throws(s.unwrapErr.bind(s), 'Check Ok.unwrapErr');
        $t.equal(s.expect(), 'TEST', 'Check Success.expect');
        $t.throws(s.expectErr.bind(s), 'Check Ok.expectErr');
    }

    {
        const s = Result.fromSuccess('TEST');
        $t.equal(s.and('NYAN').unwrap(), 'NYAN', 'Check Success.and');
    }

    {
        const s = Result.fromSuccess('TEST');
        $t.equal(s.andThen($v => $v.toString() + '2').unwrap(), 'TEST2', 'Check Success.andThen');
    }

    {
        const s = Result.fromSuccess('TEST');
        $t.equal(s.unwrapAnd('NYAN'), 'NYAN', 'Check Success.unwrapAnd');
        $t.equal(s.unwrapAndThen($v => $v.toString() + '2'), 'TEST2', 'Check Success.unwrapAndThen');
    }

    {
        const s = Result.fromSuccess('TEST');
        $t.equal(s.or('FAIL').unwrap(), 'TEST', 'Check Success.or');
    }

    {
        const s = Result.fromSuccess('TEST');
        $t.equal(s.orElse($err => $err.toString() + '2').unwrap(), 'TEST', 'Check Success.orElse');
    }

    {
        const s = Result.fromSuccess('TEST');
        $t.equal(s.unwrapOr('FAIL'), 'TEST', 'Check Success.unwrapOr');
        $t.equal(s.unwrapOrElse($err => $err.toString() + '2'), 'TEST', 'Check Success.unwrapOrElse');
    }

    {
        const s = Result.fromSuccess('TEST');
        const s_try = Result.fromTry(() => 5);

        s.node((err, val) => {
            $t.equal(err, null, 'Check Error.node err');
            $t.equal(val, 'TEST', 'Check Error.node val');
        });

        s.match($val => {
            $t.equal($val, 'TEST', 'Check Success.match');
        }, () => {
            $t.fail('Check Success.match');
        });

        $t.ok(s_try.isOk(), 'Try.isOk');
        $t.equal(s_try.or(-1).unwrap(), 5, 'Try value');
    }

    $t.end();
});

TAP.test('Error Tests', $t => {

    $t.plan(17);

    {
        const e = Result.fromError('TEST');

        $t.notOk(e.isOk(), '!Error.isOK');
        $t.ok(e.isErr(), 'Error.notOk');

        $t.throws(e.unwrap.bind(e), 'Check Error.unwrap');
        $t.equal(e.unwrapErr(), 'TEST', 'Check Error.unwrapErr');
        $t.throws(e.expect.bind(e, 'ERROR'), 'Check Error.expect');
        $t.equal(e.expectErr(), 'TEST', 'Check Error.expectErr');
        $t.throws(() => e.and('NYAN').unwrap(), 'Check Error.and');
        $t.throws(() => e.andThen($v => $v.toString() + '2').unwrap(), 'Check Error.andThen');
        $t.equal(e.or('FAIL').unwrap(), 'FAIL', 'Check Error.or');
    }

    {
        const e = Result.fromError('TEST');
        $t.equal(e.orElse($err => $err.toString() + '2').unwrap(), 'TEST2', 'Check Error.orElse');
    }

    {
        const e = Result.fromError('TEST');
        const e_try = Result.fromTry(() => {
            throw 'uh oh';
        });

        e.node((err, val) => {
            $t.equal(err, 'TEST', 'Check Error.node err');
            $t.equal(typeof val, 'undefined', 'Check Error.node val');
        });

        e.match(() => {

            $t.fail('Check Error.match');

        }, $err => {

            $t.equal($err.toString(), 'TEST', 'Check Error.match');
        });

        $t.ok(e_try.isErr(), 'Try.isErr');
        $t.equal(e_try.or(-1).unwrap(), -1, 'Try value');
    }

    {
        const e = Result.fromError('TEST');
        $t.throws(() => e.unwrapAnd(-1), 'Check Error.unwrapAnd');
        $t.equal(e.unwrapOr(-1), -1, 'Check Error.unwrapOr');
    }

    $t.end();
});

TAP.test('Control Flow Tests', $t => {

    $t.plan(7);

    const sq = $x => $x * $x;
    const add = $x => $x + 1;

    $t.equal(Result.fromSuccess(2).unwrapOrElse(sq), 2, 'Success.orElse Test sq');
    $t.equal(Result.fromSuccess(2).andThen(sq).orElse(sq).unwrap(), 4, 'Success.andThen.orElse Test sq sq');
    $t.equal(Result.fromSuccess(2).andThen(add).unwrapOr(13), 3, 'Success.andThen.orElse Test err sq');
    $t.equal(Result.fromSuccess(2).andThen(sq).orElse(add).unwrap(), 4, 'Success.andThen.orElse Test sq err');
    $t.equal(Result.fromSuccess(2).andThen(add).orElse(add).or(13).unwrap(), 3, 'Success.andThen.orElse.unwrap Test err err');

    $t.equal(Result.fromError(3).orElse(sq).unwrap(), 9, 'Error.orElse.unwrap Test sq');
    $t.equal(Result.fromError(3).andThen(sq).unwrapErr().toString(), '3', 'Error.andThen Test sq');

    $t.end();
});

TAP.test('Globals Tests', $t => {

    $t.plan(5);

    Result.registerGlobals();

    Ok._test = true;
    Result.registerGlobals();
    $t.equal(Ok._test, true, 'Check Globals Initialization');

    $t.equal(typeof Ok, 'function', 'Check global.Ok()');
    $t.equal(typeof Err, 'function', 'Check global.Err()');
    $t.ok(Ok('test').isOk(), 'check global.Ok isOk');
    $t.ok(Err('test').isErr(), 'check global.Err isErr');

    $t.end();
});

TAP.test('Misc Tests', $t => {

    $t.plan(8);

    {
        const good = Result.fromSuccess('test');
        const bad = Result.fromError('test');

        $t.equal(good.map().unwrap(), 'test', 'Default Result.map Test on Ok');
        $t.equal(good.map($val => $val + '_ok').unwrap(), 'test_ok', 'Result.map Test on Ok');
        bad.map($val => $val + '_ok').match(() => {

            $t.fail('Result.map Test on Err');
        }, $e => {

            $t.equal($e, 'test', 'Result.map Test on Err');
        });
    }

    {
        const good = Result.fromSuccess('test');
        $t.equal(good.mapErr($val => $val + '_ok').unwrap(), 'test', 'Result.mapErr Test on Ok');
    }

    {
        const bad = Result.fromError('test');

        bad.mapErr().match(() => {

            $t.fail('Default Result.mapErr Test on Err');
        }, $e => {

            $t.equal($e, 'test', 'Default Result.mapErr Test on Err');
        });

        bad.mapErr($val => $val + '_ok').match(() => {

            $t.fail('Result.mapErr Test on Err');
        }, $e => {

            $t.equal($e, 'test_ok', 'Result.mapErr Test on Err');
        });
    }

    {
        const good = Result.fromSuccess('test');
        const goodIterArr = Array.from(good.iter());
        let c = 0;

        goodIterArr.forEach(() => c++);
        $t.equal(c, 1, 'Ok.iter() Test');
    }

    {
        const bad = Result.fromError('test');
        const badIterArr = Array.from(bad.iter());
        let c = 0;

        badIterArr.forEach(() => c++);
        $t.equal(c, 0, 'Err.iter() Test');
    }

    $t.end();
});
