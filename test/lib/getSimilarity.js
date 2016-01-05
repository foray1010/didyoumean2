'use strict'

const test = require('ava')

const getSimilarity = require('../../lib/getSimilarity')

test('basic', (t) => {
  t.same(getSimilarity('abcde', 'fghij'), 0)
  t.same(getSimilarity('holy', 'poly'), 3 / 4)
  t.same(getSimilarity('children', 'child'), 5 / 8)
})

test('case sensitive', (t) => {
  t.same(getSimilarity('abcde', 'ABCDE'), 0)
  t.same(getSimilarity('case sensitive', 'Case Sensitive'), 12 / 14)
})

test('skip condition', (t) => {
  t.same(getSimilarity('abcde', ''), 0)
  t.same(getSimilarity('', 'fghij'), 0)
  t.same(getSimilarity('identical', 'identical'), 1)
})
