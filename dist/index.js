"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  /**
   * The master list of all events and the functions they call
   */
  handlers: {},

  /**
   * Add an function (and event) to handlers
   * @param {string} event - The name of the event
   * @param {function} callbackFn - A function to call when event is triggered
   * @returns {boolean} Whether the event was successfully added
   */
  add(event, callbackFn) {
    //If the Event does not exist in the handlers object, create it
    this.handlers[event] = this.handlers[event] || [];

    if (this.handlers[event].includes(callbackFn)) {
      return false;
    }

    this.handlers[event].push(callbackFn);
    return true;
  },

  /**
   * Remove a function by name from a given event
   * @param {string} event - The name of the event
   * @param {string} fnName - The name of the function to remove
   * @returns {boolean} Whether the function was successfully removed
   */
  remove(event, fnName) {
    if (this.handlers[event] && this.handlers[event].includes(fnName)) {
      this.handlers[event].splice(this.handlers[event].indexOf(fnName), 1);
      return true;
    }

    return false;
  },

  /**
   * Calls all functions attached to a given event
   * @param {string} name - The name of the event
   * @param {...any} data - Data to be passed to each function
   * @returns {boolean} Whether the functions were successfully called
   */
  emit(name, ...data) {
    let functionList = this.handlers[name];

    if (functionList) {
      functionList.forEach(fn => {
        fn(...data);
      });
      return true;
    }

    return false;
  },

  /**
   * @returns {object} Returns the handler object for you to inspect
   */
  list() {
    return this.handlers;
  }

};
exports.default = _default;