import defaults from '~/scope/defaults';
import normalize from '~/normalize';

describe(`name`, () => {
  test(`sets`, () => {
    class Bar extends Error {}
    const err = new Bar();
    // @ts-ignore
    err.name = undefined;
    expect(normalize(err)).toHaveProperty('name', 'Bar');
  });
  test(`keeps`, () => {
    const err = new Error();
    err.name = 'Foo';
    expect(normalize(err)).toHaveProperty('name', 'Foo');
  });
});
describe(`message`, () => {
  test(`sets`, () => {
    const err = new Error();
    expect(normalize(err)).toHaveProperty('message', defaults.message);
  });
  test(`sets on options`, () => {
    const err = new Error();
    expect(normalize(err, { message: 'Bar baz' })).toHaveProperty(
      'message',
      'Bar baz'
    );
  });
  test(`keeps`, () => {
    const err = new Error('Foo bar');
    expect(normalize(err)).toHaveProperty('message', 'Foo bar');
  });
});
describe(`stack`, () => {
  test(`sets`, () => {
    const err1 = new Error();
    err1.stack = undefined;

    expect(normalize(err1)).toHaveProperty(
      'stack',
      'Error: ' + defaults.message
    );

    const err2 = new Error('message');
    err2.stack = undefined;
    expect(normalize(err2)).toHaveProperty('stack', 'Error: message');
  });
  test(`keeps`, () => {
    const err = new Error('message');
    expect(normalize(err)).toHaveProperty('stack');
    expect(normalize(err)).not.toHaveProperty('stack', 'Error: message');
  });
});
describe(`options`, () => {
  test(`doesn't mutate defaults`, () => {
    normalize(Error(), { message: 'Foo bar baz' });
    expect(defaults.message).not.toBe('Foo bar baz');
  });
});
