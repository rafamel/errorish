import trunk from '~/ensure/trunk';
import stringify from '~/ensure/stringify';
import defaults from '~/scope/defaults';
import Errorish from '~/Errorish';

jest.mock('~/ensure/stringify');

const mocks: Record<string, jest.Mock<any, any>> = {
  stringify
} as any;

beforeEach(() => Object.values(mocks).forEach((mock) => mock.mockClear()));
mocks.stringify.mockImplementation(() => 'Stringified');

describe(`returns error when instance of options.Error`, () => {
  test(`sets`, () => {
    class Foo extends Error {}
    const err = new Error();
    expect(trunk(err, { ...defaults, Error: Foo })).not.toBe(err);
  });
  test(`keeps`, () => {
    class Foo extends Error {}
    const err = new Foo();
    expect(trunk(err, { ...defaults, Error: Foo })).toBe(err);
  });
});
describe(`instantiates`, () => {
  test(`uses err.message`, () => {
    const err = { message: 10 };
    const opts = { ...defaults, message: 'Foo bar', allow: ['number'] };
    const res = trunk(err, opts);
    expect(res).toBeInstanceOf(Errorish);
    expect(res).toHaveProperty('message', 'Stringified');
    expect(mocks.stringify).toHaveBeenCalledTimes(1);
    expect(mocks.stringify).toHaveBeenCalledWith(10, opts);
  });
  test(`doesn't use err.message if not on options.allow`, () => {
    const err = { message: 10 };
    const opts = { ...defaults, message: 'Foo bar', allow: ['string'] };
    const res = trunk(err, opts);
    expect(res).toBeInstanceOf(Errorish);
    expect(res).toHaveProperty('message', 'Foo bar');
    expect(mocks.stringify).not.toHaveBeenCalled();
  });
  test(`uses err when !err.message`, () => {
    const err = 10;
    const opts = { ...defaults, message: 'Foo bar', allow: ['number'] };
    const res = trunk(err, opts);
    expect(res).toBeInstanceOf(Errorish);
    expect(res).toHaveProperty('message', 'Stringified');
    expect(mocks.stringify).toHaveBeenCalledTimes(1);
    expect(mocks.stringify).toHaveBeenCalledWith(10, opts);
  });
  test(`doesn't use err when !err.message if not on options.allow`, () => {
    const err = 10;
    const opts = { ...defaults, message: 'Foo bar', allow: ['string'] };
    const res = trunk(err, opts);
    expect(res).toBeInstanceOf(Errorish);
    expect(res).toHaveProperty('message', 'Foo bar');
    expect(mocks.stringify).not.toHaveBeenCalled();
  });
  test(`instantiantes options.Errorish`, () => {
    const err = 10;
    class Foo<T> extends Errorish<T> {}
    const opts = { ...defaults, Errorish: Foo };
    const res = trunk(err, opts);
    expect(res).toBeInstanceOf(Foo);
    expect(res).toHaveProperty('data', {});
    expect(res).toHaveProperty('source', 10);
    expect(res).toMatchInlineSnapshot(`[Errorish: An error occurred]`);
  });
  test(`instantiantes options.Errorish`, () => {
    const err = 10;
    class Foo<T> extends Errorish<T> {}
    const opts = { ...defaults, Errorish: Foo };
    const res = trunk(err, opts, { foo: 'bar' });
    expect(res).toBeInstanceOf(Foo);
    expect(res).toHaveProperty('data', { foo: 'bar' });
    expect(res).toHaveProperty('source', 10);
    expect(res).toMatchInlineSnapshot(`[Errorish: An error occurred]`);
  });
  test(`captures stack trace on options.capture`, () => {
    const err = 10;
    const opts = { ...defaults, capture: true };
    const res = trunk(err, opts);
    expect(res.stack).toBe('Errorish: An error occurred');
  });
  test(`doesn't capture stack trace on !options.capture`, () => {
    const err = 10;
    const opts = { ...defaults, capture: false };
    const res = trunk(err, opts);
    expect(res.stack).not.toBe('Errorish: An error occurred');
  });
});
