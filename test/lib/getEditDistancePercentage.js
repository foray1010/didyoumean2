'use strict'

const Immutable = require('seamless-immutable')
const test = require('ava')

const getEditDistancePercentage = require('../../lib/getEditDistancePercentage')

test('main test', (t) => {
  const options = Immutable({})

  t.is(getEditDistancePercentage('abcde', 'fghij', options), 0)
  t.is(getEditDistancePercentage('identical', 'identical', options), 1)
  t.is(getEditDistancePercentage('test empty string', '', options), 0)
  t.is(getEditDistancePercentage('holy', 'poly', options), 3 / 4)
  t.is(getEditDistancePercentage('children', 'child', options), 5 / 8)
})

test('test: case sensitive', (t) => {
  const options = Immutable({
    caseSensitive: true
  })

  t.is(getEditDistancePercentage('abcde', 'ABCDE', options), 0)
  t.is(getEditDistancePercentage('case sensitive', 'Case Sensitive', options), 12 / 14)
})

test('test: case insensitive', (t) => {
  const options = Immutable({
    caseSensitive: false
  })

  t.is(getEditDistancePercentage('abcde', 'ABCDE', options), 1)
  t.is(getEditDistancePercentage('case insensitive', 'Case Insensitive', options), 1)
})
