import {
  ALL_CLOSEST_MATCHES,
  ALL_MATCHES,
  ALL_SORTED_MATCHES,
  FIRST_CLOSEST_MATCH,
  FIRST_MATCH
} from '../enums/returnTypeEnums.json'

/**
 * Generate result
 * @param {Object[]|string[]} matchList - List for matching with `input`
 * @param {number[]} matchedIndexes - indexes of matchList that need to be returned as result
 * @param {string} returnType
 * @returns {Array|null|Object|string} - matched result(s), return object if `match` is `{Object[]}`
 */
const resultProcessor = (matchList, matchedIndexes, returnType) => {
  switch (returnType) {
    case ALL_CLOSEST_MATCHES:
    case ALL_MATCHES:
    case ALL_SORTED_MATCHES:
      return matchedIndexes.map((matchedIndex) => matchList[matchedIndex])

    case FIRST_CLOSEST_MATCH:
    case FIRST_MATCH:
      if (!matchedIndexes.length) return null

      return matchList[matchedIndexes[0]]

    /* istanbul ignore next */ default:
      // handled by simpleSchema
      return null
  }
}

export default resultProcessor
