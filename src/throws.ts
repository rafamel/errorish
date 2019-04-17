import ensure from './ensure';
import { IExceptionOptions, ICoreOptions, IOfType } from './types';

export default throws;

function throws(
  error: any,
  options: IExceptionOptions & { case: true },
  data?: IOfType<any>
): never;
function throws(
  error: any,
  options: IExceptionOptions,
  data?: IOfType<any>
): void;
function throws(
  error: any,
  options?: ICoreOptions | null,
  data?: IOfType<any>
): never;
/**
 * Throws an `error`, having called `ensure` on it.
 */
function throws(
  error: any,
  options?: IExceptionOptions | null,
  data?: IOfType<any>
): void | never {
  const condition =
    options && options.hasOwnProperty('case') ? options.case : true;

  if (condition) throw ensure(error, options, data);
}
