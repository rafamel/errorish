import { TypeGuard } from 'type-core';

export declare namespace Exception {
  /** An identifying label for exceptions to indicate their scope or origin */
  export type Label = string | null;
  /** An exception-like object */
  export interface Like<L extends Label = Label, D = any> {
    label: L;
    message: string;
    error?: Error;
    data: D;
  }
}

export class Exception<L extends Exception.Label = Exception.Label, D = any>
  extends Error
  implements Exception.Like<L, D>
{
  /**
   * Tests whether an item is an instance of the `Exception` class
   * or any class inheriting from it.
   * When `item` is an `Exception`, it will optionally
   * test for the instance also having a specific `label`.
   */
  public static is<L extends Exception.Label = Exception.Label>(
    item: any,
    label?: L
  ): item is Exception<L> {
    if (!(item instanceof Exception)) return false;
    if (TypeGuard.isUndefined(label)) return true;
    return item.label === label;
  }
  /**
   * Creates an `Exception` from any exception-like object.
   * When `item` is an `Exception`, a new instance will not be created.
   */
  public static from<L extends Exception.Label, D>(
    item: Exception.Like<L, D>
  ): Exception<L, D> {
    return Exception.is(item)
      ? item
      : new Exception([item.label, item.message], item.error, item.data);
  }
  /** An optional label that identifies the exception. */
  public label: L;
  /** An optional data field. */
  public data: D;
  /** A source error causing the exception or a reference to itself. */
  public error: Error;
  /**
   * @param notice a message string or an array containing a label and a message
   * @param error an optional source or original error that caused the exception
   * @param data an optional data field
   */
  public constructor(
    notice: string | [L, string],
    error?: Error | null,
    data?: D
  ) {
    const [label, message] = TypeGuard.isArray(notice)
      ? notice
      : [null, notice];

    super(message);
    this.label = label as L;
    this.data = data as D;
    this.error = TypeGuard.isNullLike(error) ? this : error;
  }
  /**
   * `Exception.name` will have value "Exception"
   * or "Exception [label]" instead of "Error"
   */
  public get name(): string {
    return TypeGuard.isNullLike(this.label)
      ? 'Exception'
      : `Exception [${this.label}]`;
  }
  /**
   * References the first `Exception` in the `Exception.error` chain.
   */
  public root(): Exception {
    if (this.error === this) return this;
    if (this.error instanceof Exception) return this.error.root();
    return this;
  }
}
