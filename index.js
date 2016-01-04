'use strict'

const get = require('lodash.get')
const random = require('lodash.random')

const getEditDistancePercentage = require('./lib/getEditDistancePercentage')
const fillDefaultOptions = require('./lib/fillDefaultOptions')
const returnTypeEnums = require('./enums/returnTypeEnums')

const ALL_MATCHES = returnTypeEnums.ALL_MATCHES
const CLOSEST_FIRST_MATCH = returnTypeEnums.CLOSEST_FIRST_MATCH
const CLOSEST_RANDOM_MATCH = returnTypeEnums.CLOSEST_RANDOM_MATCH
const FIRST_MATCH = returnTypeEnums.FIRST_MATCH

function didYouMean(input, matchList, options) {
  options = fillDefaultOptions(options)

  const matchPath = options.matchPath
  const returnType = options.returnType
  const threshold = options.threshold

  const processedMatchList = matchPath ?
    matchList.map((matchObjItem) => get(matchObjItem, matchPath)) :
    matchList

  const editDistancePercentageResults = processedMatchList
    .map((matchItem) => getEditDistancePercentage(input, matchItem, options))

  const editDistancePercentageResultsLen = editDistancePercentageResults.length

  const matchedIndexes = []

  let checkIfMatched

  switch (returnType) {
    case CLOSEST_FIRST_MATCH:
    case CLOSEST_RANDOM_MATCH:
      const maxValue = Math.max.apply(null, editDistancePercentageResults)

      checkIfMatched = (editDistancePercentage) => editDistancePercentage === maxValue

      break

    default:
      checkIfMatched = (editDistancePercentage) => editDistancePercentage >= threshold
  }

  for (let i = 0; i < editDistancePercentageResultsLen; i++) {
    const editDistancePercentage = editDistancePercentageResults[i]

    if (checkIfMatched(editDistancePercentage)) {
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
      return null
  }
}

module.exports = didYouMean
