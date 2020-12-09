import { stringify } from '~/utils/ensure/stringify';

test(`string`, () => {
  expect(stringify('foo')).toBe('foo');
});
test(`number`, () => {
  expect(stringify(10)).toBe('10');
});
test(`boolean`, () => {
  expect(stringify(true)).toBe('true');
});
test(`array`, () => {
  expect(stringify([1, 'foo', false])).toMatchInlineSnapshot(
    `"[1,\\"foo\\",false]"`
  );
});
test(`object`, () => {
  expect(stringify({ foo: 1 })).toMatchInlineSnapshot(`"{\\"foo\\":1}"`);
});
test(`fails with options message`, () => {
  const obj = {
    get foo() {
      throw Error();
    }
  };
  expect(stringify(obj)).toBe(undefined);
});
