# didyoumean2

[![Build Status](https://img.shields.io/circleci/project/foray1010/didyoumean2/master.svg)](https://circleci.com/gh/foray1010/didyoumean2/tree/master)
[![codecov.io](https://img.shields.io/codecov/c/github/foray1010/didyoumean2.svg)](https://codecov.io/github/foray1010/didyoumean2?branch=master)
[![Dependency Status](https://img.shields.io/gemnasium/foray1010/didyoumean2.svg)](https://gemnasium.com/foray1010/didyoumean2)

[![node](https://img.shields.io/node/v/didyoumean2.svg)]()
[![npm](https://img.shields.io/npm/dm/didyoumean2.svg)]()
[![npm](https://img.shields.io/npm/l/didyoumean2.svg)]()

`didyoumean2` is a library for matching human-quality input to a list of potential matches using the [Levenshtein distance algorithm](https://en.wikipedia.org/wiki/Levenshtein_distance).
It is inspired by [didyoumean.js](https://github.com/dcporter/didyoumean.js).

#### Why reinventing the wheel
1. Based on [leven](https://github.com/sindresorhus/leven), the fastest JS implementation of the [Levenshtein distance algorithm](https://en.wikipedia.org/wiki/Levenshtein_distance)

2. ~100% faster than [didyoumean.js](https://github.com/dcporter/didyoumean.js)

3. Well tested with 100% coverage

4. More control on what kind of matches you want to return

5. Support matching object's `path` instead of just `key`


## Installation
```sh
npm install didyoumean2
```

```js
const didYouMean = require('didyoumean2')
```


## Usage
```
didYouMean(input, matchList[, options])
```

`input {string}`: A string that you are not sure and want to match with `matchList`

`matchList {Object[]|string[]}`: A List for matching with `input`

`options {Object}`(optional): An options that allows you to modify the behavior

`@return {Array|null|Object|string}`: A list of or single matched result(s), return object if `match` is `{Object[]}`

### Options
#### `caseSensitive {boolean}`
  - default: `false`

  - Perform case-sensitive matching

#### `deburr {boolean}`
  - default: `false`

  - Perform [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) insensitive matching

  - Refer to [lodash _.deburr](https://lodash.com/docs#deburr) for how it works

#### `matchPath {string}`
  - default: `''`

  - If your `matchList` is an array of object, you must use `matchPath` to point to the string that you want to match

  - Refer to [lodash _.get](https://lodash.com/docs#get) for how to define the path

#### `returnType {string}`
  - default: `'first-closest-match'`

| returnType               | Description                                                       |
|--------------------------|-------------------------------------------------------------------|
| `'all-closest-matches'`  | Return all matches with the closest value to the `input` in array |
| `'all-matches'`          | Return all matches in array                                       |
| `'all-sorted-matches'`   | Return all matches in array, sorted from closest to furthest      |
| `'first-closest-match'`  | Return first match from `'all-closest-matches'`                   |
| `'first-match'`          | Return first match (__FASTEST__)                                  |
| `'random-closest-match'` | Return a randomly pick up from `'all-closest-matches'`            |

#### `threshold {integer|number}`
  - depends on `thresholdType`

  - type: ` {number}` (`similarity`) or ` {integer}` (`edit-distance`)

  - default: `0.4` (`similarity`) or `20` (`edit-distance`)

  - If the result is larger (`similarity`) or smaller (`edit-distance`) than or equal to the `threshold`, that result is matched

#### `thresholdType {string}`
  - default: `'similarity'`

| thresholdType     | Description                                                                                                                                      |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `'edit-distance'` | Refer to [Levenshtein distance algorithm](https://en.wikipedia.org/wiki/Levenshtein_distance), must be `integer`, lower value means more similar |
| `'similarity'`    | `l = max(input.length, matchItem.length), similarity = (l - editDistance) / l`, `number` from `0` to `1`, higher value means more similar        |

#### `trimSpace {boolean}`
  - default: `false` (will change to `true` in next major version)

  - Remove noises when matching

  - Trim all starting and ending spaces, and concatenate all continuous spaces to one space


## Test
Unit test:
```sh
npm install
npm test
```

Coverage:
```sh
npm install
npm run coverage
```

Linter:
```sh
npm install
npm run lint
```
