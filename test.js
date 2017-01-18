#!/usr/bin/node

'use strict';

const Result = require('.');
const TAP    = require('tap');


TAP.test('Create Results', $t => {

    $t.plan(4);

    $t.ok(Result.fromError('TEST'), 'Create Result from Error');
    $t.ok(Result.fromSuccess('TEST'), 'Create Result from Success');

    $t.ok((new Result()).isErr(), 'Create Result with neither val nor err');

    const tmp = new Result('TEST');
    tmp._init();
    $t.equal(tmp.unwrap(), 'TEST', 'Re-Initialization not possible');

    $t.end();
});

TAP.test('Success Tests', $t => {

    $t.plan(11);

    const s = Result.fromSuccess('TEST');
    const s_try = Result.fromTry(() => 5);

    $t.ok(s.isOk(), 'Success.isOK');
    $t.notOk(s.isErr(), '!Success.notOk');

    $t.equal(s.unwrap(), 'TEST', 'Check Success.unwrap');
    $t.equal(s.expect(), 'TEST', 'Check Success.expect');
    $t.equal(s.and('NYAN'), 'NYAN', 'Check Success.and');
    $t.equal(s.andThen($v => $v.toString() + '2'), 'TEST2', 'Check Success.andThen');
    $t.equal(s.or('FAIL'), 'TEST', 'Check Success.or');
    $t.equal(s.orElse($err => $err.toString() + '2'), 'TEST', 'Check Success.orElse');

    s.match($val => {

        $t.equal($val, 'TEST', 'Check Success.match');
    }, () => {

        $t.fail('Check Success.match');
    });

    $t.ok(s_try.isOk(), 'Try.isOk');
    $t.equal(s_try.or(-1), 5, 'Try value');

    $t.end();
});

TAP.test('Error Tests', $t => {

    $t.plan(11);

    const e = Result.fromError('TEST');
    const e_try = Result.fromTry(() => { throw 'uh oh'; });

    $t.notOk(e.isOk(), '!Error.isOK');
    $t.ok(e.isErr(), 'Error.notOk');

    $t.throws(e.unwrap.bind(e), 'Check Error.unwrap');
    $t.throws(e.expect.bind(e, 'ERROR'), 'Check Error.expect');
    $t.equal(e.and('NYAN').toString(), 'Error: TEST', 'Check Error.and');
    $t.equal(e.andThen($v => $v.toString() + '2').toString(), 'Error: TEST', 'Check Error.andThen');
    $t.equal(e.or('FAIL'), 'FAIL', 'Check Error.or');
    $t.equal(e.orElse($err => $err.toString() + '2').toString(), 'TEST2', 'Check Error.orElse');

    e.match(() => {

        $t.fail('Check Error.match');

    }, $err => {

        $t.equal($err.toString(), 'TEST', 'Check Error.match');
    });

    $t.ok(e_try.isErr(), 'Try.isErr');
    $t.equal(e_try.or(-1), -1, 'Try value');

    $t.end();
});

TAP.test('Control Flow Tests', $t => {

    $t.plan(7);

    const sq = $x => Result.fromSuccess($x * $x);
    const err = $x => Result.fromError($x);

    $t.equal(Result.fromSuccess(2).orElse(sq), 2, 'Success.orElse Test sq');
    $t.equal(Result.fromSuccess(2).andThen(sq).orElse(sq), 4, 'Success.andThen.orElse Test sq sq');
    $t.equal(Result.fromSuccess(2).andThen(err).or(13), 13, 'Success.andThen.orElse Test err sq');
    $t.equal(Result.fromSuccess(2).andThen(sq).orElse(err), 4, 'Success.andThen.orElse Test sq err');
    $t.equal(Result.fromSuccess(2).andThen(err).orElse(err).or(13), 13, 'Success.andThen.orElse.unwrap Test err err');

    $t.equal(Result.fromError(3).orElse(sq).unwrap(), 9, 'Error.orElse.unwrap Test sq');
    $t.equal(Result.fromError(3).andThen(sq).toString(), 'Error: 3', 'Error.andThen Test sq');

    $t.end();
});
