import deburr from 'lodash.deburr'
import * as R from 'ramda'

import {Options} from '../types'

const trimSpaces = R.compose(
  R.replace(/\s+/g, ' '),
  R.trim
)

/**
 * Normalize a string
 * @param {string} str - any string
 * @param {Object} options - options that allows you to modify the behavior
 * @returns {string} - normalized string
 */
const normalizeString = (str: string, options: Options): string => {
  return R.compose(
    (s: string): string => {
      if (options.caseSensitive) return s
      return R.toLower(s)
    },
    (s: string): string => {
      if (!options.deburr) return s
      return deburr(s)
    },
    (s: string): string => {
      if (!options.trimSpaces) return s
      return trimSpaces(s)
    }
  )(str)
}

export default normalizeString
