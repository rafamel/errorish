import rejects from '~/rejects';
import throws from '~/throws';
import { IOfType } from '~/types';

jest.mock('~/throws');

const mocks: IOfType<jest.Mock<any, any>> = {
  throws
} as any;

beforeEach(() => Object.values(mocks).forEach((mock) => mock.mockClear()));

test(`passes data`, async () => {
  await expect(
    rejects(10, { message: 'foo' }, { bar: 'baz' })
  ).resolves.toBeUndefined();

  expect(mocks.throws).toHaveBeenCalledTimes(1);
  expect(mocks.throws).toHaveBeenCalledWith(
    10,
    { message: 'foo' },
    { bar: 'baz' }
  );
});
test(`rejects when throws throws`, async () => {
  mocks.throws.mockImplementationOnce(() => {
    throw Error('Foo bar baz');
  });
  await expect(rejects(10)).rejects.toThrowErrorMatchingInlineSnapshot(
    `"Foo bar baz"`
  );
});
