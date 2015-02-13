"use strict";

function BuyFromAutoExchangeForN(n) {
  function playCard(player, gameState, choiceProvider) {
    player.debit(n);
    player.gainCar(gameState.carDeck.pop());
  }
  this.playCard = playCard;

  function canPlay(player, gameState) {
    return gameState.carDeck.remaining >= 1 && player.money >= n;
  }
  this.canPlay = canPlay;
}

module.exports = BuyFromAutoExchangeForN;