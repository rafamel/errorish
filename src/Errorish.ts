import { IOfType } from './types';

export default class Errorish<S> extends Error {
  /**
   * An optional `source` -should reference the object that originated the `Errorish`.
   */
  public source?: S;
  /**
   * An optional `data` field.
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
   * References `source.root` is an instance of `Errorish`; references `source` if it is an instance of `Error`; otherwise it references itself.
   */
  public get root(): Error {
    if (this.source instanceof Errorish) return this.source.root;
    return this.source instanceof Error ? this.source : this;
  }
}
