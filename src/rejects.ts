import { ensure } from './ensure';
import { EnsureCreateOptions, EnsureCreateFn, EnsureOptions } from './types';

/**
 * Returns a `Promise` rejection with `error`, having called `ensure` on it.
 */
export async function rejects<T>(
  error: T,
  create?: EnsureCreateOptions | EnsureCreateFn<T> | null,
  options?: EnsureOptions | null
): Promise<never> {
  throw ensure(error, create, options);
}
