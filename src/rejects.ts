import ensure from './ensure';
import { IRejectionOptions, ICoreOptions, IOfType } from './types';

export default rejects;

function rejects(
  error: any,
  options: IRejectionOptions & { case: true },
  data?: IOfType<any>
): Promise<never>;
function rejects(
  error: any,
  options?: ICoreOptions | null,
  data?: IOfType<any>
): Promise<never>;
function rejects(
  error: any,
  options: IRejectionOptions,
  data?: IOfType<any>
): Promise<void>;
function rejects(error: any): Promise<never>;
/**
 * Returns a promise rejection with `error`, having called `ensure` on it.
 */
async function rejects(
  error: any,
  options?: IRejectionOptions | null,
  data?: IOfType<any>
): Promise<void | never> {
  const condition =
    options && Object.hasOwnProperty.call(options, 'case')
      ? options.case
      : true;

  if (condition) throw ensure(error, options, data);
}
