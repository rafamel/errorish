import Errorish from './Errorish';
import ensure from './ensure';
import throws from './throws';
import rejects from './rejects';
import normalize from './normalize';

/**
 * A constructor for `T`.
 */
export interface Constructor<T> {
  new (...args: any[]): T;
  prototype: T;
}

/** Error data type. See `Errorish.data`. */
export type ErrorData = Record<string, any>;

/**
 * See `scope`.
 */
export interface Scope {
  /**
   * Name of the scope, set on creation when calling `scope.get`. It will be `null` for the root scope.
   */
  name: string | null;
  ensure: typeof ensure;
  rejects: typeof rejects;
  throws: typeof throws;
  normalize: typeof normalize;
}

export interface NormalizeOptions {
  /**
   * `message` to be used when normalizing errors that don't have one
   */
  message?: string;
  /**
   * `name` to be used when normalizing errors that don't have one, if its constructor doesn't have one.
   */
  name?: string;
}

/**
 * See `defaults` for more information on default values.
 */
export interface CoreOptions extends NormalizeOptions {
  /**
   * Whether normalization should be applied by default when ensuring an error -see `ensure`.
   */
  normalize?: boolean;
  /**
   * Whether to use `Error.captureStackTrace` if running in `V8` to clean up the error stack trace when instantiating errors.
   */
  capture?: boolean;
  /**
   * Array of types to allow as error `message`, given successful stringification.
   */
  allow?: string[];
  /**
   * An `Errorish` inheriting class to instantiate errors with when ensuring an object is an error.
   */
  Errorish?: Constructor<Errorish<any>>;
  /**
   * Error type objects will be ensured against; aka, if an object is not an instance of `Error`, an error will be created using `Errorish`.
   */
  Error?: Constructor<Error>;
}

export interface RejectionOptions extends CoreOptions {
  /**
   * If `case` exists, `rejects` will only reject when `true`, otherwise its response will be void.
   */
  case?: boolean;
}
