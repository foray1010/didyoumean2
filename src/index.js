'use strict'

const leven = require('leven')

const getSimilarity = require('./lib/getSimilarity')
const matchItemProcessor = require('./lib/matchItemProcessor')
const normalizeString = require('./lib/normalizeString')
const resultProcessor = require('./lib/resultProcessor')
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

  const returnType = options.returnType
  const threshold = options.threshold
  const thresholdType = options.thresholdType


  /*++++++++++++++++++++
   + Deal with options +
   ++++++++++++++++++++*/

  const normalizedInput = normalizeString(input, options)

  let checkIfMatched // Validate if score is matched
  let scoreProcessor // Get score
  switch (thresholdType) {
    case EDIT_DISTANCE:
      checkIfMatched = (score) => score <= threshold
      scoreProcessor = (matchItem) => {
        return leven(
          normalizedInput,
          matchItemProcessor(matchItem, options)
        )
      }
      break

    case SIMILARITY:
      checkIfMatched = (score) => score >= threshold
      scoreProcessor = (matchItem) => {
        return getSimilarity(
          normalizedInput,
          matchItemProcessor(matchItem, options)
        )
      }
      break

    /* istanbul ignore next */ // handled by simpleSchema
    default:
  }


  /*+++++++++++
   + Matching +
   +++++++++++*/

  const matchedIndexes = []
  const matchListLen = matchList.length

  switch (returnType) {
    case ALL_CLOSEST_MATCHES:
    case FIRST_CLOSEST_MATCH:
    case RANDOM_CLOSEST_MATCH: {
      const scores = []

      let marginValue
      switch (thresholdType) {
        case EDIT_DISTANCE:
          // Process score and save the smallest score
          marginValue = Infinity
          for (let i = 0; i < matchListLen; i += 1) {
            const score = scoreProcessor(matchList[i])

            if (marginValue > score) marginValue = score

            scores.push(score)
          }
          break

        case SIMILARITY:
          // Process score and save the largest score
          marginValue = 0
          for (let i = 0; i < matchListLen; i += 1) {
            const score = scoreProcessor(matchList[i])

            if (marginValue < score) marginValue = score

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

      break
    }

    case ALL_MATCHES:
      for (let i = 0; i < matchListLen; i += 1) {
        const score = scoreProcessor(matchList[i])

        // save all indexes of matched scores
        if (checkIfMatched(score)) {
          matchedIndexes.push(i)
        }
      }

      break

    case ALL_SORTED_MATCHES: {
      const unsortedResults = []
      for (let i = 0; i < matchListLen; i += 1) {
        const score = scoreProcessor(matchList[i])

        // save all indexes of matched scores
        if (checkIfMatched(score)) {
          unsortedResults.push({
            score: score,
            index: i
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
        matchedIndexes.push(unsortedResult.index)
      }

      break
    }

    case FIRST_MATCH:
      for (let i = 0; i < matchListLen; i += 1) {
        const score = scoreProcessor(matchList[i])

        // Return once matched, performance is main target in this returnType
        if (checkIfMatched(score)) {
          matchedIndexes.push(i)
          break
        }
      }

      break

    /* istanbul ignore next */ // handled by simpleSchema
    default:
  }


  /*+++++++++++++++++++++++
   + Process return value +
   +++++++++++++++++++++++*/

  return resultProcessor(matchList, matchedIndexes, returnType)
}

module.exports = didYouMean
