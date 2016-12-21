'use strict'

const rootPath = require('pkg-dir').sync(__dirname)
const test = require('ava')

const matchItemProcessor = require(`${rootPath}/src/lib/matchItemProcessor`)

test('caseSensitive', (t) => {
  t.is(matchItemProcessor('AbC', {
    caseSensitive: false
  }), 'abc')

  t.is(matchItemProcessor('AbC', {
    caseSensitive: true
  }), 'AbC')
})

test('matchPath', (t) => {
  t.is(matchItemProcessor({
    a: {
      b: 'AbC'
    }
  }, {
    caseSensitive: false,
    matchPath: 'a.b'
  }), 'abc')

  t.is(matchItemProcessor({
    a: {
      b: 'AbC'
    }
  }, {
    caseSensitive: true,
    matchPath: 'a.b'
  }), 'AbC')
})
