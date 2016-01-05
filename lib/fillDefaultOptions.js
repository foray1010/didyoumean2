'use strict'

const returnTypeEnums = require('../enums/returnTypeEnums')
const simpleSchema = require('./simpleSchema')
const thresholdTypeEnums = require('../enums/thresholdTypeEnums')

/**
 * Fill options with default values
 * @param {null|Object|undefined} matchList - An options that allows you to modify the behavior
 * @return {Object} options with default values
 */
function fillDefaultOptions(options) {
  options = simpleSchema(options, {
    type: 'object',
    defaultValue: {}
  })

  options.caseSensitive = simpleSchema(options.caseSensitive, {
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

  options.threshold = simpleSchema(options.threshold, {
    type: 'number',
    defaultValue: 0.4
  })

  options.thresholdType = simpleSchema(options.thresholdType, {
    type: 'string',
    defaultValue: thresholdTypeEnums.SIMILARITY,
    enums: thresholdTypeEnums
  })

  return options
}

module.exports = fillDefaultOptions
