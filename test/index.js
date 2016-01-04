'use strict'

const Immutable = require('seamless-immutable')
const set = require('lodash.set')
const test = require('ava')

const didYouMean = require('..')
const returnTypeEnums = require('../enums/returnTypeEnums')

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

test('matchPath', (t) => {
  const matchPath = 'obj.array.0.obj2'

  const matchObjList = matchList.map((value) => set({}, matchPath, value))

  t.same(didYouMean(input, matchObjList, {
    matchPath: matchPath
  }), matchObjList[3])
})

test('returnType', (t) => {
  let allMatchesResult = matchList.asMutable()
  allMatchesResult.splice(0, 1)
  allMatchesResult = Immutable(allMatchesResult)

  t.same(didYouMean(input, matchList, {
    returnType: returnTypeEnums.ALL_MATCHES
  }), allMatchesResult)

  t.same(didYouMean(input, matchList, {
    returnType: returnTypeEnums.CLOSEST_FIRST_MATCH
  }), matchList[5])

  // t.same(didYouMean(input, matchList, {
  //   returnType: returnTypeEnums.CLOSEST_RANDOM_MATCH
  // }), matchList)

  t.same(didYouMean(input, matchList, {
    returnType: returnTypeEnums.FIRST_MATCH
  }), matchList[1])
})

test('threshold', (t) => {
  t.same(didYouMean(input, matchList, {
    threshold: 0.3
  }), matchList[0])

  t.same(didYouMean(input, matchList, {
    threshold: 0.4
  }), matchList[1])

  t.same(didYouMean(input, matchList, {
    threshold: 0.5
  }), matchList[2])

  t.same(didYouMean(input, matchList, {
    threshold: 0.6
  }), matchList[3])

  t.same(didYouMean(input, matchList, {
    threshold: 0.7
  }), null)
})
