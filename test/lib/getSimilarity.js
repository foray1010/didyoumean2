'use strict'

const rootPath = require('pkg-dir').sync(__dirname)
const test = require('ava')

const getSimilarity = require(`${rootPath}/src/lib/getSimilarity`)

test('same case', (t) => {
  t.is(getSimilarity('abcde', 'fghij'), 0)
  t.is(getSimilarity('holy', 'poly'), 3 / 4)
  t.is(getSimilarity('children', 'child'), 5 / 8)
})

test('case sensitive', (t) => {
  t.is(getSimilarity('abcde', 'ABCDE'), 0)
  t.is(getSimilarity('case sensitive', 'Case Sensitive'), 12 / 14)
})

test('skip condition', (t) => {
  t.is(getSimilarity('abcde', ''), 0)
  t.is(getSimilarity('', 'fghij'), 0)
  t.is(getSimilarity('identical', 'identical'), 1)
})
