'use strict'

const returnTypeEnums = require('../enums/returnTypeEnums')
const simpleSchema = require('./simpleSchema')
const thresholdTypeEnums = require('../enums/thresholdTypeEnums')

const EDIT_DISTANCE = thresholdTypeEnums.EDIT_DISTANCE
const SIMILARITY = thresholdTypeEnums.SIMILARITY

/**
 * Run `simpleSchema` on `options`
 * @param {null|Object|undefined} matchList - An options that allows you to modify the behavior
 * @return {Object} options with default values
 */
function runOptionsSchema(options) {
  options = simpleSchema(options, {
    type: 'object',
    defaultValue: {}
  })

  options.caseSensitive = simpleSchema(options.caseSensitive, {
    type: 'boolean',
    defaultValue: false
  })

  options.deburr = simpleSchema(options.deburr, {
    type: 'boolean',
    defaultValue: false
  })

  options.matchPath = simpleSchema(options.matchPath, {
    type: 'string',
    defaultValue: ''
  })

  options.returnType = simpleSchema(options.returnType, {
    type: 'string',
    defaultValue: returnTypeEnums.FIRST_CLOSEST_MATCH,
    enums: returnTypeEnums
  })

  options.thresholdType = simpleSchema(options.thresholdType, {
    type: 'string',
    defaultValue: SIMILARITY,
    enums: thresholdTypeEnums
  })

  switch (options.thresholdType) {
    case EDIT_DISTANCE:
      options.threshold = simpleSchema(options.threshold, {
        type: 'integer',
        defaultValue: 20
      })
      break

    case SIMILARITY:
      options.threshold = simpleSchema(options.threshold, {
        type: 'number',
        defaultValue: 0.4
      })
      break

    /* istanbul ignore next */ // handled by simpleSchema
    default:
  }

  options.trimSpace = simpleSchema(options.trimSpace, {
    type: 'boolean',
    defaultValue: false
  })

  return options
}

module.exports = runOptionsSchema
