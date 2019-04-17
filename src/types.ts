import Errorish from './Errorish';

export interface IOfType<T> {
  [key: string]: T;
}

export interface IConstructor<T> {
  new (...args: any[]): T;
  prototype: T;
}

export interface INormalizeOptions {
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
export interface ICoreOptions extends INormalizeOptions {
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
   * A `Errorish` inheriting class to instantiate errors with when ensuring an object is an error.
   */
  Errorish?: IConstructor<Errorish<any>>;
  /**
   * Error type objects will be ensured against; aka, if an object is not an instance of `Error`, an error will be created using `Errorish`.
   */
  Error?: IConstructor<Error>;
}

export interface IExceptionOptions extends ICoreOptions {
  /**
   * If `case` exists, `throws` and `rejects` will only throw/reject when `true`, otherwise their response will be void.
   */
  case?: boolean;
}
