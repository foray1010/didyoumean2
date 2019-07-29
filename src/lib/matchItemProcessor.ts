import pathOr from 'ramda/src/pathOr'

import {Options} from '../types'
import normalizeString from './normalizeString'

/**
 * Process matchItem according to options
 * @param {Object|string} matchItem - Item for matching with `input`
 * @param {Object} options - options that allows you to modify the behavior
 * @returns {string} - processed matchItem
 */
const matchItemProcessor = (matchItem: object | string, options: Options): string => {
  const {matchPath} = options

  const matchItemStr =
    Array.isArray(matchPath) && matchPath.length ? pathOr('', matchPath, matchItem) : matchItem
  if (typeof matchItemStr !== 'string') {
    return ''
  }

  return normalizeString(matchItemStr, options)
}

export default matchItemProcessor
