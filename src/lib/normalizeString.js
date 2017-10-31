'use strict'

const deburr = require('lodash.deburr')

/**
 * Normalize a string
 * @param {string} str - any string
 * @param {Object} options - options that allows you to modify the behavior
 * @returns {string} - normalized string
 */
function normalizeString(str, options) {
  if (options.trimSpaces) {
    str = str.trim().replace(/\s+/g, ' ')
  }

  if (options.deburr) {
    str = deburr(str)
  }

  if (!options.caseSensitive) {
    str = str.toLowerCase()
  }

  return str
}

module.exports = normalizeString
