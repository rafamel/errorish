import normalize from '~/normalize';
import defaults from '~/scope/defaults';
import trunk from './trunk';
import { ICoreOptions, IOfType } from '~/types';

export default function ensure(
  error: any,
  options?: ICoreOptions | null,
  data?: IOfType<any>
): Error {
  const opts = Object.assign(defaults, options);

  return opts.normalize
    ? normalize(trunk(error, opts, data), opts)
    : trunk(error, opts, data);
}
