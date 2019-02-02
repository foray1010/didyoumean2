# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.0.1"></a>
## [2.0.1](https://github.com/foray1010/didyoumean2/compare/v2.0.0...v2.0.1) (2019-02-02)


### Bug Fixes

* only allow object and string for `matchList` ([1e58e70](https://github.com/foray1010/didyoumean2/commit/1e58e70))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/foray1010/didyoumean2/compare/v1.3.0...v2.0.0) (2018-10-29)


### Features

* export ReturnTypeEnums and ThresholdTypeEnums ([27a6b37](https://github.com/foray1010/didyoumean2/commit/27a6b37))
* support typescript ([1cff536](https://github.com/foray1010/didyoumean2/commit/1cff536))
* added `"sideEffects": false` flag to support tree shaking ([fb31fac](https://github.com/foray1010/didyoumean2/commit/fb31fac))


### BREAKING CHANGES

* matchPath use Array of string/number instead of string concatenated by `.`
* rename `trimSpace` to `trimSpaces`
* `trimSpaces` default value changed to `true`
* `'random-closest-match'` is removed from `ReturnTypeEnums`
* schema on arguments are removed as it now depends on typescript checking
* `didYouMean` function is exported under `default` key in export object
