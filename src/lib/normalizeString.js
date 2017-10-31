'use strict'

const deburr = require('lodash.deburr')

/**
 * Normalize a string
 * @param {string} str - any string
 * @param {null|Object|undefined} options - options that allows you to modify the behavior
 * @returns {string} - normalized string
 */
function normalizeString(str, options) {
  const caseSensitive = options.caseSensitive
  const isDeburr = options.deburr
  const trimSpaces = options.trimSpaces

  if (trimSpaces) {
    str = str.trim().replace(/\s+/g, ' ')
  }

  if (isDeburr) {
    str = deburr(str)
  }

  if (!caseSensitive) {
    str = str.toLowerCase()
  }

  return str
}

module.exports = normalizeString
