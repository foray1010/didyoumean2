'use strict'

const rootPath = require('pkg-dir').sync(__dirname)
const test = require('ava')

const normalizeString = require(`${rootPath}/src/lib/normalizeString`)

test('caseSensitive', (t) => {
  t.is(normalizeString('AbC', {
    caseSensitive: false
  }), 'abc')

  t.is(normalizeString('AbC', {
    caseSensitive: true
  }), 'AbC')
})

test('deburr', (t) => {
  t.is(
    normalizeString('THÈ QÛÌÇK BRÒWÑ ƑÓX JÚMPŠ ØVËR ÐË LÅŽŸ DÕG', {
      deburr: true,
      caseSensitive: true
    }),
    'THE QUICK BROWN ƑOX JUMPS OVER DE LAZY DOG'
  )

  t.is(
    normalizeString('THÈ QÛÌÇK BRÒWÑ ƑÓX JÚMPŠ ØVËR ÐË LÅŽŸ DÕG', {
      deburr: true,
      caseSensitive: false
    }),
    'the quick brown ƒox jumps over de lazy dog'
  )

  t.is(
    normalizeString('THÈ QÛÌÇK BRÒWÑ ƑÓX JÚMPŠ ØVËR ÐË LÅŽŸ DÕG', {
      deburr: false,
      caseSensitive: true
    }),
    'THÈ QÛÌÇK BRÒWÑ ƑÓX JÚMPŠ ØVËR ÐË LÅŽŸ DÕG'
  )
})
