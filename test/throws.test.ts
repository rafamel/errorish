import throws from '~/throws';
import ensure from '~/ensure';
import { IOfType } from '~/types';

jest.mock('~/ensure');

const mocks: IOfType<jest.Mock<any, any>> = {
  ensure
} as any;

beforeEach(() => Object.values(mocks).forEach((mock) => mock.mockClear()));
mocks.ensure.mockImplementation(() => new Error(`Foo bar`));

test(`throws`, () => {
  expect(() => throws(10)).toThrowErrorMatchingInlineSnapshot(`"Foo bar"`);
  expect(() => throws(10, {})).toThrowErrorMatchingInlineSnapshot(`"Foo bar"`);
  expect(() => throws(10, { case: true })).toThrowErrorMatchingInlineSnapshot(
    `"Foo bar"`
  );

  expect(mocks.ensure).toHaveBeenCalledTimes(3);
  expect(mocks.ensure).toHaveBeenNthCalledWith(1, 10, undefined, undefined);
  expect(mocks.ensure).toHaveBeenNthCalledWith(2, 10, {}, undefined);
  expect(mocks.ensure).toHaveBeenNthCalledWith(
    3,
    10,
    { case: true },
    undefined
  );
});
test(`doesn't throw`, () => {
  expect(throws(10, { case: false })).toBeUndefined();
  expect(throws(10, { case: undefined })).toBeUndefined();

  expect(mocks.ensure).not.toHaveBeenCalled();
});
test(`passes data`, () => {
  const data = { foo: 'bar' };
  expect(() => throws(10, { case: true, message: 'baz' }, data)).toThrow();

  expect(mocks.ensure).toHaveBeenCalledTimes(1);
  expect(mocks.ensure).toHaveBeenNthCalledWith(
    1,
    10,
    { case: true, message: 'baz' },
    data
  );
});
