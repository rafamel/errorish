# [0.2.0](https://github.com/rafamel/errorish/compare/v0.1.0...v0.2.0) (2019-04-21)


### Code Refactoring

* **types, rejects:** renames IExceptionOptions to IRejectionOptions ([770ccd5](https://github.com/rafamel/errorish/commit/770ccd5))


### Features

* **throws:** throws now takes a function instead of an error ([eac3b46](https://github.com/rafamel/errorish/commit/eac3b46))


### BREAKING CHANGES

* **types, rejects:** IExceptionOptions is now IRejectionOptions
* **throws:** throws now takes a function instead of an error; it will ensure and throw any error
thrown by that function, otherwise returning its value.



# [0.1.0](https://github.com/rafamel/errorish/compare/d68f3a7...v0.1.0) (2019-04-18)


### Bug Fixes

* **ensure, normalize:** prevents defaults object mutation when options are passed ([3a66c02](https://github.com/rafamel/errorish/commit/3a66c02))


### Features

* adds ensure ([ac388c0](https://github.com/rafamel/errorish/commit/ac388c0))
* adds entry point exports ([bec50c0](https://github.com/rafamel/errorish/commit/bec50c0))
* **ensure:** implements stringify ([8518cd5](https://github.com/rafamel/errorish/commit/8518cd5))
* adds Errorish ([d68f3a7](https://github.com/rafamel/errorish/commit/d68f3a7))
* adds normalize ([bc68ac6](https://github.com/rafamel/errorish/commit/bc68ac6))
* **ensure:** implements trunk ([e8bd0da](https://github.com/rafamel/errorish/commit/e8bd0da))
* **ensure:** improves typings ([f44a664](https://github.com/rafamel/errorish/commit/f44a664))
* **scope:** adds defaults ([f9770a4](https://github.com/rafamel/errorish/commit/f9770a4))
* **scope:** adds scope getter/setter ([69431e3](https://github.com/rafamel/errorish/commit/69431e3))
* **scope:** scope.set returns the scope ([f1976a8](https://github.com/rafamel/errorish/commit/f1976a8))
* adds rejects ([109cd57](https://github.com/rafamel/errorish/commit/109cd57))
* adds throws ([d8cef9e](https://github.com/rafamel/errorish/commit/d8cef9e))
* **throws,rejects:** evaluates options.case when property exists; improves typings ([5cb7d9c](https://github.com/rafamel/errorish/commit/5cb7d9c))
* **types:** adds ICoreOptions ([84d4529](https://github.com/rafamel/errorish/commit/84d4529))



