import * as R from 'ramda'

import returnTypeEnums from '../enums/returnTypeEnums.json'
import thresholdTypeEnums from '../enums/thresholdTypeEnums.json'
import simpleSchema from './simpleSchema'

/**
 * Run `simpleSchema` on `options`
 * @param {null|Object|undefined} options - An options that allows you to modify the behavior
 * @return {Object} options with default values
 */
const runOptionsSchema = R.compose(
  R.cond([
    [
      R.propEq('thresholdType', thresholdTypeEnums.EDIT_DISTANCE),
      (options) => ({
        ...options,
        threshold: simpleSchema(options.threshold, {
          type: 'integer',
          default: 20
        })
      })
    ],
    [
      R.propEq('thresholdType', thresholdTypeEnums.SIMILARITY),
      (options) => ({
        ...options,
        threshold: simpleSchema(options.threshold, {
          type: 'number',
          default: 0.4
        })
      })
    ],
    [
      R.T,
      () => {
        throw new Error('unhandled `thresholdType`')
      }
    ]
  ]),
  (options = {}) => ({
    caseSensitive: simpleSchema(options.caseSensitive, {
      type: 'boolean',
      default: false
    }),
    deburr: simpleSchema(options.deburr, {
      type: 'boolean',
      default: false
    }),
    matchPath: simpleSchema(options.matchPath, {
      type: 'array',
      default: []
    }),
    returnType: simpleSchema(options.returnType, {
      type: 'string',
      default: returnTypeEnums.FIRST_CLOSEST_MATCH,
      enum: R.values(returnTypeEnums)
    }),
    threshold: options.threshold,
    thresholdType: simpleSchema(options.thresholdType, {
      type: 'string',
      default: thresholdTypeEnums.SIMILARITY,
      enum: R.values(thresholdTypeEnums)
    }),
    trimSpaces: simpleSchema(options.trimSpaces, {
      type: 'boolean',
      default: true
    })
  })
)

export default runOptionsSchema
