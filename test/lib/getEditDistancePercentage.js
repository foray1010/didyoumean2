'use strict'

const test = require('ava')

const getEditDistancePercentage = require('../../lib/getEditDistancePercentage')

test('basic', (t) => {
  t.same(getEditDistancePercentage('abcde', 'fghij'), 0)
  t.same(getEditDistancePercentage('identical', 'identical'), 1)
  t.same(getEditDistancePercentage('test empty string', ''), 0)
  t.same(getEditDistancePercentage('holy', 'poly'), 3 / 4)
  t.same(getEditDistancePercentage('children', 'child'), 5 / 8)
})

test('case sensitive', (t) => {
  t.same(getEditDistancePercentage('abcde', 'ABCDE'), 0)
  t.same(getEditDistancePercentage('case sensitive', 'Case Sensitive'), 12 / 14)
})
