import rejects from '~/rejects';
import ensure from '~/ensure';
import { IOfType } from '~/types';

jest.mock('~/ensure');

const mocks: IOfType<jest.Mock<any, any>> = {
  ensure
} as any;

beforeEach(() => Object.values(mocks).forEach((mock) => mock.mockClear()));
mocks.ensure.mockImplementation(() => new Error(`Foo bar`));

test(`rejects`, async () => {
  await expect(rejects(10)).rejects.toThrowErrorMatchingInlineSnapshot(
    `"Foo bar"`
  );
  await expect(rejects(10, {})).rejects.toThrowErrorMatchingInlineSnapshot(
    `"Foo bar"`
  );
  await expect(
    rejects(10, { case: true })
  ).rejects.toThrowErrorMatchingInlineSnapshot(`"Foo bar"`);

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
test(`doesn't reject`, async () => {
  await expect(rejects(10, { case: false })).resolves.toBeUndefined();
  await expect(rejects(10, { case: undefined })).resolves.toBeUndefined();

  expect(mocks.ensure).not.toHaveBeenCalled();
});
test(`passes data`, async () => {
  const data = { foo: 'bar' };
  await expect(
    rejects(10, { case: true, message: 'baz' }, data)
  ).rejects.toThrowErrorMatchingInlineSnapshot(`"Foo bar"`);

  expect(mocks.ensure).toHaveBeenCalledTimes(1);
  expect(mocks.ensure).toHaveBeenCalledWith(
    10,
    { case: true, message: 'baz' },
    data
  );
});
