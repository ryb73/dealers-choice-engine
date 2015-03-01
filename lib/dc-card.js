"use strict";

var nodeUuid = require("node-uuid");

function DcCard() {
  var uuid = nodeUuid.v1();

  function hashCode() {
    return uuid;
  }
  this.hashCode = hashCode;
}

module.exports = DcCard;