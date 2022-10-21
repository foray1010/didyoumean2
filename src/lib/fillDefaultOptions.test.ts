import { ReturnTypeEnums } from '../enums/ReturnTypeEnums.js'
import { ThresholdTypeEnums } from '../enums/ThresholdTypeEnums.js'
import { unknownThresholdTypeError } from '../errors.js'
import fillDefaultOptions from './fillDefaultOptions.js'

const defaultOptions = {
  caseSensitive: false,
  deburr: true,
  matchPath: [],
  returnType: ReturnTypeEnums.FIRST_CLOSEST_MATCH,
  threshold: 0.4,
  thresholdType: ThresholdTypeEnums.SIMILARITY,
  trimSpaces: true,
}

const defaultOptionsForEditDistance = {
  caseSensitive: false,
  deburr: true,
  matchPath: [],
  returnType: ReturnTypeEnums.FIRST_CLOSEST_MATCH,
  threshold: 20,
  thresholdType: ThresholdTypeEnums.EDIT_DISTANCE,
  trimSpaces: true,
}

test('without arguments', () => {
  expect(fillDefaultOptions()).toEqual(defaultOptions)
})

test(`thresholdType: "${ThresholdTypeEnums.EDIT_DISTANCE}"`, () => {
  expect(
    fillDefaultOptions({
      thresholdType: ThresholdTypeEnums.EDIT_DISTANCE,
    }),
  ).toEqual(defaultOptionsForEditDistance)
})

test('unknown thresholdType', () => {
  expect(() =>
    fillDefaultOptions({
      // @ts-expect-error: test incorrect thresholdType
      thresholdType: 'unknown',
    }),
  ).toThrow(unknownThresholdTypeError)
})
