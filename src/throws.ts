import ensure from './ensure';
import { IExceptionOptions, IOfType } from './types';

export default throws;

function throws(
  err: any,
  options?: (IExceptionOptions & { case?: true | undefined }) | null,
  data?: IOfType<any>
): never;
function throws(
  err: any,
  options?: (IExceptionOptions & { case: boolean | undefined }) | null,
  data?: IOfType<any>
): void;
function throws(
  err: any,
  options?: IExceptionOptions | null,
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
    options && typeof options.case === 'boolean' ? options.case : true;

  if (condition) throw ensure(error, options, data);
}
