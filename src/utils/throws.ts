import { TypeGuard, UnaryFn } from 'type-core';
import { ensure, EnsureCreateOptions, EnsureOptions } from './ensure';
import { rejects } from './rejects';

/**
 * Returns the result of `fn`; if it throws, it will call `ensure` on the thrown error and throw it. `fn` can be an *async* function -it will be automatically detected.
 */
export function throws<T>(
  fn: () => T,
  create?: EnsureCreateOptions | UnaryFn<T, Error> | null,
  options?: EnsureOptions | null
): T {
  try {
    const response = fn();
    if (!TypeGuard.isPromiseLike(response)) return response;

    return Promise.resolve(response).catch((err) => {
      return rejects(err, create, options);
    }) as any;
  } catch (err) {
    throw ensure(err, create, options);
  }
}
