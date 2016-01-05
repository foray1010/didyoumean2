'use strict'

const Immutable = require('seamless-immutable')
const set = require('lodash.set')
const test = require('ava')

const didYouMean = require('..')
const returnTypeEnums = require('../enums/returnTypeEnums')
const thresholdTypeEnums = require('../enums/thresholdTypeEnums')

const ALL_MATCHES = returnTypeEnums.ALL_MATCHES
const CLOSEST_FIRST_MATCH = returnTypeEnums.CLOSEST_FIRST_MATCH
const CLOSEST_RANDOM_MATCH = returnTypeEnums.CLOSEST_RANDOM_MATCH
const FIRST_MATCH = returnTypeEnums.FIRST_MATCH

const EDIT_DISTANCE = thresholdTypeEnums.EDIT_DISTANCE
const PERCENTAGE = thresholdTypeEnums.PERCENTAGE

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
  t.same(didYouMean(input, matchList), matchList[3])
})

test('caseSensitive', (t) => {
  t.same(didYouMean(input, matchList, {
    caseSensitive: true
  }), matchList[4])

  t.same(didYouMean(input, matchList, {
    caseSensitive: false
  }), matchList[3])
})

test('matchPath', (t) => {
  const matchPath = 'obj.array.0.obj2'

  const matchObjList = matchList.map((value) => set({}, matchPath, value))

  t.same(didYouMean(input, matchObjList, {
    matchPath: matchPath
  }), matchObjList[3])
})

test('returnType', (t) => {
  // test all-matches
  let allMatchesResult = matchList.asMutable()
  allMatchesResult.splice(0, 1)
  allMatchesResult = Immutable(allMatchesResult)

  t.same(didYouMean(input, matchList, {
    returnType: ALL_MATCHES
  }), allMatchesResult)


  // test closest-first-match
  t.same(didYouMean(input, matchList, {
    returnType: CLOSEST_FIRST_MATCH
  }), matchList[3])


  // test closest-random-match
  let matchListWithSingleClosestValue = matchList.asMutable()
  matchListWithSingleClosestValue.push(input)
  matchListWithSingleClosestValue = Immutable(matchListWithSingleClosestValue)

  t.same(didYouMean(input, matchListWithSingleClosestValue, {
    returnType: CLOSEST_RANDOM_MATCH,
    threshold: 1
  }), matchListWithSingleClosestValue[matchListWithSingleClosestValue.length - 1])


  // test first-match
  t.same(didYouMean(input, matchList, {
    returnType: FIRST_MATCH
  }), matchList[1])
})

test('threshold: "edit-distance"', (t) => {
  t.same(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 7,
    thresholdType: EDIT_DISTANCE
  }), matchList[0])

  t.same(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 6,
    thresholdType: EDIT_DISTANCE
  }), matchList[1])

  t.same(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 5,
    thresholdType: EDIT_DISTANCE
  }), matchList[2])

  t.same(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 4,
    thresholdType: EDIT_DISTANCE
  }), matchList[3])

  t.same(didYouMean(input, matchList, {
    returnType: CLOSEST_FIRST_MATCH,
    threshold: 4,
    thresholdType: EDIT_DISTANCE
  }), matchList[3])

  t.same(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 3,
    thresholdType: EDIT_DISTANCE
  }), null)

  t.same(didYouMean(input, matchList, {
    returnType: ALL_MATCHES,
    threshold: 3,
    thresholdType: EDIT_DISTANCE
  }), [])
})

test('threshold: "percentage"', (t) => {
  t.same(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 0.3,
    thresholdType: PERCENTAGE
  }), matchList[0])

  t.same(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 0.4,
    thresholdType: PERCENTAGE
  }), matchList[1])

  t.same(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 0.5,
    thresholdType: PERCENTAGE
  }), matchList[2])

  t.same(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 0.6,
    thresholdType: PERCENTAGE
  }), matchList[3])

  t.same(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 0.7,
    thresholdType: PERCENTAGE
  }), null)

  t.same(didYouMean(input, matchList, {
    returnType: ALL_MATCHES,
    threshold: 0.7,
    thresholdType: PERCENTAGE
  }), [])
})
