import { IOfType } from './types';

export default class Errorish<T extends IOfType<any>> extends Error {
  /**
   * An optional `source` -should reference the object that originated the `Errorish`.
   */
  public source?: any;
  /**
   * An optional `data` field.
   */
  public data: T & IOfType<any>;
  public constructor(message?: string, data?: T | null, source?: any) {
    super(message);

    this.source = source;
    this.data = (data || {}) as T & IOfType<any>;
  }
  /**
   * Custom Error name: 'Errorish'
   */
  public get name(): string {
    return 'Errorish';
  }
  /**
   * References `source.root` is an instance of `Errorish`; references `source` if it is an instance of `Error`; otherwise it references itself.
   */
  public get root(): Error {
    if (this.source instanceof Errorish) return this.source.root;
    return this.source instanceof Error ? this.source : this;
  }
}
