import ensure from './ensure';
import { IExceptionOptions, ICoreOptions, IOfType } from './types';

export default rejects;

function rejects(
  error: any,
  options: IExceptionOptions & { case: true },
  data?: IOfType<any>
): Promise<never>;
function rejects(
  error: any,
  options: IExceptionOptions,
  data?: IOfType<any>
): Promise<void>;
function rejects(
  error: any,
  options?: ICoreOptions | null,
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
  const condition =
    options && options.hasOwnProperty('case') ? options.case : true;

  if (condition) throw ensure(error, options, data);
}
