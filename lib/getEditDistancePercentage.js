'use strict'

const leven = require('leven')

function getEditDistancePercentage(options, a, b) {
  if (!a || !b) return 0

  if (!options.caseSensitive) {
    a = a.toLowerCase()
    b = b.toLowerCase()
  }

  const aLen = a.length
  const bLen = b.length

  if (!aLen || !bLen) return 0

  if (a === b) return 1

  const diff = leven(a, b)
  const longest = Math.max(aLen, bLen)

  return (longest - diff) / longest
}

module.exports = getEditDistancePercentage
