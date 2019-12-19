import ensure from './ensure';
import rejects from './rejects';
import { isPromise, LazyPromist } from 'promist';
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
    const response = fn();
    if (!isPromise(response)) return response;

    // if it is a promise
    // in case res was a lazy promise
    return LazyPromist.from(() => {
      return response.catch((err) => rejects(err, options, data));
    }).then((value) => {
      return value;
    }) as typeof response;
  } catch (err) {
    throw ensure(err, options, data);
  }
}
