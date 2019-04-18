import scope from '~/scope';
import defaults from '~/scope/defaults';
import { values, scopes } from '~/scope/values';
import ensure from '~/ensure';
import throws from '~/throws';
import rejects from '~/rejects';
import normalize from '~/normalize';
import { IOfType } from '~/types';

jest.mock('~/ensure');
jest.mock('~/throws');
jest.mock('~/rejects');
jest.mock('~/normalize');

const mocks: IOfType<jest.Mock<any, any>> = {
  ensure,
  throws,
  rejects,
  normalize
} as any;

beforeEach(() => Object.values(mocks).forEach((mock) => mock.mockClear()));

describe(`get`, () => {
  test(`root scope`, () => {
    const root = scope.get();

    expect(root.name).toBe(null);
    expect(root.ensure).toBe(ensure);
    expect(root.throws).toBe(throws);
    expect(root.rejects).toBe(rejects);
    expect(root.normalize).toBe(normalize);
  });
  test(`creates scope`, () => {
    const foo = scope.get('foo');
    expect(foo.name).toBe('foo');
    expect(foo.ensure).not.toBe(ensure);
    expect(foo.throws).not.toBe(throws);
    expect(foo.rejects).not.toBe(rejects);
    expect(foo.normalize).not.toBe(normalize);
    expect(scopes.foo).toBe(foo);
    expect(values.foo).toEqual({});

    expect(scope.get('foo')).toBe(foo);
    expect(scope.get('bar')).not.toBe(foo);
  });
});
describe(`calls`, () => {
  ['ensure', 'throws', 'rejects', 'normalize'].forEach((call) =>
    describe(call, () => {
      test(`doesn't mutate values when options are passed`, () => {
        const foo: any = scope.get('foo');

        foo[call](10, { message: 'Baz bar foo', name: 'FooBar' });
        expect(values.foo.message).not.toBe('Baz bar foo');
        expect(values.foo.name).not.toBe('FooBar');
      });
      test(`returns call result`, async () => {
        const res = {};
        mocks[call].mockImplementationOnce(async () => res);
        const foo: any = scope.get('foo');

        await expect(foo[call](10)).resolves.toBe(res);
        expect(mocks[call]).toHaveBeenCalledTimes(1);
      });
      test(`calls w/ options`, () => {
        const args: any[] = [10, { message: 'Foo bar' }, { foo: 'bar' }];
        scope.set('foo', args[1]);
        expect(values.foo).toEqual(args[1]);

        const foo: any = scope.get('foo');
        expect(mocks[call]).not.toHaveBeenCalled();

        foo[call](10);
        foo[call](10, null, { foo: 'bar' });
        foo[call](10, {}, { foo: 'bar' });
        foo[call](10, { name: 'Foo' }, { foo: 'bar' });
        foo[call](10, { name: 'Foo', message: 'Bar baz' }, { foo: 'bar' });
        expect(mocks[call]).toHaveBeenCalledTimes(5);
        expect(mocks[call]).toHaveBeenNthCalledWith(1, args[0], args[1]);
        expect(mocks[call]).toHaveBeenNthCalledWith(2, ...args);
        expect(mocks[call]).toHaveBeenNthCalledWith(3, ...args);
        expect(mocks[call]).toHaveBeenNthCalledWith(
          4,
          args[0],
          { ...args[1], name: 'Foo' },
          args[2]
        );
        expect(mocks[call]).toHaveBeenNthCalledWith(
          5,
          args[0],
          { name: 'Foo', message: 'Bar baz' },
          args[2]
        );
      });
    })
  );
});
describe(`set`, () => {
  test(`root scope`, () => {
    const str = 'Foo bar baz';
    expect(defaults.message).not.toBe(str);

    expect(scope.set({ message: str })).toBeUndefined();
    expect(defaults.message).toBe(str);
  });
  test(`sets options`, () => {
    const str = 'Foo foo foo';

    expect(values.foo).not.toBeUndefined();
    expect(values.foo.message).not.toBe(str);
    expect(scope.set('foo', { message: str }));
    expect(values.foo).toEqual({ message: str });
  });
  test(`creates values scope`, () => {
    const str = 'Baz baz baz';

    expect(scopes.baz).toBeUndefined();
    expect(values.baz).toBeUndefined();

    expect(scope.set('baz', { message: str })).toBeUndefined();
    expect(values.baz).toEqual({ message: str });

    const baz = scope.get('baz');
    baz.ensure(10);
    expect(mocks.ensure).toHaveBeenCalledTimes(1);
    expect(mocks.ensure.mock.calls[0][1]).toEqual({ message: str });
  });
});
