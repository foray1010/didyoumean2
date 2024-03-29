import type { MatchItem, Options } from '../types.js'
import normalizeString from './normalizeString.js'

const getMatchItemStr = (
  matchItem: MatchItem,
  matchPath: Options['matchPath'],
): string => {
  const matchItemStr =
    matchPath.length > 0
      ? matchPath.reduce<unknown>((acc, prop) => {
          // @ts-expect-error skip redundant type check
          return acc?.[prop]
        }, matchItem)
      : matchItem
  if (typeof matchItemStr !== 'string') return ''
  return matchItemStr
}

/**
 * Process matchItem according to options
 *
 * @param {object | string} matchItem - Item for matching with `input`
 * @param {object} options - options that allows you to modify the behavior
 * @returns {string} - processed matchItem
 */
const matchItemProcessor = (matchItem: MatchItem, options: Options): string => {
  const { matchPath } = options

  const matchItemStr = getMatchItemStr(matchItem, matchPath)

  return normalizeString(matchItemStr, options)
}

export default matchItemProcessor
