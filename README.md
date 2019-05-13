# errorish

[![Version](https://img.shields.io/npm/v/errorish.svg)](https://www.npmjs.com/package/errorish)
[![Build Status](https://img.shields.io/travis/rafamel/errorish/master.svg)](https://travis-ci.org/rafamel/errorish)
[![Coverage](https://img.shields.io/coveralls/rafamel/errorish/master.svg)](https://coveralls.io/github/rafamel/errorish)
[![Dependencies](https://img.shields.io/david/rafamel/errorish.svg)](https://david-dm.org/rafamel/errorish)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/errorish.svg)](https://snyk.io/test/npm/errorish)
[![License](https://img.shields.io/github/license/rafamel/errorish.svg)](https://github.com/rafamel/errorish/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/errorish.svg)](https://www.npmjs.com/package/errorish)

> For those times you have an error-*ish* but what you really want is an *Error.*

If you find it useful, consider [starring the project](https://github.com/rafamel/errorish) 💪 and/or following [its author](https://github.com/rafamel) ❤️ -there's more on the way!

## Install

[`npm install errorish`](https://www.npmjs.com/package/errorish)

## Use cases

There are essentially three use cases for `errorish`:

* [You need to make sure *any* object is actually an error, as expected.](#ensuring-any-is-an-error--otherwise-create-it)
* [You need to make sure an *Error* has a `message`, `name`, and `stack` properties.](#normalizing-errors)
* [You want to catch errors and throw a different *Error*:](#catching-and-throwing-errors-to-be-made-public)
  * with a different message and specific data that might be made public,
  * while preserving information about the original exception that caused your program to fail,
  * on different levels of the call stack, but keeping only the first one of its kind throwed.

## Documentation

These are all of `errorish`'s functions -[see docs:](https://rafamel.github.io/errorish/globals.html)

* [`ensure`](https://rafamel.github.io/errorish/globals.html#ensure) ensures `any` is an `Error`, otherwise creating one -optionally, it can also have a normalization step, which is [enabled by default.](https://rafamel.github.io/errorish/globals.html#defaults)
* [`normalize`](https://rafamel.github.io/errorish/globals.html#normalize) ensures an `Error` has a `message`, `name`, and `stack` properties -filling them if they're not defined.
* [`rejects`](https://rafamel.github.io/errorish/globals.html#rejects) returns a promise rejection with an error, having called `ensure` on it.
* [`throws`](https://rafamel.github.io/errorish/globals.html#throws) takes a function and returns its value if it doesn't throw; otherwise, it will call `ensure` on the thrown error and throw it.

[Options](https://rafamel.github.io/errorish/interfaces/icoreoptions.html) can be passed directly to these functions, though they will be merged in all cases with the [defaults](https://rafamel.github.io/errorish/globals.html#defaults) -you can use [`scope.set`](https://rafamel.github.io/errorish/globals.html#scope) to set these.

Additionally, you might want to create particular [`scopes` with a different set of default options](https://rafamel.github.io/errorish/globals.html#scope) depending on your use case.

## Usage

### Ensuring `any` is an error -otherwise create it

#### Return an error from any error-*ish*

```javascript
import { ensure } from 'errorish';

ensure(Error('Foo bar')); // Error: Foo bar

ensure('Foo bar'); // Errorish: Foo bar
ensure({ message: 'Foo bar' }); // Errorish: Foo bar

// As this is a number, it will use the default message
ensure(10); // Errorish: An error occurred
// We can also allow numbers -or any other type- to be stringified
ensure(10, { allow: ['string', 'number'] }); // Errorish: 10

// Errors will always preserve the original source
ensure(10).source; // 10

// Additionally, we can pass some data to errors
ensure(10, null, { foo: 'bar' }).data; // { foo: 'bar' }
```

#### Throw or reject with an error-*ish*

[`throws`](https://rafamel.github.io/errorish/globals.html#throws) and [`rejects`](https://rafamel.github.io/errorish/globals.html#rejects) run [`ensure`](https://rafamel.github.io/errorish/globals.html#ensure) over your error-*ish* and throw or reject with it -these are just convenience functions over `ensure`:

```javascript
import { rejects, throws, ensure } from 'errorish';

/* rejects */
Promise.reject(10).catch(rejects) // Reject<Errorish: An error occurred>

// Options for `rejects` and `throws` also take a `case` field which,
// if false, will make them to have a void response
Promise.reject(10).catch(err => rejects(err, { case: false })); // Resolve<undefined>

/* throws */
throws(() => { throw 10; }); // Throw<Errorish: An error occurred>

// The above is equivalent to:
try {
  throw 10;
} catch(err) {
  throw ensure(err);
}

// it can also be passed an async function
throws(async () => { throw 10; }); // Reject<Errorish: An error occurred>

throws(() => 10); // Return<10>
```

### Normalizing errors

Normalization is performed by default by [`ensure`,](https://rafamel.github.io/errorish/globals.html#throws) but it can also be run independently:

```javascript
import { normalize } from 'errorish';

normalize(Error()); // Error: An error occurred
normalize(Error(), { message: 'Foo bar' }); // Error: Foo bar
```

### Catching and throwing errors to be made public

```javascript
import { Errorish, scope } from 'errorish';

// As we might want to preserve the defaults for the root scope,
// we'll create a new scope we'll name `ish`.
// For that scope, we'll set Errorish as the class errors
// will be ensured against, so even when an actual `Error` is passed,
// if not an `Errorish`, a new one will be created.
const ish = scope.set('ish', { Error: Errorish, allow: [] });

function authorize() {
  throw Error(`Error with details I'd rather not expose`);
}

function example() {
  try {
    authorize();
  } catch (err) {
    // As an `Error` is not an instance of `Errorish`, one will be
    // created with message `Server failed running your example`
    // and data `{ code: 500 }`
    throw ish.ensure(
      err,
      { message: `Authorization for example failed` },
      { code: 401 }
    );
  }
}

function server() {
  try {
    example();
  } catch (err) {
    // As example already throwed an `Errorish`, the same one will be
    // preserved, ignoring the more general-purpose message and code
    throw ish.ensure(err, { message: 'Server failed' }, { code: 500 });
  }
}

try {
  server();
} catch (e) {
  console.log(e.message); // Authorization for example failed
  console.log(e.data); // { code: 401 }
  console.log(e.source); // Error: Error with details I'd rather not expose
}
```
