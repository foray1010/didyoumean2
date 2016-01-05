'use strict'

const leven = require('leven')

/**
 * Using edit distance between `a` and `b` to calculate similarity
 * @param {string} a - `input`
 * @param {string} b - String from `matchList`
 * @return {number} similarity between `a` and `b`
 */
function getSimilarity(a, b) {
  if (!a || !b) return 0

  if (a === b) return 1

  const diff = leven(a, b)
  const longest = Math.max(a.length, b.length)

  return (longest - diff) / longest
}

module.exports = getSimilarity
