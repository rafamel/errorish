import { rejects } from '~/rejects';
import { ensure } from '~/ensure';

jest.mock('~/ensure');

const mocks = {
  ensure: ensure as jest.Mock<any, any>
};

beforeEach(() => Object.values(mocks).forEach((mock) => mock.mockClear()));

const responses = {
  error: new Error('Baz')
};

mocks.ensure.mockImplementation(() => responses.error);

test(`rejects with ensured error`, async () => {
  const error = Error('Foo');

  await expect(rejects(error)).rejects.toThrowError(responses.error);
  expect(mocks.ensure).toHaveBeenCalledWith(error, undefined, undefined);

  await expect(rejects(error, null, null)).rejects.toThrowError(
    responses.error
  );
  expect(mocks.ensure).toHaveBeenCalledWith(error, null, null);

  expect(mocks.ensure).toHaveBeenCalledTimes(2);
});
test(`passes create options`, async () => {
  const error = Error('Foo');
  const create = {};

  await expect(rejects(error, create)).rejects.toThrowError(responses.error);
  expect(mocks.ensure).toHaveBeenCalledWith(error, create, undefined);

  await expect(rejects(error, create, null)).rejects.toThrowError(
    responses.error
  );
  expect(mocks.ensure).toHaveBeenCalledWith(error, create, null);

  expect(mocks.ensure).toHaveBeenCalledTimes(2);
});
test(`passes options`, async () => {
  const error = Error('Foo');
  const options = {};

  await expect(rejects(error, null, options)).rejects.toThrowError(
    responses.error
  );
  expect(mocks.ensure).toHaveBeenCalledWith(error, null, options);

  expect(mocks.ensure).toHaveBeenCalledTimes(1);
});
