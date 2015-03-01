"use strict";

var nodeUuid = require("node-uuid");

function Insurance() {
  var uuid = nodeUuid.v1();

  function hashCode() {
    return uuid;
  }
  this.hashCode = hashCode;
}

module.exports = Insurance;