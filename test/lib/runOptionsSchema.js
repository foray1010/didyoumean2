'use strict'

const Immutable = require('seamless-immutable').static
const rootPath = require('pkg-dir').sync(__dirname)
const test = require('ava')

const runOptionsSchema = require(`${rootPath}/src/lib/runOptionsSchema`)
const returnTypeEnums = require(`${rootPath}/src/enums/returnTypeEnums`)
const thresholdTypeEnums = require(`${rootPath}/src/enums/thresholdTypeEnums`)

const FIRST_CLOSEST_MATCH = returnTypeEnums.FIRST_CLOSEST_MATCH

const EDIT_DISTANCE = thresholdTypeEnums.EDIT_DISTANCE
const SIMILARITY = thresholdTypeEnums.SIMILARITY

const defaultOptions = Immutable({
  caseSensitive: false,
  matchPath: '',
  returnType: FIRST_CLOSEST_MATCH,
  threshold: 0.4,
  thresholdType: SIMILARITY
})

const defaultOptionsForEditDistance = Immutable({
  caseSensitive: false,
  matchPath: '',
  returnType: FIRST_CLOSEST_MATCH,
  threshold: 20,
  thresholdType: EDIT_DISTANCE
})

test('without arguments', (t) => {
  t.deepEqual(runOptionsSchema(), defaultOptions)
})

test(`thresholdType: "${EDIT_DISTANCE}"`, (t) => {
  t.deepEqual(runOptionsSchema({
    thresholdType: EDIT_DISTANCE
  }), defaultOptionsForEditDistance)
})
