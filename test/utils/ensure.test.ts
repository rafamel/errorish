import assert from 'assert';
import { ensure } from '~/utils/ensure';
import { normalize } from '~/utils/normalize';

jest.mock('~/utils/normalize');
const mocks = { normalize: normalize as jest.Mock<any, any> };
beforeEach(() => {
  mocks.normalize.mockClear();
  mocks.normalize.mockImplementation((err) => err);
});

test(`creation: returns input when an Error`, () => {
  const err = Error('An error');

  assert(ensure(err) === err);
  assert(ensure(err, null) === err);
  assert(ensure(err, null, null) === err);
});
test(`creation: returns a new Error when input is not an Error`, () => {
  assert(ensure('foo') instanceof Error);
  assert(ensure('foo', null) instanceof Error);
  assert(ensure('foo', null, null) instanceof Error);
});
test(`creation: stringifies input when not an Error and uses it for the new Error message`, () => {
  const fn = function foo(): void {
    return undefined;
  };
  const obj = {
    get foo() {
      throw Error();
    }
  };

  const execute = (item: any): string => String(ensure(item));
  assert(execute('foo') === 'Error: foo');
  assert(execute(undefined) === 'Error');
  assert(execute(null) === 'Error: null');
  assert(execute(true) === 'Error: true');
  assert(execute(false) === 'Error: false');
  assert(execute(10) === 'Error: 10');
  assert(execute(10n) === 'Error: 10');
  assert(execute(Symbol('foo')) === 'Error: Symbol(foo)');
  assert(execute([1, 'foo', false]) === 'Error: [1,"foo",false]');
  assert(execute({ foo: 1 }) === 'Error: {"foo":1}');
  assert(execute(() => undefined) === 'Error: function');
  assert(execute(class {}) === 'Error: function');
  assert(execute(fn) === 'Error: function foo');
  assert(execute(class Foo {}) === 'Error: function Foo');
  assert(execute(obj) === 'Error');
});
test(`creation: stringifies input.message when present and uses it for the new Error message`, () => {
  const fn = function foo(): void {
    return undefined;
  };
  const obj = {
    get foo() {
      throw Error();
    }
  };

  const execute = (message: any): string => String(ensure({ message }));
  assert(execute('foo') === 'Error: foo');
  assert(execute(undefined) === 'Error');
  assert(execute(null) === 'Error: null');
  assert(execute(true) === 'Error: true');
  assert(execute(false) === 'Error: false');
  assert(execute(10) === 'Error: 10');
  assert(execute(10n) === 'Error: 10');
  assert(execute(Symbol('foo')) === 'Error: Symbol(foo)');
  assert(execute([1, 'foo', false]) === 'Error: [1,"foo",false]');
  assert(execute({ foo: 1 }) === 'Error: {"foo":1}');
  assert(execute(() => undefined) === 'Error: function');
  assert(execute(class {}) === 'Error: function');
  assert(execute(fn) === 'Error: function foo');
  assert(execute(class Foo {}) === 'Error: function Foo');
  assert(execute(obj) === 'Error');
});
test(`creation: returns create function response when input is not an Error`, () => {
  const err = Error();
  const args: any[] = [];
  const fn = (...arr: any[]): Error => {
    args.push(arr);
    return err;
  };

  assert(ensure(10, fn) === err);
  assert.deepStrictEqual(args, [[10]]);
});
test(`creation: create function doesn't get called when input is an error`, () => {
  let times = 0;
  const err = Error();
  assert(ensure(err, (): any => times++) === err);
  assert(times === 0);
});
test(`creation: succeeds for options.Error`, () => {
  class ErrorChild extends Error {}
  const err = Error(`foo`);
  const child = new ErrorChild('bar');

  assert(ensure(err, null, { Error: ErrorChild }) !== err);
  assert(String(ensure(err, null, { Error: ErrorChild })) === 'Error: foo');
  assert(ensure(err, () => child, { Error: ErrorChild }) === child);
  assert(ensure(child, null, { Error: ErrorChild }) === child);
  assert(ensure(child, () => err, { Error: ErrorChild }) === child);
});
test(`normalization: normalizes by default`, () => {
  const err = Error('foo');
  mocks.normalize.mockImplementation(() => err);

  assert(ensure(Error()) === err);
  assert(ensure('foo') === err);
});
test(`normalization: normalizes when options.normalize is true`, () => {
  const err = Error('foo');
  mocks.normalize.mockImplementation(() => err);

  assert(ensure(Error(), null, { normalize: true }) === err);
  assert(ensure('foo', null, { normalize: true }) === err);
});
test(`normalization: doesn't normalize when options.normalize is false`, () => {
  const err = Error('foo');
  mocks.normalize.mockImplementation(() => err);

  assert(ensure(Error(), () => Error(), { normalize: false }) !== err);
  expect(ensure('foo', () => Error(), { normalize: false }) !== err);
});
test(`normalization: normalizes with options`, () => {
  const err = Error('foo');
  mocks.normalize.mockImplementation(() => err);

  const options = { message: 'foo bar baz' };
  assert(ensure(err, null, { normalize: options }) === err);
  assert(mocks.normalize.mock.calls.length === 1);
  assert(mocks.normalize.mock.calls[0][0] === err);
  assert.deepStrictEqual(mocks.normalize.mock.calls[0][1], options);
});
test(`normalization: normalizes for create function`, () => {
  const err = Error('foo');
  mocks.normalize.mockImplementation(() => err);

  assert(ensure(Error(), () => Error(), { normalize: true }) === err);
  assert(ensure('foo', () => Error(), { normalize: true }) === err);
});
test(`capture: captures new errors by default`, () => {
  const err1 = ensure('foo');
  assert(err1.stack);
  assert(err1.stack === 'Error: foo');

  const err2 = ensure('foo', () => Error('bar'));
  assert(err2.stack);
  assert(err2.stack === 'Error: bar');
});
test(`capture: doesn't capture existing errors by default`, () => {
  const err = ensure(Error('foo'));

  assert(err.stack);
  assert(err.stack !== 'Error: foo');
});
test(`capture: captures new errors when options.capture is true`, () => {
  const err1 = ensure('foo', null, { capture: true });
  assert(err1.stack);
  assert(err1.stack === 'Error: foo');

  const err2 = ensure('foo', () => Error('bar'), { capture: true });
  assert(err2.stack);
  assert(err2.stack === 'Error: bar');
});
test(`capture: doesn't capture existing errors when options.capture is true`, () => {
  const err = ensure(Error('foo'), null, { capture: true });

  assert(err.stack);
  assert(err.stack !== 'Error: foo');
});
test(`capture: doesn't capture new errors when options.capture is false`, () => {
  const err1 = ensure('foo', null, { capture: false });
  assert(err1.stack);
  assert(err1.stack !== 'Error: foo');

  const err2 = ensure('foo', () => Error('bar'), { capture: false });
  assert(err2.stack);
  assert(err2.stack !== 'Error: bar');
});
test(`capture: doesn't capture existing errors when options.capture is false`, () => {
  const err = ensure(Error('foo'), null, { capture: false });

  assert(err.stack);
  assert(err.stack !== 'Error: foo');
});
