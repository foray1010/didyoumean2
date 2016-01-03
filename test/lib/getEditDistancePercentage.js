'use strict'

const Immutable = require('seamless-immutable')
const test = require('ava')

const getEditDistancePercentage = require('../../lib/getEditDistancePercentage')

test('main test', (t) => {
  const options = Immutable({})

  t.same(getEditDistancePercentage(options, 'abcde', 'fghij'), 0)
  t.same(getEditDistancePercentage(options, 'identical', 'identical'), 1)
  t.same(getEditDistancePercentage(options, 'holy', 'poly'), 3 / 4)
  t.same(getEditDistancePercentage(options, 'children', 'child'), 5 / 8)
})

test('test: case sensitive', (t) => {
  const options = Immutable({
    caseSensitive: true
  })

  t.same(getEditDistancePercentage(options, 'abcde', 'ABCDE'), 0)
  t.same(getEditDistancePercentage(options, 'case sensitive', 'Case Sensitive'), 12 / 14)
})

test('test: case insensitive', (t) => {
  const options = Immutable({
    caseSensitive: false
  })

  t.same(getEditDistancePercentage(options, 'abcde', 'ABCDE'), 1)
  t.same(getEditDistancePercentage(options, 'case insensitive', 'Case Insensitive'), 1)
})
