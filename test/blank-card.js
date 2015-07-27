"use strict";

const _      = require("lodash"),
      q      = require("q"),
      DcCard = require("..").DcCard;

function BlankCard() {
  DcCard.call(this);
  let supr = _.clone(this);

  function play(gameData, choiceProvider, player) {
    supr.play(gameData, choiceProvider, player);
    return q();
  }
  this.play = play;
}

module.exports = BlankCard;