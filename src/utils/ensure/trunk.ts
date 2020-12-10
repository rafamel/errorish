import { normalize } from '../normalize';
import { stringify } from './stringify';
import { EnsureOptions } from './ensure';
import { UnaryFn, TypeGuard } from 'type-core';
import { capture } from '../capture';

export function trunk(
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
      error = new Error(message);
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
