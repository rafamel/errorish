import { isPromise, LazyPromist } from 'promist';
import { ensure } from './ensure';
import { rejects } from './rejects';
import { EnsureCreateOptions, EnsureCreateFn, EnsureOptions } from './types';

/**
 * Returns the result of `fn`; if it throws, it will call `ensure` on the thrown error and throw it. `fn` can be an *async* function -it will be automatically detected.
 */
export function throws<T>(
  fn: () => T,
  create?: EnsureCreateOptions | EnsureCreateFn | null,
  options?: EnsureOptions | null
): T {
  try {
    const response = fn();
    if (!isPromise(response)) return response;

    // if it is a promise, in case response was a lazy promise
    return LazyPromist.from(() => {
      return response.catch((err) => rejects(err, create, options));
    }).then((value) => value) as typeof response;
  } catch (err) {
    throw ensure(err, create, options);
  }
}
