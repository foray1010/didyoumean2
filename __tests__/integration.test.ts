/* eslint-disable import/no-extraneous-dependencies */

import didYouMean, { ReturnTypeEnums, ThresholdTypeEnums } from 'didyoumean2'

const input = 'abcdefghij'
const matchList = [
  'abc*******',
  'abcd******',
  'abcde*****',
  'ABCDEF****',
  'abcde*g***',
  'abcdef****',
]

test('sanity check for generated build', () => {
  expect(
    didYouMean(input, matchList, {
      returnType: ReturnTypeEnums.ALL_CLOSEST_MATCHES,
      thresholdType: ThresholdTypeEnums.EDIT_DISTANCE,
    }),
  ).toStrictEqual([matchList[3], matchList[4], matchList[5]])
})
