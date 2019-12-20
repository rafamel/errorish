import ensure from '~/ensure';
import trunk from '~/ensure/trunk';
import normalize from '~/normalize';
import defaults from '~/scope/defaults';

jest.mock('~/ensure/trunk');
jest.mock('~/normalize');

const mocks: Record<string, jest.Mock<any, any>> = {
  trunk,
  normalize
} as any;

beforeEach(() => Object.values(mocks).forEach((mock) => mock.mockClear()));

const trunkRes = {};
const normalizeRes = {};
mocks.trunk.mockImplementation(() => trunkRes);
mocks.normalize.mockImplementation(() => normalizeRes);

test(`succeeds wo/ options`, () => {
  const res = defaults.normalize ? normalizeRes : trunkRes;
  expect(ensure(10)).toBe(res);
  expect(ensure(10, null)).toBe(res);

  expect(mocks.trunk).toHaveBeenCalledTimes(2);
  expect(mocks.trunk.mock.calls[0][1]).toEqual(defaults);
  expect(mocks.trunk.mock.calls[1][1]).toEqual(defaults);
});
test(`calls normalize and trunk wo/ data`, () => {
  const opts = { normalize: true, message: 'Foo bar' };
  expect(ensure(10, opts)).toBe(normalizeRes);
  expect(mocks.normalize).toHaveBeenCalledTimes(1);
  expect(mocks.normalize.mock.calls[0][0]).toBe(trunkRes);
  expect(mocks.normalize.mock.calls[0][1]).toEqual({ ...defaults, ...opts });
  expect(mocks.trunk).toHaveBeenCalledTimes(1);
  expect(mocks.trunk.mock.calls[0][0]).toBe(10);
  expect(mocks.trunk.mock.calls[0][1]).toEqual({ ...defaults, ...opts });
  expect(mocks.trunk.mock.calls[0][2]).toBeUndefined();
});
test(`calls normalize and trunk w/ data`, () => {
  const opts = { normalize: true, message: 'Foo bar' };
  const data = { foo: 'bar' };
  expect(ensure(10, opts, data)).toBe(normalizeRes);
  expect(mocks.normalize).toHaveBeenCalledTimes(1);
  expect(mocks.normalize.mock.calls[0][0]).toBe(trunkRes);
  expect(mocks.normalize.mock.calls[0][1]).toEqual({ ...defaults, ...opts });
  expect(mocks.trunk).toHaveBeenCalledTimes(1);
  expect(mocks.trunk.mock.calls[0][0]).toBe(10);
  expect(mocks.trunk.mock.calls[0][1]).toEqual({ ...defaults, ...opts });
  expect(mocks.trunk.mock.calls[0][2]).toEqual(data);
});
test(`calls trunk wo/ data`, () => {
  const opts = { normalize: false, message: 'Foo bar' };
  expect(ensure(10, opts)).toBe(trunkRes);
  expect(mocks.normalize).not.toHaveBeenCalled();
  expect(mocks.trunk).toHaveBeenCalledTimes(1);
  expect(mocks.trunk.mock.calls[0][0]).toBe(10);
  expect(mocks.trunk.mock.calls[0][1]).toEqual({ ...defaults, ...opts });
  expect(mocks.trunk.mock.calls[0][2]).toBeUndefined();
});
test(`calls trunk w/ data`, () => {
  const opts = { normalize: false, message: 'Foo bar' };
  const data = { foo: 'bar' };
  expect(ensure(10, opts, data)).toBe(trunkRes);
  expect(mocks.normalize).not.toHaveBeenCalled();
  expect(mocks.trunk).toHaveBeenCalledTimes(1);
  expect(mocks.trunk.mock.calls[0][0]).toBe(10);
  expect(mocks.trunk.mock.calls[0][1]).toEqual({ ...defaults, ...opts });
  expect(mocks.trunk.mock.calls[0][2]).toEqual(data);
});
test(`doesn't mutate defaults`, () => {
  ensure(10, { message: 'Foo bar baz', name: 'Foo' });

  expect(defaults.message).not.toBe('Foo bar baz');
  expect(defaults.name).not.toBe('Foo');
});
