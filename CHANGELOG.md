# [1.0.0](https://github.com/rafamel/errorish/compare/v0.5.0...v1.0.0) (2020-12-11)


### Bug Fixes

* **deps:** updates dependencies ([9905c58](https://github.com/rafamel/errorish/commit/9905c58a4979df48219823a3b5308bbe2eb7962c))


### Code Refactoring

* **utils:** removes rejects and throws ([6c9dc85](https://github.com/rafamel/errorish/commit/6c9dc853d85ec2a56314d77fd45a402919643c92))


### Features

* **utils:** ensure creates an Exception by default ([0559541](https://github.com/rafamel/errorish/commit/0559541cc51bb93aea892b5738e35558613e774b))
* adds Exception class ([e5ba311](https://github.com/rafamel/errorish/commit/e5ba311984a1e0233711b66e88bea48259780fb6))
* **utils:** adds capture ([55d5e70](https://github.com/rafamel/errorish/commit/55d5e703b8637f5822cdbc195be6d04cb0807dbd))


### improvement

* **utils:** ensure doesn't capture new errors by default ([9f78375](https://github.com/rafamel/errorish/commit/9f7837529697a9bbdb04f9da48323a3551f75161))
* **utils:** ensure no longer takes an EnsureCreateOptions object as a second argument ([295da27](https://github.com/rafamel/errorish/commit/295da279365290d119d4e36b66b30729c1d69eea))


### BREAKING CHANGES

* **utils:** The ensure function used to capture the stack trace of new errors created within
it, even when not explicitly passed an option to. The latest implementation doesn't capture the
stack trace of newly created errors by default.
* **utils:** When not provided with a `create` function as an argument, `ensure` will create and
return an Exception instead of a plain Error when its first argument is not an error. This Exception
instance will have its data `field` populated with the element passed `ensure` as an *error*.
* **utils:** `ensure` used to take an EnsureCreateOptions object as a second argument allowing
to specify the input types that, when not an error, would be casted into a string for the new Error
to have as message. The new implementation casts all non Error input types into a string to use as a
message. Otherwise, passing an Error creating function as a second argument remains possible.
* **utils:** The utility functions rejects and throws have been removed from the library as they didn't add any significant value over ensure -they acted as minimal wrappers.
* Errorish has been replaced by the Exception class. The change is not merely of name, as the api surface has been vastly reduced. Please review the most current documentation.



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



