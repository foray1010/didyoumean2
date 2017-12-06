import Immutable from 'seamless-immutable'
import * as R from 'ramda'

import didYouMean from './index'
import {
  ALL_CLOSEST_MATCHES,
  ALL_MATCHES,
  ALL_SORTED_MATCHES,
  FIRST_CLOSEST_MATCH,
  FIRST_MATCH
} from './enums/returnTypeEnums.json'
import {EDIT_DISTANCE, SIMILARITY} from './enums/thresholdTypeEnums.json'

const input = 'abcdefghij'
const matchList = Immutable([
  'abc*******',
  'abcd******',
  'abcde*****',
  'ABCDEF****',
  'abcde*g***',
  'abcdef****'
])

test('without options', () => {
  expect(didYouMean(input, matchList)).toBe(matchList[3])
})

test('caseSensitive', () => {
  expect(
    didYouMean(input, matchList, {
      caseSensitive: true
    })
  ).toBe(matchList[4])

  expect(
    didYouMean(input, matchList, {
      caseSensitive: false
    })
  ).toBe(matchList[3])
})

test('matchPath', () => {
  const matchPath = ['obj', 'array', 0, 'obj2']

  const matchObjList = matchList.map((value) => R.assocPath(matchPath, value, {}))

  expect(
    didYouMean(input, matchObjList, {
      matchPath
    })
  ).toEqual(matchObjList[3])
})

test('returnType', () => {
  // test all-closest-matches
  const allClosestMatchesResult = matchList.slice(3, matchList.length)

  expect(
    didYouMean(input, matchList, {
      returnType: ALL_CLOSEST_MATCHES
    })
  ).toEqual(allClosestMatchesResult)

  expect(
    didYouMean(input, matchList, {
      returnType: ALL_CLOSEST_MATCHES,
      threshold: 0.7
    })
  ).toEqual([])

  // test all-matches
  const allMatchesResult = matchList.slice(1)

  expect(
    didYouMean(input, matchList, {
      returnType: ALL_MATCHES
    })
  ).toEqual(allMatchesResult)

  expect(
    didYouMean(input, matchList, {
      returnType: ALL_MATCHES,
      threshold: 0.7
    })
  ).toEqual([])

  // test all-sorted-matches
  {
    const allSortedMatchesResult = [
      'ABCDEF****',
      'abcde*g***',
      'abcdef****',
      'abcde*****',
      'abcd******'
    ]

    expect(
      didYouMean(input, matchList, {
        returnType: ALL_SORTED_MATCHES
      })
    ).toEqual(allSortedMatchesResult)
  }

  {
    const allSortedMatchesResult = [
      'ABCDEF****',
      'abcde*g***',
      'abcdef****',
      'abcde*****',
      'abcd******',
      'abc*******'
    ]

    expect(
      didYouMean(input, matchList, {
        returnType: ALL_SORTED_MATCHES,
        thresholdType: EDIT_DISTANCE
      })
    ).toEqual(allSortedMatchesResult)
  }

  // test first-closest-match
  expect(
    didYouMean(input, matchList, {
      returnType: FIRST_CLOSEST_MATCH
    })
  ).toBe(matchList[3])

  expect(
    didYouMean(input, matchList, {
      returnType: FIRST_CLOSEST_MATCH,
      threshold: 0.7
    })
  ).toBe(null)

  // test first-match
  expect(
    didYouMean(input, matchList, {
      returnType: FIRST_MATCH
    })
  ).toBe(matchList[1])
})

test(`threshold: "${EDIT_DISTANCE}"`, () => {
  expect(
    didYouMean(input, matchList, {
      returnType: FIRST_MATCH,
      threshold: 7,
      thresholdType: EDIT_DISTANCE
    })
  ).toBe(matchList[0])

  expect(
    didYouMean(input, matchList, {
      returnType: FIRST_MATCH,
      threshold: 6,
      thresholdType: EDIT_DISTANCE
    })
  ).toBe(matchList[1])

  expect(
    didYouMean(input, matchList, {
      returnType: FIRST_MATCH,
      threshold: 5,
      thresholdType: EDIT_DISTANCE
    })
  ).toBe(matchList[2])

  expect(
    didYouMean(input, matchList, {
      returnType: FIRST_CLOSEST_MATCH,
      threshold: 4,
      thresholdType: EDIT_DISTANCE
    })
  ).toBe(matchList[3])

  expect(
    didYouMean(input, matchList, {
      returnType: FIRST_MATCH,
      threshold: 4,
      thresholdType: EDIT_DISTANCE
    })
  ).toBe(matchList[3])

  expect(
    didYouMean(input, matchList, {
      returnType: FIRST_MATCH,
      threshold: 3,
      thresholdType: EDIT_DISTANCE
    })
  ).toBe(null)
})

test(`threshold: "${SIMILARITY}"`, () => {
  expect(
    didYouMean(input, matchList, {
      returnType: FIRST_MATCH,
      threshold: 0.3,
      thresholdType: SIMILARITY
    })
  ).toBe(matchList[0])

  expect(
    didYouMean(input, matchList, {
      returnType: FIRST_MATCH,
      threshold: 0.4,
      thresholdType: SIMILARITY
    })
  ).toBe(matchList[1])

  expect(
    didYouMean(input, matchList, {
      returnType: FIRST_MATCH,
      threshold: 0.5,
      thresholdType: SIMILARITY
    })
  ).toBe(matchList[2])

  expect(
    didYouMean(input, matchList, {
      returnType: FIRST_CLOSEST_MATCH,
      threshold: 0.6,
      thresholdType: SIMILARITY
    })
  ).toBe(matchList[3])

  expect(
    didYouMean(input, matchList, {
      returnType: FIRST_MATCH,
      threshold: 0.6,
      thresholdType: SIMILARITY
    })
  ).toBe(matchList[3])

  expect(
    didYouMean(input, matchList, {
      returnType: FIRST_MATCH,
      threshold: 0.7,
      thresholdType: SIMILARITY
    })
  ).toBe(null)
})
