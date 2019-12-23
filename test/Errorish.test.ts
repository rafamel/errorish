import { Errorish } from '~/Errorish';
import { ensure } from '~/ensure';
import { rejects } from '~/rejects';
import { throws } from '~/throws';

jest.mock('~/ensure');
jest.mock('~/rejects');
jest.mock('~/throws');

const mocks = {
  ensure: ensure as jest.Mock<any, any>,
  rejects: rejects as jest.Mock<any, any>,
  throws: throws as jest.Mock<any, any>
};

beforeEach(() => Object.values(mocks).forEach((mock) => mock.mockClear()));

const responses = {
  ensure: new Error('Ensure'),
  rejects: new Error('Rejects'),
  throws: new Error('Throws')
};

mocks.ensure.mockImplementation(() => responses.ensure);
mocks.rejects.mockImplementation(() => responses.rejects);
mocks.throws.mockImplementation(() => responses.throws);

describe(`instantiation`, () => {
  test(`no arguments`, () => {
    const error = new Errorish();

    expect(error.name).toBe('Errorish');
    expect(error.message).toBe('');
    expect(error.label).toBe(null);
    expect(error.data).toEqual({});
    expect(error.source).toBe(undefined);
  });
  test(`message`, () => {
    const error = new Errorish('Foo');

    expect(error.name).toBe('Errorish');
    expect(error.message).toBe('Foo');
    expect(error.label).toBe(null);
    expect(error.data).toEqual({});
    expect(error.source).toBe(undefined);
  });
  test(`label`, () => {
    const error = new Errorish(null, 'Bar');

    expect(error.name).toBe('Errorish');
    expect(error.message).toBe('');
    expect(error.label).toBe('Bar');
    expect(error.data).toEqual({});
    expect(error.source).toBe(undefined);
  });
  test(`data`, () => {
    const data = {};
    const error = new Errorish(null, null, data);

    expect(error.name).toBe('Errorish');
    expect(error.message).toBe('');
    expect(error.label).toBe(null);
    expect(error.data).toBe(data);
    expect(error.source).toBe(undefined);
  });
  test(`label`, () => {
    const error = new Errorish(null, null, null, 'Baz');

    expect(error.name).toBe('Errorish');
    expect(error.message).toBe('');
    expect(error.label).toBe(null);
    expect(error.data).toEqual({});
    expect(error.source).toBe('Baz');
  });
});

describe(`static methods`, () => {
  describe(`is`, () => {
    test(`should be true wo/ label`, () => {
      expect(Errorish.is(new Errorish())).toBe(true);
    });
    test(`should be false wo/ label`, () => {
      expect(Errorish.is(Error())).toBe(false);
    });
    test(`should be true w/ label`, () => {
      expect(Errorish.is(new Errorish(), null)).toBe(true);
      expect(Errorish.is(new Errorish(), [null, 'Foo'])).toBe(true);
      expect(Errorish.is(new Errorish(null, 'Foo'), 'Foo')).toBe(true);
      expect(Errorish.is(new Errorish(null, 'Foo'), [null, 'Foo'])).toBe(true);
    });
    test(`should be false w/ label`, () => {
      expect(Errorish.is(new Errorish(), 'Foo')).toBe(false);
      expect(Errorish.is(new Errorish(), ['Foo'])).toBe(false);
      expect(Errorish.is(new Errorish(null, 'Foo'), null)).toBe(false);
      expect(Errorish.is(new Errorish(null, 'Foo'), [null])).toBe(false);
    });
  });
  describe(`recast`, () => {
    test(`calls and returns fn wo/ labels`, () => {
      const source = new Errorish('Foo');
      const response = Error('Bar');
      const fn = jest.fn();
      fn.mockImplementation(() => response);

      expect(Errorish.recast(fn, source)).toBe(response);
      expect(fn).toHaveBeenCalledWith(source);
      expect(fn).toHaveBeenCalledTimes(1);
    });
    test(`calls and returns fn w/ labels`, () => {
      const source = new Errorish('Foo');
      const response = Error('Bar');
      const fn = jest.fn();
      fn.mockImplementation(() => response);

      expect(Errorish.recast(fn, source, null)).toBe(response);
      expect(fn).toHaveBeenCalledWith(source);
      expect(fn).toHaveBeenCalledTimes(1);
    });
    test(`doesn't call fn wo/ labels`, () => {
      const source = Error('Foo');
      const fn = jest.fn();
      fn.mockImplementation(() => Error('Bar'));

      expect(Errorish.recast(fn, source)).toBe(source);
      expect(fn).not.toHaveBeenCalled();
    });
    test(`doesn't call fn w/ labels`, () => {
      const source = new Errorish('Foo', 'Baz');
      const fn = jest.fn();
      fn.mockImplementation(() => Error('Bar'));

      expect(Errorish.recast(fn, source, null)).toBe(source);
      expect(fn).not.toHaveBeenCalled();
    });
  });
  describe(`ensure`, () => {
    test(`succeeds`, () => {
      const error = Error();
      const create = (): Errorish => new Errorish();
      const options = {};

      expect(Errorish.ensure(error, create, options)).toBe(responses.ensure);
      expect(mocks.ensure).toHaveBeenCalledTimes(1);
      expect(mocks.ensure).toHaveBeenCalledWith(error, create, {
        ...options,
        Error: Errorish
      });
    });
  });
  describe(`rejects`, () => {
    test(`succeeds`, () => {
      const error = Error();
      const create = (): Errorish => new Errorish();
      const options = {};

      expect(Errorish.rejects(error, create, options)).toBe(responses.rejects);
      expect(mocks.rejects).toHaveBeenCalledTimes(1);
      expect(mocks.rejects).toHaveBeenCalledWith(error, create, {
        ...options,
        Error: Errorish
      });
    });
  });
  describe(`throws`, () => {
    test(`succeeds`, () => {
      const fn = (): null => null;
      const create = (): Errorish => new Errorish();
      const options = {};

      expect(Errorish.throws(fn, create, options)).toBe(responses.throws);
      expect(mocks.throws).toHaveBeenCalledTimes(1);
      expect(mocks.throws).toHaveBeenCalledWith(fn, create, {
        ...options,
        Error: Errorish
      });
    });
  });
});

describe(`instance methods`, () => {
  test(`root`, () => {
    const source = new Error();
    const a = new Errorish(null, null, null, source);
    const b = new Errorish(null, null, null, a);
    const c = new Errorish(null, null, null, b);
    const z = new Errorish();

    expect(a.root()).toBe(a);
    expect(b.root()).toBe(a);
    expect(c.root()).toBe(a);
    expect(z.root()).toBe(z);
  });
  test(`error`, () => {
    const source = new Error();
    const a = new Errorish(null, null, null, source);
    const z = new Errorish(null, null, null, 'Foo');

    expect(a.error()).toBe(source);
    expect(z.error()).toBe(z);
  });
  test(`reproduce`, () => {
    const source = new Errorish('Foo bar baz', 'Bar baz', null, 'Source');
    const data = { bar: 'baz' };
    const destination = source.reproduce(data);

    expect(destination.message).toBe(source.message);
    expect(destination.label).toBe(source.label);
    expect(destination.source).toBe(source.source);

    expect(source.data).not.toBe(data);
    expect(destination.data).toBe(data);

    expect(destination).toBeInstanceOf(Error);
    expect(destination).toBeInstanceOf(Errorish);
  });
  test(`capture`, () => {
    const error = new Errorish();
    expect(error.stack).not.toBe('Errorish: ');

    error.capture();
    expect(error.stack).toBe('Errorish: ');
  });
});
