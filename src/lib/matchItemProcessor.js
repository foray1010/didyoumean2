'use strict'

const get = require('lodash/get')

/**
 * Process matchItem according to options
 * @param {Object|string} matchItem - Item for matching with `input`
 * @param {null|Object|undefined} options - options that allows you to modify the behavior
 * @returns {string} - processed matchItem
 */
function matchItemProcessor(matchItem, options) {
  const caseSensitive = options.caseSensitive
  const matchPath = options.matchPath

  if (matchPath) {
    matchItem = get(matchItem, matchPath)
  }

  if (!caseSensitive) {
    matchItem = matchItem.toLowerCase()
  }

  return matchItem
}

module.exports = matchItemProcessor
