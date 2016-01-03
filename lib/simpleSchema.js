'use strict'

function simpleSchema(value, schema) {
  const defaultValue = schema.defaultValue
  const enums = schema.enums
  const type = schema.type


  if (value === null || value === undefined) {
    value = defaultValue
  }


  let valueType

  if (Array.isArray(value)) {
    valueType = 'array'
  } else {
    valueType = typeof value
  }

  if (valueType !== type) {
    throw new TypeError(`${value} is not '${type}'`)
  }


  if (enums) {
    const supportedValues = Object.keys(enums).map((enumKey) => enums[enumKey])

    if (supportedValues.indexOf(value) === -1) {
      throw new RangeError(`${value} is not one of '${String(supportedValues)}'`)
    }
  }


  return value
}

module.exports = simpleSchema
