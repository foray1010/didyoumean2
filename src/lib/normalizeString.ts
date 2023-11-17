import deburr from 'lodash.deburr'

import type { Options } from '../types.js'

/**
 * Normalize a string
 *
 * @param {string} str - any string
 * @param {object} options - options that allows you to modify the behavior
 * @returns {string} - normalized string
 */
const normalizeString = (str: string, options: Options): string => {
  let s = str

  if (options.trimSpaces) {
    s = s.trim().replaceAll(/\s+/gu, ' ')
  }

  if (options.deburr) {
    s = deburr(s)
  }

  if (!options.caseSensitive) {
    s = s.toLowerCase()
  }

  return s
}

export default normalizeString
