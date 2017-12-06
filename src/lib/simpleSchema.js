/**
 * A simple schema that check type, fill default value and check enum
 * @param {*} value - Any value that you want to validate
 * @param {Object} schema - Schema
 * @return {*} Updated value
 */
const simpleSchema = (value, schema) => {
  const {default: defaultValue, enum: enums, type} = schema

  /*+++++++++++++++++++++
   + Fill default value +
   +++++++++++++++++++++*/

  const valueWithDefault = value == null ? defaultValue : value

  /*+++++++++++++
   + Check type +
   +++++++++++++*/

  let isValid
  switch (type) {
    case 'array':
      isValid = Array.isArray(valueWithDefault)
      break

    case 'integer':
      isValid = typeof valueWithDefault === 'number' && !(valueWithDefault % 1)
      break

    case 'object':
      isValid = typeof valueWithDefault === type && !Array.isArray(valueWithDefault)
      break

    default:
      isValid = typeof valueWithDefault === type
  }

  if (!isValid) {
    throw new TypeError(`${valueWithDefault} is not '${type}'`)
  }

  /*+++++++++++++
   + Check enum +
   +++++++++++++*/

  if (enums && enums.indexOf(valueWithDefault) === -1) {
    throw new RangeError(`${valueWithDefault} is not one of '${enums}'`)
  }

  /*+++++++++++++++++++++++
   + Return updated value +
   +++++++++++++++++++++++*/

  return valueWithDefault
}

export default simpleSchema
