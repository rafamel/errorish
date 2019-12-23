import { trunk } from './trunk';
import { EnsureCreateOptions, EnsureCreateFn, EnsureOptions } from '~/types';

/**
 * Will return `error` if it's an instance of `Error`; otherwise, it will instantiate and return one.
 */
export function ensure<T, U extends Error = Error, E extends Error = Error>(
  error: T,
  create?: EnsureCreateOptions | EnsureCreateFn<T, U> | null,
  options?: EnsureOptions<E> | null
): T extends E ? T : U {
  return trunk(
    error,
    typeof create === 'function'
      ? create
      : Object.assign({ allow: ['string'] }, create),
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
