import { UnaryFn } from 'type-core';
import { ensure, EnsureOptions, EnsureCreateOptions } from './ensure';

/**
 * Returns a `Promise` rejection with `error`, having called `ensure` on it.
 */
export async function rejects<T>(
  error: T,
  create?: EnsureCreateOptions | UnaryFn<T, Error> | null,
  options?: EnsureOptions | null
): Promise<never> {
  throw ensure(error, create, options);
}
