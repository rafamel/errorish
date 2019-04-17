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
  public get name(): string {
    return 'Errorish';
  }
  /**
   * References `source` if it's an instance of Error, otherwise it references itself.
   */
  public get root(): Error {
    return this.source instanceof Error ? this.source : this;
  }
}
