'use strict'

const _values = require('lodash/values')

/**
 * A simple schema that check type, fill default value and check enum
 * @param {*} value - Any value that you want to validate
 * @param {Object} schema - Schema
 * @return {*} Updated value
 */
function simpleSchema(value, schema) {
  const defaultValue = schema.defaultValue
  const enums = schema.enums
  const type = schema.type


  /*+++++++++++++++++++++
   + Fill default value +
   +++++++++++++++++++++*/

  if (value === null || value === undefined) {
    value = defaultValue
  }


  /*+++++++++++++
   + Check type +
   +++++++++++++*/

  let isValid
  switch (type) {
    case 'array':
      isValid = Array.isArray(value)
      break

    case 'integer':
      isValid = typeof value === 'number' && !(value % 1)
      break

    case 'object':
      isValid = typeof value === type && !Array.isArray(value)
      break

    default:
      isValid = typeof value === type
  }

  if (!isValid) {
    throw new TypeError(`${value} is not '${type}'`)
  }


  /*+++++++++++++
   + Check enum +
   +++++++++++++*/

  if (enums) {
    const supportedValues = _values(enums)

    if (supportedValues.indexOf(value) === -1) {
      throw new RangeError(`${value} is not one of '${String(supportedValues)}'`)
    }
  }


  /*+++++++++++++++++++++++
   + Return updated value +
   +++++++++++++++++++++++*/

  return value
}

module.exports = simpleSchema
