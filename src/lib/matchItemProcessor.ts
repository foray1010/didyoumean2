import type { Options } from '../types'
import normalizeString from './normalizeString'

const getMatchItemStr = (
  matchItem: Record<string, unknown> | string,
  matchPath: Options['matchPath'],
): string => {
  const matchItemStr =
    Array.isArray(matchPath) && matchPath.length
      ? matchPath.reduce<any>((acc, path) => acc?.[path], matchItem)
      : matchItem
  if (typeof matchItemStr !== 'string') return ''
  return matchItemStr
}

/**
 * Process matchItem according to options
 * @param {Object|string} matchItem - Item for matching with `input`
 * @param {Object} options - options that allows you to modify the behavior
 * @returns {string} - processed matchItem
 */
const matchItemProcessor = (
  matchItem: Record<string, unknown> | string,
  options: Options,
): string => {
  const { matchPath } = options

  const matchItemStr = getMatchItemStr(matchItem, matchPath)

  return normalizeString(matchItemStr, options)
}

export default matchItemProcessor
