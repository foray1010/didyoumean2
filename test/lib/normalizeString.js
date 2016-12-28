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
