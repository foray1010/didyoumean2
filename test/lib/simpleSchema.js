'use strict'

const rootPath = require('pkg-dir').sync(__dirname)
const test = require('ava')

const returnTypeEnums = require(`${rootPath}/src/enums/returnTypeEnums`)
const simpleSchema = require(`${rootPath}/src/lib/simpleSchema`)

test('check enum', (t) => {
  t.notThrows(() => {
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
  t.notThrows(() => {
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
  t.notThrows(() => {
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
  t.notThrows(() => {
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
  t.notThrows(() => {
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
  t.notThrows(() => {
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
  t.is(simpleSchema(undefined, {
    type: 'string',
    defaultValue: defaultValue
  }), defaultValue)

  // fill defaultValue when value is undefined
  t.is(simpleSchema(null, {
    type: 'string',
    defaultValue: defaultValue
  }), defaultValue)
})
