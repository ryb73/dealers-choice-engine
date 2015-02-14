"use strict";

var nodeUuid = require("node-uuid");

function Player(startingMoney) {
  var uuid = nodeUuid.v1();
  var money = startingMoney;

  function hashCode() {
    return uuid;
  }
  this.hashCode = hashCode;
}