'use strict'

const test = require('ava')

const returnTypeEnums = require('../../enums/returnTypeEnums')
const simpleSchema = require('../../lib/simpleSchema')

test('check enum', (t) => {
  t.doesNotThrow(() => {
    simpleSchema(returnTypeEnums.ALL_MATCHES, {
      type: 'string',
      enums: returnTypeEnums
    })
  }, RangeError)

  t.throws(() => {
    simpleSchema('wrong enum', {
      type: 'string',
      enums: returnTypeEnums
    })
  }, RangeError)
})

test('check type', (t) => {
  // array
  t.doesNotThrow(() => {
    simpleSchema([], {
      type: 'array'
    })
  }, TypeError)

  t.throws(() => {
    simpleSchema({}, {
      type: 'array'
    })
  }, TypeError)


  // boolean
  t.doesNotThrow(() => {
    simpleSchema(false, {
      type: 'boolean'
    })
  }, TypeError)

  t.throws(() => {
    simpleSchema({}, {
      type: 'boolean'
    })
  }, TypeError)


  // number
  t.doesNotThrow(() => {
    simpleSchema(1, {
      type: 'number'
    })
  }, TypeError)

  t.throws(() => {
    simpleSchema('', {
      type: 'number'
    })
  }, TypeError)


  // object
  t.doesNotThrow(() => {
    simpleSchema({}, {
      type: 'object'
    })
  }, TypeError)

  t.throws(() => {
    simpleSchema([], {
      type: 'object'
    })
  }, TypeError)


  // string
  t.doesNotThrow(() => {
    simpleSchema('', {
      type: 'string'
    })
  }, TypeError)

  t.throws(() => {
    simpleSchema(1, {
      type: 'string'
    })
  }, TypeError)
})

test('fill defaultValue', (t) => {
  const defaultValue = '123'

  // fill defaultValue when value is undefined
  t.same(simpleSchema(undefined, {
    type: 'string',
    defaultValue: defaultValue
  }), defaultValue)

  // fill defaultValue when value is undefined
  t.same(simpleSchema(null, {
    type: 'string',
    defaultValue: defaultValue
  }), defaultValue)
})
