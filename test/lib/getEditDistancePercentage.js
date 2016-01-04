'use strict'

const Immutable = require('seamless-immutable')
const test = require('ava')

const getEditDistancePercentage = require('../../lib/getEditDistancePercentage')

test('basic', (t) => {
  const options = Immutable({})

  t.same(getEditDistancePercentage('abcde', 'fghij', options), 0)
  t.same(getEditDistancePercentage('identical', 'identical', options), 1)
  t.same(getEditDistancePercentage('test empty string', '', options), 0)
  t.same(getEditDistancePercentage('holy', 'poly', options), 3 / 4)
  t.same(getEditDistancePercentage('children', 'child', options), 5 / 8)
})

test('case sensitive', (t) => {
  const options = Immutable({
    caseSensitive: true
  })

  t.same(getEditDistancePercentage('abcde', 'ABCDE', options), 0)
  t.same(getEditDistancePercentage('case sensitive', 'Case Sensitive', options), 12 / 14)
})

test('case insensitive', (t) => {
  const options = Immutable({
    caseSensitive: false
  })

  t.same(getEditDistancePercentage('abcde', 'ABCDE', options), 1)
  t.same(getEditDistancePercentage('case insensitive', 'Case Insensitive', options), 1)
})
