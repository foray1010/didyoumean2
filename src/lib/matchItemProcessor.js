'use strict'

const _get = require('lodash/get')

const normalizeString = require('./normalizeString')

/**
 * Process matchItem according to options
 * @param {Object|string} matchItem - Item for matching with `input`
 * @param {null|Object|undefined} options - options that allows you to modify the behavior
 * @returns {string} - processed matchItem
 */
function matchItemProcessor(matchItem, options) {
  const matchPath = options.matchPath

  const matchItemStr = matchPath ? _get(matchItem, matchPath) : matchItem

  return normalizeString(matchItemStr, options)
}

module.exports = matchItemProcessor
