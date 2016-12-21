'use strict'

const Immutable = require('seamless-immutable').static
const rootPath = require('pkg-dir').sync(__dirname)
const set = require('lodash/set')
const test = require('ava')

const didYouMean = require(rootPath)
const returnTypeEnums = require(`${rootPath}/src/enums/returnTypeEnums`)
const thresholdTypeEnums = require(`${rootPath}/src/enums/thresholdTypeEnums`)

const ALL_CLOSEST_MATCHES = returnTypeEnums.ALL_CLOSEST_MATCHES
const ALL_MATCHES = returnTypeEnums.ALL_MATCHES
const ALL_SORTED_MATCHES = returnTypeEnums.ALL_SORTED_MATCHES
const FIRST_CLOSEST_MATCH = returnTypeEnums.FIRST_CLOSEST_MATCH
const FIRST_MATCH = returnTypeEnums.FIRST_MATCH
const RANDOM_CLOSEST_MATCH = returnTypeEnums.RANDOM_CLOSEST_MATCH

const EDIT_DISTANCE = thresholdTypeEnums.EDIT_DISTANCE
const SIMILARITY = thresholdTypeEnums.SIMILARITY

const input = 'abcdefghij'
const matchList = Immutable([
  'abc*******',
  'abcd******',
  'abcde*****',
  'ABCDEF****',
  'abcde*g***',
  'abcdef****'
])

test('without options', (t) => {
  t.is(didYouMean(input, matchList), matchList[3])
})

test('caseSensitive', (t) => {
  t.is(didYouMean(input, matchList, {
    caseSensitive: true
  }), matchList[4])

  t.is(didYouMean(input, matchList, {
    caseSensitive: false
  }), matchList[3])
})

test('matchPath', (t) => {
  const matchPath = 'obj.array.0.obj2'

  const matchObjList = matchList.map((value) => set({}, matchPath, value))

  t.deepEqual(didYouMean(input, matchObjList, {
    matchPath: matchPath
  }), matchObjList[3])
})

test('returnType', (t) => {
  // test all-closest-matches
  const allClosestMatchesResult = matchList.slice(3, matchList.length)

  t.deepEqual(didYouMean(input, matchList, {
    returnType: ALL_CLOSEST_MATCHES
  }), allClosestMatchesResult)

  t.deepEqual(didYouMean(input, matchList, {
    returnType: ALL_CLOSEST_MATCHES,
    threshold: 0.7
  }), [])


  // test all-matches
  const allMatchesResult = matchList.slice(1)

  t.deepEqual(didYouMean(input, matchList, {
    returnType: ALL_MATCHES
  }), allMatchesResult)

  t.deepEqual(didYouMean(input, matchList, {
    returnType: ALL_MATCHES,
    threshold: 0.7
  }), [])


  // test all-sorted-matches
  {
    const allSortedMatchesResult = [
      'ABCDEF****',
      'abcde*g***',
      'abcdef****',
      'abcde*****',
      'abcd******'
    ]

    t.deepEqual(didYouMean(input, matchList, {
      returnType: ALL_SORTED_MATCHES
    }), allSortedMatchesResult)
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

    t.deepEqual(didYouMean(input, matchList, {
      returnType: ALL_SORTED_MATCHES,
      thresholdType: EDIT_DISTANCE
    }), allSortedMatchesResult)
  }


  // test first-closest-match
  t.is(didYouMean(input, matchList, {
    returnType: FIRST_CLOSEST_MATCH
  }), matchList[3])

  t.is(didYouMean(input, matchList, {
    returnType: FIRST_CLOSEST_MATCH,
    threshold: 0.7
  }), null)


  // test first-match
  t.is(didYouMean(input, matchList, {
    returnType: FIRST_MATCH
  }), matchList[1])


  // test random-closest-match
  const matchListWithSingleClosestValue = matchList.concat(input)

  t.is(didYouMean(input, matchListWithSingleClosestValue, {
    returnType: RANDOM_CLOSEST_MATCH,
    threshold: 1
  }), matchListWithSingleClosestValue[matchListWithSingleClosestValue.length - 1])
})

test(`threshold: "${EDIT_DISTANCE}"`, (t) => {
  t.is(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 7,
    thresholdType: EDIT_DISTANCE
  }), matchList[0])

  t.is(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 6,
    thresholdType: EDIT_DISTANCE
  }), matchList[1])

  t.is(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 5,
    thresholdType: EDIT_DISTANCE
  }), matchList[2])

  t.is(didYouMean(input, matchList, {
    returnType: FIRST_CLOSEST_MATCH,
    threshold: 4,
    thresholdType: EDIT_DISTANCE
  }), matchList[3])

  t.is(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 4,
    thresholdType: EDIT_DISTANCE
  }), matchList[3])

  t.is(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 3,
    thresholdType: EDIT_DISTANCE
  }), null)
})

test(`threshold: "${SIMILARITY}"`, (t) => {
  t.is(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 0.3,
    thresholdType: SIMILARITY
  }), matchList[0])

  t.is(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 0.4,
    thresholdType: SIMILARITY
  }), matchList[1])

  t.is(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 0.5,
    thresholdType: SIMILARITY
  }), matchList[2])

  t.is(didYouMean(input, matchList, {
    returnType: FIRST_CLOSEST_MATCH,
    threshold: 0.6,
    thresholdType: SIMILARITY
  }), matchList[3])

  t.is(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 0.6,
    thresholdType: SIMILARITY
  }), matchList[3])

  t.is(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 0.7,
    thresholdType: SIMILARITY
  }), null)
})
