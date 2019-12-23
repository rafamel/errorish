import { ensure } from './ensure';
import { ErrorLabel, ErrorData, EnsureCreateFn, EnsureOptions } from './types';
import { rejects } from './rejects';
import { throws } from './throws';

export class Errorish<
  L extends ErrorLabel = ErrorLabel,
  D extends ErrorData = ErrorData,
  S = any
> extends Error {
  /**
   * Returns `true` if `error` is an instance of the class with label `label`, if passed.
   */
  public static is<
    C extends typeof Errorish,
    L extends ErrorLabel = ErrorLabel
  >(
    this: C,
    error: Error,
    label?: L | L[]
  ): error is Errorish<L> & InstanceType<C> {
    if (!(error instanceof this)) return false;
    if (label === undefined) return true;

    return Array.isArray(label)
      ? label.includes(error.label as L)
      : error.label === label;
  }
  /**
   * Runs and returns the result of `fn` when `error` is an instance of the class and, optionally, has label `label`.
   */
  public static recast<
    C extends typeof Errorish,
    T extends Error,
    U extends Error,
    L extends ErrorLabel = ErrorLabel
  >(
    this: C,
    fn: (error: InstanceType<C> & Errorish<L>) => U,
    error: T,
    label?: L | L[]
  ): T | U {
    return this.is(error, label) ? fn(error) : error;
  }
  /**
   * See `ensure` function.
   */
  public static ensure<
    C extends typeof Errorish,
    T,
    U extends InstanceType<C> = InstanceType<C>
  >(
    this: C,
    error: T,
    create: EnsureCreateFn<T, U>,
    options?: Omit<EnsureOptions, 'Error'> | null
  ): T extends InstanceType<C> ? T : U {
    return ensure<T, U, InstanceType<C>>(
      error,
      create,
      Object.assign({}, options, { Error: this })
    );
  }
  /**
   * See `rejects` function.
   */
  public static rejects<C extends typeof Errorish, T>(
    this: C,
    error: T,
    create: EnsureCreateFn<T, InstanceType<C>>,
    options?: Omit<EnsureOptions, 'Error'> | null
  ): Promise<never> {
    return rejects(error, create, Object.assign({}, options, { Error: this }));
  }
  /**
   * See `throws` function.
   */
  public static throws<C extends typeof Errorish, T>(
    fn: () => T,
    create: EnsureCreateFn<T, InstanceType<C>>,
    options?: Omit<EnsureOptions, 'Error'> | null
  ): T {
    return throws(fn, create, Object.assign({}, options, { Error: this }));
  }
  /**
   * A label for the Error.
   */
  public label: L;
  /**
   * A `data` object.
   */
  public data: D;
  /**
   * An optional `source` -should reference the object that originated the `Errorish`.
   */
  public source: S;
  public constructor(
    message?: string | null,
    label?: L,
    data?: D | null,
    source?: S
  ) {
    super(message || undefined);

    this.label = label || (null as L);
    this.data = data || ({} as D);
    this.source = source as S;
  }
  /**
   * Custom Error name: 'Errorish'
   */
  public get name(): string {
    return 'Errorish';
  }
  /**
   * References the first `Errorish` in the `Errorish.source` chain.
   */
  public root(): Errorish {
    return this.source instanceof Errorish && this.source !== (this as any)
      ? this.source.root()
      : this;
  }
  /**
   * Returns `Errorish.source` if it is an `Error`, otherwise it returns itself.
   */
  public error(): Error {
    return this.source instanceof Error ? this.source : this;
  }
  /**
   * Clones the instance and assigns it a new `data` field.
   */
  public reproduce<T extends Errorish, D extends ErrorData>(
    this: T,
    data?: D
  ): Errorish<T['label'], D, T['source']> & Omit<T, 'data'> {
    const destination = Object.create(this);
    return Object.assign(destination, this, { data });
  }
  /**
   * Runs `Error.captureStackTrace` if running in `V8` to clean up the error stack trace.
   */
  public capture<T extends Errorish>(this: T): T {
    /* istanbul ignore next */
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    return this;
  }
}
