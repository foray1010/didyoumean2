'use strict'

const test = require('ava')

const fillDefaultOptions = require('../../lib/fillDefaultOptions')
const returnTypeEnums = require('../../enums/returnTypeEnums')
const thresholdTypeEnums = require('../../enums/thresholdTypeEnums')

const defaultOptions = {
  caseSensitive: false,
  matchPath: '',
  returnType: returnTypeEnums.CLOSEST_FIRST_MATCH,
  threshold: 0.4,
  thresholdType: thresholdTypeEnums.PERCENTAGE
}

test('without arguments', (t) => {
  t.same(fillDefaultOptions(), defaultOptions)
})
