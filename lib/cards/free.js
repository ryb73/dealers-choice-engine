"use strict";

var q = require("q");

function Free() {
  function playCard(player, gameData, choiceProvider) {
    player.gainInsurance(gameData.insurances.pop());
  }
  this.playCard = playCard;

  function canPlay(player, gameData) {
    return gameData.insurances.length > 0;
  }
  this.canPlay = canPlay;
}

module.exports = Free;