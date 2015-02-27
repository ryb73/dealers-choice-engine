"use strict";

var q = require("q");

function BuyFromAutoExchangeForN(n) {
  function playCard(player, gameData, choiceProvider) {
    player.debit(n);
    player.gainCar(gameData.carDeck.pop());
    return q();
  }
  this.playCard = playCard;

  function canPlay(player, gameData) {
    return gameData.carDeck.remaining >= 1 && player.money >= n;
  }
  this.canPlay = canPlay;
}

module.exports = BuyFromAutoExchangeForN;