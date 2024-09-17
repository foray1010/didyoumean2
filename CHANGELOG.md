# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [7.0.4](https://github.com/foray1010/didyoumean2/compare/v7.0.3...v7.0.4) (2024-09-17)

### Bug Fixes

- does not include any files on last release ([b899e53](https://github.com/foray1010/didyoumean2/commit/b899e535e4f6c8161264a5697be25aba13e6a93f))

### [7.0.3](https://github.com/foray1010/didyoumean2/compare/v7.0.2...v7.0.3) (2024-09-17)

### Build

- do not minify build ([d91fea4](https://github.com/foray1010/didyoumean2/commit/d91fea426e4ec43b307763e57820c50028caff8b))

### [7.0.2](https://github.com/foray1010/didyoumean2/compare/v7.0.1...v7.0.2) (2024-07-21)

### Bug Fixes

- cannot get types in jest ([4a7344f](https://github.com/foray1010/didyoumean2/commit/4a7344f91152d1f8e75ca1297911804c66d9e979))

### [7.0.1](https://github.com/foray1010/didyoumean2/compare/v7.0.0...v7.0.1) (2024-07-21)

### Bug Fixes

- add back main entry point as eslint-plugin-import does not support conditional exports ([42ef97c](https://github.com/foray1010/didyoumean2/commit/42ef97ca810c6fc8692b70abaed6bd555eb0527c))

## [7.0.0](https://github.com/foray1010/didyoumean2/compare/v6.0.1...v7.0.0) (2024-07-21)

### ⚠ BREAKING CHANGES

- only support conditional exports for entry point
- drop support for umd build
- require node `^18.12.0 || >=20.9.0`

### Bug Fixes

- temporarily remove husky as failed to install by npm 10.4.0 ([c300cc1](https://github.com/foray1010/didyoumean2/commit/c300cc106bf733c610e9e6ebb615970003efcd8e))

- require node `^18.12.0 || >=20.9.0` ([3ebb83e](https://github.com/foray1010/didyoumean2/commit/3ebb83e5274188a5fd8b3d843f6ece0e28a1dc2a))

### build

- drop support for umd build ([3933072](https://github.com/foray1010/didyoumean2/commit/3933072bfdef689b98869d4820b9673bcbb28df2))
- only support conditional exports for entry point ([f6c23c1](https://github.com/foray1010/didyoumean2/commit/f6c23c1f1495e24e8a637f310003231142155cc4))

### [6.0.1](https://github.com/foray1010/didyoumean2/compare/v6.0.0...v6.0.1) (2023-09-07)

### Bug Fixes

- **types:** add mts types declaration file ([6881520](https://github.com/foray1010/didyoumean2/commit/68815207e0fb3a29ee93b3cb4e5dc58101c7e712))

## [6.0.0](https://github.com/foray1010/didyoumean2/compare/v5.0.0...v6.0.0) (2023-09-07)

### ⚠ BREAKING CHANGES

- require node `^16.14.0 || >=18.12.0`
- drop nodejs 14.17 and 18.11
- drop node.js v12 and v17
- only support node ^12.22.0 || ^14.17.0 || >=16.13.0

### Bug Fixes

- compatible with typescript node16 module resolution ([734187d](https://github.com/foray1010/didyoumean2/commit/734187ddc0db49b8269ba930cf8215767f2205c4))
- use TypeError for unknown returnType/thresholdType errors ([7fd3e3e](https://github.com/foray1010/didyoumean2/commit/7fd3e3ef4a0e93131efe021577569f3dd84a246a))

- bump node version requirement ([e656c70](https://github.com/foray1010/didyoumean2/commit/e656c70029b3f46ddc76f82ec79f6f267bd2980a))
- drop node.js v12 and v17 ([e56e7d4](https://github.com/foray1010/didyoumean2/commit/e56e7d4c26b49826fb1c9bec2ac74a8575f299f9))
- drop nodejs 14.17 and 18.11 ([a9d907e](https://github.com/foray1010/didyoumean2/commit/a9d907e207841a4352f56cd448208b2ca4196385))
- require node `^16.14.0 || >=18.12.0` ([7e04b0b](https://github.com/foray1010/didyoumean2/commit/7e04b0bf963f94ed80bcbec45249054fc6f11aeb))

## [5.0.0](https://github.com/foray1010/didyoumean2/compare/v4.2.0...v5.0.0) (2021-05-27)

### ⚠ BREAKING CHANGES

- drop node 10 ([f676176](https://github.com/foray1010/didyoumean2/commit/f676176de6a2e54918198544909806996e4aec23))

## [4.2.0](https://github.com/foray1010/didyoumean2/compare/v4.1.0...v4.2.0) (2021-04-25)

### Features

- add mjs export ([0ef2b51](https://github.com/foray1010/didyoumean2/commit/0ef2b516ab7cbf90aa94499d883819394d6e4d2f))

## [4.1.0](https://github.com/foray1010/didyoumean2/compare/v4.0.0...v4.1.0) (2020-06-18)

### Features

- return different type depends on options.returnType ([1a2c0ce](https://github.com/foray1010/didyoumean2/commit/1a2c0cea00f9a16d3ae505677685e92244d487e4))

### Bug Fixes

- do not use object type as eslint adviced ([27315f6](https://github.com/foray1010/didyoumean2/commit/27315f629db8e8ad99540cc36d49ec1b52c736a9))

## [4.0.0](https://github.com/foray1010/didyoumean2/compare/v3.1.2...v4.0.0) (2020-02-06)

### ⚠ BREAKING CHANGES

- default enable deburr
- drop nodejs < 10.13

### Features

- default enable deburr ([16a0a56](https://github.com/foray1010/didyoumean2/commit/16a0a5613481475047bdb92a2d17aa5fa29a42b8))

- require nodejs 10 ([d22ea95](https://github.com/foray1010/didyoumean2/commit/d22ea9592c7c3b663383506f8ed8738ee821f378))

### [3.1.2](https://github.com/foray1010/didyoumean2/compare/v3.1.1...v3.1.2) (2019-07-29)

### Bug Fixes

- do not throw error when matched item is not string ([656f555](https://github.com/foray1010/didyoumean2/commit/656f555))

### [3.1.1](https://github.com/foray1010/didyoumean2/compare/v3.1.0...v3.1.1) (2019-06-09)

### Build System

- greatly reduce bundle size by rely less on ramda ([69ec2b6](https://github.com/foray1010/didyoumean2/commit/69ec2b6))

## [3.1.0](https://github.com/foray1010/didyoumean2/compare/v3.0.0...v3.1.0) (2019-06-07)

### Build System

- set moduleResolution to node ([e7e6fb4](https://github.com/foray1010/didyoumean2/commit/e7e6fb4))

### Features

- provide esm build ([8e9a755](https://github.com/foray1010/didyoumean2/commit/8e9a755))
- provide umd build ([ab96a8c](https://github.com/foray1010/didyoumean2/commit/ab96a8c))

### Tests

- add type-coverage to ensure typescript coverage ([a19cf85](https://github.com/foray1010/didyoumean2/commit/a19cf85))

## [3.0.0](https://github.com/foray1010/didyoumean2/compare/v2.0.4...v3.0.0) (2019-04-05)

### Bug Fixes

- **deps:** update dependency leven to v3 ([#132](https://github.com/foray1010/didyoumean2/issues/132)) ([0e489ec](https://github.com/foray1010/didyoumean2/commit/0e489ec))

### chore

- only support node >= 6.9 ([8bff8be](https://github.com/foray1010/didyoumean2/commit/8bff8be))

### Features

- accept readonly arguments ([c182207](https://github.com/foray1010/didyoumean2/commit/c182207))

### BREAKING CHANGES

- require TypeScript >=3.4
- drop node >= 4.2 < 6.9

## [2.0.4](https://github.com/foray1010/didyoumean2/compare/v2.0.3...v2.0.4) (2019-03-17)

### Bug Fixes

- Revert "fix(deps): update dependency leven to v3 ([#132](https://github.com/foray1010/didyoumean2/issues/132)))" ([b500e58](https://github.com/foray1010/didyoumean2/commit/b500e58)) as leven v3 doesn't support node 4

## [2.0.3](https://github.com/foray1010/didyoumean2/compare/v2.0.2...v2.0.3) (2019-03-17)

### Bug Fixes

- **deps:** update dependency leven to v3 ([#132](https://github.com/foray1010/didyoumean2/issues/132)) ([fc4ea25](https://github.com/foray1010/didyoumean2/commit/fc4ea25))

## [2.0.2](https://github.com/foray1010/didyoumean2/compare/v2.0.1...v2.0.2) (2019-02-06)

### Bug Fixes

- do not include test files in built package ([e35bbac](https://github.com/foray1010/didyoumean2/commit/e35bbac))
- only allow object and string for function `matchItemProcessor` ([ce656ee](https://github.com/foray1010/didyoumean2/commit/ce656ee))

## [2.0.1](https://github.com/foray1010/didyoumean2/compare/v2.0.0...v2.0.1) (2019-02-02)

### Bug Fixes

- only allow object and string for `matchList` ([1e58e70](https://github.com/foray1010/didyoumean2/commit/1e58e70))

## [2.0.0](https://github.com/foray1010/didyoumean2/compare/v1.3.0...v2.0.0) (2018-10-29)

### Features

- export ReturnTypeEnums and ThresholdTypeEnums ([27a6b37](https://github.com/foray1010/didyoumean2/commit/27a6b37))
- support typescript ([1cff536](https://github.com/foray1010/didyoumean2/commit/1cff536))
- added `"sideEffects": false` flag to support tree shaking ([fb31fac](https://github.com/foray1010/didyoumean2/commit/fb31fac))

### BREAKING CHANGES

- matchPath use Array of string/number instead of string concatenated by `.`
- rename `trimSpace` to `trimSpaces`
- `trimSpaces` default value changed to `true`
- `'random-closest-match'` is removed from `ReturnTypeEnums`
- schema on arguments are removed as it now depends on typescript checking
- `didYouMean` function is exported under `default` key in export object
