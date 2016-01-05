'use strict'

const Immutable = require('seamless-immutable')
const test = require('ava')

const fillDefaultOptions = require('../../lib/fillDefaultOptions')
const returnTypeEnums = require('../../enums/returnTypeEnums')
const thresholdTypeEnums = require('../../enums/thresholdTypeEnums')

const FIRST_CLOSEST_MATCH = returnTypeEnums.FIRST_CLOSEST_MATCH

const EDIT_DISTANCE = thresholdTypeEnums.EDIT_DISTANCE
const SIMILARITY = thresholdTypeEnums.SIMILARITY

const defaultOptions = Immutable({
  caseSensitive: false,
  matchPath: '',
  returnType: FIRST_CLOSEST_MATCH,
  threshold: 0.4,
  thresholdType: SIMILARITY
})

const defaultOptionsForEditDistance = Immutable({
  caseSensitive: false,
  matchPath: '',
  returnType: FIRST_CLOSEST_MATCH,
  threshold: 20,
  thresholdType: EDIT_DISTANCE
})

test('without arguments', (t) => {
  t.same(fillDefaultOptions(), defaultOptions)
})

test(`thresholdType: "${EDIT_DISTANCE}"`, (t) => {
  t.same(fillDefaultOptions({
    thresholdType: EDIT_DISTANCE
  }), defaultOptionsForEditDistance)
})
