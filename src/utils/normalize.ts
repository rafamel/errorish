import { NormalError } from '../definitions';

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

/**
 * Normalizes an Error -it assumes an instance of Error is passed. It guarantees the error will have a `name`, `message`, and `stack` properties.
 */
export function normalize<T extends Error>(
  error: T,
  options?: NormalizeOptions | null
): NormalError<T> {
  const opts = Object.assign(
    { message: 'An error occurred', name: 'Error' },
    options
  );

  if (!error.name) error.name = opts.name;
  if (!error.message) error.message = opts.message;
  if (!error.stack) error.stack = `Error: ${error.message}`;

  return error as NormalError<T>;
}
