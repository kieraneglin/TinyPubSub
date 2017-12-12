"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  // Global events list
  handlers: {},

  //Add Event ---> Accepts Event Name & A callback function as parameters
  add(event, callbackFn) {
    //If the Event does not exist in the handlers object, create it
    this.handlers[event] = this.handlers[event] || [];

    if (this.handlers[event].includes(callbackFn)) {
      return false;
    }

    this.handlers[event].push(callbackFn);
  },

  // Remove Event ---> Accepts Event Name, and callback function to remove.
  remove(event, fnName) {
    if (this.handlers[event] && this.handlers[event].includes(fnName)) {
      this.handlers[event].splice(this.handlers[event].indexOf(fnName), 1);
      return true;
    }

    return false;
  },

  //Triggers the Event, uses the rest/spread operater to pass an unlimited number of parameters
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

  // Spit out every Event inside the handlers object.
  list() {
    return this.handlers;
  }

};
exports.default = _default;