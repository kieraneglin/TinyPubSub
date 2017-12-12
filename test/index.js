const chai = require('chai')
const sinon = require('sinon')
const assert = chai.assert
const tps = require('./../dist/index').default

sinon.assert.expose(chai.assert, { prefix: '' })

describe('Events', () => {
  afterEach(() => {
    tps.handlers = {}
  })
  it('handlers is an object', () => {
    assert.deepEqual({}, tps.handlers)
  })

  describe('#add', () => {
    it('Creates a new event if it doesnt exist', () => {
      tps.add('newEvent')

      assert.isArray(tps.handlers['newEvent'])
    })
    it('Doesnt overwrite if event exists', () => {
      let fn = () => {}
      tps.add('newEvent', fn)
      tps.add('newEvent', fn)

      assert.equal(1, tps.handlers['newEvent'].length)
    })
  })

  describe('#remove', () => {
    it('Removes an event if it exists', () => {
      tps.add('newEvent', 'fname')
      tps.remove('newEvent', 'fname')

      assert.deepEqual([], tps.handlers['newEvent'])      
    })
    it('Returns false if an event doesnt exist', () => {
      // unimplemented
    })
  })

  describe('#emit', () => {
    it('Runs one given function', () => {
      let fn = sinon.spy()

      tps.add('newEvent', fn)
      tps.emit('newEvent')

      assert(fn.called)
    })
    it('Runs all given functions in array', () => {
      let fn1 = sinon.spy()
      let fn2 = sinon.spy()

      tps.add('newEvent', fn1)
      tps.add('newEvent', fn2)
      tps.emit('newEvent')

      assert(fn1.called)
      assert(fn2.called)
    })
    it('Returns false if event isnt found', () => {
      // unimplemented
    })
  })

  describe('#list', () => {
    it('Returns the handlers object', () => {
      // unimplemented
    })
  })
})
