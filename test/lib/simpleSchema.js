'use strict'

const rootPath = require('pkg-dir').sync(__dirname)

const returnTypeEnums = require(`${rootPath}/src/enums/returnTypeEnums`)
const simpleSchema = require(`${rootPath}/src/lib/simpleSchema`)

test('check enum', () => {
  expect(() => {
    simpleSchema(returnTypeEnums.ALL_MATCHES, {
      type: 'string',
      enum: returnTypeEnums
    })
  }).not.toThrowError(RangeError)

  expect(() => {
    simpleSchema('wrong enum', {
      type: 'string',
      enum: returnTypeEnums
    })
  }).toThrowError(RangeError)
})

test('check type', () => {
  // array
  expect(() => {
    simpleSchema([], {
      type: 'array'
    })
  }).not.toThrowError(TypeError)

  expect(() => {
    simpleSchema(
      {},
      {
        type: 'array'
      }
    )
  }).toThrowError(TypeError)

  // boolean
  expect(() => {
    simpleSchema(false, {
      type: 'boolean'
    })
  }).not.toThrowError(TypeError)

  expect(() => {
    simpleSchema(
      {},
      {
        type: 'boolean'
      }
    )
  }).toThrowError(TypeError)

  // number
  expect(() => {
    simpleSchema(1, {
      type: 'number'
    })
  }).not.toThrowError(TypeError)

  expect(() => {
    simpleSchema('', {
      type: 'number'
    })
  }).toThrowError(TypeError)

  // object
  expect(() => {
    simpleSchema(
      {},
      {
        type: 'object'
      }
    )
  }).not.toThrowError(TypeError)

  expect(() => {
    simpleSchema([], {
      type: 'object'
    })
  }).toThrowError(TypeError)

  // string
  expect(() => {
    simpleSchema('', {
      type: 'string'
    })
  }).not.toThrowError(TypeError)

  expect(() => {
    simpleSchema(1, {
      type: 'string'
    })
  }).toThrowError(TypeError)
})

test('fill defaultValue', () => {
  const defaultValue = '123'

  // fill defaultValue when value is undefined
  expect(
    simpleSchema(undefined, {
      type: 'string',
      default: defaultValue
    })
  ).toBe(defaultValue)

  // fill defaultValue when value is undefined
  expect(
    simpleSchema(null, {
      type: 'string',
      default: defaultValue
    })
  ).toBe(defaultValue)
})
