'use strict'

const rootPath = require('pkg-dir').sync(__dirname)

const normalizeString = require(`${rootPath}/src/lib/normalizeString`)

test('caseSensitive', () => {
  expect(normalizeString('AbC', {
    caseSensitive: false
  })).toBe('abc')

  expect(normalizeString('AbC', {
    caseSensitive: true
  })).toBe('AbC')
})

test('deburr', () => {
  expect(normalizeString('THÈ QÛÌÇK BRÒWÑ ƑÓX JÚMPŠ ØVËR ÐË LÅŽŸ DÕG', {
    deburr: true,
    caseSensitive: true
  })).toBe('THE QUICK BROWN ƑOX JUMPS OVER DE LAZY DOG')

  expect(normalizeString('THÈ QÛÌÇK BRÒWÑ ƑÓX JÚMPŠ ØVËR ÐË LÅŽŸ DÕG', {
    deburr: true,
    caseSensitive: false
  })).toBe('the quick brown ƒox jumps over de lazy dog')

  expect(normalizeString('THÈ QÛÌÇK BRÒWÑ ƑÓX JÚMPŠ ØVËR ÐË LÅŽŸ DÕG', {
    deburr: false,
    caseSensitive: true
  })).toBe('THÈ QÛÌÇK BRÒWÑ ƑÓX JÚMPŠ ØVËR ÐË LÅŽŸ DÕG')
})

test('trimSpace', () => {
  expect(normalizeString('   abc   def  g ', {
    trimSpace: false
  })).toBe('   abc   def  g ')

  expect(normalizeString('   abc   def  g ', {
    trimSpace: true
  })).toBe('abc def g')
})
