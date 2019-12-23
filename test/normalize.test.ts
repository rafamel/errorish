import { normalize } from '~/normalize';

describe(`name`, () => {
  test(`keeps name if it exists`, () => {
    const error: any = Error('Foo');
    error.name = 'Bar';

    expect(normalize(error)).toBe(error);
    expect(error.name).toBe('Bar');
  });
  test(`sets default name`, () => {
    const error: any = Error('Foo');
    error.name = undefined;

    expect(error.name).toBe(undefined);
    expect(normalize(error)).toBe(error);
    expect(error.name).toBe('Error');
  });
  test(`sets options name`, () => {
    const error: any = Error('Foo');
    error.name = undefined;

    expect(error.name).toBe(undefined);
    expect(normalize(error, { name: 'Bar' })).toBe(error);
    expect(error.name).toBe('Bar');
  });
});

describe(`message`, () => {
  test(`keeps message if it exists`, () => {
    const error = Error('Foo');

    expect(normalize(error)).toBe(error);
    expect(error.message).toBe('Foo');
  });
  test(`sets default message`, () => {
    const error = Error('');

    expect(normalize(error)).toBe(error);
    expect(error.message).toBe('An error occurred');

    error.message = undefined as any;
    expect(error.message).toBe(undefined);
    expect(normalize(error)).toBe(error);
    expect(error.message).toBe('An error occurred');
  });
  test(`sets options message`, () => {
    const error = Error('');

    expect(normalize(error, { message: 'Bar' })).toBe(error);
    expect(error.message).toBe('Bar');

    error.message = undefined as any;
    expect(error.message).toBe(undefined);
    expect(normalize(error, { message: 'Bar' })).toBe(error);
    expect(error.message).toBe('Bar');
  });
});

describe(`stack`, () => {
  test(`keeps stack if it exists`, () => {
    const error = Error('Foo');
    const stack = error.stack;

    expect(normalize(error)).toBe(error);
    expect(error.stack).toBe(stack);
  });
  test(`sets if it doesn't exist`, () => {
    const error = Error('Foo');

    error.stack = '';
    expect(error.stack).toBe('');
    expect(normalize(error)).toBe(error);
    expect(error.stack).toMatchInlineSnapshot(`"Error: Foo"`);

    error.stack = undefined;
    expect(error.stack).toBe(undefined);
    expect(normalize(error)).toBe(error);
    expect(error.stack).toMatchInlineSnapshot(`"Error: Foo"`);
  });
});
