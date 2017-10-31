'use strict'

const Immutable = require('seamless-immutable').static
const rootPath = require('pkg-dir').sync(__dirname)

const runOptionsSchema = require(`${rootPath}/src/lib/runOptionsSchema`)
const returnTypeEnums = require(`${rootPath}/src/enums/returnTypeEnums`)
const thresholdTypeEnums = require(`${rootPath}/src/enums/thresholdTypeEnums`)

const FIRST_CLOSEST_MATCH = returnTypeEnums.FIRST_CLOSEST_MATCH

const EDIT_DISTANCE = thresholdTypeEnums.EDIT_DISTANCE
const SIMILARITY = thresholdTypeEnums.SIMILARITY

const defaultOptions = Immutable({
  caseSensitive: false,
  deburr: false,
  matchPath: [],
  returnType: FIRST_CLOSEST_MATCH,
  threshold: 0.4,
  thresholdType: SIMILARITY,
  trimSpaces: true
})

const defaultOptionsForEditDistance = Immutable({
  caseSensitive: false,
  deburr: false,
  matchPath: [],
  returnType: FIRST_CLOSEST_MATCH,
  threshold: 20,
  thresholdType: EDIT_DISTANCE,
  trimSpaces: true
})

test('without arguments', () => {
  expect(runOptionsSchema()).toEqual(defaultOptions)
})

test(`thresholdType: "${EDIT_DISTANCE}"`, () => {
  expect(
    runOptionsSchema({
      thresholdType: EDIT_DISTANCE
    })
  ).toEqual(defaultOptionsForEditDistance)
})
