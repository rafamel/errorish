/**
 * Error label type. See `Errorish.label`.
 */
export type ErrorLabel = string | null;

/**
 * Error data type. See `Errorish.data`.
 */
export type ErrorData = Record<string, any>;

/**
 * A normalized `Error`. See `normalize`.
 */
export type NormalError<T extends Error = Error> = T & Record<'stack', string>;
