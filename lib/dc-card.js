"use strict";

const giveUniqueId = require("give-unique-id");

function DcCard() {
  giveUniqueId(this);
  let self = this;

  function play(gameData, choiceProvider, player) {
    player.loseDcCard(self);
  }
  this.play = play;

  function canPlay(player, gameData) {
    /* jshint unused: false */
    throw new Error("DcCard.canPlay not implemented");
  }
  this.canPlay = canPlay;
}

module.exports = DcCard;