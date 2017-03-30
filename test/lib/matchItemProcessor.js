'use strict'

const rootPath = require('pkg-dir').sync(__dirname)

const matchItemProcessor = require(`${rootPath}/src/lib/matchItemProcessor`)

test('matchPath', () => {
  expect(matchItemProcessor({
    a: {
      b: 'AbC'
    }
  }, {
    caseSensitive: false,
    matchPath: 'a.b'
  })).toBe('abc')

  expect(matchItemProcessor({
    a: {
      b: 'AbC'
    }
  }, {
    caseSensitive: true,
    matchPath: 'a.b'
  })).toBe('AbC')
})
