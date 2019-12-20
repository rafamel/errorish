import ensure from './ensure';
import { RejectionOptions, CoreOptions, ErrorData } from './types';

export default rejects;

function rejects(
  error: any,
  options: RejectionOptions & { case: true },
  data?: ErrorData
): Promise<never>;
function rejects(
  error: any,
  options?: CoreOptions | null,
  data?: ErrorData
): Promise<never>;
function rejects(
  error: any,
  options: RejectionOptions,
  data?: ErrorData
): Promise<void>;
function rejects(error: any): Promise<never>;
/**
 * Returns a promise rejection with `error`, having called `ensure` on it.
 */
async function rejects(
  error: any,
  options?: RejectionOptions | null,
  data?: ErrorData
): Promise<void | never> {
  const condition =
    options && Object.hasOwnProperty.call(options, 'case')
      ? options.case
      : true;

  if (condition) throw ensure(error, options, data);
}
