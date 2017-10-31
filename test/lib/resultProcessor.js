'use strict'

const Immutable = require('seamless-immutable').static
const rootPath = require('pkg-dir').sync(__dirname)

const resultProcessor = require(`${rootPath}/src/lib/resultProcessor`)
const returnTypeEnums = require(`${rootPath}/src/enums/returnTypeEnums`)

const ALL_CLOSEST_MATCHES = returnTypeEnums.ALL_CLOSEST_MATCHES
const ALL_MATCHES = returnTypeEnums.ALL_MATCHES
const ALL_SORTED_MATCHES = returnTypeEnums.ALL_SORTED_MATCHES
const FIRST_CLOSEST_MATCH = returnTypeEnums.FIRST_CLOSEST_MATCH
const FIRST_MATCH = returnTypeEnums.FIRST_MATCH

const matchList = Immutable([
  'abc*******',
  'abcd******',
  'abcde*****',
  'ABCDEF****',
  'abcde*g***',
  'abcdef****'
])

test('ALL_CLOSEST_MATCHES, ALL_MATCHES and ALL_SORTED_MATCHES', () => {
  for (const ENUM of [ALL_CLOSEST_MATCHES, ALL_MATCHES, ALL_SORTED_MATCHES]) {
    expect(resultProcessor(matchList, [3, 4, 5], ENUM)).toEqual([
      'ABCDEF****',
      'abcde*g***',
      'abcdef****'
    ])

    expect(resultProcessor(matchList, [], ENUM)).toEqual([])
  }
})

test('FIRST_CLOSEST_MATCH and FIRST_MATCH', () => {
  for (const ENUM of [FIRST_CLOSEST_MATCH, FIRST_MATCH]) {
    expect(resultProcessor(matchList, [3, 4, 5], ENUM)).toEqual('ABCDEF****')

    expect(resultProcessor(matchList, [], ENUM)).toEqual(null)
  }
})

test('Wrong Enum', () => {
  const wrongEnum = ''

  expect(resultProcessor(matchList, [3, 4, 5], wrongEnum)).toEqual(null)

  expect(resultProcessor(matchList, [], wrongEnum)).toEqual(null)
})
