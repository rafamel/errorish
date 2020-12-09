import { capture } from '~/utils/capture';

test(`capture`, () => {
  const error = new Error();
  expect(error.stack).not.toBe('Error: ');

  const response = capture(error);
  expect(error.stack).toBe('Error: ');
  expect(response).toBe(error);
});
