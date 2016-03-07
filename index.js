'use strict'

const get = require('lodash.get')
const leven = require('leven')

const getSimilarity = require('./lib/getSimilarity')
const runOptionsSchema = require('./lib/runOptionsSchema')
const returnTypeEnums = require('./enums/returnTypeEnums')
const thresholdTypeEnums = require('./enums/thresholdTypeEnums')

const ALL_CLOSEST_MATCHES = returnTypeEnums.ALL_CLOSEST_MATCHES
const ALL_MATCHES = returnTypeEnums.ALL_MATCHES
const FIRST_CLOSEST_MATCH = returnTypeEnums.FIRST_CLOSEST_MATCH
const FIRST_MATCH = returnTypeEnums.FIRST_MATCH
const RANDOM_CLOSEST_MATCH = returnTypeEnums.RANDOM_CLOSEST_MATCH

const EDIT_DISTANCE = thresholdTypeEnums.EDIT_DISTANCE
const SIMILARITY = thresholdTypeEnums.SIMILARITY

/**
 * Main function for didyoumean2
 * @param {string} input - A string that you are not sure and want to match with `matchList`
 * @param {Object[]|string[]} matchList - A List for matching with `input`
 * @param {null|Object|undefined} options - An options that allows you to modify the behavior
 * @returns {Array|null|Object|string} A list of or single matched result(s), return object if `match` is `{Object[]}`
 */
function didYouMean(input, matchList, options) {
  /*+++++++++++++++++++
   + Initiate options +
   +++++++++++++++++++*/

  options = runOptionsSchema(options)

  const caseSensitive = options.caseSensitive
  const matchPath = options.matchPath
  const returnType = options.returnType
  const threshold = options.threshold
  const thresholdType = options.thresholdType


  /*++++++++++++++++++++
   + Deal with options +
   ++++++++++++++++++++*/

  if (!caseSensitive) {
    input = input.toLowerCase()
  }

  const resultProcessor = (() => {
    const matchItemProcessor = (matchItem) => {
      if (matchPath) {
        matchItem = get(matchItem, matchPath)
      }

      if (!caseSensitive) {
        matchItem = matchItem.toLowerCase()
      }

      return matchItem
    }

    switch (thresholdType) {
      case EDIT_DISTANCE:
        return (matchItem) => leven(input, matchItemProcessor(matchItem))

      case SIMILARITY:
        return (matchItem) => getSimilarity(input, matchItemProcessor(matchItem))

      /* istanbul ignore next */ // handled by simpleSchema
      default:
        return null
    }
  })()

  let checkIfMatched // Validate if result is matched
  switch (thresholdType) {
    case EDIT_DISTANCE:
      checkIfMatched = (result) => result <= threshold
      break

    case SIMILARITY:
      checkIfMatched = (result) => result >= threshold
      break

    /* istanbul ignore next */ // handled by simpleSchema
    default:
  }

  let checkMarginValue // {string} Check for `max` or `min` result value
  switch (returnType) {
    case ALL_CLOSEST_MATCHES:
    case FIRST_CLOSEST_MATCH:
    case RANDOM_CLOSEST_MATCH:
      switch (thresholdType) {
        case EDIT_DISTANCE:
          checkMarginValue = 'min'
          break

        case SIMILARITY:
          checkMarginValue = 'max'
          break

        /* istanbul ignore next */ // handled by simpleSchema
        default:
      }
      break

    default:
  }


  /*+++++++++++
   + Matching +
   +++++++++++*/

  const matchedIndexes = []
  const matchListLen = matchList.length

  if (returnType === FIRST_MATCH) {
    for (let i = 0; i < matchListLen; i += 1) {
      const result = resultProcessor(matchList[i])

      // Return once matched, performance is main target in this returnType
      if (checkIfMatched(result)) {
        return matchList[i]
      }
    }
  } else if (checkMarginValue) {
    const results = []

    let marginValue

    switch (checkMarginValue) {
      case 'max':
        // Process result and save the largest result
        marginValue = 0
        for (let i = 0; i < matchListLen; i += 1) {
          const result = resultProcessor(matchList[i])

          if (marginValue < result) marginValue = result

          results.push(result)
        }
        break

      case 'min':
        // Process result and save the smallest result
        marginValue = Infinity
        for (let i = 0; i < matchListLen; i += 1) {
          const result = resultProcessor(matchList[i])

          if (marginValue > result) marginValue = result

          results.push(result)
        }
        break

      /* istanbul ignore next */ // handled by simpleSchema
      default:
    }

    const resultsLen = results.length

    for (let i = 0; i < resultsLen; i += 1) {
      const result = results[i]

      if (checkIfMatched(result)) {
        // Just save the closest value
        if (result === marginValue) {
          matchedIndexes.push(i)
        }
      }
    }
  } else {
    for (let i = 0; i < matchListLen; i += 1) {
      const result = resultProcessor(matchList[i])

      // save all indexes of matched results
      if (checkIfMatched(result)) {
        matchedIndexes.push(i)
      }
    }
  }


  /*+++++++++++++++++++++++
   + Process return value +
   +++++++++++++++++++++++*/

  if (!matchedIndexes.length) {
    switch (returnType) {
      case ALL_CLOSEST_MATCHES:
      case ALL_MATCHES:
        return []

      default:
        return null
    }
  }

  switch (returnType) {
    case ALL_CLOSEST_MATCHES:
    case ALL_MATCHES:
      return matchedIndexes.map((matchedIndex) => matchList[matchedIndex])

    case FIRST_CLOSEST_MATCH:
      return matchList[matchedIndexes[0]]

    // case FIRST_MATCH: // It is handled on above

    case RANDOM_CLOSEST_MATCH:
      return matchList[matchedIndexes[Math.floor(Math.random() * matchedIndexes.length)]]

    /* istanbul ignore next */ // handled by simpleSchema
    default:
      return null
  }
}

module.exports = didYouMean
