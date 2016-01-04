'use strict'

const test = require('ava')

const fillDefaultOptions = require('../../lib/fillDefaultOptions')

const defaultOptions = {
  caseSensitive: false,
  matchPath: '',
  returnType: 'closest-first-match',
  threshold: 0.4
}

test('without arguments', (t) => {
  t.same(fillDefaultOptions(), defaultOptions)
})
