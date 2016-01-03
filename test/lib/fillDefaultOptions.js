'use strict'

const test = require('ava')

const fillDefaultOptions = require('../../lib/fillDefaultOptions')

const defaultOptions = {
  caseSensitive: false,
  matchPath: '',
  returnType: 'closest-first-match',
  threshold: 0.4
}

test('test without arguments', (t) => {
  t.same(fillDefaultOptions(), defaultOptions)
})

test('test empty options', (t) => {
  t.same(fillDefaultOptions({}), defaultOptions)
})

test('test options schema', (t) => {
  t.throws(() => {
    fillDefaultOptions({
      caseSensitive: {}
    })
  }, TypeError)

  t.throws(() => {
    fillDefaultOptions({
      matchPath: {}
    })
  }, TypeError)

  t.throws(() => {
    fillDefaultOptions({
      returnType: {}
    })
  }, TypeError)

  t.throws(() => {
    fillDefaultOptions({
      returnType: 'wrong enum'
    })
  }, RangeError)

  t.throws(() => {
    fillDefaultOptions({
      caseSensitive: {}
    })
  }, TypeError)
})
