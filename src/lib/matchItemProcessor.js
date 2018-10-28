import * as R from 'ramda'

import normalizeString from './normalizeString'

/**
 * Process matchItem according to options
 * @param {Object|string} matchItem - Item for matching with `input`
 * @param {Object} options - options that allows you to modify the behavior
 * @returns {string} - processed matchItem
 */
const matchItemProcessor = (matchItem, options) => {
  const matchPath = options.matchPath

  const matchItemStr = matchPath.length ? R.path(matchPath, matchItem) : matchItem

  return normalizeString(matchItemStr, options)
}

export default matchItemProcessor
