import { Constructor } from './definitions';

export interface NormalizeOptions {
  /**
   * Error `message` to be used when normalizing errors that don't have one.
   * Default: `'An error occurred'`.
   */
  message?: string;
  /**
   * Error `name` to be used when normalizing errors that don't have one, if its constructor doesn't have one.
   * Default: `'Error'`.
   */
  name?: string;
}

export interface EnsureCreateOptions {
  /**
   * Array of types to allow as error `message`, given successful stringification.
   * Default: `['string']`.
   */
  allow?: string[];
}

export type EnsureCreateFn<T = any, U extends Error = Error> = (error: T) => U;

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
