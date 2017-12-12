const chai = require('chai')
const sinon = require('sinon')
const assert = chai.assert
const tps = require('./../dist/index').default
const blankFn = () => {}

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
      tps.add('newEvent', blankFn)

      assert.isArray(tps.handlers['newEvent'])
      assert.deepEqual([blankFn], tps.handlers['newEvent'])
    })
    it('Doesnt overwrite if event exists', () => {
      tps.add('newEvent', blankFn)
      tps.add('newEvent', blankFn)

      assert.deepEqual([blankFn], tps.handlers['newEvent'])
    })
    it('Doesnt overwrite if event functions exists', () => {
      tps.add('newEvent', blankFn)
      tps.add('newEvent', blankFn)

      assert.equal(1, tps.handlers['newEvent'].length)
    })
    it('Returns true if an event was sucessfully added', () => {
      let result = tps.add('newEvent', blankFn)

      assert.isTrue(result)
    })
    it('Returns false if an event was not sucessfully added', () => {
      tps.add('newEvent', blankFn)

      let result = tps.add('newEvent', blankFn)

      assert.isFalse(result)
    })
  })

  describe('#remove', () => {
    it('Removes an event function if it exists', () => {
      tps.add('newEvent', blankFn)
      tps.remove('newEvent', blankFn)

      assert.deepEqual([], tps.handlers['newEvent'])      
    })
    it('Returns true if event function was removed', () => {
      tps.add('newEvent', blankFn)

      let result = tps.remove('newEvent', blankFn)

      assert.isTrue(result)
    })
    it('Returns false if an event function doesnt exist', () => {
      tps.add('newEvent')

      let result = tps.remove('newEvent', 'nonExistentFn')

      assert.isFalse(result)
    })
    it('Returns false if an event doesnt exist', () => {
      let result = tps.remove('nonExistentEvent', 'nonExistentFn')

      assert.isFalse(result)
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

      assert.isTrue(fn1.called)
      assert.isTrue(fn2.called)
    })
    it('Returns true if events ran', () => {
      let result = tps.emit('nonExistentEvent')
      
      assert.isFalse(result)
    })
    it('Returns false if event isnt found', () => {
      tps.add('newEvent', () => {})

      let result = tps.emit('newEvent')
      
      assert.isTrue(result)
    })
  })

  describe('#list', () => {
    it('Returns the handlers object', () => {
      tps.add('newEvent')

      assert.deepEqual(tps.handlers, tps.list())
    })
  })
})
