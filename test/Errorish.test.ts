import Errorish from '~/Errorish';

test(`create`, () => {
  const err = new Errorish();

  expect(err).toBeInstanceOf(Error);
  expect(err.data).toEqual({});
  expect(err.source).toBeUndefined();
  expect(err.name).toBe('Errorish');
});
test(`create w/ message`, () => {
  const err = new Errorish('Foo bar');

  expect(err).toHaveProperty('message', 'Foo bar');
});
test(`create w/ data`, () => {
  const err = new Errorish(null, null, { bar: 'baz' });

  expect(err).toHaveProperty('data', { bar: 'baz' });
});
test(`create w/ error`, () => {
  const err = new Errorish(null, 10);

  expect(err).toHaveProperty('source', 10);
});
test(`root is itself when source is not an error`, () => {
  const err1 = new Errorish();
  expect(err1.root).toBe(err1);

  const err2 = new Errorish(null, {});
  expect(err2.root).toBe(err2);
});
test(`root is source when it's an error`, () => {
  const err1 = new Errorish();
  const err2 = new Errorish(null, err1);
  expect(err2.root).toBe(err1);

  const err3 = new Error();
  const err4 = new Errorish(null, err3);
  expect(err4.root).toBe(err3);
});
test(`recursively obtains root`, () => {
  const err0 = Error();
  const err1 = new Errorish(null, err0);
  const err2 = new Errorish(null, err1);
  expect(err2.root).toBe(err0);
});
test(`set`, () => {
  const err = new Errorish(null, null, { bar: 'baz' }).set({ foo: 'bar' });
  expect(err).toHaveProperty('data', { foo: 'bar' });
});
test(`assign`, () => {
  const err = new Errorish(null, null, { bar: 'baz' }).assign({ foo: 'bar' });
  expect(err).toHaveProperty('data', { foo: 'bar', bar: 'baz' });
});
