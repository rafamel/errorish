import ensure from './ensure';
import { ICoreOptions, IOfType } from './types';

/**
 * Returns the result of `fn`; if it throws, it will call `ensure` on the thrown error and throw it.
 */
export default function throws<T>(
  fn: () => T,
  options?: ICoreOptions | null,
  data?: IOfType<any>
): T {
  try {
    return fn();
  } catch (err) {
    throw ensure(err, options, data);
  }
}
