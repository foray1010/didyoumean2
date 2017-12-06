import Immutable from 'seamless-immutable'

import returnTypeEnums from '../enums/returnTypeEnums.json'
import runOptionsSchema from './runOptionsSchema'
import thresholdTypeEnums from '../enums/thresholdTypeEnums.json'

const defaultOptions = Immutable({
  caseSensitive: false,
  deburr: false,
  matchPath: [],
  returnType: returnTypeEnums.FIRST_CLOSEST_MATCH,
  threshold: 0.4,
  thresholdType: thresholdTypeEnums.SIMILARITY,
  trimSpaces: true
})

const defaultOptionsForEditDistance = Immutable({
  caseSensitive: false,
  deburr: false,
  matchPath: [],
  returnType: returnTypeEnums.FIRST_CLOSEST_MATCH,
  threshold: 20,
  thresholdType: thresholdTypeEnums.EDIT_DISTANCE,
  trimSpaces: true
})

test('without arguments', () => {
  expect(runOptionsSchema()).toEqual(defaultOptions)
})

test(`thresholdType: "${thresholdTypeEnums.EDIT_DISTANCE}"`, () => {
  expect(
    runOptionsSchema({
      thresholdType: thresholdTypeEnums.EDIT_DISTANCE
    })
  ).toEqual(defaultOptionsForEditDistance)
})
