import * as R from 'ramda'

import { ReturnTypeEnums } from './enums/ReturnTypeEnums'
import { ThresholdTypeEnums } from './enums/ThresholdTypeEnums'
import didYouMean from './index'

const input = 'abcdefghij'
const matchList = [
  'abc*******',
  'abcd******',
  'abcde*****',
  'ABCDEF****',
  'abcde*g***',
  'abcdef****',
]

test('without options', () => {
  expect(didYouMean(input, matchList)).toBe(matchList[3])
})

test('caseSensitive', () => {
  expect(
    didYouMean(input, matchList, {
      caseSensitive: true,
    }),
  ).toBe(matchList[4])

  expect(
    didYouMean(input, matchList, {
      caseSensitive: false,
    }),
  ).toBe(matchList[3])
})

test('matchPath', () => {
  const matchPath = ['obj', 'array', 0, 'obj2']

  const matchObjList = matchList.map(value => R.assocPath(matchPath, value, {}))

  expect(
    didYouMean(input, matchObjList, {
      matchPath,
    }),
  ).toEqual(matchObjList[3])
})

test('returnType', () => {
  // test all-closest-matches
  const allClosestMatchesResult = matchList.slice(3, matchList.length)

  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.ALL_CLOSEST_MATCHES,
    }),
  ).toEqual(allClosestMatchesResult)

  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.ALL_CLOSEST_MATCHES,
      threshold: 0.7,
    }),
  ).toEqual([])

  // test all-matches
  const allMatchesResult = matchList.slice(1)

  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.ALL_MATCHES,
    }),
  ).toEqual(allMatchesResult)

  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.ALL_MATCHES,
      threshold: 0.7,
    }),
  ).toEqual([])

  // test all-sorted-matches
  {
    const allSortedMatchesResult = [
      'ABCDEF****',
      'abcde*g***',
      'abcdef****',
      'abcde*****',
      'abcd******',
    ]

    expect(
      didYouMean(input, matchList, {
        returnType: ReturnTypeEnums.ALL_SORTED_MATCHES,
      }),
    ).toEqual(allSortedMatchesResult)
  }

  {
    const allSortedMatchesResult = [
      'ABCDEF****',
      'abcde*g***',
      'abcdef****',
      'abcde*****',
      'abcd******',
      'abc*******',
    ]

    expect(
      didYouMean(input, matchList, {
        returnType: ReturnTypeEnums.ALL_SORTED_MATCHES,
        thresholdType: ThresholdTypeEnums.EDIT_DISTANCE,
      }),
    ).toEqual(allSortedMatchesResult)
  }

  // test first-closest-match
  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.FIRST_CLOSEST_MATCH,
    }),
  ).toBe(matchList[3])

  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.FIRST_CLOSEST_MATCH,
      threshold: 0.7,
    }),
  ).toBe(null)

  // test first-match
  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.FIRST_MATCH,
    }),
  ).toBe(matchList[1])
})

test(`threshold: "${ThresholdTypeEnums.EDIT_DISTANCE}"`, () => {
  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.FIRST_MATCH,
      threshold: 7,
      thresholdType: ThresholdTypeEnums.EDIT_DISTANCE,
    }),
  ).toBe(matchList[0])

  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.FIRST_MATCH,
      threshold: 6,
      thresholdType: ThresholdTypeEnums.EDIT_DISTANCE,
    }),
  ).toBe(matchList[1])

  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.FIRST_MATCH,
      threshold: 5,
      thresholdType: ThresholdTypeEnums.EDIT_DISTANCE,
    }),
  ).toBe(matchList[2])

  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.FIRST_CLOSEST_MATCH,
      threshold: 4,
      thresholdType: ThresholdTypeEnums.EDIT_DISTANCE,
    }),
  ).toBe(matchList[3])

  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.FIRST_MATCH,
      threshold: 4,
      thresholdType: ThresholdTypeEnums.EDIT_DISTANCE,
    }),
  ).toBe(matchList[3])

  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.FIRST_MATCH,
      threshold: 3,
      thresholdType: ThresholdTypeEnums.EDIT_DISTANCE,
    }),
  ).toBe(null)
})

test(`threshold: "${ThresholdTypeEnums.SIMILARITY}"`, () => {
  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.FIRST_MATCH,
      threshold: 0.3,
      thresholdType: ThresholdTypeEnums.SIMILARITY,
    }),
  ).toBe(matchList[0])

  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.FIRST_MATCH,
      threshold: 0.4,
      thresholdType: ThresholdTypeEnums.SIMILARITY,
    }),
  ).toBe(matchList[1])

  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.FIRST_MATCH,
      threshold: 0.5,
      thresholdType: ThresholdTypeEnums.SIMILARITY,
    }),
  ).toBe(matchList[2])

  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.FIRST_CLOSEST_MATCH,
      threshold: 0.6,
      thresholdType: ThresholdTypeEnums.SIMILARITY,
    }),
  ).toBe(matchList[3])

  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.FIRST_MATCH,
      threshold: 0.6,
      thresholdType: ThresholdTypeEnums.SIMILARITY,
    }),
  ).toBe(matchList[3])

  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.FIRST_MATCH,
      threshold: 0.7,
      thresholdType: ThresholdTypeEnums.SIMILARITY,
    }),
  ).toBe(null)
})
