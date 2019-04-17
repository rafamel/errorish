import stringify from '~/ensure/stringify';
import defaults from '~/scope/defaults';

test(`string`, () => {
  expect(stringify('foo', defaults)).toBe('foo');
});
test(`number`, () => {
  expect(stringify(10, defaults)).toBe('10');
});
test(`boolean`, () => {
  expect(stringify(true, defaults)).toBe('true');
});
test(`array`, () => {
  expect(stringify([1, 'foo', false], defaults)).toMatchInlineSnapshot(
    `"[1,\\"foo\\",false]"`
  );
});
test(`object`, () => {
  expect(stringify({ foo: 1 }, defaults)).toMatchInlineSnapshot(
    `"{\\"foo\\":1}"`
  );
});
test(`fails with options message`, () => {
  const obj = {
    get foo() {
      throw Error();
    }
  };
  expect(stringify(obj, defaults)).toBe(defaults.message);
});
