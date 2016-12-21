'use strict'

const Immutable = require('seamless-immutable').static
const rootPath = require('pkg-dir').sync(__dirname)
const test = require('ava')

const resultProcessor = require(`${rootPath}/src/lib/resultProcessor`)
const returnTypeEnums = require(`${rootPath}/src/enums/returnTypeEnums`)

const ALL_CLOSEST_MATCHES = returnTypeEnums.ALL_CLOSEST_MATCHES
const ALL_MATCHES = returnTypeEnums.ALL_MATCHES
const ALL_SORTED_MATCHES = returnTypeEnums.ALL_SORTED_MATCHES
const FIRST_CLOSEST_MATCH = returnTypeEnums.FIRST_CLOSEST_MATCH
const FIRST_MATCH = returnTypeEnums.FIRST_MATCH
const RANDOM_CLOSEST_MATCH = returnTypeEnums.RANDOM_CLOSEST_MATCH

const matchList = Immutable([
  'abc*******',
  'abcd******',
  'abcde*****',
  'ABCDEF****',
  'abcde*g***',
  'abcdef****'
])

test('ALL_CLOSEST_MATCHES, ALL_MATCHES and ALL_SORTED_MATCHES', (t) => {
  for (const ENUM of [ALL_CLOSEST_MATCHES, ALL_MATCHES, ALL_SORTED_MATCHES]) {
    t.deepEqual(
      resultProcessor(
        matchList,
        [
          3,
          4,
          5
        ],
        ENUM
      ),
      [
        'ABCDEF****',
        'abcde*g***',
        'abcdef****'
      ]
    )

    t.deepEqual(
      resultProcessor(
        matchList,
        [],
        ENUM
      ),
      []
    )
  }
})

test('FIRST_CLOSEST_MATCH and FIRST_MATCH', (t) => {
  for (const ENUM of [FIRST_CLOSEST_MATCH, FIRST_MATCH]) {
    t.deepEqual(
      resultProcessor(
        matchList,
        [
          3,
          4,
          5
        ],
        ENUM
      ),
      'ABCDEF****'
    )

    t.deepEqual(
      resultProcessor(
        matchList,
        [],
        ENUM
      ),
      null
    )
  }
})

test('RANDOM_CLOSEST_MATCH', (t) => {
  t.deepEqual(
    resultProcessor(
      matchList,
      [
        3
      ],
      RANDOM_CLOSEST_MATCH
    ),
    'ABCDEF****'
  )

  t.deepEqual(
    resultProcessor(
      matchList,
      [],
      RANDOM_CLOSEST_MATCH
    ),
    null
  )
})

test('Wrong Enum', (t) => {
  const wrongEnum = ''

  t.deepEqual(
    resultProcessor(
      matchList,
      [
        3,
        4,
        5
      ],
      wrongEnum
    ),
    null
  )

  t.deepEqual(
    resultProcessor(
      matchList,
      [],
      wrongEnum
    ),
    null
  )
})
