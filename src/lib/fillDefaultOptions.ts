import { ReturnTypeEnums } from '../enums/ReturnTypeEnums.js'
import { ThresholdTypeEnums } from '../enums/ThresholdTypeEnums.js'
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

  if (
    !Object.values(ReturnTypeEnums).includes(
      optionsWithDefaultValues.returnType,
    )
  ) {
    throw new TypeError('unknown returnType')
  }
  if (
    !Object.values(ThresholdTypeEnums).includes(
      optionsWithDefaultValues.thresholdType,
    )
  ) {
    throw new TypeError('unknown thresholdType')
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
  }
}
export default fillDefaultOptions
