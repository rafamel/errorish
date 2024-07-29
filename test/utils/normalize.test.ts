import { assert, test } from 'vitest';

import { normalize } from '../../src/utils/normalize';

test(`returns input object`, () => {
  const err = new Error();
  assert(normalize(err) === err);
});
test(`Error.name: keeps name if it exists`, () => {
  const err: any = new Error('Foo');
  err.name = 'Bar';

  normalize(err, { name: 'Foo' });
  assert(err.name === 'Bar');
});
test(`Error.name: sets name if it doesn't exist`, () => {
  const err: any = new Error('Foo');
  err.name = undefined;

  assert(err.name === undefined);
  normalize(err);
  assert(err.name === 'Error');
});
test(`Error.name: sets options.name if it doesn't exist`, () => {
  const err: any = new Error('Foo');
  err.name = undefined;

  assert(err.name === undefined);
  normalize(err, { name: 'Foo' });
  assert(err.name === 'Foo');
});
test(`Error.message: keeps message if it exists`, () => {
  const err = new Error('foo');
  normalize(err);

  assert(err.message === 'foo');
});
test(`Error.message: sets message if it doesn't exist`, () => {
  const err1 = new Error('');
  normalize(err1);
  assert(err1.message === 'An error occurred');

  const err2 = new Error('');
  Object.assign(err2, { message: undefined });
  assert(err2.message === undefined);
  normalize(err2);
  assert(err2.message === 'An error occurred');
});
test(`Error.message: sets options.message if it doesn't exist`, () => {
  const err1 = new Error('');
  normalize(err1, { message: 'Foo' });
  assert(err1.message === 'Foo');

  const err2 = new Error('');
  Object.assign(err2, { message: undefined });
  assert(err2.message === undefined);
  normalize(err2, { message: 'Foo' });
  assert(err2.message === 'Foo');
});
test(`Error.stack: keeps stack if it exists`, () => {
  const err = new Error('foo');
  const stack = err.stack;

  normalize(err);
  assert(err.stack === stack);
});
test(`Error.stack: sets stack if it doesn't exist`, () => {
  const err1 = new Error('foo');
  Object.assign(err1, { stack: '' });
  assert(err1.stack === '');
  normalize(err1);
  assert(err1.stack);
  assert(err1.stack === 'Error: foo');

  const err2 = new Error('foo');
  Object.assign(err2, { stack: undefined });
  assert(err2.stack === undefined);
  normalize(err2);
  assert(err2.stack);
  assert(err2.stack === 'Error: foo');
});
