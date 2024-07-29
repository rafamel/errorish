import { assert, test } from 'vitest';

import { capture } from '../../src/utils/capture';

test(`capture`, () => {
  const err = new Error();
  assert(err.stack !== 'Error: ');

  const response = capture(err);
  assert(err.stack === 'Error: ');
  assert(response === err);
});
