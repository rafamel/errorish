import { stringify } from './stringify';
import { normalize } from '~/normalize';
import { EnsureOptions, EnsureCreateFn, EnsureCreateOptions } from '~/types';

export function trunk(
  error: any,
  create: Required<EnsureCreateOptions> | EnsureCreateFn,
  options: Required<EnsureOptions>
): Error {
  if (!(error instanceof options.Error)) {
    if (typeof create === 'function') {
      error = create(error);
    } else {
      let message =
        error &&
        typeof error === 'object' &&
        Object.hasOwnProperty.call(error, 'message')
          ? error.message
          : error;

      message = create.allow.includes(typeof message)
        ? stringify(message)
        : undefined;

      error = new Error(message);
    }
    if (error && options.capture && Error.captureStackTrace) {
      Error.captureStackTrace(error, error.constructor);
    }
  }

  return options.normalize
    ? normalize(
        error,
        typeof options.normalize === 'boolean' ? null : options.normalize
      )
    : error;
}
