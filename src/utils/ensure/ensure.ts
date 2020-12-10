import { Constructor, UnaryFn, Empty } from 'type-core';
import { NormalizeOptions } from '../normalize';
import { trunk } from './trunk';

export interface EnsureOptions<E extends Error = Error> {
  /**
   * Whether to normalize the error. Can be a `boolean` or an object with the normalization options -see `NormalizeOptions`.
   * Default: `true`.
   */
  normalize?: boolean | NormalizeOptions;
  /**
   * Whether to use `Error.captureStackTrace` if running in `V8` to clean up the error stack trace when a new `Error` is created.
   * Default: `true`.
   */
  capture?: boolean;
  /**
   * Error type objects will be ensured against; hence if an object is not an instance of `Error`, `ensure` will create a new instance.
   */
  Error?: Constructor<E>;
}

/**
 * Will return `error` if it's an instance of `Error`; otherwise, it will instantiate and return one.
 */
export function ensure<T, U extends Error = Error, E extends Error = Error>(
  error: T,
  create?: UnaryFn<T, U> | Empty,
  options?: EnsureOptions<E> | Empty
): T extends E ? T : U {
  return trunk(
    error,
    create || null,
    Object.assign(
      {
        normalize: true,
        capture: true,
        Error: Error
      },
      options
    )
  ) as T extends E ? T : U;
}
