'use strict'

const get = require('lodash/get')
const leven = require('leven')
const sample = require('lodash/sample')

const getSimilarity = require('./lib/getSimilarity')
const runOptionsSchema = require('./lib/runOptionsSchema')
const returnTypeEnums = require('./enums/returnTypeEnums')
const thresholdTypeEnums = require('./enums/thresholdTypeEnums')

const ALL_CLOSEST_MATCHES = returnTypeEnums.ALL_CLOSEST_MATCHES
const ALL_MATCHES = returnTypeEnums.ALL_MATCHES
const ALL_SORTED_MATCHES = returnTypeEnums.ALL_SORTED_MATCHES
const FIRST_CLOSEST_MATCH = returnTypeEnums.FIRST_CLOSEST_MATCH
const FIRST_MATCH = returnTypeEnums.FIRST_MATCH
const RANDOM_CLOSEST_MATCH = returnTypeEnums.RANDOM_CLOSEST_MATCH

const EDIT_DISTANCE = thresholdTypeEnums.EDIT_DISTANCE
const SIMILARITY = thresholdTypeEnums.SIMILARITY

/**
 * Main function for didyoumean2
 * @param {string} input - string that you are not sure and want to match with `matchList`
 * @param {Object[]|string[]} matchList - List for matching with `input`
 * @param {null|Object|undefined} options - options that allows you to modify the behavior
 * @returns {Array|null|Object|string} - matched result(s), return object if `match` is `{Object[]}`
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

  const scoreProcessor = (() => {
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

  let checkIfMatched // Validate if score is matched
  switch (thresholdType) {
    case EDIT_DISTANCE:
      checkIfMatched = (score) => score <= threshold
      break

    case SIMILARITY:
      checkIfMatched = (score) => score >= threshold
      break

    /* istanbul ignore next */ // handled by simpleSchema
    default:
  }

  let checkMarginValue // {string} Check for `max` or `min` score value
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
      const score = scoreProcessor(matchList[i])

      // Return once matched, performance is main target in this returnType
      if (checkIfMatched(score)) {
        return matchList[i]
      }
    }
  } else if (returnType === ALL_SORTED_MATCHES) {
    const unsortedResults = []
    for (let i = 0; i < matchListLen; i += 1) {
      const score = scoreProcessor(matchList[i])

      // save all indexes of matched scores
      if (checkIfMatched(score)) {
        unsortedResults.push({
          score: score,
          i: i
        })
      }
    }

    switch (thresholdType) {
      case EDIT_DISTANCE:
        unsortedResults.sort((a, b) => a.score - b.score)
        break

      case SIMILARITY:
        unsortedResults.sort((a, b) => b.score - a.score)
        break

      /* istanbul ignore next */ // handled by simpleSchema
      default:
    }

    for (const unsortedResult of unsortedResults) {
      matchedIndexes.push(unsortedResult.i)
    }
  } else if (checkMarginValue) {
    const scores = []

    let marginValue

    switch (checkMarginValue) {
      case 'max':
        // Process score and save the largest score
        marginValue = 0
        for (let i = 0; i < matchListLen; i += 1) {
          const score = scoreProcessor(matchList[i])

          if (marginValue < score) marginValue = score

          scores.push(score)
        }
        break

      case 'min':
        // Process score and save the smallest score
        marginValue = Infinity
        for (let i = 0; i < matchListLen; i += 1) {
          const score = scoreProcessor(matchList[i])

          if (marginValue > score) marginValue = score

          scores.push(score)
        }
        break

      /* istanbul ignore next */ // handled by simpleSchema
      default:
    }

    const scoresLen = scores.length

    for (let i = 0; i < scoresLen; i += 1) {
      const score = scores[i]

      if (checkIfMatched(score)) {
        // Just save the closest value
        if (score === marginValue) {
          matchedIndexes.push(i)
        }
      }
    }
  } else {
    for (let i = 0; i < matchListLen; i += 1) {
      const score = scoreProcessor(matchList[i])

      // save all indexes of matched scores
      if (checkIfMatched(score)) {
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
      case ALL_SORTED_MATCHES:
        return []

      default:
        return null
    }
  }

  switch (returnType) {
    case ALL_CLOSEST_MATCHES:
    case ALL_MATCHES:
    case ALL_SORTED_MATCHES:
      return matchedIndexes.map((matchedIndex) => matchList[matchedIndex])

    case FIRST_CLOSEST_MATCH:
      return matchList[matchedIndexes[0]]

    // case FIRST_MATCH: // It is handled on above

    case RANDOM_CLOSEST_MATCH:
      return matchList[sample(matchedIndexes)]

    /* istanbul ignore next */ // handled by simpleSchema
    default:
      return null
  }
}

module.exports = didYouMean
