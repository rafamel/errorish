import { Constructor, UnaryFn, Empty, TypeGuard } from 'type-core';
import { normalize, NormalizeOptions } from './normalize';
import { capture } from './capture';
import { Exception } from '../Exception';

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
 * Will return `error` if it's an instance of `Error`;
 * otherwise, it will instantiate an `Exception` and return it.
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
