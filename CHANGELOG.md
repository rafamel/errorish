# [0.5.0](https://github.com/rafamel/errorish/compare/v0.4.0...v0.5.0) (2019-12-23)


### Bug Fixes

* **Errorish:** fixes static classes for inheriting classes ([ae9ecf2](https://github.com/rafamel/errorish/commit/ae9ecf2adedec9f66240d81f2dd1f0fcbacca399))


### chore

* cleans up sources; begins complete rewrite ([f745eb9](https://github.com/rafamel/errorish/commit/f745eb957b3b69240075f16545c27d796161c1cb))


### Code Refactoring

* removes I prefix from type interfaces ([122d668](https://github.com/rafamel/errorish/commit/122d66849bad51b9f7fcc49be2fa8df9501689d9))


### Features

* **Errorish:** adds Errorish.raise; modifies recast arguments order ([ebb1f60](https://github.com/rafamel/errorish/commit/ebb1f602107ca2aad45e0c8d7148874d41ca2fbc))
* adds ensure ([6d0a537](https://github.com/rafamel/errorish/commit/6d0a5375d151c17cdec4e32a740cc2abb7606344))
* adds Errorish class ([e12df09](https://github.com/rafamel/errorish/commit/e12df0963b51ed5d7cedebbbe5a38bd3bd8f19b9))
* adds normalize ([a4994af](https://github.com/rafamel/errorish/commit/a4994af3c23dac39709baa2a686d275b9ea4e45f))
* adds rejects ([3b0c833](https://github.com/rafamel/errorish/commit/3b0c8335ccaf9f2a08dc29e10612dea97f13223a))
* adds throws ([e73d3d3](https://github.com/rafamel/errorish/commit/e73d3d30275088ebb22c95ac8c2f1b9c13096413))
* adds types ([3e8d28e](https://github.com/rafamel/errorish/commit/3e8d28ec6e1cd2bcfa74deefa5b83892c73043bc))


### BREAKING CHANGES

* Errorish has been almost entirely rewritten. Please check the updated documentation
-most of its functionality has suffered changes.
* Type interfaces are no longer prefixed by "I"



# [0.4.0](https://github.com/rafamel/errorish/compare/v0.3.0...v0.4.0) (2019-05-13)


### Bug Fixes

* **deps:** updates promist to v0.6.0 ([910b0c5](https://github.com/rafamel/errorish/commit/910b0c5))
* **deps:** updates promist to v0.7.0 ([fa8b936](https://github.com/rafamel/errorish/commit/fa8b936))


### Features

* **Errorish:** adds set and assign methods ([844fa77](https://github.com/rafamel/errorish/commit/844fa77))
* **Errorish:** allows for message to be null ([feb020d](https://github.com/rafamel/errorish/commit/feb020d))
* **Errorish:** recursively obtains root ([f74fdb7](https://github.com/rafamel/errorish/commit/f74fdb7))
* **Errorish:** reverses source and data params order ([3b17f3b](https://github.com/rafamel/errorish/commit/3b17f3b))


### BREAKING CHANGES

* **Errorish:** While previously `data` was the second argument and `source` the third for the
Errorish class constructor, now `source` is the second and `data` the third



# [0.3.0](https://github.com/rafamel/errorish/compare/v0.2.1...v0.3.0) (2019-04-27)


### Features

* **throws:** takes async functions too ([0e6d974](https://github.com/rafamel/errorish/commit/0e6d974))



## [0.2.1](https://github.com/rafamel/errorish/compare/v0.2.0...v0.2.1) (2019-04-23)


### Bug Fixes

* **rejects:** fixes rejects typings ([105a306](https://github.com/rafamel/errorish/commit/105a306))



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



