import { ReturnTypeEnums } from '../enums/ReturnTypeEnums.js'
import { ThresholdTypeEnums } from '../enums/ThresholdTypeEnums.js'
import { unknownThresholdTypeError } from '../errors.js'
import type { Options } from '../types.js'

const fillDefaultOptions = (options?: Partial<Options>): Options => {
  const optionsWithDefaultValues = {
    caseSensitive: false,
    deburr: true,
    matchPath: [],
    returnType: ReturnTypeEnums.FIRST_CLOSEST_MATCH,
    thresholdType: ThresholdTypeEnums.SIMILARITY,
    trimSpaces: true,
    ...options,
  }

  switch (optionsWithDefaultValues.thresholdType) {
    case ThresholdTypeEnums.EDIT_DISTANCE:
      return {
        threshold: 20,
        ...optionsWithDefaultValues,
      }

    case ThresholdTypeEnums.SIMILARITY:
      return {
        threshold: 0.4,
        ...optionsWithDefaultValues,
      }

    default:
      throw unknownThresholdTypeError
  }
}
export default fillDefaultOptions
