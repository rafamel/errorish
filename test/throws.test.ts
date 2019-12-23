import { throws } from '~/throws';
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

describe(`sync`, () => {
  test(`doesn't throw`, () => {
    expect(() => throws(() => null)).not.toThrowError();
  });
  test(`throws with ensured error`, () => {
    const error = Error('Foo');
    const fn = (): never => {
      throw error;
    };

    expect(() => throws(fn)).toThrowError(responses.error);
    expect(mocks.ensure).toHaveBeenCalledWith(error, undefined, undefined);

    expect(() => throws(fn, null, null)).toThrowError(responses.error);
    expect(mocks.ensure).toHaveBeenCalledWith(error, null, null);

    expect(mocks.ensure).toHaveBeenCalledTimes(2);
  });
  test(`passes create options`, () => {
    const error = Error('Foo');
    const fn = (): never => {
      throw error;
    };
    const create = {};

    expect(() => throws(fn, create)).toThrowError(responses.error);
    expect(mocks.ensure).toHaveBeenCalledWith(error, create, undefined);

    expect(() => throws(fn, create, null)).toThrowError(responses.error);
    expect(mocks.ensure).toHaveBeenCalledWith(error, create, null);

    expect(mocks.ensure).toHaveBeenCalledTimes(2);
  });
  test(`passes options`, () => {
    const error = Error('Foo');
    const fn = (): never => {
      throw error;
    };
    const options = {};

    expect(() => throws(fn, null, options)).toThrowError(responses.error);
    expect(mocks.ensure).toHaveBeenCalledWith(error, null, options);

    expect(mocks.ensure).toHaveBeenCalledTimes(1);
  });
});

describe(`async`, () => {
  test(`doesn't reject`, async () => {
    await expect(throws(async () => null)).resolves.toBe(null);
  });
  test(`rejects with ensured error`, async () => {
    const error = Error('Foo');
    const fn = (): Promise<never> => Promise.reject(error);

    await expect(throws(fn)).rejects.toThrowError(responses.error);
    expect(mocks.ensure).toHaveBeenCalledWith(error, undefined, undefined);

    await expect(throws(fn, null, null)).rejects.toThrowError(responses.error);
    expect(mocks.ensure).toHaveBeenCalledWith(error, null, null);

    expect(mocks.ensure).toHaveBeenCalledTimes(2);
  });
  test(`passes create options`, async () => {
    const error = Error('Foo');
    const fn = (): Promise<never> => Promise.reject(error);
    const create = {};

    await expect(throws(fn, create)).rejects.toThrowError(responses.error);
    expect(mocks.ensure).toHaveBeenCalledWith(error, create, undefined);

    await expect(throws(fn, create, null)).rejects.toThrowError(
      responses.error
    );
    expect(mocks.ensure).toHaveBeenCalledWith(error, create, null);

    expect(mocks.ensure).toHaveBeenCalledTimes(2);
  });
  test(`passes options`, async () => {
    const error = Error('Foo');
    const fn = (): Promise<never> => Promise.reject(error);
    const options = {};

    await expect(throws(fn, null, options)).rejects.toThrowError(
      responses.error
    );
    expect(mocks.ensure).toHaveBeenCalledWith(error, null, options);

    expect(mocks.ensure).toHaveBeenCalledTimes(1);
  });
});
