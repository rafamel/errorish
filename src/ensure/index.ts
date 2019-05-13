import normalize from '~/normalize';
import defaults from '~/scope/defaults';
import trunk from './trunk';
import Errorish from '~/Errorish';
import { ICoreOptions, IOfType } from '~/types';

/**
 * Will return `error` if it is an instance of `options.Error` -by default, and instance of `Error`. Otherwise, it will instantiate and return an `Error` of class `options.Errorish` -`Errorish` by default. This newly created error -if created- would have:
 *  - whatever you passed as an `error` as its `source` field.
 *  - whatever you passed as `data` as its `data` field.
 */
export default function ensure<T>(
  error: T,
  options?: ICoreOptions | null,
  data?: IOfType<any>
): T extends Error ? T : Errorish<T> {
  const opts = Object.assign({}, defaults, options);

  return (opts.normalize
    ? normalize(trunk(error, opts, data), opts)
    : trunk(error, opts, data)) as any;
}
