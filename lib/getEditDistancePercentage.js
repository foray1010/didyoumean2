'use strict'

const leven = require('leven')

function getEditDistancePercentage(a, b) {
  if (!a || !b) return 0

  if (a === b) return 1

  const diff = leven(a, b)
  const longest = Math.max(a.length, b.length)

  return (longest - diff) / longest
}

module.exports = getEditDistancePercentage
