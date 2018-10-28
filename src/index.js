import leven from 'leven'

import {
  ALL_CLOSEST_MATCHES,
  ALL_MATCHES,
  ALL_SORTED_MATCHES,
  FIRST_CLOSEST_MATCH,
  FIRST_MATCH
} from './enums/returnTypeEnums.json'
import {EDIT_DISTANCE, SIMILARITY} from './enums/thresholdTypeEnums.json'
import getSimilarity from './lib/getSimilarity'
import matchItemProcessor from './lib/matchItemProcessor'
import normalizeString from './lib/normalizeString'
import resultProcessor from './lib/resultProcessor'
import runOptionsSchema from './lib/runOptionsSchema'

/**
 * Main function for didyoumean2
 * @param {string} input - string that you are not sure and want to match with `matchList`
 * @param {Object[]|string[]} matchList - List for matching with `input`
 * @param {null|Object|undefined} options - options that allows you to modify the behavior
 * @returns {Array|null|Object|string} - matched result(s), return object if `match` is `{Object[]}`
 */
const didYouMean = (input, matchList, options) => {
  /*+++++++++++++++++++
   + Initiate options +
   +++++++++++++++++++*/

  const optionsWithDefaults = runOptionsSchema(options)

  const {returnType, threshold, thresholdType} = optionsWithDefaults

  /*++++++++++++++++++++
   + Deal with options +
   ++++++++++++++++++++*/

  const normalizedInput = normalizeString(input, optionsWithDefaults)

  let checkIfMatched // Validate if score is matched
  let scoreProcessor // Get score
  switch (thresholdType) {
    case EDIT_DISTANCE:
      checkIfMatched = (score) => score <= threshold
      scoreProcessor = (matchItem) => {
        return leven(normalizedInput, matchItemProcessor(matchItem, optionsWithDefaults))
      }
      break

    case SIMILARITY:
      checkIfMatched = (score) => score >= threshold
      scoreProcessor = (matchItem) => {
        return getSimilarity(normalizedInput, matchItemProcessor(matchItem, optionsWithDefaults))
      }
      break

    /* istanbul ignore next */ default:
    // handled by simpleSchema
  }

  /*+++++++++++
   + Matching +
   +++++++++++*/

  const matchedIndexes = []
  const matchListLen = matchList.length

  switch (returnType) {
    case ALL_CLOSEST_MATCHES:
    case FIRST_CLOSEST_MATCH: {
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

        /* istanbul ignore next */ default:
        // handled by simpleSchema
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
            score,
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

        /* istanbul ignore next */ default:
        // handled by simpleSchema
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

    /* istanbul ignore next */ default:
    // handled by simpleSchema
  }

  /*+++++++++++++++++++++++
   + Process return value +
   +++++++++++++++++++++++*/

  return resultProcessor(matchList, matchedIndexes, returnType)
}

export default didYouMean
