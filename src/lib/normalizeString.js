'use strict'

const _deburr = require('lodash/deburr')

/**
 * Normalize a string
 * @param {string} str - any string
 * @param {null|Object|undefined} options - options that allows you to modify the behavior
 * @returns {string} - normalized string
 */
function normalizeString(str, options) {
  const caseSensitive = options.caseSensitive
  const deburr = options.deburr
  const trimSpace = options.trimSpace

  if (trimSpace) {
    str = str.trim().replace(/\s+/g, ' ')
  }

  if (deburr) {
    str = _deburr(str)
  }

  if (!caseSensitive) {
    str = str.toLowerCase()
  }

  return str
}

module.exports = normalizeString
