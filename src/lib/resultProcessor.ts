import {ReturnTypeEnums} from '../enums/ReturnTypeEnums'

/**
 * Generate result
 * @param {Object[]|string[]} matchList - List for matching with `input`
 * @param {number[]} matchedIndexes - indexes of matchList that need to be returned as result
 * @param {string} returnType
 * @returns {Array|null|Object|string} - matched result(s), return object if `match` is `{Object[]}`
 */
const resultProcessor = <T>(
  matchList: Array<T>,
  matchedIndexes: Array<number>,
  returnType: ReturnTypeEnums
): Array<T> | T | null => {
  switch (returnType) {
    case ReturnTypeEnums.ALL_CLOSEST_MATCHES:
    case ReturnTypeEnums.ALL_MATCHES:
    case ReturnTypeEnums.ALL_SORTED_MATCHES:
      return matchedIndexes.map((matchedIndex) => matchList[matchedIndex])

    case ReturnTypeEnums.FIRST_CLOSEST_MATCH:
    case ReturnTypeEnums.FIRST_MATCH:
      if (!matchedIndexes.length) return null
      return matchList[matchedIndexes[0]]

    /* istanbul ignore next */ default:
      return null
  }
}

export default resultProcessor
