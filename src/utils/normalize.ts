export interface NormalizeOptions {
  /**
   * Error `message` to be used when normalizing errors that don't have one.
   * Default: `'An error occurred'`.
   */
  message?: string;
  /**
   * Error `name` to be used when normalizing errors that don't have one,
   * if their constructor doesn't have one.
   * Default: `'Error'`.
   */
  name?: string;
}

/**
 * A normalized `Error`. See `normalize`.
 */
export type NormalError<T extends Error = Error> = T & Record<'stack', string>;

/**
 * Normalizes an error -it assumes an instance of `Error` is passed.
 * Guarantees the error will have a `name`, `message`, and `stack` properties.
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
