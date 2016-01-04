'use strict'

const returnTypeEnums = require('../enums/returnTypeEnums')
const simpleSchema = require('./simpleSchema')
const thresholdTypeEnums = require('../enums/thresholdTypeEnums')

function fillDefaultOptions(options) {
  if (!options) options = {}

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
    defaultValue: returnTypeEnums.CLOSEST_FIRST_MATCH,
    enums: returnTypeEnums
  })

  options.threshold = simpleSchema(options.threshold, {
    type: 'number',
    defaultValue: 0.4
  })

  options.thresholdType = simpleSchema(options.thresholdType, {
    type: 'string',
    defaultValue: thresholdTypeEnums.PERCENTAGE,
    enums: thresholdTypeEnums
  })

  return options
}

module.exports = fillDefaultOptions
