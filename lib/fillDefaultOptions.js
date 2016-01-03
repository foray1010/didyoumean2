'use strict'

const returnTypeEnums = require('../enums/returnTypeEnums')

function fillDefaultOptions(options) {
  if (!options) options = {}

  littleSchema(options, 'caseSensitive', {
    type: 'boolean',
    defaultValue: false
  })
  littleSchema(options, 'matchPath', {
    type: 'string',
    defaultValue: ''
  })
  littleSchema(options, 'returnType', {
    type: 'string',
    defaultValue: 'closest-first-match',
    enums: returnTypeEnums
  })
  littleSchema(options, 'threshold', {
    type: 'number',
    defaultValue: 0.4
  })

  return options
}

function littleSchema(options, key, schema) {
  const defaultValue = schema.defaultValue
  const enums = schema.enums
  const type = schema.type

  if (options[key] === null || options[key] === undefined) {
    options[key] = defaultValue
  }

  if (typeof options[key] !== type) {
    throw new TypeError(`options['${key}'] is not '${type}'`)
  }

  if (enums) {
    const supportedValues = Object.keys(returnTypeEnums).map((enumKey) => returnTypeEnums[enumKey])

    if (supportedValues.indexOf(options[key]) === -1) {
      throw new RangeError(`${options[key]} is not one of '${String(supportedValues)}'`)
    }
  }
}

module.exports = fillDefaultOptions
