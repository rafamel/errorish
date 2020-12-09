import { TypeGuard } from 'type-core';

/**
 * Runs `Error.captureStackTrace` if running in `V8` to clean up the error stack trace.
 */
export function capture<T extends Error>(error: T): T {
  /* istanbul ignore next */
  if (TypeGuard.isFunction(Error.captureStackTrace)) {
    Error.captureStackTrace(error, error.constructor);
  }
  return error;
}
