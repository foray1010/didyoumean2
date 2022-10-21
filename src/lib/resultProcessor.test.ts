import { ReturnTypeEnums } from '../enums/ReturnTypeEnums.js'
import { unknownReturnTypeError } from '../errors.js'
import resultProcessor from './resultProcessor.js'

const matchList = [
  'abc*******',
  'abcd******',
  'abcde*****',
  'ABCDEF****',
  'abcde*g***',
  'abcdef****',
]

test('ALL_CLOSEST_MATCHES, ALL_MATCHES and ALL_SORTED_MATCHES', () => {
  for (const ENUM of [
    ReturnTypeEnums.ALL_CLOSEST_MATCHES,
    ReturnTypeEnums.ALL_MATCHES,
    ReturnTypeEnums.ALL_SORTED_MATCHES,
  ]) {
    expect(resultProcessor(matchList, [3, 4, 5], ENUM)).toEqual([
      'ABCDEF****',
      'abcde*g***',
      'abcdef****',
    ])

    expect(resultProcessor(matchList, [], ENUM)).toEqual([])
  }
})

test('FIRST_CLOSEST_MATCH and FIRST_MATCH', () => {
  for (const ENUM of [
    ReturnTypeEnums.FIRST_CLOSEST_MATCH,
    ReturnTypeEnums.FIRST_MATCH,
  ]) {
    expect(resultProcessor(matchList, [3, 4, 5], ENUM)).toBe('ABCDEF****')

    expect(resultProcessor(matchList, [], ENUM)).toBeNull()
  }
})

test('unknown returnType', () => {
  // @ts-expect-error: test incorrect returnType
  expect(() => resultProcessor(matchList, [], 'unknown')).toThrow(
    unknownReturnTypeError,
  )
})
