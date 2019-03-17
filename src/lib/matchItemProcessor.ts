import * as R from 'ramda'

import {Options} from '../types'
import normalizeString from './normalizeString'

/**
 * Process matchItem according to options
 * @param {Object|string} matchItem - Item for matching with `input`
 * @param {Object} options - options that allows you to modify the behavior
 * @returns {string} - processed matchItem
 */
const matchItemProcessor = (matchItem: object | string, options: Options): string => {
  const matchPath = options.matchPath

  const matchItemStr: string =
    Array.isArray(matchPath) && matchPath.length ? R.pathOr('', matchPath, matchItem) : matchItem

  return normalizeString(matchItemStr, options)
}

export default matchItemProcessor
