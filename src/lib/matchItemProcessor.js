'use strict'

const path = require('ramda/src/path')

const normalizeString = require('./normalizeString')

/**
 * Process matchItem according to options
 * @param {Object|string} matchItem - Item for matching with `input`
 * @param {Object} options - options that allows you to modify the behavior
 * @returns {string} - processed matchItem
 */
function matchItemProcessor(matchItem, options) {
  const matchPath = options.matchPath

  const matchItemStr = matchPath.length ? path(matchPath, matchItem) : matchItem

  return normalizeString(matchItemStr, options)
}

module.exports = matchItemProcessor
