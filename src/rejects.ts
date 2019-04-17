import throws from './throws';
import { IExceptionOptions, IOfType } from './types';

export default rejects;

function rejects(
  err: any,
  options?: (IExceptionOptions & { case?: true | undefined }) | null,
  data?: IOfType<any>
): Promise<never>;
function rejects(
  err: any,
  options?: (IExceptionOptions & { case: boolean | undefined }) | null,
  data?: IOfType<any>
): Promise<void>;
function rejects(
  err: any,
  options?: IExceptionOptions | null,
  data?: IOfType<any>
): Promise<never>;
/**
 * Returns a promise rejection with `error`, having called `ensure` on it.
 */
async function rejects(
  error: any,
  options?: IExceptionOptions | null,
  data?: IOfType<any>
): Promise<void | never> {
  return throws(error, options, data);
}
