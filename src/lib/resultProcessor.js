'use strict'

const returnTypeEnums = require('../enums/returnTypeEnums')

const ALL_CLOSEST_MATCHES = returnTypeEnums.ALL_CLOSEST_MATCHES
const ALL_MATCHES = returnTypeEnums.ALL_MATCHES
const ALL_SORTED_MATCHES = returnTypeEnums.ALL_SORTED_MATCHES
const FIRST_CLOSEST_MATCH = returnTypeEnums.FIRST_CLOSEST_MATCH
const FIRST_MATCH = returnTypeEnums.FIRST_MATCH

/**
 * Generate result
 * @param {Object[]|string[]} matchList - List for matching with `input`
 * @param {number[]} matchedIndexes - indexes of matchList that need to be returned as result
 * @param {string} returnType
 * @returns {Array|null|Object|string} - matched result(s), return object if `match` is `{Object[]}`
 */
function resultProcessor(matchList, matchedIndexes, returnType) {
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

module.exports = resultProcessor
