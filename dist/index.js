"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*

TINY PUB SUB
BY: BENJAMIN TAYLOR

DO WHATEVA YOU WANT W/ IT BRO

*/
//Events Object
var _default = {
  //All Events will be added to the Handlers object, to see every function added, call Events.list();
  handlers: {},
  //Add Event ---> Accepts Event Name & A callback function as parameters
  add: function add(event, callbackFn) {
    //If the Event does not exist in the handlers object, create it
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    } // If the event you are adding already exists, console log the added function already exists


    if (this.handlers[event].includes(callbackFn)) {
      console.log("Function Already exists!");
      return;
    } // Add the callback function to the event


    this.handlers[event].push(callbackFn);
  },
  // Remove Event ---> Accepts Event Name, and callback function to remove.
  remove: function remove(event, fnName) {
    if (this.handlers[event] && this.handlers[event].includes(fnName)) {
      this.handlers[event].splice(this.handlers[event].indexOf(fnName), 1);
    } else {
      // If you are trying to remove and event that does not exist, it will let you know via console.log
      console.log("No Matching Functions Exist to remove!");
    }
  },
  //Triggers the Event, uses the rest/spread operater to pass an unlimited number of parameters
  emit: function emit(name) {
    for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }

    //Keep an index that is incremented for each function that does not match the Event emitted (See below)
    var index = 0; //Length of handlers Object

    var length = Object.keys(this.handlers).length; //Loop through handlers Object and call every function that matches the Event emitted

    for (var eventName in this.handlers) {
      if (this.handlers[name] && name === eventName) {
        this.handlers[name].forEach(function (fn) {
          fn.apply(void 0, data);
        });
      } else {
        index++;
      }
    } // If the index is equal to or greater than the length of the Event handlers object, the Event did not fire.
    // This throws an error for debugging purposes, you can edit this if you don't it want to throw an error.


    if (index >= length) {
      throw new Error("Specified event in the Event handlers object did not fire. Check the name of the event you are calling.");
    }
  },
  // Spit out every Event inside the handlers object.
  list: function list() {
    if (console.table) {
      console.table(this.handlers);
    } else {
      console.log(this.handlers);
    }
  }
};
exports.default = _default;