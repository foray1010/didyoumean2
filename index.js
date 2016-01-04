'use strict'

const get = require('lodash.get')
const leven = require('leven')
const random = require('lodash.random')

const getEditDistancePercentage = require('./lib/getEditDistancePercentage')
const fillDefaultOptions = require('./lib/fillDefaultOptions')
const returnTypeEnums = require('./enums/returnTypeEnums')
const thresholdTypeEnums = require('./enums/thresholdTypeEnums')

const ALL_MATCHES = returnTypeEnums.ALL_MATCHES
const CLOSEST_FIRST_MATCH = returnTypeEnums.CLOSEST_FIRST_MATCH
const CLOSEST_RANDOM_MATCH = returnTypeEnums.CLOSEST_RANDOM_MATCH
const FIRST_MATCH = returnTypeEnums.FIRST_MATCH

const EDIT_DISTANCE = thresholdTypeEnums.EDIT_DISTANCE
const PERCENTAGE = thresholdTypeEnums.PERCENTAGE

function didYouMean(input, matchList, options) {
  options = fillDefaultOptions(options)

  const caseSensitive = options.caseSensitive
  const matchPath = options.matchPath
  const returnType = options.returnType
  const threshold = options.threshold
  const thresholdType = options.thresholdType

  let processedMatchList = matchPath ?
    matchList.map((matchObjItem) => get(matchObjItem, matchPath)) :
    matchList

  if (!caseSensitive) {
    input = input.toLowerCase()
    processedMatchList = processedMatchList.map((matchItem) => matchItem.toLowerCase())
  }

  let resultProcessor
  switch (thresholdType) {
    case EDIT_DISTANCE:
      resultProcessor = (matchItem) => leven(input, matchItem)
      break

    case PERCENTAGE:
      resultProcessor = (matchItem) => getEditDistancePercentage(input, matchItem)
      break

    default:
  }

  const results = processedMatchList.map(resultProcessor)

  const resultsLen = results.length

  let checkIfMatched
  switch (returnType) {
    case CLOSEST_FIRST_MATCH:
    case CLOSEST_RANDOM_MATCH:
      switch (thresholdType) {
        case EDIT_DISTANCE:
          const minValue = Math.min.apply(null, results)

          checkIfMatched = (result) => result === minValue
          break

        case PERCENTAGE:
          const maxValue = Math.max.apply(null, results)

          checkIfMatched = (result) => result === maxValue
          break

        default:
      }
      break

    default:
      switch (thresholdType) {
        case EDIT_DISTANCE:
          checkIfMatched = (result) => result <= threshold
          break

        case PERCENTAGE:
          checkIfMatched = (result) => result >= threshold
          break

        default:
      }
  }

  const matchedIndexes = []
  for (let i = 0; i < resultsLen; i++) {
    const result = results[i]

    if (checkIfMatched(result)) {
      matchedIndexes.push(i)
    }
  }

  if (!matchedIndexes.length) {
    switch (returnType) {
      case ALL_MATCHES:
        return []

      default:
        return null
    }
  }

  switch (returnType) {
    case ALL_MATCHES:
      return matchedIndexes.map((matchedIndex) => matchList[matchedIndex])

    case CLOSEST_FIRST_MATCH:
    case FIRST_MATCH:
      return matchList[matchedIndexes[0]]

    case CLOSEST_RANDOM_MATCH:
      return matchList[matchedIndexes[random(matchedIndexes.length - 1)]]

    default:
  }
}

module.exports = didYouMean
