import { assert, describe, test } from 'vitest';

import { Exception } from '../src/Exception';

describe(`static`, () => {
  test(`Exception.is returns false for Error`, () => {
    assert(!Exception.is(new Error()));
  });
  test(`Exception.is returns true for Exception`, () => {
    assert(Exception.is(new Exception('foo')));
  });
  test(`Exception.is returns true for Exception inheriting instance`, () => {
    class X extends Exception {}
    assert(Exception.is(new X('foo')));
  });
  test(`Exception.is returns false for Exception with the wrong label`, () => {
    assert(!Exception.is(new Exception('msg'), 'bar'));
    assert(!Exception.is(new Exception(['foo', 'msg']), 'bar'));
  });
  test(`Exception.is returns true for Exception with the right label`, () => {
    assert(Exception.is(new Exception(['foo', 'msg']), 'foo'));
  });
  test(`Exception.from returns input when an exception`, () => {
    const err = new Exception('foo');
    assert(Exception.from(err) === err);
  });
  test(`Exception.from creates Exception when Exception.Like is passed`, () => {
    const data = {};
    const err1 = Exception.from({
      label: 'Foo',
      message: 'bar',
      data
    });

    assert(err1 instanceof Exception);
    assert(err1.label === 'Foo');
    assert(err1.message === 'bar');
    assert(err1.error === err1);
    assert(err1.data === data);
    assert(err1.stack);
    assert(err1.stack.split('\n')[0] === 'Exception [Foo]: bar');

    const error = new Error('foo');
    const err2 = Exception.from({
      label: null,
      message: 'bar',
      data: null,
      error
    });

    assert(err2 instanceof Error);
    assert(err2.label === null);
    assert(err2.message === 'bar');
    assert(err2.error === error);
    assert(err2.data === null);
    assert(err2.stack);
    assert(err2.stack.split('\n')[0] === 'Exception: bar');
  });
});
describe(`instance`, () => {
  test(`Constructor succeeds`, () => {
    const err1 = new Exception('bar');

    assert(err1 instanceof Error);
    assert(err1.label === null);
    assert(err1.message === 'bar');
    assert(err1.error === err1);
    assert(!err1.data);
    assert(err1.stack);
    assert(err1.stack.split('\n')[0] === 'Exception: bar');

    const err2 = new Exception(['Foo', 'bar']);

    assert(err2 instanceof Error);
    assert(err2.label === 'Foo');
    assert(err2.message === 'bar');
    assert(err2.error === err2);
    assert(!err2.data);
    assert(err2.stack);
    assert(err2.stack.split('\n')[0] === 'Exception [Foo]: bar');

    const error = new Error();
    const err3 = new Exception([null, 'bar'], error);

    assert(err3 instanceof Error);
    assert(err3.label === null);
    assert(err3.message === 'bar');
    assert(err3.error === error);
    assert(!err3.data);
    assert(err3.stack);
    assert(err3.stack.split('\n')[0] === 'Exception: bar');

    const data = {};
    const err4 = new Exception(['Foo', 'bar'], null, data);

    assert(err4 instanceof Error);
    assert(err4.label === 'Foo');
    assert(err4.message === 'bar');
    assert(err4.error === err4);
    assert(err4.data === data);
    assert(err4.stack);
    assert(err4.stack.split('\n')[0] === 'Exception [Foo]: bar');
  });
  test(`Exception.prototype.name is "Exception"`, () => {
    assert(Exception.prototype.name === 'Exception');
  });
  test(`Exception.prototype.root returns first exception in chain`, () => {
    const error = new Error('Root');
    const err1 = new Exception('Err1', error);
    const err2 = new Exception('Err2', err1);
    const err3 = new Exception('Err3', err2);

    assert(err3.root() === err1);

    const exception = new Exception('Exception');
    const err4 = new Exception('Err4', exception);
    const err5 = new Exception('Err5', err4);
    const err6 = new Exception('Err6', err5);

    assert(err6.root() === exception);
  });
});
