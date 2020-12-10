# Errorish

[![Version](https://img.shields.io/npm/v/errorish.svg)](https://www.npmjs.com/package/errorish)
[![Build Status](https://img.shields.io/travis/rafamel/errorish/master.svg)](https://travis-ci.org/rafamel/errorish)
[![Coverage](https://img.shields.io/coveralls/rafamel/errorish/master.svg)](https://coveralls.io/github/rafamel/errorish)
[![Dependencies](https://img.shields.io/david/rafamel/errorish.svg)](https://david-dm.org/rafamel/errorish)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/errorish.svg)](https://snyk.io/test/npm/errorish)
[![License](https://img.shields.io/github/license/rafamel/errorish.svg)](https://github.com/rafamel/errorish/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/errorish.svg)](https://www.npmjs.com/package/errorish)

> When you have an error-ish but what you really want is an Error.

## Install

[`npm install errorish`](https://www.npmjs.com/package/errorish)

## Use cases

There are three main use cases for *Errorish*:

* [You need to make sure an `Error` has a `message`, `name`, and `stack` properties.](#normalize)
* [You need to make sure *any* object is actually an error, as expected.](#ensure)
* [You want to extend the `Error` class to store an identifying `label`, a source `error`, and/or associated `data`.](#exception)

## Usage

[See complete documentation.](https://rafamel.github.io/errorish/globals.html)

* [`Exception`](#exception) is an *Error* extending class with additional `label`, `error` and `data` fields.
* [Utils](#utils):
  * [`ensure`](#ensure) ensures `any` is an `Error`, otherwise creating one -it can optionally include a normalization step, enabled by default.
  * [`normalize`](#normalize) ensures an `Error` has a `message`, `name`, and `stack` properties -filling them if they're not defined.
  * [`capture`](#capture) runs `Error.captureStackTrace` if running in `V8` to clean up the error stack trace.

### `Exception`

[See documentation for `Exception`.](https://rafamel.github.io/errorish/classes/exception.html)

`Exception` is an *Error* extending class that can store an identifying `label`, the source `error` that caused it and/or additional associated `data`. [`Exception` also comes with several static and instance methods.](https://rafamel.github.io/errorish/classes/exception.html)

```javascript
import { Exception } from 'errorish';

try {
  try {
    throw Error('Source');
  } catch(err) {
    // throws with label
    throw new Exception(['label', 'message'], err, { code: 401 });
  }
} catch(err) {
  // throws without label
  throw new Exception(err.message, err, { code: 500 })
}
```

### Utils

#### `ensure`

[See documentation for `ensure`.](https://rafamel.github.io/errorish/globals.html#ensure)

Ensure will return its first argument if an instance of `Error` is passed as such, otherwise instantiating and returning an `Exception`.

```javascript
import { ensure } from 'errorish';

ensure('foo'); // Error: foo
ensure(Error('foo')); // Error: foo
ensure({ message: 'foo' }); // Error: foo
```

#### `normalize`

[See documentation for `normalize`.](https://rafamel.github.io/errorish/globals.html#normalize)

Normalization fills an error's `message`, `name`, and `stack` property when empty. It's performed by default by `ensure`, but it can also be run independently.

```javascript
import { normalize } from 'errorish';

normalize(Error()); // Error: An error occurred
normalize(Error(), { message: 'Foo bar' }); // Error: Foo bar
```

#### `capture`

[See documentation for `capture`.](https://rafamel.github.io/errorish/globals.html#capture)

Captures the stack trace on *Node* and *Chromium* browsers.

```javascript
import { capture } from 'errorish';

capture(Error());
```
