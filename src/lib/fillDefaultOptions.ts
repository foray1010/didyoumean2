import { ReturnTypeEnums } from '../enums/ReturnTypeEnums'
import { ThresholdTypeEnums } from '../enums/ThresholdTypeEnums'
import { unknownThresholdTypeError } from '../errors'
import { InputOptions, Options } from '../types'

const fillDefaultOptions = (options?: InputOptions): Options => {
  const optionsWithDefaultValues = {
    caseSensitive: false,
    deburr: false,
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

    /* istanbul ignore next */
    default:
      throw unknownThresholdTypeError
  }
}
export default fillDefaultOptions
