import deburr from 'lodash.deburr'
import * as R from 'ramda'

const trimSpaces = R.compose(R.replace(/\s+/g, ' '), R.trim)

/**
 * Normalize a string
 * @param {string} str - any string
 * @param {Object} options - options that allows you to modify the behavior
 * @returns {string} - normalized string
 */
const normalizeString = (str, options) => {
  return R.compose(
    (s) => {
      if (options.caseSensitive) return s
      return R.toLower(s)
    },
    (s) => {
      if (!options.deburr) return s
      return deburr(s)
    },
    (s) => {
      if (!options.trimSpaces) return s
      return trimSpaces(s)
    }
  )(str)
}

export default normalizeString
