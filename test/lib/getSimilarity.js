'use strict'

const rootPath = require('pkg-dir').sync(__dirname)

const getSimilarity = require(`${rootPath}/src/lib/getSimilarity`)

test('same case', () => {
  expect(getSimilarity('abcde', 'fghij')).toBe(0)
  expect(getSimilarity('holy', 'poly')).toBe(3 / 4)
  expect(getSimilarity('children', 'child')).toBe(5 / 8)
})

test('case sensitive', () => {
  expect(getSimilarity('abcde', 'ABCDE')).toBe(0)
  expect(getSimilarity('case sensitive', 'Case Sensitive')).toBe(12 / 14)
})

test('skip condition', () => {
  expect(getSimilarity('abcde', '')).toBe(0)
  expect(getSimilarity('', 'fghij')).toBe(0)
  expect(getSimilarity('identical', 'identical')).toBe(1)
})
