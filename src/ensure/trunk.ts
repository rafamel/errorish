import stringify from './stringify';
import { ICoreOptions, IOfType } from '~/types';

export default function trunk(
  error: any,
  options: Required<ICoreOptions>,
  data?: IOfType<any>
): Error {
  if (error instanceof options.Error) return error;

  let message =
    error && typeof error === 'object' && error.hasOwnProperty('message')
      ? error.message
      : error;

  message = options.allow.includes(typeof message)
    ? stringify(message, options)
    : options.message;

  error = new options.Errorish(message, data, error);
  if (options.capture && Error.captureStackTrace) {
    Error.captureStackTrace(error, options.Errorish);
  }

  return error;
}
