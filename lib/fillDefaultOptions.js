'use strict'

const returnTypeEnums = require('../enums/returnTypeEnums')
const simpleSchema = require('./simpleSchema')

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
    defaultValue: 'closest-first-match',
    enums: returnTypeEnums
  })

  options.threshold = simpleSchema(options.threshold, {
    type: 'number',
    defaultValue: 0.4
  })

  return options
}

module.exports = fillDefaultOptions
