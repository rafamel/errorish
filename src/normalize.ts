import { NormalizeOptions } from './types';
import defaults from './scope/defaults';

/**
 * Normalizes an Error -it assumes an instance of Error is passed. It guarantees the error will have a `name`, `message`, and `stack` properties.
 */
export default function normalize<T extends Error>(
  error: T,
  options?: NormalizeOptions
): T & { stack: string } {
  const opts = Object.assign({}, defaults, options);
  if (!error.name) {
    error.name = (error.constructor && error.constructor.name) || opts.name;
  }
  if (!error.message) error.message = opts.message;
  if (!error.stack) error.stack = `Error: ${error.message}`;

  return error as T & { stack: string };
}
