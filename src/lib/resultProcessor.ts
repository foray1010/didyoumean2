import { ReturnTypeEnums } from '../enums/ReturnTypeEnums.js'

/**
 * Generate result
 *
 * @param {object[] | string[]} matchList - List for matching with `input`
 * @param {number[]} matchedIndexes - indexes of matchList that need to be returned as result
 * @param {ReturnTypeEnums} returnType - how the result will response to user
 * @returns {Array | null | object | string} - matched result(s), return object if `match` is `{Object[]}`
 */
const resultProcessor = <T>(
  matchList: ReadonlyArray<T>,
  matchedIndexes: ReadonlyArray<number>,
  returnType: ReturnTypeEnums,
  // eslint-disable-next-line functional/prefer-immutable-types
): Array<T> | T | null => {
  switch (returnType) {
    case ReturnTypeEnums.ALL_CLOSEST_MATCHES:
    case ReturnTypeEnums.ALL_MATCHES:
    case ReturnTypeEnums.ALL_SORTED_MATCHES:
      return matchedIndexes.map((matchedIndex) => matchList[matchedIndex]!)

    case ReturnTypeEnums.FIRST_CLOSEST_MATCH:
    case ReturnTypeEnums.FIRST_MATCH: {
      const matchedIndex = matchedIndexes[0]
      if (matchedIndex === undefined) return null
      return matchList[matchedIndex]!
    }
  }
}

export default resultProcessor
