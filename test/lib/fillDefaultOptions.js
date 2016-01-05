'use strict'

const test = require('ava')

const fillDefaultOptions = require('../../lib/fillDefaultOptions')
const returnTypeEnums = require('../../enums/returnTypeEnums')
const thresholdTypeEnums = require('../../enums/thresholdTypeEnums')

const defaultOptions = {
  caseSensitive: false,
  matchPath: '',
  returnType: returnTypeEnums.FIRST_CLOSEST_MATCH,
  threshold: 0.4,
  thresholdType: thresholdTypeEnums.SIMILARITY
}

test('without arguments', (t) => {
  t.same(fillDefaultOptions(), defaultOptions)
})
