import * as R from 'ramda'

import {ReturnTypeEnums} from '../enums/ReturnTypeEnums'
import {ThresholdTypeEnums} from '../enums/ThresholdTypeEnums'
import {unknownThresholdTypeError} from '../errors'
import {InputOptions, Options} from '../types'

type FillDefaultOptions = (options?: InputOptions) => Options
const fillDefaultOptions: FillDefaultOptions = R.compose(
  R.cond([
    [
      R.propEq('thresholdType', ThresholdTypeEnums.EDIT_DISTANCE),
      R.merge({
        threshold: 20
      })
    ],
    [
      R.propEq('thresholdType', ThresholdTypeEnums.SIMILARITY),
      R.merge({
        threshold: 0.4
      })
    ],
    [
      R.T,
      /* istanbul ignore next */
      () => {
        throw unknownThresholdTypeError
      }
    ]
  ]),
  R.merge({
    caseSensitive: false,
    deburr: false,
    matchPath: [],
    returnType: ReturnTypeEnums.FIRST_CLOSEST_MATCH,
    thresholdType: ThresholdTypeEnums.SIMILARITY,
    trimSpaces: true
  }),
  R.defaultTo({})
)
export default fillDefaultOptions
