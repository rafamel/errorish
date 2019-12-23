# Errorish

[![Version](https://img.shields.io/npm/v/errorish.svg)](https://www.npmjs.com/package/errorish)
[![Build Status](https://img.shields.io/travis/rafamel/errorish/master.svg)](https://travis-ci.org/rafamel/errorish)
[![Coverage](https://img.shields.io/coveralls/rafamel/errorish/master.svg)](https://coveralls.io/github/rafamel/errorish)
[![Dependencies](https://img.shields.io/david/rafamel/errorish.svg)](https://david-dm.org/rafamel/errorish)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/errorish.svg)](https://snyk.io/test/npm/errorish)
[![License](https://img.shields.io/github/license/rafamel/errorish.svg)](https://github.com/rafamel/errorish/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/errorish.svg)](https://www.npmjs.com/package/errorish)

## Install

[`npm install errorish`](https://www.npmjs.com/package/errorish)

## Use cases

There are three main use cases for *Errorish*:

* [You need to make sure an `Error` has a `message`, `name`, and `stack` properties.](#normalizing-errors)
* [You need to make sure *any* object is actually an error, as expected.](#ensuring-any-is-an-error--otherwise-create-it)
* [You want to extend the `Error` class to store an identifying `label`, some `data` fields, and/or the `source` exception that caused your program to fail](#errorish-class)

## Documentation

These are all of *Errorish*'s functions and classes -[see docs:](https://rafamel.github.io/errorish/globals.html)

* [`normalize`](https://rafamel.github.io/errorish/globals.html#normalize) ensures an `Error` has a `message`, `name`, and `stack` properties -filling them if they're not defined.
* [`ensure`](https://rafamel.github.io/errorish/globals.html#ensure) ensures `any` is an `Error`, otherwise creating one -it can also have a normalization step, which is enabled by default.
* [`rejects`](https://rafamel.github.io/errorish/globals.html#rejects) returns a promise rejection with an error, having called `ensure` on it.
* [`throws`](https://rafamel.github.io/errorish/globals.html#throws) takes a function and returns its value if it doesn't throw; otherwise, it will call `ensure` on the thrown error and throw it.
* [`Errorish`](https://rafamel.github.io/errorish/classes/errorish.html) is a *class* with some conveniency methods relating to its `label`, `data`, and `source` fields.

## Usage

### Normalizing errors

Normalization is performed by default by [`ensure`,](https://rafamel.github.io/errorish/globals.html#throws) but it can also be run independently:

```javascript
import { normalize } from 'errorish';

normalize(Error()); // Error: An error occurred
normalize(Error(), { message: 'Foo bar' }); // Error: Foo bar
```

### Ensuring *any* is an error -otherwise create it

See [`ensure`.](https://rafamel.github.io/errorish/globals.html#ensure)

#### Return an error from any error-*ish*

```javascript
import { ensure } from 'errorish';

ensure(Error('Foo bar')); // Error: Foo bar

ensure('Foo bar'); // Error: Foo bar
ensure({ message: 'Foo bar' }); // Error: Foo bar

// As this is a number, it will use the default message
ensure(10); // Error: An error occurred

// We can also allow numbers -or any other type- to be stringified
ensure(10, { allow: ['string', 'number'] }); // Error: 10

// Or otherwise, provide a creation function
ensure(10, (err) => Error('10 is not an error')) // Error: 10 is not an error
```

#### Throw or reject from an error-*ish*

[`throws`](https://rafamel.github.io/errorish/globals.html#throws) and [`rejects`](https://rafamel.github.io/errorish/globals.html#rejects) run [`ensure`](https://rafamel.github.io/errorish/globals.html#ensure) over your error-*ish* and throw or reject with it -these are just convenience functions over `ensure`:

```javascript
import { rejects, throws, ensure } from 'errorish';

Promise.reject(10).catch(rejects) // Reject<Error: An error occurred>

throws(() => { throw 10; }); // Throw<Error: An error occurred>

// The above is equivalent to:
try {
  throw 10;
} catch(err) {
  throw ensure(err);
}

// it can also be passed an async function
throws(async () => { throw 10; }); // Reject<Error: An error occurred>
```

### `Errorish` class

A *class* with some conveniency methods relating to its `label`, `data`, and `source` fields -see [`Errorish`.](https://rafamel.github.io/errorish/classes/errorish.html).

#### Constructor

The `Errorish` constructor takes in the optional arguments `message`, `label`, `data`, and `source`.

```javascript
import { Errorish } from 'errorish';

const fn = () => { throw Error('Source'); };

try {
  fn();
} catch(source) {
  throw new Errorish('Message', 'label', { code: 401 }, source);
}
```

#### Static methods

##### `Errorish.is(error: Error, label?: string | null | Array<string | null>): boolean`

Returns `true` if `error` is an instance of the class with label `label`, if passed.

```javascript
import { Errorish } from 'errorish';

const error = new Errorish();

Errorish.is(error); // true
Errorish.is(error, 'Label'); // false
```

##### `Errorish.recast(error: Error, create: (error: Errorish) => Error, label?: string | null | Array<string | null>)`

Runs and returns the result of `fn` only when `error` is an instance of the class and, optionally, has a specific `label`.

##### `Errorish.raise(fn: () => any, create: (error: Errorish) => Error, label?: string | null | Array<string | null>)`

Calls `recast` and throws its response if `fn` throws or rejects, otherwise returns or throws the same result or error as `fn`.

##### `Errorish.ensure(error: any, create: (error: any) => Error, options: object): Error`

Same as [`ensure`,](#ensuring-any-is-an-error--otherwise-create-it) though it will ensure against the `error` being an instance of `Errorish`.

##### `Errorish.rejects(error: any, create: (error: any) => Error, options: object): Error`

Same as [`rejects`,](#ensuring-any-is-an-error--otherwise-create-it) though it will ensure against the `error` being an instance of `Errorish`.

##### `Errorish.throws(error: () => any, create: (error: any) => Error, options: object): Error`

Same as [`throws`,](#ensuring-any-is-an-error--otherwise-create-it) though it will ensure against the `error` being an instance of `Errorish`.

#### Instance methods

##### `errorish.root(): Errorish`

References the first `Errorish` in the `Errorish.source` chain.

```javascript
import { Errorish } from 'errorish';

const source = Error();
const a = new Errorish(null, null, null, source);
const b = new Errorish(null, null, null, a);
const c = new Errorish(null, null, null, b);

// Will return `a`
c.root();
```

##### `errorish.error(): Error`

Returns `Errorish.source` if it is an `Error`, otherwise it returns itself.

##### `errorish.reproduce(data?: object): Errorish`

Clones the instance and assigns it a new `data` field.

##### `errorish.capture(): Errorish`

Runs `Error.captureStackTrace` if running in `V8` to clean up the error stack trace.
