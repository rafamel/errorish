import { Errorish } from '~/Errorish';
import { ensure } from '~/utils/ensure';
import { rejects } from '~/utils/rejects';
import { throws } from '~/utils/throws';

jest.mock('~/utils/ensure');
jest.mock('~/utils/rejects');
jest.mock('~/utils/throws');

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
    test(`calls and returns create wo/ labels`, () => {
      const source = new Errorish('Foo');
      const response = Error('Bar');
      const create = jest.fn();
      create.mockImplementation(() => response);

      expect(Errorish.recast(source, create)).toBe(response);
      expect(create).toHaveBeenCalledWith(source);
      expect(create).toHaveBeenCalledTimes(1);
    });
    test(`calls and returns create w/ labels`, () => {
      const source = new Errorish('Foo');
      const response = Error('Bar');
      const create = jest.fn();
      create.mockImplementation(() => response);

      expect(Errorish.recast(source, create, null)).toBe(response);
      expect(create).toHaveBeenCalledWith(source);
      expect(create).toHaveBeenCalledTimes(1);
    });
    test(`doesn't call create wo/ labels`, () => {
      const source = Error('Foo');
      const create = jest.fn();
      create.mockImplementation(() => Error('Bar'));

      expect(Errorish.recast(source, create)).toBe(source);
      expect(create).not.toHaveBeenCalled();
    });
    test(`doesn't call create w/ labels`, () => {
      const source = new Errorish('Foo', 'Baz');
      const create = jest.fn();
      create.mockImplementation(() => Error('Bar'));

      expect(Errorish.recast(source, create, null)).toBe(source);
      expect(create).not.toHaveBeenCalled();
    });
  });
  describe(`raise`, () => {
    describe(`sync`, () => {
      test(`returns fn response`, () => {
        const fn = (): string => 'foo';
        const create = jest.fn();

        expect(Errorish.raise(fn, create)).toBe('foo');
        expect(create).not.toHaveBeenCalled();
      });
      test(`calls and returns create wo/ labels`, () => {
        const source = new Errorish('Foo');
        const response = Error('Bar');
        const create = jest.fn();
        create.mockImplementation(() => response);
        const fn = (): never => {
          throw source;
        };

        expect(() => Errorish.raise(fn, create)).toThrowError(response);
        expect(create).toHaveBeenCalledWith(source);
        expect(create).toHaveBeenCalledTimes(1);
      });
      test(`calls and returns create w/ labels`, () => {
        const source = new Errorish('Foo');
        const response = Error('Bar');
        const create = jest.fn();
        create.mockImplementation(() => response);
        const fn = (): never => {
          throw source;
        };

        expect(() => Errorish.raise(fn, create, null)).toThrowError(response);
        expect(create).toHaveBeenCalledWith(source);
        expect(create).toHaveBeenCalledTimes(1);
      });
      test(`doesn't call create wo/ labels`, () => {
        const source = Error('Foo');
        const create = jest.fn();
        create.mockImplementation(() => Error('Bar'));
        const fn = (): never => {
          throw source;
        };

        expect(() => Errorish.raise(fn, create)).toThrowError(source);
        expect(create).not.toHaveBeenCalled();
      });
      test(`doesn't call create w/ labels`, () => {
        const source = new Errorish('Foo', 'Baz');
        const create = jest.fn();
        create.mockImplementation(() => Error('Bar'));
        const fn = (): never => {
          throw source;
        };

        expect(() => Errorish.raise(fn, create, null)).toThrowError(source);
        expect(create).not.toHaveBeenCalled();
      });
    });
    describe(`async`, () => {
      test(`returns fn response`, async () => {
        const fn = async (): Promise<string> => 'foo';
        const create = jest.fn();

        await expect(Errorish.raise(fn, create)).resolves.toBe('foo');
        expect(create).not.toHaveBeenCalled();
      });
      test(`calls and returns create wo/ labels`, async () => {
        const source = new Errorish('Foo');
        const response = Error('Bar');
        const create = jest.fn();
        create.mockImplementation(() => response);
        const fn = async (): Promise<never> => {
          throw source;
        };

        await expect(Errorish.raise(fn, create)).rejects.toThrowError(response);
        expect(create).toHaveBeenCalledWith(source);
        expect(create).toHaveBeenCalledTimes(1);
      });
      test(`calls and returns create w/ labels`, async () => {
        const source = new Errorish('Foo');
        const response = Error('Bar');
        const create = jest.fn();
        create.mockImplementation(() => response);
        const fn = async (): Promise<never> => {
          throw source;
        };

        await expect(Errorish.raise(fn, create, null)).rejects.toThrowError(
          response
        );
        expect(create).toHaveBeenCalledWith(source);
        expect(create).toHaveBeenCalledTimes(1);
      });
      test(`doesn't call create wo/ labels`, async () => {
        const source = Error('Foo');
        const create = jest.fn();
        create.mockImplementation(() => Error('Bar'));
        const fn = async (): Promise<never> => {
          throw source;
        };

        await expect(Errorish.raise(fn, create)).rejects.toThrowError(source);
        expect(create).not.toHaveBeenCalled();
      });
      test(`doesn't call create w/ labels`, async () => {
        const source = new Errorish('Foo', 'Baz');
        const create = jest.fn();
        create.mockImplementation(() => Error('Bar'));
        const fn = async (): Promise<never> => {
          throw source;
        };

        await expect(Errorish.raise(fn, create, null)).rejects.toThrowError(
          source
        );
        expect(create).not.toHaveBeenCalled();
      });
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
