import { ensure } from '~/ensure';
import { normalize } from '~/normalize';

jest.mock('~/normalize');

const mocks = {
  normalize: normalize as jest.Mock<any, any>
};

beforeEach(() => Object.values(mocks).forEach((mock) => mock.mockClear()));

mocks.normalize.mockImplementation((err) => err);

describe(`core`, () => {
  test(`returns the same error`, () => {
    const error = Error('An error');
    expect(ensure(error)).toBe(error);
    expect(ensure(error, null)).toBe(error);
    expect(ensure(error, null, null)).toBe(error);
  });
  test(`returns a new error`, () => {
    expect(ensure('foo')).toMatchInlineSnapshot(`[Error: foo]`);
    expect(ensure('foo', null)).toMatchInlineSnapshot(`[Error: foo]`);
    expect(ensure('foo', null, null)).toMatchInlineSnapshot(`[Error: foo]`);
  });
});

describe(`create`, () => {
  describe(`allow option`, () => {
    test(`only allows strings by default`, () => {
      expect(ensure(10)).toMatchInlineSnapshot(`[Error]`);
      expect(ensure(10, null)).toMatchInlineSnapshot(`[Error]`);
      expect(ensure(10, null, null)).toMatchInlineSnapshot(`[Error]`);
      expect(ensure(() => null)).toMatchInlineSnapshot(`[Error]`);
      expect(ensure(true)).toMatchInlineSnapshot(`[Error]`);
      expect(ensure('foo')).toMatchInlineSnapshot(`[Error: foo]`);
    });
    test(`succeeds`, () => {
      expect(ensure(10, { allow: ['number'] })).toMatchInlineSnapshot(
        `[Error: 10]`
      );
      expect(ensure(10, { allow: ['number'] }, null)).toMatchInlineSnapshot(
        `[Error: 10]`
      );
      expect(ensure('Foo', { allow: ['number'] })).toMatchInlineSnapshot(
        `[Error]`
      );
    });
  });
  describe(`function`, () => {
    test(`gets called`, () => {
      const fn = jest.fn();
      expect(ensure(10, fn)).toBe(undefined);
      expect(fn).toHaveBeenCalledWith(10);
      expect(fn).toHaveBeenCalledTimes(1);

      const error = Error();
      expect(ensure(10, () => error)).toBe(error);
    });
    test(`doesn't get called`, () => {
      const fn = jest.fn();
      const error = Error();
      expect(ensure(error, fn)).toBe(error);
      expect(fn).not.toHaveBeenCalled();
    });
  });
});

describe(`options`, () => {
  describe(`normalize`, () => {
    test(`normalizes by default`, () => {
      const error = Error('Foo');
      mocks.normalize.mockImplementation(() => error);

      expect(ensure(Error())).toBe(error);
      expect(ensure('Foo')).toBe(error);
    });
    test(`normalizes when explicit`, () => {
      const error = Error('Foo');
      mocks.normalize.mockImplementation(() => error);

      expect(ensure(Error(), null, { normalize: true })).toBe(error);
      expect(ensure('Foo', null, { normalize: true })).toBe(error);

      mocks.normalize.mockClear();
      const options = { message: 'Foo bar baz' };
      expect(ensure(error, null, { normalize: options })).toBe(error);
      expect(mocks.normalize).toHaveBeenCalledTimes(1);
      expect(mocks.normalize).toHaveBeenCalledWith(error, options);
    });
    test(`normalizes for create options`, () => {
      const error = Error('Foo');
      mocks.normalize.mockImplementation(() => error);

      expect(ensure(Error(), { allow: ['string'] }, { normalize: true })).toBe(
        error
      );
      expect(ensure('Foo', { allow: ['string'] }, { normalize: true })).toBe(
        error
      );
    });
    test(`normalizes for create function`, () => {
      const error = Error('Foo');
      mocks.normalize.mockImplementation(() => error);

      expect(ensure(Error(), () => Error(), { normalize: true })).toBe(error);
      expect(ensure('Foo', () => Error(), { normalize: true })).toBe(error);
    });
    test(`doesn't normalize`, () => {
      const error = Error('Foo');
      mocks.normalize.mockImplementation(() => error);

      expect(
        ensure(Error(), { allow: ['string'] }, { normalize: false })
      ).not.toBe(error);
      expect(
        ensure('Foo', { allow: ['string'] }, { normalize: false })
      ).not.toBe(error);
      expect(ensure(Error(), () => Error(), { normalize: false })).not.toBe(
        error
      );
      expect(ensure('Foo', () => Error(), { normalize: false })).not.toBe(
        error
      );

      mocks.normalize.mockImplementation((err) => err);
    });
  });
  describe(`capture`, () => {
    test(`captures new errors by default`, () => {
      expect(ensure('Foo')).toHaveProperty('stack', 'Error: Foo');
    });
    test(`captures new errors when explicit`, () => {
      expect(ensure('Foo', null, { capture: true })).toHaveProperty(
        'stack',
        'Error: Foo'
      );
    });
    test(`doesn't capture existing errors by default`, () => {
      expect(ensure(Error('Foo'))).not.toHaveProperty('stack', 'Error: Foo');
    });
    test(`doesn't capture existing errors when explicit`, () => {
      expect(ensure(Error('Foo'), null, { capture: true })).not.toHaveProperty(
        'stack',
        'Error: Foo'
      );
    });
    test(`captures for create options`, () => {
      expect(
        ensure('Foo', { allow: ['string'] }, { capture: true })
      ).toHaveProperty('stack', 'Error: Foo');
    });
    test(`captures for create function`, () => {
      expect(ensure('Foo', () => Error(), { capture: true })).toHaveProperty(
        'stack',
        'Error: '
      );
    });
    test(`doesn't capture`, () => {
      expect(ensure('Foo', null, { capture: false })).not.toHaveProperty(
        'stack',
        'Error: Foo'
      );
    });
  });
  describe(`Error`, () => {
    test(`succeeds for other classes`, () => {
      class ErrorChild extends Error {}
      const error = Error(`Foo`);
      const child = new ErrorChild('Bar');

      expect(ensure(error, null, { Error: ErrorChild })).not.toBe(error);
      expect(ensure(error, null, { Error: ErrorChild })).toMatchInlineSnapshot(
        `[Error: Foo]`
      );
      expect(ensure(error, () => child, { Error: ErrorChild })).toBe(child);

      expect(ensure(child, null, { Error: ErrorChild })).toBe(child);
      expect(ensure(child, () => error, { Error: ErrorChild })).toBe(child);
    });
  });
});
