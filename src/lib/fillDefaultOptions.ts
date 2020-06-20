import { ReturnTypeEnums } from '../enums/ReturnTypeEnums'
import { ThresholdTypeEnums } from '../enums/ThresholdTypeEnums'
import { unknownThresholdTypeError } from '../errors'
import type { Options } from '../types'

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
