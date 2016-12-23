'use strict'

const _sample = require('lodash/sample')

const returnTypeEnums = require('../enums/returnTypeEnums')

const ALL_CLOSEST_MATCHES = returnTypeEnums.ALL_CLOSEST_MATCHES
const ALL_MATCHES = returnTypeEnums.ALL_MATCHES
const ALL_SORTED_MATCHES = returnTypeEnums.ALL_SORTED_MATCHES
const FIRST_CLOSEST_MATCH = returnTypeEnums.FIRST_CLOSEST_MATCH
const FIRST_MATCH = returnTypeEnums.FIRST_MATCH
const RANDOM_CLOSEST_MATCH = returnTypeEnums.RANDOM_CLOSEST_MATCH

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

    case RANDOM_CLOSEST_MATCH:
      if (!matchedIndexes.length) return null

      return matchList[_sample(matchedIndexes)]

    /* istanbul ignore next */ // handled by simpleSchema
    default:
      return null
  }
}

module.exports = resultProcessor
