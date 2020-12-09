import { Constructor, TypeGuard, UnaryFn } from 'type-core';
import { ErrorLabel, ErrorData } from './definitions';
import { capture } from './utils';
import { ensure, EnsureOptions } from './utils/ensure';
import { rejects } from './utils/rejects';
import { throws } from './utils/throws';

export class Errorish<
  L extends ErrorLabel = ErrorLabel,
  D extends ErrorData = ErrorData,
  S = any
> extends Error {
  /**
   * Returns `true` if `error` is an instance of the class with label `label`, if passed.
   */
  public static is<
    C extends Constructor<Errorish>,
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
   * Runs and returns the result of `fn` only when `error` is an instance of the class and, optionally, has a specific `label`.
   */
  public static recast<
    C extends Constructor<Errorish>,
    T extends Error,
    U extends Error
  >(
    this: C,
    error: T,
    create: (error: InstanceType<C>) => U,
    label?: ErrorLabel | ErrorLabel[]
  ): T | U {
    return (this as any).is(error, label)
      ? create(error as InstanceType<C>)
      : error;
  }
  /**
   * Calls `recast` and throws its response if `fn` throws or rejects, otherwise returns or throws the same result or error as `fn`.
   */
  public static raise<C extends Constructor<Errorish>, T>(
    this: C,
    fn: () => T,
    create: (error: InstanceType<C>) => Error,
    label?: ErrorLabel | ErrorLabel[]
  ): T {
    try {
      const response = fn();
      if (TypeGuard.isPromiseLike(response)) {
        return Promise.resolve(response).catch(async (err) => {
          throw (this as any).recast(err, create, label);
        }) as any;
      }
      return response;
    } catch (err) {
      throw (this as any).recast(err, create, label);
    }
  }
  /**
   * See `ensure` function.
   */
  public static ensure<
    C extends Constructor<Errorish>,
    T,
    U extends InstanceType<C> = InstanceType<C>
  >(
    this: C,
    error: T,
    create: UnaryFn<T, U>,
    options?: Omit<EnsureOptions, 'Error'> | null
  ): T extends InstanceType<C> ? T : U {
    return ensure<T, U, InstanceType<C>>(
      error,
      create,
      Object.assign({}, options, { Error: this as any })
    );
  }
  /**
   * See `rejects` function.
   */
  public static rejects<C extends Constructor<Errorish>, T>(
    this: C,
    error: T,
    create: UnaryFn<T, InstanceType<C>>,
    options?: Omit<EnsureOptions, 'Error'> | null
  ): Promise<never> {
    return rejects(error, create, Object.assign({}, options, { Error: this }));
  }
  /**
   * See `throws` function.
   */
  public static throws<C extends Constructor<Errorish>, T>(
    this: C,
    fn: () => T,
    create: UnaryFn<T, InstanceType<C>>,
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
    return capture(this);
  }
}
