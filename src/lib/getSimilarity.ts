import leven from 'leven'

/**
 * Using edit distance between `a` and `b` to calculate similarity
 *
 * @param {string} a - `input`
 * @param {string} b - String from `matchList`
 * @returns {number} similarity between `a` and `b`
 */
const getSimilarity = (a: string, b: string): number => {
  if (!a || !b) return 0
  if (a === b) return 1

  const editDistance = leven(a, b)
  const longestLength = Math.max(a.length, b.length)

  return (longestLength - editDistance) / longestLength
}

export default getSimilarity
