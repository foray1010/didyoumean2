'use strict'

const Immutable = require('seamless-immutable')
const set = require('lodash.set')
const test = require('ava')

const didYouMean = require('..')
const returnTypeEnums = require('../enums/returnTypeEnums')
const thresholdTypeEnums = require('../enums/thresholdTypeEnums')

const ALL_CLOSEST_MATCHES = returnTypeEnums.ALL_CLOSEST_MATCHES
const ALL_MATCHES = returnTypeEnums.ALL_MATCHES
const FIRST_CLOSEST_MATCH = returnTypeEnums.FIRST_CLOSEST_MATCH
const FIRST_MATCH = returnTypeEnums.FIRST_MATCH
const RANDOM_CLOSEST_MATCH = returnTypeEnums.RANDOM_CLOSEST_MATCH

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
  // test all-closest-matches
  const allClosestMatchesResult = matchList.slice(3, matchList.length)

  t.same(didYouMean(input, matchList, {
    returnType: ALL_CLOSEST_MATCHES
  }), allClosestMatchesResult)


  // test all-matches
  const allMatchesResult = matchList.slice(1)

  t.same(didYouMean(input, matchList, {
    returnType: ALL_MATCHES
  }), allMatchesResult)


  // test first-closest-match
  t.same(didYouMean(input, matchList, {
    returnType: FIRST_CLOSEST_MATCH
  }), matchList[3])


  // test first-match
  t.same(didYouMean(input, matchList, {
    returnType: FIRST_MATCH
  }), matchList[1])


  // test random-closest-match
  const matchListWithSingleClosestValue = matchList.concat(input)

  t.same(didYouMean(input, matchListWithSingleClosestValue, {
    returnType: RANDOM_CLOSEST_MATCH,
    threshold: 1
  }), matchListWithSingleClosestValue[matchListWithSingleClosestValue.length - 1])
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
    returnType: FIRST_CLOSEST_MATCH,
    threshold: 4,
    thresholdType: EDIT_DISTANCE
  }), matchList[3])

  t.same(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 4,
    thresholdType: EDIT_DISTANCE
  }), matchList[3])

  t.same(didYouMean(input, matchList, {
    returnType: ALL_MATCHES,
    threshold: 3,
    thresholdType: EDIT_DISTANCE
  }), [])

  t.same(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 3,
    thresholdType: EDIT_DISTANCE
  }), null)
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
    returnType: FIRST_CLOSEST_MATCH,
    threshold: 0.6,
    thresholdType: PERCENTAGE
  }), matchList[3])

  t.same(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 0.6,
    thresholdType: PERCENTAGE
  }), matchList[3])

  t.same(didYouMean(input, matchList, {
    returnType: ALL_MATCHES,
    threshold: 0.7,
    thresholdType: PERCENTAGE
  }), [])

  t.same(didYouMean(input, matchList, {
    returnType: FIRST_MATCH,
    threshold: 0.7,
    thresholdType: PERCENTAGE
  }), null)
})
