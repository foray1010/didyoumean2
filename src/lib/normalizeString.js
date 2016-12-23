'use strict'

/**
 * Normalize a string
 * @param {string} str - any string
 * @param {null|Object|undefined} options - options that allows you to modify the behavior
 * @returns {string} - normalized string
 */
function normalizeString(str, options) {
  const caseSensitive = options.caseSensitive

  if (!caseSensitive) {
    str = str.toLowerCase()
  }

  return str
}

module.exports = normalizeString
