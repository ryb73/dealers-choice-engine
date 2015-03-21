"use strict";

var nodeUuid = require("node-uuid");

function DcCard() {
  var uuid = nodeUuid.v1();

  function play(player, gameData, choiceProvider) {
    /* jshint unused: false */
    throw new Error("DcCard.play not implemented");
  }
  this.play = play;

  function canPlay(player, gameData) {
    /* jshint unused: false */
    throw new Error("DcCard.canPlay not implemented");
  }
  this.canPlay = canPlay;

  function hashCode() {
    return uuid;
  }
  this.hashCode = hashCode;
}

module.exports = DcCard;