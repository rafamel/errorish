import { ICoreOptions, IOfType } from '~/types';

export default function trunk(
  error: any,
  options: Required<ICoreOptions>,
  data?: IOfType<any>
): Error {
  return error;
}
