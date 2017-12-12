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
   * @param {string} name - The name of the event
   * @param {function} callback - A function to call when event is triggered
   * @returns {boolean} Whether the event was successfully added
   */
  add(name, callback) {
    if (typeof callback != 'function') {
      return false;
    } //If the Event does not exist in the handlers object, create it


    this.handlers[name] = this.handlers[name] || [];

    if (this.handlers[name].includes(callback)) {
      return false;
    }

    this.handlers[name].push(callback);
    return true;
  },

  /**
   * Remove a function by name from a given event
   * @param {string} name - The name of the event
   * @param {string} cbName - The name of the function to remove
   * @returns {boolean} Whether the function was successfully removed
   */
  remove(name, cbName) {
    if (this.handlers[name] && this.handlers[name].includes(cbName)) {
      this.handlers[name].splice(this.handlers[name].indexOf(cbName), 1);
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