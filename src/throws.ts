import ensure from './ensure';
import { ICoreOptions, IOfType } from './types';

/**
 * Returns the result of `fn`; if it throws, `throws` will throw an `error`, having called `ensure` on it.
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
