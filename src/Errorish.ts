import { IOfType } from './types';

export default class Errorish<S> extends Error {
  /**
   * An optional `source` -should reference the object that originated the `Errorish`.
   */
  public source?: S;
  /**
   * A `data` object.
   */
  public data: IOfType<any>;
  public constructor(message?: string | null, source?: S, data?: IOfType<any>) {
    super(message || undefined);

    this.source = source;
    this.data = data || {};
  }
  /**
   * Custom Error name: 'Errorish'
   */
  public get name(): string {
    return 'Errorish';
  }
  /**
   * References `source.root` if it's an instance of `Errorish`; references `source` if it's an instance of `Error`; otherwise it references itself.
   */
  public get root(): Error {
    if (this.source instanceof Errorish) return this.source.root;
    return this.source instanceof Error ? this.source : this;
  }
  /**
   * Sets the `data` field and returns itself.
   */
  public set<T extends Errorish<S>>(this: T, data: IOfType<any>): T {
    this.data = data;
    return this;
  }
  /**
   * Assigns `data` to the instance `data` object and returns itself.
   */
  public assign<T extends Errorish<S>>(this: T, data: IOfType<any>): T {
    Object.assign(this.data, data);
    return this;
  }
}
