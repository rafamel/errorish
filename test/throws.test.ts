/* eslint-disable no-throw-literal */
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
  expect(() =>
    throws(() => {
      throw 10;
    })
  ).toThrowErrorMatchingInlineSnapshot(`"Foo bar"`);

  expect(mocks.ensure).toHaveBeenCalledTimes(1);
  expect(mocks.ensure).toHaveBeenCalledWith(10, undefined, undefined);
});
test(`doesn't throw`, () => {
  expect(() => throws(() => 10)).not.toThrow();
  expect(throws(() => 10)).toBe(10);

  const err = new Error();
  expect(() => throws(() => err)).not.toThrow();
  expect(throws(() => err)).toBe(err);

  expect(mocks.ensure).not.toHaveBeenCalled();
});
test(`passes data`, async () => {
  const data = { foo: 'bar' };
  expect(() =>
    throws(
      () => {
        throw 10;
      },
      { message: 'baz' },
      data
    )
  ).toThrowErrorMatchingInlineSnapshot(`"Foo bar"`);

  expect(mocks.ensure).toHaveBeenCalledTimes(1);
  expect(mocks.ensure).toHaveBeenCalledWith(10, { message: 'baz' }, data);
});
