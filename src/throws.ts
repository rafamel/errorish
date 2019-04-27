import ensure from './ensure';
import { isPromise, lazy } from 'promist';
import { ICoreOptions, IOfType } from './types';

/**
 * Returns the result of `fn`; if it throws, it will call `ensure` on the thrown error and throw it. `fn` can be an *async* function -it will be automatically detected.
 */
export default function throws<T>(
  fn: () => T,
  options?: ICoreOptions | null,
  data?: IOfType<any>
): T {
  try {
    const res = fn();
    if (!isPromise(res)) return res;

    // if it is a promise:
    // in case res was a lazy promise
    return lazy((resolve, reject) => {
      return (res as any)
        .then(resolve)
        .catch((err: Error) => reject(ensure(err, options, data)));
    }) as any;
  } catch (err) {
    throw ensure(err, options, data);
  }
}
