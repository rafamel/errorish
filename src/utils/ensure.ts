import {
  type Constructor,
  type Empty,
  TypeGuard,
  type UnaryFn
} from 'type-core';

import { Exception } from '../Exception';
import { capture } from './capture';
import { type NormalizeOptions, normalize } from './normalize';

export interface EnsureOptions<E extends Error = Error> {
  /**
   * Whether to normalize the error.
   * A `boolean` or an object with normalization options -see `NormalizeOptions`.
   * Default: `true`.
   */
  normalize?: boolean | NormalizeOptions;
  /**
   * Whether to use `Error.captureStackTrace` if running *V8*
   * to clean up the error stack trace when a new error is created.
   * Default: `false`.
   */
  capture?: boolean;
  /**
   * Error type objects will be ensured against;
   * if an object is not an instance of `Error`,
   * `ensure` will call the function passed as a
   * `create` argument or, otherwise, instantiate an `Exception`.
   */
  Error?: Constructor<E>;
}

/**
 * Will return `error` if an instance of `Error` is passed;
 * otherwise, when lacking a `create` function,
 * it will instantiate an `Exception` and return it.
 * When a new `Exception` is created, `Exception.data`
 * will be populated with `error`.
 *
 * @param error a target object
 * @param create an optional error returning function to run when `error` is not an instance of `Error`
 * @param options
 */
export function ensure<T, U extends Error = Error, E extends Error = Error>(
  error: T,
  create?: UnaryFn<T, U> | Empty,
  options?: EnsureOptions<E> | Empty
): T extends E ? T : U {
  return trunk(
    error,
    create || null,
    Object.assign({ normalize: true, capture: false, Error }, options)
  ) as T extends E ? T : U;
}

function trunk(
  error: any,
  create: UnaryFn<any, Error> | null,
  options: Required<EnsureOptions>
): Error {
  const isError = error instanceof options.Error;

  if (!isError) {
    if (TypeGuard.isFunction(create)) {
      error = create(error);
    } else {
      const message = stringify(
        TypeGuard.isObject(error) &&
          Object.hasOwnProperty.call(error, 'message')
          ? error.message
          : error
      );
      error = new Exception(message, null, error);
    }

    if (error && options.capture) capture(error);
  }

  return options.normalize
    ? normalize(
        error,
        TypeGuard.isBoolean(options.normalize) ? null : options.normalize
      )
    : error;
}

function stringify(message: any): string {
  try {
    if (message === undefined) return '';
    if (TypeGuard.isPrimitive(message)) return String(message);
    if (TypeGuard.isFunction(message)) return `function ${message.name}`.trim();
    return JSON.stringify(message);
  } catch (_) {
    return '';
  }
}
