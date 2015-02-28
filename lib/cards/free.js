"use strict";

var q = require("q");

function Free() {
  function play(player, gameData, choiceProvider) {
    player.gainInsurance(gameData.insurances.pop());
  }
  this.play = play;

  function canPlay(player, gameData) {
    return gameData.insurances.length > 0;
  }
  this.canPlay = canPlay;
}

module.exports = Free;