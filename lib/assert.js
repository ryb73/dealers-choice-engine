"use strict";

module.exports = function assert(value) {
  if(!value) throw new Error("assertion error");
};